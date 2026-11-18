import {
  EQUIPMENT_CATALOG,
  JOBS,
  PASSIVE_UPGRADES,
  getEquipmentDef,
  getSkillDef,
} from '../data/jobs.ts';
import { STAGES } from '../data/stages.ts';
import type {
  CampaignSaveData,
  EquipSlot,
  JobId,
  PassiveUpgradeId,
  RosterHeroSave,
} from '../types/tactics.ts';

export const SAVE_VERSION = 1;
const PRIMARY_KEY = 'crown_of_ashes_save_v1';
const BACKUP_KEY = 'crown_of_ashes_save_v1_bak';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class MemoryStorage implements StorageLike {
  private map = new Map<string, string>();
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
}

function getDefaultStorage(): StorageLike {
  try {
    if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis && globalThis.localStorage) {
      return globalThis.localStorage;
    }
  } catch {
    // Fallback to memory when localStorage is unavailable
  }
  return new MemoryStorage();
}

export function createInitialSaveData(): CampaignSaveData {
  const roster: RosterHeroSave[] = [
    {
      uid: 'hero_ramza',
      name: 'Ramza',
      jobId: 'holy_knight',
      level: 1,
      exp: 0,
      jp: 120,
      unlockedSkills: ['bash_strike', 'judgment_blade'],
      passiveUpgrades: [],
      equipment: {
        weapon: 'wp_iron_blade',
        shield: 'sh_buckler',
        armor: 'ar_leather_coat',
        accessory: null,
      },
      deployed: true,
    },
    {
      uid: 'hero_vivi',
      name: 'Orlan',
      jobId: 'black_mage',
      level: 1,
      exp: 0,
      jp: 120,
      unlockedSkills: ['arcane_bolt', 'firaga', 'blizzaga'],
      passiveUpgrades: [],
      equipment: {
        weapon: 'wp_oak_staff',
        shield: null,
        armor: null,
        accessory: null,
      },
      deployed: true,
    },
    {
      uid: 'hero_kain',
      name: 'Kain',
      jobId: 'dragoon',
      level: 1,
      exp: 0,
      jp: 120,
      unlockedSkills: ['long_thrust', 'sky_dive'],
      passiveUpgrades: [],
      equipment: {
        weapon: 'wp_steel_lance',
        shield: null,
        armor: null,
        accessory: null,
      },
      deployed: true,
    },
    {
      uid: 'hero_agrias',
      name: 'Lyra',
      jobId: 'sniper',
      level: 1,
      exp: 0,
      jp: 120,
      unlockedSkills: ['arc_shot', 'leg_shot'],
      passiveUpgrades: [],
      equipment: {
        weapon: 'wp_hunter_bow',
        shield: null,
        armor: null,
        accessory: null,
      },
      deployed: true,
    },
    {
      uid: 'hero_alma',
      name: 'Alma',
      jobId: 'white_mystic',
      level: 1,
      exp: 0,
      jp: 120,
      unlockedSkills: ['curaga', 'hastega'],
      passiveUpgrades: [],
      equipment: {
        weapon: 'wp_oak_staff',
        shield: null,
        armor: null,
        accessory: null,
      },
      deployed: true,
    },
  ];

  return {
    version: SAVE_VERSION,
    gold: 460,
    unlockedStage: 1,
    completedStages: [],
    inventory: ['ac_battle_boots'],
    roster,
    selectedStageId: 1,
  };
}

export class CampaignManager {
  private storage: StorageLike;
  private data: CampaignSaveData;

  constructor(storage?: StorageLike) {
    this.storage = storage ?? getDefaultStorage();
    this.data = this.load();
  }

  private validate(raw: unknown): raw is CampaignSaveData {
    if (!raw || typeof raw !== 'object') return false;
    const d = raw as Partial<CampaignSaveData>;
    return (
      typeof d.version === 'number' &&
      d.version <= SAVE_VERSION &&
      typeof d.gold === 'number' &&
      typeof d.unlockedStage === 'number' &&
      Array.isArray(d.completedStages) &&
      Array.isArray(d.inventory) &&
      Array.isArray(d.roster) &&
      d.roster.length > 0
    );
  }

  load(): CampaignSaveData {
    for (const key of [PRIMARY_KEY, BACKUP_KEY]) {
      try {
        const text = this.storage.getItem(key);
        if (!text) continue;
        const parsed = JSON.parse(text);
        if (this.validate(parsed)) {
          return parsed;
        }
      } catch {
        // Try backup key if primary was corrupted
      }
    }
    const fresh = createInitialSaveData();
    this.data = fresh;
    this.save();
    return fresh;
  }

