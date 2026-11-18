import {
  JOBS,
  PASSIVE_UPGRADES,
  computeEnemyStats,
  computeHeroStats,
  getEquipmentDef,
  getSkillDef,
} from '../data/jobs.ts';
import type {
  AttackDirection,
  BattleUnit,
  CombatForecast,
  Facing,
  GridTile,
  RosterHeroSave,
  SkillDef,
  StageDef,
  StatusEffectId,
  TimelineEntry,
} from '../types/tactics.ts';

export interface MoveNode {
  col: number;
  row: number;
  cost: number;
  path: { col: number; row: number }[];
}

export interface ActionExecutionResult {
  attackerId: string;
  skill: SkillDef;
  targetCol: number;
  targetRow: number;
  aoeTiles: { col: number; row: number }[];
  hits: {
    targetId: string;
    targetName: string;
    damage: number;
    healed: number;
    revived: boolean;
    mpRestored: number;
    lifesteal: number;
    isCrit: boolean;
    isBlocked: boolean;
    isEvaded: boolean;
    direction: AttackDirection;
    heightBonusPct: number;
    knockbackMovedTo?: { col: number; row: number };
    fallDamage: number;
    appliedStatus?: StatusEffectId;
    killed: boolean;
  }[];
  teleportedTo?: { col: number; row: number };
  telegraphedMeteor?: { centerCol: number; centerRow: number; radius: number };
  detonatedMeteor?: {
    centerCol: number;
    centerRow: number;
    hits: { targetId: string; damage: number; killed: boolean }[];
  };
  openedChest?: { id: string; gold: number; itemId?: string };
}

export function tileKey(col: number, row: number): string {
  return `${col},${row}`;
}

export function manhattan(c1: number, r1: number, c2: number, r2: number): number {
  return Math.abs(c1 - c2) + Math.abs(r1 - r2);
}

export function facingVector(facing: Facing): { dc: number; dr: number } {
  switch (facing) {
    case 'N':
      return { dc: 0, dr: -1 };
    case 'S':
      return { dc: 0, dr: 1 };
    case 'E':
      return { dc: 1, dr: 0 };
    case 'W':
      return { dc: -1, dr: 0 };
  }
}

export function vectorToFacing(dc: number, dr: number, fallback: Facing = 'S'): Facing {
  if (dc === 0 && dr === 0) return fallback;
  if (Math.abs(dc) >= Math.abs(dr)) {
    return dc >= 0 ? 'E' : 'W';
  }
  return dr >= 0 ? 'S' : 'N';
}

export function oppositeFacing(facing: Facing): Facing {
  switch (facing) {
    case 'N':
      return 'S';
    case 'S':
      return 'N';
    case 'E':
      return 'W';
    case 'W':
      return 'E';
  }
}

export function getUnitOccupiedTiles(unit: BattleUnit): { col: number; row: number }[] {
  if (unit.footprint === 2) {
    return [
      { col: unit.col, row: unit.row },
      { col: unit.col + 1, row: unit.row },
      { col: unit.col, row: unit.row + 1 },
      { col: unit.col + 1, row: unit.row + 1 },
    ];
  }
  return [{ col: unit.col, row: unit.row }];
}

export function isUnitAtTile(unit: BattleUnit, col: number, row: number): boolean {
  if (unit.hp <= 0) return false;
  return getUnitOccupiedTiles(unit).some((t) => t.col === col && t.row === row);
}

export function hasStatus(unit: BattleUnit, status: StatusEffectId): boolean {
  return unit.statuses.some((s) => s.id === status && s.turns > 0);
}

export function getEffectiveSpeed(unit: BattleUnit): number {
  let spd = unit.speed;
  if (hasStatus(unit, 'haste')) spd *= 1.4;
  if (hasStatus(unit, 'slow')) spd *= 0.65;
  return Math.max(1, Number(spd.toFixed(2)));
}

export function getEffectiveDefense(unit: BattleUnit): number {
  let def = unit.def;
  if (hasStatus(unit, 'aegis')) def *= 1.4;
  return Math.round(def);
}

/**
 * Directional facing rule:
 * FRONT: 1.0x dmg, +0% crit, 1.0x evasion, shield block allowed
 * SIDE:  1.25x dmg (+25%), +5% crit, 0.5x evasion, ignores frontal shield
 * BACK:  1.50x dmg (+50%), +30% crit, 0x evasion, ignores frontal shield
 */
export function getAttackDirection(
  attackerCol: number,
  attackerRow: number,
  defenderCol: number,
  defenderRow: number,
  defenderFacing: Facing
): AttackDirection {
  const dx = attackerCol - defenderCol;
  const dz = attackerRow - defenderRow;
  if (dx === 0 && dz === 0) return 'FRONT';
  const f = facingVector(defenderFacing);
  const dot = dx * f.dc + dz * f.dr;
  const absSide = Math.abs(dx * -f.dr + dz * f.dc);
  if (dot >= absSide) return 'FRONT';
  if (-dot >= absSide) return 'BACK';
  return 'SIDE';
}

export function getDirectionModifiers(dir: AttackDirection): {
  damageMult: number;
  critBonus: number;
  evasionMult: number;
  ignoresShield: boolean;
  label: string;
} {
  switch (dir) {
    case 'BACK':
      return {
        damageMult: 1.5,
        critBonus: 0.3,
        evasionMult: 0,
        ignoresShield: true,
        label: '🗡️ COSTAS (+50%)',
      };
    case 'SIDE':
      return {
        damageMult: 1.25,
        critBonus: 0.05,
        evasionMult: 0.5,
        ignoresShield: true,
        label: '⚔️ FLANCO (+25%)',
      };
    case 'FRONT':
    default:
      return {
        damageMult: 1.0,
        critBonus: 0,
        evasionMult: 1.0,
        ignoresShield: false,
        label: '🛡️ FRONTAL',
      };
  }
}

/**
 * High Ground Bonus: +10% damage per height step advantage, capped at +40%.
 */
