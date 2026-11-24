import * as THREE from 'three';
import type { StageDef } from '../types/tactics.ts';

export type BiomeId = StageDef['biome'];

export interface BiomeVisualPreset {
  id: BiomeId;
  skyColor: number;
  fogColor: number;
  fogDensity: number;
  sunColor: number;
  sunIntensity: number;
  sunPosition: [number, number, number];
  rimColor: number;
  rimIntensity: number;
  rimPosition: [number, number, number];
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  envIntensity: number;
  exposure: number;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  gradeTint: [number, number, number];
  gradeSaturation: number;
  gradeContrast: number;
  vignetteStrength: number;
  envSkyPanel: number;
  envGroundPanel: number;
  envAccentPanel: number;
}

export const BIOME_PRESETS: Record<BiomeId, BiomeVisualPreset> = {
  forest: {
    id: 'forest',
    skyColor: 0x132036,
    fogColor: 0x1a2d42,
    fogDensity: 0.013,
    sunColor: 0xffe6ba,
    sunIntensity: 2.35,
    sunPosition: [14, 24, 13],
    rimColor: 0x7dd3fc,
    rimIntensity: 0.72,
    rimPosition: [-15, 11, -14],
    hemiSky: 0xbae6fd,
    hemiGround: 0x423222,
    hemiIntensity: 0.62,
    envIntensity: 0.78,
    exposure: 1.0,
    bloomStrength: 0.34,
    bloomRadius: 0.32,
    bloomThreshold: 1.18,
    gradeTint: [1.03, 1.01, 0.96],
    gradeSaturation: 1.12,
    gradeContrast: 1.06,
    vignetteStrength: 0.22,
    envSkyPanel: 0x7dd3fc,
    envGroundPanel: 0x3b2f21,
    envAccentPanel: 0xfde68a,
  },
  canyon: {
    id: 'canyon',
    skyColor: 0x26162b,
    fogColor: 0x351e2c,
    fogDensity: 0.014,
    sunColor: 0xffd2a1,
    sunIntensity: 2.45,
    sunPosition: [18, 19, 11],
    rimColor: 0x60a5fa,
    rimIntensity: 0.68,
    rimPosition: [-14, 12, -14],
    hemiSky: 0xfed7aa,
    hemiGround: 0x4a1d0b,
    hemiIntensity: 0.58,
    envIntensity: 0.76,
    exposure: 1.02,
    bloomStrength: 0.36,
    bloomRadius: 0.35,
    bloomThreshold: 1.18,
    gradeTint: [1.06, 0.99, 0.94],
    gradeSaturation: 1.14,
    gradeContrast: 1.08,
    vignetteStrength: 0.24,
    envSkyPanel: 0xfdba74,
    envGroundPanel: 0x5c2410,
    envAccentPanel: 0x38bdf8,
  },
  arctic: {
    id: 'arctic',
    skyColor: 0x0b1a30,
    fogColor: 0x132b4a,
    fogDensity: 0.014,
    sunColor: 0xe0f2fe,
    sunIntensity: 2.15,
    sunPosition: [13, 23, 14],
    rimColor: 0x38bdf8,
    rimIntensity: 0.85,
    rimPosition: [-14, 12, -13],
    hemiSky: 0x93c5fd,
    hemiGround: 0x1e293b,
    hemiIntensity: 0.68,
    envIntensity: 0.85,
    exposure: 1.02,
    bloomStrength: 0.38,
    bloomRadius: 0.36,
    bloomThreshold: 1.18,
    gradeTint: [0.95, 1.01, 1.08],
    gradeSaturation: 1.1,
    gradeContrast: 1.07,
    vignetteStrength: 0.24,
    envSkyPanel: 0xbae6fd,
    envGroundPanel: 0x1e3a5f,
    envAccentPanel: 0x67e8f9,
  },
  swamp: {
    id: 'swamp',
    skyColor: 0x0a1816,
    fogColor: 0x112722,
    fogDensity: 0.017,
    sunColor: 0xbef2d8,
    sunIntensity: 1.95,
    sunPosition: [12, 22, 13],
    rimColor: 0xa855f7,
    rimIntensity: 0.78,
    rimPosition: [-14, 10, -14],
    hemiSky: 0x6ee7b7,
    hemiGround: 0x1c1917,
    hemiIntensity: 0.56,
    envIntensity: 0.72,
    exposure: 1.05,
    bloomStrength: 0.4,
    bloomRadius: 0.38,
    bloomThreshold: 1.15,
    gradeTint: [0.96, 1.04, 1.01],
    gradeSaturation: 1.12,
    gradeContrast: 1.08,
    vignetteStrength: 0.27,
    envSkyPanel: 0x34d399,
    envGroundPanel: 0x1a2e22,
    envAccentPanel: 0xc084fc,
  },
  volcanic: {
    id: 'volcanic',
    skyColor: 0x1e090b,
    fogColor: 0x2c0d0f,
    fogDensity: 0.015,
    sunColor: 0xffc6a3,
    sunIntensity: 2.2,
    sunPosition: [14, 24, 14],
    rimColor: 0x93c5fd,
    rimIntensity: 0.78,
    rimPosition: [-15, 12, -15],
    hemiSky: 0xfca5a5,
    hemiGround: 0x3b1209,
    hemiIntensity: 0.58,
    envIntensity: 0.74,
    exposure: 1.04,
    bloomStrength: 0.42,
    bloomRadius: 0.38,
    bloomThreshold: 1.16,
    gradeTint: [1.07, 0.97, 0.93],
    gradeSaturation: 1.15,
    gradeContrast: 1.1,
    vignetteStrength: 0.28,
    envSkyPanel: 0xfb7185,
    envGroundPanel: 0xea580c,
    envAccentPanel: 0xfbbf24,
  },
};

