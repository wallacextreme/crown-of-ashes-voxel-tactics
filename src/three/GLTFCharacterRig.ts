import * as THREE from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import type { ArchetypeId, Team } from '../types/tactics.ts';
import { cloneCharacterGLTF } from './AssetLoader3D.ts';
import { createContactShadowMaterial } from './ProceduralVoxelPBR.ts';
import {
  type CharacterVoxelRig,
  type UnitAnimState,
  animateCharacterRig,
  createCharacterVoxelRig,
} from './VoxelEngine3D.ts';

export interface UnitRigHandle {
  root: THREE.Group;
  bodyPivot: THREE.Group;
  teamRing: THREE.Mesh;
  shadowDisc: THREE.Mesh;
  heightWorld: number;
  isGLTF: boolean;
  setState: (state: UnitAnimState, forceRestart?: boolean) => void;
  triggerFlash: (colorHex: number, duration?: number) => void;
  setActiveHighlight: (active: boolean) => void;
  update: (dt: number, elapsed: number, phaseTime: number) => void;
  dispose: () => void;
}

const ONE_SHOT_STATES = new Set<UnitAnimState>(['slash', 'bow', 'dual', 'hit', 'block']);
const PLAYABLE_CLASS_IDS = new Set<ArchetypeId>([
  'holy_knight',
  'black_mage',
  'dragoon',
  'sniper',
  'white_mystic',
  'ninja',
]);

function buildBaseDiscs(
  team: Team,
  isBoss: boolean,
  isBelias: boolean
): { shadowDisc: THREE.Mesh; teamRing: THREE.Mesh; ringMat: THREE.MeshBasicMaterial } {
  const ringRadius = isBelias ? 1.05 : 0.48;

  const shadowDisc = new THREE.Mesh(
    new THREE.PlaneGeometry(ringRadius * 2.15, ringRadius * 2.15),
    createContactShadowMaterial()
  );
  shadowDisc.rotation.x = -Math.PI / 2;
  shadowDisc.position.y = 0.014;

  const teamColor = team === 'ally' ? 0x38bdf8 : isBoss ? 0xf59e0b : 0xf43f5e;
  const ringMat = new THREE.MeshBasicMaterial({
    color: teamColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });
  const teamRing = new THREE.Mesh(
    new THREE.RingGeometry(ringRadius * 0.84, ringRadius, 32),
    ringMat
  );
  teamRing.rotation.x = -Math.PI / 2;
  teamRing.position.y = 0.02;

  return { shadowDisc, teamRing, ringMat };
}

export class ProceduralUnitRigAdapter implements UnitRigHandle {
  root: THREE.Group;
  bodyPivot: THREE.Group;
  teamRing: THREE.Mesh;
  shadowDisc: THREE.Mesh;
  heightWorld: number;
  isGLTF = false;

  private rig: CharacterVoxelRig;
  private state: UnitAnimState = 'idle';

  constructor(jobId: ArchetypeId, team: Team, isBoss: boolean) {
    this.rig = createCharacterVoxelRig(jobId, team, isBoss);
    this.root = this.rig.root;
    this.bodyPivot = this.rig.bodyPivot;
    this.teamRing = this.rig.teamRing;
    this.shadowDisc = this.rig.shadowDisc;
    this.heightWorld = this.rig.heightWorld;
  }

  setState(state: UnitAnimState): void {
    this.state = state;
  }

  triggerFlash(): void {
    // Fallback procedural rig skips shader flash
  }

  setActiveHighlight(active: boolean): void {
    this.teamRing.scale.setScalar(active ? 1.24 : 1.0);
  }

  update(_dt: number, elapsed: number, phaseTime: number): void {
    animateCharacterRig(this.rig, this.state, elapsed, phaseTime);
  }

  dispose(): void {
    this.root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).geometry?.dispose();
      }
    });
  }
}