export function getElevationBonus(attackerHeight: number, defenderHeight: number): number {
  if (attackerHeight <= defenderHeight) return 0;
  return Math.min(0.4, (attackerHeight - defenderHeight) * 0.1);
}

/**
 * Effective skill range (Bows gain +1 tile per 2 steps of height advantage).
 */
export function getEffectiveSkillRange(
  skill: SkillDef,
  attackerHeight: number,
  targetHeight: number
): number {
  let range = skill.range;
  if (skill.isBow && attackerHeight > targetHeight) {
    range += Math.floor((attackerHeight - targetHeight) / 2);
  }
  return range;
}

/**
 * CTB Tick and Next Active Unit Selection
 */
export function tickCTB(units: BattleUnit[]): BattleUnit | null {
  const living = units.filter((u) => u.hp > 0);
  if (living.length === 0) return null;

  const sortReady = (ready: BattleUnit[]) =>
    ready.sort((a, b) => {
      if (b.ct !== a.ct) return b.ct - a.ct;
      const spdDiff = getEffectiveSpeed(b) - getEffectiveSpeed(a);
      if (spdDiff !== 0) return spdDiff;
      if (a.team !== b.team) return a.team === 'ally' ? -1 : 1;
      return a.id.localeCompare(b.id);
    });

  const alreadyReady = living.filter((u) => u.ct >= 100 && !hasStatus(u, 'stop'));
  if (alreadyReady.length > 0) {
    sortReady(alreadyReady);
    return alreadyReady[0];
  }

  for (let safety = 0; safety < 500; safety++) {
    for (const u of living) {
      if (!hasStatus(u, 'stop')) {
        u.ct += getEffectiveSpeed(u);
      } else {
        // Stopped units still thaw gradually via status counter on global ticks
        u.ct += 0;
      }
    }
    const ready = living.filter((u) => u.ct >= 100 && !hasStatus(u, 'stop'));
    if (ready.length > 0) {
      sortReady(ready);
      return ready[0];
    }
    // Safety thaw if all living units are stopped
    if (living.every((u) => hasStatus(u, 'stop'))) {
      for (const u of living) {
        u.statuses = u.statuses.filter((s) => s.id !== 'stop');
      }
    }
  }
  return living[0];
}

export function resolveEndTurnCT(
  unit: BattleUnit,
  hasMoved: boolean,
  hasActed: boolean
): number {
  if (!hasMoved && !hasActed) {
    unit.ct = 40;
  } else if (hasMoved !== hasActed) {
    unit.ct = 20;
  } else {
    unit.ct = 0;
  }
  return unit.ct;
}

export interface TimelinePreviewModifier {
  targetUnitIds: string[];
  ctDelta?: number;
  speedMult?: number;
  assumeDefeatedIds?: string[];
  activeUnitEndCt?: number;
  activeUnitId?: string;
}

export function predictCTBTimeline(
  units: BattleUnit[],
  turnsCount = 10,
  previewMod?: TimelinePreviewModifier
): TimelineEntry[] {
  const sim = units
    .filter((u) => u.hp > 0 && !(previewMod?.assumeDefeatedIds?.includes(u.id)))
    .map((u) => {
      let ct = u.ct;
      let speed = getEffectiveSpeed(u);
      if (previewMod?.activeUnitId === u.id && previewMod.activeUnitEndCt !== undefined) {
        ct = previewMod.activeUnitEndCt;
      }
      if (previewMod?.targetUnitIds.includes(u.id)) {
        if (previewMod.ctDelta) ct += previewMod.ctDelta;
        if (previewMod.speedMult) speed = Math.max(1, speed * previewMod.speedMult);
      }
      return {
        unitId: u.id,
        name: u.name,
        jobId: u.jobId,
        team: u.team,
        isBoss: u.isBoss,
        ct,
        speed,
        stopped: hasStatus(u, 'stop'),
      };
    });

  if (sim.length === 0) return [];
  const timeline: TimelineEntry[] = [];
  let ticks = 0;

  while (timeline.length < turnsCount && ticks < 400) {
    const ready = sim.filter((s) => s.ct >= 100 && !s.stopped);
    if (ready.length > 0) {
      ready.sort((a, b) => {
        if (b.ct !== a.ct) return b.ct - a.ct;
        if (b.speed !== a.speed) return b.speed - a.speed;
        if (a.team !== b.team) return a.team === 'ally' ? -1 : 1;
        return a.unitId.localeCompare(b.unitId);
      });
      const chosen = ready[0];
      timeline.push({
        unitId: chosen.unitId,
        name: chosen.name,
        jobId: chosen.jobId,
        team: chosen.team,
        isBoss: chosen.isBoss,
        ticksUntilTurn: ticks,
        turnOrder: timeline.length + 1,
      });
      chosen.ct -= 100;
      continue;
    }

    ticks++;
    for (const s of sim) {
      if (!s.stopped) {
        s.ct += s.speed;
      }
    }
    if (sim.every((s) => s.stopped)) break;
  }

  return timeline;
}

/**
 * BFS Movement Range respecting Move, Jump height delta, surface movement costs, and occupied cells.
 */
