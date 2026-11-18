import * as THREE from 'three';
import type { SkillDef } from '../types/tactics.ts';
import { STEP_HEIGHT, TILE_SIZE } from './TerrainDioramaVoxel3D.ts';

interface VoxelParticle {
  active: boolean;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  rotVel: THREE.Vector3;
  scale: number;
  life: number;
  maxLife: number;
  color: THREE.Color;
}

interface TransientEffect {
  mesh: THREE.Object3D;
  life: number;
  maxLife: number;
  update: (t: number, dt: number) => void;
}

export interface PointLightPoolTrigger {
  (pos: THREE.Vector3, colorHex: number, intensity: number, duration: number): void;
}

export interface EnvironmentPulseTrigger {
  (mode: 'storm_dark' | 'blood_sky', durationMs: number): void;
}

export class EffectsVoxel3D {
  group = new THREE.Group();
  private particleMesh: THREE.InstancedMesh;
  private particles: VoxelParticle[] = [];
  private maxParticles = 200;
  private dummy = new THREE.Object3D();
  private transientEffects: TransientEffect[] = [];
  private getFloorHeight: (wx: number, wz: number) => number;
  private triggerLight: PointLightPoolTrigger;
  private triggerEnvPulse?: EnvironmentPulseTrigger;

  constructor(
    getFloorHeight: (wx: number, wz: number) => number,
    triggerLight: PointLightPoolTrigger,
    triggerEnvPulse?: EnvironmentPulseTrigger
  ) {
    this.getFloorHeight = getFloorHeight;
    this.triggerLight = triggerLight;
    this.triggerEnvPulse = triggerEnvPulse;

    const cubeGeom = new THREE.BoxGeometry(0.10, 0.10, 0.10);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x222222,
      emissiveIntensity: 0.4,
    });
    this.particleMesh = new THREE.InstancedMesh(cubeGeom, cubeMat, this.maxParticles);
    this.particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particleMesh.frustumCulled = false;

    const zeroMat = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        active: false,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rot: new THREE.Euler(),
        rotVel: new THREE.Vector3(),
        scale: 1,
        life: 0,
        maxLife: 1,
        color: new THREE.Color(0xffffff),
      });
      this.particleMesh.setMatrixAt(i, zeroMat);
      this.particleMesh.setColorAt(i, new THREE.Color(0xffffff));
    }
    this.group.add(this.particleMesh);
  }

  spawnVoxelBurst(
    origin: THREE.Vector3,
    count: number,
    palette: number[],
    speed = 4.5,
    upwardBias = 4.5,
    scaleBase = 1.0
  ): void {
    let spawned = 0;
    for (let i = 0; i < this.maxParticles && spawned < count; i++) {
      const p = this.particles[i];
      if (p.active) continue;
      p.active = true;
      p.pos.copy(origin).add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.45,
          Math.random() * 0.45 + 0.15,
          (Math.random() - 0.5) * 0.45
        )
      );
      const angle = Math.random() * Math.PI * 2;
      const spd = (0.35 + Math.random() * 0.9) * speed;
      p.vel.set(
        Math.cos(angle) * spd,
        upwardBias * (0.55 + Math.random() * 0.8),
        Math.sin(angle) * spd
      );
      p.rot.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      p.rotVel.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      );
      p.scale = scaleBase * (0.65 + Math.random() * 0.75);
      p.life = 0;
      p.maxLife = 0.75 + Math.random() * 0.65;
      p.color.setHex(palette[Math.floor(Math.random() * palette.length)]);
      this.particleMesh.setColorAt(i, p.color);
      spawned++;
    }
    if (this.particleMesh.instanceColor) {
      this.particleMesh.instanceColor.needsUpdate = true;
    }
  }

  private addTransient(
    mesh: THREE.Object3D,
    maxLife: number,
    update: (t: number, dt: number) => void
  ): void {
    this.group.add(mesh);
    this.transientEffects.push({ mesh, life: 0, maxLife, update });
  }

  spawnCasterMagicCircle(casterPos: THREE.Vector3, colorHex: number): void {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const outer = new THREE.Mesh(new THREE.RingGeometry(0.68, 0.82, 24), mat);
    outer.rotation.x = -Math.PI / 2;
    const inner = new THREE.Mesh(new THREE.RingGeometry(0.32, 0.42, 6), mat);
    inner.rotation.x = -Math.PI / 2;
    g.add(outer, inner);
    g.position.set(casterPos.x, casterPos.y + 0.06, casterPos.z);

    this.addTransient(g, 0.65, (t) => {
      g.rotation.y += 0.12;
      const sc = t < 0.2 ? 0.4 + (t / 0.2) * 0.7 : 1.1;
      g.scale.setScalar(sc);
      mat.opacity = t > 0.6 ? 0.92 * (1 - (t - 0.6) / 0.4) : 0.92;
    });
  }

  spawnSwordSlashRibbon(
    center: THREE.Vector3,
    yaw: number,
    colorHex: number,
    isCrossX = false
  ): void {
    const createArc = (tiltZ: number, tiltX: number) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: colorHex,
        emissiveIntensity: 2.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
      });
      const ribbon = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.96, 20, 1, 0, Math.PI * 1.05), mat);
      ribbon.position.set(center.x, center.y + 0.85, center.z);
      ribbon.rotation.set(tiltX, yaw, tiltZ);
      this.addTransient(ribbon, 0.30, (t) => {
        ribbon.rotation.z += 0.18;
        ribbon.scale.setScalar(0.85 + t * 0.55);
        mat.opacity = Math.max(0, 0.96 * (1 - t));
      });
    };

    if (isCrossX) {
      createArc(0.75, 0.5);
      createArc(-0.75, -0.5);
    } else {
      createArc(0.35, 1.15);
    }
  }

  spawnSkyDiveWindRings(origin: THREE.Vector3): void {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xbae6fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.55, 20), mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(origin.x, origin.y + 0.08, origin.z);
    this.addTransient(ring, 0.35, (t) => {
      ring.scale.setScalar(1 + t * 2.2);
      mat.opacity = 0.85 * (1 - t);
    });
  }

  playSkillVFX(
    skill: SkillDef,
    attackerPos: THREE.Vector3,
    targetPos: THREE.Vector3,
    aoePositions: THREE.Vector3[],
    attackerYaw = 0
  ): void {
    if (skill.isMagic || skill.isHeal || skill.isBuff || skill.vfxType === 'judgment_blade') {
      const circleCol =
        skill.element === 'fire'
          ? 0xf97316
          : skill.element === 'ice'
            ? 0x38bdf8
            : skill.element === 'lightning'
              ? 0xfacc15
              : skill.isHeal
                ? 0x4ade80
                : 0xfde047;
      this.spawnCasterMagicCircle(attackerPos, circleCol);
    }

    switch (skill.vfxType) {
      case 'judgment_blade': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0x38bdf8, 12, 0.8);
        for (let idx = 0; idx < aoePositions.length; idx++) {
          const p = aoePositions[idx];
          const g = new THREE.Group();
          const swordMat = new THREE.MeshStandardMaterial({
            color: 0xe0f2fe,
            emissive: idx % 2 === 0 ? 0x38bdf8 : 0xfde047,
            emissiveIntensity: 2.7,
            transparent: true,
            opacity: 0.94,
          });
          // Colossal descending light sword
          const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.6, 0.08), swordMat);
          blade.position.y = 1.4;
          const guard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.14, 0.14), swordMat);
          guard.position.y = 2.4;
          const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.35, 4), swordMat);
          crystal.position.y = 0.65;
          g.add(blade, guard, crystal);

          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xfef08a,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
          });
          const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.68, 16), ringMat);
          ring.rotation.x = -Math.PI / 2;
          ring.position.y = 0.08;
          g.add(ring);
          g.position.copy(p);

          this.addTransient(g, 0.82, (t) => {
            const drop = t < 0.25 ? (1 - t / 0.25) * 4.5 : 0;
            blade.position.y = 1.4 + drop;
            guard.position.y = 2.4 + drop;
            crystal.scale.setScalar(t < 0.25 ? 0.1 : 1);
            ring.scale.setScalar(1 + t * 1.5);
            swordMat.opacity = Math.max(0, 1 - Math.max(0, t - 0.6) / 0.4);
            ringMat.opacity = Math.max(0, 0.9 * (1 - t));
          });
          this.spawnVoxelBurst(p, 12, [0x38bdf8, 0xe0f2fe, 0xfef08a], 4.0, 5.2, 1.1);
        }
        break;
      }

      case 'hallowed_bolt':
      case 'thundaga': {
        this.triggerEnvPulse?.('storm_dark', 260);
        const boltColor = skill.vfxType === 'hallowed_bolt' ? 0xfef08a : 0x60a5fa;
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 2, 0)), boltColor, 14, 0.55);
        for (const p of aoePositions) {
          const g = new THREE.Group();
          const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: boltColor,
            emissiveIntensity: 3.0,
            transparent: true,
            opacity: 0.95,
          });
          for (let branch = 0; branch < 3; branch++) {
            const ox = (branch - 1) * 0.25;
            for (let seg = 0; seg < 4; seg++) {
              const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.15, 6), mat);
              cyl.position.set(
                ox + (seg % 2 === 0 ? 0.14 : -0.14),
                0.55 + seg * 1.0,
                seg % 2 === 0 ? -0.08 : 0.08
              );
              cyl.rotation.z = seg % 2 === 0 ? 0.22 : -0.22;
              g.add(cyl);
            }
          }
          const waveMat = new THREE.MeshBasicMaterial({
            color: boltColor,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
          });
          const wave = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.68, 20), waveMat);
          wave.rotation.x = -Math.PI / 2;
          wave.position.y = 0.08;
          g.add(wave);
          g.position.copy(p);
          this.addTransient(g, 0.52, (t) => {
            mat.opacity = 1 - t;
            wave.scale.setScalar(0.8 + t * 2.2);
            waveMat.opacity = 0.9 * (1 - t);
          });
          this.spawnVoxelBurst(p, 12, [boltColor, 0xffffff, 0x38bdf8], 4.5, 4.8, 0.9);
        }
        break;
      }

      case 'firaga':
      case 'dragon_breath': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.4, 0)), 0xf97316, 14, 0.8);
        // Descending solar plasma sphere at center
        const orbMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          emissive: 0xff5500,
          emissiveIntensity: 3.0,
          transparent: true,
          opacity: 0.95,
        });
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 12), orbMat);
        orb.position.set(targetPos.x, targetPos.y + 3.2, targetPos.z);
        this.addTransient(orb, 0.45, (t) => {
          orb.position.y = targetPos.y + 3.2 * (1 - t * t) + 0.3;
          orb.scale.setScalar(1 + t * 0.8);
          orbMat.opacity = 1 - t;
        });

        for (const p of aoePositions) {
          const g = new THREE.Group();
          const fireMat = new THREE.MeshStandardMaterial({
            color: 0xffedd5,
            emissive: 0xf97316,
            emissiveIntensity: 2.8,
            transparent: true,
            opacity: 0.9,
          });
          const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.64, 2.4, 8), fireMat);
          pillar.position.y = 1.2;
          const shockMat = new THREE.MeshBasicMaterial({
            color: 0xfb923c,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
          });
          const shock = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.55, 18), shockMat);
          shock.rotation.x = -Math.PI / 2;
          shock.position.y = 0.08;
          g.add(pillar, shock);
          g.position.copy(p);
          this.addTransient(g, 0.70, (t) => {
            const s = Math.sin(t * Math.PI);
            pillar.scale.set(0.6 + s * 0.95, 0.5 + s * 1.15, 0.6 + s * 0.95);
            pillar.rotation.y += 0.22;
            fireMat.opacity = Math.max(0, 1 - t);
            shock.scale.setScalar(1 + t * 2.1);
            shockMat.opacity = 0.85 * (1 - t);
          });
          this.spawnVoxelBurst(p, 14, [0xf97316, 0xef4444, 0xfef08a], 4.2, 5.5, 1.1);
        }
        break;
      }

      case 'blizzaga': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0x38bdf8, 11, 0.72);
        for (let idx = 0; idx < aoePositions.length; idx++) {
          const p = aoePositions[idx];
          const g = new THREE.Group();
          const iceMat = new THREE.MeshPhysicalMaterial({
            color: 0xe0f2fe,
            emissive: 0x0ea5e9,
            emissiveIntensity: 1.85,
            roughness: 0.14,
            metalness: 0.2,
            clearcoat: 0.9,
            transparent: true,
            opacity: 0.92,
          });
          for (let s = 0; s < 5; s++) {
            const spike = new THREE.Mesh(new THREE.ConeGeometry(0.20, 1.55, 5), iceMat);
            const ang = (s / 5) * Math.PI * 2;
            spike.position.set(Math.cos(ang) * 0.26, 0.65, Math.sin(ang) * 0.26);
            spike.rotation.z = Math.cos(ang) * 0.28;
            spike.rotation.x = Math.sin(ang) * 0.28;
            g.add(spike);
          }
          g.position.copy(p);
          const delay = idx * 0.06;
          this.addTransient(g, 0.78, (t) => {
            const localT = Math.max(0, (t - delay) / (1 - delay));
            const pop = localT < 0.22 ? localT / 0.22 : 1;
            g.scale.set(1, Math.max(0.05, pop), 1);
            iceMat.opacity = Math.max(0, 1 - Math.max(0, localT - 0.55) / 0.45);
          });
          this.spawnVoxelBurst(p, 12, [0xbae6fd, 0x38bdf8, 0xffffff], 3.8, 4.4, 1.0);
        }
        break;
      }

      case 'sky_dive': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1, 0)), 0x38bdf8, 13, 0.65);
        const g = new THREE.Group();
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
        });
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.75, 24), ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.08;
        g.add(ring);
        const beamMat = new THREE.MeshStandardMaterial({
          color: 0xe0f2fe,
          emissive: 0x0ea5e9,
          emissiveIntensity: 2.5,
          transparent: true,
          opacity: 0.85,
        });
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.5, 4.8, 8), beamMat);
        beam.position.y = 2.4;
        g.add(beam);
        g.position.copy(targetPos);
        this.addTransient(g, 0.58, (t) => {
          ring.scale.setScalar(1 + t * 2.7);
          ringMat.opacity = 1 - t;
          beamMat.opacity = 0.85 * (1 - t);
          beam.scale.set(1 - t * 0.6, 1, 1 - t * 0.6);
        });
        this.spawnVoxelBurst(targetPos, 30, [0x38bdf8, 0xfef08a, 0x94a3b8], 5.8, 6.2, 1.25);
        break;
      }

      case 'arc_shot':
      case 'leg_shot':
      case 'arcane_bolt':
      case 'poison_kunai': {
        const col =
          skill.vfxType === 'arcane_bolt'
            ? 0xa855f7
            : skill.vfxType === 'poison_kunai'
              ? 0x22c55e
              : 0xfef08a;
        const projMat = new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 2.5,
        });
        const proj = new THREE.Mesh(
          skill.vfxType === 'arcane_bolt'
            ? new THREE.SphereGeometry(0.16, 8, 8)
            : new THREE.BoxGeometry(0.08, 0.08, 0.55),
          projMat
        );
        const start = attackerPos.clone().add(new THREE.Vector3(0, 1.0, 0));
        const end = targetPos.clone().add(new THREE.Vector3(0, 0.8, 0));
        proj.position.copy(start);
        this.addTransient(proj, 0.34, (t) => {
          const arcY = Math.sin(t * Math.PI) * 1.45;
          proj.position.lerpVectors(start, end, t);
          proj.position.y += arcY;
          proj.lookAt(end);
        });
        this.spawnVoxelBurst(targetPos, 10, [col, 0xffffff], 3.2, 3.5, 0.9);
        break;
      }

      case 'arrow_rain': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0xa3e635, 9, 0.6);
        const arrowMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          emissive: 0xa3e635,
          emissiveIntensity: 2.0,
        });
        for (const p of aoePositions) {
          for (let k = 0; k < 4; k++) {
            const arrow = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.06), arrowMat);
            const ox = (Math.random() - 0.5) * 0.9;
            const oz = (Math.random() - 0.5) * 0.9;
            const delay = k * 0.06;
            arrow.position.set(p.x + ox, p.y + 5.5, p.z + oz);
            this.addTransient(arrow, 0.55, (t) => {
              const localT = Math.max(0, (t - delay) / (1 - delay));
              arrow.position.y = p.y + 5.5 * (1 - localT) + 0.3;
            });
          }
          this.spawnVoxelBurst(p, 6, [0xa3e635, 0xfef08a], 3.0, 3.5, 0.85);
        }
        break;
      }

      case 'curaga':
      case 'revive':
      case 'mana_font': {
        const col = skill.vfxType === 'mana_font' ? 0x38bdf8 : 0x4ade80;
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.5, 0)), col, 11, 0.7);
        for (const p of aoePositions) {
          const beamMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: col,
            emissiveIntensity: 2.2,
            transparent: true,
            opacity: 0.7,
          });
          const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 3.5, 12), beamMat);
          beam.position.set(p.x, p.y + 1.75, p.z);
          this.addTransient(beam, 0.65, (t) => {
            beamMat.opacity = 0.7 * Math.sin(t * Math.PI);
            beam.rotation.y += 0.1;
          });
          this.spawnVoxelBurst(p, 10, [col, 0xfef08a, 0xffffff], 2.2, 5.0, 0.85);
        }
        break;
      }

      case 'hastega':
      case 'aegis': {
        const col = skill.vfxType === 'aegis' ? 0x60a5fa : 0xfacc15;
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.2, 0)), col, 10, 0.65);
        for (const p of aoePositions) {
          const g = new THREE.Group();
          const gearMat = new THREE.MeshStandardMaterial({
            color: col,
            emissive: col,
            emissiveIntensity: 2.3,
            transparent: true,
            opacity: 0.9,
          });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.06, 6, 16), gearMat);
          ring.rotation.x = Math.PI / 2;
          g.add(ring);
          for (let i = 0; i < 6; i++) {
            const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.18), gearMat);
            const ang = (i / 6) * Math.PI * 2;
            tooth.position.set(Math.cos(ang) * 0.65, 0, Math.sin(ang) * 0.65);
            tooth.rotation.y = -ang;
            g.add(tooth);
          }
          g.position.set(p.x, p.y + 0.12, p.z);
          this.addTransient(g, 0.75, (t) => {
            g.rotation.y += 0.12;
            g.position.y = p.y + 0.12 + t * 0.75;
            gearMat.opacity = 0.9 * (1 - t);
          });
        }
        break;
      }

      case 'holy': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0xfef08a, 16, 0.75);
        const orbMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xfde047,
          emissiveIntensity: 3.0,
          transparent: true,
          opacity: 0.95,
        });
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), orbMat);
        orb.position.set(targetPos.x, targetPos.y + 1.0, targetPos.z);
        this.addTransient(orb, 0.65, (t) => {
          const sc = t < 0.45 ? 0.3 + (t / 0.45) * 1.4 : 1.7 + (t - 0.45) * 2.5;
          orb.scale.setScalar(sc);
          orbMat.opacity = t < 0.45 ? 0.95 : Math.max(0, 1 - (t - 0.45) / 0.55);
        });
        this.spawnVoxelBurst(targetPos, 32, [0xfef08a, 0xffffff, 0x38bdf8], 5.5, 6.2, 1.15);
        break;
      }

      case 'shadow_step': {
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1, 0)), 0xa855f7, 11, 0.55);
        // Ghostly afterimage at origin
        const ghostMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          transparent: true,
          opacity: 0.65,
        });
        const ghost = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.1, 0.4), ghostMat);
        ghost.position.set(attackerPos.x, attackerPos.y + 0.65, attackerPos.z);
        this.addTransient(ghost, 0.45, (t) => {
          ghostMat.opacity = 0.65 * (1 - t);
          ghost.scale.set(1 + t * 0.4, 1 - t * 0.3, 1 + t * 0.4);
        });

        this.spawnSwordSlashRibbon(targetPos, attackerYaw, 0xf43f5e, true);
        this.spawnVoxelBurst(attackerPos, 18, [0x7e22ce, 0x1e1b4b, 0xc084fc], 3.2, 3.8, 1.1);
        this.spawnVoxelBurst(targetPos, 24, [0xc084fc, 0xf43f5e, 0x1e1b4b], 4.4, 4.8, 1.15);
        break;
      }

      case 'apocalypse_meteor': {
        this.triggerEnvPulse?.('blood_sky', 950);
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0xff4500, 18, 0.95);
        const g = new THREE.Group();
        const meteorMat = new THREE.MeshStandardMaterial({
          color: 0x450a0a,
          emissive: 0xff5500,
          emissiveIntensity: 2.8,
          roughness: 0.5,
        });
        const meteor = new THREE.Mesh(new THREE.DodecahedronGeometry(1.1, 1), meteorMat);
        const fireRingMat = new THREE.MeshBasicMaterial({
          color: 0xfef08a,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 6, 20), fireRingMat);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.06, 6, 20), fireRingMat);
        ring2.rotation.x = Math.PI / 2;
        g.add(meteor, ring1, ring2);

        const startM = targetPos.clone().add(new THREE.Vector3(-4.5, 9.5, -3.5));
        const endM = targetPos.clone().add(new THREE.Vector3(0, 0.5, 0));
        g.position.copy(startM);
        this.addTransient(g, 0.85, (t) => {
          g.position.lerpVectors(startM, endM, t * t);
          meteor.rotation.x += 0.14;
          meteor.rotation.z += 0.1;
          ring1.rotation.y += 0.2;
          ring2.rotation.z += 0.22;
          if (t > 0.85) g.scale.setScalar(1 + (t - 0.85) * 6);
        });

        // Double ground shockwave
        for (const scaleTarget of [2.5, 4.2]) {
          const swMat = new THREE.MeshBasicMaterial({
            color: 0xff5500,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
          });
          const sw = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.7, 24), swMat);
          sw.rotation.x = -Math.PI / 2;
          sw.position.set(targetPos.x, targetPos.y + 0.1, targetPos.z);
          this.addTransient(sw, 0.85, (t) => {
            sw.scale.setScalar(1 + t * scaleTarget);
            swMat.opacity = 0.85 * (1 - t);
          });
        }

        for (const p of aoePositions) {
          this.spawnVoxelBurst(p, 12, [0xff5500, 0xfef08a, 0x450a0a], 6.2, 7.5, 1.35);
        }
        break;
      }

      default: {
        const isDual = skill.vfxType === 'dual_strike';
        const slashCol =
          skill.vfxType === 'shadowblade'
            ? 0xa855f7
            : isDual
              ? 0xf43f5e
              : 0xfef08a;
        this.triggerLight(targetPos.clone().add(new THREE.Vector3(0, 1.0, 0)), slashCol, 9, 0.35);
        this.spawnSwordSlashRibbon(targetPos, attackerYaw, slashCol, isDual);
        this.spawnVoxelBurst(targetPos, 14, [slashCol, 0xffffff, 0x94a3b8], 3.8, 4.2, 1.0);
        break;
      }
    }
  }

  update(dt: number): void {
    let anyActive = false;
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      if (!p.active) continue;
      anyActive = true;
      p.life += dt;
      if (p.life >= p.maxLife) {
        p.active = false;
        this.dummy.scale.set(0, 0, 0);
        this.dummy.updateMatrix();
        this.particleMesh.setMatrixAt(i, this.dummy.matrix);
        continue;
      }

      p.vel.y -= 18.0 * dt;
      p.pos.addScaledVector(p.vel, dt);
      p.rot.x += p.rotVel.x * dt;
      p.rot.y += p.rotVel.y * dt;
      p.rot.z += p.rotVel.z * dt;

      const floorY = this.getFloorHeight(p.pos.x, p.pos.z) + 0.05;
      if (p.pos.y < floorY) {
        p.pos.y = floorY;
        p.vel.y = Math.abs(p.vel.y) * 0.46;
        p.vel.x *= 0.72;
        p.vel.z *= 0.72;
      }

      const fadeScale =
        p.life > p.maxLife * 0.6 ? 1 - (p.life - p.maxLife * 0.6) / (p.maxLife * 0.4) : 1;
      const sc = Math.max(0.001, p.scale * fadeScale);
      this.dummy.position.copy(p.pos);
      this.dummy.rotation.copy(p.rot);
      this.dummy.scale.setScalar(sc);
      this.dummy.updateMatrix();
      this.particleMesh.setMatrixAt(i, this.dummy.matrix);
    }
    if (anyActive) {
      this.particleMesh.instanceMatrix.needsUpdate = true;
    }

    for (let i = this.transientEffects.length - 1; i >= 0; i--) {
      const fx = this.transientEffects[i];
      fx.life += dt;
      const t = Math.min(1, fx.life / fx.maxLife);
      fx.update(t, dt);
      if (fx.life >= fx.maxLife) {
        this.group.remove(fx.mesh);
        fx.mesh.traverse((o) => {
          if ((o as THREE.Mesh).isMesh) {
            const m = o as THREE.Mesh;
            m.geometry?.dispose();
            if (Array.isArray(m.material)) {
              m.material.forEach((mat) => mat.dispose());
            } else {
              m.material?.dispose();
            }
          }
        });
        this.transientEffects.splice(i, 1);
      }
    }
  }

  static tileSize(): { tileSize: number; stepHeight: number } {
    return { tileSize: TILE_SIZE, stepHeight: STEP_HEIGHT };
  }
}