export class GLTFUnitRig implements UnitRigHandle {
  root = new THREE.Group();
  bodyPivot = new THREE.Group();
  teamRing: THREE.Mesh;
  shadowDisc: THREE.Mesh;
  heightWorld: number;
  isGLTF = true;

  private model: THREE.Object3D;
  private mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  private currentAction: THREE.AnimationAction | null = null;
  private state: UnitAnimState = 'idle';
  private clonedMaterials: THREE.MeshStandardMaterial[] = [];
  private ringMat: THREE.MeshBasicMaterial;
  private flashTimer = 0;
  private flashDuration = 0.16;
  private sharedUniforms: {
    uFlashColor: { value: THREE.Color };
    uFlashAmount: { value: number };
    uRimColor: { value: THREE.Color };
    uRimStrength: { value: number };
  };

  constructor(gltf: GLTF, jobId: ArchetypeId, team: Team, isBoss: boolean, initialState: UnitAnimState = 'idle') {
    const isBelias = jobId === 'belias_boss';
    this.root.add(this.bodyPivot);

    const discs = buildBaseDiscs(team, isBoss, isBelias);
    this.shadowDisc = discs.shadowDisc;
    this.teamRing = discs.teamRing;
    this.ringMat = discs.ringMat;
    this.root.add(this.shadowDisc, this.teamRing);

    const rimHex = team === 'ally' ? 0x38bdf8 : isBoss ? 0xfbbf24 : 0xf43f5e;
    this.sharedUniforms = {
      uFlashColor: { value: new THREE.Color(0xffffff) },
      uFlashAmount: { value: 0 },
      uRimColor: { value: new THREE.Color(rimHex) },
      uRimStrength: { value: isBoss ? 0.42 : 0.30 },
    };

    this.model = cloneCharacterGLTF(gltf);
    const applyEnemyLivery = team === 'enemy' && PLAYABLE_CLASS_IDS.has(jobId);

    this.model.traverse((node) => {
      if (!(node as THREE.Mesh).isMesh) return;
      const mesh = node as THREE.Mesh;
      const srcMats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const nextMats: THREE.Material[] = [];

      for (const src of srcMats) {
        if (!src || !(src as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          nextMats.push(src);
          continue;
        }
        const mat = (src as THREE.MeshStandardMaterial).clone();
        const lowerName = (mat.name || '').toLowerCase();

        if (applyEnemyLivery) {
          if (lowerName.startsWith('cape_')) {
            mat.color.setHex(0x881337);
          } else if (lowerName.startsWith('cloth_')) {
            mat.color.setHex(0x991b1b);
          }
        }

        // Inject crisp tactical Rim Light + Hit Flash into PBR StandardMaterial
        const uniformsRef = this.sharedUniforms;
        mat.customProgramCacheKey = () => 'coa_unit_pbr_rim_flash_v1';
        mat.onBeforeCompile = (shader) => {
          shader.uniforms.uFlashColor = uniformsRef.uFlashColor;
          shader.uniforms.uFlashAmount = uniformsRef.uFlashAmount;
          shader.uniforms.uRimColor = uniformsRef.uRimColor;
          shader.uniforms.uRimStrength = uniformsRef.uRimStrength;

          shader.fragmentShader =
            `
            uniform vec3 uFlashColor;
            uniform float uFlashAmount;
            uniform vec3 uRimColor;
            uniform float uRimStrength;
            ` + shader.fragmentShader;

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <emissivemap_fragment>',
            `
            #include <emissivemap_fragment>
            float coaRimDot = 1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0);
            totalEmissiveRadiance += uRimColor * pow(coaRimDot, 2.8) * uRimStrength;
            totalEmissiveRadiance = mix(totalEmissiveRadiance, uFlashColor * 2.1, clamp(uFlashAmount, 0.0, 1.0));
            `
          );
        };
        mat.needsUpdate = true;
        this.clonedMaterials.push(mat);
        nextMats.push(mat);
      }

      mesh.material = Array.isArray(mesh.material) ? nextMats : nextMats[0];
    });

    this.bodyPivot.add(this.model);

    // Measure exact world height from bounding box
    const bbox = new THREE.Box3().setFromObject(this.model);
    const rawH = bbox.max.y - bbox.min.y;
    this.heightWorld = Number.isFinite(rawH) && rawH > 0.2 ? THREE.MathUtils.clamp(rawH, 1.2, 4.1) : isBelias ? 2.75 : 1.48;

    // Setup AnimationMixer & all 11 NLA clips
    this.mixer = new THREE.AnimationMixer(this.model);
    for (const clip of gltf.animations) {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    }

    this.mixer.addEventListener('finished', () => {
      if (this.state !== 'dead' && ONE_SHOT_STATES.has(this.state)) {
        this.setState('idle');
      }
    });

    this.setState(initialState, true);
    if (initialState === 'dead') {
      this.mixer.update(2.0);
    }
  }