export function computeMoveRangeBFS(
  tiles: Map<string, GridTile>,
  cols: number,
  rows: number,
  mover: BattleUnit,
  allUnits: BattleUnit[]
): Map<string, MoveNode> {
  const result = new Map<string, MoveNode>();
  if (hasStatus(mover, 'immobilize')) {
    result.set(tileKey(mover.col, mover.row), {
      col: mover.col,
      row: mover.row,
      cost: 0,
      path: [{ col: mover.col, row: mover.row }],
    });
    return result;
  }

  const footprint = mover.footprint ?? 1;
  const maxMove = mover.move;
  const maxJump = mover.jump;

  const canStandAt = (c: number, r: number): boolean => {
    for (let dc = 0; dc < footprint; dc++) {
      for (let dr = 0; dr < footprint; dr++) {
        const cc = c + dc;
        const rr = r + dr;
        if (cc < 0 || cc >= cols || rr < 0 || rr >= rows) return false;
        const t = tiles.get(tileKey(cc, rr));
        if (!t || !t.walkable) return false;
        const occupant = allUnits.find((u) => u.id !== mover.id && u.hp > 0 && isUnitAtTile(u, cc, rr));
        if (occupant && occupant.team !== mover.team) return false;
      }
    }
    return true;
  };

  const canStopAt = (c: number, r: number): boolean => {
    for (let dc = 0; dc < footprint; dc++) {
      for (let dr = 0; dr < footprint; dr++) {
        const occupant = allUnits.find(
          (u) => u.id !== mover.id && u.hp > 0 && isUnitAtTile(u, c + dc, r + dr)
        );
        if (occupant) return false;
      }
    }
    return true;
  };

  const bestCost = new Map<string, number>();
  const queue: MoveNode[] = [
    {
      col: mover.col,
      row: mover.row,
      cost: 0,
      path: [{ col: mover.col, row: mover.row }],
    },
  ];
  bestCost.set(tileKey(mover.col, mover.row), 0);
  result.set(tileKey(mover.col, mover.row), queue[0]);

  const dirs = [
    { dc: 0, dr: -1 },
    { dc: 0, dr: 1 },
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
  ];

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const curr = queue.shift()!;
    const currTile = tiles.get(tileKey(curr.col, curr.row));
    if (!currTile) continue;

    for (const d of dirs) {
      const nc = curr.col + d.dc;
      const nr = curr.row + d.dr;
      if (!canStandAt(nc, nr)) continue;

      const nextTile = tiles.get(tileKey(nc, nr));
      if (!nextTile) continue;

      const heightDelta = Math.abs(nextTile.height - currTile.height);
      if (heightDelta > maxJump) continue;

      const stepCost = nextTile.surface === 'swamp' ? 2 : 1;
      const nextCost = curr.cost + stepCost;
      if (nextCost > maxMove) continue;

      const key = tileKey(nc, nr);
      const prevBest = bestCost.get(key);
      if (prevBest === undefined || nextCost < prevBest) {
        bestCost.set(key, nextCost);
        const node: MoveNode = {
          col: nc,
          row: nr,
          cost: nextCost,
          path: [...curr.path, { col: nc, row: nr }],
        };
        queue.push(node);
        if (canStopAt(nc, nr)) {
          result.set(key, node);
        }
      }
    }
  }

  return result;
}

export class TacticalCombatEngine {
  stage: StageDef;
  tiles: Map<string, GridTile>;
  units: BattleUnit[];
  activeUnitId: string | null = null;
  turnCount = 0;
  combatEnded: 'victory' | 'defeat' | null = null;
  rng: () => number;

  constructor(
    stage: StageDef,
    deployedHeroes: RosterHeroSave[],
    rng: () => number = Math.random
  ) {
    this.stage = stage;
    this.rng = rng;
    this.tiles = new Map<string, GridTile>();
    for (const t of stage.tiles) {
      this.tiles.set(tileKey(t.col, t.row), {
        ...t,
        chest: t.chest ? { ...t.chest } : undefined,
        burningTurns: 0,
      });
    }

    this.units = [];

    // Spawn player squad (up to 5 heroes)
    const activeRoster = deployedHeroes.filter((h) => h.deployed).slice(0, 5);
    const chosenHeroes = activeRoster.length > 0 ? activeRoster : deployedHeroes.slice(0, 5);
    chosenHeroes.forEach((hero, idx) => {
      const spawn = stage.allySpawns[idx % stage.allySpawns.length];
      const stats = computeHeroStats(hero);
      this.units.push({
        id: `ally_${hero.uid}`,
        rosterUid: hero.uid,
        name: hero.name,
        jobId: hero.jobId,
        team: 'ally',
        level: hero.level,
        col: spawn.col,
        row: spawn.row,
        facing: spawn.facing,
        hp: stats.hp,
        maxHp: stats.hp,
        mp: stats.mp,
        maxMp: stats.mp,
        atk: stats.atk,
        mag: stats.mag,
        def: stats.def,
        speed: stats.speed,
        move: stats.move,
        jump: stats.jump,
        evasion: stats.evasion,
        shieldBlock: stats.shieldBlock,
        ct: 20 + stats.speed * 2,
        footprint: 1,
        unlockedSkills: [...hero.unlockedSkills],
        statuses: [],
        hasMovedThisTurn: false,
        hasActedThisTurn: false,
      });
    });

    // Spawn enemies
    for (const sp of stage.enemies) {
      const stats = computeEnemyStats(sp.jobId, sp.level, sp.hpScale ?? 1, sp.atkScale ?? 1);
      const job = JOBS[sp.jobId];
      this.units.push({
        id: sp.id,
        name: sp.name,
        jobId: sp.jobId,
        team: 'enemy',
        level: sp.level,
        col: sp.col,
        row: sp.row,
        facing: sp.facing,
        hp: stats.hp,
        maxHp: stats.hp,
        mp: stats.mp,
        maxMp: stats.mp,
        atk: stats.atk,
        mag: stats.mag,
        def: stats.def,
        speed: stats.speed,
        move: stats.move,
        jump: stats.jump,
        evasion: stats.evasion,
        shieldBlock: stats.shieldBlock,
        ct: 10 + stats.speed * 2,
        isBoss: sp.isBoss,
        isUndead: sp.isUndead,
        footprint: sp.footprint ?? 1,
        bossPhase: sp.isBoss ? 1 : undefined,
        unlockedSkills: job.skills.map((s) => s.id),
        statuses: [],
        aiRole: sp.aiRole,
        hasMovedThisTurn: false,
        hasActedThisTurn: false,
        pendingMeteor: null,
      });
    }
  }

  getTile(col: number, row: number): GridTile | undefined {
    return this.tiles.get(tileKey(col, row));
  }

  getUnit(id: string | null | undefined): BattleUnit | undefined {
    if (!id) return undefined;
    return this.units.find((u) => u.id === id);
  }

  getUnitAt(col: number, row: number, includeDead = false): BattleUnit | undefined {
    return this.units.find((u) => {
      if (!includeDead && u.hp <= 0) return false;
      return getUnitOccupiedTiles(u).some((t) => t.col === col && t.row === row);
    });
  }

