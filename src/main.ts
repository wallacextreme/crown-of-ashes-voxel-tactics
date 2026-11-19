import './style.css';
import { JOBS, getEquipmentDef } from './data/jobs.ts';
import { getStageDef } from './data/stages.ts';
import { AudioEngine } from './systems/AudioEngine.ts';
import { CampaignManager } from './systems/CampaignManager.ts';
import { TacticalAI } from './systems/TacticalAI.ts';
import {
  type MoveNode,
  TacticalCombatEngine,
  type TimelinePreviewModifier,
  predictCTBTimeline,
  tileKey,
} from './systems/TacticalCombatEngine.ts';
import {
  BattlefieldTactics3D,
  type GraphicsPreset,
  type ScreenProjection,
  isMobileOrCoarseDevice,
} from './three/BattlefieldTactics3D.ts';
import { STEP_HEIGHT, TILE_SIZE, tileCenterWorld } from './three/TerrainDioramaVoxel3D.ts';
import type { BattleUnit, Facing, SkillDef } from './types/tactics.ts';
import { BarracksModal } from './ui/BarracksModal.ts';

type InputPhase = 'busy' | 'command' | 'move' | 'target' | 'SELECT_FACING' | 'ended';

const SURFACE_NAMES: Record<string, string> = {
  grass: 'Grama',
  stone: 'Pedra',
  cobble: 'Calçamento',
  wood: 'Madeira',
  water: 'Água',
  lava: 'Lava',
  snow: 'Neve',
  ice: 'Gelo',
  swamp: 'Pântano (Custo 2)',
  obsidian: 'Obsidiana',
  carpet: 'Tapete Real',
  metal: 'Metal',
};

const FACING_NAMES: Record<Facing, string> = {
  N: 'Norte (N)',
  S: 'Sul (S)',
  E: 'Leste (L)',
  W: 'Oeste (O)',
};

class GameController {
  private campaign: CampaignManager;
  private audio: AudioEngine;
  private battlefield: BattlefieldTactics3D;
  private barracks: BarracksModal;
  private engine!: TacticalCombatEngine;

  private phase: InputPhase = 'busy';
  private isBusy = false;
  private busySinceMs = 0;
  private battleSessionId = 0;
  private moveMap = new Map<string, MoveNode>();
  private selectedSkill: SkillDef | null = null;
  private targetableSet = new Set<string>();
  private speedScale = 1;
  private graphicsPreset: GraphicsPreset = 'HIGH';
  private stageBonusGold = 0;
  private stageBonusJp = 0;
  private skillsMenuOpen = false;
  private hudHidden = false;
  private heroCollapsed = false;
  private targetCollapsed = false;
  private pendingTargetCell: { col: number; row: number } | null = null;
  private floatBarEls = new Map<string, HTMLElement>();

  // Cached DOM references
  private topHudEl = document.getElementById('top-hud')!;
  private activeHeroPanelEl = document.getElementById('active-hero-panel')!;
  private activeHeroBodyEl = document.getElementById('active-hero-body')!;
  private targetPanelEl = document.getElementById('target-forecast-panel')!;
  private restoreHudBtnEl = document.getElementById('btn-restore-hud')!;
  private openTargetPillEl = document.getElementById('btn-open-target')!;
  private floatingLayer = document.getElementById('floating-layer')!;
  private ctbTimelineEl = document.getElementById('ctb-timeline')!;
  private castBannerEl = document.getElementById('cast-banner')!;
  private skillsSubmenuEl = document.getElementById('skills-submenu')!;
  private skillsListEl = document.getElementById('skills-list')!;
  private facingSubmenuEl = document.getElementById('facing-submenu')!;

