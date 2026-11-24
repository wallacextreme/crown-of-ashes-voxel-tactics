import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import type { BiomeVisualPreset } from './BiomeLighting3D.ts';

export type GraphicsPreset = 'LOW' | 'MEDIUM' | 'HIGH';

const DioramaTiltShiftGradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2(1280, 720) },
    uBlurAmount: { value: 0.75 },
    uTint: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
    uSaturation: { value: 1.1 },
    uContrast: { value: 1.05 },
    uVignette: { value: 0.22 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uBlurAmount;
    uniform vec3 uTint;
    uniform float uSaturation;
    uniform float uContrast;
    uniform float uVignette;
    varying vec2 vUv;

    void main() {
      vec4 baseSample = texture2D(tDiffuse, vUv);
      vec3 col = baseSample.rgb;

      if (uBlurAmount > 0.01) {
        // Keep central tactical combat band (y: 0.24..0.76) razor-sharp; softly blur top/bottom margins
        float distFromBand = max(0.0, abs(vUv.y - 0.5) - 0.23) / 0.27;
        float blurMask = smoothstep(0.0, 1.0, distFromBand) * uBlurAmount;

        if (blurMask > 0.01) {
          vec2 texel = (1.0 / max(uResolution, vec2(1.0))) * (blurMask * 2.2);
          vec3 acc = col * 0.24;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x, texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x, texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x, -texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x, -texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x * 1.4, 0.0)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x * 1.4, 0.0)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(0.0, texel.y * 1.4)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(0.0, -texel.y * 1.4)).rgb * 0.095;
          col = acc;
        }
      }

      // Linear-space biome color grading & micro-contrast
      col *= uTint;
      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(luma), col, uSaturation);
      col = max(vec3(0.0), (col - 0.18) * uContrast + 0.18);

      // Gentle diorama edge vignette
      vec2 centered = vUv - 0.5;
      float vig = 1.0 - dot(centered, centered) * (uVignette * 1.35);
      col *= clamp(vig, 0.55, 1.0);

      gl_FragColor = vec4(col, baseSample.a);
    }
  `,
};

export class PostFXPipeline3D {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private composer: EffectComposer;
  private renderPass: RenderPass;
  private gtaoPass: GTAOPass;
  private bloomPass: UnrealBloomPass;
  private gradePass: ShaderPass;
  private outputPass: OutputPass;
  private preset: GraphicsPreset = 'HIGH';
  public lastDrawCalls = 0;
  public lastTriangles = 0;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    width: number,
    height: number
  ) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    const w = Math.max(1, width);
    const h = Math.max(1, height);

    this.composer = new EffectComposer(renderer);
    this.renderPass = new RenderPass(scene, camera);
    const origRenderPass = this.renderPass.render.bind(this.renderPass);
    this.renderPass.render = (r, wBuf, rBuf, delta, mask) => {
      const prevAuto = r.info.autoReset;
      r.info.autoReset = false;
      r.info.reset();
      origRenderPass(r, wBuf, rBuf, delta, mask);
      this.lastDrawCalls = r.info.render.calls;
      this.lastTriangles = r.info.render.triangles;
      r.info.autoReset = prevAuto;
    };
    this.composer.addPass(this.renderPass);

    this.gtaoPass = new GTAOPass(scene, camera, w, h);
    this.gtaoPass.output = GTAOPass.OUTPUT.Default;
    this.gtaoPass.blendIntensity = 0.42;
    this.gtaoPass.updateGtaoMaterial({
      radius: 0.44,
      distanceExponent: 1.8,
      thickness: 1.0,
      scale: 1.0,
      samples: 12,
    });
    this.gtaoPass.updatePdMaterial({
      lumaPhi: 10,
      depthPhi: 2,
      normalPhi: 3,
      radius: 6,
      rings: 2,
      samples: 12,
    });
    this.composer.addPass(this.gtaoPass);

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.34, 0.32, 1.05);
    this.composer.addPass(this.bloomPass);

    this.gradePass = new ShaderPass(DioramaTiltShiftGradeShader);
    this.gradePass.uniforms.uResolution.value.set(w, h);
    this.composer.addPass(this.gradePass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
  }

  setPreset(preset: GraphicsPreset): void {
    this.preset = preset;
    if (preset === 'HIGH') {
      this.gtaoPass.enabled = true;
      this.bloomPass.enabled = true;
      this.gradePass.enabled = true;
      this.gradePass.uniforms.uBlurAmount.value = 0.72;
    } else if (preset === 'MEDIUM') {
      this.gtaoPass.enabled = false;
      this.bloomPass.enabled = true;
      this.gradePass.enabled = true;
      this.gradePass.uniforms.uBlurAmount.value = 0.0;
    } else {
      this.gtaoPass.enabled = false;
      this.bloomPass.enabled = false;
      this.gradePass.enabled = false;
    }
  }

  applyBiomeTuning(biome: BiomeVisualPreset): void {
    this.bloomPass.strength = biome.bloomStrength;
    this.bloomPass.radius = biome.bloomRadius;
    this.bloomPass.threshold = biome.bloomThreshold;

    this.gradePass.uniforms.uTint.value.set(...biome.gradeTint);
    this.gradePass.uniforms.uSaturation.value = biome.gradeSaturation;
    this.gradePass.uniforms.uContrast.value = biome.gradeContrast;
    this.gradePass.uniforms.uVignette.value = biome.vignetteStrength;
  }

  setSize(width: number, height: number): void {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    this.composer.setSize(w, h);
    this.gtaoPass.setSize(w, h);
    this.bloomPass.resolution.set(w, h);
    this.gradePass.uniforms.uResolution.value.set(w, h);
  }

  render(): void {
    if (this.preset === 'LOW') {
      const prevAuto = this.renderer.info.autoReset;
      this.renderer.info.autoReset = false;
      this.renderer.info.reset();
      this.renderer.render(this.scene, this.camera);
      this.lastDrawCalls = this.renderer.info.render.calls;
      this.lastTriangles = this.renderer.info.render.triangles;
      this.renderer.info.autoReset = prevAuto;
    } else {
      this.composer.render();
    }
  }

  dispose(): void {
    this.gtaoPass.dispose();
    this.bloomPass.dispose();
    this.composer.dispose();
  }
}