  getActiveUnit(): BattleUnit | undefined {
    return this.getUnit(this.activeUnitId);
  }

  startNextTurn(): {
    activeUnit: BattleUnit | null;
    burnDamageEvents: { unitId: string; damage: number; killed: boolean }[];
    poisonDamageEvents: { unitId: string; damage: number; killed: boolean }[];
    detonatedMeteor?: ActionExecutionResult['detonatedMeteor'];
  } {
    this.checkBattleEnd();
    if (this.combatEnded) {
      this.activeUnitId = null;
      return { activeUnit: null, burnDamageEvents: [], poisonDamageEvents: [] };
    }

    const next = tickCTB(this.units);
    if (!next) {
      this.activeUnitId = null;
      return { activeUnit: null, burnDamageEvents: [], poisonDamageEvents: [] };
    }

    this.activeUnitId = next.id;
    next.hasMovedThisTurn = false;
    next.hasActedThisTurn = false;
    this.turnCount++;

    // Regenerate small MP on turn start for casters/fighters
    next.mp = Math.min(next.maxMp, next.mp + 4);

    // Tick down statuses
    const poisonDamageEvents: { unitId: string; damage: number; killed: boolean }[] = [];
    const burnDamageEvents: { unitId: string; damage: number; killed: boolean }[] = [];

    if (hasStatus(next, 'poison')) {
      const dmg = Math.max(10, Math.round(next.maxHp * 0.08));
      next.hp = Math.max(0, next.hp - dmg);
      poisonDamageEvents.push({ unitId: next.id, damage: dmg, killed: next.hp <= 0 });
    }

    const standingTile = this.getTile(next.col, next.row);
    if (standingTile && (standingTile.burningTurns ?? 0) > 0 && next.hp > 0) {
      const burnDmg = Math.max(12, Math.round(next.maxHp * 0.07));
      next.hp = Math.max(0, next.hp - burnDmg);
      standingTile.burningTurns = Math.max(0, (standingTile.burningTurns ?? 1) - 1);
      burnDamageEvents.push({ unitId: next.id, damage: burnDmg, killed: next.hp <= 0 });
    }

    for (const st of next.statuses) {
      st.turns -= 1;
    }
    next.statuses = next.statuses.filter((s) => s.turns > 0);

    // Detonate Belias's telegraphed Apocalypse Meteor if it's Belias's turn!
    let detonatedMeteor: ActionExecutionResult['detonatedMeteor'];
    if (next.hp > 0 && next.pendingMeteor) {
      const m = next.pendingMeteor;
      next.pendingMeteor = null;
      const hits: { targetId: string; damage: number; killed: boolean }[] = [];
      const zone = this.getAoeTiles(m.centerCol, m.centerRow, {
        ...JOBS.belias_boss.skills[2],
      });
      for (const z of zone) {
        const tile = this.getTile(z.col, z.row);
        if (tile) tile.burningTurns = 2;
        const target = this.getUnitAt(z.col, z.row);
        if (target && target.team === 'ally' && target.hp > 0) {
          const dmg = Math.max(25, Math.round(m.power * (100 / (100 + getEffectiveDefense(target)))));
          target.hp = Math.max(0, target.hp - dmg);
          hits.push({ targetId: target.id, damage: dmg, killed: target.hp <= 0 });
        }
      }
      detonatedMeteor = { centerCol: m.centerCol, centerRow: m.centerRow, hits };
    }

    // If the active unit died from DoT, immediately advance again
    if (next.hp <= 0) {
      this.checkBattleEnd();
      if (!this.combatEnded) {
        return this.startNextTurn();
      }
      this.activeUnitId = null;
      return { activeUnit: null, burnDamageEvents, poisonDamageEvents, detonatedMeteor };
    }

    this.checkBattleEnd();
    return { activeUnit: next, burnDamageEvents, poisonDamageEvents, detonatedMeteor };
  }

  endTurn(facing: Facing): number {
    const active = this.getActiveUnit();
    if (!active) return 0;
    active.facing = facing;
    const newCt = resolveEndTurnCT(active, active.hasMovedThisTurn, active.hasActedThisTurn);
    this.activeUnitId = null;
    this.checkBattleEnd();
    return newCt;
  }

  getMoveRange(unit: BattleUnit): Map<string, MoveNode> {
    return computeMoveRangeBFS(this.tiles, this.stage.cols, this.stage.rows, unit, this.units);
  }

  moveUnit(unit: BattleUnit, destCol: number, destRow: number): {
    moved: boolean;
    openedChest?: { id: string; gold: number; itemId?: string };
  } {
    const range = this.getMoveRange(unit);
    const node = range.get(tileKey(destCol, destRow));
    if (!node) return { moved: false };
    if (destCol !== unit.col || destRow !== unit.row) {
      unit.facing = vectorToFacing(destCol - unit.col, destRow - unit.row, unit.facing);
    }
    unit.col = destCol;
    unit.row = destRow;
    unit.hasMovedThisTurn = true;

    let openedChest: { id: string; gold: number; itemId?: string } | undefined;
    if (unit.team === 'ally') {
      const tile = this.getTile(destCol, destRow);
      if (tile?.chest && !tile.chest.opened) {
        tile.chest.opened = true;
        openedChest = {
          id: tile.chest.id,
          gold: tile.chest.gold,
          itemId: tile.chest.itemId,
        };
      }
    }
    return { moved: true, openedChest };
  }

  getAvailableSkills(unit: BattleUnit): SkillDef[] {
    const job = JOBS[unit.jobId];
    const silenced = hasStatus(unit, 'silence');
    return job.skills.filter((s) => {
      if (!unit.unlockedSkills.includes(s.id) && !s.isBasic) return false;
      if (silenced && s.isMagic) return false;
      return true;
    });
  }

