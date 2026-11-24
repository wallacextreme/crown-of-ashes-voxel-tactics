# CROWN OF ASHES: VOXEL TACTICS

JRPG Tático por turnos em diorama **HD-3D Voxel**, construído com **TypeScript (`^5.8.2`)**, **Three.js (`^0.187.0`)** e **Vite (`^7.3.1`)**, empacotado também como **PWA** (`public/manifest.webmanifest`, `public/sw.js`).

---

## Destaques do Sistema

- **Classes / Jobs (`src/data/jobs.ts`):** **`6` classes jogáveis** (`holy_knight`, `black_mage`, `dragoon`, `sniper`, `white_mystic`, `ninja`) dentro de **`13` definições de Jobs** totais (incluindo arquétipos inimigos/chefes), equipamentos e melhorias passivas via JP (`PASSIVE_UPGRADES`).
- **Campanha (`src/data/stages.ts`):** **`5` estágios táticos** em grids 3D com elevação (`height`), superfícies (`water`, `lava`, escadas `isStair`, pontes `isBridge`), obstáculos (`prop`) e baús (`chest`).
- **Motor Tático Puro (`src/systems/TacticalCombatEngine.ts`):** cálculo de movimento em grid (`MoveNode`), linha de tempo CT/velocidade (`TimelineEntry`), previsão de combate (`CombatForecast`), ataques direcionais (`AttackDirection`), bônus de altura, empurrão (`knockbackMovedTo`), dano de queda (`fallDamage`), teletransporte, meteoros telegrafados e abertura de baús.
- **IA Tática & Campanha (`src/systems/TacticalAI.ts`, `src/systems/CampaignManager.ts`):** decisão de inimigos e persistência em `localStorage` (`crown_of_ashes_save_v1` com fallback `MemoryStorage` em memória para testes).
- **Renderização HD-3D Voxel (`src/three/`):** rigs articulados de micro-voxels (`VoxelEngine3D.ts`), materiais PBR procedurais (`ProceduralVoxelPBR.ts`), cenário diorama (`TerrainDioramaVoxel3D.ts`), VFX 3D (`EffectsVoxel3D.ts`) e câmera/batalha (`BattlefieldTactics3D.ts`).

---

## Estrutura de Pastas

```text
├── public/                      # Ícones PWA, manifest.webmanifest e sw.js
├── src/
│   ├── data/
│   │   ├── jobs.ts              # 6 classes jogáveis, 13 jobs totais, skills, equipamentos e passivas
│   │   └── stages.ts            # 5 estágios da campanha com mapas 3D de elevação e biomas
│   ├── systems/
│   │   ├── AudioEngine.ts       # Síntese e efeitos sonoros táticos
│   │   ├── CampaignManager.ts   # Roster, evolução de jobs/JP e persistência (Save v1)
│   │   ├── TacticalAI.ts        # IA tática para unidades inimigas
│   │   └── TacticalCombatEngine.ts # Regras puras de movimento, alcance, dano e efeitos
│   ├── three/
│   │   ├── BattlefieldTactics3D.ts  # Cena Three.js, seleção de tiles, câmera e turno visual
│   │   ├── EffectsVoxel3D.ts        # Efeitos visuais de combate e projéteis voxel
│   │   ├── ProceduralVoxelPBR.ts    # Materiais PBR procedurais e sombra de contato
│   │   ├── TerrainDioramaVoxel3D.ts # Construção 3D de blocos de terreno, água, lava e props
│   │   └── VoxelEngine3D.ts         # Montagem de rigs micro-voxel e animações (idle/walk/slash/cast...)
│   ├── types/tactics.ts         # Contratos TypeScript do domínio tático
│   ├── ui/BarracksModal.ts      # Quartel / gestão de grupo, equipamentos e habilidades
│   ├── main.ts                  # Controlador principal e interface HUD
│   └── style.css                # Estilos da interface
└── tests/
    └── tactics.test.mjs         # Testes automatizados do motor tático e campanha
```

---

## Como Executar

```bash
npm install          # Instalar dependências
npm run dev          # Iniciar servidor Vite de desenvolvimento
npm run build        # tsc --noEmit && vite build (dist/)
npm run preview      # Pré-visualizar build de produção
npm test             # Rodar node --test tests/tactics.test.mjs
```

---

## Documentação Complementar

- Arquitetura detalhada e dependências (`graphify-out/`): [`docs/designs/ARCHITECTURE.md`](docs/designs/ARCHITECTURE.md)