  constructor() {
    this.campaign = new CampaignManager();
    this.audio = new AudioEngine();

    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.battlefield = new BattlefieldTactics3D(canvas, {
      onTileHover: (c, r) => this.handleTileHover(c, r),
      onTileClick: (c, r) => void this.handleTileClick(c, r),
      onFacingClick: (f) => void this.confirmFacing(f),
      onUnitProjections: (list) => this.updateFloatingBars(list),
      onFrameTick: (nowMs) => this.checkBusyWatchdog(nowMs),
    });

    this.barracks = new BarracksModal(
      this.campaign,
      (stageId) => this.startStage(stageId),
      () => this.refreshHudHeader()
    );

    this.graphicsPreset = this.battlefield.getGraphicsPreset();
    const graphicsBtnInit = document.getElementById('btn-graphics');
    if (graphicsBtnInit) {
      graphicsBtnInit.textContent = `⚙️ GRÁFICOS: ${this.graphicsPreset}`;
    }

    // Start collapsed target inspector on narrow portrait phones to keep the 3D board wide open
    if (window.innerWidth <= 768) {
      this.setTargetCollapsed(true);
    }

    this.bindUiControls();
    this.syncHudHeightVar();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => this.syncHudHeightVar());
      ro.observe(this.topHudEl);
    }
    window.addEventListener('resize', () => this.syncHudHeightVar());
    window.addEventListener('orientationchange', () => this.syncHudHeightVar());
    this.startStage(this.campaign.getData().selectedStageId || 1);
  }

  private setBusy(busy: boolean): void {
    this.isBusy = busy;
    this.busySinceMs = busy ? performance.now() : 0;
    if (busy) {
      this.phase = 'busy';
    }
  }

  private syncHudHeightVar(): void {
    const h = this.topHudEl.classList.contains('hidden')
      ? 12
      : Math.ceil(this.topHudEl.getBoundingClientRect().bottom + 8);
    document.documentElement.style.setProperty('--top-hud-height', `${h}px`);
  }

  private setHudHidden(hidden: boolean): void {
    this.hudHidden = hidden;
    this.topHudEl.classList.toggle('hidden', hidden);
    this.activeHeroPanelEl.classList.toggle('hidden', hidden);
    this.targetPanelEl.classList.toggle('hidden', hidden || this.targetCollapsed);
    this.openTargetPillEl.classList.toggle('hidden', hidden || !this.targetCollapsed);
    this.restoreHudBtnEl.classList.toggle('hidden', !hidden);
    this.syncHudHeightVar();
  }

  private setHeroCollapsed(collapsed: boolean): void {
    this.heroCollapsed = collapsed;
    this.activeHeroBodyEl.classList.toggle('hidden', collapsed);
    this.activeHeroPanelEl.classList.toggle('collapsed', collapsed);
    const btn = document.getElementById('btn-collapse-hero');
    if (btn) btn.textContent = collapsed ? '▴' : '▾';
  }

  private setTargetCollapsed(collapsed: boolean): void {
    this.targetCollapsed = collapsed;
    this.targetPanelEl.classList.toggle('hidden', this.hudHidden || collapsed);
    this.openTargetPillEl.classList.toggle('hidden', this.hudHidden || !collapsed);
  }

  private bindUiControls(): void {
    const unlockAudio = () => this.audio.unlockAndStartMusic();
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    document.getElementById('btn-rot-left')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.battlefield.rotate90(-1);
    });
    document.getElementById('btn-rot-right')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.battlefield.rotate90(1);
    });

    const speedBtn = document.getElementById('btn-speed')!;
    speedBtn.addEventListener('click', () => {
      this.speedScale = this.speedScale === 1 ? 2 : 1;
      this.battlefield.setTimeScale(this.speedScale);
      speedBtn.textContent = `⚡ ${this.speedScale}x`;
      this.audio.playUiConfirm();
    });

    const graphicsBtn = document.getElementById('btn-graphics');
    graphicsBtn?.addEventListener('click', () => {
      const order: GraphicsPreset[] = ['HIGH', 'LOW', 'MEDIUM'];
      const nextIdx = (order.indexOf(this.graphicsPreset) + 1) % order.length;
      this.graphicsPreset = order[nextIdx];
      this.battlefield.setGraphicsPreset(this.graphicsPreset);
      graphicsBtn.textContent = `⚙️ GRÁFICOS: ${this.graphicsPreset}`;
      this.audio.playUiConfirm();
    });

    const muteBtn = document.getElementById('btn-mute')!;
    muteBtn.addEventListener('click', () => {
      const m = this.audio.toggleMute();
      muteBtn.textContent = m ? '🔇' : '🔊';
    });

    document.getElementById('btn-open-barracks')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.barracks.show('campaign');
    });

    document.getElementById('btn-toggle-hud')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.setHudHidden(true);
    });
    this.restoreHudBtnEl.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.setHudHidden(false);
    });
    document.getElementById('btn-collapse-hero')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.setHeroCollapsed(!this.heroCollapsed);
    });
    document.getElementById('btn-collapse-target')?.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.setTargetCollapsed(true);
    });
    this.openTargetPillEl.addEventListener('click', () => {
      this.audio.playUiConfirm();
      this.setTargetCollapsed(false);
    });
    document.getElementById('btn-close-skills')?.addEventListener('click', () => {
      if (this.isBusy || this.phase === 'ended') return;
      const active = this.engine.getActiveUnit();
      this.audio.playUiCancel();
      this.skillsMenuOpen = false;
      this.selectedSkill = null;
      this.pendingTargetCell = null;
      if (this.phase === 'target') this.phase = 'command';
      this.battlefield.clearHighlights();
      this.battlefield.setParabolicArc(null, null);
      this.hideForecast();
      if (active) this.updateCommandMenuButtons(active);
    });
    document.getElementById('btn-close-facing')?.addEventListener('click', () => {
      if (this.isBusy || this.phase === 'ended') return;
      const active = this.engine.getActiveUnit();
      this.audio.playUiCancel();
      if (this.phase === 'SELECT_FACING') this.phase = 'command';
      this.battlefield.showFacingCompass(null);
      if (active) this.updateCommandMenuButtons(active);
    });
    document.getElementById('btn-confirm-forecast')?.addEventListener('click', () => {
      if (!this.isBusy && this.pendingTargetCell && this.phase === 'target' && this.selectedSkill) {
        void this.executeTargetedSkillAt(this.pendingTargetCell.col, this.pendingTargetCell.row);
      }
    });

    document.getElementById('cmd-move')?.addEventListener('click', () => this.enterMoveMode());
    document.getElementById('cmd-attack')?.addEventListener('click', () => this.enterBasicAttackMode());
    document.getElementById('cmd-skills')?.addEventListener('click', () => this.toggleSkillsMenu());
    document.getElementById('cmd-wait')?.addEventListener('click', () => this.waitAction());

    document.getElementById('btn-confirm-facing')?.addEventListener('click', () => {
      if (this.isBusy || this.phase === 'ended') return;
      const active = this.engine.getActiveUnit();
      if (active && active.team === 'ally' && this.phase === 'SELECT_FACING') {
        void this.confirmFacing(active.facing);
      }
    });

    document.querySelectorAll<HTMLButtonElement>('.face-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.isBusy || this.phase === 'ended') return;
        const f = btn.dataset.facing as Facing;
        if (f) void this.confirmFacing(f);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ' && e.code !== 'Space') return;
      if (this.isBusy || this.phase !== 'SELECT_FACING') return;
      const barracksOpen = !document.getElementById('barracks-modal')?.classList.contains('hidden');
      const resultOpen = !document.getElementById('result-modal')?.classList.contains('hidden');
      if (barracksOpen || resultOpen) return;
      const active = this.engine?.getActiveUnit();
      if (!active || active.team !== 'ally') return;
      e.preventDefault();
      void this.confirmFacing(active.facing);
    });

    document.getElementById('btn-result-barracks')?.addEventListener('click', () => {
      document.getElementById('result-modal')?.classList.add('hidden');
      this.barracks.show('squad');
    });
    document.getElementById('btn-result-replay')?.addEventListener('click', () => {
      document.getElementById('result-modal')?.classList.add('hidden');
      this.startStage(this.engine.stage.id);
    });
    document.getElementById('btn-result-next')?.addEventListener('click', () => {
      document.getElementById('result-modal')?.classList.add('hidden');
      const nextId = Math.min(5, this.engine.stage.id + 1);
      this.campaign.selectStage(nextId);
      this.startStage(nextId);
    });
  }

  startStage(stageId: number): void {
    this.battleSessionId++;
    const stage = getStageDef(stageId);
    const heroes = this.campaign.getDeployedHeroes();
    this.engine = new TacticalCombatEngine(stage, heroes);
    this.stageBonusGold = 0;
    this.stageBonusJp = 0;
    this.isBusy = false;
    this.busySinceMs = 0;
    this.phase = 'busy';
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.skillsMenuOpen = false;

    // Clear old floating unit bars
    for (const el of this.floatBarEls.values()) el.remove();
    this.floatBarEls.clear();

    document.getElementById('result-modal')?.classList.add('hidden');
    this.battlefield.loadStage(this.engine);
    this.battlefield.syncFromEngine(this.engine);
    this.refreshHudHeader();
    this.renderCTBTimeline();
    requestAnimationFrame(() => this.syncHudHeightVar());

    void this.advanceTurn();
  }

  private refreshHudHeader(): void {
    const st = this.engine.stage;
    document.getElementById('hud-stage-kicker')!.textContent = st.subtitle.toUpperCase();
    document.getElementById('hud-stage-title')!.textContent = st.name;
    document.getElementById('hud-turn-badge')!.textContent = `Turno ${Math.max(1, this.engine.turnCount)}`;
    document.getElementById('hud-gold-badge')!.textContent = `🪙 ${this.campaign.getData().gold}`;
  }

  private renderCTBTimeline(previewSkill?: SkillDef, targetCol?: number, targetRow?: number): void {
    let previewMod: TimelinePreviewModifier | undefined;
    const active = this.engine.getActiveUnit();
    if (previewSkill && active && targetCol !== undefined && targetRow !== undefined) {
      const aoe = this.engine.getAoeTiles(targetCol, targetRow, previewSkill, active.col, active.row);
      const affectedIds: string[] = [];
      const defeatedIds: string[] = [];
      for (const c of aoe) {
        const u = this.engine.getUnitAt(c.col, c.row);
        if (!u) continue;
        if (previewSkill.buffType === 'haste' && u.team === active.team) {
          affectedIds.push(u.id);
        } else if (previewSkill.statusEffect === 'slow' && u.team !== active.team) {
          affectedIds.push(u.id);
        } else if (!previewSkill.isHeal && !previewSkill.isBuff && u.team !== active.team) {
          const fc = this.engine.computeCombatForecast(active, previewSkill, u.col, u.row);
          if (fc && fc.predictedDamage >= u.hp) defeatedIds.push(u.id);
        }
      }
      if (affectedIds.length > 0 || defeatedIds.length > 0) {
        previewMod = {
          targetUnitIds: affectedIds,
          ctDelta: previewSkill.ctBoost,
          speedMult: previewSkill.buffType === 'haste' ? 1.4 : previewSkill.statusEffect === 'slow' ? 0.65 : undefined,
          assumeDefeatedIds: defeatedIds,
        };
      }
    }

    const entries = predictCTBTimeline(this.engine.units, 10, previewMod);
    this.ctbTimelineEl.innerHTML = entries
      .map((e, idx) => {
        const job = JOBS[e.jobId];
        const cls = [
          'ctb-slot',
          e.team,
          e.isBoss ? 'boss' : '',
          idx === 0 ? 'first' : '',
          previewMod?.targetUnitIds.includes(e.unitId) ? 'hasted' : '',
        ]
          .filter(Boolean)
          .join(' ');
        return `
          <div class="${cls}" title="${e.name} (${job.name})">
            <span class="ctb-icon">${job.icon}</span>
            <span class="ctb-name">${e.name.split(' ')[0]}</span>
          </div>
        `;
      })
      .join('');
    requestAnimationFrame(() => this.syncHudHeightVar());
  }

  private async showCastBanner(text: string, durationMs = 1500): Promise<void> {
    this.castBannerEl.textContent = text;
    this.castBannerEl.classList.remove('hidden');
    await new Promise((r) => setTimeout(r, durationMs / this.speedScale));
    this.castBannerEl.classList.add('hidden');
  }

  private async advanceTurn(): Promise<void> {
    if (this.phase === 'ended') return;
    const session = this.battleSessionId;
    this.setBusy(true);

    try {
      while (session === this.battleSessionId && !this.engine.combatEnded && (this.phase as InputPhase) !== 'ended') {
        this.battlefield.clearHighlights();
        this.battlefield.showFacingCompass(null);
        this.battlefield.setParabolicArc(null, null);
        this.hideForecast();

        this.busySinceMs = performance.now();
        const turnRes = this.engine.advanceToNextTurn();

        for (const b of turnRes.burnDamageEvents) {
          const u = this.engine.getUnit(b.unitId);
          if (u) this.spawnUnitTextPopup(u, `-${b.damage} 🔥`, 'fall');
        }
        for (const p of turnRes.poisonDamageEvents) {
          const u = this.engine.getUnit(p.unitId);
          if (u) this.spawnUnitTextPopup(u, `-${p.damage} ☠️`, 'fall');
        }

        if (turnRes.detonatedMeteor) {
          const m = turnRes.detonatedMeteor;
          const beliasSkill = JOBS.belias_boss.skills[2];
          const aoe = this.engine.getAoeTiles(m.centerCol, m.centerRow, beliasSkill);
          this.battlefield.focusOnTile(m.centerCol, m.centerRow);
          this.audio.playSkillSfx(beliasSkill);
          void this.showCastBanner('☄️ APOCALYPSE METEOR DETONOU!', 1800);
          await this.battlefield.animateUnitSkill('e5_belias', beliasSkill, m.centerCol, m.centerRow, aoe);
          if (session !== this.battleSessionId) return;
          for (const h of m.hits) {
            const u = this.engine.getUnit(h.targetId);
            if (u) {
              this.battlefield.triggerHitFeedback(u.id, true, false, h.killed);
              this.spawnUnitTextPopup(u, `-${h.damage} ☄️`, 'crit');
            }
          }
          this.battlefield.syncFromEngine(this.engine);
        }

        const outcome = this.engine.checkVictoryCondition();
        if (outcome) {
          this.handleBattleEnd(outcome);
          return;
        }

        const active = turnRes.activeUnit;
        if (!active) return;

        this.battlefield.syncFromEngine(this.engine);
        this.battlefield.focusOnTile(active.col, active.row);
        this.refreshHudHeader();
        this.renderCTBTimeline();
        this.renderActiveHeroPanel(active);

        if (active.team === 'ally') {
          this.phase = 'command';
          this.skillsMenuOpen = false;
          return;
        }

        await this.executeEnemyTurn(active, session);
      }
    } catch (err) {
      console.error('[GameController] Error in advanceTurn:', err);
    } finally {
      if (session === this.battleSessionId) {
        this.isBusy = false;
        this.busySinceMs = 0;
        const outcome = this.engine.checkVictoryCondition();
        if (outcome && (this.phase as InputPhase) !== 'ended') {
          this.handleBattleEnd(outcome);
        } else if ((this.phase as InputPhase) !== 'ended') {
          const active = this.engine.getActiveUnit();
          if (active && active.team === 'ally') {
            if (this.phase === 'busy') {
              this.phase = 'command';
            }
            this.renderActiveHeroPanel(active);
            this.updateCommandMenuButtons(active);
          } else if (active && active.team === 'enemy') {
            this.engine.endUnitTurn(active.facing);
            this.battlefield.syncFromEngine(this.engine);
            queueMicrotask(() => void this.advanceTurn());
          }
        }
      }
    }
  }

  private renderActiveHeroPanel(unit: BattleUnit): void {
    const job = JOBS[unit.jobId];
    document.getElementById('active-avatar')!.textContent = job.icon;
    document.getElementById('active-name')!.textContent = unit.name;
    document.getElementById('active-lvl')!.textContent = `Nv. ${unit.level}`;
    document.getElementById('active-job')!.textContent = `${job.name} • MOV ${unit.move} • JUMP ${unit.jump}`;

    document.getElementById('active-hp-fill')!.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
    document.getElementById('active-hp-text')!.textContent = `${unit.hp}/${unit.maxHp}`;
    document.getElementById('active-mp-fill')!.style.width = `${(unit.mp / Math.max(1, unit.maxMp)) * 100}%`;
    document.getElementById('active-mp-text')!.textContent = `${unit.mp}/${unit.maxMp}`;
    document.getElementById('active-ct-fill')!.style.width = `${Math.min(100, unit.ct)}%`;
    document.getElementById('active-ct-text')!.textContent = `${Math.round(unit.ct)}`;

    const statusEl = document.getElementById('active-statuses')!;
    statusEl.innerHTML = unit.statuses
      .map((s) => `<span class="status-pill">${s.id.toUpperCase()} (${s.turns})</span>`)
      .join('');

    const rosterHero = unit.rosterUid ? this.campaign.getHero(unit.rosterUid) : undefined;
    const eqNames = rosterHero
      ? [
          rosterHero.equipment.weapon,
          rosterHero.equipment.shield,
          rosterHero.equipment.armor,
          rosterHero.equipment.accessory,
        ]
          .map((id) => getEquipmentDef(id)?.name)
          .filter(Boolean)
          .join(' • ')
      : unit.team === 'enemy'
        ? 'Unidade Inimiga'
        : '';
    document.getElementById('active-equip-line')!.textContent = eqNames || 'Sem equipamentos extras';
  }

  private updateCommandMenuButtons(active: BattleUnit): void {
    const isPlayerTurn = active.team === 'ally' && !this.isBusy && this.phase !== 'ended';
    const cmdMove = document.getElementById('cmd-move') as HTMLButtonElement;
    const cmdAttack = document.getElementById('cmd-attack') as HTMLButtonElement;
    const cmdSkills = document.getElementById('cmd-skills') as HTMLButtonElement;
    const cmdWait = document.getElementById('cmd-wait') as HTMLButtonElement;

    const canMove = this.engine.canUnitMove(active);
    const canAct = !active.hasActedThisTurn && this.engine.getAvailableSkills(active).length > 0;

    cmdMove.disabled = !isPlayerTurn || !canMove;
    cmdAttack.disabled = !isPlayerTurn || !canAct;
    cmdSkills.disabled = !isPlayerTurn || !canAct;
    // ESPERAR / DIREÇÃO never disables during an ally hero's turn (except while isBusy animating)
    cmdWait.disabled = !isPlayerTurn;

    cmdMove.classList.toggle('active', this.phase === 'move');
    cmdAttack.classList.toggle('active', this.phase === 'target' && Boolean(this.selectedSkill?.isBasic));
    cmdSkills.classList.toggle('active', this.skillsMenuOpen || (this.phase === 'target' && !this.selectedSkill?.isBasic));
    cmdWait.classList.toggle('active', this.phase === 'SELECT_FACING');

    const waitGain = !active.hasMovedThisTurn && !active.hasActedThisTurn ? 40 : active.hasMovedThisTurn !== active.hasActedThisTurn ? 20 : 0;
    const waitLabel = document.getElementById('wait-btn-label');
    if (waitLabel) {
      waitLabel.textContent = this.phase === 'SELECT_FACING' ? '✅ PASSAR VEZ' : '🧭 ESPERAR / DIREÇÃO';
    }
    document.getElementById('wait-ct-hint')!.textContent =
      this.phase === 'SELECT_FACING'
        ? 'Confirmar / Enter'
        : waitGain > 0
          ? `+${waitGain} CT`
          : 'Encerrar turno';

    document.querySelectorAll<HTMLButtonElement>('.face-btn').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.facing === active.facing);
    });

    this.skillsSubmenuEl.classList.toggle('hidden', !this.skillsMenuOpen);
    this.facingSubmenuEl.classList.toggle('hidden', this.phase !== 'SELECT_FACING');
  }

  private enterMoveMode(): void {
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally' || !this.engine.canUnitMove(active) || this.isBusy || this.phase === 'busy' || this.phase === 'ended') {
      return;
    }
    this.audio.playUiConfirm();
    this.skillsMenuOpen = false;
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.battlefield.showFacingCompass(null);
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();

    this.phase = 'move';
    this.moveMap = this.engine.getMoveRange(active);
    const cells = Array.from(this.moveMap.values()).map((n) => ({ col: n.col, row: n.row }));
    this.battlefield.clearHighlights();
    this.battlefield.setMoveTiles(cells);
    this.updateCommandMenuButtons(active);
  }

  private enterBasicAttackMode(): void {
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally' || active.hasActedThisTurn || this.isBusy || this.phase === 'busy' || this.phase === 'ended') {
      return;
    }
    const skills = this.engine.getAvailableSkills(active);
    const basic = skills.find((s) => s.isBasic) ?? skills[0];
    if (basic) {
      this.skillsMenuOpen = false;
      this.enterSkillTargetMode(basic);
    }
  }

  private toggleSkillsMenu(): void {
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally' || active.hasActedThisTurn || this.isBusy || this.phase === 'busy' || this.phase === 'ended') {
      return;
    }
    this.audio.playUiConfirm();
    this.skillsMenuOpen = !this.skillsMenuOpen;
    this.battlefield.clearHighlights();
    this.battlefield.showFacingCompass(null);

    if (this.skillsMenuOpen) {
      const skills = this.engine.getAvailableSkills(active);
      this.skillsListEl.innerHTML = skills
        .map((s) => {
          const canAfford = active.mp >= s.mpCost;
          return `
            <button class="skill-choice-btn ${this.selectedSkill?.id === s.id ? 'active' : ''}" data-skill-id="${s.id}" ${canAfford ? '' : 'disabled'}>
              <div>
                <div style="font-size:12px;font-weight:700;">${s.name}</div>
                <div style="font-size:10px;color:#94a3b8;">${s.description}</div>
              </div>
              <span class="skill-mp">${s.mpCost} MP</span>
            </button>
          `;
        })
        .join('');
      this.skillsListEl.querySelectorAll<HTMLButtonElement>('[data-skill-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const sk = skills.find((x) => x.id === btn.dataset.skillId);
          if (sk) this.enterSkillTargetMode(sk);
        });
      });
    }
    this.updateCommandMenuButtons(active);
  }

  private enterSkillTargetMode(skill: SkillDef): void {
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally' || active.hasActedThisTurn || this.isBusy || this.phase === 'busy' || this.phase === 'ended') {
      return;
    }
    this.audio.playUiConfirm();
    this.selectedSkill = skill;
    this.pendingTargetCell = null;
    this.phase = 'target';
    this.battlefield.showFacingCompass(null);

    const cells = this.engine.getSkillTargetableTiles(active, skill);
    this.targetableSet = new Set(cells.map((c) => tileKey(c.col, c.row)));
    this.battlefield.clearHighlights();
    this.battlefield.setAttackTiles(cells);
    this.updateCommandMenuButtons(active);
  }

  private syncPostActionState(active: BattleUnit): void {
    if (this.phase === 'ended') return;
    const postState = this.engine.getPostActionState(active);
    if (postState === 'VICTORY') {
      this.handleBattleEnd('victory');
      return;
    }
    if (postState === 'DEFEAT') {
      this.handleBattleEnd('defeat');
      return;
    }
    if (postState === 'SELECT_FACING') {
      this.enterFacingMode(false);
      return;
    }
    this.phase = 'command';
    this.battlefield.showFacingCompass(null);
    this.renderActiveHeroPanel(active);
    this.updateCommandMenuButtons(active);
  }

  private enterFacingMode(playSfx = true): void {
    if (this.isBusy || this.phase === 'ended') return;
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally') return;
    if (playSfx) this.audio.playUiConfirm();
    this.skillsMenuOpen = false;
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.phase = 'SELECT_FACING';
    this.battlefield.clearHighlights();
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();
    this.battlefield.showFacingCompass(active);
    this.battlefield.focusOnTile(active.col, active.row);
    if (this.heroCollapsed) {
      this.setHeroCollapsed(false);
    }
    this.renderActiveHeroPanel(active);
    this.updateCommandMenuButtons(active);
    requestAnimationFrame(() => {
      this.facingSubmenuEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  private waitAction(): void {
    if (this.isBusy || this.phase === 'ended') return;
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally') return;
    if (this.phase === 'SELECT_FACING') {
      void this.confirmFacing(active.facing);
      return;
    }
    this.enterFacingMode(true);
  }

  private checkBusyWatchdog(nowMs: number): void {
    if (!this.isBusy || this.busySinceMs <= 0 || this.phase === 'ended') return;
    if (nowMs - this.busySinceMs <= 4000) return;

    console.warn('[GameController] Watchdog released stuck busy lock after 4.0s.');
    this.isBusy = false;
    this.busySinceMs = 0;
    this.battlefield.isAnimating = false;
    this.battlefield.clearHighlights();
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();
    this.battlefield.syncFromEngine(this.engine);

    const outcome = this.engine.checkVictoryCondition();
    if (outcome) {
      this.handleBattleEnd(outcome);
      return;
    }

    const active = this.engine.getActiveUnit();
    if (!active || active.hp <= 0) {
      void this.advanceTurn();
      return;
    }

    if (active.team === 'enemy') {
      this.engine.endUnitTurn(active.facing);
      this.battlefield.syncFromEngine(this.engine);
      this.renderCTBTimeline();
      void this.advanceTurn();
      return;
    }

    this.syncPostActionState(active);
  }

  private handleTileHover(col: number | null, row: number | null): void {
    if (col === null || row === null) {
      this.battlefield.setAoeTiles([]);
      this.battlefield.setParabolicArc(null, null);
      this.hideForecast();
      return;
    }

    const tile = this.engine.getTile(col, row);
    if (tile) {
      document.getElementById('tile-coords')!.textContent = `Tile (${col}, ${row})`;
      document.getElementById('tile-height-badge')!.textContent = `H: ${tile.height}`;
      document.getElementById('tile-surface-badge')!.textContent =
        SURFACE_NAMES[tile.surface] ?? tile.surface;
    }

    const hoveredUnit = this.engine.getUnitAt(col, row, true);
    const targetBox = document.getElementById('target-unit-box')!;
    if (hoveredUnit) {
      const job = JOBS[hoveredUnit.jobId];
      targetBox.classList.remove('hidden');
      document.getElementById('target-avatar')!.textContent = job.icon;
      document.getElementById('target-name')!.textContent = hoveredUnit.name;
      document.getElementById('target-lvl')!.textContent = `Nv. ${hoveredUnit.level}`;
      document.getElementById('target-job')!.textContent =
        hoveredUnit.hp <= 0 ? `${job.name} (CAÍDO)` : job.name;
      document.getElementById('target-facing-text')!.textContent = `Olhando: ${FACING_NAMES[hoveredUnit.facing]}`;
      document.getElementById('target-hp-fill')!.style.width = `${(hoveredUnit.hp / hoveredUnit.maxHp) * 100}%`;
      document.getElementById('target-hp-text')!.textContent = `${hoveredUnit.hp}/${hoveredUnit.maxHp}`;
      document.getElementById('target-mp-fill')!.style.width = `${(hoveredUnit.mp / Math.max(1, hoveredUnit.maxMp)) * 100}%`;
      document.getElementById('target-mp-text')!.textContent = `${hoveredUnit.mp}/${hoveredUnit.maxMp}`;
    } else {
      targetBox.classList.add('hidden');
    }

    // Combat Forecast & AoE preview when targeting
    const active = this.engine.getActiveUnit();
    if (this.phase === 'target' && active && this.selectedSkill && this.targetableSet.has(tileKey(col, row))) {
      const aoe = this.engine.getAoeTiles(col, row, this.selectedSkill, active.col, active.row);
      this.battlefield.setAoeTiles(aoe);
      this.battlefield.setParabolicArc(
        { col: active.col, row: active.row },
        { col, row },
        this.selectedSkill.isHeal ? 0x4ade80 : 0xfacc15
      );
      this.renderCTBTimeline(this.selectedSkill, col, row);

      const fc = this.engine.computeCombatForecast(active, this.selectedSkill, col, row);
      if (fc) {
        this.pendingTargetCell = { col, row };
        if (!this.hudHidden && this.targetCollapsed) {
          this.setTargetCollapsed(false);
        }
        this.showForecast(fc.formattedBanner);
      } else {
        this.pendingTargetCell = null;
        this.hideForecast();
      }
    } else {
      this.battlefield.setAoeTiles([]);
      this.battlefield.setParabolicArc(null, null);
      this.hideForecast();
      this.renderCTBTimeline();
    }
  }

  private showForecast(banner: string): void {
    document.getElementById('forecast-card')!.classList.remove('hidden');
    document.getElementById('forecast-banner')!.textContent = banner;
  }

  private hideForecast(): void {
    document.getElementById('forecast-card')!.classList.add('hidden');
  }

  private async handleTileClick(col: number, row: number): Promise<void> {
    if (this.isBusy || this.phase === 'busy' || this.phase === 'ended') return;
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally') return;

    if (this.phase === 'move') {
      const node = this.moveMap.get(tileKey(col, row));
      if (!node) {
        this.audio.playUiCancel();
        return;
      }
      const session = this.battleSessionId;
      this.setBusy(true);
      this.battlefield.clearHighlights();
      this.updateCommandMenuButtons(active);

      try {
        await this.battlefield.animateUnitMovePath(active.id, node.path, () => {
          this.audio.playStep();
        });
        if (session !== this.battleSessionId) return;

        const moveRes = this.engine.moveUnit(active, col, row);
        if (moveRes.openedChest) {
          this.audio.playVictoryFanfare();
          this.campaign.addGold(moveRes.openedChest.gold);
          this.stageBonusGold += moveRes.openedChest.gold;
          if (moveRes.openedChest.itemId) {
            this.campaign.addInventoryItem(moveRes.openedChest.itemId);
          }
          const eqName = getEquipmentDef(moveRes.openedChest.itemId)?.name;
          void this.showCastBanner(
            `📦 BAÚ ABERTO! +${moveRes.openedChest.gold} 🪙${eqName ? ` + ${eqName}!` : ''}`,
            2100
          );
          this.refreshHudHeader();
        }

        this.campaign.awardActionEXPAndJP(active.rosterUid, 12, 10);
        this.battlefield.syncFromEngine(this.engine);
      } catch (err) {
        console.error('[GameController] Error during move sequence:', err);
      } finally {
        if (session === this.battleSessionId) {
          this.isBusy = false;
          this.busySinceMs = 0;
          this.syncPostActionState(active);
        }
      }
      return;
    }

    if (this.phase === 'target' && this.selectedSkill) {
      if (!this.targetableSet.has(tileKey(col, row))) {
        this.audio.playUiCancel();
        return;
      }
      const fc = this.engine.computeCombatForecast(active, this.selectedSkill, col, row);
      if (!fc && this.selectedSkill.aoeShape !== 'self') {
        this.audio.playUiCancel();
        return;
      }

      // On touch devices, 1st tap previews the Combat Forecast + AoE + 3D Arc; 2nd tap (or Confirm button) executes!
      if (
        isMobileOrCoarseDevice() &&
        (!this.pendingTargetCell || this.pendingTargetCell.col !== col || this.pendingTargetCell.row !== row)
      ) {
        this.audio.playUiConfirm();
        this.handleTileHover(col, row);
        return;
      }

      await this.executeTargetedSkillAt(col, row);
    }
  }

  private async executeTargetedSkillAt(col: number, row: number): Promise<void> {
    if (this.isBusy || this.phase === 'ended') return;
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally' || !this.selectedSkill || this.phase !== 'target') return;
    if (!this.targetableSet.has(tileKey(col, row))) {
      this.audio.playUiCancel();
      return;
    }
    const fc = this.engine.computeCombatForecast(active, this.selectedSkill, col, row);
    if (!fc && this.selectedSkill.aoeShape !== 'self') {
      this.audio.playUiCancel();
      return;
    }

    const skill = this.selectedSkill;
    const session = this.battleSessionId;
    this.setBusy(true);
    this.skillsMenuOpen = false;
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.battlefield.clearHighlights();
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();
    this.updateCommandMenuButtons(active);

    try {
      const basicSkillId = this.engine.getAvailableSkills(active).find((s) => s.isBasic)?.id;
      const exec =
        skill.isBasic && skill.id === basicSkillId
          ? this.engine.executeAttack(active, col, row) ?? this.engine.executeSkill(active, skill, col, row)
          : this.engine.executeSkill(active, skill, col, row);
      this.audio.playSkillSfx(skill);

      if (skill.jpCost > 0 || !skill.isBasic) {
        void this.showCastBanner(`✨ ${active.name.toUpperCase()} CONJURA: ${skill.name.toUpperCase()}!`, 1350);
      }

      await this.battlefield.animateUnitSkill(active.id, skill, col, row, exec.aoeTiles);
      if (session !== this.battleSessionId) return;

      let totalExp = 24;
      let totalJp = 22;
      for (const h of exec.hits) {
        const target = this.engine.getUnit(h.targetId);
        if (!target) continue;
        if (h.isBlocked) {
          this.audio.playShieldBlock();
          this.battlefield.triggerHitFeedback(target.id, false, true, false);
          this.spawnUnitTextPopup(target, 'BLOQUEADO!', 'block');
        } else if (h.isEvaded) {
          this.spawnUnitTextPopup(target, 'ESQUIVOU!', 'block');
        } else if (h.revived) {
          this.spawnUnitTextPopup(target, `REVIVE +${h.healed}`, 'heal');
          totalExp += 25;
          totalJp += 20;
        } else if (h.healed > 0) {
          this.spawnUnitTextPopup(target, `+${h.healed} HP`, 'heal');
          totalExp += 16;
          totalJp += 15;
        } else if (h.mpRestored > 0) {
          this.spawnUnitTextPopup(target, `+${h.mpRestored} MP`, 'heal');
        } else if (h.appliedStatus && h.damage === 0) {
          this.spawnUnitTextPopup(target, `${h.appliedStatus.toUpperCase()}!`, 'heal');
        } else {
          if (h.isCrit) this.audio.playCriticalHit();
          this.battlefield.triggerHitFeedback(target.id, h.isCrit, false, h.killed);
          this.spawnUnitTextPopup(
            target,
            h.isCrit ? `CRÍTICO! -${h.damage}` : `-${h.damage}`,
            h.isCrit ? 'crit' : 'normal'
          );
          if (h.fallDamage > 0) {
            this.spawnUnitTextPopup(target, `QUEDA! -${h.fallDamage}`, 'fall');
          }
          if (h.killed) {
            this.stageBonusGold += target.isBoss ? 120 : 45;
            this.stageBonusJp += 25;
            this.campaign.addGold(target.isBoss ? 120 : 45);
            totalExp += 40;
            totalJp += 35;
          }
        }
      }

      this.campaign.awardActionEXPAndJP(active.rosterUid, totalExp, totalJp);
      this.battlefield.syncFromEngine(this.engine);
      this.renderActiveHeroPanel(active);
      this.renderCTBTimeline();
    } catch (err) {
      console.error('[GameController] Error during skill/attack execution:', err);
    } finally {
      if (session === this.battleSessionId) {
        this.isBusy = false;
        this.busySinceMs = 0;
        const outcome = this.engine.checkVictoryCondition();
        if (outcome) {
          this.handleBattleEnd(outcome);
        } else {
          this.syncPostActionState(active);
        }
      }
    }
  }

  private async confirmFacing(facing: Facing): Promise<void> {
    if (this.isBusy || this.phase === 'ended') return;
    const active = this.engine.getActiveUnit();
    if (!active || active.team !== 'ally') return;
    try {
      this.audio.playUiConfirm();
    } catch {
      // Ignore audio errors when ending turn
    }
    this.skillsMenuOpen = false;
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.battlefield.clearHighlights();
    this.battlefield.showFacingCompass(null);
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();
    this.engine.endUnitTurn(facing);
    this.battlefield.syncFromEngine(this.engine);
    this.renderCTBTimeline();
    await this.advanceTurn();
  }

  private async executeEnemyTurn(enemy: BattleUnit, session: number): Promise<void> {
    let endFacing: Facing = enemy.facing;
    try {
      this.busySinceMs = performance.now();
      const decision = TacticalAI.chooseBestAction(this.engine, enemy);
      endFacing = decision.endFacing;

      if (decision.moveCol !== enemy.col || decision.moveRow !== enemy.row) {
        await this.battlefield.animateUnitMovePath(enemy.id, decision.movePath, () => {
          this.audio.playStep();
        });
        if (session !== this.battleSessionId) return;
        this.engine.moveUnit(enemy, decision.moveCol, decision.moveRow);
        this.battlefield.syncFromEngine(this.engine);
      }

      if (decision.skill) {
        this.busySinceMs = performance.now();
        this.battlefield.focusOnTile(decision.targetCol, decision.targetRow);
        await this.showCastBanner(
          `⚔️ ${enemy.name.toUpperCase()} CONJURA: ${decision.skill.name.toUpperCase()}!`,
          1450
        );
        if (session !== this.battleSessionId) return;
        const exec = this.engine.executeSkill(enemy, decision.skill, decision.targetCol, decision.targetRow);
        this.audio.playSkillSfx(decision.skill);
        await this.battlefield.animateUnitSkill(
          enemy.id,
          decision.skill,
          decision.targetCol,
          decision.targetRow,
          exec.aoeTiles
        );
        if (session !== this.battleSessionId) return;

        if (exec.telegraphedMeteor) {
          void this.showCastBanner('🔥 CHÃO MARCADO! SAIA DA ÁREA EM 1 TURNO!', 1750);
        }

        for (const h of exec.hits) {
          const target = this.engine.getUnit(h.targetId);
          if (!target) continue;
          if (h.isBlocked) {
            this.audio.playShieldBlock();
            this.battlefield.triggerHitFeedback(target.id, false, true, false);
            this.spawnUnitTextPopup(target, 'BLOQUEADO!', 'block');
          } else if (h.isEvaded) {
            this.spawnUnitTextPopup(target, 'ESQUIVOU!', 'block');
          } else if (h.healed > 0) {
            this.spawnUnitTextPopup(target, `+${h.healed}`, 'heal');
          } else if (h.damage > 0) {
            if (h.isCrit) this.audio.playCriticalHit();
            this.battlefield.triggerHitFeedback(target.id, h.isCrit, false, h.killed);
            this.spawnUnitTextPopup(
              target,
              h.isCrit ? `CRÍTICO! -${h.damage}` : `-${h.damage}`,
              h.isCrit ? 'crit' : 'normal'
            );
            if (h.fallDamage > 0) {
              this.spawnUnitTextPopup(target, `QUEDA! -${h.fallDamage}`, 'fall');
            }
          }
          if (h.lifesteal > 0) {
            this.spawnUnitTextPopup(enemy, `+${h.lifesteal}`, 'heal');
          }
        }
        this.battlefield.syncFromEngine(this.engine);
      }
    } catch (err) {
      console.error('[GameController] Error during enemy turn:', err);
    } finally {
      if (session === this.battleSessionId) {
        const outcome = this.engine.checkVictoryCondition();
        if (outcome) {
          this.handleBattleEnd(outcome);
        } else {
          if (this.engine.activeUnitId === enemy.id) {
            this.engine.endUnitTurn(endFacing);
            this.battlefield.syncFromEngine(this.engine);
          }
          await new Promise((r) => setTimeout(r, 260 / this.speedScale));
        }
      }
    }
  }

  private handleBattleEnd(outcome: 'victory' | 'defeat'): void {
    this.isBusy = false;
    this.busySinceMs = 0;
    this.phase = 'ended';
    this.skillsMenuOpen = false;
    this.selectedSkill = null;
    this.pendingTargetCell = null;
    this.battlefield.clearHighlights();
    this.battlefield.showFacingCompass(null);
    this.battlefield.setParabolicArc(null, null);
    this.hideForecast();
    this.skillsSubmenuEl.classList.add('hidden');
    this.facingSubmenuEl.classList.add('hidden');

    const modal = document.getElementById('result-modal')!;
    const kicker = document.getElementById('result-kicker')!;
    const title = document.getElementById('result-title')!;
    const desc = document.getElementById('result-desc')!;
    const rewards = document.getElementById('result-rewards')!;
    const nextBtn = document.getElementById('btn-result-next') as HTMLButtonElement;

    if (outcome === 'victory') {
      this.audio.playVictoryFanfare();
      const res = this.campaign.completeStage(
        this.engine.stage.id,
        this.stageBonusGold,
        this.stageBonusJp
      );
      kicker.textContent = `FASE ${this.engine.stage.id} CONCLUÍDA`;
      title.textContent = this.engine.stage.id === 5 ? 'COROA CONQUISTADA!' : 'STAGE CLEAR!';
      desc.textContent =
        this.engine.stage.id === 5
          ? 'Belias, o Titã das Cinzas, tombou! Você conquistou o Santuário do Trono das Cinzas e venceu a campanha!'
          : `Vitória tática em ${this.engine.stage.name}! A próxima fase da campanha foi desbloqueada.`;
      rewards.innerHTML = `🪙 Ouro Ganho: <strong>+${res.goldEarned}</strong> &nbsp;|&nbsp; ⭐ Job Points: <strong>+${res.jpEarned} JP</strong>`;
      nextBtn.classList.toggle('hidden', this.engine.stage.id >= 5);
    } else {
      this.audio.playDefeatChord();
      kicker.textContent = 'ESQUADRAO CAÍDO';
      title.textContent = 'DERROTA TÁTICA';
      desc.textContent = 'Seus heróis foram derrotados. Fortaleça armas e habilidades no Quartel ou tente novamente!';
      rewards.innerHTML = `💡 Dica: Use flanqueamento pelas Costas (+50%), Vantagem de Altura e empurre inimigos de penhascos.`;
      nextBtn.classList.add('hidden');
    }

    this.refreshHudHeader();
    modal.classList.remove('hidden');
  }

  private spawnUnitTextPopup(
    unit: BattleUnit,
    text: string,
    kind: 'normal' | 'crit' | 'heal' | 'block' | 'fall'
  ): void {
    const proj = this.battlefield.getUnitTopScreenPosition(unit.id);
    if (!proj || !proj.visible) return;
    const el = document.createElement('div');
    el.className = `dmg-popup ${kind}`;
    el.textContent = text;
    el.style.left = `${proj.x + (Math.random() - 0.5) * 28}px`;
    el.style.top = `${proj.y - 14}px`;
    this.floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), 1180);
  }

  private updateFloatingBars(projections: ScreenProjection[]): void {
    const topRect = !this.topHudEl.classList.contains('hidden') ? this.topHudEl.getBoundingClientRect() : null;
    const leftRect = !this.activeHeroPanelEl.classList.contains('hidden')
      ? this.activeHeroPanelEl.getBoundingClientRect()
      : null;
    const rightRect = !this.targetPanelEl.classList.contains('hidden')
      ? this.targetPanelEl.getBoundingClientRect()
      : null;

    const hitsRect = (x: number, y: number, r: DOMRect | null) =>
      r !== null && x >= r.left - 34 && x <= r.right + 34 && y >= r.top - 10 && y <= r.bottom + 30;

    for (const p of projections) {
      const unit = this.engine.getUnit(p.unitId);
      if (!unit) continue;
      let bar = this.floatBarEls.get(p.unitId);
      if (!bar) {
        bar = document.createElement('div');
        bar.className = `unit-float-bar ${unit.isBoss ? 'is-boss' : ''}`;
        bar.innerHTML = `<div class="unit-float-name">${unit.name}</div><div class="unit-float-hp-track"><div class="unit-float-hp-fill ${unit.isBoss ? 'boss' : unit.team}"></div></div>`;
        this.floatingLayer.appendChild(bar);
        this.floatBarEls.set(p.unitId, bar);
      }

      const overlapsHud = hitsRect(p.x, p.y, topRect) || hitsRect(p.x, p.y, leftRect) || hitsRect(p.x, p.y, rightRect);
      if (!p.visible || unit.hp <= 0 || overlapsHud) {
        bar.style.display = 'none';
        continue;
      }
      bar.style.display = 'block';
      bar.style.left = `${p.x}px`;
      bar.style.top = `${p.y}px`;
      bar.classList.toggle('is-active', this.engine.activeUnitId === unit.id);
      const fill = bar.querySelector<HTMLElement>('.unit-float-hp-fill')!;
      fill.style.width = `${Math.max(0, (unit.hp / unit.maxHp) * 100)}%`;
    }
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    new GameController();
  });
} else {
  new GameController();
}
