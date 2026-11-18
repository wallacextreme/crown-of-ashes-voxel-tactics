import * as THREE from 'three';

export type VoxelMaterialKind =
  | 'cloth'
  | 'leather'
  | 'steel'
  | 'gold'
  | 'stone'
  | 'ice'
  | 'emissive';

const materialCache = new Map<VoxelMaterialKind, THREE.Material>();
let cachedBevelNormal: THREE.CanvasTexture | null = null;
let cachedClothNormal: THREE.CanvasTexture | null = null;
let cachedStoneNormal: THREE.CanvasTexture | null = null;
let cachedShadowTex: THREE.CanvasTexture | null = null;

function createCanvasNormalTexture(
  variant: 'bevel' | 'cloth' | 'stone'
): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const img = ctx.createImageData(size, size);
  const data = img.data;
  const margin = 0.12;

  // Deterministic pseudo-random noise helper
  const hash = (x: number, y: number): number => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  };

  for (let py = 0; py < size; py++) {
    const v = py / (size - 1);
    for (let px = 0; px < size; px++) {
      const u = px / (size - 1);

      let nx = 0;
      let ny = 0;
      let nz = 1;

      // Micro-bevel around the 4 voxel face borders
      if (u < margin) {
        nx -= ((margin - u) / margin) * 0.65;
      } else if (u > 1 - margin) {
        nx += ((u - (1 - margin)) / margin) * 0.65;
      }

      if (v < margin) {
        ny -= ((margin - v) / margin) * 0.65;
      } else if (v > 1 - margin) {
        ny += ((v - (1 - margin)) / margin) * 0.65;
      }

      // Inner micro-surface relief per material type
      if (variant === 'cloth') {
        const weaveX = Math.sin(u * Math.PI * 24) * 0.08;
        const weaveY = Math.cos(v * Math.PI * 24) * 0.08;
        nx += weaveX;
        ny += weaveY;
      } else if (variant === 'stone') {
        const grain = (hash(Math.floor(px / 4), Math.floor(py / 4)) - 0.5) * 0.22;
        const grainY = (hash(Math.floor(px / 4) + 17, Math.floor(py / 4) + 31) - 0.5) * 0.22;
        nx += grain;
        ny += grainY;
      } else {
        const fine = (hash(Math.floor(px / 8), Math.floor(py / 8)) - 0.5) * 0.06;
        nx += fine;
        ny += fine;
      }

      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;

      const idx = (py * size + px) * 4;
      data[idx] = Math.round((nx * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function getBevelNormal(): THREE.CanvasTexture | null {
  if (!cachedBevelNormal) cachedBevelNormal = createCanvasNormalTexture('bevel');
  return cachedBevelNormal;
}

function getClothNormal(): THREE.CanvasTexture | null {
  if (!cachedClothNormal) cachedClothNormal = createCanvasNormalTexture('cloth');
  return cachedClothNormal;
}

function getStoneNormal(): THREE.CanvasTexture | null {
  if (!cachedStoneNormal) cachedStoneNormal = createCanvasNormalTexture('stone');
  return cachedStoneNormal;
}

export function getVoxelPBRMaterial(kind: VoxelMaterialKind): THREE.Material {
  const existing = materialCache.get(kind);
  if (existing) return existing;

  let mat: THREE.Material;
  switch (kind) {
    case 'steel':
      mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.78,
        roughness: 0.25,
        normalMap: getBevelNormal(),
        normalScale: new THREE.Vector2(0.45, 0.45),
      });
      break;
    case 'gold':
      mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.85,
        roughness: 0.22,
        normalMap: getBevelNormal(),
        normalScale: new THREE.Vector2(0.5, 0.5),
      });
      break;
    case 'cloth':
      mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.04,
        roughness: 0.90,
        normalMap: getClothNormal(),
        normalScale: new THREE.Vector2(0.35, 0.35),
      });
      break;
    case 'leather':
      mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.08,
        roughness: 0.72,
        normalMap: getBevelNormal(),
        normalScale: new THREE.Vector2(0.4, 0.4),
      });
      break;
    case 'stone':
      mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.08,
        roughness: 0.78,
        normalMap: getStoneNormal(),
        normalScale: new THREE.Vector2(0.55, 0.55),
      });
      break;
    case 'ice':
      mat = new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        metalness: 0.1,
        roughness: 0.14,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        normalMap: getBevelNormal(),
        normalScale: new THREE.Vector2(0.5, 0.5),
      });
      break;
    case 'emissive': {
      const em = new THREE.MeshStandardMaterial({
        vertexColors: true,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 2.35,
        metalness: 0.1,
        roughness: 0.2,
      });
      em.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          `
          #include <emissivemap_fragment>
          totalEmissiveRadiance *= vColor.rgb;
          `
        );
      };
      mat = em;
      break;
    }
  }

  materialCache.set(kind, mat);
  return mat;
}

export function createContactShadowMaterial(): THREE.MeshBasicMaterial {
  if (!cachedShadowTex && typeof document !== 'undefined') {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        size * 0.08,
        size / 2,
        size / 2,
        size * 0.48
      );
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    cachedShadowTex = new THREE.CanvasTexture(canvas);
    cachedShadowTex.colorSpace = THREE.SRGBColorSpace;
  }

  return new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: cachedShadowTex,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
  });
}