  setState(nextState: UnitAnimState, forceRestart = false): void {
    if (this.state === nextState && !forceRestart && this.currentAction) {
      return;
    }
    this.state = nextState;
    this.teamRing.visible = nextState !== 'dead';

    const nextAction = this.actions.get(nextState) ?? this.actions.get('idle');
    if (!nextAction) return;

    if (nextState === 'dead') {
      nextAction.setLoop(THREE.LoopOnce, 1);
      nextAction.clampWhenFinished = true;
    } else if (ONE_SHOT_STATES.has(nextState)) {
      nextAction.setLoop(THREE.LoopOnce, 1);
      nextAction.clampWhenFinished = false;
    } else {
      nextAction.setLoop(THREE.LoopRepeat, Infinity);
      nextAction.clampWhenFinished = false;
    }

    nextAction.reset();
    nextAction.setEffectiveTimeScale(1);
    nextAction.setEffectiveWeight(1);
    nextAction.play();

    if (this.currentAction && this.currentAction !== nextAction) {
      this.currentAction.crossFadeTo(nextAction, 0.14, false);
    }
    this.currentAction = nextAction;
  }

  triggerFlash(colorHex: number, duration = 0.18): void {
    this.sharedUniforms.uFlashColor.value.setHex(colorHex);
    this.flashDuration = Math.max(0.05, duration);
    this.flashTimer = this.flashDuration;
    this.sharedUniforms.uFlashAmount.value = 1.0;
  }

  setActiveHighlight(active: boolean): void {
    this.teamRing.scale.setScalar(active ? 1.25 : 1.0);
    this.ringMat.opacity = active ? 0.96 : 0.78;
    this.sharedUniforms.uRimStrength.value = active ? 0.55 : 0.30;
  }

  update(dt: number, _elapsed: number, _phaseTime: number): void {
    this.mixer.update(dt);

    if (this.flashTimer > 0) {
      this.flashTimer = Math.max(0, this.flashTimer - dt);
      this.sharedUniforms.uFlashAmount.value = this.flashTimer / this.flashDuration;
    }
  }

  dispose(): void {
    this.mixer.stopAllAction();
    this.mixer.uncacheRoot(this.model);
    for (const mat of this.clonedMaterials) {
      mat.dispose();
    }
    this.shadowDisc.geometry.dispose();
    (this.shadowDisc.material as THREE.Material).dispose();
    this.teamRing.geometry.dispose();
    this.ringMat.dispose();
  }
}

export function createUnitRigHandle(
  gltf: GLTF | null,
  jobId: ArchetypeId,
  team: Team,
  isBoss: boolean,
  initialState: UnitAnimState = 'idle'
): UnitRigHandle {
  if (gltf && gltf.animations.length > 0) {
    return new GLTFUnitRig(gltf, jobId, team, isBoss, initialState);
  }
  const adapter = new ProceduralUnitRigAdapter(jobId, team, isBoss);
  adapter.setState(initialState);
  return adapter;
}
