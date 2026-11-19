import test from 'node:test';
import assert from 'node:assert/strict';

import {
  JOBS,
  computeHeroStats,
} from '../src/data/jobs.ts';
import { STAGES, getStageDef } from '../src/data/stages.ts';
import {
  CampaignManager,
  MemoryStorage,
} from '../src/systems/CampaignManager.ts';
import {
  TacticalCombatEngine,
  computeMoveRangeBFS,
  getAttackDirection,
  getDirectionModifiers,
  getEffectiveSkillRange,
  getElevationBonus,
  predictCTBTimeline,
  resolveEndTurnCT,
  tickCTB,
  tileKey,
} from '../src/systems/TacticalCombatEngine.ts';
import { TacticalAI } from '../src/systems/TacticalAI.ts';

test('BFS movement respects Move, Jump step limit, swamp cost, and enemy blocking', () => {
  const tiles = new Map();
  // 5x1 strip: (0,0) H:1 -> (1,0) H:2 -> (2,0) H:6 (cliff too high for Jump 3!) -> (3,0) H:2 -> (4,0) H:2
  for (let c = 0; c < 5; c++) {
    tiles.set(tileKey(c, 0), {
      col: c,
      row: 0,
      height: c === 1 ? 2 : c === 2 ? 6 : 1,
      surface: 'stone',
      walkable: true,
    });
  }
  // Also add row 1 with swamp (cost 2) at (0,1) and enemy blocker at (1,1)
  tiles.set(tileKey(0, 1), { col: 0, row: 1, height: 1, surface: 'swamp', walkable: true });
  tiles.set(tileKey(1, 1), { col: 1, row: 1, height: 1, surface: 'stone', walkable: true });
  tiles.set(tileKey(2, 1), { col: 2, row: 1, height: 1, surface: 'stone', walkable: true });

  const mover = {
    id: 'ally_1',
    name: 'Ramza',
    jobId: 'holy_knight',
    team: 'ally',
    level: 1,
    col: 0,
    row: 0,
    facing: 'E',
    hp: 200,
    maxHp: 200,
    mp: 50,
    maxMp: 50,
    atk: 40,
    mag: 30,
    def: 30,
    speed: 10,
    move: 3,
    jump: 2,
    evasion: 0.05,
    shieldBlock: 0.2,
    ct: 100,
    unlockedSkills: ['bash_strike'],
    statuses: [],
    hasMovedThisTurn: false,
    hasActedThisTurn: false,
  };

  const enemyBlocker = {
    ...mover,
    id: 'enemy_1',
    team: 'enemy',
    col: 1,
    row: 1,
  };

  const range = computeMoveRangeBFS(tiles, 5, 2, mover, [mover, enemyBlocker]);

  // Can reach (1,0) height 2 (delta 1 <= jump 2)
  assert.equal(range.has('1,0'), true);
  // Cannot climb to (2,0) height 6 (delta 4 > jump 2)
  assert.equal(range.has('2,0'), false);
  // Can step onto swamp (0,1) with cost 2 <= move 3
  assert.equal(range.get('0,1')?.cost, 2);
  // Cannot enter enemy occupied tile (1,1)
  assert.equal(range.has('1,1'), false);
});

test('Directional facing multipliers (Front 1.0x, Side 1.25x, Back 1.50x + 30% Crit + ignore shield)', () => {
  // Defender at (5,5) facing North ('N')
  const frontDir = getAttackDirection(5, 4, 5, 5, 'N');
  const sideDir = getAttackDirection(6, 5, 5, 5, 'N');
  const backDir = getAttackDirection(5, 6, 5, 5, 'N');

  assert.equal(frontDir, 'FRONT');
  assert.equal(sideDir, 'SIDE');
  assert.equal(backDir, 'BACK');

  const frontMod = getDirectionModifiers(frontDir);
  const sideMod = getDirectionModifiers(sideDir);
  const backMod = getDirectionModifiers(backDir);

  assert.equal(frontMod.damageMult, 1.0);
  assert.equal(frontMod.ignoresShield, false);

  assert.equal(sideMod.damageMult, 1.25);
  assert.equal(sideMod.evasionMult, 0.5);
  assert.equal(sideMod.ignoresShield, true);

  assert.equal(backMod.damageMult, 1.5);
  assert.equal(backMod.critBonus, 0.3);
  assert.equal(backMod.evasionMult, 0);
  assert.equal(backMod.ignoresShield, true);
});

