import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import type { BattleUnit, Facing, SkillDef } from '../types/tactics.ts';
import { TacticalCombatEngine, tileKey } from '../systems/TacticalCombatEngine.ts';
import { EffectsVoxel3D } from './EffectsVoxel3D.ts';
import {
  STEP_HEIGHT,
  TILE_SIZE,
  TerrainDioramaVoxel3D,
  tileCenterWorld,
} from './TerrainDioramaVoxel3D.ts';
import {
  type CharacterVoxelRig,
  type UnitAnimState,
  animateCharacterRig,
  createCharacterVoxelRig,
} from './VoxelEngine3D.ts';

interface PooledPointLight {
  light: THREE.PointLight;
  life: number;
  maxLife: number;
  peakIntensity: number;
}

interface UnitVisualState {
  id: string;
  rig: CharacterVoxelRig;
  col: number;
  row: number;
  facing: Facing;
  worldPos: THREE.Vector3;
  animState: UnitAnimState;
  animTimer: number;
  animDuration: number;
  skyDiveOffsetY: number;
  isDead: boolean;
}

export type GraphicsPreset = 'LOW' | 'MEDIUM' | 'HIGH';

export function isMobileOrCoarseDevice(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(max-width: 820px), (pointer: coarse)').matches;
}

export interface ScreenProjection {
  unitId: string;
  x: number;
  y: number;
  visible: boolean;
}

export interface BattlefieldCallbacks {
  onTileHover?: (col: number | null, row: number | null) => void;
  onTileClick?: (col: number, row: number) => void;
  onFacingHover?: (facing: Facing | null) => void;
  onFacingClick?: (facing: Facing) => void;
  onUnitProjections?: (projections: ScreenProjection[]) => void;
}

function facingToYaw(facing: Facing): number {
  switch (facing) {
    case 'S':
      return 0;
    case 'N':
      return Math.PI;
    case 'E':
      return Math.PI / 2;
    case 'W':
      return -Math.PI / 2;
  }
}

export class BattlefieldTactics3D {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer;
  bloomPass: UnrealBloomPass;
  timer: THREE.Timer;

  private hemiLight: THREE.HemisphereLight;
  private sunLight: THREE.DirectionalLight;
  private pointLightPool: PooledPointLight[] = [];
  private diorama: TerrainDioramaVoxel3D | null = null;
  private effects: EffectsVoxel3D;
  private engine: TacticalCombatEngine | null = null;
  private unitVisuals = new Map<string, UnitVisualState>();
  private currentPreset: GraphicsPreset = 'HIGH';
  private baseSkyColor = 0x0c1322;
  private baseSunIntensity = 1.35;
  private baseHemiIntensity = 0.45;
  private envPulseTimer = 0;
  private envPulseMode: 'storm_dark' | 'blood_sky' | null = null;
  private hitStopTimer = 0;

  // Tactical overlays
  private overlayGroup = new THREE.Group();
  private moveOverlayMeshes: THREE.Mesh[] = [];
  private attackOverlayMeshes: THREE.Mesh[] = [];
  private aoeOverlayMeshes: THREE.Mesh[] = [];
  private telegraphMeshes: THREE.Mesh[] = [];
  private cursorMesh: THREE.Mesh;
  private parabolicArc: THREE.Line;
  private compassGroup = new THREE.Group();
  private compassArrows: { facing: Facing; mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial }[] = [];

  // Camera FFT Orbit + 90-degree snap + Pan + Zoom + Trauma Shake
  private azimuth = Math.PI * 0.25;
  private targetAzimuth = Math.PI * 0.25;
  private polar = 0.88;
  private targetPolar = 0.88;
  private distance = 18.5;
  private targetDistance = 18.5;
  private focusPoint = new THREE.Vector3(0, 1.2, 0);
  private targetFocus = new THREE.Vector3(0, 1.2, 0);
  private trauma = 0;
  private shakeTime = 0;

  // Input state
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2(-99, -99);
  private isDraggingOrbit = false;
  private isDraggingPan = false;
  private isMultiTouch = false;
  private lastPinchDist = 0;
  private lastPinchMid = { x: 0, y: 0 };
  private dragStart = { x: 0, y: 0 };
  private dragDist = 0;
  private keysDown = new Set<string>();
  private hoveredTile: { col: number; row: number } | null = null;
  private hoveredCompass: Facing | null = null;
  private callbacks: BattlefieldCallbacks;
  private elapsed = 0;
  private timeScale = 1;
  private activeSkillHighlightColor = 0x38bdf8;
  private disposed = false;

  // Shared tile overlay materials & geometry
  private tileOverlayGeom = new THREE.PlaneGeometry(TILE_SIZE * 0.86, TILE_SIZE * 0.86);
  private moveMat: THREE.MeshBasicMaterial;
  private attackMat: THREE.MeshBasicMaterial;
  private aoeMat: THREE.MeshBasicMaterial;
  private telegraphMat: THREE.MeshBasicMaterial;

