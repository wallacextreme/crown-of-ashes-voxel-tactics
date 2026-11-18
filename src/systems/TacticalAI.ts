import type { BattleUnit, Facing, SkillDef } from '../types/tactics.ts';
import {
  TacticalCombatEngine,
  getAttackDirection,
  hasStatus,
  manhattan,
  tileKey,
  vectorToFacing,
} from './TacticalCombatEngine.ts';

export interface AIDecision {
  moveCol: number;
  moveRow: number;
  movePath: { col: number; row: number }[];
  skill: SkillDef | null;
  targetCol: number;
  targetRow: number;
  endFacing: Facing;
  score: number;
}

export class TacticalAI {
  static chooseBestAction(engine: TacticalCombatEngine, enemy: BattleUnit): AIDecision {
    const moveRange = engine.getMoveRange(enemy);
    const reachableNodes = Array.from(moveRange.values());
    const skills = engine.getAvailableSkills(enemy).filter((s) => s.mpCost <= enemy.mp);
    const livingAllies = engine.units.filter((u) => u.team === 'ally' && u.hp > 0);
    const livingEnemies = engine.units.filter((u) => u.team === 'enemy' && u.hp > 0);

    let best: AIDecision = {
      moveCol: enemy.col,
      moveRow: enemy.row,
      movePath: [{ col: enemy.col, row: enemy.row }],
      skill: null,
      targetCol: enemy.col,
      targetRow: enemy.row,
      endFacing: enemy.facing,
      score: -Infinity,
    };

    if (livingAllies.length === 0) {
      return best;
    }

    const nearestHeroFrom = (c: number, r: number): { hero: BattleUnit; dist: number } => {
      let nearest = livingAllies[0];
      let minDist = manhattan(c, r, nearest.col, nearest.row);
      for (const h of livingAllies) {
        const d = manhattan(c, r, h.col, h.row);
        if (d < minDist) {
          minDist = d;
          nearest = h;
        }
      }
      return { hero: nearest, dist: minDist };
    };

    // Temporarily evaluate candidate move positions without permanently mutating engine
    const origCol = enemy.col;
    const origRow = enemy.row;

    // Limit evaluation pool if map is huge (keeps AI < 8ms)
    const candidateMoves = reachableNodes.slice(0, 48);

    for (const node of candidateMoves) {
      enemy.col = node.col;
      enemy.row = node.row;
      const tile = engine.getTile(node.col, node.row);
      const tileHeight = tile?.height ?? 1;
      const burningPenalty = (tile?.burningTurns ?? 0) > 0 ? -35 : 0;

      // Elevation preference for snipers & mages
      const elevationScore =
        enemy.aiRole === 'sniper'
          ? tileHeight * 12
          : enemy.aiRole === 'mage' || enemy.aiRole === 'support'
            ? tileHeight * 4
            : tileHeight * 2;

      // Evaluate every skill from this position
      for (const skill of skills) {
        const targetable = engine.getSkillTargetableTiles(enemy, skill);
        // Deduplicate target cells and prioritize occupied cells or cluster centers
        const evalCells: { col: number; row: number }[] = [];
        if (skill.aoeShape === 'self') {
          evalCells.push({ col: node.col, row: node.row });
        } else if (skill.aoeShape === 'single' || skill.aoeShape === 'line2') {
          for (const cell of targetable) {
            const occ = engine.getUnitAt(cell.col, cell.row);
            if (occ && ((skill.isHeal || skill.isBuff) ? occ.team === 'enemy' : occ.team === 'ally')) {
              evalCells.push(cell);
            }
          }
        } else {
          // AoE skill: evaluate around each targetable unit + midpoint cluster cells
          const seen = new Set<string>();
          const pool = (skill.isHeal || skill.isBuff) ? livingEnemies : livingAllies;
          for (const cell of targetable) {
            const nearRelevant = pool.some((u) => manhattan(u.col, u.row, cell.col, cell.row) <= skill.aoeRadius + 1);
            if (nearRelevant) {
              const k = tileKey(cell.col, cell.row);
              if (!seen.has(k)) {
                seen.add(k);
                evalCells.push(cell);
              }
            }
          }
        }

        for (const tCell of evalCells) {
          let score = elevationScore + burningPenalty;

          if (skill.isHeal) {
            const aoe = engine.getAoeTiles(tCell.col, tCell.row, skill, node.col, node.row);
            let healedCount = 0;
            for (const c of aoe) {
              const u = engine.getUnitAt(c.col, c.row);
              if (u && u.team === 'enemy' && u.hp < u.maxHp * 0.8) {
                const missingRatio = 1 - u.hp / u.maxHp;
                score += 55 + missingRatio * 75 + (u.isBoss ? 35 : 0);
                healedCount++;
              }
            }
            if (healedCount === 0) continue;
          } else if (skill.isBuff) {
            if (skill.buffType === 'haste') {
              const aoe = engine.getAoeTiles(tCell.col, tCell.row, skill, node.col, node.row);
              let buffed = 0;
              for (const c of aoe) {
                const u = engine.getUnitAt(c.col, c.row);
                if (u && u.team === 'enemy' && !hasStatus(u, 'haste')) {
                  score += 34 + (u.isBoss ? 25 : 0);
                  buffed++;
                }
              }
              if (buffed === 0) continue;
            } else {
              continue;
            }
          } else if (skill.id === 'apocalypse_meteor') {
            if (enemy.pendingMeteor) continue;
            const aoe = engine.getAoeTiles(tCell.col, tCell.row, skill, node.col, node.row);
            let hitHeroes = 0;
            for (const c of aoe) {
              const u = engine.getUnitAt(c.col, c.row);
              if (u && u.team === 'ally') {
                hitHeroes++;
                score += 125;
              }
            }
            if (hitHeroes === 0) continue;
            if (hitHeroes >= 2) score += 160;
          } else {
            // Offensive evaluation
            const aoe = engine.getAoeTiles(tCell.col, tCell.row, skill, node.col, node.row);
            const hitAllies = new Set<string>();
            const hitFriends = new Set<string>();
            for (const c of aoe) {
              const u = engine.getUnitAt(c.col, c.row);
              if (!u || u.hp <= 0) continue;
              if (u.team === 'ally') hitAllies.add(u.id);
              else if (u.id !== enemy.id) hitFriends.add(u.id);
            }
            if (hitAllies.size === 0) continue;

            // Avoid friendly fire for enemy mages
            score -= hitFriends.size * 60;
            if (hitAllies.size >= 2) {
              score += (hitAllies.size - 1) * 42;
            }

            for (const allyId of hitAllies) {
              const hero = engine.getUnit(allyId)!;
              const fc = engine.computeCombatForecast(enemy, skill, hero.col, hero.row, node.col, node.row);
              if (!fc) continue;

              // Damage & kill-shot bonus
              score += Math.min(85, fc.predictedDamage * 0.45);
              if (fc.predictedDamage >= hero.hp) score += 75;

              // Directional bonus: seek Backstab and Flank!
              const dir = getAttackDirection(node.col, node.row, hero.col, hero.row, hero.facing);
              if (dir === 'BACK') score += 45;
              else if (dir === 'SIDE') score += 22;

              // Prioritize squishy mages/clerics, low-HP heroes, and Aegis taunt
              if (hero.jobId === 'black_mage' || hero.jobId === 'white_mystic') {
                score += 22;
              }
              score += (1 - hero.hp / hero.maxHp) * 28;
              if (hasStatus(hero, 'aegis')) {
                score += 38;
              }
              if (fc.expectedFallDamage > 0) {
                score += 35;
              }
            }
          }

          const { hero: closest } = nearestHeroFrom(node.col, node.row);
          const endFacing = vectorToFacing(closest.col - node.col, closest.row - node.row, enemy.facing);

          if (score > best.score) {
            best = {
              moveCol: node.col,
              moveRow: node.row,
              movePath: node.path,
              skill,
              targetCol: tCell.col,
              targetRow: tCell.row,
              endFacing,
              score,
            };
          }
        }
      }

      // If no skill could hit from this tile, score moving closer to the weakest/nearest hero
      const { hero: nearest, dist } = nearestHeroFrom(node.col, node.row);
      const approachTarget =
        enemy.aiRole === 'sniper'
          ? Math.abs(dist - 4) * -12 + elevationScore
          : enemy.aiRole === 'support'
            ? -dist * 5 + elevationScore
            : -dist * 14 + elevationScore;
      const moveOnlyScore = approachTarget + burningPenalty - 25;
      if (moveOnlyScore > best.score) {
        best = {
          moveCol: node.col,
          moveRow: node.row,
          movePath: node.path,
          skill: null,
          targetCol: node.col,
          targetRow: node.row,
          endFacing: vectorToFacing(nearest.col - node.col, nearest.row - node.row, enemy.facing),
          score: moveOnlyScore,
        };
      }
    }

    // Restore enemy coordinates (caller animates move cleanly)
    enemy.col = origCol;
    enemy.row = origRow;
    return best;
  }
}
