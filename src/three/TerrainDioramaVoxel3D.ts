import * as THREE from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import type { GridTile, PropType, StageDef, SurfaceType } from '../types/tactics.ts';
import {
  type DioramaGLBAssets,
  resolveColumnKeysForBiome,
  resolvePropAssetKey,
} from './AssetLoader3D.ts';
import { getVoxelPBRMaterial } from './ProceduralVoxelPBR.ts';
import { type MicroVoxel, buildMergedVoxelMesh } from './VoxelEngine3D.ts';

export const TILE_SIZE = 1.5;
export const STEP_HEIGHT = 0.42;

export function tileCenterWorld(
  col: number,
  row: number,
  height: number,
  cols: number,
  rows: number
): THREE.Vector3 {
  const x = (col - (cols - 1) / 2) * TILE_SIZE;
  const z = (row - (rows - 1) / 2) * TILE_SIZE;
  const y = height * STEP_HEIGHT;
  return new THREE.Vector3(x, y, z);
}

interface SurfaceColors {
  topA: number;
  topB: number;
  side: number;
  deep: number;
}

function getSurfacePalette(surface: SurfaceType, biome: StageDef['biome']): SurfaceColors {
  switch (surface) {
    case 'grass':
      return { topA: 0x3f6212, topB: 0x4d7c0f, side: 0x6b4423, deep: 0x3b3532 };
    case 'cobble':
      if (biome === 'arctic') {
        return { topA: 0x64748b, topB: 0x8496ad, side: 0x334155, deep: 0x1e293b };
      }
      if (biome === 'canyon') {
        return { topA: 0x8c5a3c, topB: 0xa16244, side: 0x6b3e26, deep: 0x432818 };
      }
      return { topA: 0x57534e, topB: 0x6b6661, side: 0x44403c, deep: 0x292524 };
    case 'stone':
      if (biome === 'volcanic') {
        return { topA: 0x373432, topB: 0x44403c, side: 0x292524, deep: 0x1c1917 };
      }
      if (biome === 'canyon') {
        return { topA: 0x9a4e32, topB: 0xb45c3c, side: 0x7c3a23, deep: 0x451a03 };
      }
      return { topA: 0x475569, topB: 0x64748b, side: 0x334155, deep: 0x1e293b };
    case 'wood':
      return { topA: 0x854d0e, topB: 0xa16207, side: 0x713f12, deep: 0x451a03 };
    case 'snow':
      return { topA: 0x94a3b8, topB: 0xb8c4d4, side: 0x475569, deep: 0x334155 };
    case 'ice':
      return { topA: 0x38bdf8, topB: 0x7dd3fc, side: 0x0284c7, deep: 0x0c4a6e };
    case 'swamp':
      return { topA: 0x365314, topB: 0x3f6212, side: 0x3b2814, deep: 0x1c1917 };
    case 'obsidian':
      return { topA: 0x222228, topB: 0x34343d, side: 0x18181b, deep: 0x09090b };
    case 'carpet':
      return { topA: 0x881337, topB: 0x9f1239, side: 0x500724, deep: 0x292524 };
    case 'metal':
      return { topA: 0x64748b, topB: 0x94a3b8, side: 0x334155, deep: 0x1e293b };
    case 'water':
      return { topA: 0x0284c7, topB: 0x0ea5e9, side: 0x075985, deep: 0x0c4a6e };
    case 'lava':
      return { topA: 0xdc2626, topB: 0xf97316, side: 0x450a0a, deep: 0x1c1917 };
  }
}

function deterministicHash(col: number, row: number): number {
  const n = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function createLiquidShaderMaterial(
  kind: 'water' | 'lava' | 'swamp_water' | 'canyon_river'
): THREE.ShaderMaterial {
  const mode =
    kind === 'lava' ? 1.0 : kind === 'swamp_water' ? 2.0 : kind === 'canyon_river' ? 3.0 : 0.0;
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMode: { value: mode },
    },
    vertexShader: `
      precision highp float;
      uniform float uTime;
      uniform float uMode;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vWave;

      void main() {
        vUv = uv;
        vec3 pos = position;
        vec4 localPos = vec4(pos, 1.0);
        #ifdef USE_INSTANCING
          localPos = instanceMatrix * localPos;
        #endif
        vec4 wp = modelMatrix * localPos;
        float speed = uMode == 1.0 ? 1.4 : (uMode == 3.0 ? 4.4 : 2.5);
        float amp = uMode == 1.0 ? 0.048 : 0.062;
        float flow = uMode == 3.0 ? wp.z * 2.8 - uTime * speed : wp.x * 2.2 + uTime * speed;
        float wave = sin(flow) * cos(wp.z * 2.1 - uTime * speed * 0.7) * amp;
        localPos.y += wave;
        vWave = wave;
        vec4 finalWp = modelMatrix * localPos;
        vWorldPos = finalWp.xyz;
        gl_Position = projectionMatrix * viewMatrix * finalWp;
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform float uMode;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vWave;

      void main() {
        float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
        float edgeFoam = 1.0 - smoothstep(0.015, 0.18, edgeDist);

        if (uMode == 1.0) {
          float n1 = sin(vWorldPos.x * 3.1 + uTime * 1.15) * cos(vWorldPos.z * 2.7 - uTime * 0.85);
          float n2 = sin((vWorldPos.x - vWorldPos.z) * 4.4 - uTime * 1.55);
          float n3 = cos(vWorldPos.x * 6.3 + vWorldPos.z * 5.8 + uTime * 0.9);
          float magma = clamp(0.48 + 0.32 * n1 + 0.24 * n2 + 0.14 * n3 + vWave * 4.0, 0.0, 1.0);
          vec3 crust = vec3(0.11, 0.025, 0.02);
          vec3 orange = vec3(1.25, 0.34, 0.04);
          vec3 bright = vec3(2.20, 1.18, 0.28);
          vec3 col = mix(crust, orange, smoothstep(0.28, 0.66, magma));
          col = mix(col, bright, smoothstep(0.66, 0.95, magma));
          col += vec3(1.15, 0.45, 0.10) * edgeFoam * 0.22;
          gl_FragColor = vec4(col, 1.0);
        } else if (uMode == 2.0) {
          float murk = sin(vWorldPos.x * 2.8 + uTime * 1.35) * cos(vWorldPos.z * 3.2 - uTime * 1.05);
          float swirl = sin(vWorldPos.x * 5.2 - vWorldPos.z * 4.6 + uTime * 1.8);
          vec3 deepSwamp = vec3(0.06, 0.18, 0.11);
          vec3 toxic = vec3(0.22, 0.48, 0.16);
          vec3 ether = vec3(0.55, 0.26, 0.78);
          vec3 col = mix(deepSwamp, toxic, 0.5 + 0.5 * murk);
          col = mix(col, ether, smoothstep(0.52, 0.94, swirl) * 0.55);
          col += vec3(0.48, 0.88, 0.38) * edgeFoam * 0.18;
          gl_FragColor = vec4(col, 0.92);
        } else {
          float flow = uMode == 3.0 ? (vWorldPos.z * 3.8 - uTime * 4.6) : (vWorldPos.x * 4.0 + uTime * 2.3);
          float ripple = sin(flow) * cos(vWorldPos.x * 3.2 - uTime * 2.0);
          float caustic = smoothstep(0.35, 0.92, sin(vWorldPos.x * 5.4 + uTime * 1.9) * sin(vWorldPos.z * 5.1 - uTime * 2.1));
          float spec = smoothstep(0.45, 0.92, ripple + vWave * 8.0);
          vec3 deepWater = vec3(0.03, 0.22, 0.42);
          vec3 shallowWater = uMode == 3.0 ? vec3(0.11, 0.58, 0.86) : vec3(0.07, 0.48, 0.75);
          vec3 col = mix(deepWater, shallowWater, 0.5 + 0.5 * ripple);
          col += vec3(0.35, 0.78, 0.96) * caustic * 0.28;
          col += vec3(0.75, 0.95, 1.05) * spec * (uMode == 3.0 ? 0.56 : 0.38);
          col = mix(col, vec3(0.92, 0.98, 1.05), edgeFoam * (uMode == 3.0 ? 0.28 : 0.24));
          gl_FragColor = vec4(col, 0.86);
        }
      }
    `,
    transparent: mode !== 1.0,
  });
}

