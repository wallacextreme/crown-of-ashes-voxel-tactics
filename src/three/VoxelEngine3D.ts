import * as THREE from 'three';
import type { ArchetypeId, Team } from '../types/tactics.ts';
import {
  type VoxelMaterialKind,
  createContactShadowMaterial,
  getVoxelPBRMaterial,
} from './ProceduralVoxelPBR.ts';

export interface MicroVoxel {
  x: number;
  y: number;
  z: number;
  color: number;
  emissive?: boolean;
  metalness?: number;
  roughness?: number;
  mat?: VoxelMaterialKind;
}

export interface CharacterVoxelRig {
  root: THREE.Group;
  bodyPivot: THREE.Group;
  headPivot: THREE.Group;
  torsoPivot: THREE.Group;
  leftArmPivot: THREE.Group;
  rightArmPivot: THREE.Group;
  weaponPivot: THREE.Group;
  shieldPivot: THREE.Group;
  capePivot: THREE.Group;
  legsPivot: THREE.Group;
  leftLegPivot: THREE.Group;
  rightLegPivot: THREE.Group;
  grimoirePivot?: THREE.Group;
  orbitingRunesPivot?: THREE.Group;
  bowStringPivot?: THREE.Group;
  scarfPivot?: THREE.Group;
  shadowDisc: THREE.Mesh;
  teamRing: THREE.Mesh;
  materials: THREE.Material[];
  heightWorld: number;
  voxelSize: number;
}

export type UnitAnimState =
  | 'idle'
  | 'walk'
  | 'slash'
  | 'bow'
  | 'dual'
  | 'cast'
  | 'jump_up'
  | 'jump_down'
  | 'hit'
  | 'block'
  | 'dead';

interface FaceDef {
  dir: [number, number, number];
  corners: [number, number, number][];
  shade: number;
}

