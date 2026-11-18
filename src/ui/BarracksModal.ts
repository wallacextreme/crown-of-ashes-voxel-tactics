import {
  EQUIPMENT_CATALOG,
  JOBS,
  PASSIVE_UPGRADES,
  PLAYABLE_JOB_IDS,
  computeHeroStats,
  getEquipmentDef,
} from '../data/jobs.ts';
import { STAGES } from '../data/stages.ts';
import { CampaignManager } from '../systems/CampaignManager.ts';
import type { EquipSlot, JobId, PassiveUpgradeId } from '../types/tactics.ts';

export type BarracksTab = 'campaign' | 'squad' | 'shop';

export class BarracksModal {
  private modalEl: HTMLElement;
  private bodyEl: HTMLElement;
  private goldEl: HTMLElement;
  private campaign: CampaignManager;
  private activeTab: BarracksTab = 'campaign';
  private selectedHeroUid: string | null = null;
  private toastMessage = '';
  private onLaunchStage: (stageId: number) => void;
  private onClose: () => void;

  constructor(
    campaign: CampaignManager,
    onLaunchStage: (stageId: number) => void,
    onClose: () => void
  ) {
    this.campaign = campaign;
    this.onLaunchStage = onLaunchStage;
    this.onClose = onClose;

    this.modalEl = document.getElementById('barracks-modal')!;
    this.bodyEl = document.getElementById('barracks-body')!;
    this.goldEl = document.getElementById('barracks-gold')!;

    document.getElementById('btn-close-barracks')?.addEventListener('click', () => {
      this.hide();
      this.onClose();
    });

    this.modalEl.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeTab = (btn.dataset.tab as BarracksTab) ?? 'campaign';
        this.modalEl.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.render();
      });
    });
  }

  show(tab?: BarracksTab): void {
    if (tab) {
      this.activeTab = tab;
      this.modalEl.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.tab === tab);
      });
    }
    this.modalEl.classList.remove('hidden');
    this.render();
  }

  hide(): void {
    this.modalEl.classList.add('hidden');
  }

  isOpen(): boolean {
    return !this.modalEl.classList.contains('hidden');
  }

  private setToast(msg: string): void {
    this.toastMessage = msg;
    this.render();
  }

  render(): void {
    const data = this.campaign.getData();
    this.goldEl.textContent = `🪙 ${data.gold} Ouro`;

    if (!this.selectedHeroUid || !data.roster.some((h) => h.uid === this.selectedHeroUid)) {
      this.selectedHeroUid = data.roster[0]?.uid ?? null;
    }

    const bannerHtml = this.toastMessage
      ? `<div style="margin-bottom:12px;padding:8px 12px;border-radius:6px;background:rgba(217,119,6,0.22);border:1px solid #f59e0b;color:#fde68a;font-size:12px;font-weight:600;">${this.toastMessage}</div>`
      : '';

    if (this.activeTab === 'campaign') {
      this.bodyEl.innerHTML = bannerHtml + this.renderCampaignTab();
      this.bindCampaignEvents();
    } else if (this.activeTab === 'squad') {
      this.bodyEl.innerHTML = bannerHtml + this.renderSquadTab();
      this.bindSquadEvents();
    } else {
      this.bodyEl.innerHTML = bannerHtml + this.renderShopTab();
      this.bindShopEvents();
    }
  }

  private renderCampaignTab(): string {
    const data = this.campaign.getData();
    const cards = STAGES.map((st) => {
      const unlocked = st.id <= data.unlockedStage;
      const cleared = data.completedStages.includes(st.id);
      const badge = cleared
        ? `<span class="pill-tag cleared">✔ Concluída (Rejogável)</span>`
        : unlocked
          ? `<span class="pill-tag">⚔️ Disponível</span>`
          : `<span class="pill-tag">🔒 Bloqueada</span>`;

      return `
        <div class="card-box ${unlocked ? '' : 'locked'}">
          <div class="card-row">
            <span class="stage-kicker">FASE ${st.id} • ${st.biome.toUpperCase()}</span>
            ${badge}
          </div>
          <h3>${st.name}</h3>
          <div class="card-meta">${st.subtitle}</div>
          <div class="card-meta">${st.description}</div>
          <div class="card-row">
            <span>👹 Chefe: <strong>${st.bossTitle}</strong></span>
          </div>
          <div class="card-row">
            <span>Recompensa: <strong>🪙 ${st.goldReward}</strong> • <strong>⭐ ${st.jpReward} JP</strong></span>
            <button class="hud-btn ${unlocked ? 'hud-btn-primary' : ''}" data-play-stage="${st.id}" ${unlocked ? '' : 'disabled'}>
              ${cleared ? '🔁 Rejogar Fase' : unlocked ? '⚔️ Iniciar Batalha' : '🔒 Bloqueada'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `<div class="grid-2">${cards}</div>`;
  }

  private bindCampaignEvents(): void {
    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-play-stage]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.playStage);
        if (this.campaign.selectStage(id)) {
          this.hide();
          this.onLaunchStage(id);
        }
      });
    });
  }

  private renderSquadTab(): string {
    const data = this.campaign.getData();
    const deployedCount = data.roster.filter((h) => h.deployed).length;

    const heroList = data.roster
      .map((h) => {
        const job = JOBS[h.jobId];
        const selected = h.uid === this.selectedHeroUid;
        return `
          <div class="card-box" style="cursor:pointer;border-color:${selected ? '#fde047' : 'rgba(148,163,184,0.28)'}" data-select-hero="${h.uid}">
            <div class="card-row">
              <strong>${job.icon} ${h.name} <small style="color:#94a3b8">(Nv.${h.level})</small></strong>
              <button class="hud-btn" data-toggle-deploy="${h.uid}">${h.deployed ? '✔ Em Campo' : 'Reserva'}</button>
            </div>
            <div class="card-meta">${job.name} • ⭐ ${h.jp} JP • EXP ${h.exp}/${h.level * 100}</div>
          </div>
        `;
      })
      .join('');

    const hero = data.roster.find((h) => h.uid === this.selectedHeroUid) ?? data.roster[0];
    const job = JOBS[hero.jobId];
    const stats = computeHeroStats(hero);

    const skillsHtml = job.skills
      .map((s) => {
        const has = hero.unlockedSkills.includes(s.id) || s.isBasic;
        return `
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${s.name}</strong> <small style="color:#60a5fa">(${s.mpCost} MP)</small>
              <div class="card-meta">${s.description}</div>
            </div>
            ${
              has
                ? `<span class="pill-tag cleared">Desbloqueada</span>`
                : `<button class="hud-btn hud-btn-gold" data-unlock-skill="${s.id}" ${hero.jp >= s.jpCost ? '' : 'disabled'}>⭐ ${s.jpCost} JP</button>`
            }
          </div>
        `;
      })
      .join('');

    const passivesHtml = job.passivePool
      .map((pid: PassiveUpgradeId) => {
        const p = PASSIVE_UPGRADES[pid];
        const has = hero.passiveUpgrades.includes(pid);
        return `
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${p.name}</strong>
              <div class="card-meta">${p.description}</div>
            </div>
            ${
              has
                ? `<span class="pill-tag cleared">Ativa</span>`
                : `<button class="hud-btn hud-btn-gold" data-unlock-passive="${pid}" ${hero.jp >= p.jpCost ? '' : 'disabled'}>⭐ ${p.jpCost} JP</button>`
            }
          </div>
        `;
      })
      .join('');

    const slots: { slot: EquipSlot; label: string }[] = [
      { slot: 'weapon', label: 'Arma' },
      { slot: 'shield', label: 'Escudo' },
      { slot: 'armor', label: 'Armadura' },
      { slot: 'accessory', label: 'Acessório' },
    ];

    const equipHtml = slots
      .map(({ slot, label }) => {
        const eq = getEquipmentDef(hero.equipment[slot]);
        const compatibleInv = data.inventory
          .map((id, idx) => ({ eq: getEquipmentDef(id), idx }))
          .filter(
            (item) =>
              item.eq &&
              item.eq.slot === slot &&
              (!item.eq.allowedJobs || item.eq.allowedJobs.includes(hero.jobId))
          );
        const uniqueCompatible = Array.from(
          new Map(compatibleInv.map((x) => [x.eq!.id, x.eq!])).values()
        );

        const options = uniqueCompatible
          .map((item) => `<option value="${item.id}">${item.name} (Nv.${item.tier})</option>`)
          .join('');

        return `
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${label}:</strong> ${eq ? `<span style="color:#fde68a">${eq.name}</span>` : '<span style="color:#64748b">Vazio</span>'}
              <div class="card-meta">${eq ? eq.description : 'Selecione um item do inventário'}</div>
            </div>
            <div style="display:flex;gap:4px;align-items:center;">
              ${
                uniqueCompatible.length > 0
                  ? `<select data-equip-select="${slot}" style="background:#0f172a;color:#f1f5f9;border:1px solid #475569;border-radius:4px;padding:4px;font-size:11px;">
                       <option value="">Equipar...</option>${options}
                     </select>`
                  : ''
              }
              ${eq ? `<button class="hud-btn" data-unequip-slot="${slot}">Remover</button>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    return `
      <div class="squad-layout">
        <div class="squad-sidebar">
          <div class="card-meta">Esquadrão em Campo: <strong>${deployedCount}/5 Heróis</strong></div>
          ${heroList}
        </div>
        <div class="card-box">
          <div class="card-row">
            <h3>${job.icon} ${hero.name} — ${job.name} (Nível ${hero.level})</h3>
            <span class="gold-pill">⭐ ${hero.jp} JP</span>
          </div>
          <div class="card-meta">
            HP: <strong>${stats.hp}</strong> • MP: <strong>${stats.mp}</strong> • ATK: <strong>${stats.atk}</strong> • MAG: <strong>${stats.mag}</strong> • DEF: <strong>${stats.def}</strong> • SPD: <strong>${stats.speed}</strong> • MOV: <strong>${stats.move}</strong> • JUMP: <strong>${stats.jump}</strong>
          </div>
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Equipamentos</div>
          ${equipHtml}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Habilidades de Classe</div>
          ${skillsHtml}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Melhorias Passivas Permanentes</div>
          ${passivesHtml}
        </div>
      </div>
    `;
  }

  private bindSquadEvents(): void {
    this.bodyEl.querySelectorAll<HTMLElement>('[data-select-hero]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        this.selectedHeroUid = el.dataset.selectHero ?? null;
        this.render();
      });
    });

    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-toggle-deploy]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const res = this.campaign.toggleDeployHero(btn.dataset.toggleDeploy!);
        if (!res.ok && res.reason) this.setToast(res.reason);
        else this.render();
      });
    });

    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-unlock-skill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.selectedHeroUid) return;
        const res = this.campaign.unlockSkillWithJP(this.selectedHeroUid, btn.dataset.unlockSkill!);
        this.setToast(res.ok ? 'Habilidade desbloqueada com sucesso!' : res.reason ?? 'Erro');
      });
    });

    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-unlock-passive]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.selectedHeroUid) return;
        const res = this.campaign.upgradePassiveWithJP(
          this.selectedHeroUid,
          btn.dataset.unlockPassive as PassiveUpgradeId
        );
        this.setToast(res.ok ? 'Passiva aprendida!' : res.reason ?? 'Erro');
      });
    });

    this.bodyEl.querySelectorAll<HTMLSelectElement>('[data-equip-select]').forEach((sel) => {
      sel.addEventListener('change', () => {
        if (!this.selectedHeroUid || !sel.value) return;
        const res = this.campaign.equipItem(this.selectedHeroUid, sel.value);
        this.setToast(res.ok ? 'Equipamento atualizado!' : res.reason ?? 'Erro');
      });
    });

    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-unequip-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.selectedHeroUid) return;
        this.campaign.unequipSlot(this.selectedHeroUid, btn.dataset.unequipSlot as EquipSlot);
        this.render();
      });
    });
  }

  private renderShopTab(): string {
    const data = this.campaign.getData();

    const recruitCards = PLAYABLE_JOB_IDS.map((jid: JobId) => {
      const job = JOBS[jid];
      return `
        <div class="card-box">
          <div class="card-row">
            <strong>${job.icon} ${job.name}</strong>
            <button class="hud-btn hud-btn-gold" data-recruit-job="${jid}" ${data.gold >= 220 ? '' : 'disabled'}>Recrutar (🪙 220)</button>
          </div>
          <div class="card-meta">${job.title} • HP ${job.baseStats.hp} • MOV ${job.baseStats.move} • JUMP ${job.baseStats.jump}</div>
        </div>
      `;
    }).join('');

    const itemCards = EQUIPMENT_CATALOG.map((eq) => {
      const ownedCount = data.inventory.filter((id) => id === eq.id).length;
      const jobsLabel = eq.allowedJobs
        ? eq.allowedJobs.map((j) => JOBS[j].name.split(' ')[0]).join(', ')
        : 'Todas as Classes';
      return `
        <div class="card-box">
          <div class="card-row">
            <strong>${eq.name}</strong>
            <span class="pill-tag">Nv.${eq.tier}</span>
          </div>
          <div class="card-meta">${eq.description}</div>
          <div class="card-meta">Uso: ${jobsLabel} ${ownedCount > 0 ? `• No baú: ${ownedCount}` : ''}</div>
          <div class="card-row">
            <span>Slot: ${eq.slot.toUpperCase()}</span>
            <button class="hud-btn hud-btn-gold" data-buy-eq="${eq.id}" ${data.gold >= eq.price ? '' : 'disabled'}>Comprar (🪙 ${eq.price})</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <h3 style="margin:0 0 8px;font-family:Cinzel,serif;color:#e2b154;">🍺 Taverna Real — Recrutar Heróis das 6 Classes</h3>
      <div class="grid-2" style="margin-bottom:16px;">${recruitCards}</div>
      <h3 style="margin:0 0 8px;font-family:Cinzel,serif;color:#e2b154;">⚒️ Arsenal Real — Armas, Escudos, Armaduras e Acessórios (Nível 1 a 5)</h3>
      <div class="grid-2">${itemCards}</div>
    `;
  }

  private bindShopEvents(): void {
    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-recruit-job]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const res = this.campaign.recruitHero(btn.dataset.recruitJob as JobId);
        if (res.ok && res.hero) {
          this.selectedHeroUid = res.hero.uid;
          this.setToast(`${res.hero.name} (${JOBS[res.hero.jobId].name}) juntou-se ao esquadrão!`);
        } else {
          this.setToast(res.reason ?? 'Erro ao recrutar.');
        }
      });
    });

    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-buy-eq]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const eqId = btn.dataset.buyEq!;
        const res = this.campaign.buyEquipment(eqId);
        const eq = getEquipmentDef(eqId);
        this.setToast(res.ok ? `${eq?.name} adicionado ao inventário!` : res.reason ?? 'Erro.');
      });
    });
  }
}