  save(): void {
    try {
      const prev = this.storage.getItem(PRIMARY_KEY);
      if (prev) {
        this.storage.setItem(BACKUP_KEY, prev);
      }
      this.storage.setItem(PRIMARY_KEY, JSON.stringify(this.data));
    } catch {
      // Ignore quota errors cleanly
    }
  }

  resetCampaign(): CampaignSaveData {
    this.data = createInitialSaveData();
    this.save();
    return this.data;
  }

  getData(): CampaignSaveData {
    return this.data;
  }

  getHero(uid: string): RosterHeroSave | undefined {
    return this.data.roster.find((h) => h.uid === uid);
  }

  getDeployedHeroes(): RosterHeroSave[] {
    return this.data.roster.filter((h) => h.deployed).slice(0, 5);
  }

  selectStage(stageId: number): boolean {
    if (stageId < 1 || stageId > STAGES.length) return false;
    if (stageId > this.data.unlockedStage) return false;
    this.data.selectedStageId = stageId;
    this.save();
    return true;
  }

  addGold(amount: number): number {
    this.data.gold = Math.max(0, this.data.gold + Math.round(amount));
    this.save();
    return this.data.gold;
  }

  addInventoryItem(equipId: string): void {
    if (getEquipmentDef(equipId)) {
      this.data.inventory.push(equipId);
      this.save();
    }
  }

  buyEquipment(equipId: string): { ok: boolean; reason?: string } {
    const eq = getEquipmentDef(equipId);
    if (!eq) return { ok: false, reason: 'Equipamento inválido.' };
    if (this.data.gold < eq.price) {
      return { ok: false, reason: `Ouro insuficiente (precisa ${eq.price} 🪙).` };
    }
    this.data.gold -= eq.price;
    this.data.inventory.push(eq.id);
    this.save();
    return { ok: true };
  }

  equipItem(heroUid: string, equipId: string): { ok: boolean; reason?: string } {
    const hero = this.getHero(heroUid);
    const eq = getEquipmentDef(equipId);
    if (!hero || !eq) return { ok: false, reason: 'Herói ou item inválido.' };
    if (eq.allowedJobs && !eq.allowedJobs.includes(hero.jobId)) {
      return {
        ok: false,
        reason: `${JOBS[hero.jobId].name} não pode equipar ${eq.name}.`,
      };
    }

    const invIdx = this.data.inventory.indexOf(equipId);
    if (invIdx === -1) return { ok: false, reason: 'Item não está no inventário.' };

    // Remove from inventory and return previously equipped item if any
    this.data.inventory.splice(invIdx, 1);
    const prevId = hero.equipment[eq.slot];
    if (prevId) {
      this.data.inventory.push(prevId);
    }
    hero.equipment[eq.slot] = eq.id;
    this.save();
    return { ok: true };
  }

  unequipSlot(heroUid: string, slot: EquipSlot): boolean {
    const hero = this.getHero(heroUid);
    if (!hero) return false;
    const prevId = hero.equipment[slot];
    if (!prevId) return false;
    hero.equipment[slot] = null;
    this.data.inventory.push(prevId);
    this.save();
    return true;
  }