test('High Ground elevation bonus (+10% per step up to +40%), bow range, and Fall Damage on knockback', () => {
  assert.equal(getElevationBonus(5, 5), 0);
  assert.equal(getElevationBonus(6, 4), 0.2);
  assert.equal(getElevationBonus(8, 2), 0.4); // Capped at +40%

  const arcShot = JOBS.sniper.skills[0];
  assert.equal(getEffectiveSkillRange(arcShot, 7, 3), arcShot.range + 2);

  // Test real knockback + fall damage off a cliff (>2 height steps)
  const stage = structuredClone(getStageDef(2));
  const cm = new CampaignManager(new MemoryStorage());
  const engine = new TacticalCombatEngine(stage, cm.getDeployedHeroes(), () => 0.50); // rng=0.50 guarantees hit without random miss/crit

  const attacker = engine.units.find((u) => u.team === 'ally');
  const defender = engine.units.find((u) => u.team === 'enemy');
  assert.ok(attacker && defender);

  // Place attacker at (5,5) height 5 (bridge) and defender at (5,4) height 5 -> wait make (5,3) height 1 walkable for test
  const t55 = engine.getTile(5, 5);
  const t54 = engine.getTile(5, 4);
  const t53 = engine.getTile(5, 3);
  t55.height = 5;
  t55.walkable = true;
  t54.height = 5;
  t54.walkable = true;
  t53.height = 1;
  t53.walkable = true;

  // Move other enemies away from (5,3)
  for (const e of engine.units) {
    if (e.id !== defender.id && e.id !== attacker.id && e.col === 5 && (e.row === 3 || e.row === 4)) {
      e.col = 11;
      e.row = 11;
    }
  }
  attacker.col = 5;
  attacker.row = 5;
  defender.col = 5;
  defender.row = 4;

  const bash = JOBS.holy_knight.skills[0];
  const exec = engine.executeSkill(attacker, bash, 5, 4);
  assert.equal(exec.hits.length, 1);
  assert.deepEqual(exec.hits[0].knockbackMovedTo, { col: 5, row: 3 });
  assert.ok(exec.hits[0].fallDamage >= 60, `Expected fall damage >= 60, got ${exec.hits[0].fallDamage}`);
});

test('CTB turn order based on Speed, timeline prediction, and Wait CT recovery (+40 / +20 / 0)', () => {
  const fastUnit = {
    id: 'fast',
    name: 'Ninja',
    jobId: 'ninja',
    team: 'ally',
    level: 1,
    col: 0,
    row: 0,
    facing: 'N',
    hp: 150,
    maxHp: 150,
    mp: 40,
    maxMp: 40,
    atk: 40,
    mag: 20,
    def: 20,
    speed: 20,
    move: 5,
    jump: 4,
    evasion: 0.2,
    shieldBlock: 0,
    ct: 0,
    unlockedSkills: [],
    statuses: [],
    hasMovedThisTurn: false,
    hasActedThisTurn: false,
  };
  const slowUnit = {
    ...fastUnit,
    id: 'slow',
    name: 'Golem',
    jobId: 'golem_enemy',
    team: 'enemy',
    speed: 8,
    ct: 0,
  };

  const first = tickCTB([fastUnit, slowUnit]);
  assert.equal(first?.id, 'fast');
  assert.ok(fastUnit.ct >= 100);

  // Full Wait (no move, no act) -> +40 CT
  assert.equal(resolveEndTurnCT(fastUnit, false, false), 40);
  // Move only -> +20 CT
  assert.equal(resolveEndTurnCT(fastUnit, true, false), 20);
  // Act only -> +20 CT
  assert.equal(resolveEndTurnCT(fastUnit, false, true), 20);
  // Move + Act -> 0 CT
  assert.equal(resolveEndTurnCT(fastUnit, true, true), 0);

  // Timeline predicts fastUnit acts more frequently than slowUnit
  fastUnit.ct = 0;
  slowUnit.ct = 0;
  const timeline = predictCTBTimeline([fastUnit, slowUnit], 6);
  assert.equal(timeline.length, 6);
  assert.equal(timeline[0].unitId, 'fast');
  const fastTurns = timeline.filter((t) => t.unitId === 'fast').length;
  const slowTurns = timeline.filter((t) => t.unitId === 'slow').length;
  assert.ok(fastTurns > slowTurns);
});