  getSkillTargetableTiles(unit: BattleUnit, skill: SkillDef): { col: number; row: number }[] {
    if (skill.aoeShape === 'self') {
      return [{ col: unit.col, row: unit.row }];
    }
    const unitTile = this.getTile(unit.col, unit.row);
    const attackerHeight = unitTile?.height ?? 1;
    const minRange = skill.minRange ?? 1;
    const result: { col: number; row: number }[] = [];

    for (let row = 0; row < this.stage.rows; row++) {
      for (let col = 0; col < this.stage.cols; col++) {
        const t = this.getTile(col, row);
        if (!t) continue;
        // For line2 or cone, require cardinal alignment
        if (skill.aoeShape === 'line2') {
          const dc = Math.abs(col - unit.col);
          const dr = Math.abs(row - unit.row);
          if (!((dc === 0 && dr >= 1 && dr <= 2) || (dr === 0 && dc >= 1 && dc <= 2))) continue;
          result.push({ col, row });
          continue;
        }
        if (skill.aoeShape === 'cone') {
          const dist = manhattan(unit.col, unit.row, col, row);
          if (dist === 1) result.push({ col, row });
          continue;
        }
        const dist = manhattan(unit.col, unit.row, col, row);
        const maxRange = getEffectiveSkillRange(skill, attackerHeight, t.height);
        if (dist >= minRange && dist <= maxRange) {
          // Height difference restriction for melee (non-magic, non-bow, non-sky-dive)
          if (
            !skill.isMagic &&
            !skill.isBow &&
            !skill.ignoresHeight &&
            !skill.isShadowStep &&
            !skill.isHeal &&
            !skill.isRevive &&
            !skill.isBuff &&
            Math.abs(t.height - attackerHeight) > Math.max(2, unit.jump)
          ) {
            continue;
          }
          result.push({ col, row });
        }
      }
    }
    return result;
  }

  getAoeTiles(
    centerCol: number,
    centerRow: number,
    skill: SkillDef,
    casterCol?: number,
    casterRow?: number
  ): { col: number; row: number }[] {
    const out: { col: number; row: number }[] = [];
    const addIfValid = (c: number, r: number) => {
      if (c >= 0 && c < this.stage.cols && r >= 0 && r < this.stage.rows) {
        out.push({ col: c, row: r });
      }
    };

    if (skill.aoeShape === 'single' || skill.aoeShape === 'self') {
      addIfValid(centerCol, centerRow);
    } else if (skill.aoeShape === 'line2') {
      addIfValid(centerCol, centerRow);
      if (casterCol !== undefined && casterRow !== undefined) {
        const dc = Math.sign(centerCol - casterCol);
        const dr = Math.sign(centerRow - casterRow);
        if (manhattan(casterCol, casterRow, centerCol, centerRow) === 1) {
          addIfValid(centerCol + dc, centerRow + dr);
        }
      }
    } else if (skill.aoeShape === 'cross') {
      addIfValid(centerCol, centerRow);
      for (let i = 1; i <= skill.aoeRadius; i++) {
        addIfValid(centerCol + i, centerRow);
        addIfValid(centerCol - i, centerRow);
        addIfValid(centerCol, centerRow + i);
        addIfValid(centerCol, centerRow - i);
      }
    } else if (skill.aoeShape === 'diamond') {
      for (let dc = -skill.aoeRadius; dc <= skill.aoeRadius; dc++) {
        for (let dr = -skill.aoeRadius; dr <= skill.aoeRadius; dr++) {
          if (Math.abs(dc) + Math.abs(dr) <= skill.aoeRadius) {
            addIfValid(centerCol + dc, centerRow + dr);
          }
        }
      }
    } else if (skill.aoeShape === 'square3x3') {
      for (let dc = -1; dc <= 1; dc++) {
        for (let dr = -1; dr <= 1; dr++) {
          addIfValid(centerCol + dc, centerRow + dr);
        }
      }
    } else if (skill.aoeShape === 'cone') {
      addIfValid(centerCol, centerRow);
      if (casterCol !== undefined && casterRow !== undefined) {
        const dc = Math.sign(centerCol - casterCol);
        const dr = Math.sign(centerRow - casterRow);
        if (dc !== 0) {
          addIfValid(centerCol + dc, centerRow);
          addIfValid(centerCol + dc, centerRow - 1);
          addIfValid(centerCol + dc, centerRow + 1);
        } else if (dr !== 0) {
          addIfValid(centerCol, centerRow + dr);
          addIfValid(centerCol - 1, centerRow + dr);
          addIfValid(centerCol + 1, centerRow + dr);
        }
      }
    }
    return out;
  }

  /**
   * Computes Knockback destination and Fall Damage (>2 steps drop) without mutating state unless apply=true.
   */
  evaluateKnockback(
    attackerCol: number,
    attackerRow: number,
    defender: BattleUnit
  ): { destCol: number; destRow: number; fallDamage: number } | null {
    if ((defender.footprint ?? 1) > 1) return null; // Colossal boss Belias cannot be knocked off tiles
    const dc = defender.col - attackerCol;
    const dr = defender.row - attackerRow;
    let stepC = 0;
    let stepR = 0;
    if (Math.abs(dc) >= Math.abs(dr)) {
      stepC = dc >= 0 ? 1 : -1;
    } else {
      stepR = dr >= 0 ? 1 : -1;
    }
    const nc = defender.col + stepC;
    const nr = defender.row + stepR;
    const curTile = this.getTile(defender.col, defender.row);
    const destTile = this.getTile(nc, nr);
    if (!curTile || !destTile || !destTile.walkable) return null;
    if (destTile.height > curTile.height) return null;
    if (this.getUnitAt(nc, nr)) return null;

    const drop = curTile.height - destTile.height;
    const fallDamage =
      drop > 2 ? Math.max(15 * drop, Math.round(defender.maxHp * 0.12 * drop)) : 0;
    return { destCol: nc, destRow: nr, fallDamage };
  }

