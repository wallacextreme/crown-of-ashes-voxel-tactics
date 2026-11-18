export type JobId =
  | 'holy_knight'
  | 'black_mage'
  | 'dragoon'
  | 'sniper'
  | 'white_mystic'
  | 'ninja';

export type ArchetypeId =
  | JobId
  | 'dark_knight_boss'
  | 'dragoon_boss'
  | 'archmage_boss'
  | 'golem_enemy'
  | 'lich_boss'
  | 'skeleton_enemy'
  | 'belias_boss';

export type Team = 'ally' | 'enemy';

export type Facing = 'N' | 'S' | 'E' | 'W';

export type AttackDirection = 'FRONT' | 'SIDE' | 'BACK';

export type ElementType = 'physical' | 'fire' | 'ice' | 'lightning' | 'holy' | 'dark';

export type StatusEffectId =
  | 'stop'
  | 'slow'
  | 'haste'
  | 'aegis'
  | 'immobilize'
  | 'poison'
  | 'silence';

export type AoeShape = 'single' | 'cross' | 'diamond' | 'line2' | 'cone' | 'square3x3' | 'self';

export type SurfaceType =
  | 'grass'
  | 'stone'
  | 'cobble'
  | 'wood'
  | 'water'
  | 'lava'
  | 'snow'
  | 'ice'
  | 'swamp'
  | 'obsidian'
  | 'carpet'
  | 'metal';

export type PropType = 'tree' | 'pine' | 'pillar' | 'torch' | 'crystal' | 'statue' | 'rock' | 'ruin_wall' | 'banner' | 'brazier';

export interface StatBlock {
  hp: number;
  mp: number;
  atk: number;
  mag: number;
  def: number;
  speed: number;
  move: number;
  jump: number;
  evasion: number;
  shieldBlock: number;
}

export interface SkillDef {
  id: string;
  name: string;
  shortName: string;
  description: string;
  mpCost: number;
  minRange?: number;
  range: number;
  aoeRadius: number;
  aoeShape: AoeShape;
  multiplier: number;
  isBasic?: boolean;
  isMagic?: boolean;
  isHeal?: boolean;
  isRevive?: boolean;
  isBuff?: boolean;
  isBow?: boolean;
  isShadowStep?: boolean;
  ignoresHeight?: boolean;
  guaranteedCrit?: boolean;
  hits?: number;
  knockback?: number;
  element: ElementType;
  statusEffect?: StatusEffectId;
  statusChance?: number;
  buffType?: 'aegis' | 'haste';
  ctBoost?: number;
  speedMult?: number;
  restoreMpPct?: number;
  healPct?: number;
  igniteTiles?: number;
  bonusWaterMetal?: number;
  bonusUndeadBoss?: number;
  lifestealPct?: number;
  jpCost: number;
  vfxType:
    | 'slash'
    | 'bash'
    | 'judgment_blade'
    | 'hallowed_bolt'
    | 'aegis'
    | 'arcane_bolt'
    | 'firaga'
    | 'blizzaga'
    | 'thundaga'
    | 'mana_font'
    | 'long_thrust'
    | 'sky_dive'
    | 'dragon_breath'
    | 'arc_shot'
    | 'leg_shot'
    | 'arrow_rain'
    | 'curaga'
    | 'hastega'
    | 'holy'
    | 'revive'
    | 'dual_strike'
    | 'shadow_step'
    | 'poison_kunai'
    | 'shadowblade'
    | 'apocalypse_meteor';
}

export interface JobDef {
  id: ArchetypeId;
  name: string;
  title: string;
  color: string;
  accentColor: string;
  icon: string;
  baseStats: StatBlock;
  growthPerLevel: {
    hp: number;
    mp: number;
    atk: number;
    mag: number;
    def: number;
    speed: number;
  };
  skills: SkillDef[];
  passivePool: PassiveUpgradeId[];
}

export type PassiveUpgradeId = 'hp_up' | 'atk_up' | 'mag_up' | 'mp_up' | 'move_up';