test('CampaignManager persistence: Gold, JP, Equipment equip/unequip without drift, and 5-stage unlocking', () => {
  const storage = new MemoryStorage();
  const cm = new CampaignManager(storage);
  const initialData = cm.getData();
  assert.equal(initialData.gold, 460);
  assert.equal(initialData.unlockedStage, 1);
  assert.equal(STAGES.length, 5);

  // Buy Tier 2 Mithril Sword (280 gold) and equip on Ramza, then unequip and verify exact stats return
  const ramza = cm.getHero('hero_ramza');
  assert.ok(ramza);
  const statsBefore = computeHeroStats(ramza);

  const buyRes = cm.buyEquipment('wp_mithril_sword');
  assert.equal(buyRes.ok, true);
  assert.equal(cm.getData().gold, 180);

  const eqRes = cm.equipItem('hero_ramza', 'wp_mithril_sword');
  assert.equal(eqRes.ok, true);
  const statsWithMithril = computeHeroStats(ramza);
  assert.ok(statsWithMithril.atk > statsBefore.atk);

  // Re-equip original iron blade -> stats must match statsBefore identically!
  const restoreRes = cm.equipItem('hero_ramza', 'wp_iron_blade');
  assert.equal(restoreRes.ok, true);
  const statsRestored = computeHeroStats(ramza);
  assert.deepEqual(statsRestored, statsBefore);

  // Unlock skill with JP
  const unlockRes = cm.unlockSkillWithJP('hero_ramza', 'aegis_stance');
  assert.equal(unlockRes.ok, true);
  assert.ok(ramza.unlockedSkills.includes('aegis_stance'));

  // Complete stages 1..4 and verify stage 5 unlocks & persists across reload
  for (let s = 1; s <= 4; s++) {
    cm.completeStage(s);
  }
  const reloaded = new CampaignManager(storage);
  assert.equal(reloaded.getData().unlockedStage, 5);
  assert.ok(reloaded.getData().completedStages.includes(4));
  assert.ok(reloaded.getData().gold > 180);
});

test('TacticalAI picks backstab/AoE/Belias Apocalypse Meteor cleanly', () => {
  const cm = new CampaignManager(new MemoryStorage());
  const stage5 = getStageDef(5);
  const engine = new TacticalCombatEngine(stage5, cm.getDeployedHeroes());
  const belias = engine.units.find((u) => u.jobId === 'belias_boss');
  assert.ok(belias);
  assert.equal(belias.footprint, 2);

  // Move two heroes near Belias's meteor range
  const allies = engine.units.filter((u) => u.team === 'ally');
  allies[0].col = 6;
  allies[0].row = 6;
  allies[1].col = 7;
  allies[1].row = 6;

  const decision = TacticalAI.chooseBestAction(engine, belias);
  assert.ok(decision.skill !== null);
  assert.equal(decision.skill?.id, 'apocalypse_meteor');
});

function createControlledEngine(stageId = 1, rng = () => 0.5) {
  const stage = structuredClone(getStageDef(stageId));
  const cm = new CampaignManager(new MemoryStorage());
  return new TacticalCombatEngine(stage, cm.getDeployedHeroes(), rng);
}

function clearTileOccupants(engine, col, row, keepIds = []) {
  let offset = 0;
  for (const u of engine.units) {
    if (keepIds.includes(u.id)) continue;
    if (u.col === col && u.row === row) {
      // Relocate non-involved units to another walkable tile
      for (const t of engine.tiles.values()) {
        if (
          t.walkable &&
          (t.col !== col || t.row !== row) &&
          !engine.getUnitAt(t.col, t.row, true)
        ) {
          u.col = t.col;
          u.row = t.row;
          break;
        }
      }
      offset++;
    }
  }
  return offset;
}