const envCache = new Map<BiomeId, THREE.Texture>();

function buildBiomeLightroomScene(preset: BiomeVisualPreset): THREE.Scene {
  const s = new THREE.Scene();
  s.background = new THREE.Color(preset.skyColor);

  const panelGeo = new THREE.PlaneGeometry(10, 10);

  // Soft overhead sky bounce
  const skyMat = new THREE.MeshBasicMaterial({
    color: preset.envSkyPanel,
    side: THREE.DoubleSide,
  });
  skyMat.color.multiplyScalar(1.4);
  const top = new THREE.Mesh(panelGeo, skyMat);
  top.position.set(0, 6, 0);
  top.rotation.x = Math.PI / 2;
  s.add(top);

  // Ground bounce (especially warm magma bounce in volcanic)
  const gndMat = new THREE.MeshBasicMaterial({
    color: preset.envGroundPanel,
    side: THREE.DoubleSide,
  });
  gndMat.color.multiplyScalar(preset.id === 'volcanic' ? 1.8 : 0.85);
  const bot = new THREE.Mesh(panelGeo, gndMat);
  bot.position.set(0, -6, 0);
  bot.rotation.x = -Math.PI / 2;
  s.add(bot);

  // Key specular strip
  const keyMat = new THREE.MeshBasicMaterial({
    color: preset.sunColor,
    side: THREE.DoubleSide,
  });
  keyMat.color.multiplyScalar(2.6);
  const key = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), keyMat);
  key.position.set(6, 4.5, 5);
  key.lookAt(0, 0, 0);
  s.add(key);

  // Rim accent strip
  const accMat = new THREE.MeshBasicMaterial({
    color: preset.envAccentPanel,
    side: THREE.DoubleSide,
  });
  accMat.color.multiplyScalar(1.7);
  const acc = new THREE.Mesh(new THREE.PlaneGeometry(7, 5), accMat);
  acc.position.set(-6, 3, -5);
  acc.lookAt(0, 0, 0);
  s.add(acc);

  return s;
}

export function getBiomeEnvironmentTexture(
  renderer: THREE.WebGLRenderer,
  biome: BiomeId
): THREE.Texture {
  const cached = envCache.get(biome);
  if (cached) return cached;

  const preset = BIOME_PRESETS[biome] ?? BIOME_PRESETS.forest;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const lightroom = buildBiomeLightroomScene(preset);
  const rt = pmrem.fromScene(lightroom, 0.04);

  lightroom.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
  });
  pmrem.dispose();

  envCache.set(biome, rt.texture);
  return rt.texture;
}

export function disposeBiomeEnvironments(): void {
  for (const tex of envCache.values()) {
    tex.dispose();
  }
  envCache.clear();
}

export interface BiomeLightRig {
  sunLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  hemiLight: THREE.HemisphereLight;
  skyDome?: THREE.Mesh;
}

export function createBiomeSkyDome(): THREE.Mesh {
  const geom = new THREE.SphereGeometry(85, 24, 16);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTopColor: { value: new THREE.Color(0x0b1324) },
      uHorizonColor: { value: new THREE.Color(0x233b58) },
      uBottomColor: { value: new THREE.Color(0x090f1c) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldDir;
      void main() {
        vWorldDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTopColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uBottomColor;
      varying vec3 vWorldDir;
      void main() {
        float h = vWorldDir.y;
        vec3 col = h >= 0.0
          ? mix(uHorizonColor, uTopColor, pow(clamp(h, 0.0, 1.0), 0.68))
          : mix(uHorizonColor, uBottomColor, pow(clamp(-h, 0.0, 1.0), 0.72));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.name = 'COA_SkyDome';
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return mesh;
}

export function applyBiomeLighting(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  lights: BiomeLightRig,
  biome: BiomeId
): BiomeVisualPreset {
  const preset = BIOME_PRESETS[biome] ?? BIOME_PRESETS.forest;

  scene.background = new THREE.Color(preset.skyColor);
  scene.fog = new THREE.FogExp2(preset.fogColor, preset.fogDensity);
  scene.environment = getBiomeEnvironmentTexture(renderer, biome);
  scene.environmentIntensity = preset.envIntensity;

  renderer.toneMappingExposure = preset.exposure;

  lights.sunLight.color.setHex(preset.sunColor);
  lights.sunLight.intensity = preset.sunIntensity;
  lights.sunLight.position.set(...preset.sunPosition);

  lights.rimLight.color.setHex(preset.rimColor);
  lights.rimLight.intensity = preset.rimIntensity;
  lights.rimLight.position.set(...preset.rimPosition);

  lights.hemiLight.color.setHex(preset.hemiSky);
  lights.hemiLight.groundColor.setHex(preset.hemiGround);
  lights.hemiLight.intensity = preset.hemiIntensity;

  if (lights.skyDome && lights.skyDome.material instanceof THREE.ShaderMaterial) {
    const u = lights.skyDome.material.uniforms;
    u.uTopColor.value.setHex(preset.skyColor);
    u.uHorizonColor.value.setHex(preset.fogColor).lerp(new THREE.Color(preset.envSkyPanel), 0.22);
    u.uBottomColor.value.setHex(preset.skyColor).multiplyScalar(0.55);
  }

  return preset;
}
