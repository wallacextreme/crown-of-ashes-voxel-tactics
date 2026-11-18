import type { SkillDef } from '../types/tactics.ts';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private muted = false;
  private bgmTimer: number | null = null;
  private stepIdx = 0;

  // D Dorian / Minor tactical Sakimoto-style motif (MIDI notes)
  private melodyNotes = [62, 65, 69, 67, 65, 64, 62, 57, 60, 62, 65, 69, 72, 69, 67, 64];
  private bassNotes = [38, 38, 41, 41, 43, 43, 45, 45, 36, 36, 38, 38, 41, 40, 38, 33];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : 0.72;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.22;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.65;
      this.sfxGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  unlockAndStartMusic(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.bgmTimer !== null) return;
    this.bgmTimer = window.setInterval(() => {
      if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
      this.playBgmBeat();
    }, 340);
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.72, this.ctx.currentTime, 0.03);
    }
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType,
    gainPeak: number,
    dest: AudioNode | null,
    freqEnd?: number,
    delay = 0
  ): void {
    const ctx = this.ctx;
    if (!ctx || !dest || this.muted) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
    }
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gainPeak, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(dest);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  private playNoise(duration: number, filterFreq: number, gainPeak: number, filterType: BiquadFilterType = 'bandpass'): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.muted) return;
    const sampleCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleCount; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / sampleCount);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;

    const g = ctx.createGain();
    g.gain.setValueAtTime(gainPeak, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.sfxGain);
    src.start();
  }

  private playBgmBeat(): void {
    const idx = this.stepIdx % this.melodyNotes.length;
    this.stepIdx++;
    const melFreq = this.midiToFreq(this.melodyNotes[idx]);
    const bassFreq = this.midiToFreq(this.bassNotes[idx]);

    // Harpsichord/pluck tactical lead
    this.playTone(melFreq, 0.31, 'triangle', 0.22, this.musicGain);
    // Warm French horn / cello sustain on even beats
    if (idx % 2 === 0) {
      this.playTone(bassFreq, 0.65, 'sawtooth', 0.09, this.musicGain);
      this.playTone(bassFreq * 1.5, 0.62, 'sine', 0.12, this.musicGain);
    }
  }

  playUiConfirm(): void {
    this.ensureContext();
    this.playTone(587.33, 0.09, 'triangle', 0.16, this.sfxGain, 880);
  }

  playUiCancel(): void {
    this.ensureContext();
    this.playTone(392, 0.11, 'triangle', 0.14, this.sfxGain, 261.6);
  }

  playStep(): void {
    this.ensureContext();
    this.playNoise(0.06, 950, 0.22, 'lowpass');
    this.playTone(135, 0.05, 'triangle', 0.1, this.sfxGain, 80);
  }

  playShieldBlock(): void {
    this.ensureContext();
    this.playTone(520, 0.16, 'square', 0.18, this.sfxGain, 260);
    this.playTone(1040, 0.12, 'triangle', 0.14, this.sfxGain, 760);
  }

  playCriticalHit(): void {
    this.ensureContext();
    this.playNoise(0.24, 1400, 0.42, 'highpass');
    this.playTone(210, 0.22, 'sawtooth', 0.26, this.sfxGain, 65);
    this.playTone(880, 0.2, 'triangle', 0.2, this.sfxGain, 1320, 0.04);
  }

  playSkillSfx(skill: SkillDef): void {
    this.ensureContext();
    switch (skill.vfxType) {
      case 'firaga':
      case 'dragon_breath':
      case 'apocalypse_meteor':
        this.playNoise(0.55, 420, 0.5, 'lowpass');
        this.playTone(150, 0.45, 'sawtooth', 0.28, this.sfxGain, 48);
        break;
      case 'blizzaga':
        this.playNoise(0.32, 3200, 0.38, 'highpass');
        this.playTone(1320, 0.22, 'sine', 0.2, this.sfxGain, 1960);
        this.playTone(1760, 0.18, 'triangle', 0.16, this.sfxGain, 980, 0.08);
        break;
      case 'thundaga':
      case 'hallowed_bolt':
        this.playNoise(0.38, 1900, 0.45, 'bandpass');
        this.playTone(460, 0.3, 'sawtooth', 0.25, this.sfxGain, 95);
        break;
      case 'arc_shot':
      case 'leg_shot':
      case 'arrow_rain':
        this.playNoise(0.18, 2100, 0.3, 'bandpass');
        this.playTone(680, 0.14, 'triangle', 0.18, this.sfxGain, 260);
        break;
      case 'curaga':
      case 'revive':
      case 'hastega':
      case 'mana_font':
      case 'aegis':
        this.playTone(523.25, 0.24, 'sine', 0.18, this.sfxGain);
        this.playTone(659.25, 0.24, 'sine', 0.18, this.sfxGain, undefined, 0.07);
        this.playTone(783.99, 0.35, 'triangle', 0.18, this.sfxGain, undefined, 0.14);
        break;
      case 'holy':
      case 'judgment_blade':
        this.playTone(659.25, 0.32, 'triangle', 0.22, this.sfxGain);
        this.playTone(987.77, 0.38, 'sine', 0.22, this.sfxGain, undefined, 0.08);
        this.playNoise(0.28, 2500, 0.32, 'highpass');
        break;
      default:
        // Sword / Lance / Katana slash
        this.playNoise(0.14, 2400, 0.34, 'highpass');
        this.playTone(340, 0.14, 'sawtooth', 0.22, this.sfxGain, 110);
        break;
    }
  }

  playVictoryFanfare(): void {
    this.ensureContext();
    const notes = [523.25, 523.25, 523.25, 659.25, 587.33, 659.25, 783.99];
    const delays = [0, 0.14, 0.28, 0.42, 0.65, 0.8, 0.96];
    const durs = [0.12, 0.12, 0.12, 0.2, 0.12, 0.14, 0.65];
    for (let i = 0; i < notes.length; i++) {
      this.playTone(notes[i], durs[i], 'triangle', 0.26, this.sfxGain, undefined, delays[i]);
      this.playTone(notes[i] * 0.5, durs[i], 'sawtooth', 0.12, this.sfxGain, undefined, delays[i]);
    }
  }

  playDefeatChord(): void {
    this.ensureContext();
    this.playTone(220, 0.6, 'sawtooth', 0.2, this.sfxGain, 165);
    this.playTone(261.6, 0.65, 'triangle', 0.18, this.sfxGain, 196, 0.12);
  }
}