const VOXEL_FACES: FaceDef[] = [
  {
    // +X
    dir: [1, 0, 0],
    corners: [
      [1, 0, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
    ],
    shade: 0.94,
  },
  {
    // -X
    dir: [-1, 0, 0],
    corners: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    shade: 0.89,
  },
  {
    // +Y
    dir: [0, 1, 0],
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    shade: 1.0,
  },
  {
    // -Y
    dir: [0, -1, 0],
    corners: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
    shade: 0.72,
  },
  {
    // +Z
    dir: [0, 0, 1],
    corners: [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
    shade: 0.97,
  },
  {
    // -Z
    dir: [0, 0, -1],
    corners: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    shade: 0.86,
  },
];

const QUAD_UVS: [number, number][] = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
];

function key3(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function resolveMaterialKind(v: MicroVoxel): VoxelMaterialKind {
  if (v.emissive) return 'emissive';
  if (v.mat) return v.mat;
  if ((v.metalness ?? 0) >= 0.82) return 'gold';
  if ((v.metalness ?? 0) >= 0.45) return 'steel';
  return 'cloth';
}

/**
 * Merges a 3D micro-voxel list into optimized BufferGeometry meshes grouped by PBR material kind
 * with hidden face culling, True 4-Vertex Voxel Ambient Occlusion, vertical gradient, and micro-bevel UVs.
 */
export function buildMergedVoxelMesh(
  voxels: MicroVoxel[],
  voxelSize = 0.048,
  pivotOffset: [number, number, number] = [0, 0, 0]
): THREE.Group {
  const group = new THREE.Group();
  if (voxels.length === 0) return group;

  const map = new Map<string, MicroVoxel>();
  let minY = Infinity;
  let maxY = -Infinity;
  for (const v of voxels) {
    const rx = Math.round(v.x);
    const ry = Math.round(v.y);
    const rz = Math.round(v.z);
    if (ry < minY) minY = ry;
    if (ry > maxY) maxY = ry;
    map.set(key3(rx, ry, rz), { ...v, x: rx, y: ry, z: rz });
  }
  const spanY = Math.max(1, maxY - minY);

  const hasOpaqueAt = (x: number, y: number, z: number): boolean => {
    return map.has(key3(x, y, z));
  };

  type Bucket = {
    positions: number[];
    normals: number[];
    colors: number[];
    uvs: number[];
    indices: number[];
  };
  const buckets = new Map<VoxelMaterialKind, Bucket>();
  const getBucket = (kind: VoxelMaterialKind): Bucket => {
    let b = buckets.get(kind);
    if (!b) {
      b = { positions: [], normals: [], colors: [], uvs: [], indices: [] };
      buckets.set(kind, b);
    }
    return b;
  };

  const tmpColor = new THREE.Color();

  for (const v of map.values()) {
    const kind = resolveMaterialKind(v);
    const b = getBucket(kind);
    tmpColor.setHex(v.color);
    const vertGrad = v.emissive ? 1.0 : 0.85 + 0.15 * ((v.y - minY) / spanY);

    for (const face of VOXEL_FACES) {
      const nx = v.x + face.dir[0];
      const ny = v.y + face.dir[1];
      const nz = v.z + face.dir[2];
      if (hasOpaqueAt(nx, ny, nz)) continue; // Cull hidden internal face

      const baseIdx = b.positions.length / 3;
      const aoVals: number[] = [];

      // Identify the 2 tangent axes perpendicular to face.dir
      const tangentAxes: [number, number, number][] = [];
      if (face.dir[0] === 0) tangentAxes.push([1, 0, 0]);
      if (face.dir[1] === 0) tangentAxes.push([0, 1, 0]);
      if (face.dir[2] === 0) tangentAxes.push([0, 0, 1]);
      const axA = tangentAxes[0];
      const axB = tangentAxes[1];

      for (let ci = 0; ci < 4; ci++) {
        const c = face.corners[ci];
        const px = (v.x + c[0] - 0.5 + pivotOffset[0]) * voxelSize;
        const py = (v.y + c[1] - 0.5 + pivotOffset[1]) * voxelSize;
        const pz = (v.z + c[2] - 0.5 + pivotOffset[2]) * voxelSize;
        b.positions.push(px, py, pz);
        b.normals.push(face.dir[0], face.dir[1], face.dir[2]);
        b.uvs.push(QUAD_UVS[ci][0], QUAD_UVS[ci][1]);

        let ao = 1.0;
        if (!v.emissive) {
          const sA = axA[0] ? (c[0] ? 1 : -1) : axA[1] ? (c[1] ? 1 : -1) : c[2] ? 1 : -1;
          const sB = axB[0] ? (c[0] ? 1 : -1) : axB[1] ? (c[1] ? 1 : -1) : c[2] ? 1 : -1;

          const side1 = hasOpaqueAt(nx + axA[0] * sA, ny + axA[1] * sA, nz + axA[2] * sA) ? 1 : 0;
          const side2 = hasOpaqueAt(nx + axB[0] * sB, ny + axB[1] * sB, nz + axB[2] * sB) ? 1 : 0;
          const corner = hasOpaqueAt(
            nx + axA[0] * sA + axB[0] * sB,
            ny + axA[1] * sA + axB[1] * sB,
            nz + axA[2] * sA + axB[2] * sB
          )
            ? 1
            : 0;

          ao = side1 && side2 ? 0.42 : 1.0 - (side1 + side2 + corner) * 0.17;
        }
        aoVals.push(ao);

        const shade = v.emissive ? 1.0 : ao * vertGrad * face.shade;
        b.colors.push(tmpColor.r * shade, tmpColor.g * shade, tmpColor.b * shade);
      }

      // Flip quad diagonal cleanly according to corner AO weights
      if (aoVals[0] + aoVals[2] > aoVals[1] + aoVals[3]) {
        b.indices.push(baseIdx, baseIdx + 1, baseIdx + 2, baseIdx, baseIdx + 2, baseIdx + 3);
      } else {
        b.indices.push(baseIdx + 1, baseIdx + 2, baseIdx + 3, baseIdx + 1, baseIdx + 3, baseIdx);
      }
    }
  }

  for (const [kind, b] of buckets.entries()) {
    if (b.indices.length === 0) continue;
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(b.positions, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(b.normals, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(b.colors, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(b.uvs, 2));
    geom.setIndex(b.indices);
    geom.computeBoundingSphere();

    const mesh = new THREE.Mesh(geom, getVoxelPBRMaterial(kind));
    mesh.castShadow = kind !== 'emissive';
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  return group;
}

// ============================================================================
// HIGH-DENSITY VOXEL SCULPTING HELPERS (~24x36x24 scale)
// ============================================================================
class VoxelBuilder {
  list: MicroVoxel[] = [];

  box(
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    color: number,
    mat?: VoxelMaterialKind
  ) {
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        for (let z = z0; z <= z1; z++) {
          this.list.push({
            x,
            y,
            z,
            color,
            emissive: mat === 'emissive',
            mat,
          });
        }
      }
    }
  }

  dot(x: number, y: number, z: number, color: number, mat?: VoxelMaterialKind) {
    this.list.push({
      x,
      y,
      z,
      color,
      emissive: mat === 'emissive',
      mat,
    });
  }
}

interface Palette {
  armor: number;
  armorDark: number;
  trim: number;
  cloth: number;
  cape: number;
  leather: number;
  skin: number;
  accentGlow: number;
  armorMat: VoxelMaterialKind;
}

function getArchetypePalette(jobId: ArchetypeId, team: Team): Palette {
  const enemy = team === 'enemy';
  switch (jobId) {
    case 'holy_knight':
      return {
        armor: enemy ? 0x64748b : 0xc8d4e3,
        armorDark: 0x475569,
        trim: 0xf59e0b,
        cloth: enemy ? 0x991b1b : 0x1d4ed8,
        cape: enemy ? 0x7f1d1d : 0x1e40af,
        leather: 0x78350f,
        skin: 0xe6b89c,
        accentGlow: 0x38bdf8,
        armorMat: 'steel',
      };
    case 'dark_knight_boss':
      return {
        armor: 0x2e1065,
        armorDark: 0x1e1b4b,
        trim: 0xe11d48,
        cloth: 0x18181b,
        cape: 0x4c0519,
        leather: 0x27272a,
        skin: 0x312e81,
        accentGlow: 0xf43f5e,
        armorMat: 'steel',
      };
    case 'black_mage':
      return {
        armor: 0x1e3a8a,
        armorDark: 0x172554,
        trim: 0xeab308,
        cloth: enemy ? 0x581c87 : 0x1d4ed8,
        cape: 0x1e1b4b,
        leather: 0x78350f,
        skin: 0x09090b,
        accentGlow: 0xfef08a,
        armorMat: 'cloth',
      };
    case 'archmage_boss':
      return {
        armor: 0x0369a1,
        armorDark: 0x0c4a6e,
        trim: 0x7dd3fc,
        cloth: 0x075985,
        cape: 0xbae6fd,
        leather: 0x334155,
        skin: 0x0f172a,
        accentGlow: 0x38bdf8,
        armorMat: 'ice',
      };
    case 'dragoon':
    case 'dragoon_boss':
      return {
        armor: jobId === 'dragoon_boss' ? 0x9a3412 : 0x0284c7,
        armorDark: jobId === 'dragoon_boss' ? 0x431407 : 0x0c4a6e,
        trim: 0xf59e0b,
        cloth: 0x1e293b,
        cape: jobId === 'dragoon_boss' ? 0xdc2626 : 0xbe123c,
        leather: 0x713f12,
        skin: 0xe6b89c,
        accentGlow: jobId === 'dragoon_boss' ? 0xfb923c : 0x38bdf8,
        armorMat: 'steel',
      };
    case 'sniper':
      return {
        armor: enemy ? 0x3f6212 : 0x15803d,
        armorDark: 0x14532d,
        trim: 0xb45309,
        cloth: enemy ? 0x365314 : 0x166534,
        cape: enemy ? 0x3f6212 : 0x166534,
        leather: 0x78350f,
        skin: 0xe6b89c,
        accentGlow: 0xa3e635,
        armorMat: 'leather',
      };
    case 'white_mystic':
      return {
        // Calibrated ivory cloth so Voxel AO creases read crisply without crossing bloom threshold
        armor: 0x9eaec2,
        armorDark: 0x7d8ea3,
        trim: enemy ? 0x7e22ce : 0xb91c1c,
        cloth: 0x9eaec2,
        cape: 0x8a9bb0,
        leather: 0x92400e,
        skin: 0xe6b89c,
        accentGlow: 0xfde047,
        armorMat: 'cloth',
      };
    case 'ninja':
      return {
        armor: 0x18181b,
        armorDark: 0x09090b,
        trim: enemy ? 0x9333ea : 0xdc2626,
        cloth: 0x27272a,
        cape: enemy ? 0x7e22ce : 0xdc2626,
        leather: 0x27272a,
        skin: 0xe6b89c,
        accentGlow: 0xc084fc,
        armorMat: 'cloth',
      };
    case 'golem_enemy':
      return {
        armor: 0x7dd3fc,
        armorDark: 0x38bdf8,
        trim: 0x475569,
        cloth: 0x475569,
        cape: 0x334155,
        leather: 0x475569,
        skin: 0x64748b,
        accentGlow: 0x38bdf8,
        armorMat: 'ice',
      };
    case 'skeleton_enemy':
      return {
        armor: 0xcbd5e1,
        armorDark: 0x94a3b8,
        trim: 0x475569,
        cloth: 0x1e293b,
        cape: 0x334155,
        leather: 0x334155,
        skin: 0xd1d5db,
        accentGlow: 0xa855f7,
        armorMat: 'stone',
      };
    case 'lich_boss':
      return {
        armor: 0x3b0764,
        armorDark: 0x1e1b4b,
        trim: 0xa3e635,
        cloth: 0x581c87,
        cape: 0x2e1065,
        leather: 0x1c1917,
        skin: 0xcbd5e1,
        accentGlow: 0x84cc16,
        armorMat: 'cloth',
      };
    case 'belias_boss':
    default:
      return {
        armor: 0x292524,
        armorDark: 0x1c1917,
        trim: 0xf59e0b,
        cloth: 0x7f1d1d,
        cape: 0x991b1b,
        leather: 0x450a0a,
        skin: 0x7f1d1d,
        accentGlow: 0xff5500,
        armorMat: 'stone',
      };
  }
}

export function createCharacterVoxelRig(
  jobId: ArchetypeId,
  team: Team,
  isBoss = false
): CharacterVoxelRig {
  const isBelias = jobId === 'belias_boss';
  const voxelSize = isBelias ? 0.072 : isBoss ? 0.054 : 0.048;
  const pal = getArchetypePalette(jobId, team);

  const root = new THREE.Group();
  const bodyPivot = new THREE.Group();
  root.add(bodyPivot);

  // Soft radial contact AO shadow disc under unit feet
  const ringRadius = isBelias ? 1.05 : 0.48;
  const shadowDisc = new THREE.Mesh(
    new THREE.PlaneGeometry(ringRadius * 2.15, ringRadius * 2.15),
    createContactShadowMaterial()
  );
  shadowDisc.rotation.x = -Math.PI / 2;
  shadowDisc.position.y = 0.014;
  root.add(shadowDisc);

  const teamColor = team === 'ally' ? 0x38bdf8 : isBoss ? 0xf59e0b : 0xf43f5e;
  const teamRing = new THREE.Mesh(
    new THREE.RingGeometry(ringRadius * 0.84, ringRadius, 32),
    new THREE.MeshBasicMaterial({
      color: teamColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    })
  );
  teamRing.rotation.x = -Math.PI / 2;
  teamRing.position.y = 0.02;
  root.add(teamRing);

  // 1. LEGS (High-density greaves & armored boots)
  const legsPivot = new THREE.Group();
  legsPivot.position.y = 8.5 * voxelSize;
  bodyPivot.add(legsPivot);

  const buildLeg = (side: -1 | 1): THREE.Group => {
    const vb = new VoxelBuilder();
    const x0 = side === -1 ? -1 : 0;
    const x1 = side === -1 ? 1 : 2;
    if (jobId === 'skeleton_enemy') {
      vb.box(0, -7, 0, 0, 0, 0, pal.skin, 'stone');
      vb.box(0, -8, 0, 0, -8, 2, pal.armorDark, 'stone');
    } else {
      vb.box(x0, -5, -1, x1, 0, 1, pal.cloth, 'cloth');
      vb.box(x0, -6, -1, x1, -4, 2, pal.armorDark, pal.armorMat); // Knee/greave
      vb.box(x0, -8, -1, x1, -7, 3, pal.leather, 'leather'); // Boot
      vb.dot(side === -1 ? 0 : 1, -4, 2, pal.trim, 'gold');
    }
    const p = new THREE.Group();
    p.position.set(side * 2.2 * voxelSize, 0, 0);
    p.add(buildMergedVoxelMesh(vb.list, voxelSize));
    return p;
  };

  const leftLegPivot = buildLeg(-1);
  const rightLegPivot = buildLeg(1);
  legsPivot.add(leftLegPivot, rightLegPivot);

  // 2. TORSO (Layered armor, belts, crests, quivers, magma torso)
  const torsoPivot = new THREE.Group();
  torsoPivot.position.y = 9.0 * voxelSize;
  bodyPivot.add(torsoPivot);

  const torsoVb = new VoxelBuilder();
  if (isBelias) {
    // Colossal 2x2 Obsidian & Incandescent Magma Torso
    torsoVb.box(-6, 0, -4, 6, 12, 4, 0x292524, 'stone');
    torsoVb.box(-5, 2, 4, 5, 10, 5, 0x450a0a, 'stone');
    // Glowing magma rib fissures
    torsoVb.box(-1, 2, 5, 1, 9, 5, 0xff5500, 'emissive');
    torsoVb.box(-4, 5, 5, -2, 6, 5, 0xff6b00, 'emissive');
    torsoVb.box(2, 5, 5, 4, 6, 5, 0xff6b00, 'emissive');
    // Skull-like black steel pauldrons + spikes
    torsoVb.box(-10, 8, -4, -6, 13, 4, 0x1c1917, 'steel');
    torsoVb.box(6, 8, -4, 10, 13, 4, 0x1c1917, 'steel');
    torsoVb.box(-9, 13, -1, -8, 16, 1, 0xf59e0b, 'gold');
    torsoVb.box(8, 13, -1, 9, 16, 1, 0xf59e0b, 'gold');
    // Ember dorsal wings
    torsoVb.box(-11, 6, -6, -7, 17, -4, 0x450a0a, 'stone');
    torsoVb.box(7, 6, -6, 11, 17, -4, 0x450a0a, 'stone');
    torsoVb.box(-12, 12, -6, -10, 19, -5, 0xff5500, 'emissive');
    torsoVb.box(10, 12, -6, 12, 19, -5, 0xff5500, 'emissive');
    // Belt
    torsoVb.box(-6, 0, -4, 6, 2, 5, 0xf59e0b, 'gold');
  } else if (jobId === 'skeleton_enemy') {
    torsoVb.box(-3, 0, -1, 3, 9, 1, 0x1e293b, 'cloth');
    for (let ry = 2; ry <= 8; ry += 2) {
      torsoVb.box(-4, ry, -2, 4, ry, 2, pal.skin, 'stone');
    }
    torsoVb.box(-4, 0, -2, 4, 1, 2, pal.armorDark, 'steel');
  } else {
    // Base tunic + chestplate
    torsoVb.box(-4, 0, -3, 4, 9, 3, pal.cloth, 'cloth');
    torsoVb.box(-4, 2, -3, 4, 9, 3, pal.armor, pal.armorMat);
    // Belt & gold buckle
    torsoVb.box(-4, 0, -3, 4, 1, 3, pal.leather, 'leather');
    torsoVb.box(-1, 0, 3, 1, 1, 4, pal.trim, 'gold');

    // Segmented layered pauldrons
    torsoVb.box(-7, 7, -3, -4, 10, 3, pal.armor, pal.armorMat);
    torsoVb.box(4, 7, -3, 7, 10, 3, pal.armor, pal.armorMat);
    torsoVb.box(-7, 9, -2, -5, 11, 2, pal.trim, 'gold');
    torsoVb.box(5, 9, -2, 7, 11, 2, pal.trim, 'gold');

    if (jobId === 'holy_knight' || jobId === 'dark_knight_boss') {
      torsoVb.box(-2, 3, 3, 2, 8, 4, pal.trim, 'gold');
      torsoVb.box(-1, 4, 4, 1, 7, 4, pal.cloth, 'cloth');
      torsoVb.dot(0, 6, 4, pal.accentGlow, 'emissive');
    } else if (jobId === 'dragoon' || jobId === 'dragoon_boss') {
      // Winged spiked pauldrons & chest scales
      torsoVb.box(-8, 10, -2, -6, 13, 1, pal.trim, 'gold');
      torsoVb.box(6, 10, -2, 8, 13, 1, pal.trim, 'gold');
      torsoVb.box(-2, 3, 3, 2, 8, 3, pal.armorDark, 'steel');
      torsoVb.dot(0, 6, 4, pal.accentGlow, 'emissive');
    } else if (jobId === 'sniper') {
      // Crossed leather bandolier + back quiver with individual arrows!
      torsoVb.box(-3, 2, 3, -2, 4, 3, pal.leather, 'leather');
      torsoVb.box(-1, 4, 3, 0, 6, 3, pal.leather, 'leather');
      torsoVb.box(1, 6, 3, 2, 8, 3, pal.leather, 'leather');
      torsoVb.box(1, 2, -5, 3, 8, -3, pal.leather, 'leather');
      torsoVb.dot(1, 9, -4, 0xfef3c7, 'cloth');
      torsoVb.dot(3, 9, -4, 0xfef3c7, 'cloth');
      torsoVb.dot(2, 10, -5, 0xf43f5e, 'cloth');
    } else if (jobId === 'white_mystic') {
      // Crimson triangle trim & gold stole
      torsoVb.box(-2, 1, 3, 2, 8, 3, pal.trim, 'cloth');
      torsoVb.box(-1, 2, 4, 1, 8, 4, 0xd97706, 'gold');
    } else if (jobId === 'ninja') {
      // Crossed dual katana sheaths on back
      torsoVb.box(-3, 2, -4, -2, 8, -4, 0x09090b, 'leather');
      torsoVb.box(2, 2, -4, 3, 8, -4, 0x09090b, 'leather');
      torsoVb.box(-2, 3, 3, 2, 7, 3, pal.trim, 'cloth');
    } else if (jobId === 'black_mage' || jobId === 'archmage_boss') {
      torsoVb.box(-4, -3, -3, 4, 0, 3, pal.cloth, 'cloth'); // Long robe skirt
      torsoVb.box(-4, -3, 3, 4, -2, 3, pal.trim, 'gold'); // Gold hem embroidery
    }
  }
  torsoPivot.add(buildMergedVoxelMesh(torsoVb.list, voxelSize));

  // 3. CAPE / SCARF (3-tier silhouette with delayed wind sway)
  const capePivot = new THREE.Group();
  capePivot.position.set(0, 9.2 * voxelSize, -3.5 * voxelSize);
  torsoPivot.add(capePivot);

  let scarfPivot: THREE.Group | undefined;
  if (jobId === 'ninja') {
    const scarfVb = new VoxelBuilder();
    scarfVb.box(-3, -1, 0, 3, 1, 1, pal.cape, 'cloth');
    scarfVb.box(0, -7, -2, 2, -1, 0, pal.cape, 'cloth');
    scarfVb.box(1, -13, -4, 3, -7, -2, pal.trim, 'cloth');
    scarfPivot = new THREE.Group();
    scarfPivot.add(buildMergedVoxelMesh(scarfVb.list, voxelSize));
    capePivot.add(scarfPivot);
  } else if (jobId !== 'golem_enemy' && !isBelias) {
    const capeVb = new VoxelBuilder();
    const capeLen = jobId === 'sniper' ? -10 : -13;
    capeVb.box(-4, -5, -1, 4, 0, 0, pal.cape, 'cloth');
    capeVb.box(-5, capeLen + 2, -2, 5, -5, -1, pal.cape, 'cloth');
    capeVb.box(-5, capeLen, -2, 5, capeLen + 1, -1, pal.trim, 'gold');
    capePivot.add(buildMergedVoxelMesh(capeVb.list, voxelSize));
  }

  // 4. HEAD (High-density helmets, hats, hoods, horns)
  const headPivot = new THREE.Group();
  headPivot.position.set(0, (isBelias ? 13 : 10.5) * voxelSize, 0);
  torsoPivot.add(headPivot);

  const headVb = new VoxelBuilder();
  if (jobId === 'black_mage' || jobId === 'archmage_boss') {
    // Deep shadow face + glowing eyes
    headVb.box(-3, 0, -3, 3, 6, 3, 0x09090b, 'cloth');
    headVb.box(-2, 2, 3, -1, 3, 4, pal.accentGlow, 'emissive');
    headVb.box(1, 2, 3, 2, 3, 4, pal.accentGlow, 'emissive');
    // Wide brim + crooked conical wizard hat + gold buckle
    const hatCol = jobId === 'archmage_boss' ? 0x0284c7 : 0xb45309;
    const hatMat: VoxelMaterialKind = jobId === 'archmage_boss' ? 'ice' : 'cloth';
    headVb.box(-6, 6, -6, 6, 6, 6, hatCol, hatMat);
    headVb.box(-4, 7, -4, 4, 8, 4, 0x1e1b4b, 'cloth');
    headVb.box(-1, 7, 4, 1, 8, 5, 0xf59e0b, 'gold'); // Gold buckle
    headVb.box(-3, 9, -3, 3, 11, 3, hatCol, hatMat);
    headVb.box(-2, 12, -4, 2, 14, 1, hatCol, hatMat);
    headVb.box(-1, 15, -6, 1, 16, -2, hatCol, hatMat);
  } else if (jobId === 'holy_knight' || jobId === 'dark_knight_boss') {
    headVb.box(-3, 0, -3, 3, 7, 3, pal.armor, 'steel');
    // Cross visor slit
    headVb.box(-2, 3, 3, 2, 4, 3, 0x0f172a, 'steel');
    headVb.box(0, 1, 3, 0, 5, 3, 0x0f172a, 'steel');
    if (jobId === 'dark_knight_boss') {
      headVb.dot(-1, 3, 4, 0xf43f5e, 'emissive');
      headVb.dot(1, 3, 4, 0xf43f5e, 'emissive');
      headVb.box(-5, 6, -1, -4, 11, 1, pal.trim, 'gold');
      headVb.box(4, 6, -1, 5, 11, 1, pal.trim, 'gold');
    } else {
      headVb.box(-1, 7, -3, 1, 9, 2, pal.trim, 'gold'); // Golden crest
      headVb.box(0, 9, -4, 0, 11, 0, pal.cloth, 'cloth');
      headVb.box(-4, 5, -1, -4, 9, 1, 0xe2e8f0, 'steel');
      headVb.box(4, 5, -1, 4, 9, 1, 0xe2e8f0, 'steel');
    }
  } else if (jobId === 'dragoon' || jobId === 'dragoon_boss') {
    headVb.box(-3, 0, -3, 3, 7, 3, pal.armor, 'steel');
    headVb.box(-2, 1, 3, 2, 3, 3, pal.skin, 'cloth');
    // Dragon snout & curved dragon horns
    headVb.box(-2, 5, 2, 2, 7, 6, pal.armor, 'steel');
    headVb.box(-4, 7, -3, -3, 11, 1, pal.trim, 'gold');
    headVb.box(3, 7, -3, 4, 11, 1, pal.trim, 'gold');
    headVb.box(-5, 11, -5, -4, 13, -2, pal.trim, 'gold');
    headVb.box(4, 11, -5, 5, 13, -2, pal.trim, 'gold');
    headVb.dot(0, 6, 6, pal.accentGlow, 'emissive');
  } else if (jobId === 'sniper') {
    headVb.box(-3, 0, -2, 3, 5, 3, pal.skin, 'cloth');
    headVb.box(-3, 0, 2, 3, 2, 3, 0x14532d, 'cloth'); // Tactical mask
    headVb.dot(-1, 3, 3, 0x0f172a, 'cloth');
    headVb.dot(1, 3, 3, 0x0f172a, 'cloth');
    headVb.box(-4, 5, -4, 4, 8, 4, pal.armor, 'cloth');
    headVb.box(-4, 0, -4, 4, 6, -1, pal.armor, 'cloth');
    headVb.box(3, 7, 0, 4, 11, 2, 0xfef08a, 'cloth'); // Ranger feather
  } else if (jobId === 'white_mystic') {
    headVb.box(-3, 0, -2, 3, 5, 3, pal.skin, 'cloth');
    headVb.dot(-1, 3, 3, 0x1e293b, 'cloth');
    headVb.dot(1, 3, 3, 0x1e293b, 'cloth');
    // Soft ivory hood with crimson triangular border
    headVb.box(-4, 5, -4, 4, 8, 4, pal.cloth, 'cloth');
    headVb.box(-4, 0, -4, 4, 6, -1, pal.cloth, 'cloth');
    headVb.box(-3, 6, 4, 3, 7, 4, pal.trim, 'cloth');
    headVb.box(-1, 8, 3, 1, 9, 4, pal.trim, 'cloth');
  } else if (jobId === 'ninja') {
    headVb.box(-3, 0, -3, 3, 6, 3, 0x18181b, 'cloth');
    headVb.box(-2, 3, 3, 2, 4, 3, pal.skin, 'cloth');
    headVb.dot(-1, 3, 4, 0x09090b, 'cloth');
    headVb.dot(1, 3, 4, 0x09090b, 'cloth');
    headVb.box(-4, 5, -3, 4, 6, 4, pal.trim, 'cloth'); // Crimson headband
    headVb.box(-3, 7, -3, 3, 8, 2, 0x09090b, 'cloth');
  } else if (jobId === 'belias_boss') {
    headVb.box(-4, 0, -4, 4, 8, 4, 0x7f1d1d, 'stone');
    headVb.box(-2, 4, 4, -1, 5, 5, 0xfef08a, 'emissive');
    headVb.box(1, 4, 4, 2, 5, 5, 0xfef08a, 'emissive');
    // 4 curved demonic horns (2 large ram horns + 2 upper spikes)
    headVb.box(-7, 6, 0, -4, 10, 2, 0x1c1917, 'stone');
    headVb.box(-9, 9, -3, -7, 13, 0, 0xff5500, 'emissive');
    headVb.box(4, 6, 0, 7, 10, 2, 0x1c1917, 'stone');
    headVb.box(7, 9, -3, 9, 13, 0, 0xff5500, 'emissive');
    headVb.box(-3, 8, -2, -2, 13, 0, 0x1c1917, 'steel');
    headVb.box(2, 8, -2, 3, 13, 0, 0x1c1917, 'steel');
  } else if (jobId === 'lich_boss') {
    headVb.box(-3, 0, -3, 3, 6, 3, 0xcbd5e1, 'stone');
    headVb.dot(-1, 3, 4, 0x84cc16, 'emissive');
    headVb.dot(1, 3, 4, 0x84cc16, 'emissive');
    headVb.box(-4, 6, -4, 4, 9, 4, 0x581c87, 'cloth');
    headVb.dot(0, 9, 4, 0xa3e635, 'emissive');
  } else {
    headVb.box(-3, 0, -3, 3, 6, 3, pal.armor, pal.armorMat);
    headVb.dot(-1, 3, 4, pal.accentGlow, 'emissive');
    headVb.dot(1, 3, 4, pal.accentGlow, 'emissive');
  }
  headPivot.add(buildMergedVoxelMesh(headVb.list, voxelSize));

  // 5. LEFT ARM + SHIELD / GRIMOIRE / OFF-HAND KATANA
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set((isBelias ? -9 : -6.5) * voxelSize, (isBelias ? 10 : 8.5) * voxelSize, 0);
  torsoPivot.add(leftArmPivot);

  const leftArmVb = new VoxelBuilder();
  leftArmVb.box(-2, -6, -1, 0, 0, 1, pal.armor, pal.armorMat);
  leftArmVb.box(-2, -7, -1, 0, -7, 1, pal.skin, 'cloth');
  if (isBelias) leftArmVb.box(-2, -9, 0, 0, -8, 2, 0xff5500, 'emissive'); // Fiery claws
  leftArmPivot.add(buildMergedVoxelMesh(leftArmVb.list, voxelSize));

  const shieldPivot = new THREE.Group();
  shieldPivot.position.set(-2.2 * voxelSize, -5.5 * voxelSize, 2.2 * voxelSize);
  leftArmPivot.add(shieldPivot);

  let grimoirePivot: THREE.Group | undefined;
  if (jobId === 'holy_knight' || jobId === 'dark_knight_boss' || jobId === 'skeleton_enemy') {
    const shVb = new VoxelBuilder();
    shVb.box(-2, -5, 0, 2, 5, 1, pal.trim, 'gold');
    shVb.box(-3, -3, 1, 3, 3, 1, pal.cloth, 'cloth');
    shVb.dot(0, 0, 2, pal.accentGlow, 'emissive');
    shieldPivot.add(buildMergedVoxelMesh(shVb.list, voxelSize));
  } else if (jobId === 'ninja') {
    // Reverse-grip off-hand katana
    const katVb = new VoxelBuilder();
    katVb.box(0, -1, -2, 0, 0, 1, pal.leather, 'leather');
    katVb.box(-1, -1, -3, 1, 1, -2, pal.trim, 'gold');
    katVb.box(0, 0, -12, 0, 1, -3, 0xe2e8f0, 'steel');
    katVb.dot(0, 1, -12, pal.accentGlow, 'emissive');
    shieldPivot.add(buildMergedVoxelMesh(katVb.list, voxelSize));
  } else if (jobId === 'white_mystic' || jobId === 'lich_boss') {
    // Open levitating Grimoire!
    const grimVb = new VoxelBuilder();
    grimVb.box(-3, -2, 0, -1, 2, 1, jobId === 'lich_boss' ? 0x3b0764 : 0x991b1b, 'leather');
    grimVb.box(1, -2, 0, 3, 2, 1, jobId === 'lich_boss' ? 0x3b0764 : 0x991b1b, 'leather');
    grimVb.box(-2, -1, 1, -1, 2, 2, 0xe2e8f0, 'cloth');
    grimVb.box(1, -1, 1, 2, 2, 2, 0xe2e8f0, 'cloth');
    grimVb.dot(0, 1, 2, pal.accentGlow, 'emissive');
    grimoirePivot = new THREE.Group();
    grimoirePivot.position.set(-4.5 * voxelSize, 4.0 * voxelSize, 4.5 * voxelSize);
    grimoirePivot.add(buildMergedVoxelMesh(grimVb.list, voxelSize));
    torsoPivot.add(grimoirePivot);
  }

  // 6. RIGHT ARM + DETAILED WEAPON
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set((isBelias ? 9 : 6.5) * voxelSize, (isBelias ? 10 : 8.5) * voxelSize, 0);
  torsoPivot.add(rightArmPivot);

  const rightArmVb = new VoxelBuilder();
  rightArmVb.box(0, -6, -1, 2, 0, 1, pal.armor, pal.armorMat);
  rightArmVb.box(0, -7, -1, 2, -7, 1, pal.skin, 'cloth');
  if (isBelias) rightArmVb.box(0, -9, 0, 2, -8, 2, 0xff5500, 'emissive');
  rightArmPivot.add(buildMergedVoxelMesh(rightArmVb.list, voxelSize));

  const weaponPivot = new THREE.Group();
  weaponPivot.position.set(1.0 * voxelSize, -6.5 * voxelSize, 2.0 * voxelSize);
  rightArmPivot.add(weaponPivot);

  let bowStringPivot: THREE.Group | undefined;
  const wpVb = new VoxelBuilder();
  if (jobId === 'holy_knight' || jobId === 'dark_knight_boss' || jobId === 'skeleton_enemy') {
    wpVb.box(0, -3, 0, 0, 0, 1, pal.leather, 'leather');
    wpVb.box(-3, 1, 0, 3, 2, 1, pal.trim, 'gold'); // Crossguard
    wpVb.box(0, 2, 0, 0, 16, 1, 0xe2e8f0, 'steel');
    wpVb.box(0, 5, 1, 0, 13, 1, pal.accentGlow, 'emissive');
  } else if (
    jobId === 'black_mage' ||
    jobId === 'white_mystic' ||
    jobId === 'archmage_boss' ||
    jobId === 'lich_boss'
  ) {
    wpVb.box(0, -6, 0, 0, 15, 0, 0x57534e, 'leather');
    wpVb.box(-2, 15, -2, 2, 16, 2, pal.trim, 'gold');
    if (jobId === 'white_mystic') {
      // Hollow solar ring head
      wpVb.box(-2, 17, 0, -2, 20, 0, pal.trim, 'gold');
      wpVb.box(2, 17, 0, 2, 20, 0, pal.trim, 'gold');
      wpVb.box(-1, 21, 0, 1, 21, 0, pal.trim, 'gold');
      wpVb.dot(0, 19, 0, pal.accentGlow, 'emissive');
    } else {
      wpVb.box(-1, 18, -1, 1, 20, 1, pal.accentGlow, 'emissive');
    }
  } else if (jobId === 'dragoon' || jobId === 'dragoon_boss') {
    wpVb.box(0, -9, 0, 0, 18, 0, 0x78350f, 'leather');
    wpVb.box(-1, 17, -1, 1, 18, 1, 0xdc2626, 'cloth'); // Red tassel
    wpVb.box(-2, 19, 0, 2, 22, 0, pal.trim, 'gold');
    wpVb.box(-1, 21, 0, 1, 27, 0, 0xe2e8f0, 'steel');
    wpVb.dot(0, 28, 0, pal.accentGlow, 'emissive');
  } else if (jobId === 'sniper') {
    // Detailed Composite Longbow + Separate Tensionable Bowstring!
    wpVb.box(0, -1, 2, 0, 8, 3, 0x78350f, 'leather');
    wpVb.box(0, 8, 0, 0, 12, 2, 0x92400e, 'leather');
    wpVb.box(0, -6, 0, 0, -1, 2, 0x92400e, 'leather');
    wpVb.dot(0, 12, -1, 0xf59e0b, 'gold');
    wpVb.dot(0, -6, -1, 0xf59e0b, 'gold');

    const strVb = new VoxelBuilder();
    strVb.box(0, -5, -1, 0, 11, -1, 0xe2e8f0, 'cloth');
    strVb.box(0, 3, -1, 0, 3, 8, 0xa3e635, 'emissive'); // Nocked glowing arrow
    bowStringPivot = new THREE.Group();
    bowStringPivot.add(buildMergedVoxelMesh(strVb.list, voxelSize));
    weaponPivot.add(bowStringPivot);
  } else if (jobId === 'ninja') {
    wpVb.box(0, -1, 0, 0, 1, 1, pal.leather, 'leather');
    wpVb.box(-1, 1, 0, 1, 2, 1, pal.trim, 'gold');
    wpVb.box(0, 2, 0, 0, 13, 1, 0xe2e8f0, 'steel');
    wpVb.dot(0, 14, 1, pal.accentGlow, 'emissive');
  } else if (jobId === 'belias_boss') {
    wpVb.box(-1, -4, 0, 1, 1, 1, 0x1c1917, 'leather');
    wpVb.box(-4, 1, -1, 4, 3, 1, 0xf59e0b, 'gold');
    wpVb.box(-1, 3, 0, 1, 20, 1, 0x1c1917, 'steel');
    wpVb.box(0, 4, 1, 0, 19, 1, 0xff5500, 'emissive');
  }
  weaponPivot.add(buildMergedVoxelMesh(wpVb.list, voxelSize));

  // 7. ORBITING RUNES / FIRE CROWN (Black Mage & Belias)
  let orbitingRunesPivot: THREE.Group | undefined;
  if (jobId === 'black_mage' || jobId === 'archmage_boss' || isBelias) {
    orbitingRunesPivot = new THREE.Group();
    orbitingRunesPivot.position.y = (isBelias ? 26 : 15) * voxelSize;
    const count = isBelias ? 5 : 3;
    const radius = isBelias ? 0.95 : 0.52;
    const col = isBelias ? 0xff5500 : jobId === 'archmage_boss' ? 0x38bdf8 : 0xfacc15;
    for (let i = 0; i < count; i++) {
      const ang = (i / count) * Math.PI * 2;
      const runeVb = new VoxelBuilder();
      runeVb.box(0, 0, 0, 1, 1, 1, col, 'emissive');
      const runeMesh = buildMergedVoxelMesh(runeVb.list, voxelSize * 0.85);
      runeMesh.position.set(Math.cos(ang) * radius, 0, Math.sin(ang) * radius);
      orbitingRunesPivot.add(runeMesh);
    }
    bodyPivot.add(orbitingRunesPivot);
  }

  const heightWorld = (isBelias ? 38 : 29) * voxelSize;

  return {
    root,
    bodyPivot,
    headPivot,
    torsoPivot,
    leftArmPivot,
    rightArmPivot,
    weaponPivot,
    shieldPivot,
    capePivot,
    legsPivot,
    leftLegPivot,
    rightLegPivot,
    grimoirePivot,
    orbitingRunesPivot,
    bowStringPivot,
    scarfPivot,
    shadowDisc,
    teamRing,
    materials: [],
    heightWorld,
    voxelSize,
  };
}

/**
 * Multi-phase procedural animator (Anticipation -> Strike -> Impact -> Recovery)
 * with zero per-frame allocations.
 */
export function animateCharacterRig(
  rig: CharacterVoxelRig,
  state: UnitAnimState,
  elapsed: number,
  phaseTime = 0
): void {
  rig.bodyPivot.position.set(0, 0, 0);
  rig.bodyPivot.rotation.set(0, 0, 0);
  rig.bodyPivot.scale.set(1, 1, 1);
  rig.torsoPivot.rotation.set(0, 0, 0);
  rig.headPivot.rotation.set(0, 0, 0);
  rig.leftArmPivot.rotation.set(0, 0, 0);
  rig.rightArmPivot.rotation.set(0, 0, 0);
  rig.weaponPivot.rotation.set(0.32, 0, 0);
  rig.shieldPivot.rotation.set(0, 0, 0);
  rig.leftLegPivot.rotation.set(0, 0, 0);
  rig.rightLegPivot.rotation.set(0, 0, 0);

  // Delayed-phase cloth sway
  rig.capePivot.rotation.x = 0.16 + Math.sin(elapsed * 3.0 - 0.6) * 0.09;
  if (rig.scarfPivot) {
    rig.scarfPivot.rotation.y = Math.sin(elapsed * 4.2 - 0.6) * 0.18;
  }
  if (rig.grimoirePivot) {
    rig.grimoirePivot.position.y = 4.0 * rig.voxelSize + Math.sin(elapsed * 3.6) * 0.06;
    rig.grimoirePivot.rotation.z = Math.sin(elapsed * 5.0) * 0.14;
  }
  if (rig.orbitingRunesPivot) {
    rig.orbitingRunesPivot.rotation.y = elapsed * 1.8;
    rig.orbitingRunesPivot.position.y += Math.sin(elapsed * 2.5) * 0.04;
  }
  if (rig.bowStringPivot) {
    rig.bowStringPivot.position.z = 0;
  }

  if (state === 'dead') {
    rig.bodyPivot.rotation.x = -Math.PI / 2;
    rig.bodyPivot.position.y = 0.16;
    rig.teamRing.visible = false;
    return;
  }
  rig.teamRing.visible = true;

  switch (state) {
    case 'idle': {
      const breath = Math.sin(elapsed * 3.2) * 0.022;
      rig.torsoPivot.position.y = 9.0 * rig.voxelSize + breath;
      rig.rightArmPivot.rotation.x = -0.22 + Math.sin(elapsed * 2.1) * 0.06;
      rig.leftArmPivot.rotation.x = -0.14 - Math.sin(elapsed * 2.1) * 0.06;
      break;
    }
    case 'walk': {
      const stride = Math.sin(elapsed * 13) * 0.72;
      rig.leftLegPivot.rotation.x = stride;
      rig.rightLegPivot.rotation.x = -stride;
      rig.leftArmPivot.rotation.x = -stride * 0.75;
      rig.rightArmPivot.rotation.x = stride * 0.75;
      rig.torsoPivot.rotation.x = 0.12; // Forward lean into stride
      rig.bodyPivot.position.y = Math.abs(Math.sin(elapsed * 13)) * 0.095;
      rig.capePivot.rotation.x = 0.48 + Math.sin(elapsed * 13 - 0.6) * 0.18;
      break;
    }
    case 'slash': {
      const p = Math.min(1, phaseTime);
      if (p < 0.28) {
        // Anticipation windup
        const k = p / 0.28;
        rig.torsoPivot.rotation.y = 0.45 * k;
        rig.rightArmPivot.rotation.x = -1.65 * k;
      } else if (p < 0.6) {
        // Strike follow-through
        const k = (p - 0.28) / 0.32;
        rig.torsoPivot.rotation.y = 0.45 - 1.15 * k;
        rig.rightArmPivot.rotation.x = -1.65 + 2.85 * k;
        rig.weaponPivot.rotation.x = 0.95;
      } else {
        // Recovery
        const k = (p - 0.6) / 0.4;
        rig.torsoPivot.rotation.y = -0.7 * (1 - k);
        rig.rightArmPivot.rotation.x = 1.2 * (1 - k);
      }
      break;
    }
    case 'dual': {
      const p = Math.min(1, phaseTime);
      const s = Math.sin(p * Math.PI * 2) * 1.45;
      rig.rightArmPivot.rotation.x = -0.75 + s;
      rig.leftArmPivot.rotation.x = -0.75 - s;
      rig.torsoPivot.rotation.y = Math.sin(p * Math.PI * 2) * 0.55;
      break;
    }
    case 'bow': {
      const p = Math.min(1, phaseTime);
      const draw = p < 0.6 ? p / 0.6 : 1 - (p - 0.6) / 0.4;
      rig.torsoPivot.rotation.y = -0.42;
      rig.rightArmPivot.rotation.x = -1.45;
      rig.leftArmPivot.rotation.x = -1.3;
      rig.leftArmPivot.rotation.y = 0.38;
      if (rig.bowStringPivot) {
        rig.bowStringPivot.position.z = -draw * 2.5 * rig.voxelSize;
      }
      break;
    }
    case 'cast': {
      const pulse = Math.sin(elapsed * 11) * 0.16;
      rig.rightArmPivot.rotation.x = -2.2 + pulse;
      rig.leftArmPivot.rotation.x = -1.8 - pulse;
      rig.bodyPivot.position.y = 0.10 + Math.sin(elapsed * 7) * 0.04;
      rig.capePivot.rotation.x = 0.62;
      break;
    }
    case 'jump_up': {
      rig.torsoPivot.rotation.x = 0.28;
      rig.rightArmPivot.rotation.x = -2.5;
      rig.bodyPivot.scale.set(0.88, 1.15, 0.88); // Vertical stretch on launch
      break;
    }
    case 'jump_down': {
      rig.torsoPivot.rotation.x = -0.35;
      rig.rightArmPivot.rotation.x = 0.75;
      rig.weaponPivot.rotation.x = 1.45;
      rig.bodyPivot.scale.set(1.12, 0.88, 1.12); // Squash ready for impact
      break;
    }
    case 'hit': {
      rig.torsoPivot.rotation.x = -0.48;
      rig.headPivot.rotation.x = -0.32;
      rig.bodyPivot.position.z = -0.14;
      break;
    }
    case 'block': {
      rig.leftArmPivot.rotation.x = -1.15;
      rig.leftArmPivot.rotation.y = 0.55;
      rig.shieldPivot.rotation.y = -0.5;
      break;
    }
  }
}