function buildPropVoxels(prop: PropType, biome: StageDef['biome']): MicroVoxel[] {
  const v: MicroVoxel[] = [];
  const add = (
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    color: number,
    mat?: 'cloth' | 'leather' | 'steel' | 'gold' | 'stone' | 'ice' | 'emissive'
  ) => {
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        for (let z = z0; z <= z1; z++) {
          v.push({ x, y, z, color, emissive: mat === 'emissive', mat });
        }
      }
    }
  };

  switch (prop) {
    case 'tree': {
      if (biome === 'swamp') {
        add(-2, 0, -2, 2, 1, 2, 0x3b2f2f, 'leather');
        add(-1, 2, -1, 1, 7, 1, 0x44403c, 'leather');
        add(-4, 7, -1, -1, 9, 1, 0x44403c, 'leather');
        add(1, 8, -2, 4, 10, 1, 0x44403c, 'leather');
        add(-4, 5, 0, -4, 6, 0, 0x4d7c0f, 'cloth');
        add(4, 6, 0, 4, 7, 0, 0x4d7c0f, 'cloth');
      } else {
        add(-3, 0, -1, 3, 1, 1, 0x5c3a21, 'leather');
        add(-1, 0, -3, 1, 1, 3, 0x5c3a21, 'leather');
        add(-1, 2, -1, 1, 7, 1, 0x78350f, 'leather');
        add(-5, 7, -5, 5, 10, 5, 0x166534, 'cloth');
        add(-4, 11, -4, 4, 13, 4, 0x15803d, 'cloth');
        add(-2, 14, -2, 2, 16, 2, 0x22c55e, 'cloth');
      }
      break;
    }
    case 'pine': {
      add(-1, 0, -1, 1, 4, 1, 0x5c3a21, 'leather');
      add(-5, 4, -5, 5, 6, 5, 0x14532d, 'cloth');
      add(-4, 7, -4, 4, 9, 4, 0x166534, 'cloth');
      add(-3, 10, -3, 3, 12, 3, 0x15803d, 'cloth');
      add(-2, 13, -2, 2, 14, 2, 0xb8c4d4, 'cloth');
      add(-1, 15, -1, 1, 16, 1, 0xcbd5e1, 'cloth');
      break;
    }
    case 'pillar': {
      const col = biome === 'volcanic' ? 0x27272a : 0x57534e;
      const top = biome === 'volcanic' ? 0xf59e0b : 0x78716c;
      const mat = biome === 'volcanic' ? 'gold' : 'stone';
      add(-2, 0, -2, 2, 2, 2, col, 'stone');
      add(-1, 3, -1, 1, 13, 1, col, 'stone');
      add(-2, 14, -2, 2, 15, 2, top, mat);
      if (biome === 'forest') {
        add(-2, 4, 2, -1, 6, 2, 0x4d7c0f, 'cloth');
      }
      break;
    }
    case 'ruin_wall': {
      if (biome === 'forest') {
        add(-5, 0, -2, -3, 11, 2, 0x57534e, 'stone');
        add(3, 0, -2, 5, 8, 2, 0x57534e, 'stone');
        add(-4, 11, -2, 2, 13, 2, 0x6b6661, 'stone');
        add(-4, 4, 2, -2, 7, 2, 0x4d7c0f, 'cloth');
      } else if (biome === 'arctic') {
        add(-5, 0, -2, 5, 9, 2, 0x64748b, 'stone');
        add(-5, 10, -2, -3, 12, 2, 0x94a3b8, 'stone');
        add(-1, 10, -2, 1, 12, 2, 0x94a3b8, 'stone');
        add(3, 10, -2, 5, 12, 2, 0x94a3b8, 'stone');
        add(-5, 13, -2, -3, 13, 2, 0xb8c4d4, 'cloth');
      } else {
        add(-5, 0, -2, 5, 8, 2, 0x44403c, 'stone');
        add(-5, 9, -2, -2, 11, 2, 0x57534e, 'stone');
        add(2, 9, -2, 5, 11, 2, 0x57534e, 'stone');
      }
      break;
    }
    case 'torch':
    case 'brazier': {
      const flameCol = biome === 'swamp' ? 0x38bdf8 : 0xf97316;
      const tipCol = biome === 'swamp' ? 0xa5f3fc : 0xfef08a;
      add(-2, 0, -2, 2, 2, 2, 0x292524, 'steel');
      add(-1, 3, -1, 1, 7, 1, 0x3f3f46, 'steel');
      add(-2, 7, -2, 2, 8, 2, 0x78350f, 'gold');
      add(-1, 9, -1, 1, 11, 1, flameCol, 'emissive');
      add(0, 12, 0, 0, 14, 0, tipCol, 'emissive');
      break;
    }
    case 'crystal': {
      const crystalColor =
        biome === 'volcanic' ? 0xf43f5e : biome === 'swamp' ? 0xa855f7 : 0x38bdf8;
      const isIce = biome === 'arctic';
      add(-2, 0, -2, 2, 2, 2, 0x334155, 'stone');
      add(-2, 3, -1, 0, 9, 1, crystalColor, isIce ? 'ice' : 'emissive');
      add(0, 3, -2, 2, 13, 1, crystalColor, isIce ? 'ice' : 'emissive');
      add(0, 14, -1, 1, 16, 0, 0xe0f2fe, 'emissive');
      break;
    }
    case 'statue': {
      add(-2, 0, -2, 2, 2, 2, 0x475569, 'stone');
      add(-2, 3, -1, 2, 9, 1, 0x64748b, 'stone');
      add(-1, 10, -1, 1, 13, 1, 0x94a3b8, 'stone');
      add(-3, 5, 1, 3, 7, 2, 0x475569, 'stone');
      break;
    }
    case 'rock': {
      const rockCol = biome === 'canyon' ? 0x9a4e32 : 0x57534e;
      const rockTop = biome === 'canyon' ? 0xb45c3c : 0x78716c;
      add(-3, 0, -3, 3, 2, 3, rockCol, 'stone');
      add(-2, 3, -2, 2, 4, 2, rockTop, 'stone');
      break;
    }
    case 'banner': {
      add(0, 0, 0, 0, 16, 0, 0x94a3b8, 'steel');
      add(-3, 14, 0, 3, 14, 0, 0xf59e0b, 'gold');
      add(-2, 7, 1, 2, 13, 1, biome === 'volcanic' ? 0x991b1b : 0x1d4ed8, 'cloth');
      add(-1, 9, 2, 1, 11, 2, 0xfbbf24, 'emissive');
      break;
    }
  }
  return v;
}