  recruitHero(jobId: JobId, customName?: string): { ok: boolean; hero?: RosterHeroSave; reason?: string } {
    const recruitCost = 220;
    if (this.data.gold < recruitCost) {
      return { ok: false, reason: `Recrutamento custa ${recruitCost} 🪙 Ouro.` };
    }
    const job = JOBS[jobId];
    const defaultNames: Record<JobId, string[]> = {
      holy_knight: ['Agrias', 'Delita', 'Cid'],
      black_mage: ['Vivi', 'Lulu', 'Alaric'],
      dragoon: ['Freya', 'Aranea', 'Estinien'],
      sniper: ['Mustadio', 'Balthier', 'Viera'],
      white_mystic: ['Ovelia', 'Aeris', 'Celia'],
      ninja: ['Edge', 'Shadow', 'Yuffie'],
    };
    const takenNames = new Set(this.data.roster.map((h) => h.name));
    const chosenName =
      customName ??
      defaultNames[jobId].find((n) => !takenNames.has(n)) ??
      `${job.name.split(' ')[0]} #${this.data.roster.length + 1}`;

    const starterSkills = job.skills.filter((s) => s.jpCost === 0).map((s) => s.id);
    const deployedCount = this.data.roster.filter((h) => h.deployed).length;

    const newHero: RosterHeroSave = {
      uid: `hero_${jobId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: chosenName,
      jobId,
      level: 1,
      exp: 0,
      jp: 90,
      unlockedSkills: starterSkills,
      passiveUpgrades: [],
      equipment: {
        weapon: null,
        shield: null,
        armor: null,
        accessory: null,
      },
      deployed: deployedCount < 5,
    };

    this.data.gold -= recruitCost;
    this.data.roster.push(newHero);
    this.save();
    return { ok: true, hero: newHero };
  }

  toggleDeployHero(heroUid: string): { ok: boolean; reason?: string } {
    const hero = this.getHero(heroUid);
    if (!hero) return { ok: false, reason: 'Herói não encontrado.' };
    const deployedCount = this.data.roster.filter((h) => h.deployed).length;
    if (hero.deployed) {
      if (deployedCount <= 1) {
        return { ok: false, reason: 'Pelo menos 1 herói deve ir para a batalha.' };
      }
      hero.deployed = false;
    } else {
      if (deployedCount >= 5) {
        return { ok: false, reason: 'Limite máximo de 5 heróis em campo.' };
      }
      hero.deployed = true;
    }
    this.save();
    return { ok: true };
  }

  unlockSkillWithJP(heroUid: string, skillId: string): { ok: boolean; reason?: string } {
    const hero = this.getHero(heroUid);
    if (!hero) return { ok: false, reason: 'Herói não encontrado.' };
    if (hero.unlockedSkills.includes(skillId)) {
      return { ok: false, reason: 'Habilidade já desbloqueada.' };
    }
    const skill = getSkillDef(hero.jobId, skillId);
    if (!skill) return { ok: false, reason: 'Habilidade inválida.' };
    if (hero.jp < skill.jpCost) {
      return { ok: false, reason: `JP insuficiente (precisa ${skill.jpCost} ⭐).` };
    }
    hero.jp -= skill.jpCost;
    hero.unlockedSkills.push(skill.id);
    this.save();
    return { ok: true };
  }

  upgradePassiveWithJP(heroUid: string, passiveId: PassiveUpgradeId): { ok: boolean; reason?: string } {
    const hero = this.getHero(heroUid);
    const passive = PASSIVE_UPGRADES[passiveId];
    if (!hero || !passive) return { ok: false, reason: 'Dados inválidos.' };
    if (hero.passiveUpgrades.includes(passiveId)) {
      return { ok: false, reason: 'Melhoria passiva já adquirida.' };
    }
    if (hero.jp < passive.jpCost) {
      return { ok: false, reason: `JP insuficiente (precisa ${passive.jpCost} ⭐).` };
    }
    hero.jp -= passive.jpCost;
    hero.passiveUpgrades.push(passiveId);
    this.save();
    return { ok: true };
  }

  awardActionEXPAndJP(
    heroUid: string | undefined,
    expGain: number,
    jpGain: number
  ): { leveledUp: boolean; newLevel: number } {
    if (!heroUid) return { leveledUp: false, newLevel: 1 };
    const hero = this.getHero(heroUid);
    if (!hero) return { leveledUp: false, newLevel: 1 };

    hero.exp += Math.max(0, Math.round(expGain));
    hero.jp += Math.max(0, Math.round(jpGain));

    let leveledUp = false;
    while (hero.exp >= hero.level * 100 && hero.level < 30) {
      hero.exp -= hero.level * 100;
      hero.level += 1;
      leveledUp = true;
    }
    this.save();
    return { leveledUp, newLevel: hero.level };
  }

  completeStage(
    stageId: number,
    extraGold = 0,
    extraJp = 0
  ): { goldEarned: number; jpEarned: number; unlockedStage: number } {
    const stage = STAGES.find((s) => s.id === stageId) ?? STAGES[0];
    const goldEarned = stage.goldReward + extraGold;
    const jpEarned = stage.jpReward + extraJp;

    this.data.gold += goldEarned;
    if (!this.data.completedStages.includes(stageId)) {
      this.data.completedStages.push(stageId);
    }
    if (stageId >= this.data.unlockedStage && stageId < STAGES.length) {
      this.data.unlockedStage = stageId + 1;
      this.data.selectedStageId = this.data.unlockedStage;
    }

    for (const hero of this.data.roster) {
      if (hero.deployed) {
        this.awardActionEXPAndJP(hero.uid, 85, jpEarned);
      } else {
        hero.jp += Math.round(jpEarned * 0.4);
      }
    }

    this.save();
    return {
      goldEarned,
      jpEarned,
      unlockedStage: this.data.unlockedStage,
    };
  }

  getEquipmentCatalog() {
    return EQUIPMENT_CATALOG;
  }
}