  /**
   * Find best destination behind target for Ninja's Shadow Step.
   */
  findShadowStepTile(target: BattleUnit, mover: BattleUnit): { col: number; row: number } | null {
    const f = facingVector(target.facing);
    const backCol = target.col - f.dc;
    const backRow = target.row - f.dr;
    const candidates = [
      { col: backCol, row: backRow },
      { col: target.col + f.dr, row: target.row - f.dc },
      { col: target.col - f.dr, row: target.row + f.dc },
      { col: target.col + f.dc, row: target.row + f.dr },
    ];
    for (const c of candidates) {
      const t = this.getTile(c.col, c.row);
      if (!t || !t.walkable) continue;
      const occ = this.getUnitAt(c.col, c.row);
      if (!occ || occ.id === mover.id) return c;
    }
    return null;
  }

  computeCombatForecast(
    attacker: BattleUnit,
    skill: SkillDef,
    targetCol: number,
    targetRow: number,
    overrideAttackerCol?: number,
    overrideAttackerRow?: number
  ): CombatForecast | null {
    const aCol = overrideAttackerCol ?? attacker.col;
    const aRow = overrideAttackerRow ?? attacker.row;
    const aoeTiles = this.getAoeTiles(targetCol, targetRow, skill, aCol, aRow);
    const affectedUnits = new Map<string, BattleUnit>();

    for (const cell of aoeTiles) {
      const u = this.getUnitAt(cell.col, cell.row, Boolean(skill.isRevive));
      if (!u) continue;
      if (skill.isHeal || skill.isBuff) {
        if (u.team === attacker.team && u.hp > 0) affectedUnits.set(u.id, u);
      } else if (skill.isRevive) {
        if (u.team === attacker.team && u.hp <= 0) affectedUnits.set(u.id, u);
      } else {
        if (u.team !== attacker.team && u.hp > 0) affectedUnits.set(u.id, u);
      }
    }

    const primaryTarget =
      this.getUnitAt(targetCol, targetRow, Boolean(skill.isRevive)) ??
      Array.from(affectedUnits.values())[0];

    if (!primaryTarget) return null;

    const aTile = this.getTile(aCol, aRow);
    const dTile = this.getTile(primaryTarget.col, primaryTarget.row);
    const aHeight = aTile?.height ?? 1;
    const dHeight = dTile?.height ?? 1;

    if (skill.isHeal || skill.isRevive || skill.isBuff) {
      const predictedHeal = skill.isRevive
        ? Math.round(primaryTarget.maxHp * (skill.healPct ?? 0.5))
        : skill.isHeal
          ? Math.round(attacker.mag * skill.multiplier * 1.65)
          : skill.restoreMpPct
            ? Math.round(attacker.maxMp * skill.restoreMpPct)
            : 0;
      const label = skill.isRevive
        ? 'RESSUSCITAR'
        : skill.isHeal
          ? `CURA PREVISTA: +${predictedHeal} HP`
          : skill.restoreMpPct
            ? `MP +${predictedHeal}`
            : `BUFF: ${skill.shortName.toUpperCase()}`;

      return {
        attackerId: attacker.id,
        defenderId: primaryTarget.id,
        skillId: skill.id,
        predictedDamage: predictedHeal,
        isHeal: Boolean(skill.isHeal),
        isRevive: Boolean(skill.isRevive),
        isBuff: Boolean(skill.isBuff),
        hitChance: 100,
        critChance: 0,
        blockChance: 0,
        direction: 'FRONT',
        directionLabel: '✨ ALIADO',
        heightDiff: aHeight - dHeight,
        heightBonusPct: 0,
        heightLabel: `⛰️ ALT ${aHeight}→${dHeight}`,
        willKnockback: false,
        expectedFallDamage: 0,
        aoeTargetIds: Array.from(affectedUnits.keys()),
        formattedBanner: `[${label} • CHANCE: 100%]`,
      };
    }

    // Offensive forecast
    let effectiveACol = aCol;
    let effectiveARow = aRow;
    let direction: AttackDirection = getAttackDirection(
      effectiveACol,
      effectiveARow,
      primaryTarget.col,
      primaryTarget.row,
      primaryTarget.facing
    );
    if (skill.isShadowStep) {
      direction = 'BACK';
    }
    const dirMod = getDirectionModifiers(direction);
    const heightBonus = skill.ignoresHeight ? 0 : getElevationBonus(aHeight, dHeight);
    const heightBonusPct = Math.round(heightBonus * 100);

    // Ratio defense formula: dmg * 100 / (100 + def)
    const rawStat = skill.isMagic ? attacker.mag : attacker.atk;
    const defStat = skill.isMagic ? Math.round(getEffectiveDefense(primaryTarget) * 0.7) : getEffectiveDefense(primaryTarget);
    let baseDmg = rawStat * skill.multiplier * (100 / (100 + defStat));

    // Directional and elevation modifiers (only physical/non-magic gets facing multiplier, or magic gets partial/full? Prompt specifies Backstab +50% and High Ground +10%/step; apply cleanly to attacks, with spells benefiting from elevation too!)
    const facingFactor = skill.isMagic ? 1 + (dirMod.damageMult - 1) * 0.5 : dirMod.damageMult;
    baseDmg *= facingFactor * (1 + heightBonus);

    // Elemental terrain / undead bonuses
    if (
      skill.bonusWaterMetal &&
      dTile &&
      (dTile.surface === 'water' ||
        dTile.surface === 'swamp' ||
        dTile.surface === 'ice' ||
        dTile.surface === 'metal')
    ) {
      baseDmg *= 1 + skill.bonusWaterMetal;
    }
    if (skill.bonusUndeadBoss && (primaryTarget.isUndead || primaryTarget.isBoss)) {
      baseDmg *= 1 + skill.bonusUndeadBoss;
    }

    const predictedDamage = Math.max(8, Math.round(baseDmg));

    const effectiveEvasion = skill.isMagic || skill.isShadowStep ? 0 : primaryTarget.evasion * dirMod.evasionMult;
    const hitChance = Math.round(Math.max(55, Math.min(100, (1 - effectiveEvasion) * 100)));

    const baseCrit = 0.05 + (attacker.jobId === 'ninja' || attacker.jobId === 'sniper' ? 0.08 : 0);
    const critChance = skill.guaranteedCrit
      ? 100
      : Math.round(Math.min(100, (baseCrit + dirMod.critBonus) * 100));

    const blockChance =
      skill.isMagic || dirMod.ignoresShield || skill.isShadowStep
        ? 0
        : Math.round(primaryTarget.shieldBlock * 100);

    let expectedFallDamage = 0;
    const willKnockback = Boolean(skill.knockback);
    if (willKnockback) {
      const kb = this.evaluateKnockback(effectiveACol, effectiveARow, primaryTarget);
      if (kb) expectedFallDamage = kb.fallDamage;
    }

    const heightPart =
      heightBonusPct > 0 ? ` • ⛰️ ALTURA (+${heightBonusPct}%)` : ` • ⛰️ H:${aHeight}→${dHeight}`;
    const fallPart = expectedFallDamage > 0 ? ` • 💥 QUEDA (+${expectedFallDamage})` : '';
    const formattedBanner = `[DANO PREVISTO: ${predictedDamage} • CHANCE: ${hitChance}% • CRÍTICO: ${critChance}% • ${dirMod.label}${heightPart}${fallPart}]`;

    return {
      attackerId: attacker.id,
      defenderId: primaryTarget.id,
      skillId: skill.id,
      predictedDamage,
      isHeal: false,
      isRevive: false,
      isBuff: false,
      hitChance,
      critChance,
      blockChance,
      direction,
      directionLabel: dirMod.label,
      heightDiff: aHeight - dHeight,
      heightBonusPct,
      heightLabel: heightBonusPct > 0 ? `⛰️ ALTURA (+${heightBonusPct}%)` : `⛰️ ALT ${aHeight}→${dHeight}`,
      willKnockback,
      expectedFallDamage,
      aoeTargetIds: Array.from(affectedUnits.keys()),
      formattedBanner,
    };
  }