export interface PassiveUpgradeDef {
  id: PassiveUpgradeId;
  name: string;
  description: string;
  jpCost: number;
  stat: keyof StatBlock;
  bonus: number;
}

export type EquipSlot = 'weapon' | 'shield' | 'armor' | 'accessory';

export interface EquipmentDef {
  id: string;
  name: string;
  slot: EquipSlot;
  tier: 1 | 2 | 3 | 4 | 5;
  price: number;
  allowedJobs?: JobId[];
  stats: Partial<StatBlock>;
  description: string;
}

export interface HeroEquipmentLoadout {
  weapon: string | null;
  shield: string | null;
  armor: string | null;
  accessory: string | null;
}

export interface RosterHeroSave {
  uid: string;
  name: string;
  jobId: JobId;
  level: number;
  exp: number;
  jp: number;
  unlockedSkills: string[];
  passiveUpgrades: PassiveUpgradeId[];
  equipment: HeroEquipmentLoadout;
  deployed: boolean;
}

export interface StatusInstance {
  id: StatusEffectId;
  turns: number;
}

export interface BattleUnit {
  id: string;
  rosterUid?: string;
  name: string;
  jobId: ArchetypeId;
  team: Team;
  level: number;
  col: number;
  row: number;
  facing: Facing;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  atk: number;
  mag: number;
  def: number;
  speed: number;
  move: number;
  jump: number;
  evasion: number;
  shieldBlock: number;
  ct: number;
  isBoss?: boolean;
  isUndead?: boolean;
  footprint?: 1 | 2;
  bossPhase?: 1 | 2;
  unlockedSkills: string[];
  statuses: StatusInstance[];
  aiRole?: 'aggressive' | 'mage' | 'sniper' | 'support' | 'boss_belias';
  hasMovedThisTurn: boolean;
  hasActedThisTurn: boolean;
  pendingMeteor?: {
    centerCol: number;
    centerRow: number;
    radius: number;
    power: number;
  } | null;
}

export interface GridTile {
  col: number;
  row: number;
  height: number;
  surface: SurfaceType;
  walkable: boolean;
  isStair?: boolean;
  isBridge?: boolean;
  prop?: PropType;
  chest?: {
    id: string;
    gold: number;
    opened: boolean;
    itemId?: string;
  };
  burningTurns?: number;
}

export interface StageEnemySpawn {
  id: string;
  name: string;
  jobId: ArchetypeId;
  level: number;
  col: number;
  row: number;
  facing: Facing;
  isBoss?: boolean;
  isUndead?: boolean;
  footprint?: 1 | 2;
  aiRole: 'aggressive' | 'mage' | 'sniper' | 'support' | 'boss_belias';
  hpScale?: number;
  atkScale?: number;
}

export interface StageDef {
  id: number;
  name: string;
  subtitle: string;
  biome: 'forest' | 'canyon' | 'arctic' | 'swamp' | 'volcanic';
  cols: number;
  rows: number;
  goldReward: number;
  jpReward: number;
  description: string;
  bossTitle: string;
  allySpawns: { col: number; row: number; facing: Facing }[];
  tiles: GridTile[];
  enemies: StageEnemySpawn[];
}

export interface CombatForecast {
  attackerId: string;
  defenderId: string;
  skillId: string;
  predictedDamage: number;
  isHeal: boolean;
  isRevive: boolean;
  isBuff: boolean;
  hitChance: number;
  critChance: number;
  blockChance: number;
  direction: AttackDirection;
  directionLabel: string;
  heightDiff: number;
  heightBonusPct: number;
  heightLabel: string;
  willKnockback: boolean;
  expectedFallDamage: number;
  aoeTargetIds: string[];
  formattedBanner: string;
}

export interface TimelineEntry {
  unitId: string;
  name: string;
  jobId: ArchetypeId;
  team: Team;
  isBoss?: boolean;
  ticksUntilTurn: number;
  turnOrder: number;
}

export interface CampaignSaveData {
  version: number;
  gold: number;
  unlockedStage: number;
  completedStages: number[];
  inventory: string[];
  roster: RosterHeroSave[];
  selectedStageId: number;
}
