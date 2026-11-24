import * as THREE from 'three';
import type { BattleUnit, Facing, SkillDef } from '../types/tactics.ts';
import { TacticalCombatEngine, tileKey } from '../systems/TacticalCombatEngine.ts';
import {
  buildSyncCachedStageAssets,
  preloadStageAssets,
  type DioramaGLBAssets,
} from './AssetLoader3D.ts';
import {
  applyBiomeLighting,
  type BiomeVisualPreset,
  createBiomeSkyDome,
  disposeBiomeEnvironments,
} from './BiomeLighting3D.ts';
import { EffectsVoxel3D } from './EffectsVoxel3D.ts';
import { createUnitRigHandle, type UnitRigHandle } from './GLTFCharacterRig.ts';
import { type GraphicsPreset, PostFXPipeline3D } from './PostFXPipeline3D.ts';
import {
  STEP_HEIGHT,
  TILE_SIZE,
  TerrainDioramaVoxel3D,
  tileCenterWorld,
} from './TerrainDioramaVoxel3D.ts';
import { type UnitAnimState } from './VoxelEngine3D.ts';

export type { GraphicsPreset } from './PostFXPipeline3D.ts';

interface PooledPointLight {
  light: THREE.PointLight;
  life: number;
  maxLife: number;
  peakIntensity: number;
}

interface UnitVisualState {
  id: string;
  rig: UnitRigHandle;
  col: number;
  row: number;
  facing: Facing;
  worldPos: THREE.Vector3;
  animState: UnitAnimState;
  lastAppliedState: UnitAnimState;
  animTimer: number;
  animDuration: number;
  skyDiveOffsetY: number;
  isDead: boolean;
}

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
  onFrameTick?: (nowMs: number, rawDt: number) => void;
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