  executeSkill(
    attacker: BattleUnit,
    skill: SkillDef,
    targetCol: number,
    targetRow: number
  ): ActionExecutionResult {
    attacker.mp = Math.max(0, attacker.mp - skill.mpCost);
    attacker.hasActedThisTurn = true;
    if (targetCol !== attacker.col || targetRow !== attacker.row) {
      attacker.facing = vectorToFacing(targetCol - attacker.col, targetRow - attacker.row, attacker.facing);
    }

    let teleportedTo: { col: number; row: number } | undefined;
    if (skill.isShadowStep) {
      const targetUnit = this.getUnitAt(targetCol, targetRow);
      if (targetUnit) {
        const dest = this.findShadowStepTile(targetUnit, attacker);
        if (dest) {
          attacker.col = dest.col;
          attacker.row = dest.row;
          attacker.facing = vectorToFacing(targetUnit.col - dest.col, targetUnit.row - dest.row, attacker.facing);
          teleportedTo = dest;
        }
      }
    }

    const aoeTiles = this.getAoeTiles(targetCol, targetRow, skill, attacker.col, attacker.row);
    const result: ActionExecutionResult = {
      attackerId: attacker.id,
      skill,
      targetCol,
      targetRow,
      aoeTiles,
      hits: [],
      teleportedTo,
    };

    // Telegraph Belias's Apocalypse Meteor instead of instant damage!
    if (skill.id === 'apocalypse_meteor') {
      attacker.pendingMeteor = {
        centerCol: targetCol,
        centerRow: targetRow,
        radius: skill.aoeRadius,
        power: Math.round(attacker.mag * skill.multiplier),
      };
      result.telegraphedMeteor = {
        centerCol: targetCol,
        centerRow: targetRow,
        radius: skill.aoeRadius,
      };
      return result;
    }

    // Ignite tiles if skill leaves fire
    if (skill.igniteTiles && skill.igniteTiles > 0) {
      for (const cell of aoeTiles) {
        const t = this.getTile(cell.col, cell.row);
        if (t && t.walkable) {
          t.burningTurns = Math.max(t.burningTurns ?? 0, skill.igniteTiles);
        }
      }
    }

    // Self-buffs like Mana Font or Aegis Stance
    if (skill.aoeShape === 'self') {
      if (skill.restoreMpPct) {
        const mpGain = Math.round(attacker.maxMp * skill.restoreMpPct);
        attacker.mp = Math.min(attacker.maxMp, attacker.mp + mpGain);
        result.hits.push({
          targetId: attacker.id,
          targetName: attacker.name,
          damage: 0,
          healed: 0,
          revived: false,
          mpRestored: mpGain,
          lifesteal: 0,
          isCrit: false,
          isBlocked: false,
          isEvaded: false,
          direction: 'FRONT',
          heightBonusPct: 0,
          fallDamage: 0,
          killed: false,
        });
      }
      if (skill.buffType === 'aegis') {
        attacker.statuses.push({ id: 'aegis', turns: 3 });
        result.hits.push({
          targetId: attacker.id,
          targetName: attacker.name,
          damage: 0,
          healed: 0,
          revived: false,
          mpRestored: 0,
          lifesteal: 0,
          isCrit: false,
          isBlocked: false,
          isEvaded: false,
          direction: 'FRONT',
          heightBonusPct: 0,
          fallDamage: 0,
          appliedStatus: 'aegis',
          killed: false,
        });
      }
      return result;
    }

    // Collect distinct target units in AoE
    const targetsMap = new Map<string, BattleUnit>();
    for (const cell of aoeTiles) {
      const u = this.getUnitAt(cell.col, cell.row, Boolean(skill.isRevive));
      if (!u) continue;
      if (skill.isHeal || skill.isBuff) {
        if (u.team === attacker.team && u.hp > 0) targetsMap.set(u.id, u);
      } else if (skill.isRevive) {
        if (u.team === attacker.team && u.hp <= 0) targetsMap.set(u.id, u);
      } else {
        if (u.team !== attacker.team && u.hp > 0) targetsMap.set(u.id, u);
      }
    }

    for (const target of targetsMap.values()) {
      if (skill.isRevive) {
        const healAmt = Math.max(20, Math.round(target.maxHp * (skill.healPct ?? 0.5)));
        target.hp = healAmt;
        target.ct = 30;
        result.hits.push({
          targetId: target.id,
          targetName: target.name,
          damage: 0,
          healed: healAmt,
          revived: true,
          mpRestored: 0,
          lifesteal: 0,
          isCrit: false,
          isBlocked: false,
          isEvaded: false,
          direction: 'FRONT',
          heightBonusPct: 0,
          fallDamage: 0,
          killed: false,
        });
        continue;
      }

      if (skill.isHeal) {
        const healAmt = Math.round(attacker.mag * skill.multiplier * 1.65);
        const before = target.hp;
        target.hp = Math.min(target.maxHp, target.hp + healAmt);
        result.hits.push({
          targetId: target.id,
          targetName: target.name,
          damage: 0,
          healed: target.hp - before,
          revived: false,
          mpRestored: 0,
          lifesteal: 0,
          isCrit: false,
          isBlocked: false,
          isEvaded: false,
          direction: 'FRONT',
          heightBonusPct: 0,
          fallDamage: 0,
          killed: false,
        });
        continue;
      }

      if (skill.isBuff && skill.buffType === 'haste') {
        target.statuses = target.statuses.filter((s) => s.id !== 'slow' && s.id !== 'haste');
        target.statuses.push({ id: 'haste', turns: 3 });
        target.ct = Math.min(100, target.ct + (skill.ctBoost ?? 30));
        result.hits.push({
          targetId: target.id,
          targetName: target.name,
          damage: 0,
          healed: 0,
          revived: false,
          mpRestored: 0,
          lifesteal: 0,
          isCrit: false,
          isBlocked: false,
          isEvaded: false,
          direction: 'FRONT',
          heightBonusPct: 0,
          fallDamage: 0,
          appliedStatus: 'haste',
          killed: false,
        });
        continue;
      }

      // Offensive resolution using exact forecast math + roll
      const fc = this.computeCombatForecast(attacker, skill, target.col, target.row);
      const baseDmg = fc ? fc.predictedDamage : Math.round(attacker.atk * skill.multiplier);
      const hitChance = fc ? fc.hitChance / 100 : 1;
      const critChance = fc ? fc.critChance / 100 : 0.05;
      const blockChance = fc ? fc.blockChance / 100 : 0;
      const dir = fc ? fc.direction : 'FRONT';
      const heightBonusPct = fc ? fc.heightBonusPct : 0;

      // Roll shield block (only on front physical hits)
      const isBlocked = blockChance > 0 && this.rng() < blockChance;
      const isEvaded = !isBlocked && this.rng() > hitChance;

      if (isBlocked || isEvaded) {
        result.hits.push({
          targetId: target.id,
          targetName: target.name,
          damage: 0,
          healed: 0,
          revived: false,
          mpRestored: 0,
          lifesteal: 0,
          isCrit: false,
          isBlocked,
          isEvaded,
          direction: dir,
          heightBonusPct,
          fallDamage: 0,
          killed: false,
        });
        continue;
      }

      const isCrit = skill.guaranteedCrit || this.rng() < critChance;
      const variance = 0.94 + this.rng() * 0.12;
      const critFactor = isCrit ? 1.5 : 1.0;
      const finalDamage = Math.max(10, Math.round(baseDmg * critFactor * variance));
      target.hp = Math.max(0, target.hp - finalDamage);

      // Lifesteal (Shadowblade)
      let lifesteal = 0;
      if (skill.lifestealPct) {
        lifesteal = Math.round(finalDamage * skill.lifestealPct);
        attacker.hp = Math.min(attacker.maxHp, attacker.hp + lifesteal);
      }

      // Status effect
      let appliedStatus: StatusEffectId | undefined;
      if (skill.statusEffect && target.hp > 0) {
        const chance = skill.statusChance ?? 0.6;
        if (this.rng() < chance) {
          target.statuses = target.statuses.filter((s) => s.id !== skill.statusEffect);
          target.statuses.push({ id: skill.statusEffect, turns: 2 });
          appliedStatus = skill.statusEffect;
        }
      }

      // Knockback & Fall Damage
      let knockbackMovedTo: { col: number; row: number } | undefined;
      let fallDamage = 0;
      if (skill.knockback && target.hp > 0) {
        const kb = this.evaluateKnockback(attacker.col, attacker.row, target);
        if (kb) {
          target.col = kb.destCol;
          target.row = kb.destRow;
          knockbackMovedTo = { col: kb.destCol, row: kb.destRow };
          fallDamage = kb.fallDamage;
          if (fallDamage > 0) {
            target.hp = Math.max(0, target.hp - fallDamage);
          }
        }
      }

      // Belias Phase 2 trigger at <= 55% HP
      if (target.jobId === 'belias_boss' && target.bossPhase === 1 && target.hp > 0 && target.hp <= target.maxHp * 0.55) {
        target.bossPhase = 2;
        target.speed += 2;
        target.atk = Math.round(target.atk * 1.15);
        target.mag = Math.round(target.mag * 1.15);
      }

      result.hits.push({
        targetId: target.id,
        targetName: target.name,
        damage: finalDamage,
        healed: 0,
        revived: false,
        mpRestored: 0,
        lifesteal,
        isCrit,
        isBlocked: false,
        isEvaded: false,
        direction: dir,
        heightBonusPct,
        knockbackMovedTo,
        fallDamage,
        appliedStatus,
        killed: target.hp <= 0,
      });
    }

    this.checkBattleEnd();
    return result;
  }

  checkBattleEnd(): 'victory' | 'defeat' | null {
    const alliesAlive = this.units.some((u) => u.team === 'ally' && u.hp > 0);
    const enemiesAlive = this.units.some((u) => u.team === 'enemy' && u.hp > 0);
    if (!enemiesAlive) {
      this.combatEnded = 'victory';
    } else if (!alliesAlive) {
      this.combatEnded = 'defeat';
    } else {
      this.combatEnded = null;
    }
    return this.combatEnded;
  }
}