function buildChestMesh(opened: boolean): THREE.Group {
  const v: MicroVoxel[] = [];
  const wood = 0x78350f;
  const gold = 0xf59e0b;
  for (let x = -3; x <= 3; x++) {
    for (let y = 0; y <= 3; y++) {
      for (let z = -2; z <= 2; z++) {
        const isTrim = x === -3 || x === 3 || (y === 3 && z === 2);
        v.push({ x, y, z, color: isTrim ? gold : wood, mat: isTrim ? 'gold' : 'leather' });
      }
    }
  }
  if (!opened) {
    for (let x = -3; x <= 3; x++) {
      for (let y = 4; y <= 5; y++) {
        for (let z = -2; z <= 2; z++) {
          const isTrim = x === -3 || x === 3 || (y === 4 && z === 2);
          v.push({
            x,
            y,
            z,
            color: isTrim ? gold : 0x92400e,
            mat: isTrim ? 'gold' : 'leather',
          });
        }
      }
    }
    v.push({ x: 0, y: 3, z: 3, color: 0xfef08a, emissive: true, mat: 'emissive' });
  }
  return buildMergedVoxelMesh(v, 0.085);
}

interface AmbientMote {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  phase: number;
  scale: number;
}

interface ChestHandle {
  group: THREE.Object3D;
  isGLTF: boolean;
  lid?: THREE.Object3D;
  opened: boolean;
}

interface InstanceBatchItem {
  matrix: THREE.Matrix4;
  tintHex?: number;
}

function computeStairYaw(
  tile: GridTile,
  tiles: Map<string, GridTile>
): number {
  const dirs: { dc: number; dr: number; yaw: number }[] = [
    { dc: 0, dr: -1, yaw: 0 }, // High toward North (-Z)
    { dc: 0, dr: 1, yaw: Math.PI }, // High toward South (+Z)
    { dc: -1, dr: 0, yaw: Math.PI / 2 }, // High toward West (-X)
    { dc: 1, dr: 0, yaw: -Math.PI / 2 }, // High toward East (+X)
  ];

  let bestHigherYaw: number | null = null;
  let bestHigherDelta = 0;
  let bestLowerOppositeYaw: number | null = null;
  let bestLowerDelta = 0;

  for (const d of dirs) {
    const nb = tiles.get(`${tile.col + d.dc},${tile.row + d.dr}`);
    if (!nb) continue;
    const diff = nb.height - tile.height;
    if (diff > bestHigherDelta) {
      bestHigherDelta = diff;
      bestHigherYaw = d.yaw;
    }
    if (diff < bestLowerDelta) {
      bestLowerDelta = diff;
      bestLowerOppositeYaw = d.yaw + Math.PI;
    }
  }

  return bestHigherYaw ?? bestLowerOppositeYaw ?? 0;
}

function getPropBiomeTint(prop: PropType, biome: StageDef['biome']): number | undefined {
  if (prop === 'rock' && biome === 'canyon') return 0xe7a283;
  if (prop === 'rock' && biome === 'arctic') return 0xdbeafe;
  if (prop === 'pillar' && biome === 'volcanic') return 0x6b6470;
  if (prop === 'banner' && biome === 'volcanic') return 0xffb3a7;
  if (prop === 'crystal' && biome === 'volcanic') return 0xff708a;
  if (prop === 'crystal' && biome === 'swamp') return 0xd8b4fe;
  return undefined;
}

export class TerrainDioramaVoxel3D {
  group = new THREE.Group();
  tileHitMeshes: THREE.Mesh[] = [];
  chestMeshes = new Map<string, ChestHandle>();
  liquidMaterials: THREE.ShaderMaterial[] = [];
  floatingCrystals: THREE.Object3D[] = [];

  private flickerEmissiveMaterials: THREE.MeshStandardMaterial[] = [];
  private clonedMaterialsToDispose: THREE.Material[] = [];
  private proceduralGeomsToDispose: THREE.BufferGeometry[] = [];
  private ambientMesh: THREE.InstancedMesh | null = null;
  private ambientMotes: AmbientMote[] = [];
  private maxAmbient = 140;
  private densityRatio = 1.0;
  private dummy = new THREE.Object3D();
  private stage: StageDef;
  private assets?: DioramaGLBAssets;

  constructor(stage: StageDef, tiles: Map<string, GridTile>, assets?: DioramaGLBAssets) {
    this.stage = stage;
    this.assets = assets;
    this.buildDioramaGeometry(stage, tiles);
    this.buildBiomeArchitecture(stage);
    this.buildAmbientParticles(stage);
  }