  constructor(canvas: HTMLCanvasElement, callbacks: BattlefieldCallbacks) {
    this.canvas = canvas;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.94;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1322);
    this.scene.fog = new THREE.FogExp2(0x0c1322, 0.016);

    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.2,
      140
    );

    // PBR IBL via PMREMGenerator + RoomEnvironment
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.scene.environment = pmrem.fromScene(room, 0.04).texture;
    this.scene.environmentIntensity = 0.85;
    room.dispose();
    pmrem.dispose();

    // Global key directional light with optimized 2048x2048 shadow frustum + hemisphere fill
    this.hemiLight = new THREE.HemisphereLight(0xbbe6ff, 0x33271e, 0.42);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff1d6, 1.35);
    this.sunLight.position.set(14, 24, 12);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.bias = -0.0004;
    this.sunLight.shadow.normalBias = 0.015;
    const sc = this.sunLight.shadow.camera;
    sc.near = 2;
    sc.far = 65;
    sc.left = -16;
    sc.right = 16;
    sc.top = 16;
    sc.bottom = -16;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    // ANTI-FREEZE RULE: Pre-allocate fixed pool of 3 PointLights once at boot (intensity = 0)
    for (let i = 0; i < 3; i++) {
      const pl = new THREE.PointLight(0xffffff, 0, 11, 1.5);
      pl.castShadow = false;
      this.scene.add(pl);
      this.pointLightPool.push({ light: pl, life: 0, maxLife: 0, peakIntensity: 0 });
    }

    // Post-processing pipeline: RenderPass -> UnrealBloomPass -> OutputPass
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.45,
      0.32,
      1.02
    );
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(new OutputPass());

    // Tactical tile highlight materials
    this.tileOverlayGeom.rotateX(-Math.PI / 2);
    this.moveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    this.attackMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });
    this.aoeMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    });
    this.telegraphMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    this.scene.add(this.overlayGroup);

    // Tile hover cursor ring
    this.cursorMesh = new THREE.Mesh(
      new THREE.RingGeometry(TILE_SIZE * 0.36, TILE_SIZE * 0.47, 4),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      })
    );
    this.cursorMesh.rotation.x = -Math.PI / 2;
    this.cursorMesh.rotation.z = Math.PI / 4;
    this.cursorMesh.visible = false;
    this.scene.add(this.cursorMesh);

    // Parabolic 3D trajectory arc
    const arcPts = Array.from({ length: 25 }, () => new THREE.Vector3());
    const arcGeom = new THREE.BufferGeometry().setFromPoints(arcPts);
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.95,
    });
    this.parabolicArc = new THREE.Line(arcGeom, arcMat);
    this.parabolicArc.visible = false;
    this.scene.add(this.parabolicArc);

    // 3D Compass (Rosa dos Ventos) for Facing Selection
    this.buildFacingCompass();
    this.scene.add(this.compassGroup);

    // Particle / Spell VFX Manager
    this.effects = new EffectsVoxel3D(
      (wx, wz) => this.sampleFloorHeight(wx, wz),
      (pos, hex, intensity, dur) => this.flashPointLight(pos, hex, intensity, dur),
      (mode, durMs) => {
        this.envPulseMode = mode;
        this.envPulseTimer = durMs / 1000;
      }
    );
    this.scene.add(this.effects.group);

    // Expose renderer & scene on window for diagnostics/verification
    Object.assign(window, { renderer: this.renderer, scene: this.scene });

    this.timer = new THREE.Timer();
    this.timer.connect(document);

    if (isMobileOrCoarseDevice()) {
      this.setGraphicsPreset('MEDIUM');
    }

    this.bindEvents();
    this.startLoop();
  }

  private buildFacingCompass(): void {
    const dirs: { facing: Facing; offset: [number, number]; rotY: number }[] = [
      { facing: 'N', offset: [0, -0.92], rotY: Math.PI },
      { facing: 'S', offset: [0, 0.92], rotY: 0 },
      { facing: 'E', offset: [0.92, 0], rotY: Math.PI / 2 },
      { facing: 'W', offset: [-0.92, 0], rotY: -Math.PI / 2 },
    ];

    const arrowShape = new THREE.ConeGeometry(0.24, 0.45, 4);
    arrowShape.rotateX(Math.PI / 2);

    for (const d of dirs) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfde047,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.9,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(arrowShape, mat);
      mesh.position.set(d.offset[0], 0.35, d.offset[1]);
      mesh.rotation.y = d.rotY;
      mesh.userData = { compassFacing: d.facing };
      this.compassGroup.add(mesh);
      this.compassArrows.push({ facing: d.facing, mesh, mat });
    }
    this.compassGroup.visible = false;
  }

  private flashPointLight(
    pos: THREE.Vector3,
    colorHex: number,
    intensity: number,
    duration: number
  ): void {
    // Reuse idle slot or oldest slot — NEVER add/remove PointLights dynamically
    let slot = this.pointLightPool.find((p) => p.life >= p.maxLife || p.light.intensity <= 0.01);
    if (!slot) {
      slot = this.pointLightPool.reduce((a, b) => (a.life / Math.max(0.01, a.maxLife) > b.life / Math.max(0.01, b.maxLife) ? a : b));
    }
    slot.light.position.copy(pos);
    slot.light.color.setHex(colorHex);
    slot.peakIntensity = intensity;
    slot.light.intensity = intensity;
    slot.life = 0;
    slot.maxLife = Math.max(0.15, duration);
  }

  private sampleFloorHeight(wx: number, wz: number): number {
    if (!this.engine) return 0;
    const col = Math.round(wx / TILE_SIZE + (this.engine.stage.cols - 1) / 2);
    const row = Math.round(wz / TILE_SIZE + (this.engine.stage.rows - 1) / 2);
    const tile = this.engine.getTile(col, row);
    return tile ? tile.height * STEP_HEIGHT : 0;
  }

  loadStage(engine: TacticalCombatEngine): void {
    this.engine = engine;
    this.clearHighlights();
    this.showFacingCompass(null);
    this.setParabolicArc(null, null);

    // Dispose old diorama
    if (this.diorama) {
      this.scene.remove(this.diorama.group);
      this.diorama.dispose();
      this.diorama = null;
    }

    // Remove old unit rigs
    for (const uv of this.unitVisuals.values()) {
      this.scene.remove(uv.rig.root);
    }
    this.unitVisuals.clear();

    // Update per-biome sky, fog & dramatic lighting mood
    const biomeMoods: Record<
      string,
      { sky: number; sunColor: number; sunInt: number; hemiSky: number; hemiGround: number; hemiInt: number }
    > = {
      forest: { sky: 0x162238, sunColor: 0xffe4b8, sunInt: 1.45, hemiSky: 0xbae6fd, hemiGround: 0x3b2d1f, hemiInt: 0.44 },
      canyon: { sky: 0x22172a, sunColor: 0xffedd5, sunInt: 1.40, hemiSky: 0xfde68a, hemiGround: 0x451a03, hemiInt: 0.42 },
      arctic: { sky: 0x0e1d36, sunColor: 0xdbeafe, sunInt: 1.25, hemiSky: 0x93c5fd, hemiGround: 0x1e293b, hemiInt: 0.46 },
      swamp: { sky: 0x0b1917, sunColor: 0xa7f3d0, sunInt: 1.05, hemiSky: 0x6ee7b7, hemiGround: 0x1c1917, hemiInt: 0.40 },
      volcanic: { sky: 0x210b0d, sunColor: 0xffb38a, sunInt: 1.35, hemiSky: 0xfca5a5, hemiGround: 0x271313, hemiInt: 0.42 },
    };
    const mood = biomeMoods[engine.stage.biome] ?? biomeMoods.forest;
    this.baseSkyColor = mood.sky;
    this.baseSunIntensity = mood.sunInt;
    this.baseHemiIntensity = mood.hemiInt;
    this.scene.background = new THREE.Color(mood.sky);
    (this.scene.fog as THREE.FogExp2).color.setHex(mood.sky);
    this.sunLight.color.setHex(mood.sunColor);
    this.sunLight.intensity = mood.sunInt;
    this.hemiLight.color.setHex(mood.hemiSky);
    this.hemiLight.groundColor.setHex(mood.hemiGround);
    this.hemiLight.intensity = mood.hemiInt;

    // Build diorama
    this.diorama = new TerrainDioramaVoxel3D(engine.stage, engine.tiles);
    this.diorama.setParticleDensity(this.currentPreset === 'LOW' ? 0.4 : this.currentPreset === 'MEDIUM' ? 0.75 : 1.0);
    this.scene.add(this.diorama.group);

    // Spawn voxel rigs for all units
    for (const u of engine.units) {
      const rig = createCharacterVoxelRig(u.jobId, u.team, Boolean(u.isBoss));
      const worldPos = this.getUnitAnchorWorldPos(u);
      rig.root.position.copy(worldPos);
      rig.root.rotation.y = facingToYaw(u.facing);
      this.scene.add(rig.root);

      this.unitVisuals.set(u.id, {
        id: u.id,
        rig,
        col: u.col,
        row: u.row,
        facing: u.facing,
        worldPos: worldPos.clone(),
        animState: u.hp > 0 ? 'idle' : 'dead',
        animTimer: 0,
        animDuration: 0,
        skyDiveOffsetY: 0,
        isDead: u.hp <= 0,
      });
    }

    this.targetFocus.set(0, 1.4, 0);
    this.focusPoint.copy(this.targetFocus);
    this.targetDistance = engine.stage.cols >= 14 ? 21.5 : 18.5;
  }

  private getUnitAnchorWorldPos(u: BattleUnit): THREE.Vector3 {
    if (!this.engine) return new THREE.Vector3();
    const t = this.engine.getTile(u.col, u.row);
    const h = t?.height ?? 1;
    const p = tileCenterWorld(u.col, u.row, h, this.engine.stage.cols, this.engine.stage.rows);
    if (u.footprint === 2) {
      p.x += TILE_SIZE * 0.5;
      p.z += TILE_SIZE * 0.5;
    }
    return p;
  }

  syncFromEngine(engine: TacticalCombatEngine): void {
    this.engine = engine;
    for (const u of engine.units) {
      const uv = this.unitVisuals.get(u.id);
      if (!uv) continue;
      uv.col = u.col;
      uv.row = u.row;
      uv.facing = u.facing;
      uv.worldPos.copy(this.getUnitAnchorWorldPos(u));
      uv.isDead = u.hp <= 0;
      if (uv.isDead) {
        uv.animState = 'dead';
      } else if (uv.animState === 'dead') {
        uv.animState = 'idle';
      }
      // Highlight active unit ring
      const isAct = engine.activeUnitId === u.id && u.hp > 0;
      uv.rig.teamRing.scale.setScalar(isAct ? 1.24 : 1.0);
    }

    // Sync chest visuals
    for (const tile of engine.tiles.values()) {
      if (tile.chest?.opened && this.diorama) {
        this.diorama.markChestOpened(tile.chest.id);
      }
    }

    // Sync Belias telegraphed meteor + burning tiles
    this.refreshPersistentTileEffects(engine);
  }

  private refreshPersistentTileEffects(engine: TacticalCombatEngine): void {
    for (const m of this.telegraphMeshes) {
      this.overlayGroup.remove(m);
    }
    this.telegraphMeshes = [];

    const cellsToWarn = new Map<string, { col: number; row: number; isMeteor: boolean }>();
    for (const u of engine.units) {
      if (u.hp > 0 && u.pendingMeteor) {
        const m = u.pendingMeteor;
        for (let dc = -1; dc <= 1; dc++) {
          for (let dr = -1; dr <= 1; dr++) {
            const c = m.centerCol + dc;
            const r = m.centerRow + dr;
            if (engine.getTile(c, r)) {
              cellsToWarn.set(tileKey(c, r), { col: c, row: r, isMeteor: true });
            }
          }
        }
      }
    }
    for (const t of engine.tiles.values()) {
      if ((t.burningTurns ?? 0) > 0) {
        const k = tileKey(t.col, t.row);
        if (!cellsToWarn.has(k)) {
          cellsToWarn.set(k, { col: t.col, row: t.row, isMeteor: false });
        }
      }
    }

    for (const item of cellsToWarn.values()) {
      const tile = engine.getTile(item.col, item.row);
      if (!tile) continue;
      const wp = tileCenterWorld(tile.col, tile.row, tile.height, engine.stage.cols, engine.stage.rows);
      const mesh = new THREE.Mesh(this.tileOverlayGeom, this.telegraphMat);
      mesh.position.set(wp.x, wp.y + 0.04, wp.z);
      this.overlayGroup.add(mesh);
      this.telegraphMeshes.push(mesh);
    }
  }

  clearHighlights(): void {
    for (const m of [...this.moveOverlayMeshes, ...this.attackOverlayMeshes, ...this.aoeOverlayMeshes]) {
      this.overlayGroup.remove(m);
    }
    this.moveOverlayMeshes = [];
    this.attackOverlayMeshes = [];
    this.aoeOverlayMeshes = [];
  }

  private setTileListHighlight(
    list: { col: number; row: number }[],
    targetArray: THREE.Mesh[],
    mat: THREE.MeshBasicMaterial,
    yOffset: number
  ): void {
    for (const m of targetArray) {
      this.overlayGroup.remove(m);
    }
    targetArray.length = 0;
    if (!this.engine) return;

    for (const cell of list) {
      const tile = this.engine.getTile(cell.col, cell.row);
      if (!tile) continue;
      const wp = tileCenterWorld(tile.col, tile.row, tile.height, this.engine.stage.cols, this.engine.stage.rows);
      const m = new THREE.Mesh(this.tileOverlayGeom, mat);
      m.position.set(wp.x, wp.y + yOffset, wp.z);
      this.overlayGroup.add(m);
      targetArray.push(m);
    }
  }

  setMoveTiles(tiles: { col: number; row: number }[]): void {
    this.setTileListHighlight(tiles, this.moveOverlayMeshes, this.moveMat, 0.025);
  }

  setAttackTiles(tiles: { col: number; row: number }[]): void {
    this.setTileListHighlight(tiles, this.attackOverlayMeshes, this.attackMat, 0.03);
  }

  setAoeTiles(tiles: { col: number; row: number }[]): void {
    this.setTileListHighlight(tiles, this.aoeOverlayMeshes, this.aoeMat, 0.038);
  }

  setParabolicArc(
    from: { col: number; row: number } | null,
    to: { col: number; row: number } | null,
    color = 0xfacc15
  ): void {
    if (!from || !to || !this.engine) {
      this.parabolicArc.visible = false;
      return;
    }
    const tf = this.engine.getTile(from.col, from.row);
    const tt = this.engine.getTile(to.col, to.row);
    if (!tf || !tt) {
      this.parabolicArc.visible = false;
      return;
    }
    const p0 = tileCenterWorld(from.col, from.row, tf.height, this.engine.stage.cols, this.engine.stage.rows);
    const p1 = tileCenterWorld(to.col, to.row, tt.height, this.engine.stage.cols, this.engine.stage.rows);
    p0.y += 1.05;
    p1.y += 0.9;

    const dist = p0.distanceTo(p1);
    const arcHeight = Math.max(0.85, dist * 0.35);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const v = new THREE.Vector3().lerpVectors(p0, p1, t);
      v.y += Math.sin(t * Math.PI) * arcHeight;
      pts.push(v);
    }
    this.parabolicArc.geometry.setFromPoints(pts);
    (this.parabolicArc.material as THREE.LineBasicMaterial).color.setHex(color);
    this.parabolicArc.visible = true;
  }

  showFacingCompass(unit: BattleUnit | null): void {
    if (!unit || !this.engine) {
      this.compassGroup.visible = false;
      return;
    }
    const wp = this.getUnitAnchorWorldPos(unit);
    this.compassGroup.position.copy(wp);
    this.compassGroup.visible = true;
  }

  focusOnTile(col: number, row: number): void {
    if (!this.engine) return;
    const t = this.engine.getTile(col, row);
    const h = t?.height ?? 1;
    const wp = tileCenterWorld(col, row, h, this.engine.stage.cols, this.engine.stage.rows);
    this.targetFocus.set(wp.x, wp.y + 0.85, wp.z);
  }

  getGraphicsPreset(): GraphicsPreset {
    return this.currentPreset;
  }

  setGraphicsPreset(preset: GraphicsPreset): void {
    this.currentPreset = preset;
    const dpr = window.devicePixelRatio || 1;
    const mobile = isMobileOrCoarseDevice();
    let targetRatio = Math.min(dpr, 2.0);
    let shadowDim = 2048;
    let density = 1.0;

    if (preset === 'LOW') {
      targetRatio = 1.0;
      shadowDim = 1024;
      this.bloomPass.enabled = false;
      density = 0.4;
    } else if (preset === 'MEDIUM') {
      targetRatio = mobile ? Math.min(dpr, 1.35) : Math.min(dpr, 1.5);
      shadowDim = mobile ? 1024 : 2048;
      this.bloomPass.enabled = true;
      density = 0.75;
    } else {
      targetRatio = Math.min(dpr, 2.0);
      shadowDim = 2048;
      this.bloomPass.enabled = true;
      density = 1.0;
    }

    this.renderer.setPixelRatio(targetRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.bloomPass.resolution.set(window.innerWidth, window.innerHeight);

    if (this.sunLight.shadow.mapSize.x !== shadowDim) {
      this.sunLight.shadow.mapSize.set(shadowDim, shadowDim);
      this.sunLight.shadow.map?.dispose();
      this.sunLight.shadow.map = null;
    }

    this.diorama?.setParticleDensity(density);
  }

  rotate90(dir: 1 | -1): void {
    this.targetAzimuth += dir * (Math.PI / 2);
  }

  setTimeScale(scale: number): void {
    this.timeScale = scale;
  }

  addTrauma(amount: number): void {
    this.trauma = Math.min(1, this.trauma + amount);
  }

  async animateUnitMovePath(
    unitId: string,
    path: { col: number; row: number }[],
    onStep?: (col: number, row: number) => void
  ): Promise<void> {
    const uv = this.unitVisuals.get(unitId);
    if (!uv || !this.engine || path.length <= 1) return;

    uv.animState = 'walk';
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const next = path[i];
      const prevT = this.engine.getTile(prev.col, prev.row);
      const nextT = this.engine.getTile(next.col, next.row);
      if (!prevT || !nextT) continue;

      const p0 = tileCenterWorld(prev.col, prev.row, prevT.height, this.engine.stage.cols, this.engine.stage.rows);
      const p1 = tileCenterWorld(next.col, next.row, nextT.height, this.engine.stage.cols, this.engine.stage.rows);
      const u = this.engine.getUnit(unitId);
      if (u?.footprint === 2) {
        p0.x += TILE_SIZE * 0.5;
        p0.z += TILE_SIZE * 0.5;
        p1.x += TILE_SIZE * 0.5;
        p1.z += TILE_SIZE * 0.5;
      }

      const dc = next.col - prev.col;
      const dr = next.row - prev.row;
      if (dc !== 0 || dr !== 0) {
        uv.facing = Math.abs(dc) >= Math.abs(dr) ? (dc > 0 ? 'E' : 'W') : dr > 0 ? 'S' : 'N';
      }

      const jumpArc = Math.abs(nextT.height - prevT.height) > 0 ? 0.48 : 0.14;
      const stepDuration = 165 / this.timeScale;
      const start = performance.now();

      onStep?.(next.col, next.row);

      await new Promise<void>((resolve) => {
        const tick = () => {
          const t = Math.min(1, (performance.now() - start) / stepDuration);
          uv.worldPos.lerpVectors(p0, p1, t);
          uv.worldPos.y += Math.sin(t * Math.PI) * jumpArc;
          if (t >= 1) {
            uv.col = next.col;
            uv.row = next.row;
            resolve();
          } else {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      });
    }
    uv.animState = 'idle';
  }

  async animateUnitSkill(
    attackerId: string,
    skill: SkillDef,
    targetCol: number,
    targetRow: number,
    aoeTiles: { col: number; row: number }[]
  ): Promise<void> {
    if (!this.engine) return;
    const uv = this.unitVisuals.get(attackerId);
    const tt = this.engine.getTile(targetCol, targetRow);
    const targetPos = tileCenterWorld(
      targetCol,
      targetRow,
      tt?.height ?? 1,
      this.engine.stage.cols,
      this.engine.stage.rows
    );
    const aoePositions = aoeTiles.map((c) => {
      const tile = this.engine!.getTile(c.col, c.row);
      return tileCenterWorld(c.col, c.row, tile?.height ?? 1, this.engine!.stage.cols, this.engine!.stage.rows);
    });

    const attackerPos = uv ? uv.worldPos.clone() : targetPos.clone();

    if (uv) {
      if (targetCol !== uv.col || targetRow !== uv.row) {
        const dc = targetCol - uv.col;
        const dr = targetRow - uv.row;
        uv.facing = Math.abs(dc) >= Math.abs(dr) ? (dc > 0 ? 'E' : 'W') : dr > 0 ? 'S' : 'N';
      }

      // Special Dragoon Sky Dive animation: 120ms crouch anticipation -> supersonic vertical launch + wind rings -> diagonal dive!
      if (skill.vfxType === 'sky_dive') {
        uv.rig.bodyPivot.scale.set(1.16, 0.80, 1.16);
        await new Promise((r) => setTimeout(r, 120 / this.timeScale));
        this.effects.spawnSkyDiveWindRings(attackerPos);

        uv.animState = 'jump_up';
        const ascendMs = 220 / this.timeScale;
        const t0 = performance.now();
        await new Promise<void>((res) => {
          const step = () => {
            const p = Math.min(1, (performance.now() - t0) / ascendMs);
            uv.skyDiveOffsetY = p * 9.0;
            if (p >= 1) res();
            else requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });

        uv.animState = 'jump_down';
        const diveMs = 200 / this.timeScale;
        const t1 = performance.now();
        const startPos = uv.worldPos.clone();
        await new Promise<void>((res) => {
          const step = () => {
            const p = Math.min(1, (performance.now() - t1) / diveMs);
            uv.worldPos.lerpVectors(startPos, targetPos, p);
            uv.skyDiveOffsetY = (1 - p) * 9.0;
            if (p >= 1) {
              uv.skyDiveOffsetY = 0;
              res();
            } else requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      } else {
        uv.animState =
          skill.vfxType === 'dual_strike'
            ? 'dual'
            : skill.isBow
              ? 'bow'
              : skill.isMagic || skill.isHeal || skill.isBuff || skill.vfxType === 'judgment_blade'
                ? 'cast'
                : 'slash';
        uv.animTimer = 0;
        uv.animDuration = 0.48;
        await new Promise((r) => setTimeout(r, 220 / this.timeScale));
      }
    }

    const yaw = uv ? facingToYaw(uv.facing) : 0;
    this.effects.playSkillVFX(skill, attackerPos, targetPos, aoePositions, yaw);
    if (skill.vfxType === 'apocalypse_meteor') {
      this.hitStopTimer = 0.09; // 90ms dramatic impact hit-stop
    }
    this.addTrauma(skill.aoeRadius > 0 || skill.vfxType === 'sky_dive' ? 0.55 : 0.25);

    await new Promise((r) => setTimeout(r, 290 / this.timeScale));
    if (uv && !uv.isDead) {
      uv.animState = 'idle';
      uv.worldPos.copy(this.getUnitAnchorWorldPos(this.engine.getUnit(attackerId)!));
    }
  }

  triggerHitFeedback(unitId: string, isCrit: boolean, isBlocked: boolean, killed: boolean): void {
    const uv = this.unitVisuals.get(unitId);
    if (!uv) return;
    if (killed) {
      uv.isDead = true;
      uv.animState = 'dead';
      this.effects.spawnVoxelBurst(uv.worldPos, 28, [0x94a3b8, 0xf43f5e, 0xfef08a], 5.2, 6.0, 1.2);
      this.addTrauma(0.6);
      return;
    }
    uv.animState = isBlocked ? 'block' : 'hit';
    uv.animTimer = 0;
    uv.animDuration = 0.35;
    if (isCrit) {
      this.effects.spawnVoxelBurst(uv.worldPos, 22, [0xfacc15, 0xf97316, 0xffffff], 5.0, 5.5, 1.15);
      this.addTrauma(0.75);
    } else if (isBlocked) {
      this.effects.spawnVoxelBurst(uv.worldPos, 8, [0x60a5fa, 0xffffff], 2.8, 3.0, 0.85);
    }
  }

  getUnitTopScreenPosition(unitId: string): ScreenProjection | null {
    const uv = this.unitVisuals.get(unitId);
    if (!uv) return null;
    const p = uv.worldPos.clone();
    p.y += uv.rig.heightWorld + 0.32 + uv.skyDiveOffsetY;
    p.project(this.camera);
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    return {
      unitId,
      x: (p.x * 0.5 + 0.5) * w,
      y: (-p.y * 0.5 + 0.5) * h,
      visible: p.z >= -1 && p.z <= 1,
    };
  }

  private bindEvents(): void {
    const onResize = () => {
      if (this.disposed) return;
      const w = window.innerWidth;
      const h = Math.max(1, window.innerHeight);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h, false);
      this.composer.setSize(w, h);
      this.bloomPass.resolution.set(w, h);
    };
    window.addEventListener('resize', onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      this.keysDown.add(k);
      if (k === 'q') this.rotate90(-1);
      if (k === 'e') this.rotate90(1);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      this.keysDown.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.canvas.addEventListener('pointerdown', (e) => {
      if (this.isMultiTouch) return;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.dragDist = 0;
      if (e.button === 2 || e.button === 1) {
        this.isDraggingPan = e.button === 2;
        this.isDraggingOrbit = e.button === 1;
      } else if (e.button === 0) {
        this.isDraggingOrbit = true;
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (this.isMultiTouch) return;
      if (!this.isDraggingOrbit && !this.isDraggingPan && e.target !== this.canvas) {
        return;
      }
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isDraggingOrbit) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        this.dragDist += Math.hypot(dx, dy);
        if (this.dragDist > 6) {
          this.targetAzimuth -= dx * 0.008;
          this.targetPolar = THREE.MathUtils.clamp(this.targetPolar - dy * 0.006, 0.42, 1.28);
          this.dragStart = { x: e.clientX, y: e.clientY };
        }
      } else if (this.isDraggingPan) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        this.dragDist += Math.hypot(dx, dy);
        const right = new THREE.Vector3(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth));
        const fwd = new THREE.Vector3(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth));
        this.targetFocus.addScaledVector(right, -dx * 0.02);
        this.targetFocus.addScaledVector(fwd, dy * 0.02);
        this.dragStart = { x: e.clientX, y: e.clientY };
      }

      this.updateRaycastHover();
    });

    window.addEventListener('pointerup', (e) => {
      if (this.isMultiTouch) {
        this.isDraggingOrbit = false;
        this.isDraggingPan = false;
        return;
      }
      const wasClick = this.dragDist <= 6 && e.button === 0 && e.target === this.canvas;
      this.isDraggingOrbit = false;
      this.isDraggingPan = false;
      if (wasClick) {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this.updateRaycastHover();
        if (this.compassGroup.visible && this.hoveredCompass) {
          this.callbacks.onFacingClick?.(this.hoveredCompass);
          return;
        }
        if (this.hoveredTile) {
          this.callbacks.onTileClick?.(this.hoveredTile.col, this.hoveredTile.row);
        }
      }
    });

    // Multi-touch Pinch-to-Zoom + 2-Finger Pan
    this.canvas.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          this.isMultiTouch = true;
          this.isDraggingOrbit = false;
          this.isDraggingPan = false;
          const t0 = e.touches[0];
          const t1 = e.touches[1];
          this.lastPinchDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
          this.lastPinchMid = {
            x: (t0.clientX + t1.clientX) * 0.5,
            y: (t0.clientY + t1.clientY) * 0.5,
          };
        }
      },
      { passive: false }
    );

    this.canvas.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches.length === 2) {
          e.preventDefault();
          this.isMultiTouch = true;
          const t0 = e.touches[0];
          const t1 = e.touches[1];
          const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
          const mid = {
            x: (t0.clientX + t1.clientX) * 0.5,
            y: (t0.clientY + t1.clientY) * 0.5,
          };

          const dPinch = dist - this.lastPinchDist;
          this.targetDistance = THREE.MathUtils.clamp(this.targetDistance - dPinch * 0.04, 9.5, 32);

          const dx = mid.x - this.lastPinchMid.x;
          const dy = mid.y - this.lastPinchMid.y;
          const right = new THREE.Vector3(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth));
          const fwd = new THREE.Vector3(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth));
          this.targetFocus.addScaledVector(right, -dx * 0.025);
          this.targetFocus.addScaledVector(fwd, dy * 0.025);

          this.lastPinchDist = dist;
          this.lastPinchMid = mid;
        }
      },
      { passive: false }
    );

    this.canvas.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        setTimeout(() => {
          this.isMultiTouch = false;
        }, 60);
      }
    });

    this.canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.targetDistance = THREE.MathUtils.clamp(this.targetDistance + e.deltaY * 0.012, 9.5, 32);
      },
      { passive: false }
    );
  }

  private updateRaycastHover(): void {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    // Check facing compass first when visible
    if (this.compassGroup.visible) {
      const compassHits = this.raycaster.intersectObjects(
        this.compassArrows.map((a) => a.mesh),
        false
      );
      if (compassHits.length > 0) {
        const f = compassHits[0].object.userData.compassFacing as Facing;
        if (this.hoveredCompass !== f) {
          this.hoveredCompass = f;
          this.callbacks.onFacingHover?.(f);
        }
        for (const a of this.compassArrows) {
          a.mat.emissiveIntensity = a.facing === f ? 3.2 : 1.5;
          a.mesh.scale.setScalar(a.facing === f ? 1.35 : 1.0);
        }
        return;
      } else if (this.hoveredCompass !== null) {
        this.hoveredCompass = null;
        this.callbacks.onFacingHover?.(null);
        for (const a of this.compassArrows) {
          a.mat.emissiveIntensity = 1.5;
          a.mesh.scale.setScalar(1.0);
        }
      }
    }

    if (!this.diorama || !this.engine) return;
    const hits = this.raycaster.intersectObjects(this.diorama.tileHitMeshes, false);
    if (hits.length > 0) {
      const ud = hits[0].object.userData as { col: number; row: number; height: number };
      const wp = tileCenterWorld(ud.col, ud.row, ud.height, this.engine.stage.cols, this.engine.stage.rows);
      this.cursorMesh.position.set(wp.x, wp.y + 0.05, wp.z);
      this.cursorMesh.visible = true;
      if (!this.hoveredTile || this.hoveredTile.col !== ud.col || this.hoveredTile.row !== ud.row) {
        this.hoveredTile = { col: ud.col, row: ud.row };
        this.callbacks.onTileHover?.(ud.col, ud.row);
      }
    } else {
      this.cursorMesh.visible = false;
      if (this.hoveredTile !== null) {
        this.hoveredTile = null;
        this.callbacks.onTileHover?.(null, null);
      }
    }
  }

  private startLoop(): void {
    this.renderer.setAnimationLoop(() => {
      if (this.disposed) return;
      this.timer.update();
      const rawDt = Math.min(Math.max(this.timer.getDelta(), 0), 0.1);
      if (this.hitStopTimer > 0) {
        this.hitStopTimer = Math.max(0, this.hitStopTimer - rawDt);
      }
      const dtScale = this.hitStopTimer > 0 ? 0.08 : this.timeScale;
      const dt = rawDt * dtScale;
      this.elapsed += dt;

      // Environment mood pulse (storm darken for Thundaga / blood-red sky for Apocalypse Meteor)
      if (this.envPulseTimer > 0) {
        this.envPulseTimer = Math.max(0, this.envPulseTimer - rawDt);
        if (this.envPulseMode === 'storm_dark') {
          this.sunLight.intensity = this.baseSunIntensity * 0.22;
          this.hemiLight.intensity = this.baseHemiIntensity * 0.35;
        } else if (this.envPulseMode === 'blood_sky') {
          (this.scene.background as THREE.Color).setHex(0x4a0808);
          (this.scene.fog as THREE.FogExp2).color.setHex(0x4a0808);
        }
        if (this.envPulseTimer === 0) {
          this.envPulseMode = null;
          this.sunLight.intensity = this.baseSunIntensity;
          this.hemiLight.intensity = this.baseHemiIntensity;
          (this.scene.background as THREE.Color).setHex(this.baseSkyColor);
          (this.scene.fog as THREE.FogExp2).color.setHex(this.baseSkyColor);
        }
      }

      // WASD Camera Pan
      const panSpeed = 9.0 * rawDt;
      const right = new THREE.Vector3(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth));
      const fwd = new THREE.Vector3(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth));
      if (this.keysDown.has('w') || this.keysDown.has('arrowup')) this.targetFocus.addScaledVector(fwd, panSpeed);
      if (this.keysDown.has('s') || this.keysDown.has('arrowdown')) this.targetFocus.addScaledVector(fwd, -panSpeed);
      if (this.keysDown.has('d') || this.keysDown.has('arrowright')) this.targetFocus.addScaledVector(right, panSpeed);
      if (this.keysDown.has('a') || this.keysDown.has('arrowleft')) this.targetFocus.addScaledVector(right, -panSpeed);
      this.targetFocus.x = THREE.MathUtils.clamp(this.targetFocus.x, -12, 12);
      this.targetFocus.z = THREE.MathUtils.clamp(this.targetFocus.z, -12, 12);

      // Smooth damped camera tracking
      const damp = 1 - Math.exp(-10 * rawDt);
      this.azimuth += (this.targetAzimuth - this.azimuth) * damp;
      this.polar += (this.targetPolar - this.polar) * damp;
      this.distance += (this.targetDistance - this.distance) * damp;
      this.focusPoint.lerp(this.targetFocus, damp);

      // Trauma shake decay in unscaled real delta
      this.trauma = Math.max(0, this.trauma - 1.65 * rawDt);
      this.shakeTime += rawDt * 34;
      const shake = this.trauma * this.trauma;
      const shakeOffset = new THREE.Vector3(
        Math.sin(this.shakeTime * 1.7) * 0.28 * shake,
        Math.sin(this.shakeTime * 2.3) * 0.22 * shake,
        Math.cos(this.shakeTime * 1.3) * 0.28 * shake
      );

      const sinP = Math.sin(this.polar);
      const cosP = Math.cos(this.polar);
      this.camera.position.set(
        this.focusPoint.x + this.distance * sinP * Math.sin(this.azimuth),
        this.focusPoint.y + this.distance * cosP,
        this.focusPoint.z + this.distance * sinP * Math.cos(this.azimuth)
      );
      this.camera.position.add(shakeOffset);
      this.camera.lookAt(this.focusPoint);

      // Pulse overlay materials
      const pulse = 0.5 + 0.5 * Math.sin(this.elapsed * 4.5);
      this.aoeMat.opacity = 0.42 + pulse * 0.32;
      this.telegraphMat.opacity = 0.45 + pulse * 0.38;
      this.cursorMesh.scale.setScalar(0.96 + pulse * 0.08);
      if (this.compassGroup.visible) {
        this.compassGroup.position.y += Math.sin(this.elapsed * 5) * 0.0005;
      }

      // Animate PointLight pool back to 0 cleanly
      for (const slot of this.pointLightPool) {
        if (slot.light.intensity > 0) {
          slot.life += rawDt;
          const t = Math.min(1, slot.life / slot.maxLife);
          slot.light.intensity = slot.peakIntensity * (1 - t);
          if (t >= 1) slot.light.intensity = 0;
        }
      }

      // Animate terrain shaders, ambient particles & characters
      this.diorama?.update(this.elapsed, dt);
      this.effects.update(dt);

      for (const uv of this.unitVisuals.values()) {
        uv.rig.root.position.lerp(uv.worldPos, 1 - Math.exp(-16 * rawDt));
        uv.rig.root.position.y += uv.skyDiveOffsetY;

        const targetYaw = facingToYaw(uv.facing);
        let diff = targetYaw - uv.rig.root.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        uv.rig.root.rotation.y += diff * (1 - Math.exp(-14 * rawDt));

        if (uv.animDuration > 0) {
          uv.animTimer += dt;
          if (uv.animTimer >= uv.animDuration && !uv.isDead) {
            uv.animState = 'idle';
            uv.animDuration = 0;
          }
        }
        const phase = uv.animDuration > 0 ? uv.animTimer / uv.animDuration : 0;
        animateCharacterRig(uv.rig, uv.animState, this.elapsed, phase);
      }

      // Emit 2D screen projections for diegetic unit HP bars
      if (this.callbacks.onUnitProjections && this.engine) {
        const list: ScreenProjection[] = [];
        for (const u of this.engine.units) {
          const proj = this.getUnitTopScreenPosition(u.id);
          if (proj) list.push(proj);
        }
        this.callbacks.onUnitProjections(list);
      }

      this.composer.render();
    });
  }

  dispose(): void {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.timer.dispose();
    this.diorama?.dispose();
    this.renderer.dispose();
  }
}