function findAdjacentWalkableTile(engine, col, row, excludeIds = []) {
  const dirs = [
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
    { dc: 0, dr: 1 },
    { dc: 0, dr: -1 },
  ];
  const centerTile = engine.getTile(col, row);
  for (const d of dirs) {
    const nc = col + d.dc;
    const nr = row + d.dr;
    const t = engine.getTile(nc, nr);
    if (!t || !t.walkable) continue;
    if (centerTile && Math.abs(t.height - centerTile.height) > 2) continue;
    const occ = engine.getUnitAt(nc, nr, true);
    if (!occ || !excludeIds.includes(occ.id)) {
      return { col: nc, row: nr };
    }
  }
  return null;
}

test('Cenário 1 (Mover -> Atacar -> Confirmar Direção): dano, abate e abate do último inimigo sem softlock', () => {
  // 1A: Move -> Attack (survives) -> SELECT_FACING -> endUnitTurn -> advanceToNextTurn
  {
    const engine = createControlledEngine(1, () => 0.5);
    const turn1 = engine.advanceToNextTurn();
    const hero = turn1.activeUnit;
    assert.ok(hero && hero.team === 'ally');

    const moveRange = engine.getMoveRange(hero);
    const dest = Array.from(moveRange.values()).find(
      (n) => (n.col !== hero.col || n.row !== hero.row) && findAdjacentWalkableTile(engine, n.col, n.row, [hero.id])
    );
    assert.ok(dest, 'Expected at least one reachable destination tile with an adjacent walkable tile');

    const adj = findAdjacentWalkableTile(engine, dest.col, dest.row, [hero.id]);
    assert.ok(adj);
    const enemy = engine.units.find((u) => u.team === 'enemy' && u.hp > 0);
    assert.ok(enemy);
    clearTileOccupants(engine, adj.col, adj.row, [hero.id, enemy.id]);
    enemy.col = adj.col;
    enemy.row = adj.row;

    const ctBeforeAction = hero.ct;
    const moveRes = engine.moveUnit(hero, dest.col, dest.row);
    assert.equal(moveRes.moved, true);
    assert.equal(hero.hasMovedThisTurn, true);
    assert.equal(hero.ct, ctBeforeAction, 'CT must not be deducted on move');

    const exec = engine.executeAttack(hero, enemy.col, enemy.row);
    assert.ok(exec);
    assert.equal(exec.hits.length, 1);
    assert.ok(exec.hits[0].damage > 0);
    assert.equal(exec.hits[0].killed, false);
    assert.equal(hero.hasActedThisTurn, true);
    assert.equal(hero.ct, ctBeforeAction, 'CT must NEVER be deducted mid-attack before endUnitTurn');

    assert.equal(engine.checkVictoryCondition(), null);
    assert.equal(engine.getPostActionState(hero), 'SELECT_FACING');

    const newCt = engine.endUnitTurn('E');
    assert.equal(newCt, 0);
    assert.equal(hero.ct, 0);
    assert.equal(hero.facing, 'E');
    assert.equal(hero.hasMovedThisTurn, false);
    assert.equal(hero.hasActedThisTurn, false);
    assert.equal(engine.activeUnitId, null);

    const turn2 = engine.advanceToNextTurn();
    assert.ok(turn2.activeUnit);
    assert.notEqual(turn2.activeUnit.id, hero.id);
    assert.ok(turn2.activeUnit.ct >= 100);
  }

  // 1B: Move -> Attack (kills non-last enemy) -> SELECT_FACING -> endUnitTurn -> advanceToNextTurn
  {
    const engine = createControlledEngine(1, () => 0.5);
    const hero = engine.advanceToNextTurn().activeUnit;
    assert.ok(hero && hero.team === 'ally');

    const moveRange = engine.getMoveRange(hero);
    const dest = Array.from(moveRange.values()).find(
      (n) => (n.col !== hero.col || n.row !== hero.row) && findAdjacentWalkableTile(engine, n.col, n.row, [hero.id])
    );
    assert.ok(dest);
    const adj = findAdjacentWalkableTile(engine, dest.col, dest.row, [hero.id]);
    assert.ok(adj);

    const enemies = engine.units.filter((u) => u.team === 'enemy' && u.hp > 0);
    assert.ok(enemies.length >= 2);
    const target = enemies[0];
    clearTileOccupants(engine, adj.col, adj.row, [hero.id, target.id]);
    target.col = adj.col;
    target.row = adj.row;
    target.hp = 1;

    engine.moveUnit(hero, dest.col, dest.row);
    const exec = engine.executeAttack(hero, target.col, target.row);
    assert.ok(exec);
    assert.equal(exec.hits[0].killed, true);
    assert.equal(target.hp, 0);
    assert.equal(engine.checkVictoryCondition(), null);
    assert.equal(engine.getPostActionState(hero), 'SELECT_FACING');

    engine.endUnitTurn('N');
    assert.equal(hero.facing, 'N');
    assert.equal(hero.ct, 0);

    const nextTurn = engine.advanceToNextTurn();
    assert.ok(nextTurn.activeUnit && nextTurn.activeUnit.hp > 0);
  }

  // 1C: Attack kills the LAST enemy -> immediate VICTORY without waiting for facing selection
  {
    const engine = createControlledEngine(1, () => 0.5);
    const hero = engine.advanceToNextTurn().activeUnit;
    assert.ok(hero && hero.team === 'ally');

    const adj = findAdjacentWalkableTile(engine, hero.col, hero.row, [hero.id]);
    assert.ok(adj);
    const enemies = engine.units.filter((u) => u.team === 'enemy');
    const lastEnemy = enemies[0];
    for (const e of enemies) {
      if (e.id !== lastEnemy.id) e.hp = 0;
    }
    clearTileOccupants(engine, adj.col, adj.row, [hero.id, lastEnemy.id]);
    lastEnemy.col = adj.col;
    lastEnemy.row = adj.row;
    lastEnemy.hp = 1;

    const exec = engine.executeAttack(hero, lastEnemy.col, lastEnemy.row);
    assert.ok(exec);
    assert.equal(exec.hits[0].killed, true);
    assert.equal(engine.checkVictoryCondition(), 'victory');
    assert.equal(engine.combatEnded, 'victory');
    assert.equal(engine.getPostActionState(hero), 'VICTORY');
    assert.equal(engine.advanceToNextTurn().activeUnit, null);
  }
});