  private emitGLTFInstancedBatch(gltf: GLTF, items: InstanceBatchItem[], registerFlicker = false): void {
    if (items.length === 0) return;

    gltf.scene.updateMatrixWorld(true);
    const meshes: THREE.Mesh[] = [];
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        meshes.push(obj as THREE.Mesh);
      }
    });

    const tmpWorld = new THREE.Matrix4();
    const tmpColor = new THREE.Color();

    for (const srcMesh of meshes) {
      const srcMats = Array.isArray(srcMesh.material) ? srcMesh.material : [srcMesh.material];
      const baseMat = srcMats[0];
      if (!baseMat) continue;

      const mat = baseMat.clone();
      const matName = (mat.name || '').toLowerCase();
      const isEmissive = matName.startsWith('emissive');
      if (isEmissive && (mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        const stdMat = mat as THREE.MeshStandardMaterial;
        stdMat.emissiveIntensity = Math.max(stdMat.emissiveIntensity || 1.0, 2.2);
        if (registerFlicker) {
          this.flickerEmissiveMaterials.push(stdMat);
        }
      }
      this.clonedMaterialsToDispose.push(mat);

      srcMesh.geometry.userData.sharedGLTF = true;
      const im = new THREE.InstancedMesh(srcMesh.geometry, mat, items.length);
      im.castShadow = !isEmissive;
      im.receiveShadow = true;

      let hasColors = false;
      for (let i = 0; i < items.length; i++) {
        tmpWorld.multiplyMatrices(items[i].matrix, srcMesh.matrixWorld);
        im.setMatrixAt(i, tmpWorld);
        if (items[i].tintHex !== undefined) {
          tmpColor.setHex(items[i].tintHex!);
          im.setColorAt(i, tmpColor);
          hasColors = true;
        }
      }
      im.instanceMatrix.needsUpdate = true;
      if (hasColors && im.instanceColor) {
        im.instanceColor.needsUpdate = true;
      }
      this.group.add(im);
    }
  }

  private buildDioramaGeometry(stage: StageDef, tiles: Map<string, GridTile>): void {
    const positions: number[] = [];
    const normals: number[] = [];
    const colors: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const icePositions: number[] = [];
    const iceNormals: number[] = [];
    const iceColors: number[] = [];
    const iceUvs: number[] = [];
    const iceIndices: number[] = [];

    const tmpC = new THREE.Color();
    const boxGeom = new THREE.BoxGeometry(1, 1, 1);
    const boxPos = boxGeom.attributes.position;
    const boxNorm = boxGeom.attributes.normal;
    const boxUv = boxGeom.attributes.uv;
    const boxIndex = boxGeom.index!;

    const pushBox = (
      cx: number,
      cy: number,
      cz: number,
      sx: number,
      sy: number,
      sz: number,
      hex: number,
      topTint = 1.0,
      isIce = false
    ) => {
      const pArr = isIce ? icePositions : positions;
      const nArr = isIce ? iceNormals : normals;
      const cArr = isIce ? iceColors : colors;
      const uArr = isIce ? iceUvs : uvs;
      const iArr = isIce ? iceIndices : indices;

      const baseVertex = pArr.length / 3;
      tmpC.setHex(hex);
      for (let i = 0; i < boxPos.count; i++) {
        const vx = boxPos.getX(i) * sx + cx;
        const vy = boxPos.getY(i) * sy + cy;
        const vz = boxPos.getZ(i) * sz + cz;
        const ny = boxNorm.getY(i);
        pArr.push(vx, vy, vz);
        nArr.push(boxNorm.getX(i), ny, boxNorm.getZ(i));
        uArr.push(boxUv.getX(i), boxUv.getY(i));
        const shade = ny > 0.5 ? topTint : ny < -0.5 ? 0.52 : 0.80;
        cArr.push(tmpC.r * shade, tmpC.g * shade, tmpC.b * shade);
      }
      for (let i = 0; i < boxIndex.count; i++) {
        iArr.push(baseVertex + boxIndex.getX(i));
      }
    };

    const hitGeom = new THREE.BoxGeometry(TILE_SIZE * 0.96, 0.14, TILE_SIZE * 0.96);
    this.proceduralGeomsToDispose.push(hitGeom);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    this.clonedMaterialsToDispose.push(hitMat);

    const waterTiles: GridTile[] = [];
    const lavaTiles: GridTile[] = [];
    const baseDepth = -1.6;

    // Subterranean floating diorama crust & stalactites!
    const boardW = stage.cols * TILE_SIZE;
    const boardD = stage.rows * TILE_SIZE;
    const crustColor =
      stage.biome === 'volcanic' ? 0x18181b : stage.biome === 'canyon' ? 0x451a03 : 0x292524;
    const soilColor =
      stage.biome === 'arctic' ? 0x334155 : stage.biome === 'canyon' ? 0x7c3a23 : 0x44403c;
    pushBox(0, -0.55, 0, boardW + 0.45, 0.9, boardD + 0.45, soilColor);
    pushBox(0, -1.25, 0, boardW - 0.5, 0.7, boardD - 0.5, crustColor);

    for (let c = 0; c < stage.cols; c += 2) {
      for (let r = 0; r < stage.rows; r += 2) {
        const h = deterministicHash(c, r);
        if (h > 0.32) {
          const wPos = tileCenterWorld(c, r, 0, stage.cols, stage.rows);
          const stalH = 0.65 + h * 1.75;
          pushBox(wPos.x, baseDepth - stalH * 0.5, wPos.z, TILE_SIZE * 0.92, stalH, TILE_SIZE * 0.92, crustColor);
        }
      }
    }

    const colKeys = resolveColumnKeysForBiome(stage.biome);
    const primaryColGLTF =
      this.assets?.terrain.get(colKeys.primary) ?? this.assets?.terrain.get('column_stone');
    const earthColGLTF =
      this.assets?.terrain.get(colKeys.earth) ?? this.assets?.terrain.get('column_earth') ?? primaryColGLTF;

    const terrainBatches = new Map<string, { gltf: GLTF; items: InstanceBatchItem[] }>();
    const propBatches = new Map<string, { gltf: GLTF; items: InstanceBatchItem[]; flicker: boolean }>();

    const pushTerrainBatch = (key: string, gltf: GLTF, item: InstanceBatchItem) => {
      let b = terrainBatches.get(key);
      if (!b) {
        b = { gltf, items: [] };
        terrainBatches.set(key, b);
      }
      b.items.push(item);
    };

    const pushPropBatch = (key: string, gltf: GLTF, item: InstanceBatchItem, flicker: boolean) => {
      let b = propBatches.get(key);
      if (!b) {
        b = { gltf, items: [], flicker };
        propBatches.set(key, b);
      }
      b.items.push(item);
    };

    const flowerCoords: THREE.Vector3[] = [];
    const tmpObj = new THREE.Object3D();

    for (const tile of tiles.values()) {
      const center = tileCenterWorld(tile.col, tile.row, tile.height, stage.cols, stage.rows);
      const pal = getSurfacePalette(tile.surface, stage.biome);
      const hash = deterministicHash(tile.col, tile.row);
      const topHex = hash > 0.5 ? pal.topA : pal.topB;

      if (tile.surface === 'water') {
        waterTiles.push(tile);
        pushBox(
          center.x,
          (tile.height - 1) * STEP_HEIGHT * 0.5 - 0.1,
          center.z,
          TILE_SIZE * 0.99,
          tile.height * STEP_HEIGHT,
          TILE_SIZE * 0.99,
          pal.deep
        );
      } else if (tile.surface === 'lava') {
        lavaTiles.push(tile);
        pushBox(center.x, -0.2, center.z, TILE_SIZE * 0.99, 0.35, TILE_SIZE * 0.99, 0x1c1917);
      } else if (tile.isBridge) {
        const bridgeKey = stage.biome === 'canyon' ? 'bridge_stone' : 'bridge_wood';
        const bridgeGLTF =
          this.assets?.terrain.get(bridgeKey) ?? this.assets?.terrain.get('bridge_wood');

        if (bridgeGLTF) {
          tmpObj.position.set(center.x, center.y, center.z);
          tmpObj.rotation.set(0, stage.biome === 'canyon' ? Math.PI / 2 : 0, 0);
          tmpObj.scale.set(1, 1, 1);
          tmpObj.updateMatrix();
          pushTerrainBatch(bridgeKey, bridgeGLTF, { matrix: tmpObj.matrix.clone() });

          if ((tile.col + tile.row) % 2 === 0 && primaryColGLTF) {
            const pierH = Math.max(0.2, center.y - 0.24);
            tmpObj.position.set(center.x, center.y - 0.24, center.z);
            tmpObj.rotation.set(0, 0, 0);
            tmpObj.scale.set(0.28, pierH, 0.28);
            tmpObj.updateMatrix();
            pushTerrainBatch('__pier', primaryColGLTF, { matrix: tmpObj.matrix.clone() });
          }
          if (stage.biome === 'canyon' && (tile.row === 4 || tile.row === 7)) {
            const zSign = tile.row === 4 ? -1 : 1;
            pushBox(center.x, center.y + 0.32, center.z + zSign * TILE_SIZE * 0.42, 0.18, 0.64, 0.16, 0x7c3a23);
          }
        } else {
          const deckY = center.y - 0.14;
          pushBox(center.x, deckY, center.z, TILE_SIZE * 0.98, 0.28, TILE_SIZE * 0.98, topHex, 1.04);
          if ((tile.col + tile.row) % 2 === 0) {
            pushBox(center.x, deckY * 0.5, center.z, 0.34, deckY, 0.34, pal.deep);
          }
          if (stage.biome === 'canyon' && (tile.row === 4 || tile.row === 7)) {
            const zSign = tile.row === 4 ? -1 : 1;
            pushBox(center.x, center.y + 0.32, center.z + zSign * TILE_SIZE * 0.42, 0.18, 0.64, 0.16, 0x7c3a23);
          }
        }
      } else if (tile.isStair) {
        const stairKey = tile.surface === 'metal' ? 'stair_metal' : 'stair_stone';
        const stairGLTF =
          this.assets?.terrain.get(stairKey) ?? this.assets?.terrain.get('stair_stone');
        const totalH = tile.height * STEP_HEIGHT;
        const basePartH = Math.max(0.1, totalH - STEP_HEIGHT);

        if (stairGLTF) {
          const yaw = computeStairYaw(tile, tiles);
          tmpObj.position.set(center.x, center.y, center.z);
          tmpObj.rotation.set(0, yaw, 0);
          tmpObj.scale.set(1, 1, 1);
          tmpObj.updateMatrix();
          pushTerrainBatch(stairKey, stairGLTF, { matrix: tmpObj.matrix.clone() });

          if (primaryColGLTF && basePartH > 0.05) {
            tmpObj.position.set(center.x, basePartH, center.z);
            tmpObj.rotation.set(0, 0, 0);
            tmpObj.scale.set(1, basePartH + 0.12, 1);
            tmpObj.updateMatrix();
            pushTerrainBatch('__col_primary', primaryColGLTF, { matrix: tmpObj.matrix.clone() });
          } else {
            pushBox(center.x, basePartH * 0.5, center.z, TILE_SIZE * 0.96, basePartH, TILE_SIZE * 0.96, pal.side);
          }
        } else {
          pushBox(center.x, basePartH * 0.5, center.z, TILE_SIZE * 0.96, basePartH, TILE_SIZE * 0.96, pal.side);
          for (let s = 0; s < 3; s++) {
            const stepY = basePartH + ((s + 0.5) / 3) * STEP_HEIGHT;
            const stepSize = TILE_SIZE * (0.94 - s * 0.24);
            pushBox(center.x, stepY, center.z, stepSize, STEP_HEIGHT / 3, stepSize, topHex, 1.0 + s * 0.03);
          }
        }
      } else {
        const capGLTF = this.assets?.terrain.get(tile.surface);
        const colGLTF =
          tile.surface === 'grass' || tile.surface === 'swamp' ? earthColGLTF : primaryColGLTF;
        const fullH = tile.height * STEP_HEIGHT;
        const capH = 0.22;
        const bodyH = Math.max(0.1, fullH - capH);

        if (capGLTF) {
          const qRot =
            tile.surface === 'cobble' || tile.surface === 'stone' || tile.surface === 'grass'
              ? Math.floor(hash * 4) * (Math.PI / 2)
              : 0;
          tmpObj.position.set(center.x, center.y, center.z);
          tmpObj.rotation.set(0, qRot, 0);
          tmpObj.scale.set(1, 1, 1);
          tmpObj.updateMatrix();

          let tintHex: number | undefined;
          if (tile.surface === 'cobble' && stage.biome === 'canyon') {
            tintHex = hash > 0.5 ? 0xd99b78 : 0xc78462;
          } else if (tile.surface === 'stone' && stage.biome === 'canyon') {
            tintHex = hash > 0.5 ? 0xd47a55 : 0xbd6543;
          } else if (tile.surface === 'stone' && stage.biome === 'volcanic') {
            tintHex = 0x71717a;
          } else if (hash > 0.5) {
            tintHex = 0xf4f6fa;
          }

          pushTerrainBatch(tile.surface, capGLTF, { matrix: tmpObj.matrix.clone(), tintHex });

          if (colGLTF) {
            tmpObj.position.set(center.x, fullH - 0.22, center.z);
            tmpObj.rotation.set(0, 0, 0);
            tmpObj.scale.set(1, Math.max(0.15, bodyH + 0.14), 1);
            tmpObj.updateMatrix();
            const colKey =
              tile.surface === 'grass' || tile.surface === 'swamp' ? '__col_earth' : '__col_primary';
            pushTerrainBatch(colKey, colGLTF, { matrix: tmpObj.matrix.clone() });
          } else {
            pushBox(center.x, bodyH * 0.5, center.z, TILE_SIZE * 0.95, bodyH, TILE_SIZE * 0.95, pal.side);
          }

          if (tile.surface === 'grass' && !tile.prop && hash > 0.78) {
            flowerCoords.push(center.clone());
          }
        } else {
          const isIceSurface = tile.surface === 'ice';
          pushBox(center.x, bodyH * 0.5, center.z, TILE_SIZE * 0.95, bodyH, TILE_SIZE * 0.95, pal.side, 1.0, isIceSurface);
          pushBox(center.x, fullH - capH * 0.5, center.z, TILE_SIZE * 0.98, capH, TILE_SIZE * 0.98, topHex, 1.04, isIceSurface);

          if (tile.surface === 'grass' && !tile.prop && hash > 0.78) {
            flowerCoords.push(center.clone());
          }
        }
      }

      // Layer 1 isolates invisible hit meshes from GTAOPass normal/depth G-buffer!
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.position.set(center.x, center.y + 0.02, center.z);
      hitMesh.userData = { col: tile.col, row: tile.row, height: tile.height };
      hitMesh.layers.set(1);
      this.group.add(hitMesh);
      this.tileHitMeshes.push(hitMesh);

      if (tile.prop) {
        const propKey = resolvePropAssetKey(tile.prop, stage.biome);
        const propGLTF = this.assets?.props.get(propKey) ?? this.assets?.props.get(tile.prop);

        if (propGLTF && tile.prop !== 'crystal') {
          const yaw =
            tile.prop === 'tree' || tile.prop === 'pine' || tile.prop === 'rock'
              ? hash * Math.PI * 2
              : tile.prop === 'ruin_wall' || tile.prop === 'banner' || tile.prop === 'statue'
                ? 0
                : Math.floor(hash * 4) * (Math.PI / 2);
          tmpObj.position.set(center.x, center.y, center.z);
          tmpObj.rotation.set(0, yaw, 0);
          tmpObj.scale.set(1, 1, 1);
          tmpObj.updateMatrix();
          const isTorch = tile.prop === 'torch' || tile.prop === 'brazier';
          pushPropBatch(
            propKey,
            propGLTF,
            { matrix: tmpObj.matrix.clone(), tintHex: getPropBiomeTint(tile.prop, stage.biome) },
            isTorch
          );
        } else if (propGLTF && tile.prop === 'crystal') {
          // Floating animated crystal gets its own cloned Object3D
          const cObj = propGLTF.scene.clone(true);
          cObj.position.set(center.x, center.y + 0.04, center.z);
          const tint = getPropBiomeTint('crystal', stage.biome);
          cObj.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
              const m = node as THREE.Mesh;
              m.geometry.userData.sharedGLTF = true;
              const mat = (m.material as THREE.MeshStandardMaterial).clone();
              if (tint && !mat.name.toLowerCase().startsWith('stone')) {
                mat.color.setHex(tint);
                if (mat.name.toLowerCase().startsWith('emissive')) {
                  mat.emissive.setHex(tint);
                }
              }
              this.clonedMaterialsToDispose.push(mat);
              m.material = mat;
              m.castShadow = !mat.name.toLowerCase().startsWith('emissive');
              m.receiveShadow = true;
            }
          });
          this.group.add(cObj);
          this.floatingCrystals.push(cObj);
        } else {
          const voxels = buildPropVoxels(tile.prop, stage.biome);
          const propMesh = buildMergedVoxelMesh(voxels, 0.082);
          propMesh.position.set(center.x, center.y + 0.03, center.z);
          this.group.add(propMesh);
          if (tile.prop === 'crystal') {
            this.floatingCrystals.push(propMesh);
          }
        }
      }

      if (tile.chest) {
        const chestGLTF = this.assets?.props.get('chest');
        if (chestGLTF) {
          const chestObj = chestGLTF.scene.clone(true);
          chestObj.position.set(center.x, center.y, center.z);
          chestObj.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
              const m = node as THREE.Mesh;
              m.geometry.userData.sharedGLTF = true;
              m.castShadow = true;
              m.receiveShadow = true;
            }
          });
          const lid = chestObj.getObjectByName('ChestLid') ?? undefined;
          if (lid && tile.chest.opened) {
            lid.rotation.x = -Math.PI * 0.56;
          }
          this.group.add(chestObj);
          this.chestMeshes.set(tile.chest.id, {
            group: chestObj,
            isGLTF: true,
            lid,
            opened: tile.chest.opened,
          });
        } else {
          const chestMesh = buildChestMesh(tile.chest.opened);
          chestMesh.position.set(center.x, center.y + 0.03, center.z);
          this.group.add(chestMesh);
          this.chestMeshes.set(tile.chest.id, {
            group: chestMesh,
            isGLTF: false,
            opened: tile.chest.opened,
          });
        }
      }
    }

    // Emit instanced GLB batches (massive draw call savings)
    for (const batch of terrainBatches.values()) {
      this.emitGLTFInstancedBatch(batch.gltf, batch.items, false);
    }
    for (const batch of propBatches.values()) {
      this.emitGLTFInstancedBatch(batch.gltf, batch.items, batch.flicker);
    }

    // Fallback/base merged geometry for subterranean crust + un-instanced tiles
    if (indices.length > 0) {
      const terrainGeom = new THREE.BufferGeometry();
      terrainGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      terrainGeom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      terrainGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      terrainGeom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      terrainGeom.setIndex(indices);
      terrainGeom.computeBoundingSphere();
      this.proceduralGeomsToDispose.push(terrainGeom);

      const terrainMesh = new THREE.Mesh(terrainGeom, getVoxelPBRMaterial('stone'));
      terrainMesh.castShadow = true;
      terrainMesh.receiveShadow = true;
      this.group.add(terrainMesh);
    }

    if (iceIndices.length > 0) {
      const iceGeom = new THREE.BufferGeometry();
      iceGeom.setAttribute('position', new THREE.Float32BufferAttribute(icePositions, 3));
      iceGeom.setAttribute('normal', new THREE.Float32BufferAttribute(iceNormals, 3));
      iceGeom.setAttribute('color', new THREE.Float32BufferAttribute(iceColors, 3));
      iceGeom.setAttribute('uv', new THREE.Float32BufferAttribute(iceUvs, 2));
      iceGeom.setIndex(iceIndices);
      iceGeom.computeBoundingSphere();
      this.proceduralGeomsToDispose.push(iceGeom);
      const iceMesh = new THREE.Mesh(iceGeom, getVoxelPBRMaterial('ice'));
      iceMesh.receiveShadow = true;
      this.group.add(iceMesh);
    }

    if (flowerCoords.length > 0) {
      const flGeom = new THREE.BoxGeometry(0.11, 0.14, 0.11);
      const flMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
      this.proceduralGeomsToDispose.push(flGeom);
      this.clonedMaterialsToDispose.push(flMat);
      const flMesh = new THREE.InstancedMesh(flGeom, flMat, flowerCoords.length);
      const pal = [0xfef08a, 0xf472b6, 0x38bdf8, 0xfb923c];
      const d = new THREE.Object3D();
      const col = new THREE.Color();
      flowerCoords.forEach((fc, idx) => {
        d.position.set(
          fc.x + (idx % 2 === 0 ? 0.34 : -0.34),
          fc.y + 0.06,
          fc.z + (idx % 3 === 0 ? 0.25 : -0.28)
        );
        d.updateMatrix();
        flMesh.setMatrixAt(idx, d.matrix);
        col.setHex(pal[idx % pal.length]);
        flMesh.setColorAt(idx, col);
      });
      this.group.add(flMesh);
    }

    const buildLiquidPlane = (
      list: GridTile[],
      kind: 'water' | 'lava' | 'swamp_water' | 'canyon_river'
    ) => {
      if (list.length === 0) return;
      const mat = createLiquidShaderMaterial(kind);
      this.liquidMaterials.push(mat);
      const planeGeom = new THREE.PlaneGeometry(TILE_SIZE * 0.99, TILE_SIZE * 0.99, 4, 4);
      planeGeom.rotateX(-Math.PI / 2);
      this.proceduralGeomsToDispose.push(planeGeom);
      const im = new THREE.InstancedMesh(planeGeom, mat, list.length);
      const d = new THREE.Object3D();
      for (let i = 0; i < list.length; i++) {
        const t = list[i];
        const c = tileCenterWorld(t.col, t.row, t.height, stage.cols, stage.rows);
        d.position.set(c.x, c.y - 0.11, c.z);
        d.rotation.set(0, 0, 0);
        d.scale.set(1, 1, 1);
        d.updateMatrix();
        im.setMatrixAt(i, d.matrix);
      }
      im.instanceMatrix.needsUpdate = true;
      this.group.add(im);
    };

    const waterKind =
      stage.biome === 'canyon'
        ? 'canyon_river'
        : stage.biome === 'swamp'
          ? 'swamp_water'
          : 'water';
    buildLiquidPlane(waterTiles, waterKind);
    buildLiquidPlane(lavaTiles, 'lava');
    boxGeom.dispose();
  }

  private buildBiomeArchitecture(stage: StageDef): void {
    if (stage.biome === 'forest') {
      const edge = tileCenterWorld(0, 6, 1, stage.cols, stage.rows);
      const geom = new THREE.PlaneGeometry(TILE_SIZE * 0.92, 2.2);
      this.proceduralGeomsToDispose.push(geom);
      const cascade = new THREE.Mesh(geom, createLiquidShaderMaterial('canyon_river'));
      this.liquidMaterials.push(cascade.material as THREE.ShaderMaterial);
      cascade.position.set(edge.x - TILE_SIZE * 0.51, edge.y - 1.1, edge.z);
      cascade.rotation.y = -Math.PI / 2;
      this.group.add(cascade);
    } else if (stage.biome === 'canyon') {
      const geom = new THREE.PlaneGeometry(TILE_SIZE * 0.96, 2.5);
      this.proceduralGeomsToDispose.push(geom);
      for (const r of [0, stage.rows - 1]) {
        for (const c of [5, 6, 7]) {
          const edge = tileCenterWorld(c, r, 1, stage.cols, stage.rows);
          const fall = new THREE.Mesh(geom, createLiquidShaderMaterial('canyon_river'));
          this.liquidMaterials.push(fall.material as THREE.ShaderMaterial);
          fall.position.set(
            edge.x,
            edge.y - 1.25,
            edge.z + (r === 0 ? -TILE_SIZE * 0.51 : TILE_SIZE * 0.51)
          );
          if (r === 0) fall.rotation.y = Math.PI;
          this.group.add(fall);
        }
      }
    } else if (stage.biome === 'arctic') {
      const gatePos = tileCenterWorld(6, 3, 4, stage.cols, stage.rows);
      const archVoxels: MicroVoxel[] = [];
      for (let x = -5; x <= 5; x++) {
        archVoxels.push({ x, y: 12, z: 0, color: 0x334155, mat: 'steel' });
        if (x % 2 === 0) {
          for (let y = 7; y <= 11; y++) {
            archVoxels.push({ x, y, z: 0, color: 0x1e293b, mat: 'steel' });
          }
        }
      }
      for (let y = 0; y <= 12; y++) {
        archVoxels.push({ x: -6, y, z: 0, color: 0x475569, mat: 'stone' });
        archVoxels.push({ x: 6, y, z: 0, color: 0x475569, mat: 'stone' });
      }
      const arch = buildMergedVoxelMesh(archVoxels, 0.11);
      arch.position.copy(gatePos);
      this.group.add(arch);
    } else if (stage.biome === 'volcanic') {
      const thronePos = tileCenterWorld(6, 0, 6, stage.cols, stage.rows);
      const archVb: MicroVoxel[] = [];
      for (let y = 0; y <= 24; y++) {
        archVb.push({ x: -10, y, z: -4, color: 0x18181b, mat: 'stone' });
        archVb.push({ x: -9, y, z: -4, color: 0xf59e0b, mat: 'gold' });
        archVb.push({ x: 18, y, z: -4, color: 0x18181b, mat: 'stone' });
        archVb.push({ x: 17, y, z: -4, color: 0xf59e0b, mat: 'gold' });
      }
      for (let x = -10; x <= 18; x++) {
        archVb.push({ x, y: 24, z: -4, color: 0x18181b, mat: 'stone' });
        archVb.push({ x, y: 23, z: -4, color: 0xf59e0b, mat: 'gold' });
      }
      for (let x = -5; x <= 13; x += 3) {
        for (let y = 8; y <= 20; y += 2) {
          archVb.push({
            x,
            y,
            z: -4,
            color: (x + y) % 2 === 0 ? 0xf43f5e : 0xf97316,
            emissive: true,
            mat: 'emissive',
          });
        }
      }
      const throneArch = buildMergedVoxelMesh(archVb, 0.11);
      throneArch.position.copy(thronePos);
      this.group.add(throneArch);
    }
  }

  private buildAmbientParticles(stage: StageDef): void {
    const geom = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    this.proceduralGeomsToDispose.push(geom);
    this.clonedMaterialsToDispose.push(mat);
    this.ambientMesh = new THREE.InstancedMesh(geom, mat, this.maxAmbient);
    this.ambientMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.ambientMesh.frustumCulled = false;

    const palMap: Record<StageDef['biome'], number[]> = {
      forest: [0xfde047, 0x86efac, 0xfbbf24],
      canyon: [0xe0f2fe, 0xbae6fd, 0xffffff],
      arctic: [0xffffff, 0xe0f2fe, 0xbae6fd],
      swamp: [0xa3e635, 0xc084fc, 0x38bdf8],
      volcanic: [0xff5500, 0xfef08a, 0x71717a],
    };
    const pal = palMap[stage.biome];
    const tmpCol = new THREE.Color();

    const spanX = stage.cols * TILE_SIZE;
    const spanZ = stage.rows * TILE_SIZE;

    for (let i = 0; i < this.maxAmbient; i++) {
      const x = (Math.random() - 0.5) * spanX * 1.15;
      const z = (Math.random() - 0.5) * spanZ * 1.15;
      const y = 0.6 + Math.random() * 6.5;

      let vel: THREE.Vector3;
      if (stage.biome === 'arctic') {
        vel = new THREE.Vector3(1.6 + Math.random(), -1.8 - Math.random(), 0.9);
      } else if (stage.biome === 'volcanic' || stage.biome === 'canyon') {
        vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.6,
          0.8 + Math.random() * 1.1,
          (Math.random() - 0.5) * 0.6
        );
      } else if (stage.biome === 'forest') {
        vel = new THREE.Vector3(0.45 + Math.random() * 0.3, -0.45 - Math.random() * 0.3, 0.3);
      } else {
        vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          Math.sin(i) * 0.25,
          (Math.random() - 0.5) * 0.5
        );
      }

      this.ambientMotes.push({
        pos: new THREE.Vector3(x, y, z),
        vel,
        phase: Math.random() * Math.PI * 2,
        scale: 0.65 + Math.random() * 0.85,
      });

      tmpCol.setHex(pal[i % pal.length]);
      this.ambientMesh.setColorAt(i, tmpCol);
    }
    this.group.add(this.ambientMesh);
  }

  setParticleDensity(ratio: number): void {
    this.densityRatio = Math.max(0, Math.min(1, ratio));
  }

  markChestOpened(chestId: string): void {
    const handle = this.chestMeshes.get(chestId);
    if (!handle || handle.opened) return;
    handle.opened = true;

    if (handle.isGLTF) {
      if (handle.lid) {
        handle.lid.rotation.x = -Math.PI * 0.56;
      }
      return;
    }

    const pos = handle.group.position.clone();
    this.group.remove(handle.group);
    const openedMesh = buildChestMesh(true);
    openedMesh.position.copy(pos);
    this.group.add(openedMesh);
    this.chestMeshes.set(chestId, { group: openedMesh, isGLTF: false, opened: true });
  }

  update(elapsed: number, dt = 0.016): void {
    for (const mat of this.liquidMaterials) {
      mat.uniforms.uTime.value = elapsed;
    }
    for (let i = 0; i < this.floatingCrystals.length; i++) {
      this.floatingCrystals[i].rotation.y = elapsed * 0.65 + i;
    }

    // Subtle organic torch / brazier flicker
    for (let i = 0; i < this.flickerEmissiveMaterials.length; i++) {
      const m = this.flickerEmissiveMaterials[i];
      m.emissiveIntensity = 2.3 + Math.sin(elapsed * 9.5 + i * 1.7) * 0.35 + Math.cos(elapsed * 15.2) * 0.18;
    }

    if (this.ambientMesh) {
      const activeCount = Math.floor(this.maxAmbient * this.densityRatio);
      const halfX = this.stage.cols * TILE_SIZE * 0.6;
      const halfZ = this.stage.rows * TILE_SIZE * 0.6;
      for (let i = 0; i < this.maxAmbient; i++) {
        if (i >= activeCount) {
          this.dummy.scale.set(0, 0, 0);
          this.dummy.updateMatrix();
          this.ambientMesh.setMatrixAt(i, this.dummy.matrix);
          continue;
        }
        const m = this.ambientMotes[i];
        m.pos.addScaledVector(m.vel, dt);
        m.pos.x += Math.sin(elapsed * 1.8 + m.phase) * 0.008;
        if (m.pos.y < 0.2) m.pos.y = 7.2;
        if (m.pos.y > 7.5) m.pos.y = 0.4;
        if (m.pos.x > halfX) m.pos.x = -halfX;
        if (m.pos.x < -halfX) m.pos.x = halfX;
        if (m.pos.z > halfZ) m.pos.z = -halfZ;
        if (m.pos.z < -halfZ) m.pos.z = halfZ;

        this.dummy.position.copy(m.pos);
        this.dummy.rotation.set(elapsed + m.phase, elapsed * 0.8, m.phase);
        this.dummy.scale.setScalar(m.scale);
        this.dummy.updateMatrix();
        this.ambientMesh.setMatrixAt(i, this.dummy.matrix);
      }
      this.ambientMesh.instanceMatrix.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const g of this.proceduralGeomsToDispose) {
      g.dispose();
    }
    this.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        if (m.geometry && !m.geometry.userData?.sharedGLTF) {
          m.geometry.dispose();
        }
      }
    });
    for (const mat of this.clonedMaterialsToDispose) {
      mat.dispose();
    }
    for (const lm of this.liquidMaterials) {
      lm.dispose();
    }
  }
}
