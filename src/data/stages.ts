import type { GridTile, StageDef, SurfaceType } from '../types/tactics.ts';

function buildGrid(
  cols: number,
  rows: number,
  fn: (col: number, row: number) => Partial<GridTile> & { height: number; surface: SurfaceType }
): GridTile[] {
  const tiles: GridTile[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const spec = fn(col, row);
      const walkable =
        spec.walkable !== undefined
          ? spec.walkable
          : spec.surface !== 'water' && spec.surface !== 'lava' && !spec.prop;
      tiles.push({
        col,
        row,
        height: spec.height,
        surface: spec.surface,
        walkable,
        isStair: spec.isStair,
        isBridge: spec.isBridge,
        prop: spec.prop,
        chest: spec.chest,
      });
    }
  }
  return tiles;
}

export const STAGES: StageDef[] = [
  // ============================================================================
  // FASE 1: RUÍNAS DA ABADIA DE ORBONNE
  // ============================================================================
  {
    id: 1,
    name: 'Ruínas da Abadia de Orbonne',
    subtitle: 'Ato I — Emboscada no Pátio Sagrado',
    biome: 'forest',
    cols: 12,
    rows: 12,
    goldReward: 380,
    jpReward: 95,
    description:
      'Pátio da antiga abadia com degraus de pedra, riacho central, escadarias e o Capitão Mercenário Gafgarion protegendo as relíquias.',
    bossTitle: 'Capitão Mercenário Gafgarion',
    allySpawns: [
      { col: 1, row: 9, facing: 'N' },
      { col: 2, row: 10, facing: 'N' },
      { col: 3, row: 9, facing: 'N' },
      { col: 4, row: 10, facing: 'N' },
      { col: 5, row: 9, facing: 'N' },
    ],
    tiles: buildGrid(12, 12, (c, r) => {
      // Stream cutting through rows 5-6 on left side, crossed by bridge & stones
      if ((r === 6 && c <= 7) || (r === 5 && c >= 8)) {
        if (c === 3 || c === 6) {
          return { height: 2, surface: 'wood', isBridge: true, walkable: true };
        }
        return { height: 1, surface: 'water', walkable: false };
      }

      // Elevated Abbey courtyard in north (rows 0..4)
      if (r <= 2) {
        if ((c === 0 || c === 11) && r === 0) {
          return { height: 5, surface: 'stone', prop: 'ruin_wall', walkable: false };
        }
        if ((c === 3 || c === 8) && r === 1) {
          return { height: 5, surface: 'stone', prop: 'torch', walkable: false };
        }
        if (c === 10 && r === 1) {
          return {
            height: 5,
            surface: 'cobble',
            chest: { id: 'ch_orbonne_1', gold: 150, opened: false, itemId: 'ar_leather_coat' },
          };
        }
        return { height: 4, surface: c >= 4 && c <= 7 ? 'carpet' : 'cobble' };
      }

      // Stairs leading up from mid terrace (r=3..4) to abbey (r=2)
      if (r === 3 || r === 4) {
        if (c === 4 || c === 7) {
          return { height: r === 3 ? 3 : 2, surface: 'stone', isStair: true, walkable: true };
        }
        if (c === 1 && r === 4) {
          return { height: 3, surface: 'grass', prop: 'tree', walkable: false };
        }
        if (c === 10 && r === 3) {
          return { height: 3, surface: 'grass', prop: 'tree', walkable: false };
        }
        return { height: r === 3 ? 3 : 2, surface: c >= 3 && c <= 8 ? 'cobble' : 'grass' };
      }

      // South gardens with elevation steps
      if (r === 7 && (c === 2 || c === 9)) {
        return { height: 2, surface: 'grass', prop: 'tree', walkable: false };
      }
      if (r === 11 && (c === 0 || c === 11)) {
        return { height: 3, surface: 'stone', prop: 'pillar', walkable: false };
      }
      if (c >= 8 && r >= 8) {
        return { height: 3, surface: 'grass' };
      }
      return { height: 2, surface: c >= 2 && c <= 5 && r >= 8 ? 'cobble' : 'grass' };
    }),
    enemies: [
      {
        id: 'e1_gafgarion',
        name: 'Capitão Gafgarion',
        jobId: 'dark_knight_boss',
        level: 2,
        col: 5,
        row: 2,
        facing: 'S',
        isBoss: true,
        aiRole: 'aggressive',
        hpScale: 1.0,
      },
      {
        id: 'e1_knight',
        name: 'Mercenário Escudeiro',
        jobId: 'holy_knight',
        level: 1,
        col: 4,
        row: 4,
        facing: 'S',
        aiRole: 'aggressive',
        hpScale: 0.72,
        atkScale: 0.85,
      },
      {
        id: 'e1_archer',
        name: 'Besteiro de Orbonne',
        jobId: 'sniper',
        level: 1,
        col: 8,
        row: 3,
        facing: 'S',
        aiRole: 'sniper',
        hpScale: 0.72,
        atkScale: 0.85,
      },
      {
        id: 'e1_mage',
        name: 'Acólito Negro',
        jobId: 'black_mage',
        level: 1,
        col: 7,
        row: 1,
        facing: 'S',
        aiRole: 'mage',
        hpScale: 0.75,
        atkScale: 0.85,
      },
    ],
  },

  // ============================================================================
  // FASE 2: PONTE DO DESFILADEIRO DE ZEIRCHELE
  // ============================================================================
  {
    id: 2,
    name: 'Ponte do Desfiladeiro de Zeirchele',
    subtitle: 'Ato II — Queda nas Cataratas',
    biome: 'canyon',
    cols: 13,
    rows: 12,
    goldReward: 540,
    jpReward: 130,
    description:
      'Ponte elevada de pedra sobre um rio caudaloso. Empurrar inimigos das beiradas causa dano massivo de queda!',
    bossTitle: 'Comandante Dragoon Aliste',
    allySpawns: [
      { col: 1, row: 4, facing: 'E' },
      { col: 1, row: 5, facing: 'E' },
      { col: 1, row: 6, facing: 'E' },
      { col: 2, row: 5, facing: 'E' },
      { col: 2, row: 7, facing: 'E' },
    ],
    tiles: buildGrid(13, 12, (c, r) => {
      // River running north-south at columns 5, 6, 7
      if (c >= 5 && c <= 7) {
        // Elevated bridge at rows 4..7
        if (r >= 4 && r <= 7) {
          if ((r === 4 || r === 7) && (c === 5 || c === 7)) {
            return { height: 5, surface: 'cobble', prop: 'torch', walkable: false };
          }
          return { height: 5, surface: 'cobble', isBridge: true, walkable: true };
        }
        // Waterfall plunge pool below (height 1)
        return { height: 1, surface: 'water', walkable: false };
      }

      // West canyon cliff (c <= 4)
      if (c <= 4) {
        if (c === 4 && (r === 2 || r === 9)) {
          return { height: 6, surface: 'stone', prop: 'rock', walkable: false };
        }
        if (r <= 2 && c <= 3) {
          return { height: 6, surface: 'stone' };
        }
        if (c === 3 && (r === 3 || r === 8)) {
          return { height: 5, surface: 'stone', isStair: true, walkable: true };
        }
        return { height: 4, surface: c >= 3 ? 'cobble' : 'stone' };
      }

      // East fortress towers & cliffs (c >= 8)
      if (r <= 2 && c >= 9) {
        if (c === 11 && r === 1) {
          return {
            height: 7,
            surface: 'cobble',
            chest: { id: 'ch_zeirchele_1', gold: 220, opened: false, itemId: 'ac_battle_boots' },
          };
        }
        return { height: 7, surface: 'cobble' }; // High sniper tower!
      }
      if (r >= 9 && c >= 9) {
        return { height: 6, surface: 'stone' };
      }
      if (c === 9 && (r === 3 || r === 8)) {
        return { height: 6, surface: 'stone', isStair: true, walkable: true };
      }
      if (c === 12 && (r === 4 || r === 7)) {
        return { height: 6, surface: 'stone', prop: 'banner', walkable: false };
      }
      return { height: 5, surface: 'cobble' };
    }),
    enemies: [
      {
        id: 'e2_dragoon_boss',
        name: 'Comandante Aliste',
        jobId: 'dragoon_boss',
        level: 3,
        col: 10,
        row: 5,
        facing: 'W',
        isBoss: true,
        aiRole: 'aggressive',
      },
      {
        id: 'e2_sniper_top',
        name: 'Atirador da Torre Norte',
        jobId: 'sniper',
        level: 2,
        col: 10,
        row: 1,
        facing: 'W',
        aiRole: 'sniper',
        hpScale: 0.85,
      },
      {
        id: 'e2_sniper_bot',
        name: 'Atirador da Torre Sul',
        jobId: 'sniper',
        level: 2,
        col: 10,
        row: 10,
        facing: 'W',
        aiRole: 'sniper',
        hpScale: 0.85,
      },
      {
        id: 'e2_knight',
        name: 'Guarda da Ponte',
        jobId: 'holy_knight',
        level: 2,
        col: 7,
        row: 5,
        facing: 'W',
        aiRole: 'aggressive',
        hpScale: 0.9,
      },
      {
        id: 'e2_cleric',
        name: 'Sacerdote de Campo',
        jobId: 'white_mystic',
        level: 2,
        col: 11,
        row: 6,
        facing: 'W',
        aiRole: 'support',
      },
    ],
  },

  // ============================================================================
  // FASE 3: FORTALEZA GLACIAL DE LIONEL
  // ============================================================================
  {
    id: 3,
    name: 'Fortaleza Glacial de Lionel',
    subtitle: 'Ato III — Assalto às Muralhas de Gelo',
    biome: 'arctic',
    cols: 13,
    rows: 13,
    goldReward: 720,
    jpReward: 165,
    description:
      'Muralhas nevadas imponentes de até 7 degraus e lago congelado propenso a magia elétrica (Thundaga +35%).',
    bossTitle: 'Arquimago Boreal Vormav',
    allySpawns: [
      { col: 4, row: 11, facing: 'N' },
      { col: 5, row: 11, facing: 'N' },
      { col: 6, row: 11, facing: 'N' },
      { col: 7, row: 11, facing: 'N' },
      { col: 8, row: 11, facing: 'N' },
    ],
    tiles: buildGrid(13, 13, (c, r) => {
      // High castle battlements on north (r <= 2)
      if (r <= 2) {
        if ((c === 2 || c === 10) && r === 1) {
          return { height: 7, surface: 'cobble', prop: 'crystal', walkable: false };
        }
        if (c === 6 && r === 0) {
          return { height: 7, surface: 'carpet', prop: 'banner', walkable: false };
        }
        return { height: 6, surface: c >= 5 && c <= 7 ? 'carpet' : 'cobble' };
      }

      // Rampart wall row 3 with two stairways
      if (r === 3) {
        if (c === 3 || c === 9) {
          return { height: 5, surface: 'stone', isStair: true, walkable: true };
        }
        if (c === 6) {
          return { height: 4, surface: 'metal', isStair: true, walkable: true }; // Main steel gate
        }
        return { height: 7, surface: 'cobble', prop: 'ruin_wall', walkable: false };
      }

      // Mid courtyard (r 4..7): frozen ice moat & snow terraces
      if (r >= 5 && r <= 7 && (c <= 3 || c >= 9)) {
        return { height: 3, surface: 'ice', walkable: true };
      }
      if (r === 4 && c === 1) {
        return {
          height: 4,
          surface: 'snow',
          chest: { id: 'ch_lionel_1', gold: 280, opened: false, itemId: 'wp_ether_staff' },
        };
      }
      if ((c === 1 || c === 11) && r === 9) {
        return { height: 3, surface: 'snow', prop: 'pine', walkable: false };
      }
      if ((c === 4 || c === 8) && r === 6) {
        return { height: 4, surface: 'stone', prop: 'torch', walkable: false };
      }
      if (r >= 4 && r <= 8 && c >= 5 && c <= 7) {
        return { height: 3, surface: 'cobble' };
      }
      return { height: r >= 9 ? 2 : 3, surface: 'snow' };
    }),
    enemies: [
      {
        id: 'e3_archmage',
        name: 'Arquimago Vormav',
        jobId: 'archmage_boss',
        level: 4,
        col: 6,
        row: 1,
        facing: 'S',
        isBoss: true,
        aiRole: 'mage',
      },
      {
        id: 'e3_golem_l',
        name: 'Golem Rúnico Alfa',
        jobId: 'golem_enemy',
        level: 4,
        col: 4,
        row: 5,
        facing: 'S',
        aiRole: 'aggressive',
      },
      {
        id: 'e3_golem_r',
        name: 'Golem Rúnico Beta',
        jobId: 'golem_enemy',
        level: 4,
        col: 8,
        row: 5,
        facing: 'S',
        aiRole: 'aggressive',
      },
      {
        id: 'e3_sniper',
        name: 'Vigília da Muralha',
        jobId: 'sniper',
        level: 3,
        col: 1,
        row: 2,
        facing: 'S',
        aiRole: 'sniper',
      },
      {
        id: 'e3_ninja',
        name: 'Assassino de Lionel',
        jobId: 'ninja',
        level: 3,
        col: 10,
        row: 4,
        facing: 'S',
        aiRole: 'aggressive',
      },
    ],
  },

  // ============================================================================
  // FASE 4: PÂNTANO DAS RUÍNAS PROIBIDAS
  // ============================================================================
  {
    id: 4,
    name: 'Pântano das Ruínas Proibidas',
    subtitle: 'Ato IV — O Despertar do Lich',
    biome: 'swamp',
    cols: 13,
    rows: 13,
    goldReward: 940,
    jpReward: 210,
    description:
      'Terreno alagado que dobra o custo de movimento. Plataformas antigas ligam o altar do Lich Invocador. Magia Holy causa +40% de dano!',
    bossTitle: 'Lich Invocador Malakor',
    allySpawns: [
      { col: 2, row: 11, facing: 'N' },
      { col: 4, row: 11, facing: 'N' },
      { col: 6, row: 11, facing: 'N' },
      { col: 8, row: 11, facing: 'N' },
      { col: 10, row: 11, facing: 'N' },
    ],
    tiles: buildGrid(13, 13, (c, r) => {
      // North ritual altar
      if (r <= 2 && c >= 4 && c <= 8) {
        if ((c === 4 || c === 8) && r === 1) {
          return { height: 5, surface: 'obsidian', prop: 'crystal', walkable: false };
        }
        return { height: 4, surface: 'obsidian' };
      }

      // Ancient stone walkways (islands)
      if ((c === 3 || c === 9) && r >= 3 && r <= 9) {
        if (r === 6 && c === 3) {
          return { height: 3, surface: 'stone', prop: 'statue', walkable: false };
        }
        if (r === 4 && c === 9) {
          return {
            height: 3,
            surface: 'cobble',
            chest: { id: 'ch_swamp_1', gold: 350, opened: false, itemId: 'ac_hermes_boots' },
          };
        }
        return { height: 3, surface: 'cobble' };
      }

      // Central sunken ruin bridge
      if (c === 6 && r >= 3 && r <= 10) {
        return { height: 2, surface: 'stone' };
      }

      // Deep dark water pools on far corners
      if ((c <= 1 && r <= 4) || (c >= 11 && r <= 4)) {
        return { height: 1, surface: 'water', walkable: false };
      }

      // South staging hill
      if (r >= 10) {
        return { height: 2, surface: 'stone' };
      }

      // Props
      if ((c === 1 && r === 8) || (c === 11 && r === 8)) {
        return { height: 2, surface: 'swamp', prop: 'tree', walkable: false };
      }

      // Swamp bog (walkable, movement cost 2)
      return { height: 1, surface: 'swamp', walkable: true };
    }),
    enemies: [
      {
        id: 'e4_lich',
        name: 'Lich Malakor',
        jobId: 'lich_boss',
        level: 5,
        col: 6,
        row: 1,
        facing: 'S',
        isBoss: true,
        isUndead: true,
        aiRole: 'mage',
      },
      {
        id: 'e4_skel1',
        name: 'Guardião Ósseo',
        jobId: 'skeleton_enemy',
        level: 4,
        col: 3,
        row: 4,
        facing: 'S',
        isUndead: true,
        aiRole: 'aggressive',
      },
      {
        id: 'e4_skel2',
        name: 'Sentinela Óssea',
        jobId: 'skeleton_enemy',
        level: 4,
        col: 9,
        row: 5,
        facing: 'S',
        isUndead: true,
        aiRole: 'aggressive',
      },
      {
        id: 'e4_mage',
        name: 'Necromante Sombrio',
        jobId: 'black_mage',
        level: 4,
        col: 5,
        row: 2,
        facing: 'S',
        isUndead: true,
        aiRole: 'mage',
      },
      {
        id: 'e4_ninja',
        name: 'Espectro das Sombras',
        jobId: 'ninja',
        level: 4,
        col: 7,
        row: 4,
        facing: 'S',
        isUndead: true,
        aiRole: 'aggressive',
      },
    ],
  },

  // ============================================================================
  // FASE 5: SANTUÁRIO DO TRONO DAS CINZAS (CHEFE SUPREMO BELIAS)
  // ============================================================================
  {
    id: 5,
    name: 'Santuário do Trono das Cinzas',
    subtitle: 'Ato Final — O Trono do Arquidemônio Lucavi',
    biome: 'volcanic',
    cols: 14,
    rows: 14,
    goldReward: 1800,
    jpReward: 350,
    description:
      'Catedral vulcânica cercada por fissuras de lava. Enfrente o colossal Arquidemônio Belias (2x2) e esquive do Apocalypse Meteor!',
    bossTitle: 'Arquidemônio Lucavi: Belias, o Titã das Cinzas',
    allySpawns: [
      { col: 4, row: 12, facing: 'N' },
      { col: 5, row: 12, facing: 'N' },
      { col: 6, row: 12, facing: 'N' },
      { col: 7, row: 12, facing: 'N' },
      { col: 9, row: 12, facing: 'N' },
    ],
    tiles: buildGrid(14, 14, (c, r) => {
      // Lava chasms on outer borders and flanks
      if (
        ((c <= 1 || c >= 12) && r >= 2 && r <= 11) ||
        (r >= 6 && r <= 7 && (c === 3 || c === 10))
      ) {
        return { height: 1, surface: 'lava', walkable: false };
      }

      // Elevated Volcanic Cathedral Throne Platform (r <= 4, c 4..9)
      if (r <= 4 && c >= 4 && c <= 9) {
        if ((c === 4 || c === 9) && r === 0) {
          return { height: 7, surface: 'obsidian', prop: 'brazier', walkable: false };
        }
        if ((c === 4 || c === 9) && r === 4) {
          return { height: 6, surface: 'obsidian', prop: 'pillar', walkable: false };
        }
        return { height: 6, surface: c >= 5 && c <= 8 ? 'carpet' : 'obsidian' };
      }

      // Grand Stairs from r=5..6 (c 5..8)
      if ((r === 5 || r === 6) && c >= 5 && c <= 8) {
        return { height: r === 5 ? 5 : 4, surface: 'stone', isStair: true, walkable: true };
      }

      // Side walkways with chests & braziers
      if (c === 2 && r === 4) {
        return {
          height: 4,
          surface: 'obsidian',
          chest: { id: 'ch_ashes_1', gold: 500, opened: false, itemId: 'wp_excalibur' },
        };
      }
      if ((c === 2 || c === 11) && r === 9) {
        return { height: 3, surface: 'obsidian', prop: 'brazier', walkable: false };
      }
      if ((c === 4 || c === 9) && r === 9) {
        return { height: 3, surface: 'obsidian', prop: 'crystal', walkable: false };
      }

      // Central nave
      if (r >= 7 && r <= 10) {
        return { height: 3, surface: c >= 5 && c <= 8 ? 'carpet' : 'obsidian' };
      }
      return { height: 2, surface: 'obsidian' };
    }),
    enemies: [
      {
        id: 'e5_belias',
        name: 'Belias, o Titã das Cinzas',
        jobId: 'belias_boss',
        level: 6,
        col: 6,
        row: 1,
        facing: 'S',
        isBoss: true,
        isUndead: true,
        footprint: 2,
        aiRole: 'boss_belias',
      },
      {
        id: 'e5_knight_l',
        name: 'Templário das Cinzas',
        jobId: 'dark_knight_boss',
        level: 5,
        col: 3,
        row: 5,
        facing: 'S',
        aiRole: 'aggressive',
        hpScale: 0.78,
      },
      {
        id: 'e5_mage_r',
        name: 'Invocador Lucavi',
        jobId: 'black_mage',
        level: 5,
        col: 10,
        row: 5,
        facing: 'S',
        aiRole: 'mage',
        hpScale: 1.05,
      },
      {
        id: 'e5_dragoon',
        name: 'Guarda Dracônico',
        jobId: 'dragoon',
        level: 5,
        col: 8,
        row: 7,
        facing: 'S',
        aiRole: 'aggressive',
      },
      {
        id: 'e5_cleric',
        name: 'Oráculo Profano',
        jobId: 'white_mystic',
        level: 5,
        col: 5,
        row: 3,
        facing: 'S',
        aiRole: 'support',
      },
    ],
  },
];

export function getStageDef(stageId: number): StageDef {
  return STAGES.find((s) => s.id === stageId) ?? STAGES[0];
}