test('Cenário 2 (Atacar -> Mover -> Encerrar Turno): libera movimento após ataque, entra em direção e passa a vez', () => {
  const engine = createControlledEngine(1, () => 0.5);
  const hero = engine.advanceToNextTurn().activeUnit;
  assert.ok(hero && hero.team === 'ally');

  const adj = findAdjacentWalkableTile(engine, hero.col, hero.row, [hero.id]);
  assert.ok(adj);
  const enemy = engine.units.find((u) => u.team === 'enemy' && u.hp > 0);
  assert.ok(enemy);
  clearTileOccupants(engine, adj.col, adj.row, [hero.id, enemy.id]);
  enemy.col = adj.col;
  enemy.row = adj.row;

  const ctBefore = hero.ct;
  const exec = engine.executeAttack(hero, enemy.col, enemy.row);
  assert.ok(exec);
  assert.ok(exec.hits[0].damage > 0);
  assert.equal(hero.hasActedThisTurn, true);
  assert.equal(hero.hasMovedThisTurn, false);
  assert.equal(hero.ct, ctBefore, 'CT must stay intact until endUnitTurn');

  // Case A: Hero acted first, has not moved yet and move > 0 -> CONTINUE_TURN
  assert.equal(engine.canUnitMove(hero), true);
  assert.equal(engine.getPostActionState(hero), 'CONTINUE_TURN');

  const moveRange = engine.getMoveRange(hero);
  const dest = Array.from(moveRange.values()).find((n) => n.col !== hero.col || n.row !== hero.row);
  assert.ok(dest);
  const moveRes = engine.moveUnit(hero, dest.col, dest.row);
  assert.equal(moveRes.moved, true);
  assert.equal(hero.hasMovedThisTurn, true);
  assert.equal(hero.ct, ctBefore);

  // Case B: Hero has now both acted and moved -> SELECT_FACING
  assert.equal(engine.getPostActionState(hero), 'SELECT_FACING');

  const finalCt = engine.endUnitTurn('S');
  assert.equal(finalCt, 0);
  assert.equal(hero.ct, 0);
  assert.equal(hero.facing, 'S');
  assert.equal(engine.activeUnitId, null);

  const nextTurn = engine.advanceToNextTurn();
  assert.ok(nextTurn.activeUnit);
  assert.notEqual(nextTurn.activeUnit.id, hero.id);
  assert.ok(nextTurn.activeUnit.ct >= 100);
});