function createTacticalOverlayMaterial(
  colorHex: number,
  baseOpacity: number,
  striped = false
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uOpacity: { value: baseOpacity },
      uTime: { value: 0 },
      uStriped: { value: striped ? 1.0 : 0.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uTime;
      uniform float uStriped;
      varying vec2 vUv;

      void main() {
        vec2 edge = min(vUv, 1.0 - vUv);
        float minEdge = min(edge.x, edge.y);
        float border = 1.0 - smoothstep(0.035, 0.095, minEdge);
        float pulse = 0.85 + 0.15 * sin(uTime * 4.5);

        float pattern = 1.0;
        if (uStriped > 0.5) {
          float diag = fract((vUv.x + vUv.y) * 5.0 - uTime * 0.8);
          pattern = mix(0.55, 1.15, smoothstep(0.35, 0.55, diag) - smoothstep(0.75, 0.95, diag));
        }

        float fillAlpha = uOpacity * 0.42 * pattern;
        float borderAlpha = min(1.0, uOpacity * 1.45) * pulse;
        float alpha = mix(fillAlpha, borderAlpha, border);
        vec3 col = mix(uColor, uColor * 1.45 + vec3(0.12), border);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export class BattlefieldTactics3D {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  postFX: PostFXPipeline3D;
  timer: THREE.Timer;

  private hemiLight: THREE.HemisphereLight;
  private sunLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private skyDome: THREE.Mesh;
  private pointLightPool: PooledPointLight[] = [];
  private diorama: TerrainDioramaVoxel3D | null = null;
  private effects: EffectsVoxel3D;
  private engine: TacticalCombatEngine | null = null;
  private unitVisuals = new Map<string, UnitVisualState>();
  private currentPreset: GraphicsPreset = 'HIGH';
  private currentBiomePreset!: BiomeVisualPreset;
  private baseSkyColor = 0x132036;
  private baseSunIntensity = 2.35;
  private baseHemiIntensity = 0.62;
  private envPulseTimer = 0;
  private envPulseMode: 'storm_dark' | 'blood_sky' | null = null;
  private hitStopTimer = 0;
  private stageLoadToken = 0;
  private stageReadyPromise: Promise<void> = Promise.resolve();

  // Tactical overlays
  private overlayGroup = new THREE.Group();
  private moveOverlayMeshes: THREE.Mesh[] = [];
  private attackOverlayMeshes: THREE.Mesh[] = [];
  private aoeOverlayMeshes: THREE.Mesh[] = [];
  private telegraphMeshes: THREE.Mesh[] = [];
  private cursorMesh: THREE.Mesh;
  private parabolicArc: THREE.Line;
  private compassGroup = new THREE.Group();
  private compassArrows: {
    facing: Facing;
    mesh: THREE.Mesh;
    hitMesh: THREE.Mesh;
    mat: THREE.MeshStandardMaterial;
  }[] = [];
  private compassBaseY = 0;

  public isAnimating = false;
  private animatingSinceMs = 0;

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
  private readonly tapThresholdPx = 14;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2(-99, -99);
  private isDraggingOrbit = false;
  private isDraggingPan = false;
  private isMultiTouch = false;
  private lastPinchDist = 0;
  private lastPinchMid = { x: 0, y: 0 };
  private pointerDownPos = { x: 0, y: 0 };
  private pointerDownOnCanvas = false;
  private activePointerId: number | null = null;
  private dragStart = { x: 0, y: 0 };
  private hasDragged = false;
  private keysDown = new Set<string>();
  private hoveredTile: { col: number; row: number } | null = null;
  private hoveredCompass: Facing | null = null;
  private callbacks: BattlefieldCallbacks;
  private elapsed = 0;
  private timeScale = 1;
  private disposed = false;

  // Shared tile overlay materials & geometry
  private tileOverlayGeom = new THREE.PlaneGeometry(TILE_SIZE * 0.88, TILE_SIZE * 0.88);
  private moveMat: THREE.ShaderMaterial;
  private attackMat: THREE.ShaderMaterial;
  private aoeMat: THREE.ShaderMaterial;
  private telegraphMat: THREE.ShaderMaterial;

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
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x132036);
    this.scene.fog = new THREE.FogExp2(0x1a2d42, 0.013);

    this.camera = new THREE.PerspectiveCamera(
      36,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.2,
      140
    );

    this.skyDome = createBiomeSkyDome();
    this.scene.add(this.skyDome);

    // 3-Point Diorama Lighting (Hemisphere + Shadow Key Sun + Opposite Rim Light)
    this.hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x423222, 0.62);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xffe6ba, 2.35);
    this.sunLight.position.set(14, 24, 13);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.bias = -0.0004;
    this.sunLight.shadow.normalBias = 0.018;
    const sc = this.sunLight.shadow.camera;
    sc.near = 2;
    sc.far = 65;
    sc.left = -16;
    sc.right = 16;
    sc.top = 16;
    sc.bottom = -16;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    this.rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.72);
    this.rimLight.position.set(-15, 11, -14);
    this.rimLight.castShadow = false;
    this.scene.add(this.rimLight);

    // Pre-allocate fixed pool of 3 PointLights once at boot (intensity = 0)
    for (let i = 0; i < 3; i++) {
      const pl = new THREE.PointLight(0xffffff, 0, 11, 1.5);
      pl.castShadow = false;
      this.scene.add(pl);
      this.pointLightPool.push({ light: pl, life: 0, maxLife: 0, peakIntensity: 0 });
    }

    // Post-processing pipeline: RenderPass -> GTAOPass (HIGH) -> UnrealBloomPass -> TiltShiftGrade -> OutputPass
    this.postFX = new PostFXPipeline3D(
      this.renderer,
      this.scene,
      this.camera,
      window.innerWidth,
      window.innerHeight
    );

    this.currentBiomePreset = applyBiomeLighting(
      this.scene,
      this.renderer,
      { sunLight: this.sunLight, rimLight: this.rimLight, hemiLight: this.hemiLight, skyDome: this.skyDome },
      'forest'
    );
    this.postFX.applyBiomeTuning(this.currentBiomePreset);

    // Tactical tile highlight materials
    this.tileOverlayGeom.rotateX(-Math.PI / 2);
    this.moveMat = createTacticalOverlayMaterial(0x38bdf8, 0.62, false);
    this.attackMat = createTacticalOverlayMaterial(0xf43f5e, 0.68, false);
    this.aoeMat = createTacticalOverlayMaterial(0xfacc15, 0.76, false);
    this.telegraphMat = createTacticalOverlayMaterial(0xff5500, 0.80, true);

    this.scene.add(this.overlayGroup);

    // Tile hover cursor ring
    this.cursorMesh = new THREE.Mesh(
      new THREE.RingGeometry(TILE_SIZE * 0.36, TILE_SIZE * 0.47, 4),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
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

    // Expose diagnostics & runtime debug controls
    Object.assign(window, {
      renderer: this.renderer,
      scene: this.scene,
      __coaDebug: {
        setPreset: (p: GraphicsPreset) => this.setGraphicsPreset(p),
        whenReady: () => this.whenAssetsReady(),
        getStats: () => this.getDebugStats(),
      },
    });

    this.timer = new THREE.Timer();
    this.timer.connect(document);

    if (isMobileOrCoarseDevice()) {
      this.setGraphicsPreset('MEDIUM');
    } else {
      this.setGraphicsPreset('HIGH');
    }

    this.bindEvents();
    this.startLoop();
  }

  getDebugStats() {
    const units = Array.from(this.unitVisuals.values()).map((uv) => ({
      id: uv.id,
      isGLTF: uv.rig.isGLTF,
      animState: uv.animState,
      posY: Number(uv.rig.root.position.y.toFixed(3)),
      rotY: Number(uv.rig.root.rotation.y.toFixed(3)),
    }));
    return {
      stageId: this.engine?.stage.id ?? null,
      biome: this.engine?.stage.biome ?? null,
      preset: this.currentPreset,
      drawCalls: this.postFX.lastDrawCalls,
      triangles: this.postFX.lastTriangles,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
      gltfUnits: units.filter((u) => u.isGLTF).length,
      totalUnits: units.length,
      units,
    };
  }

  whenAssetsReady(): Promise<void> {
    return this.stageReadyPromise;
  }

  private buildFacingCompass(): void {
    const dirs: { facing: Facing; offset: [number, number]; rotY: number }[] = [
      { facing: 'N', offset: [0, -1.08], rotY: Math.PI },
      { facing: 'S', offset: [0, 1.08], rotY: 0 },
      { facing: 'E', offset: [1.08, 0], rotY: Math.PI / 2 },
      { facing: 'W', offset: [-1.08, 0], rotY: -Math.PI / 2 },
    ];

    const arrowShape = new THREE.ConeGeometry(0.3, 0.56, 4);
    arrowShape.rotateX(Math.PI / 2);

    const hitGeom = new THREE.SphereGeometry(0.68, 12, 10);
    const hitMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      colorWrite: false,
    });

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

      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.position.set(d.offset[0], 0.42, d.offset[1]);
      hitMesh.userData = { compassFacing: d.facing };
      hitMesh.layers.set(1); // Keep invisible hit spheres out of GTAOPass

      this.compassGroup.add(mesh);
      this.compassGroup.add(hitMesh);
      this.compassArrows.push({ facing: d.facing, mesh, hitMesh, mat });
    }
    this.compassGroup.visible = false;
  }

  private flashPointLight(
    pos: THREE.Vector3,
    colorHex: number,
    intensity: number,
    duration: number
  ): void {
    let slot = this.pointLightPool.find((p) => p.life >= p.maxLife || p.light.intensity <= 0.01);
    if (!slot) {
      slot = this.pointLightPool.reduce((a, b) =>
        a.life / Math.max(0.01, a.maxLife) > b.life / Math.max(0.01, b.maxLife) ? a : b
      );
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

  private rebuildDioramaWithAssets(engine: TacticalCombatEngine, assets: DioramaGLBAssets): void {
    if (this.diorama) {
      this.scene.remove(this.diorama.group);
      this.diorama.dispose();
      this.diorama = null;
    }
    this.diorama = new TerrainDioramaVoxel3D(engine.stage, engine.tiles, assets);
    this.diorama.setParticleDensity(
      this.currentPreset === 'LOW' ? 0.4 : this.currentPreset === 'MEDIUM' ? 0.75 : 1.0
    );
    this.scene.add(this.diorama.group);
    for (const tile of engine.tiles.values()) {
      if (tile.chest?.opened) {
        this.diorama.markChestOpened(tile.chest.id);
      }
    }
  }

  loadStage(engine: TacticalCombatEngine): void {
    const token = ++this.stageLoadToken;
    this.engine = engine;
    this.clearHighlights();
    this.showFacingCompass(null);
    this.setParabolicArc(null, null);

    // Apply rich per-biome PBR lighting, PMREM environment & PostFX grading
    this.currentBiomePreset = applyBiomeLighting(
      this.scene,
      this.renderer,
      { sunLight: this.sunLight, rimLight: this.rimLight, hemiLight: this.hemiLight, skyDome: this.skyDome },
      engine.stage.biome
    );
    this.baseSkyColor = this.currentBiomePreset.skyColor;
    this.baseSunIntensity = this.currentBiomePreset.sunIntensity;
    this.baseHemiIntensity = this.currentBiomePreset.hemiIntensity;
    this.postFX.applyBiomeTuning(this.currentBiomePreset);

    // Clear old unit rigs
    for (const uv of this.unitVisuals.values()) {
      this.scene.remove(uv.rig.root);
      uv.rig.dispose();
    }
    this.unitVisuals.clear();

    const jobIds = engine.units.map((u) => u.jobId);
    const syncAssets = buildSyncCachedStageAssets(engine.stage, jobIds);

    // Build diorama synchronously with cached GLBs or instant procedural fallback
    this.rebuildDioramaWithAssets(engine, syncAssets);

    // Spawn rigs for all units
    for (const u of engine.units) {
      const initialState: UnitAnimState = u.hp > 0 ? 'idle' : 'dead';
      const gltf = syncAssets.characters.get(u.jobId) ?? null;
      const rig = createUnitRigHandle(gltf, u.jobId, u.team, Boolean(u.isBoss), initialState);
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
        animState: initialState,
        lastAppliedState: initialState,
        animTimer: 0,
        animDuration: 0,
        skyDiveOffsetY: 0,
        isDead: u.hp <= 0,
      });
    }

    // Async preload GLB models and seamlessly upgrade diorama & unit rigs
    this.stageReadyPromise = preloadStageAssets(engine.stage, jobIds).then((loaded) => {
      if (this.disposed || token !== this.stageLoadToken || this.engine !== engine) return;

      if (loaded.terrain.size > syncAssets.terrain.size || loaded.props.size > syncAssets.props.size) {
        this.rebuildDioramaWithAssets(engine, loaded);
      }

      for (const u of engine.units) {
        const uv = this.unitVisuals.get(u.id);
        const gltf = loaded.characters.get(u.jobId);
        if (!uv || !gltf || uv.rig.isGLTF) continue;

        const oldPos = uv.rig.root.position.clone();
        const oldRotY = uv.rig.root.rotation.y;
        const isAct = engine.activeUnitId === u.id && u.hp > 0;
        const nextRig = createUnitRigHandle(gltf, u.jobId, u.team, Boolean(u.isBoss), uv.animState);
        nextRig.root.position.copy(oldPos);
        nextRig.root.rotation.y = oldRotY;
        nextRig.setActiveHighlight(isAct);

        this.scene.remove(uv.rig.root);
        uv.rig.dispose();
        uv.rig = nextRig;
        uv.lastAppliedState = uv.animState;
        this.scene.add(nextRig.root);
      }
    });

    this.targetFocus.set(0, 1.35, 0);
    this.focusPoint.copy(this.targetFocus);
    this.targetDistance = engine.stage.cols >= 14 ? 24.5 : 21.5;
    this.distance = this.targetDistance;
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
      const isAct = engine.activeUnitId === u.id && u.hp > 0;
      uv.rig.setActiveHighlight(isAct);
    }

    for (const tile of engine.tiles.values()) {
      if (tile.chest?.opened && this.diorama) {
        this.diorama.markChestOpened(tile.chest.id);
      }
    }

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
    mat: THREE.Material,
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
      this.hoveredCompass = null;
      for (const a of this.compassArrows) {
        a.mat.emissiveIntensity = 1.5;
        a.mesh.scale.setScalar(1.0);
      }
      return;
    }
    const wp = this.getUnitAnchorWorldPos(unit);
    this.compassBaseY = wp.y;
    this.compassGroup.position.copy(wp);
    this.compassGroup.visible = true;
    this.hoveredCompass = null;
    for (const a of this.compassArrows) {
      const isCurrent = a.facing === unit.facing;
      a.mat.emissiveIntensity = isCurrent ? 2.5 : 1.5;
      a.mesh.scale.setScalar(isCurrent ? 1.18 : 1.0);
    }
    this.compassGroup.updateMatrixWorld(true);
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
      density = 0.4;
    } else if (preset === 'MEDIUM') {
      targetRatio = mobile ? Math.min(dpr, 1.35) : Math.min(dpr, 1.5);
      shadowDim = mobile ? 1024 : 2048;
      density = 0.75;
    } else {
      targetRatio = Math.min(dpr, 2.0);
      shadowDim = mobile ? 2048 : 4096;
      density = 1.0;
    }

    this.renderer.setPixelRatio(targetRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.postFX.setPreset(preset);
    this.postFX.setSize(window.innerWidth, window.innerHeight);

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
    const engine = this.engine;
    if (!uv || !engine || path.length <= 1) return;

    this.isAnimating = true;
    this.animatingSinceMs = performance.now();
    try {
      uv.animState = 'walk';
      for (let i = 1; i < path.length; i++) {
        if (this.disposed) break;
        const prev = path[i - 1];
        const next = path[i];
        const prevT = engine.getTile(prev.col, prev.row);
        const nextT = engine.getTile(next.col, next.row);
        if (!prevT || !nextT) continue;

        const p0 = tileCenterWorld(prev.col, prev.row, prevT.height, engine.stage.cols, engine.stage.rows);
        const p1 = tileCenterWorld(next.col, next.row, nextT.height, engine.stage.cols, engine.stage.rows);
        const u = engine.getUnit(unitId);
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
            if (this.disposed) {
              resolve();
              return;
            }
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
    } finally {
      if (!uv.isDead) {
        uv.animState = 'idle';
      }
      this.isAnimating = false;
      this.animatingSinceMs = 0;
    }
  }

  async animateUnitSkill(
    attackerId: string,
    skill: SkillDef,
    targetCol: number,
    targetRow: number,
    aoeTiles: { col: number; row: number }[]
  ): Promise<void> {
    const engine = this.engine;
    if (!engine) return;
    const uv = this.unitVisuals.get(attackerId);

    this.isAnimating = true;
    this.animatingSinceMs = performance.now();
    try {
      const tt = engine.getTile(targetCol, targetRow);
      const targetPos = tileCenterWorld(
        targetCol,
        targetRow,
        tt?.height ?? 1,
        engine.stage.cols,
        engine.stage.rows
      );
      const aoePositions = aoeTiles.map((c) => {
        const tile = engine.getTile(c.col, c.row);
        return tileCenterWorld(c.col, c.row, tile?.height ?? 1, engine.stage.cols, engine.stage.rows);
      });

      const attackerPos = uv ? uv.worldPos.clone() : targetPos.clone();

      if (uv) {
        if (targetCol !== uv.col || targetRow !== uv.row) {
          const dc = targetCol - uv.col;
          const dr = targetRow - uv.row;
          uv.facing = Math.abs(dc) >= Math.abs(dr) ? (dc > 0 ? 'E' : 'W') : dr > 0 ? 'S' : 'N';
        }

        if (skill.vfxType === 'sky_dive') {
          uv.rig.bodyPivot.scale.set(1.16, 0.8, 1.16);
          await new Promise((r) => setTimeout(r, 120 / this.timeScale));
          this.effects.spawnSkyDiveWindRings(attackerPos);

          uv.animState = 'jump_up';
          const ascendMs = 220 / this.timeScale;
          const t0 = performance.now();
          await new Promise<void>((res) => {
            const step = () => {
              if (this.disposed) {
                res();
                return;
              }
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
              if (this.disposed) {
                uv.skyDiveOffsetY = 0;
                res();
                return;
              }
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
          uv.rig.setState(uv.animState, true);
          uv.lastAppliedState = uv.animState;
          await new Promise((r) => setTimeout(r, 220 / this.timeScale));
        }
      }

      const yaw = uv ? facingToYaw(uv.facing) : 0;
      try {
        this.effects.playSkillVFX(skill, attackerPos, targetPos, aoePositions, yaw);
      } catch (err) {
        console.error('[BattlefieldTactics3D] VFX error during skill animation:', err);
      }
      if (skill.vfxType === 'apocalypse_meteor') {
        this.hitStopTimer = 0.09;
      }
      this.addTrauma(skill.aoeRadius > 0 || skill.vfxType === 'sky_dive' ? 0.55 : 0.25);

      await new Promise((r) => setTimeout(r, 290 / this.timeScale));
    } finally {
      if (uv) {
        uv.skyDiveOffsetY = 0;
        uv.rig.bodyPivot.scale.set(1, 1, 1);
        if (!uv.isDead) {
          uv.animState = 'idle';
        }
        const latestUnit = this.engine?.getUnit(attackerId);
        if (latestUnit) {
          uv.worldPos.copy(this.getUnitAnchorWorldPos(latestUnit));
        }
      }
      this.isAnimating = false;
      this.animatingSinceMs = 0;
    }
  }

  triggerHitFeedback(unitId: string, isCrit: boolean, isBlocked: boolean, killed: boolean): void {
    const uv = this.unitVisuals.get(unitId);
    if (!uv) return;
    if (killed) {
      uv.isDead = true;
      uv.animState = 'dead';
      uv.lastAppliedState = 'dead';
      uv.rig.setState('dead', true);
      uv.rig.triggerFlash(0xf43f5e, 0.24);
      this.effects.spawnVoxelBurst(uv.worldPos, 28, [0x94a3b8, 0xf43f5e, 0xfef08a], 5.2, 6.0, 1.2);
      this.addTrauma(0.6);
      return;
    }
    uv.animState = isBlocked ? 'block' : 'hit';
    uv.lastAppliedState = uv.animState;
    uv.rig.setState(uv.animState, true);
    uv.animTimer = 0;
    uv.animDuration = 0.35;

    if (isCrit) {
      uv.rig.triggerFlash(0xfef08a, 0.22);
      this.hitStopTimer = Math.max(this.hitStopTimer, 0.055);
      this.effects.spawnVoxelBurst(uv.worldPos, 22, [0xfacc15, 0xf97316, 0xffffff], 5.0, 5.5, 1.15);
      this.addTrauma(0.75);
    } else if (isBlocked) {
      uv.rig.triggerFlash(0x60a5fa, 0.16);
      this.effects.spawnVoxelBurst(uv.worldPos, 8, [0x60a5fa, 0xffffff], 2.8, 3.0, 0.85);
    } else {
      uv.rig.triggerFlash(0xffffff, 0.15);
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
      this.postFX.setSize(w, h);
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
      this.activePointerId = e.pointerId;
      this.pointerDownOnCanvas = true;
      this.pointerDownPos = { x: e.clientX, y: e.clientY };
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.hasDragged = false;
      if (e.button === 2 || e.button === 1) {
        this.isDraggingPan = e.button === 2;
        this.isDraggingOrbit = e.button === 1;
      } else if (e.button === 0 || e.pointerType === 'touch') {
        this.isDraggingOrbit = true;
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (this.isMultiTouch) return;
      if (this.pointerDownOnCanvas && this.activePointerId !== null && e.pointerId !== this.activePointerId) {
        return;
      }
      if (!this.isDraggingOrbit && !this.isDraggingPan && e.target !== this.canvas) {
        return;
      }
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const distFromDown = Math.hypot(
        e.clientX - this.pointerDownPos.x,
        e.clientY - this.pointerDownPos.y
      );

      if (this.isDraggingOrbit) {
        if (distFromDown >= this.tapThresholdPx) {
          if (!this.hasDragged) {
            this.hasDragged = true;
            this.dragStart = { x: e.clientX, y: e.clientY };
          } else {
            const dx = e.clientX - this.dragStart.x;
            const dy = e.clientY - this.dragStart.y;
            this.targetAzimuth -= dx * 0.008;
            this.targetPolar = THREE.MathUtils.clamp(this.targetPolar - dy * 0.006, 0.42, 1.28);
            this.dragStart = { x: e.clientX, y: e.clientY };
          }
        }
      } else if (this.isDraggingPan) {
        if (distFromDown >= this.tapThresholdPx) {
          this.hasDragged = true;
        }
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        const right = new THREE.Vector3(Math.cos(this.azimuth), 0, -Math.sin(this.azimuth));
        const fwd = new THREE.Vector3(-Math.sin(this.azimuth), 0, -Math.cos(this.azimuth));
        this.targetFocus.addScaledVector(right, -dx * 0.02);
        this.targetFocus.addScaledVector(fwd, dy * 0.02);
        this.dragStart = { x: e.clientX, y: e.clientY };
      }

      this.updateRaycastHover();
    });

    window.addEventListener('pointerup', (e) => {
      if (this.activePointerId !== null && e.pointerId !== this.activePointerId) return;
      if (this.isMultiTouch) {
        this.pointerDownOnCanvas = false;
        this.activePointerId = null;
        this.isDraggingOrbit = false;
        this.isDraggingPan = false;
        this.hasDragged = false;
        return;
      }
      const totalMove = Math.hypot(
        e.clientX - this.pointerDownPos.x,
        e.clientY - this.pointerDownPos.y
      );
      const isTapButton = e.button === 0 || e.pointerType === 'touch';
      const wasTap =
        this.pointerDownOnCanvas &&
        !this.hasDragged &&
        totalMove < this.tapThresholdPx &&
        isTapButton &&
        e.target === this.canvas;

      this.pointerDownOnCanvas = false;
      this.activePointerId = null;
      this.isDraggingOrbit = false;
      this.isDraggingPan = false;
      this.hasDragged = false;

      if (wasTap) {
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

    window.addEventListener('pointercancel', (e) => {
      if (this.activePointerId !== null && e.pointerId !== this.activePointerId) return;
      this.pointerDownOnCanvas = false;
      this.activePointerId = null;
      this.isDraggingOrbit = false;
      this.isDraggingPan = false;
      this.hasDragged = false;
    });

    this.canvas.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length >= 2) {
          e.preventDefault();
          this.isMultiTouch = true;
          this.pointerDownOnCanvas = false;
          this.activePointerId = null;
          this.isDraggingOrbit = false;
          this.isDraggingPan = false;
          this.hasDragged = false;
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
    this.raycaster.layers.set(1);

    if (this.compassGroup.visible) {
      const compassHits = this.raycaster.intersectObjects(
        this.compassArrows.map((a) => a.hitMesh),
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
          a.mesh.scale.setScalar(a.facing === f ? 1.38 : 1.0);
        }
        this.raycaster.layers.set(0);
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

    if (!this.diorama || !this.engine) {
      this.raycaster.layers.set(0);
      return;
    }
    const hits = this.raycaster.intersectObjects(this.diorama.tileHitMeshes, false);
    this.raycaster.layers.set(0);

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
      const nowMs = performance.now();
      if (this.isAnimating && this.animatingSinceMs > 0 && nowMs - this.animatingSinceMs > 4000) {
        console.warn('[BattlefieldTactics3D] Watchdog released stuck animation lock.');
        this.isAnimating = false;
        this.animatingSinceMs = 0;
      }
      this.callbacks.onFrameTick?.(nowMs, rawDt);
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
          (this.scene.fog as THREE.FogExp2).color.setHex(this.currentBiomePreset.fogColor);
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
      this.moveMat.uniforms.uTime.value = this.elapsed;
      this.attackMat.uniforms.uTime.value = this.elapsed;
      this.aoeMat.uniforms.uTime.value = this.elapsed;
      this.telegraphMat.uniforms.uTime.value = this.elapsed;
      this.cursorMesh.scale.setScalar(0.96 + pulse * 0.08);
      if (this.compassGroup.visible) {
        this.compassGroup.position.y = this.compassBaseY + Math.sin(this.elapsed * 5) * 0.04;
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
        if (uv.lastAppliedState !== uv.animState) {
          uv.rig.setState(uv.animState);
          uv.lastAppliedState = uv.animState;
        }
        const phase = uv.animDuration > 0 ? uv.animTimer / uv.animDuration : 0;
        uv.rig.update(dt, this.elapsed, phase);
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

      this.postFX.render();
    });
  }

  dispose(): void {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.timer.dispose();
    this.diorama?.dispose();
    for (const uv of this.unitVisuals.values()) {
      uv.rig.dispose();
    }
    this.unitVisuals.clear();
    this.postFX.dispose();
    disposeBiomeEnvironments();
    this.moveMat.dispose();
    this.attackMat.dispose();
    this.aoeMat.dispose();
    this.telegraphMat.dispose();
    this.tileOverlayGeom.dispose();
    this.renderer.dispose();
  }
}
