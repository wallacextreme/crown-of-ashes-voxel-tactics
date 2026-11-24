import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { clone as skeletonClone } from 'three/addons/utils/SkeletonUtils.js';
import type { ArchetypeId, PropType, StageDef, SurfaceType } from '../types/tactics.ts';

export interface DioramaGLBAssets {
  terrain: Map<string, GLTF>;
  props: Map<string, GLTF>;
  characters: Map<ArchetypeId, GLTF>;
}

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const promiseCache = new Map<string, Promise<GLTF | null>>();
const resolvedCache = new Map<string, GLTF | null>();

async function loadGLB(path: string): Promise<GLTF | null> {
  const existing = promiseCache.get(path);
  if (existing) return existing;

  const p = gltfLoader
    .loadAsync(path)
    .then((gltf) => {
      resolvedCache.set(path, gltf);
      return gltf;
    })
    .catch(() => {
      // Missing phase-2/fallback asset resolves cleanly to null without breaking gameplay
      resolvedCache.set(path, null);
      return null;
    });

  promiseCache.set(path, p);
  return p;
}

export function loadCharacterGLB(jobId: ArchetypeId): Promise<GLTF | null> {
  return loadGLB(`./assets/models/characters/${jobId}.glb`);
}

export function loadTerrainGLB(key: string): Promise<GLTF | null> {
  return loadGLB(`./assets/models/terrain/${key}.glb`);
}

export function loadPropGLB(key: string): Promise<GLTF | null> {
  return loadGLB(`./assets/models/props/${key}.glb`);
}

export function getCachedCharacterGLB(jobId: ArchetypeId): GLTF | null {
  return resolvedCache.get(`./assets/models/characters/${jobId}.glb`) ?? null;
}

export function getCachedTerrainGLB(key: string): GLTF | null {
  return resolvedCache.get(`./assets/models/terrain/${key}.glb`) ?? null;
}

export function getCachedPropGLB(key: string): GLTF | null {
  return resolvedCache.get(`./assets/models/props/${key}.glb`) ?? null;
}

export function cloneCharacterGLTF(gltf: GLTF): THREE.Object3D {
  const clone = skeletonClone(gltf.scene);
  clone.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      const m = node as THREE.Mesh;
      const mat = m.material as THREE.MeshStandardMaterial;
      const isEmissive = Boolean(mat && mat.name && mat.name.startsWith('emissive'));
      m.castShadow = !isEmissive;
      m.receiveShadow = true;
      m.frustumCulled = false;
    }
  });
  return clone;
}

export function resolvePropAssetKey(prop: PropType, biome: StageDef['biome']): string {
  if (prop === 'tree' && biome === 'swamp') return 'tree_swamp';
  if (prop === 'ruin_wall' && biome === 'arctic') return 'ruin_wall_arctic';
  return prop;
}

export function resolveColumnKeysForBiome(biome: StageDef['biome']): {
  primary: string;
  earth: string;
} {
  switch (biome) {
    case 'canyon':
      return { primary: 'column_canyon', earth: 'column_canyon' };
    case 'arctic':
      return { primary: 'column_arctic', earth: 'column_arctic' };
    case 'volcanic':
      return { primary: 'column_obsidian', earth: 'column_obsidian' };
    case 'swamp':
      return { primary: 'column_stone', earth: 'column_earth' };
    case 'forest':
    default:
      return { primary: 'column_stone', earth: 'column_earth' };
  }
}

export async function preloadStageAssets(
  stage: StageDef,
  jobIds: Iterable<ArchetypeId>
): Promise<DioramaGLBAssets> {
  const terrainKeys = new Set<string>();
  const propKeys = new Set<string>();

  const cols = resolveColumnKeysForBiome(stage.biome);
  terrainKeys.add(cols.primary);
  terrainKeys.add(cols.earth);

  for (const tile of stage.tiles) {
    const s: SurfaceType = tile.surface;
    if (s !== 'water' && s !== 'lava') {
      terrainKeys.add(s);
    }
    if (tile.isStair) {
      terrainKeys.add(s === 'metal' ? 'stair_metal' : 'stair_stone');
    }
    if (tile.isBridge) {
      terrainKeys.add(stage.biome === 'canyon' ? 'bridge_stone' : 'bridge_wood');
    }
    if (tile.prop) {
      propKeys.add(resolvePropAssetKey(tile.prop, stage.biome));
    }
    if (tile.chest) {
      propKeys.add('chest');
    }
  }

  const uniqueJobs = Array.from(new Set(jobIds));
  const terrainList = Array.from(terrainKeys);
  const propList = Array.from(propKeys);

  const [terrainRes, propRes, charRes] = await Promise.all([
    Promise.all(terrainList.map(async (k) => [k, await loadTerrainGLB(k)] as const)),
    Promise.all(propList.map(async (k) => [k, await loadPropGLB(k)] as const)),
    Promise.all(uniqueJobs.map(async (id) => [id, await loadCharacterGLB(id)] as const)),
  ]);

  const terrain = new Map<string, GLTF>();
  for (const [k, gltf] of terrainRes) {
    if (gltf) terrain.set(k, gltf);
  }
  // Fallback column_stone if biome column not generated yet
  if (!terrain.has(cols.primary)) {
    const stoneCol = await loadTerrainGLB('column_stone');
    if (stoneCol) terrain.set('column_stone', stoneCol);
  }
  if (!terrain.has(cols.earth)) {
    const earthCol = await loadTerrainGLB('column_earth');
    if (earthCol) terrain.set('column_earth', earthCol);
  }

  const props = new Map<string, GLTF>();
  for (const [k, gltf] of propRes) {
    if (gltf) props.set(k, gltf);
  }

  const characters = new Map<ArchetypeId, GLTF>();
  for (const [id, gltf] of charRes) {
    if (gltf) characters.set(id, gltf);
  }

  return { terrain, props, characters };
}

export function buildSyncCachedStageAssets(
  stage: StageDef,
  jobIds: Iterable<ArchetypeId>
): DioramaGLBAssets {
  const terrain = new Map<string, GLTF>();
  const props = new Map<string, GLTF>();
  const characters = new Map<ArchetypeId, GLTF>();

  const cols = resolveColumnKeysForBiome(stage.biome);
  for (const ck of [cols.primary, cols.earth, 'column_stone', 'column_earth']) {
    const g = getCachedTerrainGLB(ck);
    if (g) terrain.set(ck, g);
  }

  for (const tile of stage.tiles) {
    if (tile.surface !== 'water' && tile.surface !== 'lava') {
      const g = getCachedTerrainGLB(tile.surface);
      if (g) terrain.set(tile.surface, g);
    }
    if (tile.isStair) {
      const sk = tile.surface === 'metal' ? 'stair_metal' : 'stair_stone';
      const g = getCachedTerrainGLB(sk);
      if (g) terrain.set(sk, g);
    }
    if (tile.isBridge) {
      const bk = stage.biome === 'canyon' ? 'bridge_stone' : 'bridge_wood';
      const g = getCachedTerrainGLB(bk);
      if (g) terrain.set(bk, g);
    }
    if (tile.prop) {
      const pk = resolvePropAssetKey(tile.prop, stage.biome);
      const g = getCachedPropGLB(pk);
      if (g) props.set(pk, g);
    }
    if (tile.chest) {
      const g = getCachedPropGLB('chest');
      if (g) props.set('chest', g);
    }
  }

  for (const id of jobIds) {
    const g = getCachedCharacterGLB(id);
    if (g) characters.set(id, g);
  }

  return { terrain, props, characters };
}