test('Cenário 3 (Habilidade -> Encerrar Turno): magia de classe mantém mover/passar vez e encerra turno sem softlock', () => {
  // 3A: Mage casts Firaga without moving -> CONTINUE_TURN -> chooses Wait/End Turn (+20 CT) -> advances CTB
  {
    const engine = createControlledEngine(1, () => 0.5);
    const mage = engine.units.find((u) => u.team === 'ally' && u.jobId === 'black_mage');
    assert.ok(mage);
    mage.ct = 140;

    const turn = engine.advanceToNextTurn();
    assert.equal(turn.activeUnit?.id, mage.id);

    const firaga = JOBS.black_mage.skills.find((s) => s.id === 'firaga');
    assert.ok(firaga);
    const enemy = engine.units.find((u) => u.team === 'enemy' && u.hp > 0);
    assert.ok(enemy);

    const adj = findAdjacentWalkableTile(engine, mage.col, mage.row, [mage.id]);
    assert.ok(adj);
    clearTileOccupants(engine, adj.col, adj.row, [mage.id, enemy.id]);
    enemy.col = adj.col;
    enemy.row = adj.row;

    const mpBefore = mage.mp;
    const ctBefore = mage.ct;
    const exec = engine.executeSkill(mage, firaga, enemy.col, enemy.row);
    assert.equal(mage.mp, mpBefore - firaga.mpCost);
    assert.equal(mage.hasActedThisTurn, true);
    assert.equal(mage.hasMovedThisTurn, false);
    assert.equal(mage.ct, ctBefore);
    assert.ok(exec.hits.some((h) => h.targetId === enemy.id && h.damage > 0));
    assert.equal(engine.getPostActionState(mage), 'CONTINUE_TURN');

    const newCt = engine.endUnitTurn('W');
    assert.equal(newCt, 20);
    assert.equal(mage.ct, 20);
    assert.equal(mage.facing, 'W');

    const nextTurn = engine.advanceToNextTurn();
    assert.ok(nextTurn.activeUnit);
    assert.notEqual(nextTurn.activeUnit.id, mage.id);
    assert.ok(nextTurn.activeUnit.ct >= 100);
  }

  // 3B: Immobilized unit (or move === 0) casts skill -> straight to SELECT_FACING -> endUnitTurn -> advances CTB
  {
    const engine = createControlledEngine(1, () => 0.5);
    const mage = engine.units.find((u) => u.team === 'ally' && u.jobId === 'black_mage');
    assert.ok(mage);
    mage.ct = 140;
    mage.move = 0;

    const turn = engine.advanceToNextTurn();
    assert.equal(turn.activeUnit?.id, mage.id);

    const firaga = JOBS.black_mage.skills.find((s) => s.id === 'firaga');
    assert.ok(firaga);
    const enemy = engine.units.find((u) => u.team === 'enemy' && u.hp > 0);
    assert.ok(enemy);

    const adj = findAdjacentWalkableTile(engine, mage.col, mage.row, [mage.id]);
    assert.ok(adj);
    clearTileOccupants(engine, adj.col, adj.row, [mage.id, enemy.id]);
    enemy.col = adj.col;
    enemy.row = adj.row;

    engine.executeSkill(mage, firaga, enemy.col, enemy.row);
    assert.equal(engine.canUnitMove(mage), false);
    assert.equal(engine.getPostActionState(mage), 'SELECT_FACING');

    const newCt = engine.endUnitTurn('N');
    assert.equal(newCt, 20);
    assert.equal(mage.facing, 'N');

    const nextTurn = engine.advanceToNextTurn();
    assert.ok(nextTurn.activeUnit);
    assert.notEqual(nextTurn.activeUnit.id, mage.id);
  }
});
