(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const $d=["holy_knight","black_mage","dragoon","sniper","white_mystic","ninja"],el={hp_up:{id:"hp_up",name:"Vitalidade de Ferro (+40 HP)",description:"Aumenta permanentemente o HP máximo em +40.",jpCost:70,stat:"hp",bonus:40},atk_up:{id:"atk_up",name:"Maestria Marcial (+6 ATK)",description:"Aumenta o Ataque Físico base em +6.",jpCost:85,stat:"atk",bonus:6},mag_up:{id:"mag_up",name:"Erudição Arcana (+6 MAG)",description:"Aumenta o Poder Mágico base em +6.",jpCost:85,stat:"mag",bonus:6},mp_up:{id:"mp_up",name:"Reservatório de Éter (+25 MP)",description:"Aumenta permanentemente o MP máximo em +25.",jpCost:65,stat:"mp",bonus:25},move_up:{id:"move_up",name:"Passo Tático (+1 MOVE)",description:"Aumenta o alcance de deslocamento no tabuleiro em +1 tile.",jpCost:140,stat:"move",bonus:1}},Gt={holy_knight:{id:"holy_knight",name:"Cavaleiro Sagrado",title:"Ordem da Rosa Branca",color:"#3b82f6",accentColor:"#fbbf24",icon:"⚔️",baseStats:{hp:260,mp:65,atk:44,mag:34,def:32,speed:10,move:4,jump:3,evasion:.08,shieldBlock:.28},growthPerLevel:{hp:24,mp:6,atk:5,mag:3,def:4,speed:.5},passivePool:["hp_up","atk_up","mp_up","move_up"],skills:[{id:"bash_strike",name:"Golpe de Escudo (Bash)",shortName:"Bash",description:"Ataque físico firme que empurra o inimigo 1 tile para trás (causa queda em penhascos!).",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.05,isBasic:!0,knockback:1,element:"physical",jpCost:0,vfxType:"bash"},{id:"judgment_blade",name:"Judgment Blade (Espada do Julgamento)",shortName:"Judgment Blade",description:"Ergue a espada rúnica e faz brotar lâminas de luz e gelo do chão em Cruz, podendo aplicar Stop.",mpCost:18,range:3,aoeRadius:1,aoeShape:"cross",multiplier:1.45,element:"holy",statusEffect:"stop",statusChance:.45,jpCost:0,vfxType:"judgment_blade"},{id:"hallowed_bolt",name:"Hallowed Bolt (Raio Divino)",shortName:"Hallowed Bolt",description:"Relâmpago celestial em área de Cruz com ondas de choque que aplicam Silêncio.",mpCost:24,range:4,aoeRadius:1,aoeShape:"cross",multiplier:1.65,element:"lightning",statusEffect:"silence",statusChance:.55,jpCost:120,vfxType:"hallowed_bolt"},{id:"aegis_stance",name:"Aegis Stance (Postura de Égide)",shortName:"Aegis Stance",description:"Aumenta a Defesa em +40% por 3 turnos e atrai a agressão inimiga.",mpCost:10,range:0,aoeRadius:0,aoeShape:"self",multiplier:0,isBuff:!0,buffType:"aegis",element:"holy",jpCost:90,vfxType:"aegis"}]},black_mage:{id:"black_mage",name:"Mago Negro",title:"Círculo de Obsidiana",color:"#6366f1",accentColor:"#facc15",icon:"🔮",baseStats:{hp:165,mp:130,atk:20,mag:56,def:16,speed:10,move:3,jump:2,evasion:.05,shieldBlock:0},growthPerLevel:{hp:14,mp:14,atk:2,mag:6,def:2,speed:.5},passivePool:["mag_up","mp_up","hp_up","move_up"],skills:[{id:"arcane_bolt",name:"Disparo Arcano",shortName:"Arcano",description:"Projétil rápido de energia arcana com o cajado.",mpCost:0,range:3,aoeRadius:0,aoeShape:"single",multiplier:.9,isBasic:!0,isMagic:!0,element:"dark",jpCost:0,vfxType:"arcane_bolt"},{id:"firaga",name:"Firaga (Explosão Ígnea)",shortName:"Firaga",description:"Coluna de fogo voxelizada em Diamante que incendeia os tiles por 2 turnos.",mpCost:20,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.5,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"blizzaga",name:"Blizzaga (Prisão Glacial)",shortName:"Blizzaga",description:"Espinhos de gelo cristalino brotam do solo em Diamante aplicando Slow (-35% Speed).",mpCost:20,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.45,isMagic:!0,element:"ice",statusEffect:"slow",statusChance:.75,jpCost:0,vfxType:"blizzaga"},{id:"thundaga",name:"Thundaga (Tempestade Arcana)",shortName:"Thundaga",description:"Raios ramificados 3D em Diamante. Causa +35% de dano em água ou metal.",mpCost:22,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"lightning",bonusWaterMetal:.35,jpCost:130,vfxType:"thundaga"},{id:"mana_font",name:"Mana Font (Meditação)",shortName:"Mana Font",description:"Canaliza éter ambiente recuperando 35% do MP máximo.",mpCost:0,range:0,aoeRadius:0,aoeShape:"self",multiplier:0,isBuff:!0,restoreMpPct:.35,element:"dark",jpCost:80,vfxType:"mana_font"}]},dragoon:{id:"dragoon",name:"Cavaleiro Dragão",title:"Lanceiro dos Céus",color:"#0ea5e9",accentColor:"#38bdf8",icon:"🐉",baseStats:{hp:240,mp:60,atk:48,mag:24,def:28,speed:11,move:4,jump:5,evasion:.1,shieldBlock:.1},growthPerLevel:{hp:22,mp:5,atk:5.5,mag:2.5,def:3.5,speed:.6},passivePool:["atk_up","hp_up","move_up","mp_up"],skills:[{id:"long_thrust",name:"Estocada Longa (Partisan)",shortName:"Estocada",description:"Golpe perfurante que alcança até 2 tiles em linha reta sem sofrer contra-ataque.",mpCost:0,range:2,aoeRadius:0,aoeShape:"line2",multiplier:1.15,isBasic:!0,element:"physical",jpCost:0,vfxType:"long_thrust"},{id:"sky_dive",name:"Sky Dive (Salto do Dragão)",shortName:"Sky Dive",description:"Salta aos céus ignorando altura e despenca como meteoro causando 220% de dano e empurrão!",mpCost:15,range:5,aoeRadius:0,aoeShape:"single",multiplier:2.2,ignoresHeight:!0,knockback:1,element:"physical",jpCost:0,vfxType:"sky_dive"},{id:"dragon_breath",name:"Dragon Breath (Sopro Dracônico)",shortName:"Sopro Dragão",description:"Cone frontal de chamas dracônicas que incendeia múltiplos alvos.",mpCost:18,range:2,aoeRadius:1,aoeShape:"cone",multiplier:1.4,isMagic:!0,element:"fire",igniteTiles:1,jpCost:110,vfxType:"dragon_breath"}]},sniper:{id:"sniper",name:"Franco-Atirador",title:"Patrulheiro Real",color:"#10b981",accentColor:"#a3e635",icon:"🏹",baseStats:{hp:190,mp:65,atk:42,mag:22,def:20,speed:12,move:4,jump:4,evasion:.15,shieldBlock:0},growthPerLevel:{hp:17,mp:6,atk:4.5,mag:2.5,def:2.5,speed:.7},passivePool:["atk_up","move_up","hp_up","mp_up"],skills:[{id:"arc_shot",name:"Disparo em Arco",shortName:"Flecha",description:"Tiro parabólico de longo alcance (+1 tile a cada 2 degraus de altura).",mpCost:0,minRange:2,range:6,aoeRadius:0,aoeShape:"single",multiplier:1.1,isBasic:!0,isBow:!0,element:"physical",jpCost:0,vfxType:"arc_shot"},{id:"leg_shot",name:"Leg Shot (Tiro Imobilizador)",shortName:"Leg Shot",description:"Disparo preciso que imobiliza o alvo no próximo turno.",mpCost:12,minRange:1,range:6,aoeRadius:0,aoeShape:"single",multiplier:1.15,isBow:!0,statusEffect:"immobilize",statusChance:.85,element:"physical",jpCost:0,vfxType:"leg_shot"},{id:"arrow_rain",name:"Arrow Rain (Chuva de Flechas)",shortName:"Chuva Flechas",description:"Dezenas de flechas caem dos céus em uma área 3x3.",mpCost:18,minRange:2,range:5,aoeRadius:1,aoeShape:"square3x3",multiplier:1.35,isBow:!0,element:"physical",jpCost:120,vfxType:"arrow_rain"}]},white_mystic:{id:"white_mystic",name:"Clérigo Místico",title:"Guardião do Tempo",color:"#f8fafc",accentColor:"#ef4444",icon:"✨",baseStats:{hp:175,mp:125,atk:22,mag:52,def:18,speed:11,move:3,jump:2,evasion:.08,shieldBlock:0},growthPerLevel:{hp:16,mp:13,atk:2,mag:5.5,def:2.5,speed:.6},passivePool:["mag_up","mp_up","hp_up","move_up"],skills:[{id:"curaga",name:"Curaga (Luz Restauradora)",shortName:"Curaga",description:"Feixe dourado descendente que cura todos os aliados na área em Cruz.",mpCost:16,range:4,aoeRadius:1,aoeShape:"cross",multiplier:1.45,isBasic:!0,isHeal:!0,isMagic:!0,element:"holy",jpCost:0,vfxType:"curaga"},{id:"hastega",name:"Hastega (Aceleração Temporal)",shortName:"Hastega",description:"Engrenagem rúnica sob os aliados que dá +40% Speed e +30 CT imediato.",mpCost:18,range:4,aoeRadius:1,aoeShape:"cross",multiplier:0,isBuff:!0,buffType:"haste",ctBoost:30,speedMult:1.4,element:"holy",jpCost:0,vfxType:"hastega"},{id:"holy",name:"Holy (Luz Suprema)",shortName:"Holy",description:"Esferas de luz convergente com dano sagrado massivo (+40% vs mortos-vivos/chefes).",mpCost:28,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.95,isMagic:!0,element:"holy",bonusUndeadBoss:.4,jpCost:150,vfxType:"holy"},{id:"revive",name:"Revive (Fênix Sagrada)",shortName:"Revive",description:"Ressuscita um aliado caído no tabuleiro com 50% do HP máximo.",mpCost:25,range:3,aoeRadius:0,aoeShape:"single",multiplier:0,isRevive:!0,healPct:.5,element:"holy",jpCost:100,vfxType:"revive"}]},ninja:{id:"ninja",name:"Lâmina das Sombras",title:"Shinobi Carmesim",color:"#dc2626",accentColor:"#a855f7",icon:"🗡️",baseStats:{hp:185,mp:60,atk:45,mag:28,def:19,speed:14,move:5,jump:5,evasion:.22,shieldBlock:.12},growthPerLevel:{hp:16,mp:5,atk:5,mag:3,def:2.5,speed:.8},passivePool:["atk_up","move_up","hp_up","mp_up"],skills:[{id:"dual_strike",name:"Dual Strike (Ataque Duplo)",shortName:"Dual Strike",description:"Golpeia duas vezes em X com lâminas gêmeas.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.35,hits:2,isBasic:!0,element:"physical",jpCost:0,vfxType:"dual_strike"},{id:"shadow_step",name:"Shadow Step (Passo das Sombras)",shortName:"Shadow Step",description:"Teleporta para o tile atrás do inimigo e desfere um Backstab crítico garantido!",mpCost:14,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.4,isShadowStep:!0,guaranteedCrit:!0,element:"dark",jpCost:0,vfxType:"shadow_step"},{id:"poison_kunai",name:"Kunai Venenosa",shortName:"Kunai Veneno",description:"Arremessa shuriken envenenada à distância aplicando Veneno por 3 turnos.",mpCost:8,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.05,statusEffect:"poison",statusChance:.85,element:"physical",jpCost:90,vfxType:"poison_kunai"}]},dark_knight_boss:{id:"dark_knight_boss",name:"Cavaleiro Negro",title:"Capitão Mercenário",color:"#4c1d95",accentColor:"#f43f5e",icon:"💀",baseStats:{hp:340,mp:90,atk:46,mag:36,def:30,speed:11,move:4,jump:3,evasion:.08,shieldBlock:.22},growthPerLevel:{hp:30,mp:8,atk:5,mag:4,def:4,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Corte Sombrio",shortName:"Corte",description:"Golpe pesado com espada negra.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.1,isBasic:!0,knockback:1,element:"dark",jpCost:0,vfxType:"slash"},{id:"shadowblade",name:"Shadowblade (Lâmina Sombria)",shortName:"Shadowblade",description:"Drena energia vital do alvo e restaura 50% do dano em HP!",mpCost:16,range:3,aoeRadius:0,aoeShape:"single",multiplier:1.45,lifestealPct:.5,element:"dark",jpCost:0,vfxType:"shadowblade"}]},dragoon_boss:{id:"dragoon_boss",name:"Comandante Dragoon",title:"Lança de Zeirchele",color:"#0369a1",accentColor:"#fb923c",icon:"🐲",baseStats:{hp:420,mp:95,atk:52,mag:28,def:31,speed:12,move:4,jump:6,evasion:.12,shieldBlock:.12},growthPerLevel:{hp:34,mp:7,atk:5.5,mag:3,def:4,speed:.6},passivePool:[],skills:[{id:"long_thrust",name:"Estocada Imperial",shortName:"Estocada",description:"Perfuração longa de 2 tiles.",mpCost:0,range:2,aoeRadius:0,aoeShape:"line2",multiplier:1.2,isBasic:!0,element:"physical",jpCost:0,vfxType:"long_thrust"},{id:"sky_dive",name:"Sky Dive Imperial",shortName:"Sky Dive",description:"Salto meteórico sobre o alvo.",mpCost:15,range:5,aoeRadius:0,aoeShape:"single",multiplier:1.9,ignoresHeight:!0,knockback:1,element:"physical",jpCost:0,vfxType:"sky_dive"},{id:"dragon_breath",name:"Dragon Breath",shortName:"Sopro Dragão",description:"Cone de chamas.",mpCost:18,range:2,aoeRadius:1,aoeShape:"cone",multiplier:1.35,isMagic:!0,element:"fire",jpCost:0,vfxType:"dragon_breath"}]},archmage_boss:{id:"archmage_boss",name:"Arquimago Glacial",title:"Senhor de Lionel",color:"#0284c7",accentColor:"#bae6fd",icon:"❄️",baseStats:{hp:460,mp:180,atk:26,mag:62,def:26,speed:11,move:3,jump:2,evasion:.1,shieldBlock:0},growthPerLevel:{hp:32,mp:15,atk:2,mag:6.5,def:3,speed:.5},passivePool:[],skills:[{id:"arcane_bolt",name:"Lanço Glacial",shortName:"Arcano",description:"Disparo de gelo.",mpCost:0,range:3,aoeRadius:0,aoeShape:"single",multiplier:1,isBasic:!0,isMagic:!0,element:"ice",jpCost:0,vfxType:"arcane_bolt"},{id:"blizzaga",name:"Blizzaga Supremo",shortName:"Blizzaga",description:"Prisão glacial em área.",mpCost:20,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"ice",statusEffect:"slow",statusChance:.75,jpCost:0,vfxType:"blizzaga"},{id:"thundaga",name:"Tempestade Boreal",shortName:"Thundaga",description:"Raios arcanos em área.",mpCost:22,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.5,isMagic:!0,element:"lightning",bonusWaterMetal:.35,jpCost:0,vfxType:"thundaga"}]},golem_enemy:{id:"golem_enemy",name:"Golem Voxel",title:"Colosso de Pedra",color:"#64748b",accentColor:"#38bdf8",icon:"🗿",baseStats:{hp:310,mp:30,atk:46,mag:14,def:38,speed:8,move:3,jump:2,evasion:0,shieldBlock:.15},growthPerLevel:{hp:28,mp:2,atk:5,mag:1,def:4.5,speed:.3},passivePool:[],skills:[{id:"bash_strike",name:"Esmagamento Sísmico",shortName:"Esmagar",description:"Golpe pesado que arremessa o inimigo.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.2,isBasic:!0,knockback:1,element:"physical",jpCost:0,vfxType:"bash"}]},lich_boss:{id:"lich_boss",name:"Lich Invocador",title:"Soberano do Pântano",color:"#6b21a8",accentColor:"#a3e635",icon:"☠️",baseStats:{hp:520,mp:220,atk:28,mag:68,def:26,speed:12,move:3,jump:3,evasion:.12,shieldBlock:0},growthPerLevel:{hp:36,mp:16,atk:2,mag:7,def:3,speed:.6},passivePool:[],skills:[{id:"arcane_bolt",name:"Toque Necrótico",shortName:"Necrose",description:"Projétil sombrio.",mpCost:0,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.05,isBasic:!0,isMagic:!0,element:"dark",jpCost:0,vfxType:"arcane_bolt"},{id:"firaga",name:"Fogo Fátuo (Firaga)",shortName:"Firaga",description:"Chamas necróticas em área.",mpCost:20,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"shadowblade",name:"Drenar Alma",shortName:"Drenar",description:"Rouba vida à distância.",mpCost:18,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.45,isMagic:!0,lifestealPct:.5,element:"dark",jpCost:0,vfxType:"shadowblade"}]},skeleton_enemy:{id:"skeleton_enemy",name:"Cavaleiro Esqueleto",title:"Legião Profana",color:"#cbd5e1",accentColor:"#22c55e",icon:"🦴",baseStats:{hp:195,mp:40,atk:40,mag:18,def:20,speed:11,move:4,jump:3,evasion:.08,shieldBlock:.12},growthPerLevel:{hp:18,mp:4,atk:4.5,mag:2,def:2.5,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Corte Ósseo",shortName:"Corte",description:"Ataque corpo a corpo.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1,isBasic:!0,element:"physical",jpCost:0,vfxType:"slash"}]},belias_boss:{id:"belias_boss",name:"Belias, o Titã das Cinzas",title:"Arquidemônio Lucavi",color:"#991b1b",accentColor:"#f59e0b",icon:"👹",baseStats:{hp:1150,mp:400,atk:64,mag:72,def:36,speed:12,move:4,jump:4,evasion:.08,shieldBlock:.15},growthPerLevel:{hp:60,mp:20,atk:6,mag:7,def:4,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Garra das Cinzas",shortName:"Garra Titã",description:"Golpe colossal que arremessa o inimigo.",mpCost:0,range:2,aoeRadius:0,aoeShape:"single",multiplier:1.25,isBasic:!0,knockback:1,element:"fire",jpCost:0,vfxType:"bash"},{id:"firaga",name:"Chamas de Zodíaco",shortName:"Zodíaco",description:"Explosão infernal em área.",mpCost:24,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"apocalypse_meteor",name:"Apocalypse Meteor",shortName:"Apocalypse Meteor",description:"Telegrafa uma área 3x3 flamejante que explode 1 turno depois em impacto apocalíptico!",mpCost:35,range:6,aoeRadius:1,aoeShape:"square3x3",multiplier:2.35,isMagic:!0,element:"fire",igniteTiles:3,jpCost:0,vfxType:"apocalypse_meteor"}]}},tl=[{id:"wp_iron_blade",name:"Espada Longa de Ferro",slot:"weapon",tier:1,price:120,allowedJobs:["holy_knight","ninja"],stats:{atk:8},description:"Lâmina confiável forjada para a guarda real (+8 ATK)."},{id:"wp_oak_staff",name:"Cajado de Carvalho Rúnico",slot:"weapon",tier:1,price:120,allowedJobs:["black_mage","white_mystic"],stats:{mag:9,mp:15},description:"Canaliza energia elemental básica (+9 MAG, +15 MP)."},{id:"wp_hunter_bow",name:"Arco Composto de Caça",slot:"weapon",tier:1,price:130,allowedJobs:["sniper"],stats:{atk:9,speed:1},description:"Arco leve de resposta rápida (+9 ATK, +1 SPD)."},{id:"wp_steel_lance",name:"Lança Partisan de Aço",slot:"weapon",tier:1,price:140,allowedJobs:["dragoon"],stats:{atk:10},description:"Lança balanceada para saltos elevados (+10 ATK)."},{id:"wp_mithril_sword",name:"Espada de Mithril",slot:"weapon",tier:2,price:280,allowedJobs:["holy_knight","ninja"],stats:{atk:17,speed:1},description:"Prata élfica afiada e leve (+17 ATK, +1 SPD)."},{id:"wp_ether_staff",name:"Cajado de Éter",slot:"weapon",tier:3,price:440,allowedJobs:["black_mage","white_mystic"],stats:{mag:24,mp:35},description:"Cristal flutuante de éter puro (+24 MAG, +35 MP)."},{id:"wp_elven_bow",name:"Arco Élfico dos Ventos",slot:"weapon",tier:3,price:460,allowedJobs:["sniper"],stats:{atk:22,speed:2,evasion:.05},description:"Disparos silenciosos e letais (+22 ATK, +2 SPD)."},{id:"wp_dragon_whisker",name:"Lança Bigode de Dragão",slot:"weapon",tier:4,price:680,allowedJobs:["dragoon"],stats:{atk:30,jump:1},description:"Lança lendária que amplia o salto (+30 ATK, +1 JUMP)."},{id:"wp_masamune",name:"Katanas Gêmeas Masamune",slot:"weapon",tier:4,price:700,allowedJobs:["ninja"],stats:{atk:28,speed:3,evasion:.08},description:"Lâminas sombrias de velocidade absurda (+28 ATK, +3 SPD)."},{id:"wp_excalibur",name:"Espada Rúnica Excalibur",slot:"weapon",tier:5,price:980,allowedJobs:["holy_knight"],stats:{atk:38,mag:16,speed:2},description:"Relíquia sagrada da Coroa (+38 ATK, +16 MAG, +2 SPD)."},{id:"wp_chaos_rod",name:"Cetro Astral do Apocalipse",slot:"weapon",tier:5,price:960,allowedJobs:["black_mage","white_mystic"],stats:{mag:40,mp:60,speed:1},description:"Amplifica feitiços arcanos e sagrados ao limite (+40 MAG, +60 MP)."},{id:"sh_buckler",name:"Broquel Real",slot:"shield",tier:1,price:110,allowedJobs:["holy_knight","dragoon","ninja"],stats:{def:5,shieldBlock:.08},description:"Escudo compacto (+5 DEF, +8% Bloqueio)."},{id:"sh_crystal_shield",name:"Escudo de Cristal",slot:"shield",tier:3,price:380,allowedJobs:["holy_knight","dragoon"],stats:{def:12,shieldBlock:.14,hp:35},description:"Reflete feixes mágicos e bloqueia golpes (+12 DEF, +14% Bloqueio)."},{id:"sh_aegis",name:"Escudo Égide Divino",slot:"shield",tier:5,price:780,allowedJobs:["holy_knight","dragoon"],stats:{def:20,shieldBlock:.2,hp:70,mag:8},description:"Barreira sagrada impenetrável (+20 DEF, +20% Bloqueio, +70 HP)."},{id:"ar_leather_coat",name:"Brigandina Tática",slot:"armor",tier:1,price:120,stats:{hp:35,def:4},description:"Proteção leve universal (+35 HP, +4 DEF)."},{id:"ar_mage_vest",name:"Manto de Seda Arcana",slot:"armor",tier:2,price:260,stats:{hp:45,mp:30,mag:8,def:5},description:"Tecido encantado com fios de mana (+45 HP, +30 MP, +8 MAG)."},{id:"ar_mithril_plate",name:"Peitoral de Mithril",slot:"armor",tier:3,price:450,stats:{hp:90,def:12},description:"Armadura forjada em liga nobre (+90 HP, +12 DEF)."},{id:"ar_maximilian",name:"Armadura Maximilian Real",slot:"armor",tier:5,price:890,stats:{hp:165,def:20,atk:6},description:"Obra-prima da engenharia de guerra (+165 HP, +20 DEF, +6 ATK)."},{id:"ac_battle_boots",name:"Botas de Couro Reforçadas",slot:"accessory",tier:2,price:240,stats:{jump:1,evasion:.05},description:"Facilita escaladas em degraus altos (+1 JUMP, +5% Esquiva)."},{id:"ac_hermes_boots",name:"Botas de Hermes (+1 Move)",slot:"accessory",tier:4,price:620,stats:{move:1,speed:2},description:"Concede +1 tile de movimento e +2 de Velocidade!"},{id:"ac_angel_ring",name:"Anel da Coroa de Cinzas",slot:"accessory",tier:5,price:880,stats:{hp:80,atk:10,mag:10,speed:2},description:"Relíquia real que fortalece todos os atributos ofensivos."}];function Yd(a,e){return Gt[a]?.skills.find(t=>t.id===e)}function Zi(a){if(a)return tl.find(e=>e.id===a)}function Ph(a){const e=Gt[a.jobId],t=Math.max(0,a.level-1),i={hp:Math.round(e.baseStats.hp+e.growthPerLevel.hp*t),mp:Math.round(e.baseStats.mp+e.growthPerLevel.mp*t),atk:Math.round(e.baseStats.atk+e.growthPerLevel.atk*t),mag:Math.round(e.baseStats.mag+e.growthPerLevel.mag*t),def:Math.round(e.baseStats.def+e.growthPerLevel.def*t),speed:Math.round(e.baseStats.speed+e.growthPerLevel.speed*t),move:e.baseStats.move,jump:e.baseStats.jump,evasion:e.baseStats.evasion,shieldBlock:e.baseStats.shieldBlock};for(const s of a.passiveUpgrades){const r=el[s];r&&(i[r.stat]=i[r.stat]+r.bonus)}const n=[a.equipment.weapon,a.equipment.shield,a.equipment.armor,a.equipment.accessory];for(const s of n){const r=Zi(s);if(r)for(const[o,l]of Object.entries(r.stats)){const c=o;typeof l=="number"&&(i[c]=Number((i[c]+l).toFixed(3)))}}return i.evasion=Math.min(.65,i.evasion),i.shieldBlock=Math.min(.7,i.shieldBlock),i}function Kd(a,e,t=1,i=1){const n=Gt[a],s=Math.max(0,e-1);return{hp:Math.round((n.baseStats.hp+n.growthPerLevel.hp*s)*t),mp:Math.round(n.baseStats.mp+n.growthPerLevel.mp*s),atk:Math.round((n.baseStats.atk+n.growthPerLevel.atk*s)*i),mag:Math.round((n.baseStats.mag+n.growthPerLevel.mag*s)*i),def:Math.round(n.baseStats.def+n.growthPerLevel.def*s),speed:Math.round(n.baseStats.speed+n.growthPerLevel.speed*s),move:n.baseStats.move,jump:n.baseStats.jump,evasion:n.baseStats.evasion,shieldBlock:n.baseStats.shieldBlock}}function ds(a,e,t){const i=[];for(let n=0;n<e;n++)for(let s=0;s<a;s++){const r=t(s,n),o=r.walkable!==void 0?r.walkable:r.surface!=="water"&&r.surface!=="lava"&&!r.prop;i.push({col:s,row:n,height:r.height,surface:r.surface,walkable:o,isStair:r.isStair,isBridge:r.isBridge,prop:r.prop,chest:r.chest})}return i}const En=[{id:1,name:"Ruínas da Abadia de Orbonne",subtitle:"Ato I — Emboscada no Pátio Sagrado",biome:"forest",cols:12,rows:12,goldReward:380,jpReward:95,description:"Pátio da antiga abadia com degraus de pedra, riacho central, escadarias e o Capitão Mercenário Gafgarion protegendo as relíquias.",bossTitle:"Capitão Mercenário Gafgarion",allySpawns:[{col:1,row:9,facing:"N"},{col:2,row:10,facing:"N"},{col:3,row:9,facing:"N"},{col:4,row:10,facing:"N"},{col:5,row:9,facing:"N"}],tiles:ds(12,12,(a,e)=>e===6&&a<=7||e===5&&a>=8?a===3||a===6?{height:2,surface:"wood",isBridge:!0,walkable:!0}:{height:1,surface:"water",walkable:!1}:e<=2?(a===0||a===11)&&e===0?{height:5,surface:"stone",prop:"ruin_wall",walkable:!1}:(a===3||a===8)&&e===1?{height:5,surface:"stone",prop:"torch",walkable:!1}:a===10&&e===1?{height:5,surface:"cobble",chest:{id:"ch_orbonne_1",gold:150,opened:!1,itemId:"ar_leather_coat"}}:{height:4,surface:a>=4&&a<=7?"carpet":"cobble"}:e===3||e===4?a===4||a===7?{height:e===3?3:2,surface:"stone",isStair:!0,walkable:!0}:a===1&&e===4?{height:3,surface:"grass",prop:"tree",walkable:!1}:a===10&&e===3?{height:3,surface:"grass",prop:"tree",walkable:!1}:{height:e===3?3:2,surface:a>=3&&a<=8?"cobble":"grass"}:e===7&&(a===2||a===9)?{height:2,surface:"grass",prop:"tree",walkable:!1}:e===11&&(a===0||a===11)?{height:3,surface:"stone",prop:"pillar",walkable:!1}:a>=8&&e>=8?{height:3,surface:"grass"}:{height:2,surface:a>=2&&a<=5&&e>=8?"cobble":"grass"}),enemies:[{id:"e1_gafgarion",name:"Capitão Gafgarion",jobId:"dark_knight_boss",level:2,col:5,row:2,facing:"S",isBoss:!0,aiRole:"aggressive",hpScale:1},{id:"e1_knight",name:"Mercenário Escudeiro",jobId:"holy_knight",level:1,col:4,row:4,facing:"S",aiRole:"aggressive",hpScale:.72,atkScale:.85},{id:"e1_archer",name:"Besteiro de Orbonne",jobId:"sniper",level:1,col:8,row:3,facing:"S",aiRole:"sniper",hpScale:.72,atkScale:.85},{id:"e1_mage",name:"Acólito Negro",jobId:"black_mage",level:1,col:7,row:1,facing:"S",aiRole:"mage",hpScale:.75,atkScale:.85}]},{id:2,name:"Ponte do Desfiladeiro de Zeirchele",subtitle:"Ato II — Queda nas Cataratas",biome:"canyon",cols:13,rows:12,goldReward:540,jpReward:130,description:"Ponte elevada de pedra sobre um rio caudaloso. Empurrar inimigos das beiradas causa dano massivo de queda!",bossTitle:"Comandante Dragoon Aliste",allySpawns:[{col:1,row:4,facing:"E"},{col:1,row:5,facing:"E"},{col:1,row:6,facing:"E"},{col:2,row:5,facing:"E"},{col:2,row:7,facing:"E"}],tiles:ds(13,12,(a,e)=>a>=5&&a<=7?e>=4&&e<=7?(e===4||e===7)&&(a===5||a===7)?{height:5,surface:"cobble",prop:"torch",walkable:!1}:{height:5,surface:"cobble",isBridge:!0,walkable:!0}:{height:1,surface:"water",walkable:!1}:a<=4?a===4&&(e===2||e===9)?{height:6,surface:"stone",prop:"rock",walkable:!1}:e<=2&&a<=3?{height:6,surface:"stone"}:a===3&&(e===3||e===8)?{height:5,surface:"stone",isStair:!0,walkable:!0}:{height:4,surface:a>=3?"cobble":"stone"}:e<=2&&a>=9?a===11&&e===1?{height:7,surface:"cobble",chest:{id:"ch_zeirchele_1",gold:220,opened:!1,itemId:"ac_battle_boots"}}:{height:7,surface:"cobble"}:e>=9&&a>=9?{height:6,surface:"stone"}:a===9&&(e===3||e===8)?{height:6,surface:"stone",isStair:!0,walkable:!0}:a===12&&(e===4||e===7)?{height:6,surface:"stone",prop:"banner",walkable:!1}:{height:5,surface:"cobble"}),enemies:[{id:"e2_dragoon_boss",name:"Comandante Aliste",jobId:"dragoon_boss",level:3,col:10,row:5,facing:"W",isBoss:!0,aiRole:"aggressive"},{id:"e2_sniper_top",name:"Atirador da Torre Norte",jobId:"sniper",level:2,col:10,row:1,facing:"W",aiRole:"sniper",hpScale:.85},{id:"e2_sniper_bot",name:"Atirador da Torre Sul",jobId:"sniper",level:2,col:10,row:10,facing:"W",aiRole:"sniper",hpScale:.85},{id:"e2_knight",name:"Guarda da Ponte",jobId:"holy_knight",level:2,col:7,row:5,facing:"W",aiRole:"aggressive",hpScale:.9},{id:"e2_cleric",name:"Sacerdote de Campo",jobId:"white_mystic",level:2,col:11,row:6,facing:"W",aiRole:"support"}]},{id:3,name:"Fortaleza Glacial de Lionel",subtitle:"Ato III — Assalto às Muralhas de Gelo",biome:"arctic",cols:13,rows:13,goldReward:720,jpReward:165,description:"Muralhas nevadas imponentes de até 7 degraus e lago congelado propenso a magia elétrica (Thundaga +35%).",bossTitle:"Arquimago Boreal Vormav",allySpawns:[{col:4,row:11,facing:"N"},{col:5,row:11,facing:"N"},{col:6,row:11,facing:"N"},{col:7,row:11,facing:"N"},{col:8,row:11,facing:"N"}],tiles:ds(13,13,(a,e)=>e<=2?(a===2||a===10)&&e===1?{height:7,surface:"cobble",prop:"crystal",walkable:!1}:a===6&&e===0?{height:7,surface:"carpet",prop:"banner",walkable:!1}:{height:6,surface:a>=5&&a<=7?"carpet":"cobble"}:e===3?a===3||a===9?{height:5,surface:"stone",isStair:!0,walkable:!0}:a===6?{height:4,surface:"metal",isStair:!0,walkable:!0}:{height:7,surface:"cobble",prop:"ruin_wall",walkable:!1}:e>=5&&e<=7&&(a<=3||a>=9)?{height:3,surface:"ice",walkable:!0}:e===4&&a===1?{height:4,surface:"snow",chest:{id:"ch_lionel_1",gold:280,opened:!1,itemId:"wp_ether_staff"}}:(a===1||a===11)&&e===9?{height:3,surface:"snow",prop:"pine",walkable:!1}:(a===4||a===8)&&e===6?{height:4,surface:"stone",prop:"torch",walkable:!1}:e>=4&&e<=8&&a>=5&&a<=7?{height:3,surface:"cobble"}:{height:e>=9?2:3,surface:"snow"}),enemies:[{id:"e3_archmage",name:"Arquimago Vormav",jobId:"archmage_boss",level:4,col:6,row:1,facing:"S",isBoss:!0,aiRole:"mage"},{id:"e3_golem_l",name:"Golem Rúnico Alfa",jobId:"golem_enemy",level:4,col:4,row:5,facing:"S",aiRole:"aggressive"},{id:"e3_golem_r",name:"Golem Rúnico Beta",jobId:"golem_enemy",level:4,col:8,row:5,facing:"S",aiRole:"aggressive"},{id:"e3_sniper",name:"Vigília da Muralha",jobId:"sniper",level:3,col:1,row:2,facing:"S",aiRole:"sniper"},{id:"e3_ninja",name:"Assassino de Lionel",jobId:"ninja",level:3,col:10,row:4,facing:"S",aiRole:"aggressive"}]},{id:4,name:"Pântano das Ruínas Proibidas",subtitle:"Ato IV — O Despertar do Lich",biome:"swamp",cols:13,rows:13,goldReward:940,jpReward:210,description:"Terreno alagado que dobra o custo de movimento. Plataformas antigas ligam o altar do Lich Invocador. Magia Holy causa +40% de dano!",bossTitle:"Lich Invocador Malakor",allySpawns:[{col:2,row:11,facing:"N"},{col:4,row:11,facing:"N"},{col:6,row:11,facing:"N"},{col:8,row:11,facing:"N"},{col:10,row:11,facing:"N"}],tiles:ds(13,13,(a,e)=>e<=2&&a>=4&&a<=8?(a===4||a===8)&&e===1?{height:5,surface:"obsidian",prop:"crystal",walkable:!1}:{height:4,surface:"obsidian"}:(a===3||a===9)&&e>=3&&e<=9?e===6&&a===3?{height:3,surface:"stone",prop:"statue",walkable:!1}:e===4&&a===9?{height:3,surface:"cobble",chest:{id:"ch_swamp_1",gold:350,opened:!1,itemId:"ac_hermes_boots"}}:{height:3,surface:"cobble"}:a===6&&e>=3&&e<=10?{height:2,surface:"stone"}:a<=1&&e<=4||a>=11&&e<=4?{height:1,surface:"water",walkable:!1}:e>=10?{height:2,surface:"stone"}:a===1&&e===8||a===11&&e===8?{height:2,surface:"swamp",prop:"tree",walkable:!1}:{height:1,surface:"swamp",walkable:!0}),enemies:[{id:"e4_lich",name:"Lich Malakor",jobId:"lich_boss",level:5,col:6,row:1,facing:"S",isBoss:!0,isUndead:!0,aiRole:"mage"},{id:"e4_skel1",name:"Guardião Ósseo",jobId:"skeleton_enemy",level:4,col:3,row:4,facing:"S",isUndead:!0,aiRole:"aggressive"},{id:"e4_skel2",name:"Sentinela Óssea",jobId:"skeleton_enemy",level:4,col:9,row:5,facing:"S",isUndead:!0,aiRole:"aggressive"},{id:"e4_mage",name:"Necromante Sombrio",jobId:"black_mage",level:4,col:5,row:2,facing:"S",isUndead:!0,aiRole:"mage"},{id:"e4_ninja",name:"Espectro das Sombras",jobId:"ninja",level:4,col:7,row:4,facing:"S",isUndead:!0,aiRole:"aggressive"}]},{id:5,name:"Santuário do Trono das Cinzas",subtitle:"Ato Final — O Trono do Arquidemônio Lucavi",biome:"volcanic",cols:14,rows:14,goldReward:1800,jpReward:350,description:"Catedral vulcânica cercada por fissuras de lava. Enfrente o colossal Arquidemônio Belias (2x2) e esquive do Apocalypse Meteor!",bossTitle:"Arquidemônio Lucavi: Belias, o Titã das Cinzas",allySpawns:[{col:4,row:12,facing:"N"},{col:5,row:12,facing:"N"},{col:6,row:12,facing:"N"},{col:7,row:12,facing:"N"},{col:9,row:12,facing:"N"}],tiles:ds(14,14,(a,e)=>(a<=1||a>=12)&&e>=2&&e<=11||e>=6&&e<=7&&(a===3||a===10)?{height:1,surface:"lava",walkable:!1}:e<=4&&a>=4&&a<=9?(a===4||a===9)&&e===0?{height:7,surface:"obsidian",prop:"brazier",walkable:!1}:(a===4||a===9)&&e===4?{height:6,surface:"obsidian",prop:"pillar",walkable:!1}:{height:6,surface:a>=5&&a<=8?"carpet":"obsidian"}:(e===5||e===6)&&a>=5&&a<=8?{height:e===5?5:4,surface:"stone",isStair:!0,walkable:!0}:a===2&&e===4?{height:4,surface:"obsidian",chest:{id:"ch_ashes_1",gold:500,opened:!1,itemId:"wp_excalibur"}}:(a===2||a===11)&&e===9?{height:3,surface:"obsidian",prop:"brazier",walkable:!1}:(a===4||a===9)&&e===9?{height:3,surface:"obsidian",prop:"crystal",walkable:!1}:e>=7&&e<=10?{height:3,surface:a>=5&&a<=8?"carpet":"obsidian"}:{height:2,surface:"obsidian"}),enemies:[{id:"e5_belias",name:"Belias, o Titã das Cinzas",jobId:"belias_boss",level:6,col:6,row:1,facing:"S",isBoss:!0,isUndead:!0,footprint:2,aiRole:"boss_belias"},{id:"e5_knight_l",name:"Templário das Cinzas",jobId:"dark_knight_boss",level:5,col:3,row:5,facing:"S",aiRole:"aggressive",hpScale:.78},{id:"e5_mage_r",name:"Invocador Lucavi",jobId:"black_mage",level:5,col:10,row:5,facing:"S",aiRole:"mage",hpScale:1.05},{id:"e5_dragoon",name:"Guarda Dracônico",jobId:"dragoon",level:5,col:8,row:7,facing:"S",aiRole:"aggressive"},{id:"e5_cleric",name:"Oráculo Profano",jobId:"white_mystic",level:5,col:5,row:3,facing:"S",aiRole:"support"}]}];function jd(a){return En.find(e=>e.id===a)??En[0]}class Jd{ctx=null;masterGain=null;musicGain=null;sfxGain=null;muted=!1;bgmTimer=null;stepIdx=0;melodyNotes=[62,65,69,67,65,64,62,57,60,62,65,69,72,69,67,64];bassNotes=[38,38,41,41,43,43,45,45,36,36,38,38,41,40,38,33];ensureContext(){if(typeof window>"u")return null;if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:.72,this.masterGain.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.22,this.musicGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.65,this.sfxGain.connect(this.masterGain)}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}unlockAndStartMusic(){!this.ensureContext()||this.bgmTimer!==null||(this.bgmTimer=window.setInterval(()=>{this.muted||!this.ctx||this.ctx.state!=="running"||this.playBgmBeat()},340))}toggleMute(){return this.muted=!this.muted,this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(this.muted?0:.72,this.ctx.currentTime,.03),this.muted}isMuted(){return this.muted}midiToFreq(e){return 440*Math.pow(2,(e-69)/12)}playTone(e,t,i,n,s,r,o=0){const l=this.ctx;if(!l||!s||this.muted)return;const c=l.currentTime+o,h=l.createOscillator(),d=l.createGain();h.type=i,h.frequency.setValueAtTime(e,c),r!==void 0&&h.frequency.exponentialRampToValueAtTime(Math.max(20,r),c+t),d.gain.setValueAtTime(1e-4,c),d.gain.linearRampToValueAtTime(n,c+.015),d.gain.exponentialRampToValueAtTime(1e-4,c+t),h.connect(d),d.connect(s),h.start(c),h.stop(c+t+.02)}playNoise(e,t,i,n="bandpass"){const s=this.ensureContext();if(!s||!this.sfxGain||this.muted)return;const r=Math.floor(s.sampleRate*e),o=s.createBuffer(1,r,s.sampleRate),l=o.getChannelData(0);for(let u=0;u<r;u++)l[u]=(Math.random()*2-1)*(1-u/r);const c=s.createBufferSource();c.buffer=o;const h=s.createBiquadFilter();h.type=n,h.frequency.value=t;const d=s.createGain();d.gain.setValueAtTime(i,s.currentTime),d.gain.exponentialRampToValueAtTime(.001,s.currentTime+e),c.connect(h),h.connect(d),d.connect(this.sfxGain),c.start()}playBgmBeat(){const e=this.stepIdx%this.melodyNotes.length;this.stepIdx++;const t=this.midiToFreq(this.melodyNotes[e]),i=this.midiToFreq(this.bassNotes[e]);this.playTone(t,.31,"triangle",.22,this.musicGain),e%2===0&&(this.playTone(i,.65,"sawtooth",.09,this.musicGain),this.playTone(i*1.5,.62,"sine",.12,this.musicGain))}playUiConfirm(){this.ensureContext(),this.playTone(587.33,.09,"triangle",.16,this.sfxGain,880)}playUiCancel(){this.ensureContext(),this.playTone(392,.11,"triangle",.14,this.sfxGain,261.6)}playStep(){this.ensureContext(),this.playNoise(.06,950,.22,"lowpass"),this.playTone(135,.05,"triangle",.1,this.sfxGain,80)}playShieldBlock(){this.ensureContext(),this.playTone(520,.16,"square",.18,this.sfxGain,260),this.playTone(1040,.12,"triangle",.14,this.sfxGain,760)}playCriticalHit(){this.ensureContext(),this.playNoise(.24,1400,.42,"highpass"),this.playTone(210,.22,"sawtooth",.26,this.sfxGain,65),this.playTone(880,.2,"triangle",.2,this.sfxGain,1320,.04)}playSkillSfx(e){switch(this.ensureContext(),e.vfxType){case"firaga":case"dragon_breath":case"apocalypse_meteor":this.playNoise(.55,420,.5,"lowpass"),this.playTone(150,.45,"sawtooth",.28,this.sfxGain,48);break;case"blizzaga":this.playNoise(.32,3200,.38,"highpass"),this.playTone(1320,.22,"sine",.2,this.sfxGain,1960),this.playTone(1760,.18,"triangle",.16,this.sfxGain,980,.08);break;case"thundaga":case"hallowed_bolt":this.playNoise(.38,1900,.45,"bandpass"),this.playTone(460,.3,"sawtooth",.25,this.sfxGain,95);break;case"arc_shot":case"leg_shot":case"arrow_rain":this.playNoise(.18,2100,.3,"bandpass"),this.playTone(680,.14,"triangle",.18,this.sfxGain,260);break;case"curaga":case"revive":case"hastega":case"mana_font":case"aegis":this.playTone(523.25,.24,"sine",.18,this.sfxGain),this.playTone(659.25,.24,"sine",.18,this.sfxGain,void 0,.07),this.playTone(783.99,.35,"triangle",.18,this.sfxGain,void 0,.14);break;case"holy":case"judgment_blade":this.playTone(659.25,.32,"triangle",.22,this.sfxGain),this.playTone(987.77,.38,"sine",.22,this.sfxGain,void 0,.08),this.playNoise(.28,2500,.32,"highpass");break;default:this.playNoise(.14,2400,.34,"highpass"),this.playTone(340,.14,"sawtooth",.22,this.sfxGain,110);break}}playVictoryFanfare(){this.ensureContext();const e=[523.25,523.25,523.25,659.25,587.33,659.25,783.99],t=[0,.14,.28,.42,.65,.8,.96],i=[.12,.12,.12,.2,.12,.14,.65];for(let n=0;n<e.length;n++)this.playTone(e[n],i[n],"triangle",.26,this.sfxGain,void 0,t[n]),this.playTone(e[n]*.5,i[n],"sawtooth",.12,this.sfxGain,void 0,t[n])}playDefeatChord(){this.ensureContext(),this.playTone(220,.6,"sawtooth",.2,this.sfxGain,165),this.playTone(261.6,.65,"triangle",.18,this.sfxGain,196,.12)}}const Ih=1,dr="crown_of_ashes_save_v1",ql="crown_of_ashes_save_v1_bak";class Zd{map=new Map;getItem(e){return this.map.get(e)??null}setItem(e,t){this.map.set(e,t)}removeItem(e){this.map.delete(e)}}function Qd(){try{if(typeof globalThis<"u"&&"localStorage"in globalThis&&globalThis.localStorage)return globalThis.localStorage}catch{}return new Zd}function $l(){return{version:Ih,gold:460,unlockedStage:1,completedStages:[],inventory:["ac_battle_boots"],roster:[{uid:"hero_ramza",name:"Ramza",jobId:"holy_knight",level:1,exp:0,jp:120,unlockedSkills:["bash_strike","judgment_blade"],passiveUpgrades:[],equipment:{weapon:"wp_iron_blade",shield:"sh_buckler",armor:"ar_leather_coat",accessory:null},deployed:!0},{uid:"hero_vivi",name:"Orlan",jobId:"black_mage",level:1,exp:0,jp:120,unlockedSkills:["arcane_bolt","firaga","blizzaga"],passiveUpgrades:[],equipment:{weapon:"wp_oak_staff",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_kain",name:"Kain",jobId:"dragoon",level:1,exp:0,jp:120,unlockedSkills:["long_thrust","sky_dive"],passiveUpgrades:[],equipment:{weapon:"wp_steel_lance",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_agrias",name:"Lyra",jobId:"sniper",level:1,exp:0,jp:120,unlockedSkills:["arc_shot","leg_shot"],passiveUpgrades:[],equipment:{weapon:"wp_hunter_bow",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_alma",name:"Alma",jobId:"white_mystic",level:1,exp:0,jp:120,unlockedSkills:["curaga","hastega"],passiveUpgrades:[],equipment:{weapon:"wp_oak_staff",shield:null,armor:null,accessory:null},deployed:!0}],selectedStageId:1}}class eu{storage;data;constructor(e){this.storage=e??Qd(),this.data=this.load()}validate(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.version=="number"&&t.version<=Ih&&typeof t.gold=="number"&&typeof t.unlockedStage=="number"&&Array.isArray(t.completedStages)&&Array.isArray(t.inventory)&&Array.isArray(t.roster)&&t.roster.length>0}load(){for(const t of[dr,ql])try{const i=this.storage.getItem(t);if(!i)continue;const n=JSON.parse(i);if(this.validate(n))return n}catch{}const e=$l();return this.data=e,this.save(),e}save(){try{const e=this.storage.getItem(dr);e&&this.storage.setItem(ql,e),this.storage.setItem(dr,JSON.stringify(this.data))}catch{}}resetCampaign(){return this.data=$l(),this.save(),this.data}getData(){return this.data}getHero(e){return this.data.roster.find(t=>t.uid===e)}getDeployedHeroes(){return this.data.roster.filter(e=>e.deployed).slice(0,5)}selectStage(e){return e<1||e>En.length||e>this.data.unlockedStage?!1:(this.data.selectedStageId=e,this.save(),!0)}addGold(e){return this.data.gold=Math.max(0,this.data.gold+Math.round(e)),this.save(),this.data.gold}addInventoryItem(e){Zi(e)&&(this.data.inventory.push(e),this.save())}buyEquipment(e){const t=Zi(e);return t?this.data.gold<t.price?{ok:!1,reason:`Ouro insuficiente (precisa ${t.price} 🪙).`}:(this.data.gold-=t.price,this.data.inventory.push(t.id),this.save(),{ok:!0}):{ok:!1,reason:"Equipamento inválido."}}equipItem(e,t){const i=this.getHero(e),n=Zi(t);if(!i||!n)return{ok:!1,reason:"Herói ou item inválido."};if(n.allowedJobs&&!n.allowedJobs.includes(i.jobId))return{ok:!1,reason:`${Gt[i.jobId].name} não pode equipar ${n.name}.`};const s=this.data.inventory.indexOf(t);if(s===-1)return{ok:!1,reason:"Item não está no inventário."};this.data.inventory.splice(s,1);const r=i.equipment[n.slot];return r&&this.data.inventory.push(r),i.equipment[n.slot]=n.id,this.save(),{ok:!0}}unequipSlot(e,t){const i=this.getHero(e);if(!i)return!1;const n=i.equipment[t];return n?(i.equipment[t]=null,this.data.inventory.push(n),this.save(),!0):!1}recruitHero(e,t){if(this.data.gold<220)return{ok:!1,reason:"Recrutamento custa 220 🪙 Ouro."};const n=Gt[e],s={holy_knight:["Agrias","Delita","Cid"],black_mage:["Vivi","Lulu","Alaric"],dragoon:["Freya","Aranea","Estinien"],sniper:["Mustadio","Balthier","Viera"],white_mystic:["Ovelia","Aeris","Celia"],ninja:["Edge","Shadow","Yuffie"]},r=new Set(this.data.roster.map(d=>d.name)),o=t??s[e].find(d=>!r.has(d))??`${n.name.split(" ")[0]} #${this.data.roster.length+1}`,l=n.skills.filter(d=>d.jpCost===0).map(d=>d.id),c=this.data.roster.filter(d=>d.deployed).length,h={uid:`hero_${e}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,name:o,jobId:e,level:1,exp:0,jp:90,unlockedSkills:l,passiveUpgrades:[],equipment:{weapon:null,shield:null,armor:null,accessory:null},deployed:c<5};return this.data.gold-=220,this.data.roster.push(h),this.save(),{ok:!0,hero:h}}toggleDeployHero(e){const t=this.getHero(e);if(!t)return{ok:!1,reason:"Herói não encontrado."};const i=this.data.roster.filter(n=>n.deployed).length;if(t.deployed){if(i<=1)return{ok:!1,reason:"Pelo menos 1 herói deve ir para a batalha."};t.deployed=!1}else{if(i>=5)return{ok:!1,reason:"Limite máximo de 5 heróis em campo."};t.deployed=!0}return this.save(),{ok:!0}}unlockSkillWithJP(e,t){const i=this.getHero(e);if(!i)return{ok:!1,reason:"Herói não encontrado."};if(i.unlockedSkills.includes(t))return{ok:!1,reason:"Habilidade já desbloqueada."};const n=Yd(i.jobId,t);return n?i.jp<n.jpCost?{ok:!1,reason:`JP insuficiente (precisa ${n.jpCost} ⭐).`}:(i.jp-=n.jpCost,i.unlockedSkills.push(n.id),this.save(),{ok:!0}):{ok:!1,reason:"Habilidade inválida."}}upgradePassiveWithJP(e,t){const i=this.getHero(e),n=el[t];return!i||!n?{ok:!1,reason:"Dados inválidos."}:i.passiveUpgrades.includes(t)?{ok:!1,reason:"Melhoria passiva já adquirida."}:i.jp<n.jpCost?{ok:!1,reason:`JP insuficiente (precisa ${n.jpCost} ⭐).`}:(i.jp-=n.jpCost,i.passiveUpgrades.push(t),this.save(),{ok:!0})}awardActionEXPAndJP(e,t,i){if(!e)return{leveledUp:!1,newLevel:1};const n=this.getHero(e);if(!n)return{leveledUp:!1,newLevel:1};n.exp+=Math.max(0,Math.round(t)),n.jp+=Math.max(0,Math.round(i));let s=!1;for(;n.exp>=n.level*100&&n.level<30;)n.exp-=n.level*100,n.level+=1,s=!0;return this.save(),{leveledUp:s,newLevel:n.level}}completeStage(e,t=0,i=0){const n=En.find(o=>o.id===e)??En[0],s=n.goldReward+t,r=n.jpReward+i;this.data.gold+=s,this.data.completedStages.includes(e)||this.data.completedStages.push(e),e>=this.data.unlockedStage&&e<En.length&&(this.data.unlockedStage=e+1,this.data.selectedStageId=this.data.unlockedStage);for(const o of this.data.roster)o.deployed?this.awardActionEXPAndJP(o.uid,85,r):o.jp+=Math.round(r*.4);return this.save(),{goldEarned:s,jpEarned:r,unlockedStage:this.data.unlockedStage}}getEquipmentCatalog(){return tl}}function kt(a,e){return`${a},${e}`}function Zn(a,e,t,i){return Math.abs(a-t)+Math.abs(e-i)}function Lh(a){switch(a){case"N":return{dc:0,dr:-1};case"S":return{dc:0,dr:1};case"E":return{dc:1,dr:0};case"W":return{dc:-1,dr:0}}}function As(a,e,t="S"){return a===0&&e===0?t:Math.abs(a)>=Math.abs(e)?a>=0?"E":"W":e>=0?"S":"N"}function Dh(a){return a.footprint===2?[{col:a.col,row:a.row},{col:a.col+1,row:a.row},{col:a.col,row:a.row+1},{col:a.col+1,row:a.row+1}]:[{col:a.col,row:a.row}]}function Yl(a,e,t){return a.hp<=0?!1:Dh(a).some(i=>i.col===e&&i.row===t)}function ri(a,e){return a.statuses.some(t=>t.id===e&&t.turns>0)}function La(a){let e=a.speed;return ri(a,"haste")&&(e*=1.4),ri(a,"slow")&&(e*=.65),Math.max(1,Number(e.toFixed(2)))}function ur(a){let e=a.def;return ri(a,"aegis")&&(e*=1.4),Math.round(e)}function Nh(a,e,t,i,n){const s=a-t,r=e-i;if(s===0&&r===0)return"FRONT";const o=Lh(n),l=s*o.dc+r*o.dr,c=Math.abs(s*-o.dr+r*o.dc);return l>=c?"FRONT":-l>=c?"BACK":"SIDE"}function tu(a){switch(a){case"BACK":return{damageMult:1.5,critBonus:.3,evasionMult:0,ignoresShield:!0,label:"🗡️ COSTAS (+50%)"};case"SIDE":return{damageMult:1.25,critBonus:.05,evasionMult:.5,ignoresShield:!0,label:"⚔️ FLANCO (+25%)"};default:return{damageMult:1,critBonus:0,evasionMult:1,ignoresShield:!1,label:"🛡️ FRONTAL"}}}function iu(a,e){return a<=e?0:Math.min(.4,(a-e)*.1)}function nu(a,e,t){let i=a.range;return a.isBow&&e>t&&(i+=Math.floor((e-t)/2)),i}function su(a){const e=a.filter(n=>n.hp>0);if(e.length===0)return null;const t=n=>n.sort((s,r)=>{if(r.ct!==s.ct)return r.ct-s.ct;const o=La(r)-La(s);return o!==0?o:s.team!==r.team?s.team==="ally"?-1:1:s.id.localeCompare(r.id)}),i=e.filter(n=>n.ct>=100&&!ri(n,"stop"));if(i.length>0)return t(i),i[0];for(let n=0;n<500;n++){for(const r of e)ri(r,"stop")?r.ct+=0:r.ct+=La(r);const s=e.filter(r=>r.ct>=100&&!ri(r,"stop"));if(s.length>0)return t(s),s[0];if(e.every(r=>ri(r,"stop")))for(const r of e)r.statuses=r.statuses.filter(o=>o.id!=="stop")}return e[0]}function au(a,e,t){return!e&&!t?a.ct=40:e!==t?a.ct=20:a.ct=0,a.ct}function ru(a,e=10,t){const i=a.filter(r=>r.hp>0&&!t?.assumeDefeatedIds?.includes(r.id)).map(r=>{let o=r.ct,l=La(r);return t?.activeUnitId===r.id&&t.activeUnitEndCt!==void 0&&(o=t.activeUnitEndCt),t?.targetUnitIds.includes(r.id)&&(t.ctDelta&&(o+=t.ctDelta),t.speedMult&&(l=Math.max(1,l*t.speedMult))),{unitId:r.id,name:r.name,jobId:r.jobId,team:r.team,isBoss:r.isBoss,ct:o,speed:l,stopped:ri(r,"stop")}});if(i.length===0)return[];const n=[];let s=0;for(;n.length<e&&s<400;){const r=i.filter(o=>o.ct>=100&&!o.stopped);if(r.length>0){r.sort((l,c)=>c.ct!==l.ct?c.ct-l.ct:c.speed!==l.speed?c.speed-l.speed:l.team!==c.team?l.team==="ally"?-1:1:l.unitId.localeCompare(c.unitId));const o=r[0];n.push({unitId:o.unitId,name:o.name,jobId:o.jobId,team:o.team,isBoss:o.isBoss,ticksUntilTurn:s,turnOrder:n.length+1}),o.ct-=100;continue}s++;for(const o of i)o.stopped||(o.ct+=o.speed);if(i.every(o=>o.stopped))break}return n}function ou(a,e,t,i,n){const s=new Map;if(ri(i,"immobilize"))return s.set(kt(i.col,i.row),{col:i.col,row:i.row,cost:0,path:[{col:i.col,row:i.row}]}),s;const r=i.footprint??1,o=i.move,l=i.jump,c=(p,v)=>{for(let g=0;g<r;g++)for(let m=0;m<r;m++){const x=p+g,S=v+m;if(x<0||x>=e||S<0||S>=t)return!1;const M=a.get(kt(x,S));if(!M||!M.walkable)return!1;const y=n.find(w=>w.id!==i.id&&w.hp>0&&Yl(w,x,S));if(y&&y.team!==i.team)return!1}return!0},h=(p,v)=>{for(let g=0;g<r;g++)for(let m=0;m<r;m++)if(n.find(S=>S.id!==i.id&&S.hp>0&&Yl(S,p+g,v+m)))return!1;return!0},d=new Map,u=[{col:i.col,row:i.row,cost:0,path:[{col:i.col,row:i.row}]}];d.set(kt(i.col,i.row),0),s.set(kt(i.col,i.row),u[0]);const f=[{dc:0,dr:-1},{dc:0,dr:1},{dc:1,dr:0},{dc:-1,dr:0}];for(;u.length>0;){u.sort((g,m)=>g.cost-m.cost);const p=u.shift(),v=a.get(kt(p.col,p.row));if(v)for(const g of f){const m=p.col+g.dc,x=p.row+g.dr;if(!c(m,x))continue;const S=a.get(kt(m,x));if(!S||Math.abs(S.height-v.height)>l)continue;const y=S.surface==="swamp"?2:1,w=p.cost+y;if(w>o)continue;const _=kt(m,x),b=d.get(_);if(b===void 0||w<b){d.set(_,w);const P={col:m,row:x,cost:w,path:[...p.path,{col:m,row:x}]};u.push(P),h(m,x)&&s.set(_,P)}}}return s}class lu{stage;tiles;units;activeUnitId=null;turnCount=0;combatEnded=null;rng;constructor(e,t,i=Math.random){this.stage=e,this.rng=i,this.tiles=new Map;for(const r of e.tiles)this.tiles.set(kt(r.col,r.row),{...r,chest:r.chest?{...r.chest}:void 0,burningTurns:0});this.units=[];const n=t.filter(r=>r.deployed).slice(0,5);(n.length>0?n:t.slice(0,5)).forEach((r,o)=>{const l=e.allySpawns[o%e.allySpawns.length],c=Ph(r);this.units.push({id:`ally_${r.uid}`,rosterUid:r.uid,name:r.name,jobId:r.jobId,team:"ally",level:r.level,col:l.col,row:l.row,facing:l.facing,hp:c.hp,maxHp:c.hp,mp:c.mp,maxMp:c.mp,atk:c.atk,mag:c.mag,def:c.def,speed:c.speed,move:c.move,jump:c.jump,evasion:c.evasion,shieldBlock:c.shieldBlock,ct:20+c.speed*2,footprint:1,unlockedSkills:[...r.unlockedSkills],statuses:[],hasMovedThisTurn:!1,hasActedThisTurn:!1})});for(const r of e.enemies){const o=Kd(r.jobId,r.level,r.hpScale??1,r.atkScale??1),l=Gt[r.jobId];this.units.push({id:r.id,name:r.name,jobId:r.jobId,team:"enemy",level:r.level,col:r.col,row:r.row,facing:r.facing,hp:o.hp,maxHp:o.hp,mp:o.mp,maxMp:o.mp,atk:o.atk,mag:o.mag,def:o.def,speed:o.speed,move:o.move,jump:o.jump,evasion:o.evasion,shieldBlock:o.shieldBlock,ct:10+o.speed*2,isBoss:r.isBoss,isUndead:r.isUndead,footprint:r.footprint??1,bossPhase:r.isBoss?1:void 0,unlockedSkills:l.skills.map(c=>c.id),statuses:[],aiRole:r.aiRole,hasMovedThisTurn:!1,hasActedThisTurn:!1,pendingMeteor:null})}}getTile(e,t){return this.tiles.get(kt(e,t))}getUnit(e){if(e)return this.units.find(t=>t.id===e)}getUnitAt(e,t,i=!1){return this.units.find(n=>!i&&n.hp<=0?!1:Dh(n).some(s=>s.col===e&&s.row===t))}getActiveUnit(){return this.getUnit(this.activeUnitId)}startNextTurn(){return this.advanceToNextTurn()}advanceToNextTurn(){if(this.checkVictoryCondition(),this.combatEnded)return this.activeUnitId=null,{activeUnit:null,burnDamageEvents:[],poisonDamageEvents:[]};const e=su(this.units);if(!e)return this.activeUnitId=null,{activeUnit:null,burnDamageEvents:[],poisonDamageEvents:[]};this.activeUnitId=e.id,e.hasMovedThisTurn=!1,e.hasActedThisTurn=!1,this.turnCount++,e.mp=Math.min(e.maxMp,e.mp+4);const t=[],i=[];if(ri(e,"poison")){const r=Math.max(10,Math.round(e.maxHp*.08));e.hp=Math.max(0,e.hp-r),t.push({unitId:e.id,damage:r,killed:e.hp<=0})}const n=this.getTile(e.col,e.row);if(n&&(n.burningTurns??0)>0&&e.hp>0){const r=Math.max(12,Math.round(e.maxHp*.07));e.hp=Math.max(0,e.hp-r),n.burningTurns=Math.max(0,(n.burningTurns??1)-1),i.push({unitId:e.id,damage:r,killed:e.hp<=0})}for(const r of e.statuses)r.turns-=1;e.statuses=e.statuses.filter(r=>r.turns>0);let s;if(e.hp>0&&e.pendingMeteor){const r=e.pendingMeteor;e.pendingMeteor=null;const o=[],l=this.getAoeTiles(r.centerCol,r.centerRow,{...Gt.belias_boss.skills[2]});for(const c of l){const h=this.getTile(c.col,c.row);h&&(h.burningTurns=2);const d=this.getUnitAt(c.col,c.row);if(d&&d.team==="ally"&&d.hp>0){const u=Math.max(25,Math.round(r.power*(100/(100+ur(d)))));d.hp=Math.max(0,d.hp-u),o.push({targetId:d.id,damage:u,killed:d.hp<=0})}}s={centerCol:r.centerCol,centerRow:r.centerRow,hits:o}}return e.hp<=0?(this.checkVictoryCondition(),this.combatEnded?(this.activeUnitId=null,{activeUnit:null,burnDamageEvents:i,poisonDamageEvents:t,detonatedMeteor:s}):this.advanceToNextTurn()):(this.checkVictoryCondition(),{activeUnit:e,burnDamageEvents:i,poisonDamageEvents:t,detonatedMeteor:s})}canUnitMove(e){return e.hp<=0||e.hasMovedThisTurn||e.move<=0||ri(e,"immobilize")?!1:this.getMoveRange(e).size>1}getPostActionState(e){const t=this.checkVictoryCondition();return t==="victory"?"VICTORY":t==="defeat"?"DEFEAT":e.hasActedThisTurn?!e.hasMovedThisTurn&&this.canUnitMove(e)?"CONTINUE_TURN":"SELECT_FACING":e.hasMovedThisTurn&&this.getAvailableSkills(e).length===0?"SELECT_FACING":"CONTINUE_TURN"}endUnitTurn(e){const t=this.getActiveUnit();if(!t)return 0;e&&(t.facing=e);const i=au(t,t.hasMovedThisTurn,t.hasActedThisTurn);return t.hasMovedThisTurn=!1,t.hasActedThisTurn=!1,this.activeUnitId=null,this.checkVictoryCondition(),i}endTurn(e){return this.endUnitTurn(e)}getMoveRange(e){return ou(this.tiles,this.stage.cols,this.stage.rows,e,this.units)}moveUnit(e,t,i){if(!this.getMoveRange(e).get(kt(t,i)))return{moved:!1};(t!==e.col||i!==e.row)&&(e.facing=As(t-e.col,i-e.row,e.facing)),e.col=t,e.row=i,e.hasMovedThisTurn=!0;let r;if(e.team==="ally"){const o=this.getTile(t,i);o?.chest&&!o.chest.opened&&(o.chest.opened=!0,r={id:o.chest.id,gold:o.chest.gold,itemId:o.chest.itemId})}return{moved:!0,openedChest:r}}getAvailableSkills(e){const t=Gt[e.jobId],i=ri(e,"silence");return t.skills.filter(n=>!(!e.unlockedSkills.includes(n.id)&&!n.isBasic||i&&n.isMagic))}getSkillTargetableTiles(e,t){if(t.aoeShape==="self")return[{col:e.col,row:e.row}];const n=this.getTile(e.col,e.row)?.height??1,s=t.minRange??1,r=[];for(let o=0;o<this.stage.rows;o++)for(let l=0;l<this.stage.cols;l++){const c=this.getTile(l,o);if(!c)continue;if(t.aoeShape==="line2"){const u=Math.abs(l-e.col),f=Math.abs(o-e.row);if(!(u===0&&f>=1&&f<=2||f===0&&u>=1&&u<=2))continue;r.push({col:l,row:o});continue}if(t.aoeShape==="cone"){Zn(e.col,e.row,l,o)===1&&r.push({col:l,row:o});continue}const h=Zn(e.col,e.row,l,o),d=nu(t,n,c.height);if(h>=s&&h<=d){if(!t.isMagic&&!t.isBow&&!t.ignoresHeight&&!t.isShadowStep&&!t.isHeal&&!t.isRevive&&!t.isBuff&&Math.abs(c.height-n)>Math.max(2,e.jump))continue;r.push({col:l,row:o})}}return r}getAoeTiles(e,t,i,n,s){const r=[],o=(l,c)=>{l>=0&&l<this.stage.cols&&c>=0&&c<this.stage.rows&&r.push({col:l,row:c})};if(i.aoeShape==="single"||i.aoeShape==="self")o(e,t);else if(i.aoeShape==="line2"){if(o(e,t),n!==void 0&&s!==void 0){const l=Math.sign(e-n),c=Math.sign(t-s);Zn(n,s,e,t)===1&&o(e+l,t+c)}}else if(i.aoeShape==="cross"){o(e,t);for(let l=1;l<=i.aoeRadius;l++)o(e+l,t),o(e-l,t),o(e,t+l),o(e,t-l)}else if(i.aoeShape==="diamond")for(let l=-i.aoeRadius;l<=i.aoeRadius;l++)for(let c=-i.aoeRadius;c<=i.aoeRadius;c++)Math.abs(l)+Math.abs(c)<=i.aoeRadius&&o(e+l,t+c);else if(i.aoeShape==="square3x3")for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++)o(e+l,t+c);else if(i.aoeShape==="cone"&&(o(e,t),n!==void 0&&s!==void 0)){const l=Math.sign(e-n),c=Math.sign(t-s);l!==0?(o(e+l,t),o(e+l,t-1),o(e+l,t+1)):c!==0&&(o(e,t+c),o(e-1,t+c),o(e+1,t+c))}return r}evaluateKnockback(e,t,i){if((i.footprint??1)>1)return null;const n=i.col-e,s=i.row-t;let r=0,o=0;Math.abs(n)>=Math.abs(s)?r=n>=0?1:-1:o=s>=0?1:-1;const l=i.col+r,c=i.row+o,h=this.getTile(i.col,i.row),d=this.getTile(l,c);if(!h||!d||!d.walkable||d.height>h.height||this.getUnitAt(l,c))return null;const u=h.height-d.height,f=u>2?Math.max(15*u,Math.round(i.maxHp*.12*u)):0;return{destCol:l,destRow:c,fallDamage:f}}findShadowStepTile(e,t){const i=Lh(e.facing),n=e.col-i.dc,s=e.row-i.dr,r=[{col:n,row:s},{col:e.col+i.dr,row:e.row-i.dc},{col:e.col-i.dr,row:e.row+i.dc},{col:e.col+i.dc,row:e.row+i.dr}];for(const o of r){const l=this.getTile(o.col,o.row);if(!l||!l.walkable)continue;const c=this.getUnitAt(o.col,o.row);if(!c||c.id===t.id)return o}return null}computeCombatForecast(e,t,i,n,s,r){const o=s??e.col,l=r??e.row,c=this.getAoeTiles(i,n,t,o,l),h=new Map;for(const q of c){const re=this.getUnitAt(q.col,q.row,!!t.isRevive);re&&(t.isHeal||t.isBuff?re.team===e.team&&re.hp>0&&h.set(re.id,re):t.isRevive?re.team===e.team&&re.hp<=0&&h.set(re.id,re):re.team!==e.team&&re.hp>0&&h.set(re.id,re))}const d=this.getUnitAt(i,n,!!t.isRevive)??Array.from(h.values())[0];if(!d)return null;const u=this.getTile(o,l),f=this.getTile(d.col,d.row),p=u?.height??1,v=f?.height??1;if(t.isHeal||t.isRevive||t.isBuff){const q=t.isRevive?Math.round(d.maxHp*(t.healPct??.5)):t.isHeal?Math.round(e.mag*t.multiplier*1.65):t.restoreMpPct?Math.round(e.maxMp*t.restoreMpPct):0,re=t.isRevive?"RESSUSCITAR":t.isHeal?`CURA PREVISTA: +${q} HP`:t.restoreMpPct?`MP +${q}`:`BUFF: ${t.shortName.toUpperCase()}`;return{attackerId:e.id,defenderId:d.id,skillId:t.id,predictedDamage:q,isHeal:!!t.isHeal,isRevive:!!t.isRevive,isBuff:!!t.isBuff,hitChance:100,critChance:0,blockChance:0,direction:"FRONT",directionLabel:"✨ ALIADO",heightDiff:p-v,heightBonusPct:0,heightLabel:`⛰️ ALT ${p}→${v}`,willKnockback:!1,expectedFallDamage:0,aoeTargetIds:Array.from(h.keys()),formattedBanner:`[${re} • CHANCE: 100%]`}}let g=o,m=l,x=Nh(g,m,d.col,d.row,d.facing);t.isShadowStep&&(x="BACK");const S=tu(x),M=t.ignoresHeight?0:iu(p,v),y=Math.round(M*100),w=t.isMagic?e.mag:e.atk,_=t.isMagic?Math.round(ur(d)*.7):ur(d);let b=w*t.multiplier*(100/(100+_));const P=t.isMagic?1+(S.damageMult-1)*.5:S.damageMult;b*=P*(1+M),t.bonusWaterMetal&&f&&(f.surface==="water"||f.surface==="swamp"||f.surface==="ice"||f.surface==="metal")&&(b*=1+t.bonusWaterMetal),t.bonusUndeadBoss&&(d.isUndead||d.isBoss)&&(b*=1+t.bonusUndeadBoss);const A=Math.max(8,Math.round(b)),I=t.isMagic||t.isShadowStep?0:d.evasion*S.evasionMult,F=Math.round(Math.max(55,Math.min(100,(1-I)*100))),k=.05+(e.jobId==="ninja"||e.jobId==="sniper"?.08:0),R=t.guaranteedCrit?100:Math.round(Math.min(100,(k+S.critBonus)*100)),H=t.isMagic||S.ignoresShield||t.isShadowStep?0:Math.round(d.shieldBlock*100);let z=0;const D=!!t.knockback;if(D){const q=this.evaluateKnockback(g,m,d);q&&(z=q.fallDamage)}const K=y>0?` • ⛰️ ALTURA (+${y}%)`:` • ⛰️ H:${p}→${v}`,V=z>0?` • 💥 QUEDA (+${z})`:"",j=`[DANO PREVISTO: ${A} • CHANCE: ${F}% • CRÍTICO: ${R}% • ${S.label}${K}${V}]`;return{attackerId:e.id,defenderId:d.id,skillId:t.id,predictedDamage:A,isHeal:!1,isRevive:!1,isBuff:!1,hitChance:F,critChance:R,blockChance:H,direction:x,directionLabel:S.label,heightDiff:p-v,heightBonusPct:y,heightLabel:y>0?`⛰️ ALTURA (+${y}%)`:`⛰️ ALT ${p}→${v}`,willKnockback:D,expectedFallDamage:z,aoeTargetIds:Array.from(h.keys()),formattedBanner:j}}executeAttack(e,t,i){const n=this.getAvailableSkills(e),s=n.find(r=>r.isBasic)??n[0];return s?this.executeSkill(e,s,t,i):null}executeSkill(e,t,i,n){e.mp=Math.max(0,e.mp-t.mpCost),e.hasActedThisTurn=!0,(i!==e.col||n!==e.row)&&(e.facing=As(i-e.col,n-e.row,e.facing));let s;if(t.isShadowStep){const c=this.getUnitAt(i,n);if(c){const h=this.findShadowStepTile(c,e);h&&(e.col=h.col,e.row=h.row,e.facing=As(c.col-h.col,c.row-h.row,e.facing),s=h)}}const r=this.getAoeTiles(i,n,t,e.col,e.row),o={attackerId:e.id,skill:t,targetCol:i,targetRow:n,aoeTiles:r,hits:[],teleportedTo:s};if(t.id==="apocalypse_meteor")return e.pendingMeteor={centerCol:i,centerRow:n,radius:t.aoeRadius,power:Math.round(e.mag*t.multiplier)},o.telegraphedMeteor={centerCol:i,centerRow:n,radius:t.aoeRadius},o;if(t.igniteTiles&&t.igniteTiles>0)for(const c of r){const h=this.getTile(c.col,c.row);h&&h.walkable&&(h.burningTurns=Math.max(h.burningTurns??0,t.igniteTiles))}if(t.aoeShape==="self"){if(t.restoreMpPct){const c=Math.round(e.maxMp*t.restoreMpPct);e.mp=Math.min(e.maxMp,e.mp+c),o.hits.push({targetId:e.id,targetName:e.name,damage:0,healed:0,revived:!1,mpRestored:c,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1})}return t.buffType==="aegis"&&(e.statuses.push({id:"aegis",turns:3}),o.hits.push({targetId:e.id,targetName:e.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,appliedStatus:"aegis",killed:!1})),o}const l=new Map;for(const c of r){const h=this.getUnitAt(c.col,c.row,!!t.isRevive);h&&(t.isHeal||t.isBuff?h.team===e.team&&h.hp>0&&l.set(h.id,h):t.isRevive?h.team===e.team&&h.hp<=0&&l.set(h.id,h):h.team!==e.team&&h.hp>0&&l.set(h.id,h))}for(const c of l.values()){if(t.isRevive){const I=Math.max(20,Math.round(c.maxHp*(t.healPct??.5)));c.hp=I,c.ct=30,o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:I,revived:!0,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1});continue}if(t.isHeal){const I=Math.round(e.mag*t.multiplier*1.65),F=c.hp;c.hp=Math.min(c.maxHp,c.hp+I),o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:c.hp-F,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1});continue}if(t.isBuff&&t.buffType==="haste"){c.statuses=c.statuses.filter(I=>I.id!=="slow"&&I.id!=="haste"),c.statuses.push({id:"haste",turns:3}),c.ct=Math.min(100,c.ct+(t.ctBoost??30)),o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,appliedStatus:"haste",killed:!1});continue}const h=this.computeCombatForecast(e,t,c.col,c.row),d=h?h.predictedDamage:Math.round(e.atk*t.multiplier),u=h?h.hitChance/100:1,f=h?h.critChance/100:.05,p=h?h.blockChance/100:0,v=h?h.direction:"FRONT",g=h?h.heightBonusPct:0,m=p>0&&this.rng()<p,x=!m&&this.rng()>u;if(m||x){o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:m,isEvaded:x,direction:v,heightBonusPct:g,fallDamage:0,killed:!1});continue}const S=t.guaranteedCrit||this.rng()<f,M=.94+this.rng()*.12,w=Math.max(10,Math.round(d*(S?1.5:1)*M));c.hp=Math.max(0,c.hp-w);let _=0;t.lifestealPct&&(_=Math.round(w*t.lifestealPct),e.hp=Math.min(e.maxHp,e.hp+_));let b;if(t.statusEffect&&c.hp>0){const I=t.statusChance??.6;this.rng()<I&&(c.statuses=c.statuses.filter(F=>F.id!==t.statusEffect),c.statuses.push({id:t.statusEffect,turns:2}),b=t.statusEffect)}let P,A=0;if(t.knockback&&c.hp>0){const I=this.evaluateKnockback(e.col,e.row,c);I&&(c.col=I.destCol,c.row=I.destRow,P={col:I.destCol,row:I.destRow},A=I.fallDamage,A>0&&(c.hp=Math.max(0,c.hp-A)))}c.jobId==="belias_boss"&&c.bossPhase===1&&c.hp>0&&c.hp<=c.maxHp*.55&&(c.bossPhase=2,c.speed+=2,c.atk=Math.round(c.atk*1.15),c.mag=Math.round(c.mag*1.15)),o.hits.push({targetId:c.id,targetName:c.name,damage:w,healed:0,revived:!1,mpRestored:0,lifesteal:_,isCrit:S,isBlocked:!1,isEvaded:!1,direction:v,heightBonusPct:g,knockbackMovedTo:P,fallDamage:A,appliedStatus:b,killed:c.hp<=0})}return this.checkVictoryCondition(),o}checkVictoryCondition(){const e=this.units.some(i=>i.team==="ally"&&i.hp>0);return this.units.some(i=>i.team==="enemy"&&i.hp>0)?e?this.combatEnded=null:this.combatEnded="defeat":this.combatEnded="victory",this.combatEnded}checkBattleEnd(){return this.checkVictoryCondition()}}class cu{static chooseBestAction(e,t){const i=e.getMoveRange(t),n=Array.from(i.values()),s=e.getAvailableSkills(t).filter(f=>f.mpCost<=t.mp),r=e.units.filter(f=>f.team==="ally"&&f.hp>0),o=e.units.filter(f=>f.team==="enemy"&&f.hp>0);let l={moveCol:t.col,moveRow:t.row,movePath:[{col:t.col,row:t.row}],skill:null,targetCol:t.col,targetRow:t.row,endFacing:t.facing,score:-1/0};if(r.length===0)return l;const c=(f,p)=>{let v=r[0],g=Zn(f,p,v.col,v.row);for(const m of r){const x=Zn(f,p,m.col,m.row);x<g&&(g=x,v=m)}return{hero:v,dist:g}},h=t.col,d=t.row,u=n.slice(0,48);for(const f of u){t.col=f.col,t.row=f.row;const p=e.getTile(f.col,f.row),v=p?.height??1,g=(p?.burningTurns??0)>0?-35:0,m=t.aiRole==="sniper"?v*12:t.aiRole==="mage"||t.aiRole==="support"?v*4:v*2;for(const w of s){const _=e.getSkillTargetableTiles(t,w),b=[];if(w.aoeShape==="self")b.push({col:f.col,row:f.row});else if(w.aoeShape==="single"||w.aoeShape==="line2")for(const P of _){const A=e.getUnitAt(P.col,P.row);A&&(w.isHeal||w.isBuff?A.team==="enemy":A.team==="ally")&&b.push(P)}else{const P=new Set,A=w.isHeal||w.isBuff?o:r;for(const I of _)if(A.some(k=>Zn(k.col,k.row,I.col,I.row)<=w.aoeRadius+1)){const k=kt(I.col,I.row);P.has(k)||(P.add(k),b.push(I))}}for(const P of b){let A=m+g;if(w.isHeal){const k=e.getAoeTiles(P.col,P.row,w,f.col,f.row);let R=0;for(const H of k){const z=e.getUnitAt(H.col,H.row);if(z&&z.team==="enemy"&&z.hp<z.maxHp*.8){const D=1-z.hp/z.maxHp;A+=55+D*75+(z.isBoss?35:0),R++}}if(R===0)continue}else if(w.isBuff)if(w.buffType==="haste"){const k=e.getAoeTiles(P.col,P.row,w,f.col,f.row);let R=0;for(const H of k){const z=e.getUnitAt(H.col,H.row);z&&z.team==="enemy"&&!ri(z,"haste")&&(A+=34+(z.isBoss?25:0),R++)}if(R===0)continue}else continue;else if(w.id==="apocalypse_meteor"){if(t.pendingMeteor)continue;const k=e.getAoeTiles(P.col,P.row,w,f.col,f.row);let R=0;for(const H of k){const z=e.getUnitAt(H.col,H.row);z&&z.team==="ally"&&(R++,A+=125)}if(R===0)continue;R>=2&&(A+=160)}else{const k=e.getAoeTiles(P.col,P.row,w,f.col,f.row),R=new Set,H=new Set;for(const z of k){const D=e.getUnitAt(z.col,z.row);!D||D.hp<=0||(D.team==="ally"?R.add(D.id):D.id!==t.id&&H.add(D.id))}if(R.size===0)continue;A-=H.size*60,R.size>=2&&(A+=(R.size-1)*42);for(const z of R){const D=e.getUnit(z),K=e.computeCombatForecast(t,w,D.col,D.row,f.col,f.row);if(!K)continue;A+=Math.min(85,K.predictedDamage*.45),K.predictedDamage>=D.hp&&(A+=75);const V=Nh(f.col,f.row,D.col,D.row,D.facing);V==="BACK"?A+=45:V==="SIDE"&&(A+=22),(D.jobId==="black_mage"||D.jobId==="white_mystic")&&(A+=22),A+=(1-D.hp/D.maxHp)*28,ri(D,"aegis")&&(A+=38),K.expectedFallDamage>0&&(A+=35)}}const{hero:I}=c(f.col,f.row),F=As(I.col-f.col,I.row-f.row,t.facing);A>l.score&&(l={moveCol:f.col,moveRow:f.row,movePath:f.path,skill:w,targetCol:P.col,targetRow:P.row,endFacing:F,score:A})}}const{hero:x,dist:S}=c(f.col,f.row),y=(t.aiRole==="sniper"?Math.abs(S-4)*-12+m:t.aiRole==="support"?-S*5+m:-S*14+m)+g-25;y>l.score&&(l={moveCol:f.col,moveRow:f.row,movePath:f.path,skill:null,targetCol:f.col,targetRow:f.row,endFacing:As(x.col-f.col,x.row-f.row,t.facing),score:y})}return t.col=h,t.row=d,l}}const il="187",hu=0,Kl=1,du=2,Cs=1,uu=2,ys=3,pn=0,ii=1,ft=2,ti=0,Rs=1,to=2,jl=3,Jl=4,Uh=5,Ni=100,fu=101,pu=102,mu=103,gu=104,bs=200,_u=201,vu=202,xu=203,Fh=204,Bh=205,io=206,Mu=207,no=208,Su=209,yu=210,bu=211,Tu=212,wu=213,Eu=214,so=0,ao=1,ro=2,Ds=3,oo=4,lo=5,co=6,ho=7,Oh=0,Au=1,Cu=2,Qi=0,nl=1,sl=2,al=3,Qa=4,rl=5,ol=6,ll=7,Zl="attached",Ru="detached",kh=300,is=301,Ns=302,fr=303,pr=304,xi=1e3,Fi=1001,ka=1002,Et=1003,zh=1004,Ts=1005,Vt=1006,Da=1007,Bi=1008,ai=1009,Hh=1010,Gh=1011,Us=1012,cl=1013,Oi=1014,gi=1015,jt=1016,hl=1017,dl=1018,Pn=1020,Vh=35902,Wh=35899,Xh=1021,qh=1022,_i=1023,mn=1026,ji=1027,ul=1028,fl=1029,In=1030,pl=1031,ml=1033,Na=33776,Ua=33777,Fa=33778,Ba=33779,uo=35840,fo=35841,po=35842,mo=35843,go=36196,_o=37492,vo=37496,xo=37488,Mo=37489,za=37490,So=37491,yo=37808,bo=37809,To=37810,wo=37811,Eo=37812,Ao=37813,Co=37814,Ro=37815,Po=37816,Io=37817,Lo=37818,Do=37819,No=37820,Uo=37821,Fo=36492,Bo=36494,Oo=36495,ko=36283,zo=36284,Ha=36285,Ho=36286,Go=2200,$h=2201,Pu=2202,Fs=2300,Bs=2301,mr=2302,Ql=2303,Kn=2400,jn=2401,Ga=2402,gl=2500,Iu=2501,Lu=0,Yh=1,Vo=2,Du=3200,Va=0,Nu=1,Ki="",bt="srgb",li="srgb-linear",Wa="linear",st="srgb",gr=7680,Uu=519,Fu=512,Bu=513,Ou=514,Kh=515,ku=516,zu=517,jh=518,Jh=519,Zh=35044,Qh=35048,ec="300 es",Ei=2e3,Os=2001;function Hu(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function Gu(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function ks(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function Vu(){const a=ks("canvas");return a.style.display="block",a}const tc={};function Xa(...a){const e="THREE."+a.shift();console.log(e,...a)}function ed(a){const e=a[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=a[1];t&&t.isStackTrace?a[0]+=" "+t.getLocation():a[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return a}function Ne(...a){a=ed(a);const e="THREE."+a.shift();{const t=a[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...a)}}function He(...a){a=ed(a);const e="THREE."+a.shift();{const t=a[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...a)}}function Qn(...a){const e=a.join(" ");e in tc||(tc[e]=!0,Ne(...a))}function Wu(a,e,t){return new Promise(function(i,n){function s(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:n();break;case a.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Xu={[so]:so,[ro]:co,[oo]:oo,[Ds]:lo,[ao]:ao,[co]:ro,[ho]:ho,[lo]:Ds};class gn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const s=n.indexOf(t);s!==-1&&n.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let s=0,r=n.length;s<r;s++)n[s].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ic=1234567;const Ps=Math.PI/180,ns=180/Math.PI;function ki(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[a&255]+$t[a>>8&255]+$t[a>>16&255]+$t[a>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function Ze(a,e,t){return Math.max(e,Math.min(t,a))}function _l(a,e){return(a%e+e)%e}function qu(a,e,t,i,n){return i+(a-e)*(n-i)/(t-e)}function $u(a,e,t){return a!==e?(t-a)/(e-a):0}function Is(a,e,t){return(1-t)*a+t*e}function Yu(a,e,t,i){return Is(a,e,1-Math.exp(-t*i))}function Ku(a,e=1){return e-Math.abs(_l(a,e*2)-e)}function ju(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function Ju(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function Zu(a,e){return a+Math.floor(Math.random()*(e-a+1))}function Qu(a,e){return a+Math.random()*(e-a)}function ef(a){return a*(.5-Math.random())}function tf(a){a!==void 0&&(ic=a);let e=ic+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nf(a){return a*Ps}function sf(a){return a*ns}function af(a){return a>0&&Number.isInteger(a)&&2**Math.round(Math.log2(a))===a}function rf(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function td(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function of(a,e,t,i,n){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+i)/2),h=r((e+i)/2),d=s((e-i)/2),u=r((e-i)/2),f=s((i-e)/2),p=r((i-e)/2);switch(n){case"XYX":a.set(o*h,l*d,l*u,o*c);break;case"YZY":a.set(l*u,o*h,l*d,o*c);break;case"ZXZ":a.set(l*d,l*u,o*h,o*c);break;case"XZX":a.set(o*h,l*p,l*f,o*c);break;case"YXY":a.set(l*f,o*h,l*p,o*c);break;case"ZYZ":a.set(l*p,l*f,o*h,o*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function er(a){switch(a.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function vl(a,e){if(e.constructor===Float32Array)return a;const t=er(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(a/t,-1)}function xl(a,e){if(e.constructor===Float32Array)return a;const t=er(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(a*t)}const wn={DEG2RAD:Ps,RAD2DEG:ns,generateUUID:ki,clamp:Ze,euclideanModulo:_l,mapLinear:qu,inverseLerp:$u,lerp:Is,damp:Yu,pingpong:Ku,smoothstep:ju,smootherstep:Ju,randInt:Zu,randFloat:Qu,randFloatSpread:ef,seededRandom:tf,degToRad:nf,radToDeg:sf,isPowerOfTwo:af,ceilPowerOfTwo:rf,floorPowerOfTwo:td,setQuaternionFromProperEuler:of,normalize:xl,denormalize:vl};class Re{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*n+e.x,this.y=s*n+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vi{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,s,r,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=s[r+0],f=s[r+1],p=s[r+2],v=s[r+3];if(d!==v||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*v;g<0&&(u=-u,f=-f,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){const x=Math.acos(g),S=Math.sin(x);m=Math.sin(m*x)/S,o=Math.sin(o*x)/S,l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+v*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+v*o;const x=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=x,c*=x,h*=x,d*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,n,s,r){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=s[r],u=s[r+1],f=s[r+2],p=s[r+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(s/2),u=l(i/2),f=l(n/2),p=l(s/2);switch(r){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(r-n)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+r)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(n+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(r-n)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+r*o+n*c-s*l,this._y=n*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-n*o,this._w=r*h-i*o-n*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,s=-s,r=-r,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*n,this.y=s[1]*t+s[4]*i+s[7]*n,this.z=s[2]*t+s[5]*i+s[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*n+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*n+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*n+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*n-o*i),h=2*(o*t-s*n),d=2*(s*i-r*t);return this.x=t+l*c+r*d-o*h,this.y=i+l*h+o*c-s*d,this.z=n+l*d+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n,this.y=s[1]*t+s[5]*i+s[9]*n,this.z=s[2]*t+s[6]*i+s[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=n*l-s*o,this.y=s*r-i*l,this.z=i*o-n*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _r.copy(this).projectOnVector(e),this.sub(_r)}reflect(e){return this.sub(_r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _r=new U,nc=new vi;class Ve{static{this.prototype.isMatrix3=!0}constructor(e,t,i,n,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,r,o,l,c)}set(e,t,i,n,s,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],p=i[8],v=n[0],g=n[3],m=n[6],x=n[1],S=n[4],M=n[7],y=n[2],w=n[5],_=n[8];return s[0]=r*v+o*x+l*y,s[3]=r*g+o*S+l*w,s[6]=r*m+o*M+l*_,s[1]=c*v+h*x+d*y,s[4]=c*g+h*S+d*w,s[7]=c*m+h*M+d*_,s[2]=u*v+f*x+p*y,s[5]=u*g+f*S+p*w,s[8]=u*m+f*M+p*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-i*s*h+i*o*l+n*s*c-n*r*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*r-o*c,u=o*l-h*s,f=c*s-r*l,p=t*d+i*u+n*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(n*c-h*i)*v,e[2]=(o*i-n*r)*v,e[3]=u*v,e[4]=(h*t-n*l)*v,e[5]=(n*s-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(r*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-n*c,n*l,-n*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return Qn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vr.makeScale(e,t)),this}rotate(e){return Qn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vr.makeRotation(-e)),this}translate(e,t){return Qn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vr=new Ve,sc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ac=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lf(){const a={enabled:!0,workingColorSpace:li,spaces:{},convert:function(n,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===st&&(n.r=en(n.r),n.g=en(n.g),n.b=en(n.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===st&&(n.r=es(n.r),n.g=es(n.g),n.b=es(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ki?Wa:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,r){return n.copy(this.spaces[r].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return a.define({[li]:{primaries:e,whitePoint:i,transfer:Wa,toXYZ:sc,fromXYZ:ac,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:i,transfer:st,toXYZ:sc,fromXYZ:ac,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),a}const Ke=lf();function en(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function es(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let Un;class cf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Un===void 0&&(Un=ks("canvas")),Un.width=e.width,Un.height=e.height;const n=Un.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Un}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ks("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),s=n.data;for(let r=0;r<s.length;r++)s[r]=en(s[r]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(en(t[i]/255)*255):t[i]=en(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hf=0;class Ml{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?s.push(xr(n[r].image)):s.push(xr(n[r]))}else s=xr(n);i.url=s}return t||(e.images[this.uuid]=i),i}}function xr(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?cf.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let df=0;const Mr=new U;class Pt extends gn{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=Fi,n=Fi,s=Vt,r=Bi,o=_i,l=ai,c=Pt.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=ki(),this.name="",this.source=new Ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Mr).x}get height(){return this.source.getSize(Mr).y}get depth(){return this.source.getSize(Mr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xi:e.x=e.x-Math.floor(e.x);break;case Fi:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xi:e.y=e.y-Math.floor(e.y);break;case Fi:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=kh;Pt.DEFAULT_ANISOTROPY=1;class gt{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*n+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*n+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*n+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,M=(f+1)/2,y=(m+1)/2,w=(h+u)/4,_=(d+v)/4,b=(p+g)/4;return S>M&&S>y?S<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(S),n=w/i,s=_/i):M>y?M<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(M),i=w/n,s=b/n):y<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(y),i=_/s,n=b/s),this.set(i,n,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uf extends gn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];const n=i.count;for(let s=0;s<n;s++)this.textures[s]=new Pt({width:e,height:t,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ml(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jt extends uf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class id extends Pt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Et,this.minFilter=Et,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ff extends Pt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Et,this.minFilter=Et,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class ze{static{this.prototype.isMatrix4=!0}constructor(e,t,i,n,s,r,o,l,c,h,d,u,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,r,o,l,c,h,d,u,f,p,v,g)}set(e,t,i,n,s,r,o,l,c,h,d,u,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=n,m[1]=s,m[5]=r,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,n=1/Fn.setFromMatrixColumn(e,0).length(),s=1/Fn.setFromMatrixColumn(e,1).length(),r=1/Fn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=r*h,f=r*d,p=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=p+f*c,t[10]=r*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u+v*o,t[4]=p*o-f,t[8]=r*c,t[1]=r*d,t[5]=r*h,t[9]=-o,t[2]=f*o-p,t[6]=v+u*o,t[10]=r*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u-v*o,t[4]=-r*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=r*h,t[9]=v-u*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const u=r*h,f=r*d,p=o*h,v=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const u=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=p*d+f,t[1]=d,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-v*d}else if(e.order==="XZY"){const u=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=r*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pf,e,mf)}lookAt(e,t,i){const n=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),an.crossVectors(i,ci),an.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),an.crossVectors(i,ci)),an.normalize(),Js.crossVectors(ci,an),n[0]=an.x,n[4]=Js.x,n[8]=ci.x,n[1]=an.y,n[5]=Js.y,n[9]=ci.y,n[2]=an.z,n[6]=Js.z,n[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],p=i[2],v=i[6],g=i[10],m=i[14],x=i[3],S=i[7],M=i[11],y=i[15],w=n[0],_=n[4],b=n[8],P=n[12],A=n[1],I=n[5],F=n[9],k=n[13],R=n[2],H=n[6],z=n[10],D=n[14],K=n[3],V=n[7],j=n[11],q=n[15];return s[0]=r*w+o*A+l*R+c*K,s[4]=r*_+o*I+l*H+c*V,s[8]=r*b+o*F+l*z+c*j,s[12]=r*P+o*k+l*D+c*q,s[1]=h*w+d*A+u*R+f*K,s[5]=h*_+d*I+u*H+f*V,s[9]=h*b+d*F+u*z+f*j,s[13]=h*P+d*k+u*D+f*q,s[2]=p*w+v*A+g*R+m*K,s[6]=p*_+v*I+g*H+m*V,s[10]=p*b+v*F+g*z+m*j,s[14]=p*P+v*k+g*D+m*q,s[3]=x*w+S*A+M*R+y*K,s[7]=x*_+S*I+M*H+y*V,s[11]=x*b+S*F+M*z+y*j,s[15]=x*P+S*k+M*D+y*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15],x=l*f-c*u,S=o*f-c*d,M=o*u-l*d,y=r*f-c*h,w=r*u-l*h,_=r*d-o*h;return t*(v*x-g*S+m*M)-i*(p*x-g*y+m*w)+n*(p*S-v*y+m*_)-s*(p*M-v*w+g*_)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],n=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(r*h-o*c)-i*(s*h-o*l)+n*(s*c-r*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],x=t*o-i*r,S=t*l-n*r,M=t*c-s*r,y=i*l-n*o,w=i*c-s*o,_=n*c-s*l,b=h*v-d*p,P=h*g-u*p,A=h*m-f*p,I=d*g-u*v,F=d*m-f*v,k=u*m-f*g,R=x*k-S*F+M*I+y*A-w*P+_*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/R;return e[0]=(o*k-l*F+c*I)*H,e[1]=(n*F-i*k-s*I)*H,e[2]=(v*_-g*w+m*y)*H,e[3]=(u*w-d*_-f*y)*H,e[4]=(l*A-r*k-c*P)*H,e[5]=(t*k-n*A+s*P)*H,e[6]=(g*M-p*_-m*S)*H,e[7]=(h*_-u*M+f*S)*H,e[8]=(r*F-o*A+c*b)*H,e[9]=(i*A-t*F-s*b)*H,e[10]=(p*w-v*M+m*x)*H,e[11]=(d*M-h*w-f*x)*H,e[12]=(o*P-r*I-l*b)*H,e[13]=(t*I-i*P+n*b)*H,e[14]=(v*S-p*y-g*x)*H,e[15]=(h*y-d*S+u*x)*H,this}scale(e){const t=this.elements,i=e.x,n=e.y,s=e.z;return t[0]*=i,t[4]*=n,t[8]*=s,t[1]*=i,t[5]*=n,t[9]*=s,t[2]*=i,t[6]*=n,t[10]*=s,t[3]*=i,t[7]*=n,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*r,0,c*l-n*o,h*l+n*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,s,r){return this.set(1,i,s,0,e,1,r,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,h=r+r,d=o+o,u=s*c,f=s*h,p=s*d,v=r*h,g=r*d,m=o*d,x=l*c,S=l*h,M=l*d,y=i.x,w=i.y,_=i.z;return n[0]=(1-(v+m))*y,n[1]=(f+M)*y,n[2]=(p-S)*y,n[3]=0,n[4]=(f-M)*w,n[5]=(1-(u+m))*w,n[6]=(g+x)*w,n[7]=0,n[8]=(p+S)*_,n[9]=(g-x)*_,n[10]=(1-(u+v))*_,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let r=Fn.set(n[0],n[1],n[2]).length();const o=Fn.set(n[4],n[5],n[6]).length(),l=Fn.set(n[8],n[9],n[10]).length();s<0&&(r=-r),Si.copy(this);const c=1/r,h=1/o,d=1/l;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=h,Si.elements[5]*=h,Si.elements[6]*=h,Si.elements[8]*=d,Si.elements[9]*=d,Si.elements[10]*=d,t.setFromRotationMatrix(Si),i.x=r,i.y=o,i.z=l,this}makePerspective(e,t,i,n,s,r,o=Ei,l=!1){const c=this.elements,h=2*s/(t-e),d=2*s/(i-n),u=(t+e)/(t-e),f=(i+n)/(i-n);let p,v;if(l)p=s/(r-s),v=r*s/(r-s);else if(o===Ei)p=-(r+s)/(r-s),v=-2*r*s/(r-s);else if(o===Os)p=-r/(r-s),v=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,s,r,o=Ei,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-n),u=-(t+e)/(t-e),f=-(i+n)/(i-n);let p,v;if(l)p=1/(r-s),v=r/(r-s);else if(o===Ei)p=-2/(r-s),v=-(r+s)/(r-s);else if(o===Os)p=-1/(r-s),v=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fn=new U,Si=new ze,pf=new U(0,0,0),mf=new U(1,1,1),an=new U,Js=new U,ci=new U,rc=new ze,oc=new vi;class tn{constructor(e=0,t=0,i=0,n=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,s=n[0],r=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oc.setFromEuler(this),this.setFromQuaternion(oc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class Sl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gf=0;const lc=new U,Bn=new vi,Vi=new ze,Zs=new U,us=new U,_f=new U,vf=new vi,cc=new U(1,0,0),hc=new U(0,1,0),dc=new U(0,0,1),uc={type:"added"},xf={type:"removed"},On={type:"childadded",child:null},Sr={type:"childremoved",child:null};class ct extends gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new U,t=new tn,i=new vi,n=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ze},normalMatrix:{value:new Ve}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bn.setFromAxisAngle(e,t),this.quaternion.multiply(Bn),this}rotateOnWorldAxis(e,t){return Bn.setFromAxisAngle(e,t),this.quaternion.premultiply(Bn),this}rotateX(e){return this.rotateOnAxis(cc,e)}rotateY(e){return this.rotateOnAxis(hc,e)}rotateZ(e){return this.rotateOnAxis(dc,e)}translateOnAxis(e,t){return lc.copy(e).applyQuaternion(this.quaternion),this.position.add(lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cc,e)}translateY(e){return this.translateOnAxis(hc,e)}translateZ(e){return this.translateOnAxis(dc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zs.copy(e):Zs.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(us,Zs,this.up):Vi.lookAt(Zs,us,this.up),this.quaternion.setFromRotationMatrix(Vi),n&&(Vi.extractRotation(n.matrixWorld),Bn.setFromRotationMatrix(Vi),this.quaternion.premultiply(Bn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uc),On.child=e,this.dispatchEvent(On),On.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xf),Sr.child=e,this.dispatchEvent(Sr),Sr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uc),On.child=e,this.dispatchEvent(On),On.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,e,_f),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,vf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*n,s[13]+=i-s[1]*t-s[5]*i-s[9]*n,s[14]+=n-s[2]*t-s[6]*i-s[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));n.material=o}else n.material=s(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),d=r(e.shapes),u=r(e.skeletons),f=r(e.animations),p=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=n,i;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ct.DEFAULT_UP=new U(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Je extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mf={type:"move"};class yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Je;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rn={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function br(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?a+(e-a)*6*t:t<1/2?e:t<2/3?a+(e-a)*6*(2/3-t):a}class Me{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=Ke.workingColorSpace){if(e=_l(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=br(r,s,e+1/3),this.g=br(r,s,e),this.b=br(r,s,e-1/3)}return Ke.colorSpaceToWorking(this,n),this}setStyle(e,t=bt){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=n[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const i=nd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=en(e.r),this.g=en(e.g),this.b=en(e.b),this}copyLinearToSRGB(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Ke.workingToColorSpace(Yt.copy(this),e),Math.round(Ze(Yt.r*255,0,255))*65536+Math.round(Ze(Yt.g*255,0,255))*256+Math.round(Ze(Yt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Yt.copy(this),t);const i=Yt.r,n=Yt.g,s=Yt.b,r=Math.max(i,n,s),o=Math.min(i,n,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=h<=.5?d/(r+o):d/(2-r-o),r){case i:l=(n-s)/d+(n<s?6:0);break;case n:l=(s-i)/d+2;break;case s:l=(i-n)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=bt){Ke.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,n=Yt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(rn),this.setHSL(rn.h+e,rn.s+t,rn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(rn),e.getHSL(Qs);const i=Is(rn.h,Qs.h,t),n=Is(rn.s,Qs.s,t),s=Is(rn.l,Qs.l,t);return this.setHSL(i,n,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*n,this.g=s[1]*t+s[4]*i+s[7]*n,this.b=s[2]*t+s[5]*i+s[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new Me;Me.NAMES=nd;class tr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Me(e),this.density=t}clone(){return new tr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class sd extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const yi=new U,Wi=new U,Tr=new U,Xi=new U,kn=new U,zn=new U,fc=new U,wr=new U,Er=new U,Ar=new U,Cr=new gt,Rr=new gt,Pr=new gt;class wi{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),yi.subVectors(e,t),n.cross(yi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(e,t,i,n,s){yi.subVectors(n,t),Wi.subVectors(i,t),Tr.subVectors(e,t);const r=yi.dot(yi),o=yi.dot(Wi),l=yi.dot(Tr),c=Wi.dot(Wi),h=Wi.dot(Tr),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,p=(r*h-o*l)*u;return s.set(1-f-p,p,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Xi)===null?!1:Xi.x>=0&&Xi.y>=0&&Xi.x+Xi.y<=1}static getInterpolation(e,t,i,n,s,r,o,l){return this.getBarycoord(e,t,i,n,Xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Xi.x),l.addScaledVector(r,Xi.y),l.addScaledVector(o,Xi.z),l)}static getInterpolatedAttribute(e,t,i,n,s,r){return Cr.setScalar(0),Rr.setScalar(0),Pr.setScalar(0),Cr.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,i),Pr.fromBufferAttribute(e,n),r.setScalar(0),r.addScaledVector(Cr,s.x),r.addScaledVector(Rr,s.y),r.addScaledVector(Pr,s.z),r}static isFrontFacing(e,t,i,n){return yi.subVectors(i,t),Wi.subVectors(e,t),yi.cross(Wi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yi.subVectors(this.c,this.b),Wi.subVectors(this.a,this.b),yi.cross(Wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,s){return wi.getInterpolation(e,this.a,this.b,this.c,t,i,n,s)}containsPoint(e){return wi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,s=this.c;let r,o;kn.subVectors(n,i),zn.subVectors(s,i),wr.subVectors(e,i);const l=kn.dot(wr),c=zn.dot(wr);if(l<=0&&c<=0)return t.copy(i);Er.subVectors(e,n);const h=kn.dot(Er),d=zn.dot(Er);if(h>=0&&d<=h)return t.copy(n);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return r=l/(l-h),t.copy(i).addScaledVector(kn,r);Ar.subVectors(e,s);const f=kn.dot(Ar),p=zn.dot(Ar);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(zn,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return fc.subVectors(s,n),o=(d-h)/(d-h+(f-p)),t.copy(n).addScaledVector(fc,o);const m=1/(g+v+u);return r=v*m,o=u*m,t.copy(i).addScaledVector(kn,r).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zi{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,bi):bi.fromBufferAttribute(s,r),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ea.copy(i.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}const n=e.children;for(let s=0,r=n.length;s<r;s++)this.expandByObject(n[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),ta.subVectors(this.max,fs),Hn.subVectors(e.a,fs),Gn.subVectors(e.b,fs),Vn.subVectors(e.c,fs),on.subVectors(Gn,Hn),ln.subVectors(Vn,Gn),Mn.subVectors(Hn,Vn);let t=[0,-on.z,on.y,0,-ln.z,ln.y,0,-Mn.z,Mn.y,on.z,0,-on.x,ln.z,0,-ln.x,Mn.z,0,-Mn.x,-on.y,on.x,0,-ln.y,ln.x,0,-Mn.y,Mn.x,0];return!Ir(t,Hn,Gn,Vn,ta)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,Hn,Gn,Vn,ta))?!1:(ia.crossVectors(on,ln),t=[ia.x,ia.y,ia.z],Ir(t,Hn,Gn,Vn,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qi=[new U,new U,new U,new U,new U,new U,new U,new U],bi=new U,ea=new zi,Hn=new U,Gn=new U,Vn=new U,on=new U,ln=new U,Mn=new U,fs=new U,ta=new U,ia=new U,Sn=new U;function Ir(a,e,t,i,n){for(let s=0,r=a.length-3;s<=r;s+=3){Sn.fromArray(a,s);const o=n.x*Math.abs(Sn.x)+n.y*Math.abs(Sn.y)+n.z*Math.abs(Sn.z),l=e.dot(Sn),c=t.dot(Sn),h=i.dot(Sn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Rt=new U,na=new Re;let Sf=0;class oi extends gn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zh,this.updateRanges=[],this.gpuType=gi,this.version=0,this._normalizationScale=e!==void 0?er(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):vl(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):xl(e,this.array)}}class ad extends oi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class rd extends oi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ye extends oi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const yf=new zi,ps=new U,Lr=new U;class Hi{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):yf.setFromPoints(e).getCenter(i);let n=0;for(let s=0,r=e.length;s<r;s++)n=Math.max(n,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ps,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(Lr)),this.expandByPoint(ps.copy(e.center).sub(Lr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bf=0;const pi=new ze,Dr=new ct,Wn=new U,hi=new zi,ms=new zi,Bt=new U;class wt extends gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hu(e)?rd:ad)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,i){return pi.makeTranslation(e,t,i),this.applyMatrix4(pi),this}scale(e,t,i){return pi.makeScale(e,t,i),this.applyMatrix4(pi),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wn).negate(),this.translate(Wn.x,Wn.y,Wn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ye(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const s=t[i];hi.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(hi.min,ms.min),hi.expandByPoint(Bt),Bt.addVectors(hi.max,ms.max),hi.expandByPoint(Bt)):(hi.expandByPoint(ms.min),hi.expandByPoint(ms.max))}hi.getCenter(i);let n=0;for(let s=0,r=e.count;s<r;s++)Bt.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(Bt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Bt.fromBufferAttribute(o,c),l&&(Wn.fromBufferAttribute(e,c),Bt.add(Wn)),n=Math.max(n,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,s=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new oi(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[],c=new Uint8Array(i.count);for(let P=0;P<i.count;P++)o[P]=new U,l[P]=new U;const h=new U,d=new U,u=new U,f=new Re,p=new Re,v=new Re,g=new U,m=new U;function x(P,A,I){c[P]=c[A]=c[I]=1,h.fromBufferAttribute(i,P),d.fromBufferAttribute(i,A),u.fromBufferAttribute(i,I),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,A),v.fromBufferAttribute(s,I),d.sub(h),u.sub(h),p.sub(f),v.sub(f);const F=1/(p.x*v.y-v.x*p.y);isFinite(F)&&(g.copy(d).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(F),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-v.x).multiplyScalar(F),o[P].add(g),o[A].add(g),o[I].add(g),l[P].add(m),l[A].add(m),l[I].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let P=0,A=S.length;P<A;++P){const I=S[P],F=I.start,k=I.count;for(let R=F,H=F+k;R<H;R+=3)x(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const M=new U,y=new U,w=new U,_=new U;function b(P){w.fromBufferAttribute(n,P),_.copy(w);const A=o[P];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(_,A);const F=y.dot(l[P])<0?-1:1;r.setXYZW(P,M.x,M.y,M.z,F)}for(let P=0,A=i.count;P<A;++P)c[P]&&b(P);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new oi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new U,s=new U,r=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);n.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),h.subVectors(r,s),d.subVectors(n,s),h.cross(d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)n.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,s),d.subVectors(n,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new oi(u,h,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,s=!0)}s&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class od{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zh,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,s=this.stride;n<s;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=pc(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[t]),n=new this.constructor(i,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=pc(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}function pc(a){return a.buffer._uuid===void 0&&(a.buffer._uuid=ki()),a.byteOffset===0&&a.byteLength===a.buffer.byteLength?a.buffer._uuid:a.buffer._uuid+":"+a.byteOffset+":"+a.byteLength}const Qt=new U;class ir{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n,this._normalizationScale=e!==void 0?er(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Xa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return new oi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ir(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):vl(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):xl(e,this.data.array)}}const Nr=new U,Tf=new U,wf=new Ve;class dn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Nr.subVectors(i,t).cross(Tf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const n=e.delta(Nr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||wf.getNormalMatrix(e),n=this.coplanarPoint(Nr).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ef=0;class Ai extends gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=Rs,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fh,this.blendDst=Bh,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gr,this.stencilZFail=gr,this.stencilZPass=gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=n(e.textures),r=n(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Me().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new dn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Re().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Re().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const $i=new U,Ur=new U,sa=new U,aa=new U;class qs{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($i.copy(this.origin).addScaledVector(this.direction,t),$i.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Ur.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),aa.copy(this.origin).sub(Ur);const s=e.distanceTo(t)*.5,r=-this.direction.dot(sa),o=aa.dot(this.direction),l=-aa.dot(sa),c=aa.lengthSq(),h=Math.abs(1-r*r);let d,u,f,p;if(h>0)if(d=r*l-o,u=r*o-l,p=s*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*o)+u*(r*d+u+2*l)+c}else u=s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-r*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(r*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=r>0?-s:s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(Ur).addScaledVector(sa,u),f}intersectSphere(e,t){if(e.radius<0)return null;$i.subVectors(e.center,this.origin);const i=$i.dot(this.direction),n=$i.dot($i)-i*i,s=e.radius*e.radius;if(n>s)return null;const r=Math.sqrt(s-n),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,n=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,n=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),i>r||s>n||((s>i||isNaN(i))&&(i=s),(r<n||isNaN(n))&&(n=r),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,$i)!==null}intersectTriangle(e,t,i,n,s){const r=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-r.x,u=e.y-r.y,f=e.z-r.z,p=t.x-r.x,v=t.y-r.y,g=t.z-r.z,m=i.x-r.x,x=i.y-r.y,S=i.z-r.z,M=Math.abs(l),y=Math.abs(c),w=Math.abs(h);let _,b,P,A,I,F,k,R,H,z,D,K;if(M>=y&&M>=w?(P=l,F=d,H=p,K=m,l>=0?(_=c,b=h,A=u,I=f,k=v,R=g,z=x,D=S):(_=h,b=c,A=f,I=u,k=g,R=v,z=S,D=x)):y>=w?(P=c,F=u,H=v,K=x,c>=0?(_=h,b=l,A=f,I=d,k=g,R=p,z=S,D=m):(_=l,b=h,A=d,I=f,k=p,R=g,z=m,D=S)):(P=h,F=f,H=g,K=S,h>=0?(_=l,b=c,A=d,I=u,k=p,R=v,z=m,D=x):(_=c,b=l,A=u,I=d,k=v,R=p,z=x,D=m)),P===0)return null;const V=_/P,j=b/P,q=1/P,re=A-V*F,Fe=I-j*F,L=k-V*H,G=R-j*H,se=z-V*K,le=D-j*K,ie=se*G-le*L,be=re*le-Fe*se,Ue=L*Fe-G*re;if(n){if(ie<0||be<0||Ue<0)return null}else if((ie<0||be<0||Ue<0)&&(ie>0||be>0||Ue>0))return null;const he=ie+be+Ue;if(he===0)return null;const ye=q*(ie*F+be*H+Ue*K);return(he>0?ye<0:ye>0)?null:this.at(ye/he,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mc=new ze,yn=new qs,ra=new Hi,gc=new U,oa=new U,la=new U,ca=new U,Fr=new U,ha=new U,_c=new U,da=new U;class Ie extends ct{constructor(e=new wt,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(s&&o){ha.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(Fr.fromBufferAttribute(d,e),r?ha.addScaledVector(Fr,h):ha.addScaledVector(Fr.sub(t),h))}t.add(ha)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ra.copy(i.boundingSphere),ra.applyMatrix4(s),yn.copy(e.ray).recast(e.near),!(ra.containsPoint(yn.origin)===!1&&(yn.intersectSphere(ra,gc)===null||yn.origin.distanceToSquared(gc)>(e.far-e.near)**2))&&(mc.copy(s).invert(),yn.copy(e.ray).applyMatrix4(mc),!(i.boundingBox!==null&&yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,yn)))}_computeIntersections(e,t,i){let n;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=x,y=S;M<y;M+=3){const w=o.getX(M),_=o.getX(M+1),b=o.getX(M+2);n=ua(this,m,e,i,c,h,d,w,_,b),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=o.getX(g),S=o.getX(g+1),M=o.getX(g+2);n=ua(this,r,e,i,c,h,d,x,S,M),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),S=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=x,y=S;M<y;M+=3){const w=M,_=M+1,b=M+2;n=ua(this,m,e,i,c,h,d,w,_,b),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,S=g+1,M=g+2;n=ua(this,r,e,i,c,h,d,x,S,M),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}}}function Af(a,e,t,i,n,s,r,o){let l;if(e.side===ii?l=i.intersectTriangle(r,s,n,!0,o):l=i.intersectTriangle(n,s,r,e.side===pn,o),l===null)return null;da.copy(o),da.applyMatrix4(a.matrixWorld);const c=t.ray.origin.distanceTo(da);return c<t.near||c>t.far?null:{distance:c,point:da.clone(),object:a}}function ua(a,e,t,i,n,s,r,o,l,c){a.getVertexPosition(o,oa),a.getVertexPosition(l,la),a.getVertexPosition(c,ca);const h=Af(a,e,t,i,oa,la,ca,_c);if(h){const d=new U;wi.getBarycoord(_c,oa,la,ca,d),n&&(h.uv=wi.getInterpolatedAttribute(n,o,l,c,d,new Re)),s&&(h.uv1=wi.getInterpolatedAttribute(s,o,l,c,d,new Re)),r&&(h.normal=wi.getInterpolatedAttribute(r,o,l,c,d,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};wi.getNormal(oa,la,ca,u.normal),h.face=u,h.barycoord=d}return h}const gs=new gt,vc=new gt,xc=new gt,Cf=new gt,Mc=new ze,fa=new U,Br=new Hi,Sc=new ze,Or=new qs;class Rf extends Ie{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Zl,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fa),this.boundingBox.expandByPoint(fa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fa),this.boundingSphere.expandByPoint(fa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){const i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(n),e.ray.intersectsSphere(Br)!==!1&&(Sc.copy(n).invert(),Or.copy(e.ray).applyMatrix4(Sc),!(this.boundingBox!==null&&Or.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new gt,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Zl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ru?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ne("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,n=this.geometry;vc.fromBufferAttribute(n.attributes.skinIndex,e),xc.fromBufferAttribute(n.attributes.skinWeight,e),t.isVector4?(gs.copy(t),t.set(0,0,0,0)):(gs.set(t.x,t.y,t.z,1),t.set(0,0,0)),gs.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const r=xc.getComponent(s);if(r!==0){const o=vc.getComponent(s);Mc.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Cf.copy(gs).applyMatrix4(Mc),r)}}return t.isVector4&&(t.w=gs.w),t.applyMatrix4(this.bindMatrixInverse)}}class ld extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class $s extends Pt{constructor(e=null,t=1,i=1,n,s,r,o,l,c=Et,h=Et,d,u){super(null,r,o,l,c,h,n,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yc=new ze,Pf=new ze;class yl{constructor(e=[],t=[]){this.uuid=ki(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ne("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new ze;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const o=e[s]?e[s].matrixWorld:Pf;yc.multiplyMatrices(o,t[s]),yc.toArray(i,s*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new yl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new $s(t,e,e,_i,gi);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const s=e.bones[i];let r=t[s];r===void 0&&(Ne("Skeleton: No bone found with UUID:",s),r=new ld),this.bones.push(r),this.boneInverses.push(new ze().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,s=t.length;n<s;n++){const r=t[n];e.bones.push(r.uuid);const o=i[n];e.boneInverses.push(o.toArray())}return e}}class qa extends oi{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xn=new ze,bc=new ze,pa=[],Tc=new zi,If=new ze,_s=new Ie,vs=new Hi;class Jn extends Ie{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,If)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xn),Tc.copy(e.boundingBox).applyMatrix4(Xn),this.boundingBox.union(Tc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xn),vs.copy(e.boundingSphere).applyMatrix4(Xn),this.boundingSphere.union(vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=n[r+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(i),e.ray.intersectsSphere(vs)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Xn),bc.multiplyMatrices(i,Xn),_s.matrixWorld=bc,_s.raycast(e,pa);for(let r=0,o=pa.length;r<o;r++){const l=pa[r];l.instanceId=s,l.object=this,t.push(l)}pa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new qa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new $s(new Float32Array(n*this.count),n,this.count,ul,gi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=n*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bn=new Hi,Lf=new Re(.5,.5),ma=new U;class zs{constructor(e=new dn,t=new dn,i=new dn,n=new dn,s=new dn,r=new dn){this.planes=[e,t,i,n,s,r]}set(e,t,i,n,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ei,i=!1){const n=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],x=s[12],S=s[13],M=s[14],y=s[15];if(n[0].setComponents(c-r,f-h,m-p,y-x).normalize(),n[1].setComponents(c+r,f+h,m+p,y+x).normalize(),n[2].setComponents(c+o,f+d,m+v,y+S).normalize(),n[3].setComponents(c-o,f-d,m-v,y-S).normalize(),i)n[4].setComponents(l,u,g,M).normalize(),n[5].setComponents(c-l,f-u,m-g,y-M).normalize();else if(n[4].setComponents(c-l,f-u,m-g,y-M).normalize(),t===Ei)n[5].setComponents(c+l,f+u,m+g,y+M).normalize();else if(t===Os)n[5].setComponents(l,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bn)}intersectsSprite(e){bn.center.set(0,0,0);const t=Lf.distanceTo(e.center);return bn.radius=.7071067811865476+t,bn.applyMatrix4(e.matrixWorld),this.intersectsSphere(bn)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(ma.x=n.normal.x>0?e.max.x:e.min.x,ma.y=n.normal.y>0?e.max.y:e.min.y,ma.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const wc=new ze;class bl{constructor(){this.coordinateSystem=Ei,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let n=0;n<t.length;n++){const s=t[n];wc.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[n]===void 0&&(i[n]=new zs),i[n].setFromProjectionMatrix(wc,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let n=0;n<e._count;n++)t[n]===void 0&&(t[n]=new zs),t[n].copy(i[n]);return this._count=e._count,this}clone(){return new bl().copy(this)}}class Tl extends Ai{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $a=new U,Ya=new U,Ec=new ze,xs=new qs,ga=new Hi,kr=new U,Ac=new U;class nr extends ct{constructor(e=new wt,t=new Tl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,s=t.count;n<s;n++)$a.fromBufferAttribute(t,n-1),Ya.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=$a.distanceTo(Ya);e.setAttribute("lineDistance",new Ye(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ga.copy(i.boundingSphere),ga.applyMatrix4(n),ga.radius+=s,e.ray.intersectsSphere(ga)===!1)return;Ec.copy(n).invert(),xs.copy(e.ray).applyMatrix4(Ec);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),x=h.getX(v+1),S=_a(this,e,xs,l,m,x,v);S&&t.push(S)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=_a(this,e,xs,l,v,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,r.start),p=Math.min(u.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=_a(this,e,xs,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=_a(this,e,xs,l,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function _a(a,e,t,i,n,s,r){const o=a.geometry.attributes.position;if($a.fromBufferAttribute(o,n),Ya.fromBufferAttribute(o,s),t.distanceSqToSegment($a,Ya,kr,Ac)>i)return;kr.applyMatrix4(a.matrixWorld);const c=e.ray.origin.distanceTo(kr);if(!(c<e.near||c>e.far))return{distance:c,point:Ac.clone().applyMatrix4(a.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:a}}const Cc=new U,Rc=new U;class Df extends nr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,s=t.count;n<s;n+=2)Cc.fromBufferAttribute(t,n),Rc.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Cc.distanceTo(Rc);e.setAttribute("lineDistance",new Ye(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nf extends nr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cd extends Ai{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Pc=new ze,Wo=new qs,va=new Hi,xa=new U;class Uf extends ct{constructor(e=new wt,t=new cd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),va.copy(i.boundingSphere),va.applyMatrix4(n),va.radius+=s,e.ray.intersectsSphere(va)===!1)return;Pc.copy(n).invert(),Wo.copy(e.ray).applyMatrix4(Pc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=u,v=f;p<v;p++){const g=c.getX(p);xa.fromBufferAttribute(d,g),Ic(xa,g,l,n,e,t,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let p=u,v=f;p<v;p++)xa.fromBufferAttribute(d,p),Ic(xa,p,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ic(a,e,t,i,n,s,r){const o=Wo.distanceSqToPoint(a);if(o<t){const l=new U;Wo.closestPointToPoint(a,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class hd extends Pt{constructor(e=[],t=is,i,n,s,r,o,l,c,h){super(e,t,i,n,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dd extends Pt{constructor(e,t,i,n,s,r,o,l,c){super(e,t,i,n,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ln extends Pt{constructor(e,t,i=Oi,n,s,r,o=Et,l=Et,c,h=mn,d=1){if(h!==mn&&h!==ji)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,n,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ml(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ud extends Ln{constructor(e,t=Oi,i=is,n,s,r=Et,o=Et,l,c=mn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,n,s,r,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class fd extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Kt extends wt{constructor(e=1,t=1,i=1,n=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:s,depthSegments:r};const o=this;n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,i,t,e,r,s,0),p("z","y","x",1,-1,i,t,-e,r,s,1),p("x","z","y",1,1,e,i,t,n,r,2),p("x","z","y",1,-1,e,i,-t,n,r,3),p("x","y","z",1,-1,e,t,i,n,s,4),p("x","y","z",-1,-1,e,t,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(d,2));function p(v,g,m,x,S,M,y,w,_,b,P){const A=M/_,I=y/b,F=M/2,k=y/2,R=w/2,H=_+1,z=b+1;let D=0,K=0;const V=new U;for(let j=0;j<z;j++){const q=j*I-k;for(let re=0;re<H;re++){const Fe=re*A-F;V[v]=Fe*x,V[g]=q*S,V[m]=R,c.push(V.x,V.y,V.z),V[v]=0,V[g]=0,V[m]=w>0?1:-1,h.push(V.x,V.y,V.z),d.push(re/_),d.push(1-j/b),D+=1}}for(let j=0;j<b;j++)for(let q=0;q<_;q++){const re=u+q+H*j,Fe=u+q+H*(j+1),L=u+(q+1)+H*(j+1),G=u+(q+1)+H*j;l.push(re,Fe,G),l.push(Fe,L,G),K+=6}o.addGroup(f,K,P),f+=K,u+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class An extends wt{constructor(e=1,t=1,i=1,n=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),s=Math.floor(s);const h=[],d=[],u=[],f=[];let p=0;const v=[],g=i/2;let m=0;x(),r===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Ye(d,3)),this.setAttribute("normal",new Ye(u,3)),this.setAttribute("uv",new Ye(f,2));function x(){const M=new U,y=new U;let w=0;const _=(t-e)/i;for(let b=0;b<=s;b++){const P=[],A=b/s,I=A*(t-e)+e;for(let F=0;F<=n;F++){const k=F/n,R=k*l+o,H=Math.sin(R),z=Math.cos(R);y.x=I*H,y.y=-A*i+g,y.z=I*z,d.push(y.x,y.y,y.z),M.set(H,_,z).normalize(),u.push(M.x,M.y,M.z),f.push(k,1-A),P.push(p++)}v.push(P)}for(let b=0;b<n;b++)for(let P=0;P<s;P++){const A=v[P][b],I=v[P+1][b],F=v[P+1][b+1],k=v[P][b+1];(e>0||P!==0)&&(h.push(A,I,k),w+=3),(t>0||P!==s-1)&&(h.push(I,F,k),w+=3)}c.addGroup(m,w,0),m+=w}function S(M){const y=p,w=new Re,_=new U;let b=0;const P=M===!0?e:t,A=M===!0?1:-1;for(let F=1;F<=n;F++)d.push(0,g*A,0),u.push(0,A,0),f.push(.5,.5),p++;const I=p;for(let F=0;F<=n;F++){const R=F/n*l+o,H=Math.cos(R),z=Math.sin(R);_.x=P*z,_.y=g*A,_.z=P*H,d.push(_.x,_.y,_.z),u.push(0,A,0),w.x=H*.5+.5,w.y=z*.5*A+.5,f.push(w.x,w.y),p++}for(let F=0;F<n;F++){const k=y+F,R=I+F;M===!0?h.push(R,R+1,k):h.push(R+1,R,k),b+=3}c.addGroup(m,b,M===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hs extends An{constructor(e=1,t=1,i=32,n=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,i,n,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Hs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wl extends wt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const s=[],r=[];o(n),c(i),h(),this.setAttribute("position",new Ye(s,3)),this.setAttribute("normal",new Ye(s.slice(),3)),this.setAttribute("uv",new Ye(r,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const S=new U,M=new U,y=new U;for(let w=0;w<t.length;w+=3)f(t[w+0],S),f(t[w+1],M),f(t[w+2],y),l(S,M,y,x)}function l(x,S,M,y){const w=y+1,_=[];for(let b=0;b<=w;b++){_[b]=[];const P=x.clone().lerp(M,b/w),A=S.clone().lerp(M,b/w),I=w-b;for(let F=0;F<=I;F++)F===0&&b===w?_[b][F]=P:_[b][F]=P.clone().lerp(A,F/I)}for(let b=0;b<w;b++)for(let P=0;P<2*(w-b)-1;P++){const A=Math.floor(P/2);P%2===0?(u(_[b][A+1]),u(_[b+1][A]),u(_[b][A])):(u(_[b][A+1]),u(_[b+1][A+1]),u(_[b+1][A]))}}function c(x){const S=new U;for(let M=0;M<s.length;M+=3)S.x=s[M+0],S.y=s[M+1],S.z=s[M+2],S.normalize().multiplyScalar(x),s[M+0]=S.x,s[M+1]=S.y,s[M+2]=S.z}function h(){const x=new U;for(let S=0;S<s.length;S+=3){x.x=s[S+0],x.y=s[S+1],x.z=s[S+2];const M=g(x)/2/Math.PI+.5,y=m(x)/Math.PI+.5;r.push(M,1-y)}p(),d()}function d(){for(let x=0;x<r.length;x+=6){const S=r[x+0],M=r[x+2],y=r[x+4],w=Math.max(S,M,y),_=Math.min(S,M,y);w>.9&&_<.1&&(S<.2&&(r[x+0]+=1),M<.2&&(r[x+2]+=1),y<.2&&(r[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function f(x,S){const M=x*3;S.x=e[M+0],S.y=e[M+1],S.z=e[M+2]}function p(){const x=new U,S=new U,M=new U,y=new U,w=new Re,_=new Re,b=new Re;for(let P=0,A=0;P<s.length;P+=9,A+=6){x.set(s[P+0],s[P+1],s[P+2]),S.set(s[P+3],s[P+4],s[P+5]),M.set(s[P+6],s[P+7],s[P+8]),w.set(r[A+0],r[A+1]),_.set(r[A+2],r[A+3]),b.set(r[A+4],r[A+5]),y.copy(x).add(S).add(M).divideScalar(3);const I=g(y);v(w,A+0,x,I),v(_,A+2,S,I),v(b,A+4,M,I)}}function v(x,S,M,y){y<0&&x.x===1&&(r[S]=x.x-1),M.x===0&&M.z===0&&(r[S]=y/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wl(e.vertices,e.indices,e.radius,e.detail)}}class El extends wl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new El(e.radius,e.detail)}}class ui extends wt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const s=e/2,r=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*u-r;for(let S=0;S<c;S++){const M=S*d-s;p.push(M,-x,0),v.push(0,0,1),g.push(S/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const S=x+c*m,M=x+c*(m+1),y=x+1+c*(m+1),w=x+1+c*m;f.push(S,M,w),f.push(M,y,w)}this.setIndex(f),this.setAttribute("position",new Ye(p,3)),this.setAttribute("normal",new Ye(v,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.width,e.height,e.widthSegments,e.heightSegments)}}class ni extends wt{constructor(e=.5,t=1,i=32,n=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:r},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/n,f=new U,p=new Re;for(let v=0;v<=n;v++){for(let g=0;g<=i;g++){const m=s+g/i*r;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let v=0;v<n;v++){const g=v*(i+1);for(let m=0;m<i;m++){const x=m+g,S=x,M=x+i+1,y=x+i+2,w=x+1;o.push(S,M,w),o.push(M,y,w)}}this.setIndex(o),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(c,3)),this.setAttribute("uv",new Ye(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ni(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Cn extends wt{constructor(e=1,t=32,i=16,n=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const h=[],d=new U,u=new U,f=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){const x=[],S=m/i,M=r+S*o,y=e*Math.cos(M),w=Math.sqrt(e*e-y*y);let _=0;m===0&&r===0?_=.5/t:m===i&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){const P=b/t,A=n+P*s;d.x=-w*Math.cos(A),d.y=y,d.z=w*Math.sin(A),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(P+_,1-S),x.push(c++)}h.push(x)}for(let m=0;m<i;m++)for(let x=0;x<t;x++){const S=h[m][x+1],M=h[m][x],y=h[m+1][x],w=h[m+1][x+1];(m!==0||r>0)&&f.push(S,M,w),(m!==i-1||l<Math.PI)&&f.push(M,y,w)}this.setIndex(f),this.setAttribute("position",new Ye(p,3)),this.setAttribute("normal",new Ye(v,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ls extends wt{constructor(e=1,t=.4,i=12,n=48,s=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:s,thetaStart:r,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const l=[],c=[],h=[],d=[],u=new U,f=new U,p=new U;for(let v=0;v<=i;v++){const g=r+v/i*o;for(let m=0;m<=n;m++){const x=m/n*s;f.x=(e+t*Math.cos(g))*Math.cos(x),f.y=(e+t*Math.cos(g))*Math.sin(x),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/n),d.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=n;g++){const m=(n+1)*v+g-1,x=(n+1)*(v-1)+g-1,S=(n+1)*(v-1)+g,M=(n+1)*v+g;l.push(m,x,M),l.push(x,S,M)}this.setIndex(l),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function ss(a){const e={};for(const t in a){e[t]={};for(const i in a[t]){const n=a[t][i];if(Lc(n))n.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Lc(n[0])){const s=[];for(let r=0,o=n.length;r<o;r++)s[r]=n[r].clone();e[t][i]=s}else e[t][i]=n.slice();else e[t][i]=n}}return e}function ei(a){const e={};for(let t=0;t<a.length;t++){const i=ss(a[t]);for(const n in i)e[n]=i[n]}return e}function Lc(a){return a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)}function Ff(a){const e=[];for(let t=0;t<a.length;t++)e.push(a[t].clone());return e}function pd(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Ui={clone:ss,merge:ei};var Bf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bf,this.fragmentShader=Of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=Ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Me().setHex(n.value);break;case"v2":this.uniforms[i].value=new Re().fromArray(n.value);break;case"v3":this.uniforms[i].value=new U().fromArray(n.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ze().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class md extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xt extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fi extends xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Re(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Qn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Qn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class kf extends Ai{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class zf extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hf extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function un(a,e){return!a||a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function ws(a){return a!==void 0&&a.inTangents!==void 0&&a.outTangents!==void 0}function Gf(a){function e(n,s){return a[n]-a[s]}const t=a.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Dc(a,e,t){const i=a.length,n=new a.constructor(i);for(let s=0,r=0;r!==i;++s){const o=t[s]*e;for(let l=0;l!==e;++l)n[r++]=a[o+l]}return n}function Vf(a,e,t,i){let n=1,s=a[0];for(;s!==void 0&&s[i]===void 0;)s=a[n++];if(s===void 0)return;let r=s[i];if(r!==void 0)if(Array.isArray(r))do r=s[i],r!==void 0&&(e.push(s.time),t.push(...r)),s=a[n++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[i],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[n++];while(s!==void 0);else do r=s[i],r!==void 0&&(e.push(s.time),t.push(r)),s=a[n++];while(s!==void 0)}class rs{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],s=t[i-1];e:{t:{let r;i:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<s)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=n,n=t[++i],e<n)break t}r=t.length;break i}if(!(e>=s)){const o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=s,s=t[--i-1],e>=s)break t}r=i,i=0;break i}break e}for(;i<r;){const o=i+r>>>1;e<t[o]?r=o:i=o+1}if(n=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,n)}return this.interpolate_(i,s,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n;for(let r=0;r!==n;++r)t[r]=i[s+r];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Wf extends rs{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kn,endingEnd:Kn}}intervalChanged_(e,t,i){const n=this.parameterPositions;let s=e-2,r=e+1,o=n[s],l=n[r];if(o===void 0)switch(this.getSettings_().endingStart){case jn:s=e,o=2*t-i;break;case Ga:s=n.length-2,o=t+n[s]-n[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case jn:r=e,l=2*i-t;break;case Ga:r=1,l=i+n[1]-n[0];break;default:r=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(i-t)/(n-t),v=p*p,g=v*p,m=-u*g+2*u*v-u*p,x=(1+u)*g+(-1.5-2*u)*v+(-.5+u)*p+1,S=(-1-f)*g+(1.5+f)*v+.5*p,M=f*g-f*v;for(let y=0;y!==o;++y)s[y]=m*r[h+y]+x*r[c+y]+S*r[l+y]+M*r[d+y];return s}}class gd extends rs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),d=1-h;for(let u=0;u!==o;++u)s[u]=r[c+u]*d+r[l+u]*h;return s}}class Xf extends rs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class qf extends rs{interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){const p=(i-t)/(n-t),v=1-p;for(let g=0;g!==o;++g)s[g]=r[c+g]*v+r[l+g]*p;return s}const u=o*2,f=e-1;for(let p=0;p!==o;++p){const v=r[c+p],g=r[l+p],m=f*u+p*2,x=d[m],S=d[m+1],M=e*u+p*2,y=h[M],w=h[M+1],_=Yf(i,t,x,y,n);s[p]=_d(_,v,S,w,g)}return s}}function _d(a,e,t,i,n){const s=1-a;return s*s*s*e+3*s*s*a*t+3*s*a*a*i+a*a*a*n}function $f(a,e,t,i,n){const s=1-a;return 3*s*s*(t-e)+6*s*a*(i-t)+3*a*a*(n-i)}function Yf(a,e,t,i,n){let s=(a-e)/(n-e);for(let r=0;r<8;r++){const o=_d(s,e,t,i,n)-a;if(Math.abs(o)<1e-10)break;const l=$f(s,e,t,i,n);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}class Ci{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=un(t,this.TimeBufferType),this.values=un(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:un(e.times,Array),values:un(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n),ws(e.settings)&&(i.settings={inTangents:un(e.settings.inTangents,Array),outTangents:un(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Xf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new gd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new qf(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Fs:t=this.InterpolantFactoryMethodDiscrete;break;case Bs:t=this.InterpolantFactoryMethodLinear;break;case mr:t=this.InterpolantFactoryMethodSmooth;break;case Ql:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fs;case this.InterpolantFactoryMethodLinear:return Bs;case this.InterpolantFactoryMethodSmooth:return mr;case this.InterpolantFactoryMethodBezier:return Ql}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e;ws(this.settings)&&(Nc(this.settings.inTangents,e),Nc(this.settings.outTangents,e))}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e;ws(this.settings)&&(Uc(this.settings.inTangents,e),Uc(this.settings.outTangents,e))}return this}trim(e,t){const i=this.times,n=i.length;let s=0,r=n-1;for(;s!==n&&i[s]<e;)++s;for(;r!==-1&&i[r]>t;)--r;if(++r,s!==0||r!==n){s>=r&&(r=Math.max(r,1),s=r-1);const o=this.getValueSize();this.times=i.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,s=i.length;s===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){He("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){He("KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(n!==void 0&&Gu(n))for(let o=0,l=n.length;o!==l;++o){const c=n[o];if(isNaN(c)){He("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===mr,s=e.length-1;let r=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{const d=o*i,u=d-i,f=d+i;for(let p=0;p!==i;++p){const v=t[d+p];if(v!==t[u+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];const d=o*i,u=r*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,ws(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}}function Nc(a,e){for(let t=0,i=a.length;t!==i;t+=2)a[t]+=e}function Uc(a,e){for(let t=0,i=a.length;t!==i;t+=2)a[t]*=e}Ci.prototype.ValueTypeName="";Ci.prototype.TimeBufferType=Float32Array;Ci.prototype.ValueBufferType=Float32Array;Ci.prototype.DefaultInterpolation=Bs;class os extends Ci{constructor(e,t,i){super(e,t,i)}}os.prototype.ValueTypeName="bool";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=Fs;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;class vd extends Ci{constructor(e,t,i,n){super(e,t,i,n)}}vd.prototype.ValueTypeName="color";class Gs extends Ci{constructor(e,t,i,n){super(e,t,i,n)}}Gs.prototype.ValueTypeName="number";class Kf extends rs{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t);let c=e*o;for(let h=c+o;c!==h;c+=4)vi.slerpFlat(s,0,r,c-o,r,c,l);return s}}class Vs extends Ci{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new Kf(this.times,this.values,this.getValueSize(),e)}}Vs.prototype.ValueTypeName="quaternion";Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class ls extends Ci{constructor(e,t,i){super(e,t,i)}}ls.prototype.ValueTypeName="string";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=Fs;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;class Ka extends Ci{constructor(e,t,i,n){super(e,t,i,n)}}Ka.prototype.ValueTypeName="vector";class Xo{constructor(e="",t=-1,i=[],n=gl){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=ki(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let r=0,o=i.length;r!==o;++r)t.push(Jf(i[r]).scale(n));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=i.length;s!==r;++s)t.push(Ci.toJSON(i[s]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const s=t.length,r=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=Gf(l);l=Dc(l,1,h),c=Dc(c,1,h),!n&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new Gs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,r)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const d=h[1];let u=n[d];u||(n[d]=u=[]),u.push(c)}}const r=[];for(const o in n)r.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return r}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function jf(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gs;case"vector":case"vector2":case"vector3":case"vector4":return Ka;case"color":return vd;case"quaternion":return Vs;case"bool":case"boolean":return os;case"string":return ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function Jf(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=jf(a.type);if(a.times===void 0){const i=[],n=[];Vf(a.keys,i,n,"value"),a.times=i,a.values=n}let t;return e.parse!==void 0?t=e.parse(a):t=new e(a.name,a.times,a.values,a.interpolation),ws(a.settings)&&(t.settings={inTangents:un(a.settings.inTangents,Float32Array),outTangents:un(a.settings.outTangents,Float32Array)}),t}const Ji={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(Fc(a)||(this.files[a]=e))},get:function(a){if(this.enabled!==!1&&!Fc(a))return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}};function Fc(a){try{const e=a.slice(a.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Zf{constructor(e,t,i){const n=this;let s=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,s===!1&&n.onStart!==void 0&&n.onStart(h,r,o),s=!0},this.itemEnd=function(h){r++,n.onProgress!==void 0&&n.onProgress(h,r,o),r===o&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Qf=new Zf;class Dn{constructor(e){this.manager=e!==void 0?e:Qf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,s){i.load(e,n,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}}Dn.DEFAULT_MATERIAL_NAME="__DEFAULT";const Yi={};class ep extends Error{constructor(e,t){super(e),this.response=t}}class ja extends Dn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ji.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Yi[e]!==void 0){Yi[e].push({onLoad:t,onProgress:i,onError:n});return}Yi[e]=[],Yi[e].push({onLoad:t,onProgress:i,onError:n});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ne("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Yi[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){x();function x(){d.read().then(({done:S,value:M})=>{if(S)m.close();else{v+=M.byteLength;const y=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let w=0,_=h.length;w<_;w++){const b=h[w];b.onProgress&&b.onProgress(y)}m.enqueue(M),x()}},S=>{m.error(S)})}}});return new Response(g)}else throw new ep(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Ji.add(`file:${e}`,c);const h=Yi[e];delete Yi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Yi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Yi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const qn=new WeakMap;class tp extends Dn{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=Ji.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let d=qn.get(r);d===void 0&&(d=[],qn.set(r,d)),d.push({onLoad:t,onError:n})}return r}const o=ks("img");function l(){h(),t&&t(this);const d=qn.get(this)||[];for(let u=0;u<d.length;u++){const f=d[u];f.onLoad&&f.onLoad(this)}qn.delete(this),s.manager.itemEnd(e)}function c(d){h(),n&&n(d),Ji.remove(`image:${e}`);const u=qn.get(this)||[];for(let f=0;f<u.length;f++){const p=u[f];p.onError&&p.onError(d)}qn.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ji.add(`image:${e}`,o),s.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}}class ip extends Dn{constructor(e){super(e)}load(e,t,i,n){const s=new Pt,r=new tp(this.manager);return r.setPriority(this.priority),r.setCache(this.cache),r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,n),s}}class sr extends ct{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class np extends sr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Me(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const zr=new ze,Bc=new U,Oc=new U;class Al{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(zr,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,r=n?n.z/s.x:1,o=n?n.w/s.y:1,l=n?n.x/s.x:0,c=n?n.y/s.y:0;e.coordinateSystem===Os||e.reversedDepth?t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(zr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ma=new U,Sa=new vi,Ri=new U;class xd extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ma,Sa,Ri),Ri.x===1&&Ri.y===1&&Ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Ri.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ma,Sa,Ri),Ri.x===1&&Ri.y===1&&Ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const cn=new U,kc=new Re,zc=new Re;class si extends xd{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ns*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(cn.x,cn.y).multiplyScalar(-e/cn.z),cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(cn.x,cn.y).multiplyScalar(-e/cn.z)}getViewSize(e,t){return this.getViewBounds(e,kc,zc),t.subVectors(zc,kc)}setViewOffset(e,t,i,n,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,s=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*n/l,t-=r.offsetY*i/c,n*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sp extends Al{constructor(){super(new si(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=ns*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||n!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=n,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class ap extends sr{constructor(e,t,i=0,n=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=i,this.angle=n,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new sp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class rp extends Al{constructor(){super(new si(90,1,.5,500)),this.isPointLightShadow=!0}}class Md extends sr{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new rp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ar extends xd{constructor(e=-1,t=1,i=1,n=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class op extends Al{constructor(){super(new ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qo extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new op}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class fn{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Hr=new WeakMap;class lp extends Dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ne("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ne("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=Ji.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{Hr.has(r)===!0?(n&&n(Hr.get(r)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ji.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){n&&n(c),Hr.set(l,c),Ji.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Ji.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const $n=-90,Yn=1;class $o extends ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new si($n,Yn,e,t);n.layers=this.layers,this.add(n);const s=new si($n,Yn,e,t);s.layers=this.layers,this.add(s);const r=new si($n,Yn,e,t);r.layers=this.layers,this.add(r);const o=new si($n,Yn,e,t);o.layers=this.layers,this.add(o);const l=new si($n,Yn,e,t);l.layers=this.layers,this.add(l);const c=new si($n,Yn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,s,r,o,l]=t;for(const c of t)this.remove(c);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Os)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,2,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=v,e.setRenderTarget(i,5,n),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class cp extends si{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class Sd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=hp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function hp(){this._document.hidden===!1&&this.reset()}class dp{constructor(e,t,i){this.binding=e,this.valueSize=i;let n,s,r;switch(t){case"quaternion":n=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":n=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:n=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=n,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,n=this.valueSize,s=e*n+n;let r=this.cumulativeWeight;if(r===0){for(let o=0;o!==n;++o)i[s+o]=i[o];r=t}else{r+=t;const o=t/r;this._mixBufferRegion(i,s,0,o,n)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,n=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,n,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,n=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(i,n,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(i,n,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,n);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,n=i*this._origIndex;e.getValue(t,n);for(let s=i,r=n;s!==r;++s)t[s]=t[n+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,n,s){if(n>=.5)for(let r=0;r!==s;++r)e[t+r]=e[i+r]}_slerp(e,t,i,n){vi.slerpFlat(e,t,e,t,e,i,n)}_slerpAdditive(e,t,i,n,s){const r=this._workIndex*s;vi.multiplyQuaternionsFlat(e,r,e,t,e,i),vi.slerpFlat(e,t,e,t,e,r,n)}_lerp(e,t,i,n,s){const r=1-n;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*r+e[i+o]*n}}_lerpAdditive(e,t,i,n,s){for(let r=0;r!==s;++r){const o=t+r;e[o]=e[o]+e[i+r]*n}}}const Cl="\\[\\]\\.:\\/",up=new RegExp("["+Cl+"]","g"),Rl="[^"+Cl+"]",fp="[^"+Cl.replace("\\.","")+"]",pp=/((?:WC+[\/:])*)/.source.replace("WC",Rl),mp=/(WCOD+)?/.source.replace("WCOD",fp),gp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rl),_p=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rl),vp=new RegExp("^"+pp+mp+gp+_p+"$"),xp=["material","materials","bones","map"];class Mp{constructor(e,t,i){const n=i||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,s=i.length;n!==s;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class at{constructor(e,t,i){this.path=t,this.parsedPath=i||at.parseTrackName(t),this.node=at.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new at.Composite(e,t,i):new at(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(up,"")}static parseTrackName(e){const t=vp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const s=i.nodeName.substring(n+1);xp.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(s){for(let r=0;r<s.length;r++){const o=s[r];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let s=t.propertyIndex;if(e||(e=at.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[n];if(r===void 0){const c=t.nodeName;He("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}at.Composite=Mp;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Sp{constructor(e,t,i=null,n=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=n;const s=t.tracks,r=s.length,o=new Array(r),l={endingStart:Kn,endingEnd:Kn};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=$h,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){const n=this._clip.duration,s=e._clip.duration,r=s/n,o=n/s;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,r,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const n=this._mixer,s=n.time,r=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=n._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+i,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,n){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Iu:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(r),c[h].accumulateAdditive(o);break;case gl:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(r),c[h].accumulate(n,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(this.stopFading(),n===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let n=this.time+e,s=this._loopCount;const r=i===Pu;if(e===0)return s===-1?n:r&&(s&1)===1?t-n:n;if(i===Go){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(n>=t)n=t;else if(n<0)n=0;else{this.time=n;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),n>=t||n<0){const o=Math.floor(n/t);n-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,n=e>0?t:0,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=n,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=n;if(r&&(s&1)===1)return t-n}return n}_setEndings(e,t,i){const n=this._interpolantSettings;i?(n.endingStart=jn,n.endingEnd=jn):(e?n.endingStart=this.zeroSlopeAtStart?jn:Kn:n.endingStart=Ga,t?n.endingEnd=this.zeroSlopeAtEnd?jn:Kn:n.endingEnd=Ga)}_scheduleFading(e,t,i){const n=this._mixer,s=n.time;let r=this._weightInterpolant;r===null&&(r=n._lendControlInterpolant(),this._weightInterpolant=r);const o=r.parameterPositions,l=r.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=i,this}}const yp=new Float32Array(1);class bp extends gn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const i=e._localRoot||this._root,n=e._clip.tracks,s=n.length,r=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==s;++d){const u=n[d],f=u.name;let p=h[f];if(p!==void 0)++p.referenceCount,r[d]=p;else{if(p=r[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[d].binding.parsedPath;p=new dp(at.create(i,f,v),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),r[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,n=e._clip.uuid,s=this._actionsByClip[n];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,n,i)}const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const n=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const o=r.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=n.length,n.push(e),r.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],n=e._cacheIndex;i._cacheIndex=n,t[n]=i,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,o=r[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,n=this._nActiveActions++,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,n=--this._nActiveActions,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){const n=this._bindingsByRootAndName,s=this._bindings;let r=n[t];r===void 0&&(r={},n[t]=r),r[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,n=i.rootNode.uuid,s=i.path,r=this._bindingsByRootAndName,o=r[n],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete r[n]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,n=this._nActiveBindings++,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,n=--this._nActiveBindings,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new gd(new Float32Array(2),new Float32Array(2),1,yp),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,n=--this._nActiveControlInterpolants,s=t[n];e.__cacheIndex=n,t[n]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){const n=t||this._root,s=n.uuid;let r=typeof e=="string"?Xo.findByName(n,e):e;const o=r!==null?r.uuid:e,l=this._actionsByClip[o];let c=null;if(i===void 0&&(r!==null?i=r.blendMode:i=gl),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===i)return d;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new Sp(this,r,t,i);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const i=t||this._root,n=i.uuid,s=typeof e=="string"?Xo.findByName(i,e):e,r=s?s.uuid:e,o=this._actionsByClip[r];return o!==void 0&&o.actionByRoot[n]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,n=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(n,e,s,r);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,n=this._actionsByClip,s=n[i];if(s!==void 0){const r=s.knownActions;for(let o=0,l=r.length;o!==l;++o){const c=r[o];this._deactivateAction(c);const h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete n[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const r in i){const o=i[r].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const n=this._bindingsByRootAndName,s=n[t];if(s!==void 0)for(const r in s){const o=s[r];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}const Hc=new ze;class Tp{constructor(e,t,i=0,n=1/0){this.ray=new qs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):He("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hc),this}intersectObject(e,t=!0,i=[]){return Yo(e,this,i,t),i.sort(Gc),i}intersectObjects(e,t=!0,i=[]){for(let n=0,s=e.length;n<s;n++)Yo(e[n],this,i,t);return i.sort(Gc),i}}function Gc(a,e){return a.distance-e.distance}function Yo(a,e,t,i){let n=!0;if(a.layers.test(e.layers)&&a.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){const s=a.children;for(let r=0,o=s.length;r<o;r++)Yo(s[r],e,t,!0)}}function Vc(a,e,t,i){const n=wp(i);switch(t){case Xh:return a*e;case ul:return a*e/n.components*n.byteLength;case fl:return a*e/n.components*n.byteLength;case In:return a*e*2/n.components*n.byteLength;case pl:return a*e*2/n.components*n.byteLength;case qh:return a*e*3/n.components*n.byteLength;case _i:return a*e*4/n.components*n.byteLength;case ml:return a*e*4/n.components*n.byteLength;case Na:case Ua:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Fa:case Ba:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case fo:case mo:return Math.max(a,16)*Math.max(e,8)/4;case uo:case po:return Math.max(a,8)*Math.max(e,8)/2;case go:case _o:case xo:case Mo:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case vo:case za:case So:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case yo:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case bo:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case To:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case wo:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case Eo:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case Co:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case Po:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case Io:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case Lo:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Do:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case No:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Uo:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case Fo:case Bo:case Oo:return Math.ceil(a/4)*Math.ceil(e/4)*16;case ko:case zo:return Math.ceil(a/4)*Math.ceil(e/4)*8;case Ha:case Ho:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wp(a){switch(a){case ai:case Hh:return{byteLength:1,components:1};case Us:case Gh:case jt:return{byteLength:2,components:1};case hl:case dl:return{byteLength:2,components:4};case Oi:case cl:case gi:return{byteLength:4,components:1};case Vh:case Wh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:il}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=il);function yd(){let a=null,e=!1,t=null,i=null;function n(s,r){i=a.requestAnimationFrame(n),t(s,r)}return{start:function(){e!==!0&&t!==null&&a!==null&&(i=a.requestAnimationFrame(n),e=!0)},stop:function(){a!==null&&a.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){a=s}}}function Ep(a){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=a.createBuffer();a.bindBuffer(l,u),a.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=a.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=a.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=a.SHORT;else if(c instanceof Uint32Array)f=a.UNSIGNED_INT;else if(c instanceof Int32Array)f=a.INT;else if(c instanceof Int8Array)f=a.BYTE;else if(c instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(a.bindBuffer(c,o),d.length===0)a.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];a.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(a.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:s,update:r}}var Ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,im="gl_FragColor = linearToOutputTexel( gl_FragColor );",nm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,um=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_m=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Em=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Rm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,km=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Km=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ig=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ng=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ag=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ug=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ag=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ig=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ng=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ug=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$g=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:Ap,alphahash_pars_fragment:Cp,alphamap_fragment:Rp,alphamap_pars_fragment:Pp,alphatest_fragment:Ip,alphatest_pars_fragment:Lp,aomap_fragment:Dp,aomap_pars_fragment:Np,batching_pars_vertex:Up,batching_vertex:Fp,begin_vertex:Bp,beginnormal_vertex:Op,bsdfs:kp,iridescence_fragment:zp,bumpmap_pars_fragment:Hp,clipping_planes_fragment:Gp,clipping_planes_pars_fragment:Vp,clipping_planes_pars_vertex:Wp,clipping_planes_vertex:Xp,color_fragment:qp,color_pars_fragment:$p,color_pars_vertex:Yp,color_vertex:Kp,common:jp,defaultnormal_vertex:Jp,displacementmap_pars_vertex:Zp,displacementmap_vertex:Qp,emissivemap_fragment:em,emissivemap_pars_fragment:tm,colorspace_fragment:im,colorspace_pars_fragment:nm,envmap_fragment:sm,envmap_common_pars_fragment:am,envmap_pars_fragment:rm,envmap_pars_vertex:om,envmap_physical_pars_fragment:vm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:hm,fog_fragment:dm,fog_pars_fragment:um,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:_m,lights_toon_fragment:xm,lights_toon_pars_fragment:Mm,lights_phong_fragment:Sm,lights_phong_pars_fragment:ym,lights_physical_fragment:bm,lights_physical_pars_fragment:Tm,lights_fragment_begin:wm,lights_fragment_maps:Em,lights_fragment_end:Am,lightprobes_pars_fragment:Cm,logdepthbuf_fragment:Rm,logdepthbuf_pars_fragment:Pm,logdepthbuf_pars_vertex:Im,logdepthbuf_vertex:Lm,map_fragment:Dm,map_pars_fragment:Nm,map_particle_fragment:Um,map_particle_pars_fragment:Fm,metalnessmap_fragment:Bm,metalnessmap_pars_fragment:Om,morphinstance_vertex:km,morphcolor_vertex:zm,morphnormal_vertex:Hm,morphtarget_pars_vertex:Gm,morphtarget_vertex:Vm,normal_fragment_begin:Wm,normal_fragment_maps:Xm,normal_pars_fragment:qm,normal_pars_vertex:$m,normal_vertex:Ym,normalmap_pars_fragment:Km,clearcoat_normal_fragment_begin:jm,clearcoat_normal_fragment_maps:Jm,clearcoat_pars_fragment:Zm,iridescence_pars_fragment:Qm,opaque_fragment:eg,packing:tg,premultiplied_alpha_fragment:ig,project_vertex:ng,dithering_fragment:sg,dithering_pars_fragment:ag,roughnessmap_fragment:rg,roughnessmap_pars_fragment:og,shadowmap_pars_fragment:lg,shadowmap_pars_vertex:cg,shadowmap_vertex:hg,shadowmask_pars_fragment:dg,skinbase_vertex:ug,skinning_pars_vertex:fg,skinning_vertex:pg,skinnormal_vertex:mg,specularmap_fragment:gg,specularmap_pars_fragment:_g,tonemapping_fragment:vg,tonemapping_pars_fragment:xg,transmission_fragment:Mg,transmission_pars_fragment:Sg,uv_pars_fragment:yg,uv_pars_vertex:bg,uv_vertex:Tg,worldpos_vertex:wg,background_vert:Eg,background_frag:Ag,backgroundCube_vert:Cg,backgroundCube_frag:Rg,cube_vert:Pg,cube_frag:Ig,depth_vert:Lg,depth_frag:Dg,distance_vert:Ng,distance_frag:Ug,equirect_vert:Fg,equirect_frag:Bg,linedashed_vert:Og,linedashed_frag:kg,meshbasic_vert:zg,meshbasic_frag:Hg,meshlambert_vert:Gg,meshlambert_frag:Vg,meshmatcap_vert:Wg,meshmatcap_frag:Xg,meshnormal_vert:qg,meshnormal_frag:$g,meshphong_vert:Yg,meshphong_frag:Kg,meshphysical_vert:jg,meshphysical_frag:Jg,meshtoon_vert:Zg,meshtoon_frag:Qg,points_vert:e0,points_frag:t0,shadow_vert:i0,shadow_frag:n0,sprite_vert:s0,sprite_frag:a0},xe={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Di={basic:{uniforms:ei([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:ei([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Me(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:ei([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:ei([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:ei([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Me(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:ei([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:ei([xe.points,xe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:ei([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:ei([xe.common,xe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:ei([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:ei([xe.sprite,xe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:ei([xe.common,xe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:ei([xe.lights,xe.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Di.physical={uniforms:ei([Di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const ya={r:0,b:0,g:0},r0=new ze,bd=new Ve;bd.set(-1,0,0,0,1,0,0,0,1);function o0(a,e,t,i,n,s){const r=new Me(0);let o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const M=x.backgroundBlurriness>0;S=e.get(S,M)}return S}function p(x){let S=!1;const M=f(x);M===null?g(r,o):M&&M.isColor&&(g(M,1),S=!0);const y=a.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(a.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function v(x,S){const M=f(S);M&&M.isCubeTexture?(c===void 0&&(c=new Ie(new Kt(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:ss(Di.backgroundCube.uniforms),vertexShader:Di.backgroundCube.vertexShader,fragmentShader:Di.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(r0.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bd),c.material.toneMapped=Ke.getTransfer(M.colorSpace)!==st,(h!==M||d!==M.version||u!==a.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=a.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ie(new ui(2,2),new Tt({name:"BackgroundMaterial",uniforms:ss(Di.background.uniforms),vertexShader:Di.background.vertexShader,fragmentShader:Di.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(M.colorSpace)!==st,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==a.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=a.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,S){x.getRGB(ya,pd(a)),t.buffers.color.setClear(ya.r,ya.g,ya.b,S,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,S=1){r.set(x),o=S,g(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(r,o)},render:p,addToRenderList:v,dispose:m}}function l0(a,e){const t=a.getParameter(a.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,r=!1;function o(I,F,k,R,H){let z=!1;const D=d(I,R,k,F);s!==D&&(s=D,c(s.object)),z=f(I,R,k,H),z&&p(I,R,k,H),H!==null&&e.update(H,a.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,M(I,F,k,R),H!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return a.createVertexArray()}function c(I){return a.bindVertexArray(I)}function h(I){return a.deleteVertexArray(I)}function d(I,F,k,R){const H=R.wireframe===!0;let z=i[F.id];z===void 0&&(z={},i[F.id]=z);const D=I.isInstancedMesh===!0?I.id:0;let K=z[D];K===void 0&&(K={},z[D]=K);let V=K[k.id];V===void 0&&(V={},K[k.id]=V);let j=V[H];return j===void 0&&(j=u(l()),V[H]=j),j}function u(I){const F=[],k=[],R=[];for(let H=0;H<t;H++)F[H]=0,k[H]=0,R[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:k,attributeDivisors:R,object:I,attributes:{},index:null}}function f(I,F,k,R){const H=s.attributes,z=F.attributes;let D=0;const K=k.getAttributes();for(const V in K)if(K[V].location>=0){const q=H[V];let re=z[V];if(re===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(re=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(re=I.instanceColor)),q===void 0||q.attribute!==re||re&&q.data!==re.data)return!0;D++}return s.attributesNum!==D||s.index!==R}function p(I,F,k,R){const H={},z=F.attributes;let D=0;const K=k.getAttributes();for(const V in K)if(K[V].location>=0){let q=z[V];q===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(q=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(q=I.instanceColor));const re={};re.attribute=q,q&&q.data&&(re.data=q.data),H[V]=re,D++}s.attributes=H,s.attributesNum=D,s.index=R}function v(){const I=s.newAttributes;for(let F=0,k=I.length;F<k;F++)I[F]=0}function g(I){m(I,0)}function m(I,F){const k=s.newAttributes,R=s.enabledAttributes,H=s.attributeDivisors;k[I]=1,R[I]===0&&(a.enableVertexAttribArray(I),R[I]=1),H[I]!==F&&(a.vertexAttribDivisor(I,F),H[I]=F)}function x(){const I=s.newAttributes,F=s.enabledAttributes;for(let k=0,R=F.length;k<R;k++)F[k]!==I[k]&&(a.disableVertexAttribArray(k),F[k]=0)}function S(I,F,k,R,H,z,D){D===!0?a.vertexAttribIPointer(I,F,k,H,z):a.vertexAttribPointer(I,F,k,R,H,z)}function M(I,F,k,R){v();const H=R.attributes,z=k.getAttributes(),D=F.defaultAttributeValues;for(const K in z){const V=z[K];if(V.location>=0){let j=H[K];if(j===void 0&&(K==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),K==="instanceColor"&&I.instanceColor&&(j=I.instanceColor)),j!==void 0){const q=j.normalized,re=j.itemSize,Fe=e.get(j);if(Fe===void 0)continue;const L=Fe.buffer,G=Fe.type,se=Fe.bytesPerElement,le=G===a.INT||G===a.UNSIGNED_INT||j.gpuType===cl;if(j.isInterleavedBufferAttribute){const ie=j.data,be=ie.isInterleavedBuffer===!0?ie.stride:ie.itemSize,Ue=j.offset;if(ie.isInstancedInterleavedBuffer||ie.isInstancedBufferAttribute){for(let he=0;he<V.locationSize;he++)m(V.location+he,ie.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let he=0;he<V.locationSize;he++)g(V.location+he);a.bindBuffer(a.ARRAY_BUFFER,L);for(let he=0;he<V.locationSize;he++)S(V.location+he,re/V.locationSize,G,q,be*se,(Ue+re/V.locationSize*he)*se,le)}else{if(j.isInstancedBufferAttribute){for(let ie=0;ie<V.locationSize;ie++)m(V.location+ie,j.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ie=0;ie<V.locationSize;ie++)g(V.location+ie);a.bindBuffer(a.ARRAY_BUFFER,L);for(let ie=0;ie<V.locationSize;ie++)S(V.location+ie,re/V.locationSize,G,q,re*se,re/V.locationSize*ie*se,le)}}else if(D!==void 0){const q=D[K];if(q!==void 0)switch(q.length){case 2:a.vertexAttrib2fv(V.location,q);break;case 3:a.vertexAttrib3fv(V.location,q);break;case 4:a.vertexAttrib4fv(V.location,q);break;default:a.vertexAttrib1fv(V.location,q)}}}}x()}function y(){P();for(const I in i){const F=i[I];for(const k in F){const R=F[k];for(const H in R){const z=R[H];for(const D in z)h(z[D].object),delete z[D];delete R[H]}}delete i[I]}}function w(I){if(i[I.id]===void 0)return;const F=i[I.id];for(const k in F){const R=F[k];for(const H in R){const z=R[H];for(const D in z)h(z[D].object),delete z[D];delete R[H]}}delete i[I.id]}function _(I){for(const F in i){const k=i[F];for(const R in k){const H=k[R];if(H[I.id]===void 0)continue;const z=H[I.id];for(const D in z)h(z[D].object),delete z[D];delete H[I.id]}}}function b(I){for(const F in i){const k=i[F],R=I.isInstancedMesh===!0?I.id:0,H=k[R];if(H!==void 0){for(const z in H){const D=H[z];for(const K in D)h(D[K].object),delete D[K];delete H[z]}delete k[R],Object.keys(k).length===0&&delete i[F]}}}function P(){A(),r=!0,s!==n&&(s=n,c(s.object))}function A(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:P,resetDefaultState:A,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function c0(a,e,t){let i;function n(l){i=l}function s(l,c){a.drawArrays(i,l,c),t.update(c,i,1)}function r(l,c,h){h!==0&&(a.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,i,1)}this.setMode=n,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function h0(a,e,t,i){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");n=a.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(_){return!(_!==_i&&i.convert(_)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const b=_===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==ai&&_!==gi&&!b&&i.convert(_)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ne("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Ne("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),p=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=a.getParameter(a.MAX_TEXTURE_SIZE),g=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),m=a.getParameter(a.MAX_VERTEX_ATTRIBS),x=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),S=a.getParameter(a.MAX_VARYING_VECTORS),M=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),y=a.getParameter(a.MAX_SAMPLES),w=a.getParameter(a.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:M,maxSamples:y,samples:w}}function d0(a){const e=this;let t=null,i=0,n=!1,s=!1;const r=new dn,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=a.get(d);if(!n||p===null||p.length===0||s&&!g)s?h(null):c();else{const x=s?0:i,S=x*4;let M=m.clippingState||null;l.value=M,M=h(p,u,S,f);for(let y=0;y!==S;++y)M[y]=t[y];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,M=f;S!==v;++S,M+=4)r.copy(d[S]).applyMatrix4(x,o),r.normal.toArray(g,M),g[M+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}class Pl extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new hd(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Kt(5,5,5),s=new Tt({name:"CubemapFromEquirect",uniforms:ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ii,blending:ti});s.uniforms.tEquirect.value=t;const r=new Ie(n,s),o=t.minFilter;return t.minFilter===Bi&&(t.minFilter=Vt),new $o(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,n);e.setRenderTarget(s)}}const Wc=256,u0=3,f0=20,Td=256,wd=16,p0=3,m0=new U,g0=new Me;class Ws{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new $o(1,10,null),this._boxMesh=new Ie(new Kt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,n=100,s={}){const{size:r=256,position:o=m0}=s,l=this._renderer;this._setSize(r);const c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);const d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(g0));const g=new $o(i,n,h);return g.position.copy(o),g.update(l,e),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=p,e.background=v,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Wc,td(e))}_fromTexture(e,t){e.mapping===is||e.mapping===Ns?this._setSize(e.image.length===0?Wc:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=Xc(e,!1,!1),i=Math.log2(e)-u0;for(let n=0;n<=i;n++)t.texture.mipmaps.push({width:e>>n,height:e>>n});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Xc(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const n=this._boxMesh,s=this._cubeCamera;n.material=i,s.renderTarget=e,s.activeMipmapLevel=t;const r=e.width>>t;e.viewport.set(0,0,r,r),s.update(this._renderer,n),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===is||e.mapping===Ns?(this._cubemapMaterial===null&&(this._cubemapMaterial=$c()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=qc()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=_0(),this._integrationMaterial=v0());const t=this._cubeSize,i=e.texture.mipmaps.length-1,n=this._ggxMaterial.uniforms;n.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/wd);for(let r=0;r<=i;r++){const o=Ws.lodToRoughness(r,i);if(r>i-p0)s.roughness.value=o,this._renderCube(e,r,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(Td*Math.pow(o,4)))+.5:0;n.roughness.value=o,n.lodBias.value=l,this._renderCube(e,r,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=x0());const i=this._blurMaterial,n=i.uniforms,s=this._sourceTarget;n.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,n.envMap.value=s.texture,this._renderCube(e,0,i),n.envMap.value=e.texture,this._renderCube(s,0,i)}}function Xc(a,e,t){return new Pl(a,{minFilter:Bi,generateMipmaps:e,type:jt,colorSpace:li,depthBuffer:t})}function Ys(a,e,t){return new Tt({name:a,uniforms:e,vertexShader:$e.cube_vert,fragmentShader:t,side:ii,blending:ti,depthTest:!1,depthWrite:!1})}function _0(){return Ys("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Td}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function v0(){return Ys("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:wd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function x0(){return Ys("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${f0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function qc(){return Ys("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function $c(){return Ys("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function M0(a){let e=new WeakMap,t=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?r(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===fr||f===pr)if(e.has(u)){const p=e.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const v=new Pl(p.height);return v.fromEquirectangularTexture(a,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const f=u.mapping,p=f===fr||f===pr,v=f===is||f===Ns;if(p||v){let g=t.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new Ws(a)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const x=u.image;return p&&x&&x.height>0||v&&x&&l(x)?(i===null&&(i=new Ws(a)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===fr?u.mapping=is:f===pr&&(u.mapping=Ns),u}function l(u){let f=0;const p=6;for(let v=0;v<p;v++)u[v]!==void 0&&f++;return f===p}function c(u){const f=u.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function S0(a){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=a.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&Qn("WebGLRenderer: "+i+" extension not supported."),n}}}function y0(a,e,t,i){const n={},s=new WeakMap,r=new FinalizationRegistry(p=>delete n[p]);function o(p){l(p.target)}function l(p){p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete n[p.id],r.unregister(p);const v=s.get(p);v&&(e.remove(v),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(p,v){return n[v.id]!==void 0||(v.addEventListener("dispose",o),n[v.id]=new WeakRef(v),r.register(v,v.id,v),t.memory.geometries++),v}function h(p){const v=p.attributes;for(const g in v)e.update(v[g],a.ARRAY_BUFFER)}function d(p){const v=p.index,g=p.attributes.position;let m=0;if(g===void 0)return;const x=v!==null?v.array.length:g.array.length/3-1,S=g.count>=65535?rd:ad,M=new S(Math.ceil(x/3)*6,1),y=M.array;if(v!==null){const _=v.array;m=v.version;for(let b=0,P=0;b<x;b+=3){const A=_[b+0],I=_[b+1],F=_[b+2];y[P++]=A,y[P++]=I,y[P++]=I,y[P++]=F,y[P++]=F,y[P++]=A}}else{m=g.version;for(let _=0,b=0;_<x;_+=3){const P=_+0,A=_+1,I=_+2;y[b++]=P,y[b++]=A,y[b++]=A,y[b++]=I,y[b++]=I,y[b++]=P}}M.version=m;const w=s.get(p);w&&e.remove(w),s.set(p,M)}function u(p){const v=s.get(p);if(v){const g=p.index;g!==null&&v.version<g.version&&d(p)}else d(p);return s.get(p)}function f(){for(const p in n){const v=n[p].deref();v!==void 0&&l(v)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function b0(a,e,t){let i;function n(d){i=d}let s,r;function o(d){s=d.type,r=d.bytesPerElement}function l(d,u){a.drawElements(i,u,s,d*r),t.update(u,i,1)}function c(d,u,f){f!==0&&(a.drawElementsInstanced(i,u,s,d*r,f),t.update(u,i,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,f);let v=0;for(let g=0;g<f;g++)v+=u[g];t.update(v,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function T0(a){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case a.TRIANGLES:t.triangles+=o*(s/3);break;case a.LINES:t.lines+=o*(s/2);break;case a.LINE_STRIP:t.lines+=o*(s-1);break;case a.LINE_LOOP:t.lines+=o*s;break;case a.POINTS:t.points+=o*s;break;default:He("WebGLInfo: Unknown draw mode:",r);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function w0(a,e,t){const i=new WeakMap,n=new gt;function s(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let P=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),p===!0&&(S=2),v===!0&&(S=3);let M=o.attributes.position.count*S,y=1;M>e.maxTextureSize&&(y=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*y*4*d),_=new id(w,M,y,d);_.type=gi,_.needsUpdate=!0;const b=S*4;for(let A=0;A<d;A++){const I=g[A],F=m[A],k=x[A],R=M*y*4*A;for(let H=0;H<I.count;H++){const z=H*b;f===!0&&(n.fromBufferAttribute(I,H),w[R+z+0]=n.x,w[R+z+1]=n.y,w[R+z+2]=n.z,w[R+z+3]=0),p===!0&&(n.fromBufferAttribute(F,H),w[R+z+4]=n.x,w[R+z+5]=n.y,w[R+z+6]=n.z,w[R+z+7]=0),v===!0&&(n.fromBufferAttribute(k,H),w[R+z+8]=n.x,w[R+z+9]=n.y,w[R+z+10]=n.z,w[R+z+11]=k.itemSize===4?n.w:1)}}u={count:d,texture:_,size:new Re(M,y)},i.set(o,u),o.addEventListener("dispose",P)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(a,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(a,"morphTargetBaseInfluence",p),l.getUniforms().setValue(a,"morphTargetInfluences",c)}l.getUniforms().setValue(a,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function E0(a,e,t,i,n){let s=new WeakMap;function r(c){const h=n.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,a.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,a.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:r,dispose:o}}const A0={[nl]:"LINEAR_TONE_MAPPING",[sl]:"REINHARD_TONE_MAPPING",[al]:"CINEON_TONE_MAPPING",[Qa]:"ACES_FILMIC_TONE_MAPPING",[ol]:"AGX_TONE_MAPPING",[ll]:"NEUTRAL_TONE_MAPPING",[rl]:"CUSTOM_TONE_MAPPING"};function C0(a,e,t,i,n,s){const r=new Jt(e,t,{type:a,depthBuffer:n,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new wt;h.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ye([0,2,0,0,2,0],2));const d=new md({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ie(h,d),f=new ar(-1,1,1,-1,0,1);let p=null,v=null,g=!1,m,x=null,S=[],M=!1;this.setSize=function(y,w){r.setSize(y,w),o!==null&&o.setSize(y,w),l!==null&&l.setSize(y,w);for(let _=0;_<S.length;_++){const b=S[_];b.setSize&&b.setSize(y,w)}},this.setEffects=function(y){S=y,M=S.length>0&&S[0].isRenderPass===!0;const w=r.width,_=r.height;S.length>0&&o===null&&(o=new Jt(w,_,{type:jt,depthBuffer:!1,stencilBuffer:!1}),l=new Jt(w,_,{type:jt,depthBuffer:!1,stencilBuffer:!1}));const b=n===!0&&S.some(P=>P.needsDepthTexture===!0);b!==(r.depthTexture!==null)&&(b===!0&&c===null&&(c=new Ln(w,_),s===!0&&(c.format=ji,c.type=Pn)),r.dispose(),r.depthTexture=b?c:null,r.resolveDepthBuffer=b,r.storeMultisampledDepthBuffer=b);for(let P=0;P<S.length;P++){const A=S[P];A.setSize&&A.setSize(w,_),b&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(y,w){if(g||y.toneMapping===Qi&&S.length===0)return!1;if(x=w,w!==null){const _=w.width,b=w.height;(r.width!==_||r.height!==b)&&this.setSize(_,b)}return M===!1&&y.setRenderTarget(r),m=y.toneMapping,y.toneMapping=Qi,!0},this.hasRenderPass=function(){return M},this.end=function(y,w){y.toneMapping=m,g=!0;let _=r,b=o;for(let P=0;P<S.length;P++){const A=S[P];A.enabled!==!1&&(A.render(y,b,_,w),A.needsSwap!==!1&&(_=b,b=b===o?l:o))}if(p!==y.outputColorSpace||v!==y.toneMapping){p=y.outputColorSpace,v=y.toneMapping,d.defines={},Ke.getTransfer(p)===st&&(d.defines.SRGB_TRANSFER="");const P=A0[v];P&&(d.defines[P]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=_.texture,y.setRenderTarget(x),y.render(u,f),x=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}const Ed=new Pt,Ad=new Ln(1,1),Cd=new ud(1),Rd=new id,Pd=new ff,Id=new hd,Yc=[],Kc=[],jc=new Float32Array(16),Jc=new Float32Array(9),Zc=new Float32Array(4);function cs(a,e,t){const i=a[0];if(i<=0||i>0)return a;const n=e*t;let s=Yc[n];if(s===void 0&&(s=new Float32Array(n),Yc[n]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,a[r].toArray(s,o)}return s}function It(a,e){if(a.length!==e.length)return!1;for(let t=0,i=a.length;t<i;t++)if(a[t]!==e[t])return!1;return!0}function Lt(a,e){for(let t=0,i=e.length;t<i;t++)a[t]=e[t]}function rr(a,e){let t=Kc[e];t===void 0&&(t=new Int32Array(e),Kc[e]=t);for(let i=0;i!==e;++i)t[i]=a.allocateTextureUnit();return t}function R0(a,e){const t=this.cache;t[0]!==e&&(a.uniform1f(this.addr,e),t[0]=e)}function P0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2fv(this.addr,e),Lt(t,e)}}function I0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;a.uniform3fv(this.addr,e),Lt(t,e)}}function L0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4fv(this.addr,e),Lt(t,e)}}function D0(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;a.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,i))return;Zc.set(i),a.uniformMatrix2fv(this.addr,!1,Zc),Lt(t,i)}}function N0(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;a.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,i))return;Jc.set(i),a.uniformMatrix3fv(this.addr,!1,Jc),Lt(t,i)}}function U0(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;a.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,i))return;jc.set(i),a.uniformMatrix4fv(this.addr,!1,jc),Lt(t,i)}}function F0(a,e){const t=this.cache;t[0]!==e&&(a.uniform1i(this.addr,e),t[0]=e)}function B0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2iv(this.addr,e),Lt(t,e)}}function O0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3iv(this.addr,e),Lt(t,e)}}function k0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4iv(this.addr,e),Lt(t,e)}}function z0(a,e){const t=this.cache;t[0]!==e&&(a.uniform1ui(this.addr,e),t[0]=e)}function H0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2uiv(this.addr,e),Lt(t,e)}}function G0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3uiv(this.addr,e),Lt(t,e)}}function V0(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4uiv(this.addr,e),Lt(t,e)}}function or(a){return a.version===0&&(a.compareFunction=Jh,a.needsUpdate=!0),a}function W0(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_2D_SHADOW?s=or(Ad):s=Ed,t.setTexture2D(e||s,n)}function X0(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Pd,n)}function q0(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_CUBE_SHADOW?s=or(Cd):s=Id,t.setTextureCube(e||s,n)}function $0(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Rd,n)}function Y0(a){switch(a){case 5126:return R0;case 35664:return P0;case 35665:return I0;case 35666:return L0;case 35674:return D0;case 35675:return N0;case 35676:return U0;case 5124:case 35670:return F0;case 35667:case 35671:return B0;case 35668:case 35672:return O0;case 35669:case 35673:return k0;case 5125:return z0;case 36294:return H0;case 36295:return G0;case 36296:return V0;case 35678:case 36198:case 36298:case 36306:case 35682:return W0;case 35679:case 36299:case 36307:return X0;case 35680:case 36300:case 36308:case 36293:return q0;case 36289:case 36303:case 36311:case 36292:return $0}}function K0(a,e){a.uniform1fv(this.addr,e)}function j0(a,e){const t=cs(e,this.size,2);a.uniform2fv(this.addr,t)}function J0(a,e){const t=cs(e,this.size,3);a.uniform3fv(this.addr,t)}function Z0(a,e){const t=cs(e,this.size,4);a.uniform4fv(this.addr,t)}function Q0(a,e){const t=cs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,t)}function e_(a,e){const t=cs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,t)}function t_(a,e){const t=cs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,t)}function i_(a,e){a.uniform1iv(this.addr,e)}function n_(a,e){a.uniform2iv(this.addr,e)}function s_(a,e){a.uniform3iv(this.addr,e)}function a_(a,e){a.uniform4iv(this.addr,e)}function r_(a,e){a.uniform1uiv(this.addr,e)}function o_(a,e){a.uniform2uiv(this.addr,e)}function l_(a,e){a.uniform3uiv(this.addr,e)}function c_(a,e){a.uniform4uiv(this.addr,e)}function h_(a,e,t){const i=this.cache,n=e.length,s=rr(t,n);It(i,s)||(a.uniform1iv(this.addr,s),Lt(i,s));let r;this.type===a.SAMPLER_2D_SHADOW?r=or(Ad):r=Ed;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||r,s[o])}function d_(a,e,t){const i=this.cache,n=e.length,s=rr(t,n);It(i,s)||(a.uniform1iv(this.addr,s),Lt(i,s));for(let r=0;r!==n;++r)t.setTexture3D(e[r]||Pd,s[r])}function u_(a,e,t){const i=this.cache,n=e.length,s=rr(t,n);It(i,s)||(a.uniform1iv(this.addr,s),Lt(i,s));let r;this.type===a.SAMPLER_CUBE_SHADOW?r=or(Cd):r=Id;for(let o=0;o!==n;++o)t.setTextureCube(e[o]||r,s[o])}function f_(a,e,t){const i=this.cache,n=e.length,s=rr(t,n);It(i,s)||(a.uniform1iv(this.addr,s),Lt(i,s));for(let r=0;r!==n;++r)t.setTexture2DArray(e[r]||Rd,s[r])}function p_(a){switch(a){case 5126:return K0;case 35664:return j0;case 35665:return J0;case 35666:return Z0;case 35674:return Q0;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return i_;case 35667:case 35671:return n_;case 35668:case 35672:return s_;case 35669:case 35673:return a_;case 5125:return r_;case 36294:return o_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return h_;case 35679:case 36299:case 36307:return d_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return f_}}class m_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Y0(t.type)}}class g_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=p_(t.type)}}class __{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let s=0,r=n.length;s!==r;++s){const o=n[s];o.setValue(e,t[o.id],i)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function Qc(a,e){a.seq.push(e),a.map[e.id]=e}function v_(a,e,t){const i=a.name,n=i.length;for(Gr.lastIndex=0;;){const s=Gr.exec(i),r=Gr.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===n){Qc(t,c===void 0?new m_(o,a,e):new g_(o,a,e));break}else{let d=t.map[o];d===void 0&&(d=new __(o),Qc(t,d)),t=d}}}class Oa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(t,r),l=e.getUniformLocation(t,o.name);v_(o,l,this)}const n=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(r):s.push(r);n.length>0&&(this.seq=n.concat(s))}setValue(e,t,i,n){const s=this.map[t];s!==void 0&&s.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.id in t&&i.push(r)}return i}}function eh(a,e,t){const i=a.createShader(e);return a.shaderSource(i,t),a.compileShader(i),i}const x_=37297;let M_=0;function S_(a,e){const t=a.split(`
`),i=[],n=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=n;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const th=new Ve;function y_(a){Ke._getMatrix(th,Ke.workingColorSpace,a);const e=`mat3( ${th.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(a)){case Wa:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function ih(a,e,t){const i=a.getShaderParameter(e,a.COMPILE_STATUS),s=(a.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+S_(a.getShaderSource(e),o)}else return s}function b_(a,e){const t=y_(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const T_={[nl]:"Linear",[sl]:"Reinhard",[al]:"Cineon",[Qa]:"ACESFilmic",[ol]:"AgX",[ll]:"Neutral",[rl]:"Custom"};function w_(a,e){const t=T_[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+a+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+a+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ba=new U;function E_(){Ke.getLuminanceCoefficients(ba);const a=ba.x.toFixed(4),e=ba.y.toFixed(4),t=ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A_(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function C_(a){const e=[];for(const t in a){const i=a[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function R_(a,e){const t={},i=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=a.getActiveAttrib(e,n),r=s.name;let o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:a.getAttribLocation(e,r),locationSize:o}}return t}function Es(a){return a!==""}function nh(a,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function sh(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(a){return a.replace(P_,I_)}function I_(a,e){const t=$e[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Ko(t)}const L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ah(a){return a.replace(L_,D_)}function D_(a,e,t,i){let n="";for(let s=parseInt(e);s<parseInt(t);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function rh(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const N_={[Cs]:"SHADOWMAP_TYPE_PCF",[ys]:"SHADOWMAP_TYPE_VSM"};function U_(a){return N_[a.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const F_={[Ns]:"ENVMAP_MODE_REFRACTION"};function B_(a){return a.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[a.envMapMode]||"ENVMAP_MODE_REFLECTION"}const O_={[Oh]:"ENVMAP_BLENDING_MULTIPLY",[Au]:"ENVMAP_BLENDING_MIX",[Cu]:"ENVMAP_BLENDING_ADD"};function k_(a){return a.envMap===!1?"ENVMAP_BLENDING_NONE":O_[a.combine]||"ENVMAP_BLENDING_NONE"}function z_(a,e,t,i){const n=a.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=U_(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=B_(t),d=k_(t),u=A_(t),f=C_(s),p=n.createProgram();let v,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Es).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Es).join(`
`),g.length>0&&(g+=`
`)):(v=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),g=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?$e.tonemapping_pars_fragment:"",t.toneMapping!==Qi?w_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,b_("linearToOutputTexel",t.outputColorSpace),E_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Es).join(`
`)),r=Ko(r),r=nh(r,t),r=sh(r,t),o=Ko(o),o=nh(o,t),o=sh(o,t),r=ah(r),o=ah(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const x=m+v+r,S=m+g+o,M=eh(n,n.VERTEX_SHADER,x),y=eh(n,n.FRAGMENT_SHADER,S);n.attachShader(p,M),n.attachShader(p,y),t.index0AttributeName!==void 0?n.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(p,0,"position"),n.linkProgram(p);function w(A){if(a.debug.checkShaderErrors){const I=n.getProgramInfoLog(p)||"",F=n.getShaderInfoLog(M)||"",k=n.getShaderInfoLog(y)||"",R=I.trim(),H=F.trim(),z=k.trim();let D=!0,K=!0;if(n.getProgramParameter(p,n.LINK_STATUS)===!1)if(D=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(n,p,M,y);else{const V=ih(n,M,"vertex"),j=ih(n,y,"fragment");He("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(p,n.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+R+`
`+V+`
`+j)}else R!==""?Ne("WebGLProgram: Program Info Log:",R):(H===""||z==="")&&(K=!1);K&&(A.diagnostics={runnable:D,programLog:R,vertexShader:{log:H,prefix:v},fragmentShader:{log:z,prefix:g}})}n.deleteShader(M),n.deleteShader(y),_=new Oa(n,p),b=R_(n,p)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=n.getProgramParameter(p,x_)),P},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=y,this}let H_=0;class G_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new V_(e),t.set(e,i)),i}}class V_{constructor(e){this.id=H_++,this.code=e,this.usedTimes=0}}function W_(a){return a===In||a===za||a===Ha}function X_(a,e,t,i,n,s){const r=new Sl,o=new G_,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return l.add(_),_===0?"uv":`uv${_}`}function p(_,b,P,A,I,F){const k=A.fog,R=I.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,D=e.get(_.envMap||H,z),K=u[_.type];let V=i.precision;_.precision!==null&&(V=i.getMaxPrecision(_.precision),V!==_.precision&&Ne("WebGLProgram.getParameters:",_.precision,"not supported, using",V,"instead."));const j=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,q=j!==void 0?j.length:0;let re=0;R.morphAttributes.position!==void 0&&(re=1),R.morphAttributes.normal!==void 0&&(re=2),R.morphAttributes.color!==void 0&&(re=3);let Fe,L,G,se;if(K){const ve=Di[K];Fe=ve.vertexShader,L=ve.fragmentShader}else{Fe=_.vertexShader,L=_.fragmentShader;const ve=o.getVertexShaderStage(_),lt=o.getFragmentShaderStage(_);o.update(_,ve,lt),G=ve.id,se=lt.id}const le=a.getRenderTarget(),ie=a.state.buffers.depth.getReversed(),be=I.isInstancedMesh===!0,Ue=I.isBatchedMesh===!0,he=!!_.map,ye=!!_.matcap,Ce=!!D,we=Ce&&D.isPMREMTexture===!0,Qe=!!_.aoMap,We=!!_.lightMap,yt=!!_.bumpMap&&_.wireframe===!1,rt=!!_.normalMap,ot=!!_.displacementMap,vt=!!_.emissiveMap,Dt=!!_.metalnessMap,Nt=!!_.roughnessMap,At=_.anisotropy>0,O=_.clearcoat>0,Wt=_.diffuseRoughness>0,ht=_.dispersion>0,dt=_.retroreflectivity>0,fe=_.iridescence>0,_t=_.sheen>0,Le=_.transmission>0,Oe=At&&!!_.anisotropyMap,C=O&&!!_.clearcoatMap,T=O&&!!_.clearcoatNormalMap,W=O&&!!_.clearcoatRoughnessMap,ne=Wt&&!!_.diffuseRoughnessMap,te=fe&&!!_.iridescenceMap,oe=fe&&!!_.iridescenceThicknessMap,ue=_t&&!!_.sheenColorMap,J=_t&&!!_.sheenRoughnessMap,Q=!!_.specularMap,ce=!!_.specularColorMap,N=!!_.specularIntensityMap,ee=Le&&!!_.transmissionMap,Z=Le&&!!_.thicknessMap,me=!!_.gradientMap,de=!!_.alphaMap,pe=_.alphaTest>0,De=!!_.alphaHash,qe=!!_.extensions;let ae=Qi;_.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ae=a.toneMapping);const Be=we?D.isCompressedCubeTexture?D.image[0].mipmaps:D.mipmaps:null,Xe={shaderID:K,shaderType:_.type,shaderName:_.name,vertexShader:Fe,fragmentShader:L,defines:_.defines,customVertexShaderID:G,customFragmentShaderID:se,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:V,batching:Ue,batchingColor:Ue&&I._colorsTexture!==null,instancing:be,instancingColor:be&&I.instanceColor!==null,instancingMorph:be&&I.morphTexture!==null,outputColorSpace:le===null?a.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:he,matcap:ye,envMap:Ce,envMapMode:Ce&&D.mapping,envMapPMREM:we,envMapMaxLod:we?Be.length-1:null,envMapSize:we?Be[0].width:null,aoMap:Qe,lightMap:We,bumpMap:yt,normalMap:rt,displacementMap:ot,emissiveMap:vt,normalMapObjectSpace:rt&&_.normalMapType===Nu,normalMapTangentSpace:rt&&_.normalMapType===Va,packedNormalMap:rt&&_.normalMapType===Va&&W_(_.normalMap.format),metalnessMap:Dt,roughnessMap:Nt,anisotropy:At,anisotropyMap:Oe,clearcoat:O,clearcoatMap:C,clearcoatNormalMap:T,clearcoatRoughnessMap:W,diffuseRoughness:Wt,diffuseRoughnessMap:ne,dispersion:ht,retroreflection:dt,iridescence:fe,iridescenceMap:te,iridescenceThicknessMap:oe,sheen:_t,sheenColorMap:ue,sheenRoughnessMap:J,specularMap:Q,specularColorMap:ce,specularIntensityMap:N,transmission:Le,transmissionMap:ee,thicknessMap:Z,gradientMap:me,opaque:_.transparent===!1&&_.blending===Rs&&_.alphaToCoverage===!1,alphaMap:de,alphaTest:pe,alphaHash:De,combine:_.combine,mapUv:he&&f(_.map.channel),aoMapUv:Qe&&f(_.aoMap.channel),lightMapUv:We&&f(_.lightMap.channel),bumpMapUv:yt&&f(_.bumpMap.channel),normalMapUv:rt&&f(_.normalMap.channel),displacementMapUv:ot&&f(_.displacementMap.channel),emissiveMapUv:vt&&f(_.emissiveMap.channel),metalnessMapUv:Dt&&f(_.metalnessMap.channel),roughnessMapUv:Nt&&f(_.roughnessMap.channel),anisotropyMapUv:Oe&&f(_.anisotropyMap.channel),clearcoatMapUv:C&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:T&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ne&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:te&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:J&&f(_.sheenRoughnessMap.channel),specularMapUv:Q&&f(_.specularMap.channel),specularColorMapUv:ce&&f(_.specularColorMap.channel),specularIntensityMapUv:N&&f(_.specularIntensityMap.channel),transmissionMapUv:ee&&f(_.transmissionMap.channel),thicknessMapUv:Z&&f(_.thicknessMap.channel),alphaMapUv:de&&f(_.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(rt||At),vertexNormals:!!R.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!R.attributes.uv&&(he||de),fog:!!k,useFog:_.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||R.attributes.normal===void 0&&rt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ie,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:re,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:F.filter(ve=>ve.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:a.shadowMap.enabled&&P.length>0,shadowMapType:a.shadowMap.type,toneMapping:ae,decodeVideoTexture:he&&_.map.isVideoTexture===!0&&Ke.getTransfer(_.map.colorSpace)===st,decodeVideoTextureEmissive:vt&&_.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(_.emissiveMap.colorSpace)===st,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ft,flipSided:_.side===ii,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:qe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&_.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Xe.vertexUv1s=l.has(1),Xe.vertexUv2s=l.has(2),Xe.vertexUv3s=l.has(3),l.clear(),Xe}function v(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)b.push(P),b.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(g(b,_),m(b,_),b.push(a.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function g(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function m(_,b){r.disableAll(),b.instancing&&r.enable(0),b.instancingColor&&r.enable(1),b.instancingMorph&&r.enable(2),b.matcap&&r.enable(3),b.envMap&&r.enable(4),b.normalMapObjectSpace&&r.enable(5),b.normalMapTangentSpace&&r.enable(6),b.clearcoat&&r.enable(7),b.iridescence&&r.enable(8),b.alphaTest&&r.enable(9),b.vertexColors&&r.enable(10),b.vertexAlphas&&r.enable(11),b.vertexUv1s&&r.enable(12),b.vertexUv2s&&r.enable(13),b.vertexUv3s&&r.enable(14),b.vertexTangents&&r.enable(15),b.anisotropy&&r.enable(16),b.alphaHash&&r.enable(17),b.batching&&r.enable(18),b.dispersion&&r.enable(19),b.retroreflection&&r.enable(24),b.diffuseRoughness&&r.enable(25),b.batchingColor&&r.enable(20),b.gradientMap&&r.enable(21),b.packedNormalMap&&r.enable(22),b.vertexNormals&&r.enable(23),_.push(r.mask),r.disableAll(),b.fog&&r.enable(0),b.useFog&&r.enable(1),b.flatShading&&r.enable(2),b.logarithmicDepthBuffer&&r.enable(3),b.reversedDepthBuffer&&r.enable(4),b.skinning&&r.enable(5),b.morphTargets&&r.enable(6),b.morphNormals&&r.enable(7),b.morphColors&&r.enable(8),b.premultipliedAlpha&&r.enable(9),b.shadowMapEnabled&&r.enable(10),b.doubleSided&&r.enable(11),b.flipSided&&r.enable(12),b.useDepthPacking&&r.enable(13),b.dithering&&r.enable(14),b.transmission&&r.enable(15),b.sheen&&r.enable(16),b.opaque&&r.enable(17),b.pointsUvs&&r.enable(18),b.decodeVideoTexture&&r.enable(19),b.decodeVideoTextureEmissive&&r.enable(20),b.alphaToCoverage&&r.enable(21),b.numLightProbeGrids>0&&r.enable(22),b.hasPositionAttribute&&r.enable(23),_.push(r.mask)}function x(_){const b=u[_.type];let P;if(b){const A=Di[b];P=Ui.clone(A.uniforms)}else P=_.uniforms;return P}function S(_,b){let P=h.get(b);return P!==void 0?++P.usedTimes:(P=new z_(a,b,_,n),c.push(P),h.set(b,P)),P}function M(_){if(--_.usedTimes===0){const b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function w(){o.dispose()}return{getParameters:p,getProgramCacheKey:v,getUniforms:x,acquireProgram:S,releaseProgram:M,releaseShaderCache:y,programs:c,dispose:w}}function q_(){let a=new WeakMap;function e(r){return a.has(r)}function t(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function i(r){a.delete(r)}function n(r,o,l){a.get(r)[o]=l}function s(){a=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:s}}function $_(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.materialVariant!==e.materialVariant?a.materialVariant-e.materialVariant:a.z!==e.z?a.z-e.z:a.id-e.id}function oh(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function lh(){const a=[];let e=0;const t=[],i=[],n=[];function s(){e=0,t.length=0,i.length=0,n.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,v,g,m){let x=a[e];return x===void 0?(x={id:u.id,object:u,geometry:f,material:p,materialVariant:r(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:m},a[e]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=p,x.materialVariant=r(u),x.groupOrder=v,x.renderOrder=u.renderOrder,x.z=g,x.group=m),e++,x}function l(u,f,p,v,g,m,x){x.reversedDepth===!0&&(g=-g);const S=o(u,f,p,v,g,m);p.transmission>0?i.push(S):p.transparent===!0?n.push(S):t.push(S)}function c(u,f,p,v,g,m){const x=o(u,f,p,v,g,m);p.transmission>0?i.unshift(x):p.transparent===!0?n.unshift(x):t.unshift(x)}function h(u,f){t.length>1&&t.sort(u||$_),i.length>1&&i.sort(f||oh),n.length>1&&n.sort(f||oh)}function d(){for(let u=e,f=a.length;u<f;u++){const p=a[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:s,push:l,unshift:c,finish:d,sort:h}}function Y_(){let a=new WeakMap;function e(i,n){const s=a.get(i);let r;return s===void 0?(r=new lh,a.set(i,[r])):n>=s.length?(r=new lh,s.push(r)):r=s[n],r}function t(){a=new WeakMap}return{get:e,dispose:t}}function K_(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new U,color:new Me};break;case"SpotLight":t={position:new U,direction:new U,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":t={color:new Me,position:new U,halfWidth:new U,halfHeight:new U};break}return a[e.id]=t,t}}}function j_(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=t,t}}}let J_=0;function Z_(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function Q_(a){const e=new K_,t=j_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const n=new U,s=new ze,r=new ze;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,x=0,S=0,M=0,y=0,w=0,_=0,b=0,P=0,A=0;c.sort(Z_);for(let F=0,k=c.length;F<k;F++){const R=c[F],H=R.color,z=R.intensity,D=R.distance;let K=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===In?K=R.shadow.map.texture:K=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=H.r*z,d+=H.g*z,u+=H.b*z;else if(R.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(R.sh.coefficients[V],z);A++}else if(R.isSunLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,q=t.get(R);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[p]=q,i.sunShadowMap[p]=K;const re=j.getViewportCount();for(let Fe=0;Fe<re;Fe++)i.sunShadowMatrix[v+Fe]=j.getMatrix(Fe),i.sunShadowCascade[v+Fe]=j._cascadeData[Fe];v+=re,p++}i.sun[f]=V,f++}else if(R.isDirectionalLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,q=t.get(R);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,i.directionalShadow[g]=q,i.directionalShadowMap[g]=K,i.directionalShadowMatrix[g]=R.shadow.matrix,y++}i.directional[g]=V,g++}else if(R.isSpotLight){const V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(H).multiplyScalar(z),V.distance=D,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,i.spot[x]=V;const j=R.shadow;if(R.map&&(i.spotLightMap[b]=R.map,b++,j.updateMatrices(R),R.castShadow&&P++),i.spotLightMatrix[x]=j.matrix,R.castShadow){const q=t.get(R);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,i.spotShadow[x]=q,i.spotShadowMap[x]=K,_++}x++}else if(R.isRectAreaLight){const V=e.get(R);V.color.copy(H).multiplyScalar(z),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),i.rectArea[S]=V,S++}else if(R.isPointLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const j=R.shadow,q=t.get(R);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,q.shadowCameraNear=j.camera.near,q.shadowCameraFar=j.camera.far,i.pointShadow[m]=q,i.pointShadowMap[m]=K,i.pointShadowMatrix[m]=R.shadow.matrix,w++}i.point[m]=V,m++}else if(R.isHemisphereLight){const V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(z),V.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[M]=V,M++}}S>0&&(a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const I=i.hash;(I.sunLength!==f||I.directionalLength!==g||I.pointLength!==m||I.spotLength!==x||I.rectAreaLength!==S||I.hemiLength!==M||I.numSunShadows!==p||I.numDirectionalShadows!==y||I.numPointShadows!==w||I.numSpotShadows!==_||I.numSpotMaps!==b||I.numLightProbes!==A)&&(i.sun.length=f,i.directional.length=g,i.spot.length=x,i.rectArea.length=S,i.point.length=m,i.hemi.length=M,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.directionalShadowMatrix.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+b-P,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=A,I.sunLength=f,I.directionalLength=g,I.pointLength=m,I.spotLength=x,I.rectAreaLength=S,I.hemiLength=M,I.numSunShadows=p,I.numDirectionalShadows=y,I.numPointShadows=w,I.numSpotShadows=_,I.numSpotMaps=b,I.numLightProbes=A,i.version=J_++)}function l(c,h){let d=0,u=0,f=0,p=0,v=0,g=0;const m=h.matrixWorldInverse;for(let x=0,S=c.length;x<S;x++){const M=c[x];if(M.isSunLight){const y=i.sun[d];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),d++}else if(M.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const y=i.rectArea[v];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(M.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),v++}else if(M.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function ch(a){const e=new Q_(a),t=[],i=[],n=[];function s(d){h.camera=d,t.length=0,i.length=0,n.length=0}function r(d){d.isLightProbeGrid?n.push(d):t.push(d)}function o(d){i.push(d)}function l(){e.setup(t),n.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function ev(a){let e=new WeakMap;function t(n,s=0){const r=e.get(n);let o;return r===void 0?(o=new ch(a),e.set(n,[o])):s>=r.length?(o=new ch(a),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nv=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],sv=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],hh=new ze,Ms=new U,Vr=new U;function av(a,e,t){let i=new zs;const n=new Re,s=new Re,r=new gt,o=new zf,l=new Hf,c={},h=t.maxTextureSize,d={[pn]:ii,[ii]:pn,[ft]:ft},u=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:tv,fragmentShader:iv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new wt;p.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ie(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cs;let m=this.type;this.render=function(w,_,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===uu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Cs);const P=a.getRenderTarget(),A=a.getActiveCubeFace(),I=a.getActiveMipmapLevel(),F=a.state;F.setBlending(ti),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=m!==this.type;k&&_.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(H=>H.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,H=w.length;R<H;R++){const z=w[R],D=z.shadow;if(D===void 0){Ne("WebGLShadowMap:",z,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;n.copy(D.mapSize);const K=D.getFrameExtents();n.multiply(K),s.copy(D.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/K.x),n.x=s.x*K.x,D.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/K.y),n.y=s.y*K.y,D.mapSize.y=s.y));const V=a.state.buffers.depth.getReversed();if(D.camera._reversedDepth=V,D.map===null||k===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===ys){if(z.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new Jt(n.x,n.y,{format:In,type:jt,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),D.map.texture.name=z.name+".shadowMap",D.map.depthTexture=new Ln(n.x,n.y,gi),D.map.depthTexture.name=z.name+".shadowMapDepth",D.map.depthTexture.format=mn,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Et,D.map.depthTexture.magFilter=Et}else z.isPointLight?(D.map=new Pl(n.x),D.map.depthTexture=new ud(n.x,Oi)):(D.map=new Jt(n.x,n.y),D.map.depthTexture=new Ln(n.x,n.y,Oi)),D.map.depthTexture.name=z.name+".shadowMap",D.map.depthTexture.format=mn,this.type===Cs?(D.map.depthTexture.compareFunction=V?jh:Kh,D.map.depthTexture.minFilter=Vt,D.map.depthTexture.magFilter=Vt):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Et,D.map.depthTexture.magFilter=Et);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==n.x||D.map.height!==n.y)&&D.map.setSize(n.x,n.y);const j=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();z.isPointLight!==!0&&D.updateMatrices(z,b);const q=(D.camera.layers.mask&4294967294)!==0?D.camera.layers:b.layers;for(let re=0;re<j;re++){const Fe=D.getCamera(re);if(z.isPointLight){const L=D.camera,G=D.matrix,se=z.distance||L.far;se!==L.far&&(L.far=se,L.updateProjectionMatrix()),Ms.setFromMatrixPosition(z.matrixWorld),L.position.copy(Ms),Vr.copy(L.position),Vr.add(nv[re]),L.up.copy(sv[re]),L.lookAt(Vr),L.updateMatrixWorld(),G.makeTranslation(-Ms.x,-Ms.y,-Ms.z),hh.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),D._frustum.setFromProjectionMatrix(hh,L.coordinateSystem,L.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)a.setRenderTarget(D.map,re),a.clear();else{re===0&&(a.setRenderTarget(D.map),a.clear());const L=D.getViewport(re);r.set(s.x*L.x,s.y*L.y,s.x*L.z,s.y*L.w),F.viewport(r)}i=D.getFrustum(re),M(_,b,Fe,z,q,this.type)}D.isPointLightShadow!==!0&&this.type===ys&&x(D,b),D.needsUpdate=!1}m=this.type,g.needsUpdate=!1,a.setRenderTarget(P,A,I)};function x(w,_){const b=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Jt(n.x,n.y,{format:In,type:jt}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,a.setRenderTarget(w.mapPass),a.clear(),a.renderBufferDirect(_,null,b,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,a.setRenderTarget(w.map),a.clear(),a.renderBufferDirect(_,null,b,f,v,null)}function S(w,_,b,P){let A=null;const I=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)A=I;else if(A=b.isPointLight===!0?l:o,a.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const F=A.uuid,k=_.uuid;let R=c[F];R===void 0&&(R={},c[F]=R);let H=R[k];H===void 0&&(H=A.clone(),R[k]=H,_.addEventListener("dispose",y)),A=H}if(A.visible=_.visible,A.wireframe=_.wireframe,P===ys?A.side=_.shadowSide!==null?_.shadowSide:_.side:A.side=_.shadowSide!==null?_.shadowSide:d[_.side],A.alphaMap=_.alphaMap,A.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,A.map=_.map,A.clipShadows=_.clipShadows,A.clippingPlanes=_.clippingPlanes,A.clipIntersection=_.clipIntersection,A.displacementMap=_.displacementMap,A.displacementScale=_.displacementScale,A.displacementBias=_.displacementBias,A.wireframeLinewidth=_.wireframeLinewidth,A.linewidth=_.linewidth,b.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const F=a.properties.get(A);F.light=b}return A}function M(w,_,b,P,A,I){if(w.visible===!1)return;if(w.layers.test(A)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===ys)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);const R=e.update(w),H=w.material;if(Array.isArray(H)){const z=R.groups;for(let D=0,K=z.length;D<K;D++){const V=z[D],j=H[V.materialIndex];if(j&&j.visible){const q=S(w,j,P,I);w.onBeforeShadow(a,w,_,b,R,q,V),a.renderBufferDirect(b,null,R,q,w,V),w.onAfterShadow(a,w,_,b,R,q,V)}}}else if(H.visible){const z=S(w,H,P,I);w.onBeforeShadow(a,w,_,b,R,z,null),a.renderBufferDirect(b,null,R,z,w,null),w.onAfterShadow(a,w,_,b,R,z,null)}}const k=w.children;for(let R=0,H=k.length;R<H;R++)M(k[R],_,b,P,A,I)}function y(w){w.target.removeEventListener("dispose",y);for(const b in c){const P=c[b],A=w.target.uuid;A in P&&(P[A].dispose(),delete P[A])}}}function rv(a,e){function t(){let N=!1;const ee=new gt;let Z=null;const me=new gt(0,0,0,0);return{setMask:function(de){Z!==de&&!N&&(a.colorMask(de,de,de,de),Z=de)},setLocked:function(de){N=de},setClear:function(de,pe,De,qe,ae){ae===!0&&(de*=qe,pe*=qe,De*=qe),ee.set(de,pe,De,qe),me.equals(ee)===!1&&(a.clearColor(de,pe,De,qe),me.copy(ee))},reset:function(){N=!1,Z=null,me.set(-1,0,0,0)}}}function i(){let N=!1,ee=!1,Z=null,me=null,de=null;return{setReversed:function(pe){if(ee!==pe){const De=e.get("EXT_clip_control");pe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ee=pe;const qe=de;de=null,this.setClear(qe)}},getReversed:function(){return ee},setTest:function(pe){pe?ie(a.DEPTH_TEST):be(a.DEPTH_TEST)},setMask:function(pe){Z!==pe&&!N&&(a.depthMask(pe),Z=pe)},setFunc:function(pe){if(ee&&(pe=Xu[pe]),me!==pe){switch(pe){case so:a.depthFunc(a.NEVER);break;case ao:a.depthFunc(a.ALWAYS);break;case ro:a.depthFunc(a.LESS);break;case Ds:a.depthFunc(a.LEQUAL);break;case oo:a.depthFunc(a.EQUAL);break;case lo:a.depthFunc(a.GEQUAL);break;case co:a.depthFunc(a.GREATER);break;case ho:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}me=pe}},setLocked:function(pe){N=pe},setClear:function(pe){de!==pe&&(de=pe,ee&&(pe=1-pe),a.clearDepth(pe))},reset:function(){N=!1,Z=null,me=null,de=null,ee=!1}}}function n(){let N=!1,ee=null,Z=null,me=null,de=null,pe=null,De=null,qe=null,ae=null;return{setTest:function(Be){N||(Be?ie(a.STENCIL_TEST):be(a.STENCIL_TEST))},setMask:function(Be){ee!==Be&&!N&&(a.stencilMask(Be),ee=Be)},setFunc:function(Be,Xe,ve){(Z!==Be||me!==Xe||de!==ve)&&(a.stencilFunc(Be,Xe,ve),Z=Be,me=Xe,de=ve)},setOp:function(Be,Xe,ve){(pe!==Be||De!==Xe||qe!==ve)&&(a.stencilOp(Be,Xe,ve),pe=Be,De=Xe,qe=ve)},setLocked:function(Be){N=Be},setClear:function(Be){ae!==Be&&(a.clearStencil(Be),ae=Be)},reset:function(){N=!1,ee=null,Z=null,me=null,de=null,pe=null,De=null,qe=null,ae=null}}}const s=new t,r=new i,o=new n;let l={};const c=new WeakMap;let h={},d={},u={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,S=null,M=null,y=null,w=null,_=null,b=new Me(0,0,0),P=0,A=!1,I=null,F=null,k=null,R=null,H=null;const z=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,K=0;const V=a.getParameter(a.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),D=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),D=K>=2);let j=null,q={};const re=a.getParameter(a.SCISSOR_BOX),Fe=a.getParameter(a.VIEWPORT),L=new gt().fromArray(re),G=new gt().fromArray(Fe);function se(N,ee,Z,me){const de=new Uint8Array(4),pe=a.createTexture();a.bindTexture(N,pe),a.texParameteri(N,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(N,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let De=0;De<Z;De++)N===a.TEXTURE_3D||N===a.TEXTURE_2D_ARRAY?a.texImage3D(ee,0,a.RGBA,1,1,me,0,a.RGBA,a.UNSIGNED_BYTE,de):a.texImage2D(ee+De,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,de);return pe}const le={};le[a.TEXTURE_2D]=se(a.TEXTURE_2D,a.TEXTURE_2D,1),le[a.TEXTURE_CUBE_MAP]=se(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[a.TEXTURE_2D_ARRAY]=se(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),le[a.TEXTURE_3D]=se(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ie(a.DEPTH_TEST),r.setFunc(Ds),yt(!1),rt(Kl),ie(a.CULL_FACE),Qe(ti);function ie(N){h[N]!==!0&&(a.enable(N),h[N]=!0)}function be(N){h[N]!==!1&&(a.disable(N),h[N]=!1)}function Ue(N,ee){return u[N]!==ee?(a.bindFramebuffer(N,ee),u[N]=ee,N===a.DRAW_FRAMEBUFFER&&(u[a.FRAMEBUFFER]=ee),N===a.FRAMEBUFFER&&(u[a.DRAW_FRAMEBUFFER]=ee),!0):!1}function he(N,ee){let Z=p,me=!1;if(N){Z=f.get(ee),Z===void 0&&(Z=[],f.set(ee,Z));const de=N.textures;if(Z.length!==de.length||Z[0]!==a.COLOR_ATTACHMENT0){for(let pe=0,De=de.length;pe<De;pe++)Z[pe]=a.COLOR_ATTACHMENT0+pe;Z.length=de.length,me=!0}}else Z[0]!==a.BACK&&(Z[0]=a.BACK,me=!0);me&&a.drawBuffers(Z)}function ye(N){return v!==N?(a.useProgram(N),v=N,!0):!1}const Ce={[Ni]:a.FUNC_ADD,[fu]:a.FUNC_SUBTRACT,[pu]:a.FUNC_REVERSE_SUBTRACT};Ce[mu]=a.MIN,Ce[gu]=a.MAX;const we={[bs]:a.ZERO,[_u]:a.ONE,[vu]:a.SRC_COLOR,[Fh]:a.SRC_ALPHA,[yu]:a.SRC_ALPHA_SATURATE,[no]:a.DST_COLOR,[io]:a.DST_ALPHA,[xu]:a.ONE_MINUS_SRC_COLOR,[Bh]:a.ONE_MINUS_SRC_ALPHA,[Su]:a.ONE_MINUS_DST_COLOR,[Mu]:a.ONE_MINUS_DST_ALPHA,[bu]:a.CONSTANT_COLOR,[Tu]:a.ONE_MINUS_CONSTANT_COLOR,[wu]:a.CONSTANT_ALPHA,[Eu]:a.ONE_MINUS_CONSTANT_ALPHA};function Qe(N,ee,Z,me,de,pe,De,qe,ae,Be){if(N===ti){g===!0&&(be(a.BLEND),g=!1);return}if(g===!1&&(ie(a.BLEND),g=!0),N!==Uh){if(N!==m||Be!==A){if((x!==Ni||y!==Ni)&&(a.blendEquation(a.FUNC_ADD),x=Ni,y=Ni),Be)switch(N){case Rs:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case to:a.blendFunc(a.ONE,a.ONE);break;case jl:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Jl:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:He("WebGLState: Invalid blending: ",N);break}else switch(N){case Rs:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case to:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case jl:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jl:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",N);break}S=null,M=null,w=null,_=null,b.set(0,0,0),P=0,m=N,A=Be}return}de=de||ee,pe=pe||Z,De=De||me,(ee!==x||de!==y)&&(a.blendEquationSeparate(Ce[ee],Ce[de]),x=ee,y=de),(Z!==S||me!==M||pe!==w||De!==_)&&(a.blendFuncSeparate(we[Z],we[me],we[pe],we[De]),S=Z,M=me,w=pe,_=De),(qe.equals(b)===!1||ae!==P)&&(a.blendColor(qe.r,qe.g,qe.b,ae),b.copy(qe),P=ae),m=N,A=!1}function We(N,ee){N.side===ft?be(a.CULL_FACE):ie(a.CULL_FACE);let Z=N.side===ii;ee&&(Z=!Z),yt(Z),N.blending===Rs&&N.transparent===!1?Qe(ti):Qe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const me=N.stencilWrite;o.setTest(me),me&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),vt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ie(a.SAMPLE_ALPHA_TO_COVERAGE):be(a.SAMPLE_ALPHA_TO_COVERAGE)}function yt(N){I!==N&&(N?a.frontFace(a.CW):a.frontFace(a.CCW),I=N)}function rt(N){N!==hu?(ie(a.CULL_FACE),N!==F&&(N===Kl?a.cullFace(a.BACK):N===du?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):be(a.CULL_FACE),F=N}function ot(N){N!==k&&(D&&a.lineWidth(N),k=N)}function vt(N,ee,Z){N?(ie(a.POLYGON_OFFSET_FILL),(R!==ee||H!==Z)&&(R=ee,H=Z,r.getReversed()&&(ee=-ee,Z=-Z),a.polygonOffset(ee,Z))):be(a.POLYGON_OFFSET_FILL)}function Dt(N){N?ie(a.SCISSOR_TEST):be(a.SCISSOR_TEST)}function Nt(N){N===void 0&&(N=a.TEXTURE0+z-1),j!==N&&(a.activeTexture(N),j=N)}function At(N,ee,Z){Z===void 0&&(j===null?Z=a.TEXTURE0+z-1:Z=j);let me=q[Z];me===void 0&&(me={type:void 0,texture:void 0},q[Z]=me),(me.type!==N||me.texture!==ee)&&(j!==Z&&(a.activeTexture(Z),j=Z),a.bindTexture(N,ee||le[N]),me.type=N,me.texture=ee)}function O(){const N=q[j];N!==void 0&&N.type!==void 0&&(a.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Wt(){try{a.compressedTexImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function ht(){try{a.compressedTexImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function dt(){try{a.texSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function fe(){try{a.texSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function _t(){try{a.compressedTexSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function Le(){try{a.compressedTexSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function Oe(){try{a.texStorage2D(...arguments)}catch(N){He("WebGLState:",N)}}function C(){try{a.texStorage3D(...arguments)}catch(N){He("WebGLState:",N)}}function T(){try{a.texImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function W(){try{a.texImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function ne(N){return d[N]!==void 0?d[N]:a.getParameter(N)}function te(N,ee){d[N]!==ee&&(a.pixelStorei(N,ee),d[N]=ee)}function oe(N){L.equals(N)===!1&&(a.scissor(N.x,N.y,N.z,N.w),L.copy(N))}function ue(N){G.equals(N)===!1&&(a.viewport(N.x,N.y,N.z,N.w),G.copy(N))}function J(N,ee){let Z=c.get(ee);Z===void 0&&(Z=new WeakMap,c.set(ee,Z));let me=Z.get(N);me===void 0&&(me=a.getUniformBlockIndex(ee,N.name),a.uniformBlockBinding(ee,me,me),Z.set(N,me))}function Q(N,ee,Z){const de=c.get(ee).get(N);l[de]!==Z&&(a.bindBufferBase(a.UNIFORM_BUFFER,de,Z),l[de]=Z)}function ce(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),a.pixelStorei(a.PACK_ALIGNMENT,4),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,a.BROWSER_DEFAULT_WEBGL),a.pixelStorei(a.PACK_ROW_LENGTH,0),a.pixelStorei(a.PACK_SKIP_PIXELS,0),a.pixelStorei(a.PACK_SKIP_ROWS,0),a.pixelStorei(a.UNPACK_ROW_LENGTH,0),a.pixelStorei(a.UNPACK_IMAGE_HEIGHT,0),a.pixelStorei(a.UNPACK_SKIP_PIXELS,0),a.pixelStorei(a.UNPACK_SKIP_ROWS,0),a.pixelStorei(a.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,q={},u={},l={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,S=null,M=null,y=null,w=null,_=null,b=new Me(0,0,0),P=0,A=!1,I=null,F=null,k=null,R=null,H=null,L.set(0,0,a.canvas.width,a.canvas.height),G.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:ie,disable:be,bindFramebuffer:Ue,drawBuffers:he,useProgram:ye,setBlending:Qe,setMaterial:We,setFlipSided:yt,setCullFace:rt,setLineWidth:ot,setPolygonOffset:vt,setScissorTest:Dt,activeTexture:Nt,bindTexture:At,unbindTexture:O,compressedTexImage2D:Wt,compressedTexImage3D:ht,texImage2D:T,texImage3D:W,pixelStorei:te,getParameter:ne,updateUBOMapping:J,uniformBlockBinding:Q,texStorage2D:Oe,texStorage3D:C,texSubImage2D:dt,texSubImage3D:fe,compressedTexSubImage2D:_t,compressedTexSubImage3D:Le,scissor:oe,viewport:ue,reset:ce}}function ov(a,e,t,i,n,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Re,h=new WeakMap,d=new Set;let u;const f=new WeakMap,p=new Set,v=new FinalizationRegistry(C=>p.delete(C));let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,T){return g?new OffscreenCanvas(C,T):ks("canvas")}function x(C,T,W){let ne=1;const te=Oe(C);if((te.width>W||te.height>W)&&(ne=W/Math.max(te.width,te.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const oe=Math.floor(ne*te.width),ue=Math.floor(ne*te.height);u===void 0&&(u=m(oe,ue));const J=T?m(oe,ue):u;return J.width=oe,J.height=ue,J.getContext("2d").drawImage(C,0,0,oe,ue),Ne("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+oe+"x"+ue+")."),J}else return"data"in C&&Ne("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function S(C){return C.generateMipmaps}function M(C){a.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?a.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function w(C,T,W,ne,te,oe=!1){if(C!==null){if(a[C]!==void 0)return a[C];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ue;ne&&(ue=e.get("EXT_texture_norm16"),ue||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=T;if(T===a.RED&&(W===a.FLOAT&&(J=a.R32F),W===a.HALF_FLOAT&&(J=a.R16F),W===a.UNSIGNED_BYTE&&(J=a.R8),W===a.UNSIGNED_SHORT&&ue&&(J=ue.R16_EXT),W===a.SHORT&&ue&&(J=ue.R16_SNORM_EXT)),T===a.RED_INTEGER&&(W===a.UNSIGNED_BYTE&&(J=a.R8UI),W===a.UNSIGNED_SHORT&&(J=a.R16UI),W===a.UNSIGNED_INT&&(J=a.R32UI),W===a.BYTE&&(J=a.R8I),W===a.SHORT&&(J=a.R16I),W===a.INT&&(J=a.R32I)),T===a.RG&&(W===a.FLOAT&&(J=a.RG32F),W===a.HALF_FLOAT&&(J=a.RG16F),W===a.UNSIGNED_BYTE&&(J=a.RG8),W===a.UNSIGNED_SHORT&&ue&&(J=ue.RG16_EXT),W===a.SHORT&&ue&&(J=ue.RG16_SNORM_EXT)),T===a.RG_INTEGER&&(W===a.UNSIGNED_BYTE&&(J=a.RG8UI),W===a.UNSIGNED_SHORT&&(J=a.RG16UI),W===a.UNSIGNED_INT&&(J=a.RG32UI),W===a.BYTE&&(J=a.RG8I),W===a.SHORT&&(J=a.RG16I),W===a.INT&&(J=a.RG32I)),T===a.RGB_INTEGER&&(W===a.UNSIGNED_BYTE&&(J=a.RGB8UI),W===a.UNSIGNED_SHORT&&(J=a.RGB16UI),W===a.UNSIGNED_INT&&(J=a.RGB32UI),W===a.BYTE&&(J=a.RGB8I),W===a.SHORT&&(J=a.RGB16I),W===a.INT&&(J=a.RGB32I)),T===a.RGBA_INTEGER&&(W===a.UNSIGNED_BYTE&&(J=a.RGBA8UI),W===a.UNSIGNED_SHORT&&(J=a.RGBA16UI),W===a.UNSIGNED_INT&&(J=a.RGBA32UI),W===a.BYTE&&(J=a.RGBA8I),W===a.SHORT&&(J=a.RGBA16I),W===a.INT&&(J=a.RGBA32I)),T===a.RGB&&(W===a.UNSIGNED_SHORT&&ue&&(J=ue.RGB16_EXT),W===a.SHORT&&ue&&(J=ue.RGB16_SNORM_EXT),W===a.UNSIGNED_INT_5_9_9_9_REV&&(J=a.RGB9_E5),W===a.UNSIGNED_INT_10F_11F_11F_REV&&(J=a.R11F_G11F_B10F)),T===a.RGBA){const Q=oe?Wa:Ke.getTransfer(te);W===a.FLOAT&&(J=a.RGBA32F),W===a.HALF_FLOAT&&(J=a.RGBA16F),W===a.UNSIGNED_BYTE&&(J=Q===st?a.SRGB8_ALPHA8:a.RGBA8),W===a.UNSIGNED_SHORT&&ue&&(J=ue.RGBA16_EXT),W===a.SHORT&&ue&&(J=ue.RGBA16_SNORM_EXT),W===a.UNSIGNED_SHORT_4_4_4_4&&(J=a.RGBA4),W===a.UNSIGNED_SHORT_5_5_5_1&&(J=a.RGB5_A1)}return(J===a.R16F||J===a.R32F||J===a.RG16F||J===a.RG32F||J===a.RGBA16F||J===a.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function _(C,T){let W;return C?T===null||T===Oi||T===Pn?W=a.DEPTH24_STENCIL8:T===gi?W=a.DEPTH32F_STENCIL8:T===Us&&(W=a.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Oi||T===Pn?W=a.DEPTH_COMPONENT24:T===gi?W=a.DEPTH_COMPONENT32F:T===Us&&(W=a.DEPTH_COMPONENT16),W}function b(C,T){return S(C)===!0||C.isFramebufferTexture&&C.minFilter!==Et&&C.minFilter!==Vt?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function P(C){const T=new WeakRef(C);i.get(C).__ref=T,p.add(T),v.register(C,T,T)}function A(C){const T=i.get(C).__ref;T!==void 0&&(p.delete(T),v.unregister(T))}function I(C){k(C.target)}function F(C){R(C.target)}function k(C){C.removeEventListener("dispose",I),A(C),z(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&d.delete(C)}function R(C){C.removeEventListener("dispose",F),A(C),K(C)}function H(){for(const C of p){const T=C.deref();T!==void 0&&(T.isRenderTarget===!0?R(T):k(T))}p.clear(),d.clear()}function z(C){const T=i.get(C);if(T.__webglInit===void 0)return;const W=C.source,ne=f.get(W);if(ne){const te=ne[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&D(C),Object.keys(ne).length===0&&f.delete(W)}i.remove(C)}function D(C){const T=i.get(C);a.deleteTexture(T.__webglTexture);const W=C.source,ne=f.get(W);delete ne[T.__cacheKey],r.memory.textures--}function K(C){const T=i.get(C);T.__depthDisposeCallback&&T.__depthDisposeCallback();const W=C.depthTexture;if(W&&W.renderTarget===C&&k(W),C.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(T.__webglFramebuffer[te]))for(let oe=0;oe<T.__webglFramebuffer[te].length;oe++)a.deleteFramebuffer(T.__webglFramebuffer[te][oe]);else a.deleteFramebuffer(T.__webglFramebuffer[te]);T.__webglDepthbuffer&&a.deleteRenderbuffer(T.__webglDepthbuffer[te])}else{if(Array.isArray(T.__webglFramebuffer))for(let te=0;te<T.__webglFramebuffer.length;te++)a.deleteFramebuffer(T.__webglFramebuffer[te]);else a.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&a.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&a.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let te=0;te<T.__webglColorRenderbuffer.length;te++)T.__webglColorRenderbuffer[te]&&a.deleteRenderbuffer(T.__webglColorRenderbuffer[te]);T.__webglDepthRenderbuffer&&a.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const ne=C.textures;for(let te=0,oe=ne.length;te<oe;te++){const ue=i.get(ne[te]);ue.__webglTexture&&(a.deleteTexture(ue.__webglTexture),r.memory.textures--),i.remove(ne[te])}i.remove(C)}let V=0;function j(){V=0}function q(){return V}function re(C){V=C}function Fe(){const C=V;return C>=n.maxTextures&&Ne("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+n.maxTextures),V+=1,C}function L(C){const T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.mipmapsAutoUpdate),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function G(C,T){const W=i.get(C);if(C.isVideoTexture&&_t(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){const ne=C.image;if(ne===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{We(W,C,T);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(a.TEXTURE_2D,W.__webglTexture,a.TEXTURE0+T)}function se(C,T){const W=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){We(W,C,T);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(a.TEXTURE_2D_ARRAY,W.__webglTexture,a.TEXTURE0+T)}function le(C,T){const W=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){We(W,C,T);return}t.bindTexture(a.TEXTURE_3D,W.__webglTexture,a.TEXTURE0+T)}function ie(C,T){const W=i.get(C);if(C.version>0&&W.__version!==C.version){yt(W,C,T);return}t.bindTexture(a.TEXTURE_CUBE_MAP,W.__webglTexture,a.TEXTURE0+T)}const be={[xi]:a.REPEAT,[Fi]:a.CLAMP_TO_EDGE,[ka]:a.MIRRORED_REPEAT},Ue={[Et]:a.NEAREST,[zh]:a.NEAREST_MIPMAP_NEAREST,[Ts]:a.NEAREST_MIPMAP_LINEAR,[Vt]:a.LINEAR,[Da]:a.LINEAR_MIPMAP_NEAREST,[Bi]:a.LINEAR_MIPMAP_LINEAR},he={[Fu]:a.NEVER,[Jh]:a.ALWAYS,[Bu]:a.LESS,[Kh]:a.LEQUAL,[Ou]:a.EQUAL,[jh]:a.GEQUAL,[ku]:a.GREATER,[zu]:a.NOTEQUAL};function ye(C,T){if(T.type===gi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Vt||T.magFilter===Da||T.magFilter===Ts||T.magFilter===Bi||T.minFilter===Vt||T.minFilter===Da||T.minFilter===Ts||T.minFilter===Bi)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(C,a.TEXTURE_WRAP_S,be[T.wrapS]),a.texParameteri(C,a.TEXTURE_WRAP_T,be[T.wrapT]),(C===a.TEXTURE_3D||C===a.TEXTURE_2D_ARRAY)&&a.texParameteri(C,a.TEXTURE_WRAP_R,be[T.wrapR]),a.texParameteri(C,a.TEXTURE_MAG_FILTER,Ue[T.magFilter]),a.texParameteri(C,a.TEXTURE_MIN_FILTER,Ue[T.minFilter]),T.compareFunction&&(a.texParameteri(C,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(C,a.TEXTURE_COMPARE_FUNC,he[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Et||T.minFilter!==Ts&&T.minFilter!==Bi||T.type===gi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");a.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,n.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function Ce(C,T){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",I),P(T));const ne=T.source;let te=f.get(ne);te===void 0&&(te={},f.set(ne,te));const oe=L(T);if(oe!==C.__cacheKey){te[oe]===void 0&&(te[oe]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,W=!0),te[oe].usedTimes++;const ue=te[C.__cacheKey];ue!==void 0&&(te[C.__cacheKey].usedTimes--,ue.usedTimes===0&&D(T)),C.__cacheKey=oe,C.__webglTexture=te[oe].texture}return W}function we(C,T,W){return Math.floor(Math.floor(C/W)/T)}function Qe(C,T,W,ne){const oe=C.updateRanges;if(oe.length===0)t.texSubImage2D(a.TEXTURE_2D,0,0,0,T.width,T.height,W,ne,T.data);else{oe.sort((N,ee)=>N.start-ee.start);let ue=0;for(let N=1;N<oe.length;N++){const ee=oe[ue],Z=oe[N],me=ee.start+ee.count,de=we(Z.start,T.width,4),pe=we(ee.start,T.width,4);Z.start<=me+1&&de===pe&&we(Z.start+Z.count-1,T.width,4)===de?ee.count=Math.max(ee.count,Z.start+Z.count-ee.start):(++ue,oe[ue]=Z)}oe.length=ue+1;const J=t.getParameter(a.UNPACK_ROW_LENGTH),Q=t.getParameter(a.UNPACK_SKIP_PIXELS),ce=t.getParameter(a.UNPACK_SKIP_ROWS);t.pixelStorei(a.UNPACK_ROW_LENGTH,T.width);for(let N=0,ee=oe.length;N<ee;N++){const Z=oe[N],me=Math.floor(Z.start/4),de=Math.ceil(Z.count/4),pe=me%T.width,De=Math.floor(me/T.width),qe=de,ae=1;t.pixelStorei(a.UNPACK_SKIP_PIXELS,pe),t.pixelStorei(a.UNPACK_SKIP_ROWS,De),t.texSubImage2D(a.TEXTURE_2D,0,pe,De,qe,ae,W,ne,T.data)}C.clearUpdateRanges(),t.pixelStorei(a.UNPACK_ROW_LENGTH,J),t.pixelStorei(a.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(a.UNPACK_SKIP_ROWS,ce)}}function We(C,T,W){let ne=a.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ne=a.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ne=a.TEXTURE_3D);const te=Ce(C,T),oe=T.source;t.bindTexture(ne,C.__webglTexture,a.TEXTURE0+W);const ue=i.get(oe);if(oe.version!==ue.__version||te===!0){if(t.activeTexture(a.TEXTURE0+W),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const ae=Ke.getPrimaries(Ke.workingColorSpace),Be=T.colorSpace===Ki?null:Ke.getPrimaries(T.colorSpace),Xe=T.colorSpace===Ki||ae===Be?a.NONE:a.BROWSER_DEFAULT_WEBGL;t.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe)}t.pixelStorei(a.UNPACK_ALIGNMENT,T.unpackAlignment);let Q=x(T.image,!1,n.maxTextureSize);Q=Le(T,Q);const ce=s.convert(T.format,T.colorSpace),N=s.convert(T.type);let ee=w(T.internalFormat,ce,N,T.normalized,T.colorSpace,T.isVideoTexture);ye(ne,T);let Z;const me=T.mipmaps,de=T.isVideoTexture!==!0,pe=ue.__version===void 0||te===!0,De=oe.dataReady,qe=b(T,Q);if(T.isDepthTexture)ee=_(T.format===ji,T.type),pe&&(de?t.texStorage2D(a.TEXTURE_2D,1,ee,Q.width,Q.height):t.texImage2D(a.TEXTURE_2D,0,ee,Q.width,Q.height,0,ce,N,null));else if(T.isDataTexture)if(me.length>0){de&&pe&&t.texStorage2D(a.TEXTURE_2D,qe,ee,me[0].width,me[0].height);for(let ae=0,Be=me.length;ae<Be;ae++)Z=me[ae],de?De&&t.texSubImage2D(a.TEXTURE_2D,ae,0,0,Z.width,Z.height,ce,N,Z.data):t.texImage2D(a.TEXTURE_2D,ae,ee,Z.width,Z.height,0,ce,N,Z.data);T.generateMipmaps=!1}else de?(pe&&t.texStorage2D(a.TEXTURE_2D,qe,ee,Q.width,Q.height),De&&Qe(T,Q,ce,N)):t.texImage2D(a.TEXTURE_2D,0,ee,Q.width,Q.height,0,ce,N,Q.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){de&&pe&&t.texStorage3D(a.TEXTURE_2D_ARRAY,qe,ee,me[0].width,me[0].height,Q.depth);for(let ae=0,Be=me.length;ae<Be;ae++)if(Z=me[ae],T.format!==_i)if(ce!==null)if(de){if(De)if(T.layerUpdates.size>0){const Xe=Vc(Z.width,Z.height,T.format,T.type);for(const ve of T.layerUpdates){const lt=Z.data.subarray(ve*Xe/Z.data.BYTES_PER_ELEMENT,(ve+1)*Xe/Z.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,ae,0,0,ve,Z.width,Z.height,1,ce,lt)}}else t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,ae,0,0,0,Z.width,Z.height,Q.depth,ce,Z.data)}else t.compressedTexImage3D(a.TEXTURE_2D_ARRAY,ae,ee,Z.width,Z.height,Q.depth,0,Z.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?De&&t.texSubImage3D(a.TEXTURE_2D_ARRAY,ae,0,0,0,Z.width,Z.height,Q.depth,ce,N,Z.data):t.texImage3D(a.TEXTURE_2D_ARRAY,ae,ee,Z.width,Z.height,Q.depth,0,ce,N,Z.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{de&&pe&&t.texStorage2D(a.TEXTURE_2D,qe,ee,me[0].width,me[0].height);for(let ae=0,Be=me.length;ae<Be;ae++)Z=me[ae],T.format!==_i?ce!==null?de?De&&t.compressedTexSubImage2D(a.TEXTURE_2D,ae,0,0,Z.width,Z.height,ce,Z.data):t.compressedTexImage2D(a.TEXTURE_2D,ae,ee,Z.width,Z.height,0,Z.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?De&&t.texSubImage2D(a.TEXTURE_2D,ae,0,0,Z.width,Z.height,ce,N,Z.data):t.texImage2D(a.TEXTURE_2D,ae,ee,Z.width,Z.height,0,ce,N,Z.data)}else if(T.isDataArrayTexture)if(de){if(pe&&t.texStorage3D(a.TEXTURE_2D_ARRAY,qe,ee,Q.width,Q.height,Q.depth),De)if(T.layerUpdates.size>0){const ae=Vc(Q.width,Q.height,T.format,T.type);for(const Be of T.layerUpdates){const Xe=Q.data.subarray(Be*ae/Q.data.BYTES_PER_ELEMENT,(Be+1)*ae/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,Be,Q.width,Q.height,1,ce,N,Xe)}T.clearLayerUpdates()}else t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ce,N,Q.data)}else t.texImage3D(a.TEXTURE_2D_ARRAY,0,ee,Q.width,Q.height,Q.depth,0,ce,N,Q.data);else if(T.isData3DTexture)de?(pe&&t.texStorage3D(a.TEXTURE_3D,qe,ee,Q.width,Q.height,Q.depth),De&&t.texSubImage3D(a.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ce,N,Q.data)):t.texImage3D(a.TEXTURE_3D,0,ee,Q.width,Q.height,Q.depth,0,ce,N,Q.data);else if(T.isFramebufferTexture){if(pe)if(de)t.texStorage2D(a.TEXTURE_2D,qe,ee,Q.width,Q.height);else{let ae=Q.width,Be=Q.height;for(let Xe=0;Xe<qe;Xe++)t.texImage2D(a.TEXTURE_2D,Xe,ee,ae,Be,0,ce,N,null),ae>>=1,Be>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in a){const ae=a.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),Q.parentNode!==ae){ae.appendChild(Q),d.add(T),ae.onpaint=Be=>{const Xe=Be.changedElements;for(const ve of d)Xe.includes(ve.image)&&(ve.needsUpdate=!0)},ae.requestPaint();return}if(a.texElementImage2D.length===3)a.texElementImage2D(a.TEXTURE_2D,a.RGBA8,Q);else{const Xe=a.RGBA,ve=a.RGBA,lt=a.UNSIGNED_BYTE;a.texElementImage2D(a.TEXTURE_2D,0,Xe,ve,lt,Q)}a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)}}else if(me.length>0){if(de&&pe){const ae=Oe(me[0]);t.texStorage2D(a.TEXTURE_2D,qe,ee,ae.width,ae.height)}for(let ae=0,Be=me.length;ae<Be;ae++)Z=me[ae],de?De&&t.texSubImage2D(a.TEXTURE_2D,ae,0,0,ce,N,Z):t.texImage2D(a.TEXTURE_2D,ae,ee,ce,N,Z);T.generateMipmaps=!1}else if(de){if(pe){const ae=Oe(Q);t.texStorage2D(a.TEXTURE_2D,qe,ee,ae.width,ae.height)}De&&t.texSubImage2D(a.TEXTURE_2D,0,0,0,ce,N,Q)}else t.texImage2D(a.TEXTURE_2D,0,ee,ce,N,Q);S(T)&&T.mipmapsAutoUpdate===!0&&M(ne),ue.__version=oe.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function yt(C,T,W){if(T.image.length!==6)return;const ne=Ce(C,T),te=T.source;t.bindTexture(a.TEXTURE_CUBE_MAP,C.__webglTexture,a.TEXTURE0+W);const oe=i.get(te);if(te.version!==oe.__version||ne===!0){t.activeTexture(a.TEXTURE0+W);const ue=Ke.getPrimaries(Ke.workingColorSpace),J=T.colorSpace===Ki?null:Ke.getPrimaries(T.colorSpace),Q=T.colorSpace===Ki||ue===J?a.NONE:a.BROWSER_DEFAULT_WEBGL;t.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(a.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ce=T.isCompressedTexture||T.image[0].isCompressedTexture,N=T.image[0]&&T.image[0].isDataTexture,ee=[];for(let ve=0;ve<6;ve++)!ce&&!N?ee[ve]=x(T.image[ve],!0,n.maxCubemapSize):ee[ve]=N?T.image[ve].image:T.image[ve],ee[ve]=Le(T,ee[ve]);const Z=ee[0],me=s.convert(T.format,T.colorSpace),de=s.convert(T.type);let pe=w(T.internalFormat,me,de,T.normalized,T.colorSpace);const De=T.isVideoTexture!==!0,qe=oe.__version===void 0||ne===!0,ae=te.dataReady;let Be=b(T,Z);ye(a.TEXTURE_CUBE_MAP,T);let Xe;if(T.isDepthTexture){if(pe=_(T.format===ji,T.type),qe)if(De)t.texStorage2D(a.TEXTURE_CUBE_MAP,1,pe,Z.width,Z.height);else for(let ve=0;ve<6;ve++)t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,pe,Z.width,Z.height,0,me,de,null)}else if(ce){De&&qe&&t.texStorage2D(a.TEXTURE_CUBE_MAP,Be,pe,Z.width,Z.height);for(let ve=0;ve<6;ve++){Xe=ee[ve].mipmaps;for(let lt=0;lt<Xe.length;lt++){const Ut=Xe[lt];T.format!==_i?me!==null?De?ae&&t.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt,0,0,Ut.width,Ut.height,me,Ut.data):t.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt,pe,Ut.width,Ut.height,0,Ut.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt,0,0,Ut.width,Ut.height,me,de,Ut.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt,pe,Ut.width,Ut.height,0,me,de,Ut.data)}}}else{if(Xe=T.mipmaps,De&&qe){Xe.length>0&&Be++;const ve=Oe(ee[0]);t.texStorage2D(a.TEXTURE_CUBE_MAP,Be,pe,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(N){De?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ee[ve].width,ee[ve].height,me,de,ee[ve].data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,pe,ee[ve].width,ee[ve].height,0,me,de,ee[ve].data);for(let lt=0;lt<Xe.length;lt++){const nn=Xe[lt].image[ve].image;De?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt+1,0,0,nn.width,nn.height,me,de,nn.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt+1,pe,nn.width,nn.height,0,me,de,nn.data)}}else{De?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,me,de,ee[ve]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,pe,me,de,ee[ve]);for(let lt=0;lt<Xe.length;lt++){const Ut=Xe[lt];De?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt+1,0,0,me,de,Ut.image[ve]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ve,lt+1,pe,me,de,Ut.image[ve])}}}S(T)&&T.mipmapsAutoUpdate===!0&&M(a.TEXTURE_CUBE_MAP),oe.__version=te.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function rt(C,T,W,ne,te,oe){const ue=s.convert(W.format,W.colorSpace),J=s.convert(W.type),Q=w(W.internalFormat,ue,J,W.normalized,W.colorSpace),ce=i.get(T),N=i.get(W);if(N.__renderTarget=T,!ce.__hasExternalTextures){const ee=Math.max(1,T.width>>oe),Z=Math.max(1,T.height>>oe);te===a.TEXTURE_3D||te===a.TEXTURE_2D_ARRAY?t.texImage3D(te,oe,Q,ee,Z,T.depth,0,ue,J,null):t.texImage2D(te,oe,Q,ee,Z,0,ue,J,null)}t.bindFramebuffer(a.FRAMEBUFFER,C),fe(T)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ne,te,N.__webglTexture,0,dt(T)):(te===a.TEXTURE_2D||te>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ne,te,N.__webglTexture,oe),t.bindFramebuffer(a.FRAMEBUFFER,null)}function ot(C,T,W){if(a.bindRenderbuffer(a.RENDERBUFFER,C),T.depthBuffer){const ne=T.depthTexture,te=ne&&ne.isDepthTexture?ne.type:null,oe=_(T.stencilBuffer,te),ue=T.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;fe(T)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,dt(T),oe,T.width,T.height):W?a.renderbufferStorageMultisample(a.RENDERBUFFER,dt(T),oe,T.width,T.height):a.renderbufferStorage(a.RENDERBUFFER,oe,T.width,T.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,ue,a.RENDERBUFFER,C)}else{const ne=T.textures;for(let te=0;te<ne.length;te++){const oe=ne[te],ue=s.convert(oe.format,oe.colorSpace),J=s.convert(oe.type),Q=w(oe.internalFormat,ue,J,oe.normalized,oe.colorSpace);fe(T)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,dt(T),Q,T.width,T.height):W?a.renderbufferStorageMultisample(a.RENDERBUFFER,dt(T),Q,T.width,T.height):a.renderbufferStorage(a.RENDERBUFFER,Q,T.width,T.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function vt(C,T,W){const ne=T.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(a.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(T.depthTexture);te.__renderTarget=T;const oe=ne?T.depthTexture.image[0]:T.depthTexture.image;(!te.__webglTexture||oe.width!==T.width||oe.height!==T.height)&&(oe.width=T.width,oe.height=T.height,T.depthTexture.needsUpdate=!0),ne?ie(T.depthTexture,0):G(T.depthTexture,0);const ue=te.__webglTexture,J=dt(T),Q=ne?a.TEXTURE_CUBE_MAP_POSITIVE_X+W:a.TEXTURE_2D,ce=T.depthTexture.format===ji?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;if(T.depthTexture.format===mn)fe(T)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ce,Q,ue,0,J):a.framebufferTexture2D(a.FRAMEBUFFER,ce,Q,ue,0);else if(T.depthTexture.format===ji)fe(T)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ce,Q,ue,0,J):a.framebufferTexture2D(a.FRAMEBUFFER,ce,Q,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Dt(C){const T=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==C.depthTexture){const ne=C.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ne){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ne.removeEventListener("dispose",te)};ne.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=ne}if(C.depthTexture&&!T.__autoAllocateDepthBuffer)if(W)for(let ne=0;ne<6;ne++)vt(T.__webglFramebuffer[ne],C,ne);else C.texture.mipmaps.length>0?vt(T.__webglFramebuffer[0],C,0):vt(T.__webglFramebuffer,C,0);else if(W){T.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(a.FRAMEBUFFER,T.__webglFramebuffer[ne]),T.__webglDepthbuffer[ne]===void 0)T.__webglDepthbuffer[ne]=a.createRenderbuffer(),ot(T.__webglDepthbuffer[ne],C,!1);else{const te=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,oe=T.__webglDepthbuffer[ne];a.bindRenderbuffer(a.RENDERBUFFER,oe),a.framebufferRenderbuffer(a.FRAMEBUFFER,te,a.RENDERBUFFER,oe)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(a.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(a.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=a.createRenderbuffer(),ot(T.__webglDepthbuffer,C,!1);else{const te=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,oe=T.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,oe),a.framebufferRenderbuffer(a.FRAMEBUFFER,te,a.RENDERBUFFER,oe)}t.bindFramebuffer(a.FRAMEBUFFER,null)}function Nt(C,T,W){const ne=i.get(C);T!==void 0&&rt(ne.__webglFramebuffer,C,C.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),W!==void 0&&Dt(C)}function At(C){const T=C.texture,W=i.get(C),ne=i.get(T);C.addEventListener("dispose",F),P(C);const te=C.textures,oe=C.isWebGLCubeRenderTarget===!0,ue=te.length>1;if(ue||(ne.__webglTexture===void 0&&(ne.__webglTexture=a.createTexture()),ne.__version=T.version,r.memory.textures++),oe){W.__webglFramebuffer=[];for(let J=0;J<6;J++)if(T.mipmaps.length>0){W.__webglFramebuffer[J]=[];for(let Q=0;Q<T.mipmaps.length;Q++)W.__webglFramebuffer[J][Q]=a.createFramebuffer()}else W.__webglFramebuffer[J]=a.createFramebuffer()}else{if(T.mipmaps.length>0){W.__webglFramebuffer=[];for(let J=0;J<T.mipmaps.length;J++)W.__webglFramebuffer[J]=a.createFramebuffer()}else W.__webglFramebuffer=a.createFramebuffer();if(ue)for(let J=0,Q=te.length;J<Q;J++){const ce=i.get(te[J]);ce.__webglTexture===void 0&&(ce.__webglTexture=a.createTexture(),r.memory.textures++)}if(C.samples>0&&fe(C)===!1){W.__webglMultisampledFramebuffer=a.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(a.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let J=0;J<te.length;J++){const Q=te[J];W.__webglColorRenderbuffer[J]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,W.__webglColorRenderbuffer[J]);const ce=s.convert(Q.format,Q.colorSpace),N=s.convert(Q.type),ee=w(Q.internalFormat,ce,N,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),Z=dt(C);a.renderbufferStorageMultisample(a.RENDERBUFFER,Z,ee,C.width,C.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+J,a.RENDERBUFFER,W.__webglColorRenderbuffer[J])}a.bindRenderbuffer(a.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=a.createRenderbuffer(),ot(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(a.FRAMEBUFFER,null)}}if(oe){t.bindTexture(a.TEXTURE_CUBE_MAP,ne.__webglTexture),ye(a.TEXTURE_CUBE_MAP,T);for(let J=0;J<6;J++)if(T.mipmaps.length>0)for(let Q=0;Q<T.mipmaps.length;Q++)rt(W.__webglFramebuffer[J][Q],C,T,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+J,Q);else rt(W.__webglFramebuffer[J],C,T,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);S(T)?M(a.TEXTURE_CUBE_MAP):T.mipmaps.length>0&&a.texParameteri(a.TEXTURE_CUBE_MAP,a.TEXTURE_MAX_LEVEL,T.mipmaps.length-1),t.unbindTexture()}else if(ue){for(let J=0,Q=te.length;J<Q;J++){const ce=te[J],N=i.get(ce);let ee=a.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(ee,N.__webglTexture),ye(ee,ce),rt(W.__webglFramebuffer,C,ce,a.COLOR_ATTACHMENT0+J,ee,0),S(ce)&&M(ee)}t.unbindTexture()}else{let J=a.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(J=C.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(J,ne.__webglTexture),ye(J,T),T.mipmaps.length>0)for(let Q=0;Q<T.mipmaps.length;Q++)rt(W.__webglFramebuffer[Q],C,T,a.COLOR_ATTACHMENT0,J,Q);else rt(W.__webglFramebuffer,C,T,a.COLOR_ATTACHMENT0,J,0);S(T)?M(J):T.mipmaps.length>0&&a.texParameteri(J,a.TEXTURE_MAX_LEVEL,T.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&Dt(C)}function O(C){const T=C.textures;for(let W=0,ne=T.length;W<ne;W++){const te=T[W];if(S(te)&&te.mipmapsAutoUpdate===!0){const oe=y(C),ue=i.get(te).__webglTexture;t.bindTexture(oe,ue),M(oe),t.unbindTexture()}}}const Wt=[];function ht(C){if(C.samples>0){if(fe(C)===!1){const T=C.textures,W=C.width,ne=C.height;let te=a.COLOR_BUFFER_BIT;const oe=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ue=i.get(C),J=T.length>1;if(J)for(let ce=0;ce<T.length;ce++)t.bindFramebuffer(a.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ce,a.RENDERBUFFER,null),t.bindFramebuffer(a.FRAMEBUFFER,ue.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+ce,a.TEXTURE_2D,null,0);t.bindFramebuffer(a.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(a.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(a.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let ce=0;ce<T.length;ce++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=a.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=a.STENCIL_BUFFER_BIT)),J){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,ue.__webglColorRenderbuffer[ce]);const N=i.get(T[ce]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,N,0)}a.blitFramebuffer(0,0,W,ne,0,0,W,ne,te,a.NEAREST),l===!0&&(Wt.length=0,Wt.push(a.COLOR_ATTACHMENT0+ce),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&Wt.push(oe),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Wt))}if(t.bindFramebuffer(a.READ_FRAMEBUFFER,null),t.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),J)for(let ce=0;ce<T.length;ce++){t.bindFramebuffer(a.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ce,a.RENDERBUFFER,ue.__webglColorRenderbuffer[ce]);const N=i.get(T[ce]).__webglTexture;t.bindFramebuffer(a.FRAMEBUFFER,ue.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+ce,a.TEXTURE_2D,N,0)}t.bindFramebuffer(a.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const T=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[T])}}}function dt(C){return Math.min(n.maxSamples,C.samples)}function fe(C){const T=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function _t(C){const T=r.render.frame;h.get(C)!==T&&(h.set(C,T),C.update())}function Le(C,T){const W=C.colorSpace,ne=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==li&&W!==Ki&&(Ke.getTransfer(W)===st?(ne!==_i||te!==ai)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",W)),T}function Oe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Fe,this.resetTextureUnits=j,this.getTextureUnits=q,this.setTextureUnits=re,this.setTexture2D=G,this.setTexture2DArray=se,this.setTexture3D=le,this.setTextureCube=ie,this.rebindTextures=Nt,this.setupRenderTarget=At,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=fe,this.dispose=H}function lv(a,e){function t(i,n=Ki){let s;const r=Ke.getTransfer(n);if(i===ai)return a.UNSIGNED_BYTE;if(i===hl)return a.UNSIGNED_SHORT_4_4_4_4;if(i===dl)return a.UNSIGNED_SHORT_5_5_5_1;if(i===Vh)return a.UNSIGNED_INT_5_9_9_9_REV;if(i===Wh)return a.UNSIGNED_INT_10F_11F_11F_REV;if(i===Hh)return a.BYTE;if(i===Gh)return a.SHORT;if(i===Us)return a.UNSIGNED_SHORT;if(i===cl)return a.INT;if(i===Oi)return a.UNSIGNED_INT;if(i===gi)return a.FLOAT;if(i===jt)return a.HALF_FLOAT;if(i===Xh)return a.ALPHA;if(i===qh)return a.RGB;if(i===_i)return a.RGBA;if(i===mn)return a.DEPTH_COMPONENT;if(i===ji)return a.DEPTH_STENCIL;if(i===ul)return a.RED;if(i===fl)return a.RED_INTEGER;if(i===In)return a.RG;if(i===pl)return a.RG_INTEGER;if(i===ml)return a.RGBA_INTEGER;if(i===Na||i===Ua||i===Fa||i===Ba)if(r===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Na)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ba)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Na)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ua)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ba)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===uo||i===fo||i===po||i===mo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===uo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===po)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===go||i===_o||i===vo||i===xo||i===Mo||i===za||i===So)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===go||i===_o)return r===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===vo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xo)return s.COMPRESSED_R11_EAC;if(i===Mo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===za)return s.COMPRESSED_RG11_EAC;if(i===So)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===yo||i===bo||i===To||i===wo||i===Eo||i===Ao||i===Co||i===Ro||i===Po||i===Io||i===Lo||i===Do||i===No||i===Uo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===yo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===To)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Eo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ao)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Co)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ro)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Po)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Io)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Lo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Do)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===No)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uo)return r===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fo||i===Bo||i===Oo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Fo)return r===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Bo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Oo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ko||i===zo||i===Ha||i===Ho)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ko)return s.COMPRESSED_RED_RGTC1_EXT;if(i===zo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ho)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Pn?a.UNSIGNED_INT_24_8:a[i]!==void 0?a[i]:null}return{convert:t}}const cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new fd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Tt({vertexShader:cv,fragmentShader:hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new ui(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uv extends gn{constructor(e,t){super();const i=this;let n=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new dv,m={},x=t.getContextAttributes();let S=null,M=null;const y=[],w=[],_=new Re;let b=null,P=null;const A=new si;A.viewport=new gt;const I=new si;I.viewport=new gt;const F=[A,I],k=new cp;let R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let G=y[L];return G===void 0&&(G=new yr,y[L]=G),G.getTargetRaySpace()},this.getControllerGrip=function(L){let G=y[L];return G===void 0&&(G=new yr,y[L]=G),G.getGripSpace()},this.getHand=function(L){let G=y[L];return G===void 0&&(G=new yr,y[L]=G),G.getHandSpace()};function z(L){const G=w.indexOf(L.inputSource);if(G===-1)return;const se=y[G];se!==void 0&&(se.update(L.inputSource,L.frame,c||r),se.dispatchEvent({type:L.type,data:L.inputSource}))}function D(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",D),n.removeEventListener("inputsourceschange",K);for(let L=0;L<y.length;L++){const G=w[L];G!==null&&(w[L]=null,y[L].disconnect(G))}R=null,H=null,g.reset();for(const L in m)delete m[L];if(e.setRenderTarget(S),f=null,u=null,d=null,n=null,M=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(_.width,_.height,!1),P!==null){const L=P.camera;L.fov=P.fov,L.zoom=P.zoom,L.updateProjectionMatrix(),P=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){s=L,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){o=L,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(n,t)),d},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(L){if(n=L,n!==null){if(S=e.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",D),n.addEventListener("inputsourceschange",K),x.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(_),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,le=null,ie=null;x.depth&&(ie=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=x.stencil?ji:mn,le=x.stencil?Pn:Oi);const be={colorFormat:t.RGBA8,depthFormat:ie,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(be),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new Jt(u.textureWidth,u.textureHeight,{format:_i,type:ai,depthTexture:new Ln(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,t,se),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Jt(f.framebufferWidth,f.framebufferHeight,{format:_i,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await n.requestReferenceSpace(o),Fe.setContext(n),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(L){for(let G=0;G<L.removed.length;G++){const se=L.removed[G],le=w.indexOf(se);le>=0&&(w[le]=null,y[le].disconnect(se))}for(let G=0;G<L.added.length;G++){const se=L.added[G];let le=w.indexOf(se);if(le===-1){for(let be=0;be<y.length;be++)if(be>=w.length){w.push(se),le=be;break}else if(w[be]===null){w[be]=se,le=be;break}if(le===-1)break}const ie=y[le];ie&&ie.connect(se)}}function V(L,G){G===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(G.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(n===null)return;let G=L.near,se=L.far;g.texture!==null&&(g.depthNear>0&&(G=g.depthNear),g.depthFar>0&&(se=g.depthFar)),k.near=I.near=A.near=G,k.far=I.far=A.far=se,(R!==k.near||H!==k.far)&&(n.updateRenderState({depthNear:k.near,depthFar:k.far}),R=k.near,H=k.far),k.layers.mask=L.layers.mask|6,A.layers.mask=k.layers.mask&-5,I.layers.mask=k.layers.mask&-3;const le=L.parent,ie=k.cameras;V(k,le);for(let be=0;be<ie.length;be++)V(ie[be],le);k.projectionMatrix.copy(A.projectionMatrix),k.projectionMatrixInverse.copy(A.projectionMatrixInverse),P===null&&L.isPerspectiveCamera&&(P={camera:L,fov:L.fov,zoom:L.zoom}),j(L,k,le)};function j(L,G,se){se===null?L.matrix.copy(G.matrixWorld):(L.matrix.copy(se.matrixWorld),L.matrix.invert(),L.matrix.multiply(G.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(G.projectionMatrix),L.projectionMatrixInverse.copy(G.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=ns*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(L){l=L,u!==null&&(u.fixedFoveation=L),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=L)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(L){return m[L]};let q=null;function re(L,G){if(h=G.getViewerPose(c||r),p=G,h!==null){const se=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let le=!1;se.length!==k.cameras.length&&(k.cameras.length=0,le=!0);for(let he=0;he<se.length;he++){const ye=se[he];let Ce=null;if(f!==null)Ce=f.getViewport(ye);else{const Qe=d.getViewSubImage(u,ye);Ce=Qe.viewport,he===0&&(e.setRenderTargetTextures(M,Qe.colorTexture,Qe.depthStencilTexture),e.setRenderTarget(M))}let we=F[he];we===void 0&&(we=new si,we.layers.enable(he),we.viewport=new gt,F[he]=we),we.matrix.fromArray(ye.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(ye.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),he===0&&(k.matrix.copy(we.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),le===!0&&k.cameras.push(we)}const ie=n.enabledFeatures;if(ie&&ie.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const he=d.getDepthInformation(se[0]);he&&he.isValid&&he.texture&&g.init(he,n.renderState)}if(ie&&ie.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let he=0;he<se.length;he++){const ye=se[he].camera;if(ye){let Ce=m[ye];Ce||(Ce=new fd,m[ye]=Ce);const we=d.getCameraImage(ye);Ce.sourceTexture=we}}}}for(let se=0;se<y.length;se++){const le=w[se],ie=y[se];le!==null&&ie!==void 0&&ie.update(le,G,c||r)}q&&q(L,G),G.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:G}),p=null}const Fe=new yd;Fe.setAnimationLoop(re),this.setAnimationLoop=function(L){q=L},this.dispose=function(){}}}const fv=new ze,Ld=new Ve;Ld.set(-1,0,0,0,1,0,0,0,1);function pv(a,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,pd(a)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function n(g,m,x,S,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,M)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,S):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===ii&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===ii&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m),S=x.envMap,M=x.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Ld),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=S*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ii&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function mv(a,e,t,i){let n={},s={};function r(x,S){const M=S.program;i.uniformBlockBinding(x,M,n[x.id])}function o(x,S){let M=n[x.id];M===void 0&&(p(x),M=l(x),n[x.id]=M,x.addEventListener("dispose",g));const y=S.program;i.updateUBOMapping(x,y);const w=e.render.frame;s[x.id]!==w&&(c(x),s[x.id]=w)}function l(x){const S=a.createBuffer(),M=x.__size,y=x.usage;return a.bindBuffer(a.UNIFORM_BUFFER,S),a.bufferData(a.UNIFORM_BUFFER,M,y),a.bindBuffer(a.UNIFORM_BUFFER,null),S}function c(x){const S=n[x.id],M=x.uniforms,y=x.__cache;a.bindBuffer(a.UNIFORM_BUFFER,S);for(let w=0,_=M.length;w<_;w++){const b=M[w];if(Array.isArray(b))for(let P=0,A=b.length;P<A;P++)h(b[P],w,P,y);else h(b,w,0,y)}a.bindBuffer(a.UNIFORM_BUFFER,null)}function h(x,S,M,y){if(u(x,S,M,y)===!0){const w=x.__offset,_=x.value;if(Array.isArray(_)){let b=0;for(let P=0;P<_.length;P++){const A=_[P],I=v(A,!0);d(A,x.__data,b),b+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else d(_,x.__data,0);a.bufferSubData(a.UNIFORM_BUFFER,w,x.__data)}}function d(x,S,M){typeof x=="number"||typeof x=="boolean"?S[M]=x:x.isMatrix3?(S[M]=x.elements[0],S[M+1]=x.elements[1],S[M+2]=x.elements[2],S[M+3]=0,S[M+4]=x.elements[3],S[M+5]=x.elements[4],S[M+6]=x.elements[5],S[M+7]=0,S[M+8]=x.elements[6],S[M+9]=x.elements[7],S[M+10]=x.elements[8],S[M+11]=0):ArrayBuffer.isView(x)?S.set(x.subarray(0,S.length-M),M):x.toArray(S,M)}function u(x,S,M,y){const w=x.value,_=S+"_"+M;if(Array.isArray(w)){y[_]===void 0&&(y[_]=[]);const b=y[_];let P=!1;for(let A=0;A<w.length;A++)f(w[A],b,A)===!0&&(P=!0);return P}return f(w,y,_)}function f(x,S,M){if(S[M]===void 0)return typeof x=="number"||typeof x=="boolean"?S[M]=x:ArrayBuffer.isView(x)?S[M]=x.slice():S[M]=x.clone(),!0;{const y=S[M];if(typeof x=="number"||typeof x=="boolean"){if(y!==x)return S[M]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(y.equals(x)===!1)return y.copy(x),!0}}return!1}function p(x){const S=x.uniforms;let M=0;const y=16;for(let _=0,b=S.length;_<b;_++){const P=Array.isArray(S[_])?S[_]:[S[_]];for(let A=0,I=P.length;A<I;A++){const F=P[A],k=Array.isArray(F.value)?F.value:[F.value],R=Array.isArray(S[_])||Array.isArray(F.value);let H=M;for(let D=0,K=k.length;D<K;D++){const V=k[D],j=v(V,R),q=M%y,re=q%j.boundary,Fe=q+re;M+=re,Fe!==0&&y-Fe<j.storage&&(M+=y-Fe),D===0&&(H=M),M+=j.storage}const z=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new z((M-H)/Float32Array.BYTES_PER_ELEMENT),F.__offset=H}}const w=M%y;return w>0&&(M+=y-w),x.__size=M,x.__cache={},this}function v(x,S){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=16,M.storage=48):x.isMatrix4?(M.boundary=16,M.storage=64):x.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",x),S===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function g(x){const S=x.target;S.removeEventListener("dispose",g),a.deleteBuffer(n[S.id]),delete n[S.id],delete s[S.id]}function m(){for(const x in n)a.deleteBuffer(n[x]);n={},s={}}return{bind:r,update:o,dispose:m}}const gv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Pi=null;function _v(){return Pi===null&&(Pi=new $s(gv,16,16,In,jt),Pi.name="DFG_LUT",Pi.minFilter=Vt,Pi.magFilter=Vt,Pi.wrapS=Fi,Pi.wrapT=Fi,Pi.generateMipmaps=!1,Pi.needsUpdate=!0),Pi}class vv{constructor(e={}){const{canvas:t=Vu(),context:i=null,depth:n=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ai}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const v=f,g=new Set([ml,pl,fl]),m=new Set([ai,Oi,Us,Pn,hl,dl]),x=new Uint32Array(4),S=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]};let y=null,w=null;const _=[],b=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let I=!1,F=null,k=null,R=null,H=null;this._outputColorSpace=bt;let z=0,D=0,K=null,V=-1,j=null;const q=new gt,re=new gt;let Fe=null;const L=new Me(0);let G=0,se=t.width,le=t.height,ie=1,be=null,Ue=null;const he=new gt(0,0,se,le),ye=new gt(0,0,se,le);let Ce=!1;const we=new zs,Qe=new bl;let We=!1,yt=!1;const rt=new ze,ot=new U,vt=new gt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Nt=!1;function At(){return K===null?ie:1}let O=i;function Wt(E,B){return t.getContext(E,B)}let ht,dt,fe,_t,Le,Oe,C,T,W,ne,te,oe,ue,J,Q,ce,N,ee,Z,me,de,pe,De;try{const E={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${il}`),t.addEventListener("webglcontextlost",Be,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),O===null){const B="webgl2";if(O=Wt(B,E),O===null)throw Wt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qe()}catch(E){throw t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),He("WebGLRenderer: "+E.message),E}function qe(){ht=new S0(O),ht.init(),de=new lv(O,ht),dt=new h0(O,ht,e,de),fe=new rv(O,ht),dt.reversedDepthBuffer&&u&&fe.buffers.depth.setReversed(!0),k=O.createFramebuffer(),R=O.createFramebuffer(),H=O.createFramebuffer(),_t=new T0(O),Le=new q_,Oe=new ov(O,ht,fe,Le,dt,de,_t),C=new M0(A),T=new Ep(O),pe=new l0(O,T),W=new y0(O,T,_t,pe),ne=new E0(O,W,T,pe,_t),ee=new w0(O,dt,Oe),Q=new d0(Le),te=new X_(A,C,ht,dt,pe,Q),oe=new pv(A,Le),ue=new Y_,J=new ev(ht),N=new o0(A,C,fe,ne,p,l),ce=new av(A,ne,dt),De=new mv(O,_t,dt,fe),Z=new c0(O,ht,_t),me=new b0(O,ht,_t),_t.programs=te.programs,A.capabilities=dt,A.extensions=ht,A.properties=Le,A.renderLists=ue,A.shadowMap=ce,A.state=fe,A.info=_t}v!==ai&&(P=new C0(v,t.width,t.height,o,n,s));const ae=new uv(A,O);this.xr=ae,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=ht.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ht.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(E){E!==void 0&&(ie=E,this.setSize(se,le,!1))},this.getSize=function(E){return E.set(se,le)},this.setSize=function(E,B,Y=!0){if(ae.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}se=E,le=B,t.width=Math.floor(E*ie),t.height=Math.floor(B*ie),Y===!0&&(t.style.width=E+"px",t.style.height=B+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(se*ie,le*ie).floor()},this.setDrawingBufferSize=function(E,B,Y){se=E,le=B,ie=Y,t.width=Math.floor(E*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(v===ai){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(q)},this.getViewport=function(E){return E.copy(he)},this.setViewport=function(E,B,Y,X){E.isVector4?he.set(E.x,E.y,E.z,E.w):he.set(E,B,Y,X),fe.viewport(q.copy(he).multiplyScalar(At()).round())},this.getScissor=function(E){return E.copy(ye)},this.setScissor=function(E,B,Y,X){E.isVector4?ye.set(E.x,E.y,E.z,E.w):ye.set(E,B,Y,X),fe.scissor(re.copy(ye).multiplyScalar(At()).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(E){fe.setScissorTest(Ce=E)},this.setOpaqueSort=function(E){be=E},this.setTransparentSort=function(E){Ue=E},this.getClearColor=function(E){return E.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,Y=!0){let X=0;if(E){let $=!1;if(K!==null){const _e=K.texture.format;$=g.has(_e)}if($){const _e=K.texture.type,Te=m.has(_e),ge=N.getClearColor(),Se=N.getClearAlpha(),Pe=ge.r,Ge=ge.g,et=ge.b;Te?(x[0]=Pe,x[1]=Ge,x[2]=et,x[3]=Se,O.clearBufferuiv(O.COLOR,0,x)):(S[0]=Pe,S[1]=Ge,S[2]=et,S[3]=Se,O.clearBufferiv(O.COLOR,0,S))}else X|=O.COLOR_BUFFER_BIT}B&&(X|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(X|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&O.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),F=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),N.dispose(),ue.dispose(),J.dispose(),Oe.dispose(),Le.dispose(),C.dispose(),ne.dispose(),W.dispose(),pe.dispose(),De.dispose(),te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Fl),ae.removeEventListener("sessionend",Bl),_n.stop()};function Be(E){E.preventDefault(),Xa("WebGLRenderer: Context Lost."),I=!0}function Xe(){Xa("WebGLRenderer: Context Restored."),I=!1;const E=_t.autoReset,B=ce.enabled,Y=ce.autoUpdate,X=ce.needsUpdate,$=ce.type;qe(),_t.autoReset=E,ce.enabled=B,ce.autoUpdate=Y,ce.needsUpdate=X,ce.type=$}function ve(E){He("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function lt(E){const B=E.target;B.removeEventListener("dispose",lt),Ut(B)}function Ut(E){nn(E),Le.remove(E)}function nn(E){const B=Le.get(E).programs;B!==void 0&&(B.forEach(function(Y){te.releaseProgram(Y)}),E.isShaderMaterial&&te.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,Y,X,$,_e){B===null&&(B=Dt);const Te=$.isMesh&&$.matrixWorld.determinantAffine()<0,ge=Wd(E,B,Y,X,$);fe.setMaterial(X,Te);let Se=Y.index,Pe=1;if(X.wireframe===!0){if(Se=W.getWireframeAttribute(Y),Se===void 0)return;Pe=2}const Ge=Y.drawRange,et=Y.attributes.position;let Ee=Ge.start*Pe,tt=(Ge.start+Ge.count)*Pe;_e!==null&&(Ee=Math.max(Ee,_e.start*Pe),tt=Math.min(tt,(_e.start+_e.count)*Pe)),Se!==null?(Ee=Math.max(Ee,0),tt=Math.min(tt,Se.count)):et!=null&&(Ee=Math.max(Ee,0),tt=Math.min(tt,et.count));const Ct=tt-Ee;if(Ct<0||Ct===1/0)return;pe.setup($,X,ge,Y,Se);let mt,ut=Z;if(Se!==null&&(mt=T.get(Se),ut=me,ut.setIndex(mt)),$.isMesh)X.wireframe===!0?(fe.setLineWidth(X.wireframeLinewidth*At()),ut.setMode(O.LINES)):ut.setMode(O.TRIANGLES);else if($.isLine){let Xt=X.linewidth;Xt===void 0&&(Xt=1),fe.setLineWidth(Xt*At()),$.isLineSegments?ut.setMode(O.LINES):$.isLineLoop?ut.setMode(O.LINE_LOOP):ut.setMode(O.LINE_STRIP)}else $.isPoints?ut.setMode(O.POINTS):$.isSprite&&ut.setMode(O.TRIANGLES);if($.isBatchedMesh)if(ht.get("WEBGL_multi_draw"))ut.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Xt=$._multiDrawStarts,Ae=$._multiDrawCounts,Zt=$._multiDrawCount,nt=Se?T.get(Se).bytesPerElement:1,vn=Le.get(X).currentProgram.getUniforms();for(let qt=0;qt<Zt;qt++)vn.setValue(O,"_gl_DrawID",qt),ut.render(Xt[qt]/nt,Ae[qt])}else if($.isInstancedMesh)ut.renderInstances(Ee,Ct,$.count);else if(Y.isInstancedBufferGeometry){const Xt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ae=Math.min(Y.instanceCount,Xt);ut.renderInstances(Ee,Ct,Ae)}else ut.render(Ee,Ct)};function Ul(E,B,Y,X){F!==null&&E.isNodeMaterial&&F.setObject(X,E),We===!0&&Q.setState(E,Y,!1),E.transparent===!0&&E.side===ft&&E.forceSinglePass===!1?(E.side=ii,E.needsUpdate=!0,hs(E,B,X),E.side=pn,E.needsUpdate=!0,hs(E,B,X),E.side=ft):hs(E,B,X)}this.compile=function(E,B,Y=null){Y===null&&(Y=E),F!==null&&F.renderStart(E,B,Y),w=J.get(Y),w.init(B),b.push(w),Y.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),E!==Y&&E.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),yt=this.localClippingEnabled,We=Q.init(this.clippingPlanes,yt),We===!0&&Q.setGlobalState(this.clippingPlanes,B),F!==null&&ce.render(w.state.shadowsArray,Y,B);const X=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const _e=$.material;if(_e)if(Array.isArray(_e))for(let Te=0;Te<_e.length;Te++){const ge=_e[Te];Ul(ge,Y,B,$),X.add(ge)}else Ul(_e,Y,B,$),X.add(_e)}),w=b.pop(),F!==null&&F.renderEnd(),X},this.compileAsync=function(E,B,Y=null){const X=this.compile(E,B,Y);return new Promise($=>{function _e(){if(X.forEach(function(Te){const Se=Le.get(Te).currentProgram;(Se===void 0||Se.isReady())&&X.delete(Te)}),X.size===0){$(E);return}setTimeout(_e,10)}ht.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let cr=null;function Gd(E){cr&&cr(E)}function Fl(){_n.stop()}function Bl(){_n.start()}const _n=new yd;_n.setAnimationLoop(Gd),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(E){cr=E,ae.setAnimationLoop(E),E===null?_n.stop():_n.start()},ae.addEventListener("sessionstart",Fl),ae.addEventListener("sessionend",Bl),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;F!==null&&F.renderStart(E,B);const Y=ae.enabled===!0&&ae.isPresenting===!0,X=P!==null&&(K===null||Y)&&P.begin(A,K);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(B),B=ae.getCamera()),E.isScene===!0&&E.onBeforeRender(A,E,B,K),w=J.get(E,b.length),w.init(B),w.state.textureUnits=Oe.getTextureUnits(),b.push(w),rt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?Qe.setFromArrayCamera(B):we.setFromProjectionMatrix(rt,Ei,B.reversedDepth),yt=this.localClippingEnabled,We=Q.init(this.clippingPlanes,yt),y=ue.get(E,_.length),y.init(),_.push(y),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){const Te=A.xr.getDepthSensingMesh();Te!==null&&hr(Te,B,-1/0,A.sortObjects)}hr(E,B,0,A.sortObjects),y.finish(),F!==null&&F.updateLights(w.state.lightsArray),A.sortObjects===!0&&y.sort(be,Ue),Nt=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Nt&&N.addToRenderList(y,E),this.info.autoReset===!0&&this.info.reset(),We===!0&&Q.beginShadows();const $=w.state.shadowsArray;if(ce.render($,E,B),We===!0&&Q.endShadows(),(X&&P.hasRenderPass())===!1){const Te=y.opaque,ge=y.transmissive;if(w.setupLights(),B.isArrayCamera){const Se=B.cameras;if(ge.length>0)for(let Pe=0,Ge=Se.length;Pe<Ge;Pe++){const et=Se[Pe];kl(Te,ge,E,et)}Nt&&N.render(E);for(let Pe=0,Ge=Se.length;Pe<Ge;Pe++){const et=Se[Pe];Ol(y,E,et,et.viewport)}}else ge.length>0&&kl(Te,ge,E,B),Nt&&N.render(E),Ol(y,E,B)}K!==null&&D===0&&(Oe.updateMultisampleRenderTarget(K),Oe.updateRenderTargetMipmap(K)),X&&P.end(A),E.isScene===!0&&E.onAfterRender(A,E,B),pe.resetDefaultState(),V=-1,j=null,b.pop(),b.length>0?(w=b[b.length-1],Oe.setTextureUnits(w.state.textureUnits),We===!0&&Q.setGlobalState(A.clippingPlanes,w.state.camera)):w=null,_.pop(),_.length>0?y=_[_.length-1]:y=null,F!==null&&F.renderEnd()};function hr(E,B,Y,X){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)w.pushLight(E),E.castShadow&&w.pushShadow(E);else if(E.isSprite){const Te=B.isArrayCamera?Qe:we;if(!E.frustumCulled||E.intersectsFrustum(Te)){X&&vt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(rt);const ge=ne.update(E),Se=E.material;Se.visible&&y.push(E,ge,Se,Y,vt.z,null,B)}}else if(E.isMesh||E.isLine||E.isPoints){const Te=B.isArrayCamera?Qe:we;if(!E.frustumCulled||E.intersectsFrustum(Te)){const ge=ne.update(E),Se=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),vt.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),vt.copy(ge.boundingSphere.center)),vt.applyMatrix4(E.matrixWorld).applyMatrix4(rt)),Array.isArray(Se)){const Pe=ge.groups;for(let Ge=0,et=Pe.length;Ge<et;Ge++){const Ee=Pe[Ge],tt=Se[Ee.materialIndex];tt&&tt.visible&&y.push(E,ge,tt,Y,vt.z,Ee,B)}}else Se.visible&&y.push(E,ge,Se,Y,vt.z,null,B)}}}const _e=E.children;for(let Te=0,ge=_e.length;Te<ge;Te++)hr(_e[Te],B,Y,X)}function Ol(E,B,Y,X){const{opaque:$,transmissive:_e,transparent:Te}=E;w.setupLightsView(Y),We===!0&&Q.setGlobalState(A.clippingPlanes,Y),X&&fe.viewport(q.copy(X)),$.length>0&&Ks($,B,Y),_e.length>0&&Ks(_e,B,Y),Te.length>0&&Ks(Te,B,Y),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function kl(E,B,Y,X){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){const Ee=ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new Jt(1,1,{generateMipmaps:!0,type:Ee?jt:ai,minFilter:Bi,samples:Math.max(4,dt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const _e=w.state.transmissionRenderTarget[X.id],Te=X.viewport||q;_e.setSize(Te.z*A.transmissionResolutionScale,Te.w*A.transmissionResolutionScale);const ge=A.getRenderTarget(),Se=A.getActiveCubeFace(),Pe=A.getActiveMipmapLevel();A.setRenderTarget(_e),A.getClearColor(L),G=A.getClearAlpha(),G<1&&A.setClearColor(16777215,.5),A.clear(),Nt&&N.render(Y);const Ge=A.toneMapping;A.toneMapping=Qi;const et=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),We===!0&&Q.setGlobalState(A.clippingPlanes,X),Ks(E,Y,X),Oe.updateMultisampleRenderTarget(_e),Oe.updateRenderTargetMipmap(_e),ht.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let tt=0,Ct=B.length;tt<Ct;tt++){const mt=B[tt],{object:ut,geometry:Xt,material:Ae,group:Zt}=mt;if(Ae.side===ft&&ut.layers.test(X.layers)){const nt=Ae.side;Ae.side=ii,Ae.needsUpdate=!0,zl(ut,Y,X,Xt,Ae,Zt),Ae.side=nt,Ae.needsUpdate=!0,Ee=!0}}Ee===!0&&(Oe.updateMultisampleRenderTarget(_e),Oe.updateRenderTargetMipmap(_e))}A.setRenderTarget(ge,Se,Pe),A.setClearColor(L,G),et!==void 0&&(X.viewport=et),A.toneMapping=Ge}function Ks(E,B,Y){const X=B.isScene===!0?B.overrideMaterial:null;for(let $=0,_e=E.length;$<_e;$++){const Te=E[$],{object:ge,geometry:Se,group:Pe}=Te;let Ge=Te.material;Ge.allowOverride===!0&&X!==null&&(Ge=X),ge.layers.test(Y.layers)&&zl(ge,B,Y,Se,Ge,Pe)}}function zl(E,B,Y,X,$,_e){F!==null&&$.isNodeMaterial&&F.setObject(E,$),E.onBeforeRender(A,B,Y,X,$,_e),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(A,B,Y,X,E,_e),$.transparent===!0&&$.side===ft&&$.forceSinglePass===!1?($.side=ii,$.needsUpdate=!0,A.renderBufferDirect(Y,B,X,$,E,_e),$.side=pn,$.needsUpdate=!0,A.renderBufferDirect(Y,B,X,$,E,_e),$.side=ft):A.renderBufferDirect(Y,B,X,$,E,_e),E.onAfterRender(A,B,Y,X,$,_e)}function Hl(E){let B=0;for(const Y of E)Y.texture!==null&&B++;return B}function hs(E,B,Y){B.isScene!==!0&&(B=Dt);const X=Le.get(E),$=w.state.lights,_e=w.state.shadowsArray,Te=$.state.version,ge=te.getParameters(E,$.state,_e,B,Y,w.state.lightProbeGridArray),Se=te.getProgramCacheKey(ge);let Pe=X.programs;X.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,X.fog=B.fog;const Ge=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;X.envMap=C.get(E.envMap||X.environment,Ge),X.envMapRotation=X.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Pe===void 0&&(E.addEventListener("dispose",lt),Pe=new Map,X.programs=Pe,X.programVariants=new Map);let et=Pe.get(Se);if(et!==void 0){if(X.currentProgram===et&&X.lightsStateVersion===Te)return Vl(E,ge),et}else ge.uniforms=te.getUniforms(E),F!==null&&E.isNodeMaterial&&F.build(E,Y,ge),E.onBeforeCompile(ge,A),et=te.acquireProgram(ge,Se),Pe.set(Se,et),X.uniforms=ge.uniforms;const Ee=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ee.clippingPlanes=Q.uniform),Vl(E,ge),X.needsLights=qd(E),X.lightsStateVersion=Te,X.needsLights&&(Ee.ambientLightColor.value=$.state.ambient,Ee.lightProbe.value=$.state.probe,Ee.sunLights.value=$.state.sun,Ee.sunLightShadows.value=$.state.sunShadow,Ee.directionalLights.value=$.state.directional,Ee.directionalLightShadows.value=$.state.directionalShadow,Ee.spotLights.value=$.state.spot,Ee.spotLightShadows.value=$.state.spotShadow,Ee.rectAreaLights.value=$.state.rectArea,Ee.ltc_1.value=$.state.rectAreaLTC1,Ee.ltc_2.value=$.state.rectAreaLTC2,Ee.pointLights.value=$.state.point,Ee.pointLightShadows.value=$.state.pointShadow,Ee.hemisphereLights.value=$.state.hemi,Ee.sunShadowMatrix.value=$.state.sunShadowMatrix,Ee.sunShadowCascade.value=$.state.sunShadowCascade,Ee.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ee.spotLightMatrix.value=$.state.spotLightMatrix,Ee.spotLightMap.value=$.state.spotLightMap,Ee.pointShadowMatrix.value=$.state.pointShadowMatrix),X.numLightProbeGrids=Hl(w.state.lightProbeGridArray),X.currentProgram=et,X.uniformsList=null,et}function Vd(E,B,Y,X,$){const _e=Le.get(E),Te=_e.currentProgram.id+","+X+","+$;let ge=_e.programVariants.get(Te);return ge===void 0?(ge=hs(E,B,Y),_e.programVariants.set(Te,ge)):(_e.currentProgram=ge,_e.uniformsList=null,_e.outputColorSpace=X,_e.toneMapping=$),ge}function Gl(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=Oa.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Vl(E,B){const Y=Le.get(E);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function Wd(E,B,Y,X,$){B.isScene!==!0&&(B=Dt),Oe.resetTextureUnits();const _e=B.fog,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?B.environment:null,ge=K===null?A.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ke.workingColorSpace,Se=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Pe=C.get(X.envMap||Te,Se),Ge=X.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,et=!!Y.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ee=!!Y.morphAttributes.position,tt=!!Y.morphAttributes.normal,Ct=!!Y.morphAttributes.color;let mt=Qi;X.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(mt=A.toneMapping);const ut=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Xt=ut!==void 0?ut.length:0,Ae=Le.get(X),Zt=w.state.lights;if(We===!0&&(yt===!0||E!==j)){const Mt=E===j&&X.id===V;Q.setState(X,E,Mt)}let nt=!1,vn=!1;X.version===Ae.__version?Ae.needsLights&&Ae.lightsStateVersion!==Zt.state.version||$.isBatchedMesh&&Ae.batching===!1||!$.isBatchedMesh&&Ae.batching===!0||$.isBatchedMesh&&Ae.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ae.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ae.instancing===!1||!$.isInstancedMesh&&Ae.instancing===!0||$.isSkinnedMesh&&Ae.skinning===!1||!$.isSkinnedMesh&&Ae.skinning===!0||$.isInstancedMesh&&Ae.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ae.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ae.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ae.instancingMorph===!1&&$.morphTexture!==null||Ae.envMap!==Pe||X.fog===!0&&Ae.fog!==_e||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Q.numPlanes||Ae.numIntersection!==Q.numIntersection)||Ae.vertexAlphas!==Ge||Ae.vertexTangents!==et||Ae.morphTargets!==Ee||Ae.morphNormals!==tt||Ae.morphColors!==Ct||Ae.morphTargetsCount!==Xt||Ae.numLightProbeGrids!==Hl(w.state.lightProbeGridArray)?nt=!0:(Ae.outputColorSpace!==ge||Ae.toneMapping!==mt)&&(vn=!0):(nt=!0,Ae.__version=X.version);let qt=Ae.currentProgram;(nt===!0||vn===!0)&&(qt=vn===!0?Vd(X,B,$,ge,mt):hs(X,B,$),F&&X.isNodeMaterial&&F.onUpdateProgram(X,qt,Ae));let js=!1,sn=!1,xn=!1;const it=qt.getUniforms(),zt=Ae.uniforms;if(fe.useProgram(qt.program)&&(js=!0,sn=!0,xn=!0),X.id!==V&&(V=X.id,sn=!0),js||j!==E){fe.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),it.setValue(O,"projectionMatrix",E.projectionMatrix),it.setValue(O,"viewMatrix",E.matrixWorldInverse);const Ft=it.map.cameraPosition;Ft!==void 0&&Ft.setValue(O,ot.setFromMatrixPosition(E.matrixWorld)),dt.logarithmicDepthBuffer&&it.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&it.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),j!==E&&(j=E,sn=!0,xn=!0)}if(Ae.needsLights&&(Zt.state.sunShadowMap.length>0&&it.setValue(O,"sunShadowMap",Zt.state.sunShadowMap,Oe),Zt.state.directionalShadowMap.length>0&&it.setValue(O,"directionalShadowMap",Zt.state.directionalShadowMap,Oe),Zt.state.spotShadowMap.length>0&&it.setValue(O,"spotShadowMap",Zt.state.spotShadowMap,Oe),Zt.state.pointShadowMap.length>0&&it.setValue(O,"pointShadowMap",Zt.state.pointShadowMap,Oe)),$.isSkinnedMesh){it.setOptional(O,$,"bindMatrix"),it.setOptional(O,$,"bindMatrixInverse");const Mt=$.skeleton;Mt&&(Mt.boneTexture===null&&Mt.computeBoneTexture(),it.setValue(O,"boneTexture",Mt.boneTexture,Oe))}$.isBatchedMesh&&(it.setOptional(O,$,"batchingTexture"),it.setValue(O,"batchingTexture",$._matricesTexture,Oe),it.setOptional(O,$,"batchingIdTexture"),it.setValue(O,"batchingIdTexture",$._indirectTexture,Oe),it.setOptional(O,$,"batchingColorTexture"),$._colorsTexture!==null&&it.setValue(O,"batchingColorTexture",$._colorsTexture,Oe));const Mi=Y.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&ee.update($,Y,qt),(sn||Ae.receiveShadow!==$.receiveShadow)&&(Ae.receiveShadow=$.receiveShadow,it.setValue(O,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&B.environment!==null&&(zt.envMapIntensity.value=B.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=_v()),sn){if(it.setValue(O,"toneMappingExposure",A.toneMappingExposure),Ae.needsLights&&Xd(zt,xn),_e&&X.fog===!0&&oe.refreshFogUniforms(zt,_e),oe.refreshMaterialUniforms(zt,X,ie,le,w.state.transmissionRenderTarget[E.id]),Ae.needsLights&&Ae.numLightProbeGrids>0){const Mt=M;let Ft=0;for(const Gi of w.state.lightProbeGridArray)Gi.texture!==null&&(Mt.textures[Ft]=Gi.texture,Mt.min[Ft]=Gi.boundingBox.min,Mt.max[Ft]=Gi.boundingBox.max,Mt.resolution[Ft]=Gi.resolution,Ft++);for(const Gi in Mt)Mt[Gi].length=Ft;zt.probesSH.value=Mt.textures,zt.probesMin.value=Mt.min,zt.probesMax.value=Mt.max,zt.probesResolution.value=Mt.resolution}Oa.upload(O,Gl(Ae),zt,Oe)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Oa.upload(O,Gl(Ae),zt,Oe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&it.setValue(O,"center",$.center),it.setValue(O,"modelViewMatrix",$.modelViewMatrix),it.setValue(O,"normalMatrix",$.normalMatrix),it.setValue(O,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){const Mt=X.uniformsGroups;for(let Ft=0,Gi=Mt.length;Ft<Gi;Ft++){const Xl=Mt[Ft];De.update(Xl,qt),De.bind(Xl,qt)}}return qt}function Xd(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.sunLights.needsUpdate=B,E.sunLightShadows.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function qd(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(E,B,Y){const X=Le.get(E);X.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Le.get(E.texture).__webglTexture=B,Le.get(E.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:Y,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const Y=Le.get(E);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,Y=0){K=E,z=B,D=Y;let X=null,$=!1,_e=!1;if(E){const ge=Le.get(E);if(ge.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(O.FRAMEBUFFER,ge.__webglFramebuffer),q.copy(E.viewport),re.copy(E.scissor),Fe=E.scissorTest,fe.viewport(q),fe.scissor(re),fe.setScissorTest(Fe),V=-1;return}else if(ge.__webglFramebuffer===void 0)Oe.setupRenderTarget(E);else if(ge.__hasExternalTextures)Oe.rebindTextures(E,Le.get(E.texture).__webglTexture,Le.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ge=E.depthTexture;if(ge.__boundDepthTexture!==Ge){if(Ge!==null&&Le.has(Ge)&&(E.width!==Ge.image.width||E.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(E)}}const Se=E.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(_e=!0);const Pe=Le.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[B])?X=Pe[B][Y]:X=Pe[B],$=!0):E.samples>0&&Oe.useMultisampledRTT(E)===!1?X=Le.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?X=Pe[Y]:X=Pe,q.copy(E.viewport),re.copy(E.scissor),Fe=E.scissorTest}else q.copy(he).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),Fe=Ce;if(Y!==0&&(X=k),fe.bindFramebuffer(O.FRAMEBUFFER,X)&&fe.drawBuffers(E,X),fe.viewport(q),fe.scissor(re),fe.setScissorTest(Fe),$){const ge=Le.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,ge.__webglTexture,Y)}else if(_e){const ge=B;for(let Se=0;Se<E.textures.length;Se++){const Pe=Le.get(E.textures[Se]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Se,Pe.__webglTexture,Y,ge)}}else if(E!==null&&Y!==0){const ge=Le.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ge.__webglTexture,Y)}V=-1};function Wl(E){const B=Le.get(E);return(B.__readFormat!==E.format||B.__readType!==E.type)&&(B.__readFormat=E.format,B.__readType=E.type,B.__formatReadable=dt.textureFormatReadable(E.format),B.__typeReadable=dt.textureTypeReadable(E.type)),B}this.readRenderTargetPixels=function(E,B,Y,X,$,_e,Te,ge=0){if(!(E&&E.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Le.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Te!==void 0&&(Se=Se[Te],Array.isArray(Se)&&(Se=Se[0])),Se){fe.bindFramebuffer(O.FRAMEBUFFER,Se);try{const Pe=E.textures[ge],Ge=Pe.format,et=Pe.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);const Ee=Wl(Pe);if(Ee.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-X&&Y>=0&&Y<=E.height-$&&O.readPixels(B,Y,X,$,de.convert(Ge),de.convert(et),_e)}finally{const Pe=K!==null?Le.get(K).__webglFramebuffer:null;fe.bindFramebuffer(O.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,B,Y,X,$,_e,Te,ge=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Le.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Te!==void 0&&(Se=Se[Te],Array.isArray(Se)&&(Se=Se[0])),Se)if(B>=0&&B<=E.width-X&&Y>=0&&Y<=E.height-$){fe.bindFramebuffer(O.FRAMEBUFFER,Se);const Pe=E.textures[ge],Ge=Pe.format,et=Pe.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);const Ee=Wl(Pe);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,tt),O.bufferData(O.PIXEL_PACK_BUFFER,_e.byteLength,O.STREAM_READ),O.readPixels(B,Y,X,$,de.convert(Ge),de.convert(et),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Ct=K!==null?Le.get(K).__webglFramebuffer:null;fe.bindFramebuffer(O.FRAMEBUFFER,Ct);const mt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Wu(O,mt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,tt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,_e),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(tt),O.deleteSync(mt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,Y=0){const X=Math.pow(2,-Y),$=Math.floor(E.image.width*X),_e=Math.floor(E.image.height*X),Te=B!==null?B.x:0,ge=B!==null?B.y:0;Oe.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,Te,ge,$,_e),fe.unbindTexture()},this.copyTextureToTexture=function(E,B,Y=null,X=null,$=0,_e=0){let Te,ge,Se,Pe,Ge,et,Ee,tt,Ct;const mt=E.isCompressedTexture?E.mipmaps[_e]:E.image;if(Y!==null)Te=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,Se=Y.isBox3?Y.max.z-Y.min.z:1,Pe=Y.min.x,Ge=Y.min.y,et=Y.isBox3?Y.min.z:0;else{const it=Math.pow(2,-$);Te=Math.floor(mt.width*it),ge=Math.floor(mt.height*it),E.isDataArrayTexture?Se=mt.depth:E.isData3DTexture?Se=Math.floor(mt.depth*it):Se=1,Pe=0,Ge=0,et=0}X!==null?(Ee=X.x,tt=X.y,Ct=X.z):(Ee=0,tt=0,Ct=0);const ut=de.convert(B.format),Xt=de.convert(B.type);let Ae;B.isData3DTexture?(Oe.setTexture3D(B,0),Ae=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Oe.setTexture2DArray(B,0),Ae=O.TEXTURE_2D_ARRAY):(Oe.setTexture2D(B,0),Ae=O.TEXTURE_2D),fe.activeTexture(O.TEXTURE0),fe.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),fe.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),fe.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);const Zt=fe.getParameter(O.UNPACK_ROW_LENGTH),nt=fe.getParameter(O.UNPACK_IMAGE_HEIGHT),vn=fe.getParameter(O.UNPACK_SKIP_PIXELS),qt=fe.getParameter(O.UNPACK_SKIP_ROWS),js=fe.getParameter(O.UNPACK_SKIP_IMAGES);fe.pixelStorei(O.UNPACK_ROW_LENGTH,mt.width),fe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,mt.height),fe.pixelStorei(O.UNPACK_SKIP_PIXELS,Pe),fe.pixelStorei(O.UNPACK_SKIP_ROWS,Ge),fe.pixelStorei(O.UNPACK_SKIP_IMAGES,et);const sn=E.isDataArrayTexture||E.isData3DTexture,xn=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const it=Le.get(E),zt=Le.get(B),Mi=Le.get(it.__renderTarget),Mt=Le.get(zt.__renderTarget);fe.bindFramebuffer(O.READ_FRAMEBUFFER,Mi.__webglFramebuffer),fe.bindFramebuffer(O.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let Ft=0;Ft<Se;Ft++)sn&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(E).__webglTexture,$,et+Ft),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(B).__webglTexture,_e,Ct+Ft)),O.blitFramebuffer(Pe,Ge,Pe+Te,Ge+ge,Ee,tt,Ee+Te,tt+ge,O.DEPTH_BUFFER_BIT,O.NEAREST);fe.bindFramebuffer(O.READ_FRAMEBUFFER,null),fe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||Le.has(E)){const it=Le.get(E),zt=Le.get(B);fe.bindFramebuffer(O.READ_FRAMEBUFFER,R),fe.bindFramebuffer(O.DRAW_FRAMEBUFFER,H);for(let Mi=0;Mi<Se;Mi++)sn?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,it.__webglTexture,$,et+Mi):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,it.__webglTexture,$),xn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,zt.__webglTexture,_e,Ct+Mi):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,zt.__webglTexture,_e),$!==0?O.blitFramebuffer(Pe,Ge,Pe+Te,Ge+ge,Ee,tt,Ee+Te,tt+ge,O.COLOR_BUFFER_BIT,O.NEAREST):xn?O.copyTexSubImage3D(Ae,_e,Ee,tt,Ct+Mi,Pe,Ge,Te,ge):O.copyTexSubImage2D(Ae,_e,Ee,tt,Pe,Ge,Te,ge);fe.bindFramebuffer(O.READ_FRAMEBUFFER,null),fe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else xn?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ae,_e,Ee,tt,Ct,Te,ge,Se,ut,Xt,mt.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(Ae,_e,Ee,tt,Ct,Te,ge,Se,ut,mt.data):O.texSubImage3D(Ae,_e,Ee,tt,Ct,Te,ge,Se,ut,Xt,mt):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,_e,Ee,tt,Te,ge,ut,Xt,mt.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,_e,Ee,tt,mt.width,mt.height,ut,mt.data):O.texSubImage2D(O.TEXTURE_2D,_e,Ee,tt,Te,ge,ut,Xt,mt);fe.pixelStorei(O.UNPACK_ROW_LENGTH,Zt),fe.pixelStorei(O.UNPACK_IMAGE_HEIGHT,nt),fe.pixelStorei(O.UNPACK_SKIP_PIXELS,vn),fe.pixelStorei(O.UNPACK_SKIP_ROWS,qt),fe.pixelStorei(O.UNPACK_SKIP_IMAGES,js),_e===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&O.generateMipmap(Ae),fe.unbindTexture()},this.initRenderTarget=function(E){Le.get(E).__webglFramebuffer===void 0&&Oe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Oe.setTextureCube(E,0):E.isData3DTexture?Oe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Oe.setTexture2DArray(E,0):Oe.setTexture2D(E,0),fe.unbindTexture()},this.resetState=function(){z=0,D=0,K=null,fe.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const Wr=new WeakMap,xv=new URL(""+new URL("draco_decoder-C32yEggz.wasm",import.meta.url).href,import.meta.url).toString(),Mv=new URL(""+new URL("draco_wasm_wrapper-DxJM36Ib.js",import.meta.url).href,import.meta.url).toString(),Sv=new URL(""+new URL("draco_decoder-fzg4nYZr.js",import.meta.url).href,import.meta.url).toString();new URL(""+new URL("draco_wasm_wrapper-fZCQGLGb.js",import.meta.url).href,import.meta.url).toString(),new URL(""+new URL("draco_decoder-Z1_iN-Ht.wasm",import.meta.url).href,import.meta.url).toString();class yv extends Dn{constructor(e){super(e),this.decoderPaths={js:Mv,wasm:xv,dep_js:Sv},this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){const{decoderPaths:t}=this;return typeof e=="object"?(t.js=e.js,t.wasm=e.wasm,t.dep_js=null):(t.js=fn.resolveURL("draco_wasm_wrapper.js",e),t.wasm=fn.resolveURL("draco_decoder.wasm",e),t.dep_js=fn.resolveURL("draco_decoder.js",e)),this}setDecoderConfig(e){return console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."),this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,i,n){const s=new ja(this.manager);s.setPriority(this.priority),s.setCache(this.cache),s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,r=>{this.parse(r,t,n)},i,n)}parse(e,t,i=()=>{}){this.decodeDracoFile(e,t,null,null,bt,i).catch(i)}decodeDracoFile(e,t,i,n,s=li,r=()=>{}){const o={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:n||this.defaultAttributeTypes,useUniqueIDs:!!i,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t).catch(r)}decodeGeometry(e,t){const i=JSON.stringify(t);if(Wr.has(e)){const l=Wr.get(e);if(l.key===i)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let n;const s=this.workerNextTaskID++,r=e.byteLength,o=this._getWorker(s,r).then(l=>(n=l,new Promise((c,h)=>{n._callbacks[s]={resolve:c,reject:h},n.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{n&&s&&this._releaseTask(n,s)}),Wr.set(e,{key:i,promise:o}),o}_createGeometry(e){const t=new wt;e.index&&t.setIndex(new oi(e.index.array,1));for(let i=0;i<e.attributes.length;i++){const{name:n,array:s,itemSize:r,stride:o,vertexColorSpace:l}=e.attributes[i];let c;if(r===o)c=new oi(s,r);else{const h=new od(s,o);c=new ir(h,r,0)}n==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(s instanceof Float32Array)),t.setAttribute(n,c)}return t}_assignVertexColorSpace(e,t){if(t!==bt)return;const i=new Me;for(let n=0,s=e.count;n<s;n++)i.fromBufferAttribute(e,n),Ke.colorSpaceToWorking(i,bt),e.setXYZ(n,i.r,i.g,i.b)}_loadLibrary(e,t){const i=new ja(this.manager);return i.setPriority(this.priority),i.setCache(this.cache),i.setResponseType(t),i.setWithCredentials(this.withCredentials),new Promise((n,s)=>{i.load(e,n,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[],{decoderPaths:i}=this;if(e){if(i.dep_js===null)throw new Error("THREE.DRACOLoader: WebAssembly is required when using a custom decoder paths.");t.push(this._loadLibrary(i.dep_js,"text"))}else t.push(this._loadLibrary(i.js,"text")),t.push(this._loadLibrary(i.wasm,"arraybuffer"));return this.decoderPending=Promise.all(t).then(n=>{const s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const r=bv.toString(),o=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const n=new Worker(this.workerSourceURL);n._callbacks={},n._taskCosts={},n._taskLoad=0,n.postMessage({type:"init",decoderConfig:this.decoderConfig}),n.onmessage=function(s){const r=s.data;switch(r.type){case"decode":n._callbacks[r.id].resolve(r);break;case"error":n._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(n)}else this.workerPool.sort(function(n,s){return n._taskLoad>s._taskLoad?-1:1});const i=this.workerPool[this.workerPool.length-1];return i._taskCosts[e]=t,i._taskLoad+=t,i})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function bv(){let a,e;onmessage=function(r){const o=r.data;switch(o.type){case"init":a=o.decoderConfig,e=new Promise(function(h){a.onModuleLoaded=function(d){h({draco:d})},DracoDecoderModule(a)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const d=h.draco,u=new d.Decoder;try{const f=t(d,u,new Int8Array(l),c),p=f.attributes.map(v=>v.array.buffer);f.index&&p.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},p)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{d.destroy(u)}});break}};function t(r,o,l,c){const h=c.attributeIDs,d=c.attributeTypes;let u,f;const p=o.GetEncodedGeometryType(l);if(p===r.TRIANGULAR_MESH)u=new r.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,u);else if(p===r.POINT_CLOUD)u=new r.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,u);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||u.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const v={index:null,attributes:[]};for(const g in h){const m=self[d[g]];let x,S;if(c.useUniqueIDs)S=h[g],x=o.GetAttributeByUniqueId(u,S);else{if(S=o.GetAttributeId(u,r[h[g]]),S===-1)continue;x=o.GetAttribute(u,S)}const M=n(r,o,u,g,m,x);g==="color"&&(M.vertexColorSpace=c.vertexColorSpace),v.attributes.push(M)}return p===r.TRIANGULAR_MESH&&(v.index=i(r,o,u)),r.destroy(u),v}function i(r,o,l){const h=l.num_faces()*3,d=h*4,u=r._malloc(d);o.GetTrianglesUInt32Array(l,d,u);const f=new Uint32Array(r.HEAPF32.buffer,u,h).slice();return r._free(u),{array:f,itemSize:1}}function n(r,o,l,c,h,d){const u=l.num_points(),f=d.num_components(),p=s(r,h),v=f*h.BYTES_PER_ELEMENT,g=Math.ceil(v/4)*4,m=g/h.BYTES_PER_ELEMENT,x=u*v,S=u*g,M=r._malloc(x);o.GetAttributeDataArrayForAllPoints(l,d,p,x,M);const y=new h(r.HEAPF32.buffer,M,x/h.BYTES_PER_ELEMENT);let w;if(v===g)w=y.slice();else{w=new h(S/h.BYTES_PER_ELEMENT);let _=0;for(let b=0;b<u;b++){for(let P=0;P<f;P++)w[_+P]=y[b*f+P];_+=m}}return r._free(M),{name:c,count:u,itemSize:f,array:w,stride:m}}function s(r,o){switch(o){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}function dh(a,e){if(e===Lu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===Vo||e===Yh){let t=a.getIndex();if(t===null){const s=[],r=a.getAttribute("position");if(r!==void 0){for(let o=0;o<r.count;o++)s.push(o);a.setIndex(s),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}const i=t.count-2,n=[];if(e===Vo)for(let s=1;s<=i;s++)n.push(t.getX(0)),n.push(t.getX(s)),n.push(t.getX(s+1));else for(let s=0;s<i;s++)s%2===0?(n.push(t.getX(s)),n.push(t.getX(s+1)),n.push(t.getX(s+2))):(n.push(t.getX(s+2)),n.push(t.getX(s+1)),n.push(t.getX(s)));return n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),a.setIndex(n),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}function Dd(a){const e=new Map,t=new Map,i=a.clone();return Nd(a,i,function(n,s){e.set(s,n),t.set(n,s)}),i.traverse(function(n){if(!n.isSkinnedMesh)return;const s=n,r=e.get(n),o=r.skeleton.bones;s.skeleton=r.skeleton.clone(),s.bindMatrix.copy(r.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),i}function Nd(a,e,t){t(a,e);for(let i=0;i<a.children.length;i++)Nd(a.children[i],e.children[i],t)}class Tv extends Dn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Rv(t)}),this.register(function(t){return new Pv(t)}),this.register(function(t){return new Iv(t)}),this.register(function(t){return new zv(t)}),this.register(function(t){return new Hv(t)}),this.register(function(t){return new Gv(t)}),this.register(function(t){return new Dv(t)}),this.register(function(t){return new Nv(t)}),this.register(function(t){return new Uv(t)}),this.register(function(t){return new Fv(t)}),this.register(function(t){return new Cv(t)}),this.register(function(t){return new Bv(t)}),this.register(function(t){return new Lv(t)}),this.register(function(t){return new kv(t)}),this.register(function(t){return new Ov(t)}),this.register(function(t){return new Ev(t)}),this.register(function(t){return new uh(t,je.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new uh(t,je.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Vv(t)})}load(e,t,i,n){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=fn.extractUrlBase(e);r=fn.resolveURL(c,this.path)}else r=fn.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){n?n(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ja(this.manager);l.setPriority(this.priority),l.setCache(this.cache),l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let s;const r={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ud){try{r[je.KHR_BINARY_GLTF]=new Wv(e)}catch(d){n&&n(d);return}s=JSON.parse(r[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new nx(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,r[d.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const d=s.extensionsUsed[h],u=s.extensionsRequired||[];switch(d){case je.KHR_MATERIALS_UNLIT:r[d]=new Av;break;case je.KHR_DRACO_MESH_COMPRESSION:r[d]=new Xv(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:r[d]=new qv;break;case je.KHR_MESH_QUANTIZATION:r[d]=new $v;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(r),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){const i=this;return new Promise(function(n,s){i.parse(e,t,n,s)})}}function wv(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}function St(a,e,t){const i=a.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ev{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){const s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let n=t.cache.get(i);if(n)return n;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Me(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],li);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new qo(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Md(h),c.distance=d;break;case"spot":c=new ap(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ii(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class Av{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return pt}extendParams(e,t,i){const n=[];e.color=new Me(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],li),e.opacity=r[3]}s.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",s.baseColorTexture,bt))}return Promise.all(n)}}class Cv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class Rv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(n.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const s=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Re(s,s)}return Promise.all(n)}}class Pv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return t.diffuseRoughness=i.diffuseRoughnessFactor!==void 0?i.diffuseRoughnessFactor:0,i.diffuseRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"diffuseRoughnessMap",i.diffuseRoughnessTexture)),Promise.all(n)}}class Iv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class Lv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(n)}}class Dv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];if(t.sheenColor=new Me(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const s=i.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],li)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,bt)),i.sheenRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(n)}}class Nv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&n.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(n)}}class Uv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const s=i.attenuationColor||[1,1,1];return t.attenuationColor=new Me().setRGB(s[0],s[1],s[2],li),Promise.all(n)}}class Fv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Bv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const s=i.specularColorFactor||[1,1,1];return t.specularColor=new Me().setRGB(s[0],s[1],s[2],li),i.specularColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,bt)),Promise.all(n)}}class Ov{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&n.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(n)}}class kv{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return St(this.parser,e,this.name)!==null?fi:null}extendMaterialParams(e,t){const i=St(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&n.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(n)}}class zv{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const s=n.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class Hv{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,n=i.json,s=n.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=n.images[r.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,r.source,l)}}class Gv{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,n=i.json,s=n.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=n.images[r.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,r.source,l)}}class uh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const n=i.extensions[this.name],s=this.parser.getDependency("buffer",n.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=n.byteOffset||0,c=n.byteLength||0,h=n.count,d=n.byteStride,u=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,d,u,n.mode,n.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*d);return r.decodeGltfBuffer(new Uint8Array(f),h,d,u,n.mode,n.filter),f})})}else return null}}class Vv{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const n=t.meshes[i.mesh];for(const c of n.primitives)if(c.mode!==mi.TRIANGLES&&c.mode!==mi.TRIANGLE_STRIP&&c.mode!==mi.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=i.extensions[this.name].attributes,o=[],l={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const p of d){const v=new ze,g=new U,m=new vi,x=new U(1,1,1),S=new Jn(p.geometry,p.material,u);for(let y=0;y<u;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),S.setMatrixAt(y,v.compose(g,m,x));let M=null;for(const y in l)if(y==="_COLOR_0"){const w=l[y];S.instanceColor=new qa(w.array,w.itemSize,w.normalized)}else if(y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"){if(M===null){const _=S.geometry;M=new wt,M.name=_.name;for(const b in _.attributes)M.setAttribute(b,_.attributes[b]);for(const b in _.morphAttributes)M.morphAttributes[b]=_.morphAttributes[b];_.index!==null&&M.setIndex(_.index),M.morphTargetsRelative=_.morphTargetsRelative;for(const b of _.groups)M.addGroup(b.start,b.count,b.materialIndex);_.boundingBox!==null&&(M.boundingBox=_.boundingBox.clone()),_.boundingSphere!==null&&(M.boundingSphere=_.boundingSphere.clone()),M.drawRange.start=_.drawRange.start,M.drawRange.count=_.drawRange.count,M.userData=Object.assign({},_.userData),S.geometry=M}const w=l[y];M.setAttribute(y,new qa(w.array,w.itemSize,w.normalized))}ct.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ud="glTF",Ss=12,fh={JSON:1313821514,BIN:5130562};class Wv{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ss),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ud)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-Ss,s=new DataView(e,Ss);let r=0;for(;r<n;){const o=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===fh.JSON){const c=new Uint8Array(e,Ss+r,o);this.content=i.decode(c)}else if(l===fh.BIN){const c=Ss+r;this.body=e.slice(c,c+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Xv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,n=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(const h in r){const d=jo[h]||h.toLowerCase();o[d]=r[h]}for(const h in e.attributes){const d=jo[h]||h.toLowerCase();if(r[h]!==void 0){const u=i.accessors[e.attributes[h]],f=ts[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(d,u){n.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],g=l[p];g!==void 0&&(v.normalized=g)}d(f)},o,c,li,u)})})}}class qv{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){const i=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}}class $v{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class Fd extends rs{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n*3+n;for(let r=0;r!==n;r++)t[r]=i[s+r];return t}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,d=(i-t)/h,u=d*d,f=u*d,p=e*c,v=p-c,g=-2*f+3*u,m=f-u,x=1-g,S=m-u+d;for(let M=0;M!==o;M++){const y=r[v+M+o],w=r[v+M+l]*h,_=r[p+M+o],b=r[p+M]*h;s[M]=x*y+S*w+g*_+m*b}return s}}const Yv=new vi;class Kv extends Fd{interpolate_(e,t,i,n){const s=super.interpolate_(e,t,i,n);return Yv.fromArray(s).normalize().toArray(s),s}}const mi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ph={9728:Et,9729:Vt,9984:zh,9985:Da,9986:Ts,9987:Bi},mh={33071:Fi,33648:ka,10497:xi},Xr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},jo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},jv={CUBICSPLINE:void 0,LINEAR:Bs,STEP:Fs},qr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Jv(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:pn})),a.DefaultMaterial}function Tn(a,e,t){for(const i in t.extensions)a[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Ii(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Zv(a,e,t){let i=!1,n=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(n=!0),d.COLOR_0!==void 0&&(s=!0),i&&n&&s)break}if(!i&&!n&&!s)return Promise.resolve(a);const r=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(i){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):a.attributes.position;r.push(u)}if(n){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):a.attributes.normal;o.push(u)}if(s){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):a.attributes.color;l.push(u)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return i&&(a.morphAttributes.position=h),n&&(a.morphAttributes.normal=d),s&&(a.morphAttributes.color=u),a.morphTargetsRelative=!0,a})}function Qv(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)a.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ex(a){let e;const t=a.extensions&&a.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$r(t.attributes):e=a.indices+":"+$r(a.attributes)+":"+a.mode,a.targets!==void 0)for(let i=0,n=a.targets.length;i<n;i++)e+=":"+$r(a.targets[i]);return e}function $r(a){let e="";const t=Object.keys(a).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+a[t[i]]+";";return e}function Jo(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function tx(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":a.search(/\.ktx2($|\?)/i)>0||a.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const ix=new ze;class nx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new wv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,s=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||s&&r<98?(this.textureLoader=new ip(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new lp(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ja(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,n=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(r){const o={scene:r[0][n.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:n.asset,parser:i,userData:{}};return Tn(s,o,n),Ii(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let n=0,s=e.length;n<s;n++){const r=e[n];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(i[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const n=i.clone(),s=(r,o)=>{const l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(const[c,h]of r.children.entries())s(h,o.children[c])};return s(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const n=e(t[i]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let n=0;n<t.length;n++){const s=e(t[n]);s&&i.push(s)}return i}getDependency(e,t){const i=e+":"+t;let n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":n=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(s,r){return i.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(s,r){i.load(fn.resolveURL(t.uri,n.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const n=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+n)})}loadAccessor(e){const t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const r=Xr[n.type],o=ts[n.componentType],l=n.normalized===!0,c=new o(n.count*r);return Promise.resolve(new oi(c,r,l))}const s=[];return n.bufferView!==void 0?s.push(this.getDependency("bufferView",n.bufferView)):s.push(null),n.sparse!==void 0&&(s.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(s).then(function(r){const o=r[0],l=Xr[n.type],c=ts[n.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=n.byteOffset||0,f=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,p=n.normalized===!0;let v,g;if(f&&f!==d){const m=Math.floor(u/f),x="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+m+":"+n.count;let S=t.cache.get(x);S||(v=new c(o,m*f,n.count*f/h),S=new od(v,f/h),t.cache.add(x,S)),g=new ir(S,l,u%f/h,p)}else o===null?v=new c(n.count*l):v=new c(o,u,n.count*l),g=new oi(v,l,p);if(n.sparse!==void 0){const m=Xr.SCALAR,x=ts[n.sparse.indices.componentType],S=n.sparse.indices.byteOffset||0,M=n.sparse.values.byteOffset||0,y=new x(r[1],S,n.sparse.count*m),w=new c(r[2],M,n.sparse.count*l);o!==null&&(g=new oi(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let _=0,b=y.length;_<b;_++){const P=y[_];if(g.setX(P,w[_*l]),l>=2&&g.setY(P,w[_*l+1]),l>=3&&g.setZ(P,w[_*l+2]),l>=4&&g.setW(P,w[_*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,i=this.options,s=t.textures[e].source,r=t.images[s];let o=this.textureLoader;if(r.uri){const l=i.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){const n=this,s=this.json,r=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=r.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(s.samplers||{})[r.sampler]||{};return h.magFilter=ph[u.magFilter]||Vt,h.minFilter=ph[u.minFilter]||Bi,h.wrapS=mh[u.wrapS]||xi,h.wrapT=mh[u.wrapT]||xi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Et&&h.minFilter!==Vt,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,n=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=n.images[e],o=self.URL||self.webkitURL;let l=r.uri||"",c=!1,h;if(t.isKTX2Loader===!0&&r.bufferView!==void 0)h=i.getDependency("bufferView",r.bufferView).then(function(u){return new Promise(function(f,p){t.parse(u,f,p)})});else{if(r.bufferView!==void 0)l=i.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const f=new Blob([u],{type:r.mimeType});return l=o.createObjectURL(f),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(l).then(function(u){return new Promise(function(f,p){let v=f;t.isImageBitmapLoader===!0&&(v=function(g){const m=new Pt(g);m.needsUpdate=!0,f(m)}),t.load(fn.resolveURL(u,s.path),v,void 0,p)})})}const d=h.then(function(u){return c===!0&&o.revokeObjectURL(l),Ii(u,r),u.userData.mimeType=r.mimeType||tx(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,i,n){const s=this;return this.getDependency("texture",i.index).then(function(r){if(!r)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(r=r.clone(),r.channel=i.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(r);r=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,l)}}return n!==void 0&&(r.colorSpace=n),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const n=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new cd,Ai.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Tl,Ai.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||s||r){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return xt}loadMaterial(e){const t=this,i=this.json,n=this.extensions,s=i.materials[e];let r;const o={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const d=n[je.KHR_MATERIALS_UNLIT];r=d.getMaterialType(),c.push(d.extendParams(o,s,t))}else{const d=s.pbrMetallicRoughness||{};if(o.color=new Me(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],li),o.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,bt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=ft);const h=s.alphaMode||qr.OPAQUE;if(h===qr.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===qr.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==pt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Re(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;o.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&r!==pt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==pt){const d=s.emissiveFactor;o.emissive=new Me().setRGB(d[0],d[1],d[2],li)}return s.emissiveTexture!==void 0&&r!==pt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,bt)),Promise.all(c).then(function(){const d=new r(o);return s.name&&(d.name=s.name),Ii(d,s),t.associations.set(d,{materials:e}),s.extensions&&Tn(n,d,s),d})}createUniqueName(e){const t=at.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,n=this.primitiveCache;function s(o){return i[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return gh(l,o,t)})}const r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=ex(c),d=n[h];if(d)r.push(d.promise);else{let u;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=gh(new wt,c,t),c.mode===mi.TRIANGLE_STRIP?u=u.then(f=>dh(f,Yh)):c.mode===mi.TRIANGLE_FAN&&(u=u.then(f=>dh(f,Vo))),n[h]={primitive:c,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){const t=this,i=this.json,n=this.extensions,s=i.meshes[e],r=s.primitives,o=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?Jv(this.cache):this.getDependency("material",r[l].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(async function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],g=r[f];let m;const x=c[f];if(g.mode===mi.TRIANGLES||g.mode===mi.TRIANGLE_STRIP||g.mode===mi.TRIANGLE_FAN||g.mode===void 0){const S=s.isSkinnedMesh===!0,M=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");S&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=S&&M?new Rf(v,x):new Ie(v,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===mi.LINES)m=new Df(v,x);else if(g.mode===mi.LINE_STRIP)m=new nr(v,x);else if(g.mode===mi.LINE_LOOP)m=new Nf(v,x);else if(g.mode===mi.POINTS)m=new Uf(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&Qv(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Ii(m,s),g.extensions&&Tn(n,m,g),t.assignFinalMaterial(m),d.push(m)}for(let f=0,p=d.length;f<p;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&Tn(n,d[0],s),d[0];const u=new Je;s.extensions&&Tn(n,u,s),t.associations.set(u,{meshes:e});for(let f=0,p=d.length;f<p;f++)u.add(d[f]);return u})}loadCamera(e){let t;const i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new si(wn.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new ar(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ii(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let n=0,s=t.joints.length;n<s;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){const s=n.pop(),r=n,o=[],l=[];for(let c=0,h=r.length;c<h;c++){const d=r[c];if(d){o.push(d);const u=new ze;s!==null&&u.fromArray(s.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new yl(o,l)})}loadAnimation(e){const t=this.json,i=this,n=t.animations[e],s=n.name?n.name:"animation_"+e,r=[],o=[],l=[],c=[],h=[];for(let d=0,u=n.channels.length;d<u;d++){const f=n.channels[d],p=n.samplers[f.sampler],v=f.target,g=v.node,m=n.parameters!==void 0?n.parameters[p.input]:p.input,x=n.parameters!==void 0?n.parameters[p.output]:p.output;v.node!==void 0&&(r.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),c.push(p),h.push(v))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],p=d[2],v=d[3],g=d[4],m=[];for(let S=0,M=u.length;S<M;S++){const y=u[S],w=f[S],_=p[S],b=v[S],P=g[S];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const A=i._createAnimationTracks(y,w,_,b,P);if(A)for(let I=0;I<A.length;I++)m.push(A[I])}const x=new Xo(s,void 0,m);return Ii(x,n),x})}createNodeMesh(e){const t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(s){const r=i._getNodeRef(i.meshCache,n.mesh,s);return n.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),r})}loadNode(e){const t=this.json,i=this,n=t.nodes[e],s=i._loadNodeShallow(e),r=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)r.push(i.getDependency("node",o[c]));const l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,ix)});for(let f=0,p=d.length;f<p;f++)h.add(d[f]);if(h.userData.pivot!==void 0&&d.length>0){const f=h.userData.pivot,p=d[0];h.pivot=new U().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?n.createUniqueName(s.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(n.getDependency("camera",s.camera).then(function(c){return n._getNodeRef(n.cameraCache,s.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new ld:c.length>1?h=new Je:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(s.name&&(h.userData.name=s.name,h.name=r),Ii(h,s),s.extensions&&Tn(i,h,s),s.matrix!==void 0){const d=new ze;d.fromArray(s.matrix),h.applyMatrix4(d)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(s.mesh!==void 0&&n.meshCache.refs[s.mesh]>1){const d=n.associations.get(h);n.associations.set(h,{...d})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],n=this,s=new Je;i.name&&(s.name=n.createUniqueName(i.name)),Ii(s,i),i.extensions&&Tn(t,s,i);const r=i.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(n.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let h=0,d=l.length;h<d;h++){const u=l[h];u.parent!==null?s.add(Dd(u)):s.add(u)}const c=h=>{const d=new Map;for(const[u,f]of n.associations)(u instanceof Ai||u instanceof Pt)&&d.set(u,f);return h.traverse(u=>{const f=n.associations.get(u);f!=null&&d.set(u,f)}),d};return n.associations=c(s),s})}_createAnimationTracks(e,t,i,n,s){const r=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}hn[s.path]===hn.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(hn[s.path]){case hn.weights:h=Gs;break;case hn.rotation:h=Vs;break;case hn.translation:case hn.scale:h=Ka;break;default:i.itemSize===1?h=Gs:h=Ka;break}const d=n.interpolation!==void 0?jv[n.interpolation]:Bs,u=this._getArrayFromAccessor(i);for(let f=0,p=l.length;f<p;f++){const v=new h(l[f]+"."+hn[s.path],t.array,u,d);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),r.push(v)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=Jo(t.constructor),n=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)n[s]=t[s]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const n=this instanceof Vs?Kv:Fd;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function sx(a,e,t){const i=e.attributes,n=new zi;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new U(l[0],l[1],l[2]),new U(c[0],c[1],c[2])),o.normalized){const h=Jo(ts[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new U,l=new U;for(let c=0,h=s.length;c<h;c++){const d=s[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,p=u.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),u.normalized){const v=Jo(ts[u.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}a.boundingBox=n;const r=new Hi;n.getCenter(r.center),r.radius=n.min.distanceTo(n.max)/2,a.boundingSphere=r}function gh(a,e,t){const i=e.attributes,n=[];function s(r,o){return t.getDependency("accessor",r).then(function(l){a.setAttribute(o,l)})}for(const r in i){const o=jo[r]||r.toLowerCase();o in a.attributes||n.push(s(i[r],o))}if(e.indices!==void 0&&!a.index){const r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});n.push(r)}return Ke.workingColorSpace!==li&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Ii(a,e),sx(a,e,t),Promise.all(n).then(function(){return e.targets!==void 0?Zv(a,e.targets,t):a})}const Bd=new yv;Bd.setDecoderPath("./draco/");const Od=new Tv;Od.setDRACOLoader(Bd);const _h=new Map,Xs=new Map;async function Il(a){const e=_h.get(a);if(e)return e;const t=Od.loadAsync(a).then(i=>(Xs.set(a,i),i)).catch(()=>(Xs.set(a,null),null));return _h.set(a,t),t}function ax(a){return Il(`./assets/models/characters/${a}.glb`)}function Yr(a){return Il(`./assets/models/terrain/${a}.glb`)}function rx(a){return Il(`./assets/models/props/${a}.glb`)}function ox(a){return Xs.get(`./assets/models/characters/${a}.glb`)??null}function Ta(a){return Xs.get(`./assets/models/terrain/${a}.glb`)??null}function vh(a){return Xs.get(`./assets/models/props/${a}.glb`)??null}function lx(a){const e=Dd(a.scene);return e.traverse(t=>{if(t.isMesh){const i=t,n=i.material,s=!!(n&&n.name&&n.name.startsWith("emissive"));i.castShadow=!s,i.receiveShadow=!0,i.frustumCulled=!1}}),e}function Ll(a,e){return a==="tree"&&e==="swamp"?"tree_swamp":a==="ruin_wall"&&e==="arctic"?"ruin_wall_arctic":a}function Dl(a){switch(a){case"canyon":return{primary:"column_canyon",earth:"column_canyon"};case"arctic":return{primary:"column_arctic",earth:"column_arctic"};case"volcanic":return{primary:"column_obsidian",earth:"column_obsidian"};case"swamp":return{primary:"column_stone",earth:"column_earth"};default:return{primary:"column_stone",earth:"column_earth"}}}async function cx(a,e){const t=new Set,i=new Set,n=Dl(a.biome);t.add(n.primary),t.add(n.earth);for(const p of a.tiles){const v=p.surface;v!=="water"&&v!=="lava"&&t.add(v),p.isStair&&t.add(v==="metal"?"stair_metal":"stair_stone"),p.isBridge&&t.add(a.biome==="canyon"?"bridge_stone":"bridge_wood"),p.prop&&i.add(Ll(p.prop,a.biome)),p.chest&&i.add("chest")}const s=Array.from(new Set(e)),r=Array.from(t),o=Array.from(i),[l,c,h]=await Promise.all([Promise.all(r.map(async p=>[p,await Yr(p)])),Promise.all(o.map(async p=>[p,await rx(p)])),Promise.all(s.map(async p=>[p,await ax(p)]))]),d=new Map;for(const[p,v]of l)v&&d.set(p,v);if(!d.has(n.primary)){const p=await Yr("column_stone");p&&d.set("column_stone",p)}if(!d.has(n.earth)){const p=await Yr("column_earth");p&&d.set("column_earth",p)}const u=new Map;for(const[p,v]of c)v&&u.set(p,v);const f=new Map;for(const[p,v]of h)v&&f.set(p,v);return{terrain:d,props:u,characters:f}}function hx(a,e){const t=new Map,i=new Map,n=new Map,s=Dl(a.biome);for(const r of[s.primary,s.earth,"column_stone","column_earth"]){const o=Ta(r);o&&t.set(r,o)}for(const r of a.tiles){if(r.surface!=="water"&&r.surface!=="lava"){const o=Ta(r.surface);o&&t.set(r.surface,o)}if(r.isStair){const o=r.surface==="metal"?"stair_metal":"stair_stone",l=Ta(o);l&&t.set(o,l)}if(r.isBridge){const o=a.biome==="canyon"?"bridge_stone":"bridge_wood",l=Ta(o);l&&t.set(o,l)}if(r.prop){const o=Ll(r.prop,a.biome),l=vh(o);l&&i.set(o,l)}if(r.chest){const o=vh("chest");o&&i.set("chest",o)}}for(const r of e){const o=ox(r);o&&n.set(r,o)}return{terrain:t,props:i,characters:n}}const Ja={forest:{id:"forest",skyColor:1253430,fogColor:1715522,fogDensity:.013,sunColor:16770746,sunIntensity:2.35,sunPosition:[14,24,13],rimColor:8246268,rimIntensity:.72,rimPosition:[-15,11,-14],hemiSky:12248829,hemiGround:4338210,hemiIntensity:.62,envIntensity:.78,exposure:1,bloomStrength:.34,bloomRadius:.32,bloomThreshold:1.18,gradeTint:[1.03,1.01,.96],gradeSaturation:1.12,gradeContrast:1.06,vignetteStrength:.22,envSkyPanel:8246268,envGroundPanel:3878689,envAccentPanel:16639626},canyon:{id:"canyon",skyColor:2496043,fogColor:3481132,fogDensity:.014,sunColor:16765601,sunIntensity:2.45,sunPosition:[18,19,11],rimColor:6333946,rimIntensity:.68,rimPosition:[-14,12,-14],hemiSky:16701354,hemiGround:4857099,hemiIntensity:.58,envIntensity:.76,exposure:1.02,bloomStrength:.36,bloomRadius:.35,bloomThreshold:1.18,gradeTint:[1.06,.99,.94],gradeSaturation:1.14,gradeContrast:1.08,vignetteStrength:.24,envSkyPanel:16628340,envGroundPanel:6038544,envAccentPanel:3718648},arctic:{id:"arctic",skyColor:727600,fogColor:1256266,fogDensity:.014,sunColor:14742270,sunIntensity:2.15,sunPosition:[13,23,14],rimColor:3718648,rimIntensity:.85,rimPosition:[-14,12,-13],hemiSky:9684477,hemiGround:1976635,hemiIntensity:.68,envIntensity:.85,exposure:1.02,bloomStrength:.38,bloomRadius:.36,bloomThreshold:1.18,gradeTint:[.95,1.01,1.08],gradeSaturation:1.1,gradeContrast:1.07,vignetteStrength:.24,envSkyPanel:12248829,envGroundPanel:1981023,envAccentPanel:6809849},swamp:{id:"swamp",skyColor:661526,fogColor:1124130,fogDensity:.017,sunColor:12514008,sunIntensity:1.95,sunPosition:[12,22,13],rimColor:11032055,rimIntensity:.78,rimPosition:[-14,10,-14],hemiSky:7268279,hemiGround:1841431,hemiIntensity:.56,envIntensity:.72,exposure:1.05,bloomStrength:.4,bloomRadius:.38,bloomThreshold:1.15,gradeTint:[.96,1.04,1.01],gradeSaturation:1.12,gradeContrast:1.08,vignetteStrength:.27,envSkyPanel:3462041,envGroundPanel:1715746,envAccentPanel:12616956},volcanic:{id:"volcanic",skyColor:1968395,fogColor:2886927,fogDensity:.015,sunColor:16762531,sunIntensity:2.2,sunPosition:[14,24,14],rimColor:9684477,rimIntensity:.78,rimPosition:[-15,12,-15],hemiSky:16557477,hemiGround:3871241,hemiIntensity:.58,envIntensity:.74,exposure:1.04,bloomStrength:.42,bloomRadius:.38,bloomThreshold:1.16,gradeTint:[1.07,.97,.93],gradeSaturation:1.15,gradeContrast:1.1,vignetteStrength:.28,envSkyPanel:16478597,envGroundPanel:15357964,envAccentPanel:16498468}},Za=new Map;function dx(a){const e=new sd;e.background=new Me(a.skyColor);const t=new ui(10,10),i=new pt({color:a.envSkyPanel,side:ft});i.color.multiplyScalar(1.4);const n=new Ie(t,i);n.position.set(0,6,0),n.rotation.x=Math.PI/2,e.add(n);const s=new pt({color:a.envGroundPanel,side:ft});s.color.multiplyScalar(a.id==="volcanic"?1.8:.85);const r=new Ie(t,s);r.position.set(0,-6,0),r.rotation.x=-Math.PI/2,e.add(r);const o=new pt({color:a.sunColor,side:ft});o.color.multiplyScalar(2.6);const l=new Ie(new ui(6,6),o);l.position.set(6,4.5,5),l.lookAt(0,0,0),e.add(l);const c=new pt({color:a.envAccentPanel,side:ft});c.color.multiplyScalar(1.7);const h=new Ie(new ui(7,5),c);return h.position.set(-6,3,-5),h.lookAt(0,0,0),e.add(h),e}function ux(a,e){const t=Za.get(e);if(t)return t;const i=Ja[e]??Ja.forest,n=new Ws(a),s=dx(i),r=n.fromScene(s,.04);return s.traverse(o=>{if(o.isMesh){const l=o;l.geometry.dispose(),l.material.dispose()}}),n.dispose(),Za.set(e,r.texture),r.texture}function fx(){for(const a of Za.values())a.dispose();Za.clear()}function px(){const a=new Cn(85,24,16),e=new Tt({uniforms:{uTopColor:{value:new Me(725796)},uHorizonColor:{value:new Me(2308952)},uBottomColor:{value:new Me(593692)}},vertexShader:`
      varying vec3 vWorldDir;
      void main() {
        vWorldDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTopColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uBottomColor;
      varying vec3 vWorldDir;
      void main() {
        float h = vWorldDir.y;
        vec3 col = h >= 0.0
          ? mix(uHorizonColor, uTopColor, pow(clamp(h, 0.0, 1.0), 0.68))
          : mix(uHorizonColor, uBottomColor, pow(clamp(-h, 0.0, 1.0), 0.72));
        gl_FragColor = vec4(col, 1.0);
      }
    `,side:ii,depthWrite:!1,fog:!1}),t=new Ie(a,e);return t.name="COA_SkyDome",t.frustumCulled=!1,t.renderOrder=-10,t}function xh(a,e,t,i){const n=Ja[i]??Ja.forest;if(a.background=new Me(n.skyColor),a.fog=new tr(n.fogColor,n.fogDensity),a.environment=ux(e,i),a.environmentIntensity=n.envIntensity,e.toneMappingExposure=n.exposure,t.sunLight.color.setHex(n.sunColor),t.sunLight.intensity=n.sunIntensity,t.sunLight.position.set(...n.sunPosition),t.rimLight.color.setHex(n.rimColor),t.rimLight.intensity=n.rimIntensity,t.rimLight.position.set(...n.rimPosition),t.hemiLight.color.setHex(n.hemiSky),t.hemiLight.groundColor.setHex(n.hemiGround),t.hemiLight.intensity=n.hemiIntensity,t.skyDome&&t.skyDome.material instanceof Tt){const s=t.skyDome.material.uniforms;s.uTopColor.value.setHex(n.skyColor),s.uHorizonColor.value.setHex(n.fogColor).lerp(new Me(n.envSkyPanel),.22),s.uBottomColor.value.setHex(n.skyColor).multiplyScalar(.55)}return n}const Mh=new Map;let Kr=null,jr=null,Jr=null,wa=null;function Nl(a){if(typeof document>"u")return null;const e=512,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");if(!i)return null;const n=i.createImageData(e,e),s=n.data,r=.12,o=(c,h)=>{const d=Math.sin(c*12.9898+h*78.233)*43758.5453;return d-Math.floor(d)};for(let c=0;c<e;c++){const h=c/(e-1);for(let d=0;d<e;d++){const u=d/(e-1);let f=0,p=0,v=1;if(u<r?f-=(r-u)/r*.65:u>1-r&&(f+=(u-(1-r))/r*.65),h<r?p-=(r-h)/r*.65:h>1-r&&(p+=(h-(1-r))/r*.65),a==="cloth"){const x=Math.sin(u*Math.PI*24)*.08,S=Math.cos(h*Math.PI*24)*.08;f+=x,p+=S}else if(a==="stone"){const x=(o(Math.floor(d/4),Math.floor(c/4))-.5)*.22,S=(o(Math.floor(d/4)+17,Math.floor(c/4)+31)-.5)*.22;f+=x,p+=S}else{const x=(o(Math.floor(d/8),Math.floor(c/8))-.5)*.06;f+=x,p+=x}const g=Math.hypot(f,p,v)||1;f/=g,p/=g,v/=g;const m=(c*e+d)*4;s[m]=Math.round((f*.5+.5)*255),s[m+1]=Math.round((p*.5+.5)*255),s[m+2]=Math.round((v*.5+.5)*255),s[m+3]=255}}i.putImageData(n,0,0);const l=new dd(t);return l.colorSpace=Ki,l.wrapS=xi,l.wrapT=xi,l.anisotropy=4,l.needsUpdate=!0,l}function Ea(){return Kr||(Kr=Nl("bevel")),Kr}function mx(){return jr||(jr=Nl("cloth")),jr}function gx(){return Jr||(Jr=Nl("stone")),Jr}function Zo(a){const e=Mh.get(a);if(e)return e;let t;switch(a){case"steel":t=new xt({vertexColors:!0,metalness:.78,roughness:.25,normalMap:Ea(),normalScale:new Re(.45,.45)});break;case"gold":t=new xt({vertexColors:!0,metalness:.85,roughness:.22,normalMap:Ea(),normalScale:new Re(.5,.5)});break;case"cloth":t=new xt({vertexColors:!0,metalness:.04,roughness:.9,normalMap:mx(),normalScale:new Re(.35,.35)});break;case"leather":t=new xt({vertexColors:!0,metalness:.08,roughness:.72,normalMap:Ea(),normalScale:new Re(.4,.4)});break;case"stone":t=new xt({vertexColors:!0,metalness:.08,roughness:.78,normalMap:gx(),normalScale:new Re(.55,.55)});break;case"ice":t=new fi({vertexColors:!0,metalness:.1,roughness:.14,clearcoat:.9,clearcoatRoughness:.12,normalMap:Ea(),normalScale:new Re(.5,.5)});break;case"emissive":{const i=new xt({vertexColors:!0,emissive:new Me(16777215),emissiveIntensity:2.35,metalness:.1,roughness:.2});i.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`
          #include <emissivemap_fragment>
          totalEmissiveRadiance *= vColor.rgb;
          `)},t=i;break}}return Mh.set(a,t),t}function kd(){if(!wa&&typeof document<"u"){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");if(t){const i=t.createRadialGradient(128,128,20.48,128,128,122.88);i.addColorStop(0,"rgba(0, 0, 0, 0.85)"),i.addColorStop(.55,"rgba(0, 0, 0, 0.45)"),i.addColorStop(1,"rgba(0, 0, 0, 0.0)"),t.fillStyle=i,t.fillRect(0,0,256,256)}wa=new dd(e),wa.colorSpace=bt}return new pt({color:16777215,map:wa,transparent:!0,opacity:.56,depthWrite:!1})}const _x=[{dir:[1,0,0],corners:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],shade:.94},{dir:[-1,0,0],corners:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],shade:.89},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.72},{dir:[0,0,1],corners:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],shade:.97},{dir:[0,0,-1],corners:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],shade:.86}],Sh=[[0,0],[1,0],[1,1],[0,1]];function yh(a,e,t){return`${a},${e},${t}`}function vx(a){return a.emissive?"emissive":a.mat?a.mat:(a.metalness??0)>=.82?"gold":(a.metalness??0)>=.45?"steel":"cloth"}function Ht(a,e=.048,t=[0,0,0]){const i=new Je;if(a.length===0)return i;const n=new Map;let s=1/0,r=-1/0;for(const u of a){const f=Math.round(u.x),p=Math.round(u.y),v=Math.round(u.z);p<s&&(s=p),p>r&&(r=p),n.set(yh(f,p,v),{...u,x:f,y:p,z:v})}const o=Math.max(1,r-s),l=(u,f,p)=>n.has(yh(u,f,p)),c=new Map,h=u=>{let f=c.get(u);return f||(f={positions:[],normals:[],colors:[],uvs:[],indices:[]},c.set(u,f)),f},d=new Me;for(const u of n.values()){const f=vx(u),p=h(f);d.setHex(u.color);const v=u.emissive?1:.85+.15*((u.y-s)/o);for(const g of _x){const m=u.x+g.dir[0],x=u.y+g.dir[1],S=u.z+g.dir[2];if(l(m,x,S))continue;const M=p.positions.length/3,y=[],w=[];g.dir[0]===0&&w.push([1,0,0]),g.dir[1]===0&&w.push([0,1,0]),g.dir[2]===0&&w.push([0,0,1]);const _=w[0],b=w[1];for(let P=0;P<4;P++){const A=g.corners[P],I=(u.x+A[0]-.5+t[0])*e,F=(u.y+A[1]-.5+t[1])*e,k=(u.z+A[2]-.5+t[2])*e;p.positions.push(I,F,k),p.normals.push(g.dir[0],g.dir[1],g.dir[2]),p.uvs.push(Sh[P][0],Sh[P][1]);let R=1;if(!u.emissive){const z=_[0]?A[0]?1:-1:_[1]?A[1]?1:-1:A[2]?1:-1,D=b[0]?A[0]?1:-1:b[1]?A[1]?1:-1:A[2]?1:-1,K=l(m+_[0]*z,x+_[1]*z,S+_[2]*z)?1:0,V=l(m+b[0]*D,x+b[1]*D,S+b[2]*D)?1:0,j=l(m+_[0]*z+b[0]*D,x+_[1]*z+b[1]*D,S+_[2]*z+b[2]*D)?1:0;R=K&&V?.42:1-(K+V+j)*.17}y.push(R);const H=u.emissive?1:R*v*g.shade;p.colors.push(d.r*H,d.g*H,d.b*H)}y[0]+y[2]>y[1]+y[3]?p.indices.push(M,M+1,M+2,M,M+2,M+3):p.indices.push(M+1,M+2,M+3,M+1,M+3,M)}}for(const[u,f]of c.entries()){if(f.indices.length===0)continue;const p=new wt;p.setAttribute("position",new Ye(f.positions,3)),p.setAttribute("normal",new Ye(f.normals,3)),p.setAttribute("color",new Ye(f.colors,3)),p.setAttribute("uv",new Ye(f.uvs,2)),p.setIndex(f.indices),p.computeBoundingSphere();const v=new Ie(p,Zo(u));v.castShadow=u!=="emissive",v.receiveShadow=!0,i.add(v)}return i}class di{list=[];box(e,t,i,n,s,r,o,l){for(let c=e;c<=n;c++)for(let h=t;h<=s;h++)for(let d=i;d<=r;d++)this.list.push({x:c,y:h,z:d,color:o,emissive:l==="emissive",mat:l})}dot(e,t,i,n,s){this.list.push({x:e,y:t,z:i,color:n,emissive:s==="emissive",mat:s})}}function xx(a,e){const t=e==="enemy";switch(a){case"holy_knight":return{armor:t?6583435:13161699,armorDark:4674921,trim:16096779,cloth:t?10033947:1920728,cape:t?8330525:1982639,leather:7877903,skin:15120540,accentGlow:3718648,armorMat:"steel"};case"dark_knight_boss":return{armor:3018853,armorDark:1973067,trim:14753096,cloth:1579035,cape:4982041,leather:2565930,skin:3223169,accentGlow:16007006,armorMat:"steel"};case"black_mage":return{armor:1981066,armorDark:1516884,trim:15381256,cloth:t?5774471:1920728,cape:1973067,leather:7877903,skin:592139,accentGlow:16707722,armorMat:"cloth"};case"archmage_boss":return{armor:223649,armorDark:805486,trim:8246268,cloth:481669,cape:12248829,leather:3359061,skin:988970,accentGlow:3718648,armorMat:"ice"};case"dragoon":case"dragoon_boss":return{armor:a==="dragoon_boss"?10105874:165063,armorDark:a==="dragoon_boss"?4396039:805486,trim:16096779,cloth:1976635,cape:a==="dragoon_boss"?14427686:12456508,leather:7421714,skin:15120540,accentGlow:a==="dragoon_boss"?16486972:3718648,armorMat:"steel"};case"sniper":return{armor:t?4153874:1409085,armorDark:1332013,trim:11817737,cloth:t?3560212:1467700,cape:t?4153874:1467700,leather:7877903,skin:15120540,accentGlow:10741301,armorMat:"leather"};case"white_mystic":return{armor:10399426,armorDark:8228515,trim:t?8266446:12131356,cloth:10399426,cape:9083824,leather:9584654,skin:15120540,accentGlow:16638023,armorMat:"cloth"};case"ninja":return{armor:1579035,armorDark:592139,trim:t?9647082:14427686,cloth:2565930,cape:t?8266446:14427686,leather:2565930,skin:15120540,accentGlow:12616956,armorMat:"cloth"};case"golem_enemy":return{armor:8246268,armorDark:3718648,trim:4674921,cloth:4674921,cape:3359061,leather:4674921,skin:6583435,accentGlow:3718648,armorMat:"ice"};case"skeleton_enemy":return{armor:13358561,armorDark:9741240,trim:4674921,cloth:1976635,cape:3359061,leather:3359061,skin:13751771,accentGlow:11032055,armorMat:"stone"};case"lich_boss":return{armor:3868516,armorDark:1973067,trim:10741301,cloth:5774471,cape:3018853,leather:1841431,skin:13358561,accentGlow:8702998,armorMat:"cloth"};default:return{armor:2696484,armorDark:1841431,trim:16096779,cloth:8330525,cape:10033947,leather:4524554,skin:8330525,accentGlow:16733440,armorMat:"stone"}}}function Mx(a,e,t=!1){const i=a==="belias_boss",n=i?.072:t?.054:.048,s=xx(a,e),r=new Je,o=new Je;r.add(o);const l=i?1.05:.48,c=new Ie(new ui(l*2.15,l*2.15),kd());c.rotation.x=-Math.PI/2,c.position.y=.014,r.add(c);const h=e==="ally"?3718648:t?16096779:16007006,d=new Ie(new ni(l*.84,l,32),new pt({color:h,side:ft,transparent:!0,opacity:.78,depthWrite:!1}));d.rotation.x=-Math.PI/2,d.position.y=.02,r.add(d);const u=new Je;u.position.y=8.5*n,o.add(u);const f=D=>{const K=new di,V=D===-1?-1:0,j=D===-1?1:2;a==="skeleton_enemy"?(K.box(0,-7,0,0,0,0,s.skin,"stone"),K.box(0,-8,0,0,-8,2,s.armorDark,"stone")):(K.box(V,-5,-1,j,0,1,s.cloth,"cloth"),K.box(V,-6,-1,j,-4,2,s.armorDark,s.armorMat),K.box(V,-8,-1,j,-7,3,s.leather,"leather"),K.dot(D===-1?0:1,-4,2,s.trim,"gold"));const q=new Je;return q.position.set(D*2.2*n,0,0),q.add(Ht(K.list,n)),q},p=f(-1),v=f(1);u.add(p,v);const g=new Je;g.position.y=9*n,o.add(g);const m=new di;if(i)m.box(-6,0,-4,6,12,4,2696484,"stone"),m.box(-5,2,4,5,10,5,4524554,"stone"),m.box(-1,2,5,1,9,5,16733440,"emissive"),m.box(-4,5,5,-2,6,5,16739072,"emissive"),m.box(2,5,5,4,6,5,16739072,"emissive"),m.box(-10,8,-4,-6,13,4,1841431,"steel"),m.box(6,8,-4,10,13,4,1841431,"steel"),m.box(-9,13,-1,-8,16,1,16096779,"gold"),m.box(8,13,-1,9,16,1,16096779,"gold"),m.box(-11,6,-6,-7,17,-4,4524554,"stone"),m.box(7,6,-6,11,17,-4,4524554,"stone"),m.box(-12,12,-6,-10,19,-5,16733440,"emissive"),m.box(10,12,-6,12,19,-5,16733440,"emissive"),m.box(-6,0,-4,6,2,5,16096779,"gold");else if(a==="skeleton_enemy"){m.box(-3,0,-1,3,9,1,1976635,"cloth");for(let D=2;D<=8;D+=2)m.box(-4,D,-2,4,D,2,s.skin,"stone");m.box(-4,0,-2,4,1,2,s.armorDark,"steel")}else m.box(-4,0,-3,4,9,3,s.cloth,"cloth"),m.box(-4,2,-3,4,9,3,s.armor,s.armorMat),m.box(-4,0,-3,4,1,3,s.leather,"leather"),m.box(-1,0,3,1,1,4,s.trim,"gold"),m.box(-7,7,-3,-4,10,3,s.armor,s.armorMat),m.box(4,7,-3,7,10,3,s.armor,s.armorMat),m.box(-7,9,-2,-5,11,2,s.trim,"gold"),m.box(5,9,-2,7,11,2,s.trim,"gold"),a==="holy_knight"||a==="dark_knight_boss"?(m.box(-2,3,3,2,8,4,s.trim,"gold"),m.box(-1,4,4,1,7,4,s.cloth,"cloth"),m.dot(0,6,4,s.accentGlow,"emissive")):a==="dragoon"||a==="dragoon_boss"?(m.box(-8,10,-2,-6,13,1,s.trim,"gold"),m.box(6,10,-2,8,13,1,s.trim,"gold"),m.box(-2,3,3,2,8,3,s.armorDark,"steel"),m.dot(0,6,4,s.accentGlow,"emissive")):a==="sniper"?(m.box(-3,2,3,-2,4,3,s.leather,"leather"),m.box(-1,4,3,0,6,3,s.leather,"leather"),m.box(1,6,3,2,8,3,s.leather,"leather"),m.box(1,2,-5,3,8,-3,s.leather,"leather"),m.dot(1,9,-4,16708551,"cloth"),m.dot(3,9,-4,16708551,"cloth"),m.dot(2,10,-5,16007006,"cloth")):a==="white_mystic"?(m.box(-2,1,3,2,8,3,s.trim,"cloth"),m.box(-1,2,4,1,8,4,14251782,"gold")):a==="ninja"?(m.box(-3,2,-4,-2,8,-4,592139,"leather"),m.box(2,2,-4,3,8,-4,592139,"leather"),m.box(-2,3,3,2,7,3,s.trim,"cloth")):(a==="black_mage"||a==="archmage_boss")&&(m.box(-4,-3,-3,4,0,3,s.cloth,"cloth"),m.box(-4,-3,3,4,-2,3,s.trim,"gold"));g.add(Ht(m.list,n));const x=new Je;x.position.set(0,9.2*n,-3.5*n),g.add(x);let S;if(a==="ninja"){const D=new di;D.box(-3,-1,0,3,1,1,s.cape,"cloth"),D.box(0,-7,-2,2,-1,0,s.cape,"cloth"),D.box(1,-13,-4,3,-7,-2,s.trim,"cloth"),S=new Je,S.add(Ht(D.list,n)),x.add(S)}else if(a!=="golem_enemy"&&!i){const D=new di,K=a==="sniper"?-10:-13;D.box(-4,-5,-1,4,0,0,s.cape,"cloth"),D.box(-5,K+2,-2,5,-5,-1,s.cape,"cloth"),D.box(-5,K,-2,5,K+1,-1,s.trim,"gold"),x.add(Ht(D.list,n))}const M=new Je;M.position.set(0,(i?13:10.5)*n,0),g.add(M);const y=new di;if(a==="black_mage"||a==="archmage_boss"){y.box(-3,0,-3,3,6,3,592139,"cloth"),y.box(-2,2,3,-1,3,4,s.accentGlow,"emissive"),y.box(1,2,3,2,3,4,s.accentGlow,"emissive");const D=a==="archmage_boss"?165063:11817737,K=a==="archmage_boss"?"ice":"cloth";y.box(-6,6,-6,6,6,6,D,K),y.box(-4,7,-4,4,8,4,1973067,"cloth"),y.box(-1,7,4,1,8,5,16096779,"gold"),y.box(-3,9,-3,3,11,3,D,K),y.box(-2,12,-4,2,14,1,D,K),y.box(-1,15,-6,1,16,-2,D,K)}else a==="holy_knight"||a==="dark_knight_boss"?(y.box(-3,0,-3,3,7,3,s.armor,"steel"),y.box(-2,3,3,2,4,3,988970,"steel"),y.box(0,1,3,0,5,3,988970,"steel"),a==="dark_knight_boss"?(y.dot(-1,3,4,16007006,"emissive"),y.dot(1,3,4,16007006,"emissive"),y.box(-5,6,-1,-4,11,1,s.trim,"gold"),y.box(4,6,-1,5,11,1,s.trim,"gold")):(y.box(-1,7,-3,1,9,2,s.trim,"gold"),y.box(0,9,-4,0,11,0,s.cloth,"cloth"),y.box(-4,5,-1,-4,9,1,14870768,"steel"),y.box(4,5,-1,4,9,1,14870768,"steel"))):a==="dragoon"||a==="dragoon_boss"?(y.box(-3,0,-3,3,7,3,s.armor,"steel"),y.box(-2,1,3,2,3,3,s.skin,"cloth"),y.box(-2,5,2,2,7,6,s.armor,"steel"),y.box(-4,7,-3,-3,11,1,s.trim,"gold"),y.box(3,7,-3,4,11,1,s.trim,"gold"),y.box(-5,11,-5,-4,13,-2,s.trim,"gold"),y.box(4,11,-5,5,13,-2,s.trim,"gold"),y.dot(0,6,6,s.accentGlow,"emissive")):a==="sniper"?(y.box(-3,0,-2,3,5,3,s.skin,"cloth"),y.box(-3,0,2,3,2,3,1332013,"cloth"),y.dot(-1,3,3,988970,"cloth"),y.dot(1,3,3,988970,"cloth"),y.box(-4,5,-4,4,8,4,s.armor,"cloth"),y.box(-4,0,-4,4,6,-1,s.armor,"cloth"),y.box(3,7,0,4,11,2,16707722,"cloth")):a==="white_mystic"?(y.box(-3,0,-2,3,5,3,s.skin,"cloth"),y.dot(-1,3,3,1976635,"cloth"),y.dot(1,3,3,1976635,"cloth"),y.box(-4,5,-4,4,8,4,s.cloth,"cloth"),y.box(-4,0,-4,4,6,-1,s.cloth,"cloth"),y.box(-3,6,4,3,7,4,s.trim,"cloth"),y.box(-1,8,3,1,9,4,s.trim,"cloth")):a==="ninja"?(y.box(-3,0,-3,3,6,3,1579035,"cloth"),y.box(-2,3,3,2,4,3,s.skin,"cloth"),y.dot(-1,3,4,592139,"cloth"),y.dot(1,3,4,592139,"cloth"),y.box(-4,5,-3,4,6,4,s.trim,"cloth"),y.box(-3,7,-3,3,8,2,592139,"cloth")):a==="belias_boss"?(y.box(-4,0,-4,4,8,4,8330525,"stone"),y.box(-2,4,4,-1,5,5,16707722,"emissive"),y.box(1,4,4,2,5,5,16707722,"emissive"),y.box(-7,6,0,-4,10,2,1841431,"stone"),y.box(-9,9,-3,-7,13,0,16733440,"emissive"),y.box(4,6,0,7,10,2,1841431,"stone"),y.box(7,9,-3,9,13,0,16733440,"emissive"),y.box(-3,8,-2,-2,13,0,1841431,"steel"),y.box(2,8,-2,3,13,0,1841431,"steel")):a==="lich_boss"?(y.box(-3,0,-3,3,6,3,13358561,"stone"),y.dot(-1,3,4,8702998,"emissive"),y.dot(1,3,4,8702998,"emissive"),y.box(-4,6,-4,4,9,4,5774471,"cloth"),y.dot(0,9,4,10741301,"emissive")):(y.box(-3,0,-3,3,6,3,s.armor,s.armorMat),y.dot(-1,3,4,s.accentGlow,"emissive"),y.dot(1,3,4,s.accentGlow,"emissive"));M.add(Ht(y.list,n));const w=new Je;w.position.set((i?-9:-6.5)*n,(i?10:8.5)*n,0),g.add(w);const _=new di;_.box(-2,-6,-1,0,0,1,s.armor,s.armorMat),_.box(-2,-7,-1,0,-7,1,s.skin,"cloth"),i&&_.box(-2,-9,0,0,-8,2,16733440,"emissive"),w.add(Ht(_.list,n));const b=new Je;b.position.set(-2.2*n,-5.5*n,2.2*n),w.add(b);let P;if(a==="holy_knight"||a==="dark_knight_boss"||a==="skeleton_enemy"){const D=new di;D.box(-2,-5,0,2,5,1,s.trim,"gold"),D.box(-3,-3,1,3,3,1,s.cloth,"cloth"),D.dot(0,0,2,s.accentGlow,"emissive"),b.add(Ht(D.list,n))}else if(a==="ninja"){const D=new di;D.box(0,-1,-2,0,0,1,s.leather,"leather"),D.box(-1,-1,-3,1,1,-2,s.trim,"gold"),D.box(0,0,-12,0,1,-3,14870768,"steel"),D.dot(0,1,-12,s.accentGlow,"emissive"),b.add(Ht(D.list,n))}else if(a==="white_mystic"||a==="lich_boss"){const D=new di;D.box(-3,-2,0,-1,2,1,a==="lich_boss"?3868516:10033947,"leather"),D.box(1,-2,0,3,2,1,a==="lich_boss"?3868516:10033947,"leather"),D.box(-2,-1,1,-1,2,2,14870768,"cloth"),D.box(1,-1,1,2,2,2,14870768,"cloth"),D.dot(0,1,2,s.accentGlow,"emissive"),P=new Je,P.position.set(-4.5*n,4*n,4.5*n),P.add(Ht(D.list,n)),g.add(P)}const A=new Je;A.position.set((i?9:6.5)*n,(i?10:8.5)*n,0),g.add(A);const I=new di;I.box(0,-6,-1,2,0,1,s.armor,s.armorMat),I.box(0,-7,-1,2,-7,1,s.skin,"cloth"),i&&I.box(0,-9,0,2,-8,2,16733440,"emissive"),A.add(Ht(I.list,n));const F=new Je;F.position.set(1*n,-6.5*n,2*n),A.add(F);let k;const R=new di;if(a==="holy_knight"||a==="dark_knight_boss"||a==="skeleton_enemy")R.box(0,-3,0,0,0,1,s.leather,"leather"),R.box(-3,1,0,3,2,1,s.trim,"gold"),R.box(0,2,0,0,16,1,14870768,"steel"),R.box(0,5,1,0,13,1,s.accentGlow,"emissive");else if(a==="black_mage"||a==="white_mystic"||a==="archmage_boss"||a==="lich_boss")R.box(0,-6,0,0,15,0,5722958,"leather"),R.box(-2,15,-2,2,16,2,s.trim,"gold"),a==="white_mystic"?(R.box(-2,17,0,-2,20,0,s.trim,"gold"),R.box(2,17,0,2,20,0,s.trim,"gold"),R.box(-1,21,0,1,21,0,s.trim,"gold"),R.dot(0,19,0,s.accentGlow,"emissive")):R.box(-1,18,-1,1,20,1,s.accentGlow,"emissive");else if(a==="dragoon"||a==="dragoon_boss")R.box(0,-9,0,0,18,0,7877903,"leather"),R.box(-1,17,-1,1,18,1,14427686,"cloth"),R.box(-2,19,0,2,22,0,s.trim,"gold"),R.box(-1,21,0,1,27,0,14870768,"steel"),R.dot(0,28,0,s.accentGlow,"emissive");else if(a==="sniper"){R.box(0,-1,2,0,8,3,7877903,"leather"),R.box(0,8,0,0,12,2,9584654,"leather"),R.box(0,-6,0,0,-1,2,9584654,"leather"),R.dot(0,12,-1,16096779,"gold"),R.dot(0,-6,-1,16096779,"gold");const D=new di;D.box(0,-5,-1,0,11,-1,14870768,"cloth"),D.box(0,3,-1,0,3,8,10741301,"emissive"),k=new Je,k.add(Ht(D.list,n)),F.add(k)}else a==="ninja"?(R.box(0,-1,0,0,1,1,s.leather,"leather"),R.box(-1,1,0,1,2,1,s.trim,"gold"),R.box(0,2,0,0,13,1,14870768,"steel"),R.dot(0,14,1,s.accentGlow,"emissive")):a==="belias_boss"&&(R.box(-1,-4,0,1,1,1,1841431,"leather"),R.box(-4,1,-1,4,3,1,16096779,"gold"),R.box(-1,3,0,1,20,1,1841431,"steel"),R.box(0,4,1,0,19,1,16733440,"emissive"));F.add(Ht(R.list,n));let H;if(a==="black_mage"||a==="archmage_boss"||i){H=new Je,H.position.y=(i?26:15)*n;const D=i?5:3,K=i?.95:.52,V=i?16733440:a==="archmage_boss"?3718648:16436245;for(let j=0;j<D;j++){const q=j/D*Math.PI*2,re=new di;re.box(0,0,0,1,1,1,V,"emissive");const Fe=Ht(re.list,n*.85);Fe.position.set(Math.cos(q)*K,0,Math.sin(q)*K),H.add(Fe)}o.add(H)}const z=(i?38:29)*n;return{root:r,bodyPivot:o,headPivot:M,torsoPivot:g,leftArmPivot:w,rightArmPivot:A,weaponPivot:F,shieldPivot:b,capePivot:x,legsPivot:u,leftLegPivot:p,rightLegPivot:v,grimoirePivot:P,orbitingRunesPivot:H,bowStringPivot:k,scarfPivot:S,shadowDisc:c,teamRing:d,materials:[],heightWorld:z,voxelSize:n}}function Sx(a,e,t,i=0){if(a.bodyPivot.position.set(0,0,0),a.bodyPivot.rotation.set(0,0,0),a.bodyPivot.scale.set(1,1,1),a.torsoPivot.rotation.set(0,0,0),a.headPivot.rotation.set(0,0,0),a.leftArmPivot.rotation.set(0,0,0),a.rightArmPivot.rotation.set(0,0,0),a.weaponPivot.rotation.set(.32,0,0),a.shieldPivot.rotation.set(0,0,0),a.leftLegPivot.rotation.set(0,0,0),a.rightLegPivot.rotation.set(0,0,0),a.capePivot.rotation.x=.16+Math.sin(t*3-.6)*.09,a.scarfPivot&&(a.scarfPivot.rotation.y=Math.sin(t*4.2-.6)*.18),a.grimoirePivot&&(a.grimoirePivot.position.y=4*a.voxelSize+Math.sin(t*3.6)*.06,a.grimoirePivot.rotation.z=Math.sin(t*5)*.14),a.orbitingRunesPivot&&(a.orbitingRunesPivot.rotation.y=t*1.8,a.orbitingRunesPivot.position.y+=Math.sin(t*2.5)*.04),a.bowStringPivot&&(a.bowStringPivot.position.z=0),e==="dead"){a.bodyPivot.rotation.x=-Math.PI/2,a.bodyPivot.position.y=.16,a.teamRing.visible=!1;return}switch(a.teamRing.visible=!0,e){case"idle":{const n=Math.sin(t*3.2)*.022;a.torsoPivot.position.y=9*a.voxelSize+n,a.rightArmPivot.rotation.x=-.22+Math.sin(t*2.1)*.06,a.leftArmPivot.rotation.x=-.14-Math.sin(t*2.1)*.06;break}case"walk":{const n=Math.sin(t*13)*.72;a.leftLegPivot.rotation.x=n,a.rightLegPivot.rotation.x=-n,a.leftArmPivot.rotation.x=-n*.75,a.rightArmPivot.rotation.x=n*.75,a.torsoPivot.rotation.x=.12,a.bodyPivot.position.y=Math.abs(Math.sin(t*13))*.095,a.capePivot.rotation.x=.48+Math.sin(t*13-.6)*.18;break}case"slash":{const n=Math.min(1,i);if(n<.28){const s=n/.28;a.torsoPivot.rotation.y=.45*s,a.rightArmPivot.rotation.x=-1.65*s}else if(n<.6){const s=(n-.28)/.32;a.torsoPivot.rotation.y=.45-1.15*s,a.rightArmPivot.rotation.x=-1.65+2.85*s,a.weaponPivot.rotation.x=.95}else{const s=(n-.6)/.4;a.torsoPivot.rotation.y=-.7*(1-s),a.rightArmPivot.rotation.x=1.2*(1-s)}break}case"dual":{const n=Math.min(1,i),s=Math.sin(n*Math.PI*2)*1.45;a.rightArmPivot.rotation.x=-.75+s,a.leftArmPivot.rotation.x=-.75-s,a.torsoPivot.rotation.y=Math.sin(n*Math.PI*2)*.55;break}case"bow":{const n=Math.min(1,i),s=n<.6?n/.6:1-(n-.6)/.4;a.torsoPivot.rotation.y=-.42,a.rightArmPivot.rotation.x=-1.45,a.leftArmPivot.rotation.x=-1.3,a.leftArmPivot.rotation.y=.38,a.bowStringPivot&&(a.bowStringPivot.position.z=-s*2.5*a.voxelSize);break}case"cast":{const n=Math.sin(t*11)*.16;a.rightArmPivot.rotation.x=-2.2+n,a.leftArmPivot.rotation.x=-1.8-n,a.bodyPivot.position.y=.1+Math.sin(t*7)*.04,a.capePivot.rotation.x=.62;break}case"jump_up":{a.torsoPivot.rotation.x=.28,a.rightArmPivot.rotation.x=-2.5,a.bodyPivot.scale.set(.88,1.15,.88);break}case"jump_down":{a.torsoPivot.rotation.x=-.35,a.rightArmPivot.rotation.x=.75,a.weaponPivot.rotation.x=1.45,a.bodyPivot.scale.set(1.12,.88,1.12);break}case"hit":{a.torsoPivot.rotation.x=-.48,a.headPivot.rotation.x=-.32,a.bodyPivot.position.z=-.14;break}case"block":{a.leftArmPivot.rotation.x=-1.15,a.leftArmPivot.rotation.y=.55,a.shieldPivot.rotation.y=-.5;break}}}const ke=1.5,Li=.42;function Ot(a,e,t,i,n){const s=(a-(i-1)/2)*ke,r=(e-(n-1)/2)*ke,o=t*Li;return new U(s,o,r)}function yx(a,e){switch(a){case"grass":return{topA:4153874,topB:5078031,side:7029795,deep:3880242};case"cobble":return e==="arctic"?{topA:6583435,topB:8689325,side:3359061,deep:1976635}:e==="canyon"?{topA:9198140,topB:10576452,side:7028262,deep:4401176}:{topA:5722958,topB:7038561,side:4472892,deep:2696484};case"stone":return e==="volcanic"?{topA:3617842,topB:4472892,side:2696484,deep:1841431}:e==="canyon"?{topA:10112562,topB:11820092,side:8141347,deep:4528643}:{topA:4674921,topB:6583435,side:3359061,deep:1976635};case"wood":return{topA:8736014,topB:10576391,side:7421714,deep:4528643};case"snow":return{topA:9741240,topB:12109012,side:4674921,deep:3359061};case"ice":return{topA:3718648,topB:8246268,side:165063,deep:805486};case"swamp":return{topA:3560212,topB:4153874,side:3876884,deep:1841431};case"obsidian":return{topA:2236968,topB:3421245,side:1579035,deep:592139};case"carpet":return{topA:8917815,topB:10424889,side:5244708,deep:2696484};case"metal":return{topA:6583435,topB:9741240,side:3359061,deep:1976635};case"water":return{topA:165063,topB:959977,side:481669,deep:805486};case"lava":return{topA:14427686,topB:16347926,side:4524554,deep:1841431}}}function bh(a,e){const t=Math.sin(a*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Zr(a){const e=a==="lava"?1:a==="swamp_water"?2:a==="canyon_river"?3:0;return new Tt({uniforms:{uTime:{value:0},uMode:{value:e}},vertexShader:`
      precision highp float;
      uniform float uTime;
      uniform float uMode;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vWave;

      void main() {
        vUv = uv;
        vec3 pos = position;
        vec4 localPos = vec4(pos, 1.0);
        #ifdef USE_INSTANCING
          localPos = instanceMatrix * localPos;
        #endif
        vec4 wp = modelMatrix * localPos;
        float speed = uMode == 1.0 ? 1.4 : (uMode == 3.0 ? 4.4 : 2.5);
        float amp = uMode == 1.0 ? 0.048 : 0.062;
        float flow = uMode == 3.0 ? wp.z * 2.8 - uTime * speed : wp.x * 2.2 + uTime * speed;
        float wave = sin(flow) * cos(wp.z * 2.1 - uTime * speed * 0.7) * amp;
        localPos.y += wave;
        vWave = wave;
        vec4 finalWp = modelMatrix * localPos;
        vWorldPos = finalWp.xyz;
        gl_Position = projectionMatrix * viewMatrix * finalWp;
      }
    `,fragmentShader:`
      precision highp float;
      uniform float uTime;
      uniform float uMode;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vWave;

      void main() {
        float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
        float edgeFoam = 1.0 - smoothstep(0.015, 0.18, edgeDist);

        if (uMode == 1.0) {
          float n1 = sin(vWorldPos.x * 3.1 + uTime * 1.15) * cos(vWorldPos.z * 2.7 - uTime * 0.85);
          float n2 = sin((vWorldPos.x - vWorldPos.z) * 4.4 - uTime * 1.55);
          float n3 = cos(vWorldPos.x * 6.3 + vWorldPos.z * 5.8 + uTime * 0.9);
          float magma = clamp(0.48 + 0.32 * n1 + 0.24 * n2 + 0.14 * n3 + vWave * 4.0, 0.0, 1.0);
          vec3 crust = vec3(0.11, 0.025, 0.02);
          vec3 orange = vec3(1.25, 0.34, 0.04);
          vec3 bright = vec3(2.20, 1.18, 0.28);
          vec3 col = mix(crust, orange, smoothstep(0.28, 0.66, magma));
          col = mix(col, bright, smoothstep(0.66, 0.95, magma));
          col += vec3(1.15, 0.45, 0.10) * edgeFoam * 0.22;
          gl_FragColor = vec4(col, 1.0);
        } else if (uMode == 2.0) {
          float murk = sin(vWorldPos.x * 2.8 + uTime * 1.35) * cos(vWorldPos.z * 3.2 - uTime * 1.05);
          float swirl = sin(vWorldPos.x * 5.2 - vWorldPos.z * 4.6 + uTime * 1.8);
          vec3 deepSwamp = vec3(0.06, 0.18, 0.11);
          vec3 toxic = vec3(0.22, 0.48, 0.16);
          vec3 ether = vec3(0.55, 0.26, 0.78);
          vec3 col = mix(deepSwamp, toxic, 0.5 + 0.5 * murk);
          col = mix(col, ether, smoothstep(0.52, 0.94, swirl) * 0.55);
          col += vec3(0.48, 0.88, 0.38) * edgeFoam * 0.18;
          gl_FragColor = vec4(col, 0.92);
        } else {
          float flow = uMode == 3.0 ? (vWorldPos.z * 3.8 - uTime * 4.6) : (vWorldPos.x * 4.0 + uTime * 2.3);
          float ripple = sin(flow) * cos(vWorldPos.x * 3.2 - uTime * 2.0);
          float caustic = smoothstep(0.35, 0.92, sin(vWorldPos.x * 5.4 + uTime * 1.9) * sin(vWorldPos.z * 5.1 - uTime * 2.1));
          float spec = smoothstep(0.45, 0.92, ripple + vWave * 8.0);
          vec3 deepWater = vec3(0.03, 0.22, 0.42);
          vec3 shallowWater = uMode == 3.0 ? vec3(0.11, 0.58, 0.86) : vec3(0.07, 0.48, 0.75);
          vec3 col = mix(deepWater, shallowWater, 0.5 + 0.5 * ripple);
          col += vec3(0.35, 0.78, 0.96) * caustic * 0.28;
          col += vec3(0.75, 0.95, 1.05) * spec * (uMode == 3.0 ? 0.56 : 0.38);
          col = mix(col, vec3(0.92, 0.98, 1.05), edgeFoam * (uMode == 3.0 ? 0.28 : 0.24));
          gl_FragColor = vec4(col, 0.86);
        }
      }
    `,transparent:e!==1})}function bx(a,e){const t=[],i=(n,s,r,o,l,c,h,d)=>{for(let u=n;u<=o;u++)for(let f=s;f<=l;f++)for(let p=r;p<=c;p++)t.push({x:u,y:f,z:p,color:h,emissive:d==="emissive",mat:d})};switch(a){case"tree":{e==="swamp"?(i(-2,0,-2,2,1,2,3878703,"leather"),i(-1,2,-1,1,7,1,4472892,"leather"),i(-4,7,-1,-1,9,1,4472892,"leather"),i(1,8,-2,4,10,1,4472892,"leather"),i(-4,5,0,-4,6,0,5078031,"cloth"),i(4,6,0,4,7,0,5078031,"cloth")):(i(-3,0,-1,3,1,1,6044193,"leather"),i(-1,0,-3,1,1,3,6044193,"leather"),i(-1,2,-1,1,7,1,7877903,"leather"),i(-5,7,-5,5,10,5,1467700,"cloth"),i(-4,11,-4,4,13,4,1409085,"cloth"),i(-2,14,-2,2,16,2,2278750,"cloth"));break}case"pine":{i(-1,0,-1,1,4,1,6044193,"leather"),i(-5,4,-5,5,6,5,1332013,"cloth"),i(-4,7,-4,4,9,4,1467700,"cloth"),i(-3,10,-3,3,12,3,1409085,"cloth"),i(-2,13,-2,2,14,2,12109012,"cloth"),i(-1,15,-1,1,16,1,13358561,"cloth");break}case"pillar":{const n=e==="volcanic"?2565930:5722958,s=e==="volcanic"?16096779:7893356,r=e==="volcanic"?"gold":"stone";i(-2,0,-2,2,2,2,n,"stone"),i(-1,3,-1,1,13,1,n,"stone"),i(-2,14,-2,2,15,2,s,r),e==="forest"&&i(-2,4,2,-1,6,2,5078031,"cloth");break}case"ruin_wall":{e==="forest"?(i(-5,0,-2,-3,11,2,5722958,"stone"),i(3,0,-2,5,8,2,5722958,"stone"),i(-4,11,-2,2,13,2,7038561,"stone"),i(-4,4,2,-2,7,2,5078031,"cloth")):e==="arctic"?(i(-5,0,-2,5,9,2,6583435,"stone"),i(-5,10,-2,-3,12,2,9741240,"stone"),i(-1,10,-2,1,12,2,9741240,"stone"),i(3,10,-2,5,12,2,9741240,"stone"),i(-5,13,-2,-3,13,2,12109012,"cloth")):(i(-5,0,-2,5,8,2,4472892,"stone"),i(-5,9,-2,-2,11,2,5722958,"stone"),i(2,9,-2,5,11,2,5722958,"stone"));break}case"torch":case"brazier":{const n=e==="swamp"?3718648:16347926,s=e==="swamp"?10875900:16707722;i(-2,0,-2,2,2,2,2696484,"steel"),i(-1,3,-1,1,7,1,4144966,"steel"),i(-2,7,-2,2,8,2,7877903,"gold"),i(-1,9,-1,1,11,1,n,"emissive"),i(0,12,0,0,14,0,s,"emissive");break}case"crystal":{const n=e==="volcanic"?16007006:e==="swamp"?11032055:3718648,s=e==="arctic";i(-2,0,-2,2,2,2,3359061,"stone"),i(-2,3,-1,0,9,1,n,s?"ice":"emissive"),i(0,3,-2,2,13,1,n,s?"ice":"emissive"),i(0,14,-1,1,16,0,14742270,"emissive");break}case"statue":{i(-2,0,-2,2,2,2,4674921,"stone"),i(-2,3,-1,2,9,1,6583435,"stone"),i(-1,10,-1,1,13,1,9741240,"stone"),i(-3,5,1,3,7,2,4674921,"stone");break}case"rock":{const n=e==="canyon"?10112562:5722958,s=e==="canyon"?11820092:7893356;i(-3,0,-3,3,2,3,n,"stone"),i(-2,3,-2,2,4,2,s,"stone");break}case"banner":{i(0,0,0,0,16,0,9741240,"steel"),i(-3,14,0,3,14,0,16096779,"gold"),i(-2,7,1,2,13,1,e==="volcanic"?10033947:1920728,"cloth"),i(-1,9,2,1,11,2,16498468,"emissive");break}}return t}function Th(a){const e=[];for(let n=-3;n<=3;n++)for(let s=0;s<=3;s++)for(let r=-2;r<=2;r++){const o=n===-3||n===3||s===3&&r===2;e.push({x:n,y:s,z:r,color:o?16096779:7877903,mat:o?"gold":"leather"})}if(!a){for(let n=-3;n<=3;n++)for(let s=4;s<=5;s++)for(let r=-2;r<=2;r++){const o=n===-3||n===3||s===4&&r===2;e.push({x:n,y:s,z:r,color:o?16096779:9584654,mat:o?"gold":"leather"})}e.push({x:0,y:3,z:3,color:16707722,emissive:!0,mat:"emissive"})}return Ht(e,.085)}function Tx(a,e){const t=[{dc:0,dr:-1,yaw:0},{dc:0,dr:1,yaw:Math.PI},{dc:-1,dr:0,yaw:Math.PI/2},{dc:1,dr:0,yaw:-Math.PI/2}];let i=null,n=0,s=null,r=0;for(const o of t){const l=e.get(`${a.col+o.dc},${a.row+o.dr}`);if(!l)continue;const c=l.height-a.height;c>n&&(n=c,i=o.yaw),c<r&&(r=c,s=o.yaw+Math.PI)}return i??s??0}function wh(a,e){if(a==="rock"&&e==="canyon")return 15180419;if(a==="rock"&&e==="arctic")return 14412542;if(a==="pillar"&&e==="volcanic")return 7038064;if(a==="banner"&&e==="volcanic")return 16757671;if(a==="crystal"&&e==="volcanic")return 16740490;if(a==="crystal"&&e==="swamp")return 14202110}class wx{group=new Je;tileHitMeshes=[];chestMeshes=new Map;liquidMaterials=[];floatingCrystals=[];flickerEmissiveMaterials=[];clonedMaterialsToDispose=[];proceduralGeomsToDispose=[];ambientMesh=null;ambientMotes=[];maxAmbient=140;densityRatio=1;dummy=new ct;stage;assets;constructor(e,t,i){this.stage=e,this.assets=i,this.buildDioramaGeometry(e,t),this.buildBiomeArchitecture(e),this.buildAmbientParticles(e)}emitGLTFInstancedBatch(e,t,i=!1){if(t.length===0)return;e.scene.updateMatrixWorld(!0);const n=[];e.scene.traverse(o=>{o.isMesh&&n.push(o)});const s=new ze,r=new Me;for(const o of n){const c=(Array.isArray(o.material)?o.material:[o.material])[0];if(!c)continue;const h=c.clone(),u=(h.name||"").toLowerCase().startsWith("emissive");if(u&&h.isMeshStandardMaterial){const v=h;v.emissiveIntensity=Math.max(v.emissiveIntensity||1,2.2),i&&this.flickerEmissiveMaterials.push(v)}this.clonedMaterialsToDispose.push(h),o.geometry.userData.sharedGLTF=!0;const f=new Jn(o.geometry,h,t.length);f.castShadow=!u,f.receiveShadow=!0;let p=!1;for(let v=0;v<t.length;v++)s.multiplyMatrices(t[v].matrix,o.matrixWorld),f.setMatrixAt(v,s),t[v].tintHex!==void 0&&(r.setHex(t[v].tintHex),f.setColorAt(v,r),p=!0);f.instanceMatrix.needsUpdate=!0,p&&f.instanceColor&&(f.instanceColor.needsUpdate=!0),this.group.add(f)}}buildDioramaGeometry(e,t){const i=[],n=[],s=[],r=[],o=[],l=[],c=[],h=[],d=[],u=[],f=new Me,p=new Kt(1,1,1),v=p.attributes.position,g=p.attributes.normal,m=p.attributes.uv,x=p.index,S=(L,G,se,le,ie,be,Ue,he=1,ye=!1)=>{const Ce=ye?l:i,we=ye?c:n,Qe=ye?h:s,We=ye?d:r,yt=ye?u:o,rt=Ce.length/3;f.setHex(Ue);for(let ot=0;ot<v.count;ot++){const vt=v.getX(ot)*le+L,Dt=v.getY(ot)*ie+G,Nt=v.getZ(ot)*be+se,At=g.getY(ot);Ce.push(vt,Dt,Nt),we.push(g.getX(ot),At,g.getZ(ot)),We.push(m.getX(ot),m.getY(ot));const O=At>.5?he:At<-.5?.52:.8;Qe.push(f.r*O,f.g*O,f.b*O)}for(let ot=0;ot<x.count;ot++)yt.push(rt+x.getX(ot))},M=new Kt(ke*.96,.14,ke*.96);this.proceduralGeomsToDispose.push(M);const y=new pt({visible:!1});this.clonedMaterialsToDispose.push(y);const w=[],_=[],b=-1.6,P=e.cols*ke,A=e.rows*ke,I=e.biome==="volcanic"?1579035:e.biome==="canyon"?4528643:2696484,F=e.biome==="arctic"?3359061:e.biome==="canyon"?8141347:4472892;S(0,-.55,0,P+.45,.9,A+.45,F),S(0,-1.25,0,P-.5,.7,A-.5,I);for(let L=0;L<e.cols;L+=2)for(let G=0;G<e.rows;G+=2){const se=bh(L,G);if(se>.32){const le=Ot(L,G,0,e.cols,e.rows),ie=.65+se*1.75;S(le.x,b-ie*.5,le.z,ke*.92,ie,ke*.92,I)}}const k=Dl(e.biome),R=this.assets?.terrain.get(k.primary)??this.assets?.terrain.get("column_stone"),H=this.assets?.terrain.get(k.earth)??this.assets?.terrain.get("column_earth")??R,z=new Map,D=new Map,K=(L,G,se)=>{let le=z.get(L);le||(le={gltf:G,items:[]},z.set(L,le)),le.items.push(se)},V=(L,G,se,le)=>{let ie=D.get(L);ie||(ie={gltf:G,items:[],flicker:le},D.set(L,ie)),ie.items.push(se)},j=[],q=new ct;for(const L of t.values()){const G=Ot(L.col,L.row,L.height,e.cols,e.rows),se=yx(L.surface,e.biome),le=bh(L.col,L.row),ie=le>.5?se.topA:se.topB;if(L.surface==="water")w.push(L),S(G.x,(L.height-1)*Li*.5-.1,G.z,ke*.99,L.height*Li,ke*.99,se.deep);else if(L.surface==="lava")_.push(L),S(G.x,-.2,G.z,ke*.99,.35,ke*.99,1841431);else if(L.isBridge){const Ue=e.biome==="canyon"?"bridge_stone":"bridge_wood",he=this.assets?.terrain.get(Ue)??this.assets?.terrain.get("bridge_wood");if(he){if(q.position.set(G.x,G.y,G.z),q.rotation.set(0,e.biome==="canyon"?Math.PI/2:0,0),q.scale.set(1,1,1),q.updateMatrix(),K(Ue,he,{matrix:q.matrix.clone()}),(L.col+L.row)%2===0&&R){const ye=Math.max(.2,G.y-.24);q.position.set(G.x,G.y-.24,G.z),q.rotation.set(0,0,0),q.scale.set(.28,ye,.28),q.updateMatrix(),K("__pier",R,{matrix:q.matrix.clone()})}if(e.biome==="canyon"&&(L.row===4||L.row===7)){const ye=L.row===4?-1:1;S(G.x,G.y+.32,G.z+ye*ke*.42,.18,.64,.16,8141347)}}else{const ye=G.y-.14;if(S(G.x,ye,G.z,ke*.98,.28,ke*.98,ie,1.04),(L.col+L.row)%2===0&&S(G.x,ye*.5,G.z,.34,ye,.34,se.deep),e.biome==="canyon"&&(L.row===4||L.row===7)){const Ce=L.row===4?-1:1;S(G.x,G.y+.32,G.z+Ce*ke*.42,.18,.64,.16,8141347)}}}else if(L.isStair){const Ue=L.surface==="metal"?"stair_metal":"stair_stone",he=this.assets?.terrain.get(Ue)??this.assets?.terrain.get("stair_stone"),ye=L.height*Li,Ce=Math.max(.1,ye-Li);if(he){const we=Tx(L,t);q.position.set(G.x,G.y,G.z),q.rotation.set(0,we,0),q.scale.set(1,1,1),q.updateMatrix(),K(Ue,he,{matrix:q.matrix.clone()}),R&&Ce>.05?(q.position.set(G.x,Ce,G.z),q.rotation.set(0,0,0),q.scale.set(1,Ce+.12,1),q.updateMatrix(),K("__col_primary",R,{matrix:q.matrix.clone()})):S(G.x,Ce*.5,G.z,ke*.96,Ce,ke*.96,se.side)}else{S(G.x,Ce*.5,G.z,ke*.96,Ce,ke*.96,se.side);for(let we=0;we<3;we++){const Qe=Ce+(we+.5)/3*Li,We=ke*(.94-we*.24);S(G.x,Qe,G.z,We,Li/3,We,ie,1+we*.03)}}}else{const Ue=this.assets?.terrain.get(L.surface),he=L.surface==="grass"||L.surface==="swamp"?H:R,ye=L.height*Li,Ce=.22,we=Math.max(.1,ye-Ce);if(Ue){const Qe=L.surface==="cobble"||L.surface==="stone"||L.surface==="grass"?Math.floor(le*4)*(Math.PI/2):0;q.position.set(G.x,G.y,G.z),q.rotation.set(0,Qe,0),q.scale.set(1,1,1),q.updateMatrix();let We;if(L.surface==="cobble"&&e.biome==="canyon"?We=le>.5?14261112:13075554:L.surface==="stone"&&e.biome==="canyon"?We=le>.5?13924949:12412227:L.surface==="stone"&&e.biome==="volcanic"?We=7434618:le>.5&&(We=16054010),K(L.surface,Ue,{matrix:q.matrix.clone(),tintHex:We}),he){q.position.set(G.x,ye-.22,G.z),q.rotation.set(0,0,0),q.scale.set(1,Math.max(.15,we+.14),1),q.updateMatrix();const yt=L.surface==="grass"||L.surface==="swamp"?"__col_earth":"__col_primary";K(yt,he,{matrix:q.matrix.clone()})}else S(G.x,we*.5,G.z,ke*.95,we,ke*.95,se.side);L.surface==="grass"&&!L.prop&&le>.78&&j.push(G.clone())}else{const Qe=L.surface==="ice";S(G.x,we*.5,G.z,ke*.95,we,ke*.95,se.side,1,Qe),S(G.x,ye-Ce*.5,G.z,ke*.98,Ce,ke*.98,ie,1.04,Qe),L.surface==="grass"&&!L.prop&&le>.78&&j.push(G.clone())}}const be=new Ie(M,y);if(be.position.set(G.x,G.y+.02,G.z),be.userData={col:L.col,row:L.row,height:L.height},be.layers.set(1),this.group.add(be),this.tileHitMeshes.push(be),L.prop){const Ue=Ll(L.prop,e.biome),he=this.assets?.props.get(Ue)??this.assets?.props.get(L.prop);if(he&&L.prop!=="crystal"){const ye=L.prop==="tree"||L.prop==="pine"||L.prop==="rock"?le*Math.PI*2:L.prop==="ruin_wall"||L.prop==="banner"||L.prop==="statue"?0:Math.floor(le*4)*(Math.PI/2);q.position.set(G.x,G.y,G.z),q.rotation.set(0,ye,0),q.scale.set(1,1,1),q.updateMatrix();const Ce=L.prop==="torch"||L.prop==="brazier";V(Ue,he,{matrix:q.matrix.clone(),tintHex:wh(L.prop,e.biome)},Ce)}else if(he&&L.prop==="crystal"){const ye=he.scene.clone(!0);ye.position.set(G.x,G.y+.04,G.z);const Ce=wh("crystal",e.biome);ye.traverse(we=>{if(we.isMesh){const Qe=we;Qe.geometry.userData.sharedGLTF=!0;const We=Qe.material.clone();Ce&&!We.name.toLowerCase().startsWith("stone")&&(We.color.setHex(Ce),We.name.toLowerCase().startsWith("emissive")&&We.emissive.setHex(Ce)),this.clonedMaterialsToDispose.push(We),Qe.material=We,Qe.castShadow=!We.name.toLowerCase().startsWith("emissive"),Qe.receiveShadow=!0}}),this.group.add(ye),this.floatingCrystals.push(ye)}else{const ye=bx(L.prop,e.biome),Ce=Ht(ye,.082);Ce.position.set(G.x,G.y+.03,G.z),this.group.add(Ce),L.prop==="crystal"&&this.floatingCrystals.push(Ce)}}if(L.chest){const Ue=this.assets?.props.get("chest");if(Ue){const he=Ue.scene.clone(!0);he.position.set(G.x,G.y,G.z),he.traverse(Ce=>{if(Ce.isMesh){const we=Ce;we.geometry.userData.sharedGLTF=!0,we.castShadow=!0,we.receiveShadow=!0}});const ye=he.getObjectByName("ChestLid")??void 0;ye&&L.chest.opened&&(ye.rotation.x=-Math.PI*.56),this.group.add(he),this.chestMeshes.set(L.chest.id,{group:he,isGLTF:!0,lid:ye,opened:L.chest.opened})}else{const he=Th(L.chest.opened);he.position.set(G.x,G.y+.03,G.z),this.group.add(he),this.chestMeshes.set(L.chest.id,{group:he,isGLTF:!1,opened:L.chest.opened})}}}for(const L of z.values())this.emitGLTFInstancedBatch(L.gltf,L.items,!1);for(const L of D.values())this.emitGLTFInstancedBatch(L.gltf,L.items,L.flicker);if(o.length>0){const L=new wt;L.setAttribute("position",new Ye(i,3)),L.setAttribute("normal",new Ye(n,3)),L.setAttribute("color",new Ye(s,3)),L.setAttribute("uv",new Ye(r,2)),L.setIndex(o),L.computeBoundingSphere(),this.proceduralGeomsToDispose.push(L);const G=new Ie(L,Zo("stone"));G.castShadow=!0,G.receiveShadow=!0,this.group.add(G)}if(u.length>0){const L=new wt;L.setAttribute("position",new Ye(l,3)),L.setAttribute("normal",new Ye(c,3)),L.setAttribute("color",new Ye(h,3)),L.setAttribute("uv",new Ye(d,2)),L.setIndex(u),L.computeBoundingSphere(),this.proceduralGeomsToDispose.push(L);const G=new Ie(L,Zo("ice"));G.receiveShadow=!0,this.group.add(G)}if(j.length>0){const L=new Kt(.11,.14,.11),G=new xt({color:16777215,roughness:.7});this.proceduralGeomsToDispose.push(L),this.clonedMaterialsToDispose.push(G);const se=new Jn(L,G,j.length),le=[16707722,16020150,3718648,16486972],ie=new ct,be=new Me;j.forEach((Ue,he)=>{ie.position.set(Ue.x+(he%2===0?.34:-.34),Ue.y+.06,Ue.z+(he%3===0?.25:-.28)),ie.updateMatrix(),se.setMatrixAt(he,ie.matrix),be.setHex(le[he%le.length]),se.setColorAt(he,be)}),this.group.add(se)}const re=(L,G)=>{if(L.length===0)return;const se=Zr(G);this.liquidMaterials.push(se);const le=new ui(ke*.99,ke*.99,4,4);le.rotateX(-Math.PI/2),this.proceduralGeomsToDispose.push(le);const ie=new Jn(le,se,L.length),be=new ct;for(let Ue=0;Ue<L.length;Ue++){const he=L[Ue],ye=Ot(he.col,he.row,he.height,e.cols,e.rows);be.position.set(ye.x,ye.y-.11,ye.z),be.rotation.set(0,0,0),be.scale.set(1,1,1),be.updateMatrix(),ie.setMatrixAt(Ue,be.matrix)}ie.instanceMatrix.needsUpdate=!0,this.group.add(ie)},Fe=e.biome==="canyon"?"canyon_river":e.biome==="swamp"?"swamp_water":"water";re(w,Fe),re(_,"lava"),p.dispose()}buildBiomeArchitecture(e){if(e.biome==="forest"){const t=Ot(0,6,1,e.cols,e.rows),i=new ui(ke*.92,2.2);this.proceduralGeomsToDispose.push(i);const n=new Ie(i,Zr("canyon_river"));this.liquidMaterials.push(n.material),n.position.set(t.x-ke*.51,t.y-1.1,t.z),n.rotation.y=-Math.PI/2,this.group.add(n)}else if(e.biome==="canyon"){const t=new ui(ke*.96,2.5);this.proceduralGeomsToDispose.push(t);for(const i of[0,e.rows-1])for(const n of[5,6,7]){const s=Ot(n,i,1,e.cols,e.rows),r=new Ie(t,Zr("canyon_river"));this.liquidMaterials.push(r.material),r.position.set(s.x,s.y-1.25,s.z+(i===0?-ke*.51:ke*.51)),i===0&&(r.rotation.y=Math.PI),this.group.add(r)}}else if(e.biome==="arctic"){const t=Ot(6,3,4,e.cols,e.rows),i=[];for(let s=-5;s<=5;s++)if(i.push({x:s,y:12,z:0,color:3359061,mat:"steel"}),s%2===0)for(let r=7;r<=11;r++)i.push({x:s,y:r,z:0,color:1976635,mat:"steel"});for(let s=0;s<=12;s++)i.push({x:-6,y:s,z:0,color:4674921,mat:"stone"}),i.push({x:6,y:s,z:0,color:4674921,mat:"stone"});const n=Ht(i,.11);n.position.copy(t),this.group.add(n)}else if(e.biome==="volcanic"){const t=Ot(6,0,6,e.cols,e.rows),i=[];for(let s=0;s<=24;s++)i.push({x:-10,y:s,z:-4,color:1579035,mat:"stone"}),i.push({x:-9,y:s,z:-4,color:16096779,mat:"gold"}),i.push({x:18,y:s,z:-4,color:1579035,mat:"stone"}),i.push({x:17,y:s,z:-4,color:16096779,mat:"gold"});for(let s=-10;s<=18;s++)i.push({x:s,y:24,z:-4,color:1579035,mat:"stone"}),i.push({x:s,y:23,z:-4,color:16096779,mat:"gold"});for(let s=-5;s<=13;s+=3)for(let r=8;r<=20;r+=2)i.push({x:s,y:r,z:-4,color:(s+r)%2===0?16007006:16347926,emissive:!0,mat:"emissive"});const n=Ht(i,.11);n.position.copy(t),this.group.add(n)}}buildAmbientParticles(e){const t=new Kt(.08,.08,.08),i=new pt({color:16777215,transparent:!0,opacity:.85});this.proceduralGeomsToDispose.push(t),this.clonedMaterialsToDispose.push(i),this.ambientMesh=new Jn(t,i,this.maxAmbient),this.ambientMesh.instanceMatrix.setUsage(Qh),this.ambientMesh.frustumCulled=!1;const s={forest:[16638023,8843180,16498468],canyon:[14742270,12248829,16777215],arctic:[16777215,14742270,12248829],swamp:[10741301,12616956,3718648],volcanic:[16733440,16707722,7434618]}[e.biome],r=new Me,o=e.cols*ke,l=e.rows*ke;for(let c=0;c<this.maxAmbient;c++){const h=(Math.random()-.5)*o*1.15,d=(Math.random()-.5)*l*1.15,u=.6+Math.random()*6.5;let f;e.biome==="arctic"?f=new U(1.6+Math.random(),-1.8-Math.random(),.9):e.biome==="volcanic"||e.biome==="canyon"?f=new U((Math.random()-.5)*.6,.8+Math.random()*1.1,(Math.random()-.5)*.6):e.biome==="forest"?f=new U(.45+Math.random()*.3,-.45-Math.random()*.3,.3):f=new U((Math.random()-.5)*.5,Math.sin(c)*.25,(Math.random()-.5)*.5),this.ambientMotes.push({pos:new U(h,u,d),vel:f,phase:Math.random()*Math.PI*2,scale:.65+Math.random()*.85}),r.setHex(s[c%s.length]),this.ambientMesh.setColorAt(c,r)}this.group.add(this.ambientMesh)}setParticleDensity(e){this.densityRatio=Math.max(0,Math.min(1,e))}markChestOpened(e){const t=this.chestMeshes.get(e);if(!t||t.opened)return;if(t.opened=!0,t.isGLTF){t.lid&&(t.lid.rotation.x=-Math.PI*.56);return}const i=t.group.position.clone();this.group.remove(t.group);const n=Th(!0);n.position.copy(i),this.group.add(n),this.chestMeshes.set(e,{group:n,isGLTF:!1,opened:!0})}update(e,t=.016){for(const i of this.liquidMaterials)i.uniforms.uTime.value=e;for(let i=0;i<this.floatingCrystals.length;i++)this.floatingCrystals[i].rotation.y=e*.65+i;for(let i=0;i<this.flickerEmissiveMaterials.length;i++){const n=this.flickerEmissiveMaterials[i];n.emissiveIntensity=2.3+Math.sin(e*9.5+i*1.7)*.35+Math.cos(e*15.2)*.18}if(this.ambientMesh){const i=Math.floor(this.maxAmbient*this.densityRatio),n=this.stage.cols*ke*.6,s=this.stage.rows*ke*.6;for(let r=0;r<this.maxAmbient;r++){if(r>=i){this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.ambientMesh.setMatrixAt(r,this.dummy.matrix);continue}const o=this.ambientMotes[r];o.pos.addScaledVector(o.vel,t),o.pos.x+=Math.sin(e*1.8+o.phase)*.008,o.pos.y<.2&&(o.pos.y=7.2),o.pos.y>7.5&&(o.pos.y=.4),o.pos.x>n&&(o.pos.x=-n),o.pos.x<-n&&(o.pos.x=n),o.pos.z>s&&(o.pos.z=-s),o.pos.z<-s&&(o.pos.z=s),this.dummy.position.copy(o.pos),this.dummy.rotation.set(e+o.phase,e*.8,o.phase),this.dummy.scale.setScalar(o.scale),this.dummy.updateMatrix(),this.ambientMesh.setMatrixAt(r,this.dummy.matrix)}this.ambientMesh.instanceMatrix.needsUpdate=!0}}dispose(){for(const e of this.proceduralGeomsToDispose)e.dispose();this.group.traverse(e=>{if(e.isMesh){const t=e;t.geometry&&!t.geometry.userData?.sharedGLTF&&t.geometry.dispose()}});for(const e of this.clonedMaterialsToDispose)e.dispose();for(const e of this.liquidMaterials)e.dispose()}}class Ex{group=new Je;particleMesh;particles=[];maxParticles=200;dummy=new ct;transientEffects=[];getFloorHeight;triggerLight;triggerEnvPulse;tmpOffset=new U;sharedRingOuterGeo=new ni(.68,.82,24);sharedRingInnerGeo=new ni(.32,.42,6);sharedSlashRibbonGeo=new ni(.55,.96,20,1,0,Math.PI*1.05);sharedWindRingGeo=new ni(.25,.55,20);sharedShockwaveGeo=new ni(.3,.7,24);sharedGhostGeo=new Kt(.5,1.1,.4);sharedGeometries=new Set;pooledRings=[];constructor(e,t,i){this.getFloorHeight=e,this.triggerLight=t,this.triggerEnvPulse=i;const n=new Kt(.1,.1,.1),s=new xt({color:16777215,roughness:.3,metalness:.15,emissive:1118481,emissiveIntensity:1});s.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <emissivemap_fragment>",`
        #include <emissivemap_fragment>
        #ifdef USE_INSTANCING_COLOR
          totalEmissiveRadiance += vColor.rgb * 0.72;
        #endif
        `)},this.particleMesh=new Jn(n,s,this.maxParticles),this.particleMesh.instanceMatrix.setUsage(Qh),this.particleMesh.frustumCulled=!1;const r=new ze().makeScale(0,0,0);for(let o=0;o<this.maxParticles;o++)this.particles.push({active:!1,pos:new U,vel:new U,rot:new tn,rotVel:new U,scale:1,life:0,maxLife:1,color:new Me(16777215)}),this.particleMesh.setMatrixAt(o,r),this.particleMesh.setColorAt(o,new Me(16777215));this.group.add(this.particleMesh),this.sharedGeometries.add(this.sharedRingOuterGeo),this.sharedGeometries.add(this.sharedRingInnerGeo),this.sharedGeometries.add(this.sharedSlashRibbonGeo),this.sharedGeometries.add(this.sharedWindRingGeo),this.sharedGeometries.add(this.sharedShockwaveGeo),this.sharedGeometries.add(this.sharedGhostGeo)}acquirePooledRing(e,t=.85){const i=this.pooledRings.pop();if(i)return i.mat.color.setHex(e).multiplyScalar(1.65),i.mat.opacity=t,i.mesh.scale.setScalar(1),i.mesh.rotation.set(-Math.PI/2,0,0),i;const n=new pt({color:new Me(e).multiplyScalar(1.65),side:ft,transparent:!0,opacity:t,depthWrite:!1}),s=new Ie(this.sharedShockwaveGeo,n);return s.rotation.x=-Math.PI/2,{mesh:s,mat:n}}spawnVoxelBurst(e,t,i,n=4.5,s=4.5,r=1){let o=0;for(let l=0;l<this.maxParticles&&o<t;l++){const c=this.particles[l];if(c.active)continue;c.active=!0,this.tmpOffset.set((Math.random()-.5)*.45,Math.random()*.45+.15,(Math.random()-.5)*.45),c.pos.copy(e).add(this.tmpOffset);const h=Math.random()*Math.PI*2,d=(.35+Math.random()*.9)*n;c.vel.set(Math.cos(h)*d,s*(.55+Math.random()*.8),Math.sin(h)*d),c.rot.set(Math.random()*3,Math.random()*3,Math.random()*3),c.rotVel.set((Math.random()-.5)*14,(Math.random()-.5)*14,(Math.random()-.5)*14),c.scale=r*(.65+Math.random()*.75),c.life=0,c.maxLife=.75+Math.random()*.65,c.color.setHex(i[Math.floor(Math.random()*i.length)]),this.particleMesh.setColorAt(l,c.color),o++}this.particleMesh.instanceColor&&(this.particleMesh.instanceColor.needsUpdate=!0)}addTransient(e,t,i){this.group.add(e),this.transientEffects.push({mesh:e,life:0,maxLife:t,update:i})}spawnCasterMagicCircle(e,t){const i=new Je,n=new pt({color:new Me(t).multiplyScalar(1.75),side:ft,transparent:!0,opacity:.92,depthWrite:!1}),s=new Ie(this.sharedRingOuterGeo,n);s.rotation.x=-Math.PI/2;const r=new Ie(this.sharedRingInnerGeo,n);r.rotation.x=-Math.PI/2,i.add(s,r),i.position.set(e.x,e.y+.06,e.z),this.addTransient(i,.65,o=>{i.rotation.y+=.12;const l=o<.2?.4+o/.2*.7:1.1;i.scale.setScalar(l),n.opacity=o>.6?.92*(1-(o-.6)/.4):.92})}spawnSwordSlashRibbon(e,t,i,n=!1){const s=(r,o)=>{const l=new xt({color:16777215,emissive:i,emissiveIntensity:2.8,side:ft,transparent:!0,opacity:.96,depthWrite:!1}),c=new Ie(this.sharedSlashRibbonGeo,l);c.position.set(e.x,e.y+.85,e.z),c.rotation.set(o,t,r),this.addTransient(c,.3,h=>{c.rotation.z+=.18,c.scale.setScalar(.85+h*.55),l.opacity=Math.max(0,.96*(1-h))})};n?(s(.75,.5),s(-.75,-.5)):s(.35,1.15)}spawnSkyDiveWindRings(e){const t=new pt({color:12248829,side:ft,transparent:!0,opacity:.85,depthWrite:!1}),i=new Ie(this.sharedWindRingGeo,t);i.rotation.x=-Math.PI/2,i.position.set(e.x,e.y+.08,e.z),this.addTransient(i,.35,n=>{i.scale.setScalar(1+n*2.2),t.opacity=.85*(1-n)})}playSkillVFX(e,t,i,n,s=0){if(e.isMagic||e.isHeal||e.isBuff||e.vfxType==="judgment_blade"){const r=e.element==="fire"?16347926:e.element==="ice"?3718648:e.element==="lightning"?16436245:e.isHeal?4906624:16638023;this.spawnCasterMagicCircle(t,r)}switch(e.vfxType){case"judgment_blade":{this.triggerLight(i.clone().add(new U(0,1.8,0)),3718648,18,.85);for(let r=0;r<n.length;r++){const o=n[r],l=new Je,c=new xt({color:14742270,emissive:r%2===0?3718648:16638023,emissiveIntensity:3.1,transparent:!0,opacity:.94}),h=new Ie(new Kt(.22,2.6,.08),c);h.position.y=1.4;const d=new Ie(new Kt(.65,.14,.14),c);d.position.y=2.4;const u=new Ie(new Hs(.32,1.35,4),c);u.position.y=.65,l.add(h,d,u);const f=new pt({color:16707722,side:ft,transparent:!0,opacity:.9}),p=new Ie(new ni(.3,.68,16),f);p.rotation.x=-Math.PI/2,p.position.y=.08,l.add(p),l.position.copy(o),this.addTransient(l,.82,v=>{const g=v<.25?(1-v/.25)*4.5:0;h.position.y=1.4+g,d.position.y=2.4+g,u.scale.setScalar(v<.25?.1:1),p.scale.setScalar(1+v*1.5),c.opacity=Math.max(0,1-Math.max(0,v-.6)/.4),f.opacity=Math.max(0,.9*(1-v))}),this.spawnVoxelBurst(o,12,[3718648,14742270,16707722],4,5.2,1.1)}break}case"hallowed_bolt":case"thundaga":{this.triggerEnvPulse?.("storm_dark",260);const r=e.vfxType==="hallowed_bolt"?16707722:6333946;this.triggerLight(i.clone().add(new U(0,2,0)),r,22,.62);for(const o of n){const l=new Je,c=new xt({color:16777215,emissive:r,emissiveIntensity:3,transparent:!0,opacity:.95});for(let u=0;u<3;u++){const f=(u-1)*.25;for(let p=0;p<4;p++){const v=new Ie(new An(.05,.08,1.15,6),c);v.position.set(f+(p%2===0?.14:-.14),.55+p*1,p%2===0?-.08:.08),v.rotation.z=p%2===0?.22:-.22,l.add(v)}}const h=new pt({color:r,side:ft,transparent:!0,opacity:.9}),d=new Ie(new ni(.25,.68,20),h);d.rotation.x=-Math.PI/2,d.position.y=.08,l.add(d),l.position.copy(o),this.addTransient(l,.52,u=>{c.opacity=1-u,d.scale.setScalar(.8+u*2.2),h.opacity=.9*(1-u)}),this.spawnVoxelBurst(o,12,[r,16777215,3718648],4.5,4.8,.9)}break}case"firaga":case"dragon_breath":{this.triggerLight(i.clone().add(new U(0,1.4,0)),16347926,22,.85);const r=new xt({color:16707722,emissive:16733440,emissiveIntensity:3,transparent:!0,opacity:.95}),o=new Ie(new Cn(.42,12,12),r);o.position.set(i.x,i.y+3.2,i.z),this.addTransient(o,.45,l=>{o.position.y=i.y+3.2*(1-l*l)+.3,o.scale.setScalar(1+l*.8),r.opacity=1-l});for(const l of n){const c=new Je,h=new xt({color:16772565,emissive:16347926,emissiveIntensity:2.8,transparent:!0,opacity:.9}),d=new Ie(new An(.28,.64,2.4,8),h);d.position.y=1.2;const u=new pt({color:16486972,side:ft,transparent:!0,opacity:.85}),f=new Ie(new ni(.2,.55,18),u);f.rotation.x=-Math.PI/2,f.position.y=.08,c.add(d,f),c.position.copy(l),this.addTransient(c,.7,p=>{const v=Math.sin(p*Math.PI);d.scale.set(.6+v*.95,.5+v*1.15,.6+v*.95),d.rotation.y+=.22,h.opacity=Math.max(0,1-p),f.scale.setScalar(1+p*2.1),u.opacity=.85*(1-p)}),this.spawnVoxelBurst(l,14,[16347926,15680580,16707722],4.2,5.5,1.1)}break}case"blizzaga":{this.triggerLight(i.clone().add(new U(0,1.2,0)),3718648,18,.78);for(let r=0;r<n.length;r++){const o=n[r],l=new Je,c=new fi({color:14742270,emissive:959977,emissiveIntensity:2.35,roughness:.14,metalness:.2,clearcoat:.9,transparent:!0,opacity:.92});for(let d=0;d<5;d++){const u=new Ie(new Hs(.2,1.55,5),c),f=d/5*Math.PI*2;u.position.set(Math.cos(f)*.26,.65,Math.sin(f)*.26),u.rotation.z=Math.cos(f)*.28,u.rotation.x=Math.sin(f)*.28,l.add(u)}l.position.copy(o);const h=r*.06;this.addTransient(l,.78,d=>{const u=Math.max(0,(d-h)/(1-h)),f=u<.22?u/.22:1;l.scale.set(1,Math.max(.05,f),1),c.opacity=Math.max(0,1-Math.max(0,u-.55)/.45)}),this.spawnVoxelBurst(o,12,[12248829,3718648,16777215],3.8,4.4,1)}break}case"sky_dive":{this.triggerLight(i.clone().add(new U(0,1,0)),3718648,13,.65);const r=new Je,o=new pt({color:3718648,side:ft,transparent:!0,opacity:.95}),l=new Ie(new ni(.3,.75,24),o);l.rotation.x=-Math.PI/2,l.position.y=.08,r.add(l);const c=new xt({color:14742270,emissive:959977,emissiveIntensity:2.5,transparent:!0,opacity:.85}),h=new Ie(new An(.18,.5,4.8,8),c);h.position.y=2.4,r.add(h),r.position.copy(i),this.addTransient(r,.58,d=>{l.scale.setScalar(1+d*2.7),o.opacity=1-d,c.opacity=.85*(1-d),h.scale.set(1-d*.6,1,1-d*.6)}),this.spawnVoxelBurst(i,30,[3718648,16707722,9741240],5.8,6.2,1.25);break}case"arc_shot":case"leg_shot":case"arcane_bolt":case"poison_kunai":{const r=e.vfxType==="arcane_bolt"?11032055:e.vfxType==="poison_kunai"?2278750:16707722,o=new xt({color:r,emissive:r,emissiveIntensity:2.5}),l=new Ie(e.vfxType==="arcane_bolt"?new Cn(.16,8,8):new Kt(.08,.08,.55),o),c=t.clone().add(new U(0,1,0)),h=i.clone().add(new U(0,.8,0));l.position.copy(c),this.triggerLight(h,r,10,.4),this.addTransient(l,.34,d=>{const u=Math.sin(d*Math.PI)*1.45;l.position.lerpVectors(c,h,d),l.position.y+=u,l.lookAt(h)}),this.spawnVoxelBurst(i,10,[r,16777215],3.2,3.5,.9);break}case"arrow_rain":{this.triggerLight(i.clone().add(new U(0,1.8,0)),10741301,9,.6);const r=new xt({color:16707722,emissive:10741301,emissiveIntensity:2});for(const o of n){for(let l=0;l<4;l++){const c=new Ie(new Kt(.06,.65,.06),r),h=(Math.random()-.5)*.9,d=(Math.random()-.5)*.9,u=l*.06;c.position.set(o.x+h,o.y+5.5,o.z+d),this.addTransient(c,.55,f=>{const p=Math.max(0,(f-u)/(1-u));c.position.y=o.y+5.5*(1-p)+.3})}this.spawnVoxelBurst(o,6,[10741301,16707722],3,3.5,.85)}break}case"curaga":case"revive":case"mana_font":{const r=e.vfxType==="mana_font"?3718648:4906624;this.triggerLight(i.clone().add(new U(0,1.5,0)),r,11,.7);for(const o of n){const l=new xt({color:16777215,emissive:r,emissiveIntensity:2.2,transparent:!0,opacity:.7}),c=new Ie(new An(.45,.45,3.5,12),l);c.position.set(o.x,o.y+1.75,o.z),this.addTransient(c,.65,h=>{l.opacity=.7*Math.sin(h*Math.PI),c.rotation.y+=.1}),this.spawnVoxelBurst(o,10,[r,16707722,16777215],2.2,5,.85)}break}case"hastega":case"aegis":{const r=e.vfxType==="aegis"?6333946:16436245;this.triggerLight(i.clone().add(new U(0,1.2,0)),r,10,.65);for(const o of n){const l=new Je,c=new xt({color:r,emissive:r,emissiveIntensity:2.3,transparent:!0,opacity:.9}),h=new Ie(new Ls(.58,.06,6,16),c);h.rotation.x=Math.PI/2,l.add(h);for(let d=0;d<6;d++){const u=new Ie(new Kt(.14,.08,.18),c),f=d/6*Math.PI*2;u.position.set(Math.cos(f)*.65,0,Math.sin(f)*.65),u.rotation.y=-f,l.add(u)}l.position.set(o.x,o.y+.12,o.z),this.addTransient(l,.75,d=>{l.rotation.y+=.12,l.position.y=o.y+.12+d*.75,c.opacity=.9*(1-d)})}break}case"holy":{this.triggerLight(i.clone().add(new U(0,1.5,0)),16707722,26,.82);const r=new xt({color:16777215,emissive:16638023,emissiveIntensity:3.4,transparent:!0,opacity:.95}),o=new Ie(new Cn(.55,16,16),r);o.position.set(i.x,i.y+1,i.z),this.addTransient(o,.65,l=>{const c=l<.45?.3+l/.45*1.4:1.7+(l-.45)*2.5;o.scale.setScalar(c),r.opacity=l<.45?.95:Math.max(0,1-(l-.45)/.55)}),this.spawnVoxelBurst(i,32,[16707722,16777215,3718648],5.5,6.2,1.15);break}case"shadow_step":{this.triggerLight(i.clone().add(new U(0,1,0)),11032055,17,.6);const r=new pt({color:new Me(11032055).multiplyScalar(1.65),transparent:!0,opacity:.72}),o=new Ie(this.sharedGhostGeo,r);o.position.set(t.x,t.y+.65,t.z),this.addTransient(o,.45,l=>{r.opacity=.65*(1-l),o.scale.set(1+l*.4,1-l*.3,1+l*.4)}),this.spawnSwordSlashRibbon(i,s,16007006,!0),this.spawnVoxelBurst(t,18,[8266446,1973067,12616956],3.2,3.8,1.1),this.spawnVoxelBurst(i,24,[12616956,16007006,1973067],4.4,4.8,1.15);break}case"apocalypse_meteor":{this.triggerEnvPulse?.("blood_sky",950),this.triggerLight(i.clone().add(new U(0,2.5,0)),16729344,28,1);const r=new Je,o=new xt({color:4524554,emissive:16733440,emissiveIntensity:3.5,roughness:.5}),l=new Ie(new El(1.1,1),o),c=new pt({color:new Me(16707722).multiplyScalar(1.75),side:ft,transparent:!0,opacity:.9}),h=new Ie(new Ls(1.4,.08,6,20),c),d=new Ie(new Ls(1.8,.06,6,20),c);d.rotation.x=Math.PI/2,r.add(l,h,d);const u=i.clone().add(new U(-4.5,9.5,-3.5)),f=i.clone().add(new U(0,.5,0));r.position.copy(u),this.addTransient(r,.85,p=>{r.position.lerpVectors(u,f,p*p),l.rotation.x+=.14,l.rotation.z+=.1,h.rotation.y+=.2,d.rotation.z+=.22,p>.85&&r.scale.setScalar(1+(p-.85)*6)});for(const p of[2.5,4.2]){const v=this.acquirePooledRing(16733440,.85),g=v.mesh,m=v.mat;g.userData.__pooledRing=v,g.position.set(i.x,i.y+.1,i.z),this.addTransient(g,.85,x=>{g.scale.setScalar(1+x*p),m.opacity=.85*(1-x)})}for(const p of n)this.spawnVoxelBurst(p,12,[16733440,16707722,4524554],6.2,7.5,1.35);break}default:{const r=e.vfxType==="dual_strike",o=e.vfxType==="shadowblade"?11032055:r?16007006:16707722;this.triggerLight(i.clone().add(new U(0,1,0)),o,9,.35),this.spawnSwordSlashRibbon(i,s,o,r),this.spawnVoxelBurst(i,14,[o,16777215,9741240],3.8,4.2,1);break}}}update(e){let t=!1;for(let i=0;i<this.maxParticles;i++){const n=this.particles[i];if(!n.active)continue;if(t=!0,n.life+=e,n.life>=n.maxLife){n.active=!1,this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix);continue}n.vel.y-=18*e,n.pos.addScaledVector(n.vel,e),n.rot.x+=n.rotVel.x*e,n.rot.y+=n.rotVel.y*e,n.rot.z+=n.rotVel.z*e;const s=this.getFloorHeight(n.pos.x,n.pos.z)+.05;n.pos.y<s&&(n.pos.y=s,n.vel.y=Math.abs(n.vel.y)*.46,n.vel.x*=.72,n.vel.z*=.72);const r=n.life>n.maxLife*.6?1-(n.life-n.maxLife*.6)/(n.maxLife*.4):1,o=Math.max(.001,n.scale*r);this.dummy.position.copy(n.pos),this.dummy.rotation.copy(n.rot),this.dummy.scale.setScalar(o),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix)}t&&(this.particleMesh.instanceMatrix.needsUpdate=!0);for(let i=this.transientEffects.length-1;i>=0;i--){const n=this.transientEffects[i];n.life+=e;const s=Math.min(1,n.life/n.maxLife);if(n.update(s,e),n.life>=n.maxLife){this.group.remove(n.mesh);const r=n.mesh.userData?.__pooledRing;r&&this.pooledRings.length<32?this.pooledRings.push(r):n.mesh.traverse(o=>{if(o.isMesh){const l=o;l.geometry&&!this.sharedGeometries.has(l.geometry)&&l.geometry.dispose(),Array.isArray(l.material)?l.material.forEach(c=>c.dispose()):l.material?.dispose()}}),this.transientEffects.splice(i,1)}}}static tileSize(){return{tileSize:ke,stepHeight:Li}}}const Eh=new Set(["slash","bow","dual","hit","block"]),Ax=new Set(["holy_knight","black_mage","dragoon","sniper","white_mystic","ninja"]);function Cx(a,e,t){const i=t?1.05:.48,n=new Ie(new ui(i*2.15,i*2.15),kd());n.rotation.x=-Math.PI/2,n.position.y=.014;const s=a==="ally"?3718648:e?16096779:16007006,r=new pt({color:s,side:ft,transparent:!0,opacity:.82,depthWrite:!1}),o=new Ie(new ni(i*.84,i,32),r);return o.rotation.x=-Math.PI/2,o.position.y=.02,{shadowDisc:n,teamRing:o,ringMat:r}}class Rx{root;bodyPivot;teamRing;shadowDisc;heightWorld;isGLTF=!1;rig;state="idle";constructor(e,t,i){this.rig=Mx(e,t,i),this.root=this.rig.root,this.bodyPivot=this.rig.bodyPivot,this.teamRing=this.rig.teamRing,this.shadowDisc=this.rig.shadowDisc,this.heightWorld=this.rig.heightWorld}setState(e){this.state=e}triggerFlash(){}setActiveHighlight(e){this.teamRing.scale.setScalar(e?1.24:1)}update(e,t,i){Sx(this.rig,this.state,t,i)}dispose(){this.root.traverse(e=>{e.isMesh&&e.geometry?.dispose()})}}class Px{root=new Je;bodyPivot=new Je;teamRing;shadowDisc;heightWorld;isGLTF=!0;model;mixer;actions=new Map;currentAction=null;state="idle";clonedMaterials=[];ringMat;flashTimer=0;flashDuration=.16;sharedUniforms;constructor(e,t,i,n,s="idle"){const r=t==="belias_boss";this.root.add(this.bodyPivot);const o=Cx(i,n,r);this.shadowDisc=o.shadowDisc,this.teamRing=o.teamRing,this.ringMat=o.ringMat,this.root.add(this.shadowDisc,this.teamRing);const l=i==="ally"?3718648:n?16498468:16007006;this.sharedUniforms={uFlashColor:{value:new Me(16777215)},uFlashAmount:{value:0},uRimColor:{value:new Me(l)},uRimStrength:{value:n?.42:.3}},this.model=lx(e);const c=i==="enemy"&&Ax.has(t);this.model.traverse(u=>{if(!u.isMesh)return;const f=u,p=Array.isArray(f.material)?f.material:[f.material],v=[];for(const g of p){if(!g||!g.isMeshStandardMaterial){v.push(g);continue}const m=g.clone(),x=(m.name||"").toLowerCase();c&&(x.startsWith("cape_")?m.color.setHex(8917815):x.startsWith("cloth_")&&m.color.setHex(10033947));const S=this.sharedUniforms;m.customProgramCacheKey=()=>"coa_unit_pbr_rim_flash_v1",m.onBeforeCompile=M=>{M.uniforms.uFlashColor=S.uFlashColor,M.uniforms.uFlashAmount=S.uFlashAmount,M.uniforms.uRimColor=S.uRimColor,M.uniforms.uRimStrength=S.uRimStrength,M.fragmentShader=`
            uniform vec3 uFlashColor;
            uniform float uFlashAmount;
            uniform vec3 uRimColor;
            uniform float uRimStrength;
            `+M.fragmentShader,M.fragmentShader=M.fragmentShader.replace("#include <emissivemap_fragment>",`
            #include <emissivemap_fragment>
            float coaRimDot = 1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0);
            totalEmissiveRadiance += uRimColor * pow(coaRimDot, 2.8) * uRimStrength;
            totalEmissiveRadiance = mix(totalEmissiveRadiance, uFlashColor * 2.1, clamp(uFlashAmount, 0.0, 1.0));
            `)},m.needsUpdate=!0,this.clonedMaterials.push(m),v.push(m)}f.material=Array.isArray(f.material)?v:v[0]}),this.bodyPivot.add(this.model);const h=new zi().setFromObject(this.model),d=h.max.y-h.min.y;this.heightWorld=Number.isFinite(d)&&d>.2?wn.clamp(d,1.2,4.1):r?2.75:1.48,this.mixer=new bp(this.model);for(const u of e.animations){const f=this.mixer.clipAction(u);this.actions.set(u.name,f)}this.mixer.addEventListener("finished",()=>{this.state!=="dead"&&Eh.has(this.state)&&this.setState("idle")}),this.setState(s,!0),s==="dead"&&this.mixer.update(2)}setState(e,t=!1){if(this.state===e&&!t&&this.currentAction)return;this.state=e,this.teamRing.visible=e!=="dead";const i=this.actions.get(e)??this.actions.get("idle");i&&(e==="dead"?(i.setLoop(Go,1),i.clampWhenFinished=!0):Eh.has(e)?(i.setLoop(Go,1),i.clampWhenFinished=!1):(i.setLoop($h,1/0),i.clampWhenFinished=!1),i.reset(),i.setEffectiveTimeScale(1),i.setEffectiveWeight(1),i.play(),this.currentAction&&this.currentAction!==i&&this.currentAction.crossFadeTo(i,.14,!1),this.currentAction=i)}triggerFlash(e,t=.18){this.sharedUniforms.uFlashColor.value.setHex(e),this.flashDuration=Math.max(.05,t),this.flashTimer=this.flashDuration,this.sharedUniforms.uFlashAmount.value=1}setActiveHighlight(e){this.teamRing.scale.setScalar(e?1.25:1),this.ringMat.opacity=e?.96:.78,this.sharedUniforms.uRimStrength.value=e?.55:.3}update(e,t,i){this.mixer.update(e),this.flashTimer>0&&(this.flashTimer=Math.max(0,this.flashTimer-e),this.sharedUniforms.uFlashAmount.value=this.flashTimer/this.flashDuration)}dispose(){this.mixer.stopAllAction(),this.mixer.uncacheRoot(this.model);for(const e of this.clonedMaterials)e.dispose();this.shadowDisc.geometry.dispose(),this.shadowDisc.material.dispose(),this.teamRing.geometry.dispose(),this.ringMat.dispose()}}function Ah(a,e,t,i,n="idle"){if(a&&a.animations.length>0)return new Px(a,e,t,i,n);const s=new Rx(e,t,i);return s.setState(n),s}const Rn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Nn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ix=new ar(-1,1,1,-1,0,1);class Lx extends wt{constructor(){super(),this.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ye([0,2,0,0,2,0],2))}}const Dx=new Lx;class lr{constructor(e){this._mesh=new Ie(Dx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ix)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class zd extends Nn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ui.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new lr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ch extends Nn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),s.buffers.stencil.setFunc(n.ALWAYS,r,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(n.EQUAL,1,4294967295),s.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),s.buffers.stencil.setLocked(!0)}}class Nx extends Nn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ux{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Re);this._width=i.width,this._height=i.height,t=new Jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zd(Rn),this.copyPass.material.blending=ti,this.timer=new Sd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,s=this.passes.length;n<s;n++){const r=this.passes[n];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),r.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ch!==void 0&&(r instanceof Ch?i=!0:r instanceof Nx&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Aa={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ze},cameraProjectionMatrixInverse:{value:new ze},cameraWorldMatrix:{value:new ze},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new U(-1,-1,-1)},sceneBoxMax:{value:new U(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				#if PERSPECTIVE_CAMERA == 1
					vec3 viewDir = normalize(-viewPos.xyz);
				#else
					vec3 viewDir = vec3(0., 0., 1.);
				#endif
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Ca={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Qr={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Fx(a=5){const e=Math.floor(a)%2===0?Math.floor(a)+1:Math.floor(a),t=Bx(e),i=t.length,n=new Uint8Array(i*4);for(let r=0;r<i;++r){const o=t[r],l=2*Math.PI*o/i,c=new U(Math.cos(l),Math.sin(l),0).normalize();n[r*4]=(c.x*.5+.5)*255,n[r*4+1]=(c.y*.5+.5)*255,n[r*4+2]=127,n[r*4+3]=255}const s=new $s(n,e,e);return s.wrapS=xi,s.wrapT=xi,s.needsUpdate=!0,s}function Bx(a){const e=Math.floor(a)%2===0?Math.floor(a)+1:Math.floor(a),t=e*e,i=Array(t).fill(0);let n=Math.floor(e/2),s=e-1;for(let r=1;r<=t;){if(n===-1&&s===e?(s=e-2,n=0):(s===e&&(s=0),n<0&&(n=e-1)),i[n*e+s]!==0){s-=2,n++;continue}else i[n*e+s]=r++;s++,n--}return i}const Ra={defines:{SAMPLES:16,SAMPLE_VECTORS:Hd(16,2,1),NORMAL_VECTOR_TYPE:1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Re},cameraProjectionMatrixInverse:{value:new ze},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Hd(a,e,t){const i=Ox(a,e,t);let n="vec3[SAMPLES](";for(let s=0;s<a;s++){const r=i[s];n+=`vec3(${r.x}, ${r.y}, ${r.z})${s<a-1?",":")"}`}return n}function Ox(a,e,t){const i=[];for(let n=0;n<a;n++){const s=2*Math.PI*e*n/a,r=Math.pow(n/(a-1),t);i.push(new U(Math.cos(s),Math.sin(s),r))}return i}class kx{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,n,s;const r=.5*(Math.sqrt(3)-1),o=(e+t)*r,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,p=e-u,v=t-f;let g,m;p>v?(g=1,m=0):(g=0,m=1);const x=p-g+h,S=v-m+h,M=p-1+2*h,y=v-1+2*h,w=l&255,_=c&255,b=this.perm[w+this.perm[_]]%12,P=this.perm[w+g+this.perm[_+m]]%12,A=this.perm[w+1+this.perm[_+1]]%12;let I=.5-p*p-v*v;I<0?i=0:(I*=I,i=I*I*this._dot(this.grad3[b],p,v));let F=.5-x*x-S*S;F<0?n=0:(F*=F,n=F*F*this._dot(this.grad3[P],x,S));let k=.5-M*M-y*y;return k<0?s=0:(k*=k,s=k*k*this._dot(this.grad3[A],M,y)),70*(i+n+s)}noise3d(e,t,i){let n,s,r,o;const c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),d=Math.floor(t+c),u=Math.floor(i+c),f=1/6,p=(h+d+u)*f,v=h-p,g=d-p,m=u-p,x=e-v,S=t-g,M=i-m;let y,w,_,b,P,A;x>=S?S>=M?(y=1,w=0,_=0,b=1,P=1,A=0):x>=M?(y=1,w=0,_=0,b=1,P=0,A=1):(y=0,w=0,_=1,b=1,P=0,A=1):S<M?(y=0,w=0,_=1,b=0,P=1,A=1):x<M?(y=0,w=1,_=0,b=0,P=1,A=1):(y=0,w=1,_=0,b=1,P=1,A=0);const I=x-y+f,F=S-w+f,k=M-_+f,R=x-b+2*f,H=S-P+2*f,z=M-A+2*f,D=x-1+3*f,K=S-1+3*f,V=M-1+3*f,j=h&255,q=d&255,re=u&255,Fe=this.perm[j+this.perm[q+this.perm[re]]]%12,L=this.perm[j+y+this.perm[q+w+this.perm[re+_]]]%12,G=this.perm[j+b+this.perm[q+P+this.perm[re+A]]]%12,se=this.perm[j+1+this.perm[q+1+this.perm[re+1]]]%12;let le=.6-x*x-S*S-M*M;le<0?n=0:(le*=le,n=le*le*this._dot3(this.grad3[Fe],x,S,M));let ie=.6-I*I-F*F-k*k;ie<0?s=0:(ie*=ie,s=ie*ie*this._dot3(this.grad3[L],I,F,k));let be=.6-R*R-H*H-z*z;be<0?r=0:(be*=be,r=be*be*this._dot3(this.grad3[G],R,H,z));let Ue=.6-D*D-K*K-V*V;return Ue<0?o=0:(Ue*=Ue,o=Ue*Ue*this._dot3(this.grad3[se],D,K,V)),32*(n+s+r+o)}noise4d(e,t,i,n){const s=this.grad4,r=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,f,p;const v=(e+t+i+n)*l,g=Math.floor(e+v),m=Math.floor(t+v),x=Math.floor(i+v),S=Math.floor(n+v),M=(g+m+x+S)*c,y=g-M,w=m-M,_=x-M,b=S-M,P=e-y,A=t-w,I=i-_,F=n-b,k=P>A?32:0,R=P>I?16:0,H=A>I?8:0,z=P>F?4:0,D=A>F?2:0,K=I>F?1:0,V=k+R+H+z+D+K,j=r[V][0]>=3?1:0,q=r[V][1]>=3?1:0,re=r[V][2]>=3?1:0,Fe=r[V][3]>=3?1:0,L=r[V][0]>=2?1:0,G=r[V][1]>=2?1:0,se=r[V][2]>=2?1:0,le=r[V][3]>=2?1:0,ie=r[V][0]>=1?1:0,be=r[V][1]>=1?1:0,Ue=r[V][2]>=1?1:0,he=r[V][3]>=1?1:0,ye=P-j+c,Ce=A-q+c,we=I-re+c,Qe=F-Fe+c,We=P-L+2*c,yt=A-G+2*c,rt=I-se+2*c,ot=F-le+2*c,vt=P-ie+3*c,Dt=A-be+3*c,Nt=I-Ue+3*c,At=F-he+3*c,O=P-1+4*c,Wt=A-1+4*c,ht=I-1+4*c,dt=F-1+4*c,fe=g&255,_t=m&255,Le=x&255,Oe=S&255,C=o[fe+o[_t+o[Le+o[Oe]]]]%32,T=o[fe+j+o[_t+q+o[Le+re+o[Oe+Fe]]]]%32,W=o[fe+L+o[_t+G+o[Le+se+o[Oe+le]]]]%32,ne=o[fe+ie+o[_t+be+o[Le+Ue+o[Oe+he]]]]%32,te=o[fe+1+o[_t+1+o[Le+1+o[Oe+1]]]]%32;let oe=.6-P*P-A*A-I*I-F*F;oe<0?h=0:(oe*=oe,h=oe*oe*this._dot4(s[C],P,A,I,F));let ue=.6-ye*ye-Ce*Ce-we*we-Qe*Qe;ue<0?d=0:(ue*=ue,d=ue*ue*this._dot4(s[T],ye,Ce,we,Qe));let J=.6-We*We-yt*yt-rt*rt-ot*ot;J<0?u=0:(J*=J,u=J*J*this._dot4(s[W],We,yt,rt,ot));let Q=.6-vt*vt-Dt*Dt-Nt*Nt-At*At;Q<0?f=0:(Q*=Q,f=Q*Q*this._dot4(s[ne],vt,Dt,Nt,At));let ce=.6-O*O-Wt*Wt-ht*ht-dt*dt;return ce<0?p=0:(ce*=ce,p=ce*ce*this._dot4(s[te],O,Wt,ht,dt)),27*(h+d+u+f+p)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,n){return e[0]*t+e[1]*i+e[2]*n}_dot4(e,t,i,n,s){return e[0]*t+e[1]*i+e[2]*n+e[3]*s}}class Ti extends Nn{constructor(e,t,i=512,n=512,s,r,o){super(),this.width=i,this.height=n,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Fx(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Jt(this.width,this.height,{type:jt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Tt({defines:Object.assign({},Aa.defines),uniforms:Ui.clone(Aa.uniforms),vertexShader:Aa.vertexShader,fragmentShader:Aa.fragmentShader,blending:ti,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new kf,this.normalMaterial.blending=ti,this.pdMaterial=new Tt({defines:Object.assign({},Ra.defines),uniforms:Ui.clone(Ra.uniforms),vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Tt({defines:Object.assign({},Ca.defines),uniforms:Ui.clone(Ca.uniforms),vertexShader:Ca.vertexShader,fragmentShader:Ca.fragmentShader,blending:ti}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Tt({uniforms:Ui.clone(Rn.uniforms),vertexShader:Rn.vertexShader,fragmentShader:Rn.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:no,blendDst:bs,blendEquation:Ni,blendSrcAlpha:io,blendDstAlpha:bs,blendEquationAlpha:Ni}),this.blendMaterial=new Tt({uniforms:Ui.clone(Qr.uniforms),vertexShader:Qr.vertexShader,fragmentShader:Qr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Uh,blendSrc:no,blendDst:bs,blendEquation:Ni,blendSrcAlpha:io,blendDstAlpha:bs,blendEquationAlpha:Ni}),this._fsQuad=new lr(null),this._originalClearColor=new Me,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),r!==void 0&&this.updateGtaoMaterial(r),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget&&this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget&&this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){if(e!==void 0)this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1;else{if(this.normalRenderTarget===void 0){const n=new Ln;n.format=ji,n.type=Pn,this.normalRenderTarget=new Jt(this.width,this.height,{minFilter:Et,magFilter:Et,type:jt,depthTexture:n})}this.depthTexture=this.normalRenderTarget.depthTexture,this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0}const i=this.normalTexture?1:0;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.needsUpdate=!0,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.needsUpdate=!0,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Hd(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Ti.OUTPUT.Off:break;case Ti.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=ti,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ti.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=ti,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ti.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=ti,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ti.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Ti.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalTexture||null,this.copyMaterial.blending=ti,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ti.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=ti,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,n,s){e.getClearColor(this._originalClearColor);const r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n!=null&&(e.setClearColor(n),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(r)}_renderOverride(e,t,i,n,s){e.getClearColor(this._originalClearColor);const r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n=t.clearColor||n,s=t.clearAlpha||s,n!=null&&(e.setClearColor(n),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(r)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new kx,i=e*e*4,n=new Uint8Array(i);for(let r=0;r<e;r++)for(let o=0;o<e;o++){const l=r,c=o;n[(r*e+o)*4]=(t.noise(l,c)*.5+.5)*255,n[(r*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,n[(r*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,n[(r*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const s=new $s(n,e,e,_i,ai);return s.wrapS=xi,s.wrapT=xi,s.needsUpdate=!0,s}}Ti.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Pa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class zx extends Nn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ui.clone(Pa.uniforms),this.material=new md({name:Pa.name,uniforms:this.uniforms,vertexShader:Pa.vertexShader,fragmentShader:Pa.fragmentShader}),this._fsQuad=new lr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===st&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===nl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===sl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===al?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Qa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ol?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ll?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===rl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Hx extends Nn{constructor(e,t,i=null,n=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Me}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=n}}const Gx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Me(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class as extends Nn{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new Re(e.x,e.y):new Re(256,256),this.clearColor=new Me(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Jt(s,r,{type:jt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Jt(s,r,{type:jt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new Jt(s,r,{type:jt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),r=Math.round(r/2)}const o=Gx;this.highPassUniforms=Ui.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Re(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ui.clone(Rn.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:Rn.vertexShader,fragmentShader:Rn.fragmentShader,premultipliedAlpha:!0,blending:to,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Me,this._oldClearAlpha=1,this._basic=new pt,this._fsQuad=new lr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,n),this.renderTargetsVertical[s].setSize(i,n),this.separableBlurMaterials[s].uniforms.invSize.value=new Re(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=as.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=as.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);const n=[],s=[];for(let r=1;r<e;r+=2){const o=t[r],l=r+1<e?t[r+1]:0,c=o+l;n.push((r*o+(r+1)*l)/c),s.push(c)}return new Tt({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new Re(.5,.5)},direction:{value:new Re(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:n},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}as.BlurDirectionX=new Re(1,0);as.BlurDirectionY=new Re(0,1);const Vx={uniforms:{tDiffuse:{value:null},uResolution:{value:new Re(1280,720)},uBlurAmount:{value:.75},uTint:{value:new U(1,1,1)},uSaturation:{value:1.1},uContrast:{value:1.05},uVignette:{value:.22}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uBlurAmount;
    uniform vec3 uTint;
    uniform float uSaturation;
    uniform float uContrast;
    uniform float uVignette;
    varying vec2 vUv;

    void main() {
      vec4 baseSample = texture2D(tDiffuse, vUv);
      vec3 col = baseSample.rgb;

      if (uBlurAmount > 0.01) {
        // Keep central tactical combat band (y: 0.24..0.76) razor-sharp; softly blur top/bottom margins
        float distFromBand = max(0.0, abs(vUv.y - 0.5) - 0.23) / 0.27;
        float blurMask = smoothstep(0.0, 1.0, distFromBand) * uBlurAmount;

        if (blurMask > 0.01) {
          vec2 texel = (1.0 / max(uResolution, vec2(1.0))) * (blurMask * 2.2);
          vec3 acc = col * 0.24;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x, texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x, texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x, -texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x, -texel.y)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(texel.x * 1.4, 0.0)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(-texel.x * 1.4, 0.0)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(0.0, texel.y * 1.4)).rgb * 0.095;
          acc += texture2D(tDiffuse, vUv + vec2(0.0, -texel.y * 1.4)).rgb * 0.095;
          col = acc;
        }
      }

      // Linear-space biome color grading & micro-contrast
      col *= uTint;
      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(luma), col, uSaturation);
      col = max(vec3(0.0), (col - 0.18) * uContrast + 0.18);

      // Gentle diorama edge vignette
      vec2 centered = vUv - 0.5;
      float vig = 1.0 - dot(centered, centered) * (uVignette * 1.35);
      col *= clamp(vig, 0.55, 1.0);

      gl_FragColor = vec4(col, baseSample.a);
    }
  `};class Wx{renderer;scene;camera;composer;renderPass;gtaoPass;bloomPass;gradePass;outputPass;preset="HIGH";lastDrawCalls=0;lastTriangles=0;constructor(e,t,i,n,s){this.renderer=e,this.scene=t,this.camera=i;const r=Math.max(1,n),o=Math.max(1,s);this.composer=new Ux(e),this.renderPass=new Hx(t,i);const l=this.renderPass.render.bind(this.renderPass);this.renderPass.render=(c,h,d,u,f)=>{const p=c.info.autoReset;c.info.autoReset=!1,c.info.reset(),l(c,h,d,u,f),this.lastDrawCalls=c.info.render.calls,this.lastTriangles=c.info.render.triangles,c.info.autoReset=p},this.composer.addPass(this.renderPass),this.gtaoPass=new Ti(t,i,r,o),this.gtaoPass.output=Ti.OUTPUT.Default,this.gtaoPass.blendIntensity=.42,this.gtaoPass.updateGtaoMaterial({radius:.44,distanceExponent:1.8,thickness:1,scale:1,samples:12}),this.gtaoPass.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12}),this.composer.addPass(this.gtaoPass),this.bloomPass=new as(new Re(r,o),.34,.32,1.05),this.composer.addPass(this.bloomPass),this.gradePass=new zd(Vx),this.gradePass.uniforms.uResolution.value.set(r,o),this.composer.addPass(this.gradePass),this.outputPass=new zx,this.composer.addPass(this.outputPass)}setPreset(e){this.preset=e,e==="HIGH"?(this.gtaoPass.enabled=!0,this.bloomPass.enabled=!0,this.gradePass.enabled=!0,this.gradePass.uniforms.uBlurAmount.value=.72):e==="MEDIUM"?(this.gtaoPass.enabled=!1,this.bloomPass.enabled=!0,this.gradePass.enabled=!0,this.gradePass.uniforms.uBlurAmount.value=0):(this.gtaoPass.enabled=!1,this.bloomPass.enabled=!1,this.gradePass.enabled=!1)}applyBiomeTuning(e){this.bloomPass.strength=e.bloomStrength,this.bloomPass.radius=e.bloomRadius,this.bloomPass.threshold=e.bloomThreshold,this.gradePass.uniforms.uTint.value.set(...e.gradeTint),this.gradePass.uniforms.uSaturation.value=e.gradeSaturation,this.gradePass.uniforms.uContrast.value=e.gradeContrast,this.gradePass.uniforms.uVignette.value=e.vignetteStrength}setSize(e,t){const i=Math.max(1,e),n=Math.max(1,t);this.composer.setSize(i,n),this.gtaoPass.setSize(i,n),this.bloomPass.resolution.set(i,n),this.gradePass.uniforms.uResolution.value.set(i,n)}render(){if(this.preset==="LOW"){const e=this.renderer.info.autoReset;this.renderer.info.autoReset=!1,this.renderer.info.reset(),this.renderer.render(this.scene,this.camera),this.lastDrawCalls=this.renderer.info.render.calls,this.lastTriangles=this.renderer.info.render.triangles,this.renderer.info.autoReset=e}else this.composer.render()}dispose(){this.gtaoPass.dispose(),this.bloomPass.dispose(),this.composer.dispose()}}function Qo(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(max-width: 820px), (pointer: coarse)").matches}function eo(a){switch(a){case"S":return 0;case"N":return Math.PI;case"E":return Math.PI/2;case"W":return-Math.PI/2}}function Ia(a,e,t=!1){return new Tt({uniforms:{uColor:{value:new Me(a)},uOpacity:{value:e},uTime:{value:0},uStriped:{value:t?1:0}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uTime;
      uniform float uStriped;
      varying vec2 vUv;

      void main() {
        vec2 edge = min(vUv, 1.0 - vUv);
        float minEdge = min(edge.x, edge.y);
        float border = 1.0 - smoothstep(0.035, 0.095, minEdge);
        float pulse = 0.85 + 0.15 * sin(uTime * 4.5);

        float pattern = 1.0;
        if (uStriped > 0.5) {
          float diag = fract((vUv.x + vUv.y) * 5.0 - uTime * 0.8);
          pattern = mix(0.55, 1.15, smoothstep(0.35, 0.55, diag) - smoothstep(0.75, 0.95, diag));
        }

        float fillAlpha = uOpacity * 0.42 * pattern;
        float borderAlpha = min(1.0, uOpacity * 1.45) * pulse;
        float alpha = mix(fillAlpha, borderAlpha, border);
        vec3 col = mix(uColor, uColor * 1.45 + vec3(0.12), border);
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,depthWrite:!1,side:ft})}class Xx{canvas;renderer;scene;camera;postFX;timer;hemiLight;sunLight;rimLight;skyDome;pointLightPool=[];diorama=null;effects;engine=null;unitVisuals=new Map;currentPreset="HIGH";currentBiomePreset;baseSkyColor=1253430;baseSunIntensity=2.35;baseHemiIntensity=.62;envPulseTimer=0;envPulseMode=null;hitStopTimer=0;stageLoadToken=0;stageReadyPromise=Promise.resolve();overlayGroup=new Je;moveOverlayMeshes=[];attackOverlayMeshes=[];aoeOverlayMeshes=[];telegraphMeshes=[];cursorMesh;parabolicArc;compassGroup=new Je;compassArrows=[];compassBaseY=0;isAnimating=!1;animatingSinceMs=0;azimuth=Math.PI*.25;targetAzimuth=Math.PI*.25;polar=.88;targetPolar=.88;distance=18.5;targetDistance=18.5;focusPoint=new U(0,1.2,0);targetFocus=new U(0,1.2,0);trauma=0;shakeTime=0;tapThresholdPx=14;raycaster=new Tp;pointer=new Re(-99,-99);isDraggingOrbit=!1;isDraggingPan=!1;isMultiTouch=!1;lastPinchDist=0;lastPinchMid={x:0,y:0};pointerDownPos={x:0,y:0};pointerDownOnCanvas=!1;activePointerId=null;dragStart={x:0,y:0};hasDragged=!1;keysDown=new Set;hoveredTile=null;hoveredCompass=null;callbacks;elapsed=0;timeScale=1;disposed=!1;tileOverlayGeom=new ui(ke*.88,ke*.88);moveMat;attackMat;aoeMat;telegraphMat;constructor(e,t){this.canvas=e,this.callbacks=t,this.renderer=new vv({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.outputColorSpace=bt,this.renderer.toneMapping=Qa,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Cs,this.scene=new sd,this.scene.background=new Me(1253430),this.scene.fog=new tr(1715522,.013),this.camera=new si(36,window.innerWidth/Math.max(1,window.innerHeight),.2,140),this.skyDome=px(),this.scene.add(this.skyDome),this.hemiLight=new np(12248829,4338210,.62),this.scene.add(this.hemiLight),this.sunLight=new qo(16770746,2.35),this.sunLight.position.set(14,24,13),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.bias=-4e-4,this.sunLight.shadow.normalBias=.018;const i=this.sunLight.shadow.camera;i.near=2,i.far=65,i.left=-16,i.right=16,i.top=16,i.bottom=-16,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.rimLight=new qo(8246268,.72),this.rimLight.position.set(-15,11,-14),this.rimLight.castShadow=!1,this.scene.add(this.rimLight);for(let o=0;o<3;o++){const l=new Md(16777215,0,11,1.5);l.castShadow=!1,this.scene.add(l),this.pointLightPool.push({light:l,life:0,maxLife:0,peakIntensity:0})}this.postFX=new Wx(this.renderer,this.scene,this.camera,window.innerWidth,window.innerHeight),this.currentBiomePreset=xh(this.scene,this.renderer,{sunLight:this.sunLight,rimLight:this.rimLight,hemiLight:this.hemiLight,skyDome:this.skyDome},"forest"),this.postFX.applyBiomeTuning(this.currentBiomePreset),this.tileOverlayGeom.rotateX(-Math.PI/2),this.moveMat=Ia(3718648,.62,!1),this.attackMat=Ia(16007006,.68,!1),this.aoeMat=Ia(16436245,.76,!1),this.telegraphMat=Ia(16733440,.8,!0),this.scene.add(this.overlayGroup),this.cursorMesh=new Ie(new ni(ke*.36,ke*.47,4),new pt({color:16777215,side:ft,transparent:!0,opacity:.92,depthWrite:!1})),this.cursorMesh.rotation.x=-Math.PI/2,this.cursorMesh.rotation.z=Math.PI/4,this.cursorMesh.visible=!1,this.scene.add(this.cursorMesh);const n=Array.from({length:25},()=>new U),s=new wt().setFromPoints(n),r=new Tl({color:16436245,transparent:!0,opacity:.95});this.parabolicArc=new nr(s,r),this.parabolicArc.visible=!1,this.scene.add(this.parabolicArc),this.buildFacingCompass(),this.scene.add(this.compassGroup),this.effects=new Ex((o,l)=>this.sampleFloorHeight(o,l),(o,l,c,h)=>this.flashPointLight(o,l,c,h),(o,l)=>{this.envPulseMode=o,this.envPulseTimer=l/1e3}),this.scene.add(this.effects.group),Object.assign(window,{renderer:this.renderer,scene:this.scene,__coaDebug:{setPreset:o=>this.setGraphicsPreset(o),whenReady:()=>this.whenAssetsReady(),getStats:()=>this.getDebugStats()}}),this.timer=new Sd,this.timer.connect(document),Qo()?this.setGraphicsPreset("MEDIUM"):this.setGraphicsPreset("HIGH"),this.bindEvents(),this.startLoop()}getDebugStats(){const e=Array.from(this.unitVisuals.values()).map(t=>({id:t.id,isGLTF:t.rig.isGLTF,animState:t.animState,posY:Number(t.rig.root.position.y.toFixed(3)),rotY:Number(t.rig.root.rotation.y.toFixed(3))}));return{stageId:this.engine?.stage.id??null,biome:this.engine?.stage.biome??null,preset:this.currentPreset,drawCalls:this.postFX.lastDrawCalls,triangles:this.postFX.lastTriangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,gltfUnits:e.filter(t=>t.isGLTF).length,totalUnits:e.length,units:e}}whenAssetsReady(){return this.stageReadyPromise}buildFacingCompass(){const e=[{facing:"N",offset:[0,-1.08],rotY:Math.PI},{facing:"S",offset:[0,1.08],rotY:0},{facing:"E",offset:[1.08,0],rotY:Math.PI/2},{facing:"W",offset:[-1.08,0],rotY:-Math.PI/2}],t=new Hs(.3,.56,4);t.rotateX(Math.PI/2);const i=new Cn(.68,12,10),n=new pt({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1});for(const s of e){const r=new xt({color:16638023,emissive:16096779,emissiveIntensity:1.9,roughness:.2}),o=new Ie(t,r);o.position.set(s.offset[0],.35,s.offset[1]),o.rotation.y=s.rotY,o.userData={compassFacing:s.facing};const l=new Ie(i,n);l.position.set(s.offset[0],.42,s.offset[1]),l.userData={compassFacing:s.facing},l.layers.set(1),this.compassGroup.add(o),this.compassGroup.add(l),this.compassArrows.push({facing:s.facing,mesh:o,hitMesh:l,mat:r})}this.compassGroup.visible=!1}flashPointLight(e,t,i,n){let s=this.pointLightPool.find(r=>r.life>=r.maxLife||r.light.intensity<=.01);s||(s=this.pointLightPool.reduce((r,o)=>r.life/Math.max(.01,r.maxLife)>o.life/Math.max(.01,o.maxLife)?r:o)),s.light.position.copy(e),s.light.color.setHex(t),s.peakIntensity=i,s.light.intensity=i,s.life=0,s.maxLife=Math.max(.15,n)}sampleFloorHeight(e,t){if(!this.engine)return 0;const i=Math.round(e/ke+(this.engine.stage.cols-1)/2),n=Math.round(t/ke+(this.engine.stage.rows-1)/2),s=this.engine.getTile(i,n);return s?s.height*Li:0}rebuildDioramaWithAssets(e,t){this.diorama&&(this.scene.remove(this.diorama.group),this.diorama.dispose(),this.diorama=null),this.diorama=new wx(e.stage,e.tiles,t),this.diorama.setParticleDensity(this.currentPreset==="LOW"?.4:this.currentPreset==="MEDIUM"?.75:1),this.scene.add(this.diorama.group);for(const i of e.tiles.values())i.chest?.opened&&this.diorama.markChestOpened(i.chest.id)}loadStage(e){const t=++this.stageLoadToken;this.engine=e,this.clearHighlights(),this.showFacingCompass(null),this.setParabolicArc(null,null),this.currentBiomePreset=xh(this.scene,this.renderer,{sunLight:this.sunLight,rimLight:this.rimLight,hemiLight:this.hemiLight,skyDome:this.skyDome},e.stage.biome),this.baseSkyColor=this.currentBiomePreset.skyColor,this.baseSunIntensity=this.currentBiomePreset.sunIntensity,this.baseHemiIntensity=this.currentBiomePreset.hemiIntensity,this.postFX.applyBiomeTuning(this.currentBiomePreset);for(const s of this.unitVisuals.values())this.scene.remove(s.rig.root),s.rig.dispose();this.unitVisuals.clear();const i=e.units.map(s=>s.jobId),n=hx(e.stage,i);this.rebuildDioramaWithAssets(e,n);for(const s of e.units){const r=s.hp>0?"idle":"dead",o=n.characters.get(s.jobId)??null,l=Ah(o,s.jobId,s.team,!!s.isBoss,r),c=this.getUnitAnchorWorldPos(s);l.root.position.copy(c),l.root.rotation.y=eo(s.facing),this.scene.add(l.root),this.unitVisuals.set(s.id,{id:s.id,rig:l,col:s.col,row:s.row,facing:s.facing,worldPos:c.clone(),animState:r,lastAppliedState:r,animTimer:0,animDuration:0,skyDiveOffsetY:0,isDead:s.hp<=0})}this.stageReadyPromise=cx(e.stage,i).then(s=>{if(!(this.disposed||t!==this.stageLoadToken||this.engine!==e)){(s.terrain.size>n.terrain.size||s.props.size>n.props.size)&&this.rebuildDioramaWithAssets(e,s);for(const r of e.units){const o=this.unitVisuals.get(r.id),l=s.characters.get(r.jobId);if(!o||!l||o.rig.isGLTF)continue;const c=o.rig.root.position.clone(),h=o.rig.root.rotation.y,d=e.activeUnitId===r.id&&r.hp>0,u=Ah(l,r.jobId,r.team,!!r.isBoss,o.animState);u.root.position.copy(c),u.root.rotation.y=h,u.setActiveHighlight(d),this.scene.remove(o.rig.root),o.rig.dispose(),o.rig=u,o.lastAppliedState=o.animState,this.scene.add(u.root)}}}),this.targetFocus.set(0,1.35,0),this.focusPoint.copy(this.targetFocus),this.targetDistance=e.stage.cols>=14?24.5:21.5,this.distance=this.targetDistance}getUnitAnchorWorldPos(e){if(!this.engine)return new U;const i=this.engine.getTile(e.col,e.row)?.height??1,n=Ot(e.col,e.row,i,this.engine.stage.cols,this.engine.stage.rows);return e.footprint===2&&(n.x+=ke*.5,n.z+=ke*.5),n}syncFromEngine(e){this.engine=e;for(const t of e.units){const i=this.unitVisuals.get(t.id);if(!i)continue;i.col=t.col,i.row=t.row,i.facing=t.facing,i.worldPos.copy(this.getUnitAnchorWorldPos(t)),i.isDead=t.hp<=0,i.isDead?i.animState="dead":i.animState==="dead"&&(i.animState="idle");const n=e.activeUnitId===t.id&&t.hp>0;i.rig.setActiveHighlight(n)}for(const t of e.tiles.values())t.chest?.opened&&this.diorama&&this.diorama.markChestOpened(t.chest.id);this.refreshPersistentTileEffects(e)}refreshPersistentTileEffects(e){for(const i of this.telegraphMeshes)this.overlayGroup.remove(i);this.telegraphMeshes=[];const t=new Map;for(const i of e.units)if(i.hp>0&&i.pendingMeteor){const n=i.pendingMeteor;for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){const o=n.centerCol+s,l=n.centerRow+r;e.getTile(o,l)&&t.set(kt(o,l),{col:o,row:l,isMeteor:!0})}}for(const i of e.tiles.values())if((i.burningTurns??0)>0){const n=kt(i.col,i.row);t.has(n)||t.set(n,{col:i.col,row:i.row,isMeteor:!1})}for(const i of t.values()){const n=e.getTile(i.col,i.row);if(!n)continue;const s=Ot(n.col,n.row,n.height,e.stage.cols,e.stage.rows),r=new Ie(this.tileOverlayGeom,this.telegraphMat);r.position.set(s.x,s.y+.04,s.z),this.overlayGroup.add(r),this.telegraphMeshes.push(r)}}clearHighlights(){for(const e of[...this.moveOverlayMeshes,...this.attackOverlayMeshes,...this.aoeOverlayMeshes])this.overlayGroup.remove(e);this.moveOverlayMeshes=[],this.attackOverlayMeshes=[],this.aoeOverlayMeshes=[]}setTileListHighlight(e,t,i,n){for(const s of t)this.overlayGroup.remove(s);if(t.length=0,!!this.engine)for(const s of e){const r=this.engine.getTile(s.col,s.row);if(!r)continue;const o=Ot(r.col,r.row,r.height,this.engine.stage.cols,this.engine.stage.rows),l=new Ie(this.tileOverlayGeom,i);l.position.set(o.x,o.y+n,o.z),this.overlayGroup.add(l),t.push(l)}}setMoveTiles(e){this.setTileListHighlight(e,this.moveOverlayMeshes,this.moveMat,.025)}setAttackTiles(e){this.setTileListHighlight(e,this.attackOverlayMeshes,this.attackMat,.03)}setAoeTiles(e){this.setTileListHighlight(e,this.aoeOverlayMeshes,this.aoeMat,.038)}setParabolicArc(e,t,i=16436245){if(!e||!t||!this.engine){this.parabolicArc.visible=!1;return}const n=this.engine.getTile(e.col,e.row),s=this.engine.getTile(t.col,t.row);if(!n||!s){this.parabolicArc.visible=!1;return}const r=Ot(e.col,e.row,n.height,this.engine.stage.cols,this.engine.stage.rows),o=Ot(t.col,t.row,s.height,this.engine.stage.cols,this.engine.stage.rows);r.y+=1.05,o.y+=.9;const l=r.distanceTo(o),c=Math.max(.85,l*.35),h=[];for(let d=0;d<=24;d++){const u=d/24,f=new U().lerpVectors(r,o,u);f.y+=Math.sin(u*Math.PI)*c,h.push(f)}this.parabolicArc.geometry.setFromPoints(h),this.parabolicArc.material.color.setHex(i),this.parabolicArc.visible=!0}showFacingCompass(e){if(!e||!this.engine){this.compassGroup.visible=!1,this.hoveredCompass=null;for(const i of this.compassArrows)i.mat.emissiveIntensity=1.5,i.mesh.scale.setScalar(1);return}const t=this.getUnitAnchorWorldPos(e);this.compassBaseY=t.y,this.compassGroup.position.copy(t),this.compassGroup.visible=!0,this.hoveredCompass=null;for(const i of this.compassArrows){const n=i.facing===e.facing;i.mat.emissiveIntensity=n?2.5:1.5,i.mesh.scale.setScalar(n?1.18:1)}this.compassGroup.updateMatrixWorld(!0)}focusOnTile(e,t){if(!this.engine)return;const n=this.engine.getTile(e,t)?.height??1,s=Ot(e,t,n,this.engine.stage.cols,this.engine.stage.rows);this.targetFocus.set(s.x,s.y+.85,s.z)}getGraphicsPreset(){return this.currentPreset}setGraphicsPreset(e){this.currentPreset=e;const t=window.devicePixelRatio||1,i=Qo();let n=Math.min(t,2),s=2048,r=1;e==="LOW"?(n=1,s=1024,r=.4):e==="MEDIUM"?(n=i?Math.min(t,1.35):Math.min(t,1.5),s=i?1024:2048,r=.75):(n=Math.min(t,2),s=i?2048:4096,r=1),this.renderer.setPixelRatio(n),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.postFX.setPreset(e),this.postFX.setSize(window.innerWidth,window.innerHeight),this.sunLight.shadow.mapSize.x!==s&&(this.sunLight.shadow.mapSize.set(s,s),this.sunLight.shadow.map?.dispose(),this.sunLight.shadow.map=null),this.diorama?.setParticleDensity(r)}rotate90(e){this.targetAzimuth+=e*(Math.PI/2)}setTimeScale(e){this.timeScale=e}addTrauma(e){this.trauma=Math.min(1,this.trauma+e)}async animateUnitMovePath(e,t,i){const n=this.unitVisuals.get(e),s=this.engine;if(!(!n||!s||t.length<=1)){this.isAnimating=!0,this.animatingSinceMs=performance.now();try{n.animState="walk";for(let r=1;r<t.length&&!this.disposed;r++){const o=t[r-1],l=t[r],c=s.getTile(o.col,o.row),h=s.getTile(l.col,l.row);if(!c||!h)continue;const d=Ot(o.col,o.row,c.height,s.stage.cols,s.stage.rows),u=Ot(l.col,l.row,h.height,s.stage.cols,s.stage.rows);s.getUnit(e)?.footprint===2&&(d.x+=ke*.5,d.z+=ke*.5,u.x+=ke*.5,u.z+=ke*.5);const p=l.col-o.col,v=l.row-o.row;(p!==0||v!==0)&&(n.facing=Math.abs(p)>=Math.abs(v)?p>0?"E":"W":v>0?"S":"N");const g=Math.abs(h.height-c.height)>0?.48:.14,m=165/this.timeScale,x=performance.now();i?.(l.col,l.row),await new Promise(S=>{const M=()=>{if(this.disposed){S();return}const y=Math.min(1,(performance.now()-x)/m);n.worldPos.lerpVectors(d,u,y),n.worldPos.y+=Math.sin(y*Math.PI)*g,y>=1?(n.col=l.col,n.row=l.row,S()):requestAnimationFrame(M)};requestAnimationFrame(M)})}}finally{n.isDead||(n.animState="idle"),this.isAnimating=!1,this.animatingSinceMs=0}}}async animateUnitSkill(e,t,i,n,s){const r=this.engine;if(!r)return;const o=this.unitVisuals.get(e);this.isAnimating=!0,this.animatingSinceMs=performance.now();try{const l=r.getTile(i,n),c=Ot(i,n,l?.height??1,r.stage.cols,r.stage.rows),h=s.map(f=>{const p=r.getTile(f.col,f.row);return Ot(f.col,f.row,p?.height??1,r.stage.cols,r.stage.rows)}),d=o?o.worldPos.clone():c.clone();if(o){if(i!==o.col||n!==o.row){const f=i-o.col,p=n-o.row;o.facing=Math.abs(f)>=Math.abs(p)?f>0?"E":"W":p>0?"S":"N"}if(t.vfxType==="sky_dive"){o.rig.bodyPivot.scale.set(1.16,.8,1.16),await new Promise(x=>setTimeout(x,120/this.timeScale)),this.effects.spawnSkyDiveWindRings(d),o.animState="jump_up";const f=220/this.timeScale,p=performance.now();await new Promise(x=>{const S=()=>{if(this.disposed){x();return}const M=Math.min(1,(performance.now()-p)/f);o.skyDiveOffsetY=M*9,M>=1?x():requestAnimationFrame(S)};requestAnimationFrame(S)}),o.animState="jump_down";const v=200/this.timeScale,g=performance.now(),m=o.worldPos.clone();await new Promise(x=>{const S=()=>{if(this.disposed){o.skyDiveOffsetY=0,x();return}const M=Math.min(1,(performance.now()-g)/v);o.worldPos.lerpVectors(m,c,M),o.skyDiveOffsetY=(1-M)*9,M>=1?(o.skyDiveOffsetY=0,x()):requestAnimationFrame(S)};requestAnimationFrame(S)})}else o.animState=t.vfxType==="dual_strike"?"dual":t.isBow?"bow":t.isMagic||t.isHeal||t.isBuff||t.vfxType==="judgment_blade"?"cast":"slash",o.animTimer=0,o.animDuration=.48,o.rig.setState(o.animState,!0),o.lastAppliedState=o.animState,await new Promise(f=>setTimeout(f,220/this.timeScale))}const u=o?eo(o.facing):0;try{this.effects.playSkillVFX(t,d,c,h,u)}catch(f){console.error("[BattlefieldTactics3D] VFX error during skill animation:",f)}t.vfxType==="apocalypse_meteor"&&(this.hitStopTimer=.09),this.addTrauma(t.aoeRadius>0||t.vfxType==="sky_dive"?.55:.25),await new Promise(f=>setTimeout(f,290/this.timeScale))}finally{if(o){o.skyDiveOffsetY=0,o.rig.bodyPivot.scale.set(1,1,1),o.isDead||(o.animState="idle");const l=this.engine?.getUnit(e);l&&o.worldPos.copy(this.getUnitAnchorWorldPos(l))}this.isAnimating=!1,this.animatingSinceMs=0}}triggerHitFeedback(e,t,i,n){const s=this.unitVisuals.get(e);if(s){if(n){s.isDead=!0,s.animState="dead",s.lastAppliedState="dead",s.rig.setState("dead",!0),s.rig.triggerFlash(16007006,.24),this.effects.spawnVoxelBurst(s.worldPos,28,[9741240,16007006,16707722],5.2,6,1.2),this.addTrauma(.6);return}s.animState=i?"block":"hit",s.lastAppliedState=s.animState,s.rig.setState(s.animState,!0),s.animTimer=0,s.animDuration=.35,t?(s.rig.triggerFlash(16707722,.22),this.hitStopTimer=Math.max(this.hitStopTimer,.055),this.effects.spawnVoxelBurst(s.worldPos,22,[16436245,16347926,16777215],5,5.5,1.15),this.addTrauma(.75)):i?(s.rig.triggerFlash(6333946,.16),this.effects.spawnVoxelBurst(s.worldPos,8,[6333946,16777215],2.8,3,.85)):s.rig.triggerFlash(16777215,.15)}}getUnitTopScreenPosition(e){const t=this.unitVisuals.get(e);if(!t)return null;const i=t.worldPos.clone();i.y+=t.rig.heightWorld+.32+t.skyDiveOffsetY,i.project(this.camera);const n=this.canvas.clientWidth||window.innerWidth,s=this.canvas.clientHeight||window.innerHeight;return{unitId:e,x:(i.x*.5+.5)*n,y:(-i.y*.5+.5)*s,visible:i.z>=-1&&i.z<=1}}bindEvents(){const e=()=>{if(this.disposed)return;const n=window.innerWidth,s=Math.max(1,window.innerHeight);this.camera.aspect=n/s,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,s,!1),this.postFX.setSize(n,s)};window.addEventListener("resize",e);const t=n=>{const s=n.key.toLowerCase();this.keysDown.add(s),s==="q"&&this.rotate90(-1),s==="e"&&this.rotate90(1)},i=n=>{this.keysDown.delete(n.key.toLowerCase())};window.addEventListener("keydown",t),window.addEventListener("keyup",i),this.canvas.addEventListener("contextmenu",n=>n.preventDefault()),this.canvas.addEventListener("pointerdown",n=>{this.isMultiTouch||(this.activePointerId=n.pointerId,this.pointerDownOnCanvas=!0,this.pointerDownPos={x:n.clientX,y:n.clientY},this.dragStart={x:n.clientX,y:n.clientY},this.hasDragged=!1,n.button===2||n.button===1?(this.isDraggingPan=n.button===2,this.isDraggingOrbit=n.button===1):(n.button===0||n.pointerType==="touch")&&(this.isDraggingOrbit=!0))}),window.addEventListener("pointermove",n=>{if(this.isMultiTouch||this.pointerDownOnCanvas&&this.activePointerId!==null&&n.pointerId!==this.activePointerId||!this.isDraggingOrbit&&!this.isDraggingPan&&n.target!==this.canvas)return;const s=this.canvas.getBoundingClientRect();this.pointer.x=(n.clientX-s.left)/s.width*2-1,this.pointer.y=-((n.clientY-s.top)/s.height)*2+1;const r=Math.hypot(n.clientX-this.pointerDownPos.x,n.clientY-this.pointerDownPos.y);if(this.isDraggingOrbit){if(r>=this.tapThresholdPx)if(!this.hasDragged)this.hasDragged=!0,this.dragStart={x:n.clientX,y:n.clientY};else{const o=n.clientX-this.dragStart.x,l=n.clientY-this.dragStart.y;this.targetAzimuth-=o*.008,this.targetPolar=wn.clamp(this.targetPolar-l*.006,.42,1.28),this.dragStart={x:n.clientX,y:n.clientY}}}else if(this.isDraggingPan){r>=this.tapThresholdPx&&(this.hasDragged=!0);const o=n.clientX-this.dragStart.x,l=n.clientY-this.dragStart.y,c=new U(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),h=new U(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));this.targetFocus.addScaledVector(c,-o*.02),this.targetFocus.addScaledVector(h,l*.02),this.dragStart={x:n.clientX,y:n.clientY}}this.updateRaycastHover()}),window.addEventListener("pointerup",n=>{if(this.activePointerId!==null&&n.pointerId!==this.activePointerId)return;if(this.isMultiTouch){this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1;return}const s=Math.hypot(n.clientX-this.pointerDownPos.x,n.clientY-this.pointerDownPos.y),r=n.button===0||n.pointerType==="touch",o=this.pointerDownOnCanvas&&!this.hasDragged&&s<this.tapThresholdPx&&r&&n.target===this.canvas;if(this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1,o){const l=this.canvas.getBoundingClientRect();if(this.pointer.x=(n.clientX-l.left)/l.width*2-1,this.pointer.y=-((n.clientY-l.top)/l.height)*2+1,this.updateRaycastHover(),this.compassGroup.visible&&this.hoveredCompass){this.callbacks.onFacingClick?.(this.hoveredCompass);return}this.hoveredTile&&this.callbacks.onTileClick?.(this.hoveredTile.col,this.hoveredTile.row)}}),window.addEventListener("pointercancel",n=>{this.activePointerId!==null&&n.pointerId!==this.activePointerId||(this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1)}),this.canvas.addEventListener("touchstart",n=>{if(n.touches.length>=2){n.preventDefault(),this.isMultiTouch=!0,this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1;const s=n.touches[0],r=n.touches[1];this.lastPinchDist=Math.hypot(r.clientX-s.clientX,r.clientY-s.clientY),this.lastPinchMid={x:(s.clientX+r.clientX)*.5,y:(s.clientY+r.clientY)*.5}}},{passive:!1}),this.canvas.addEventListener("touchmove",n=>{if(n.touches.length===2){n.preventDefault(),this.isMultiTouch=!0;const s=n.touches[0],r=n.touches[1],o=Math.hypot(r.clientX-s.clientX,r.clientY-s.clientY),l={x:(s.clientX+r.clientX)*.5,y:(s.clientY+r.clientY)*.5},c=o-this.lastPinchDist;this.targetDistance=wn.clamp(this.targetDistance-c*.04,9.5,32);const h=l.x-this.lastPinchMid.x,d=l.y-this.lastPinchMid.y,u=new U(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),f=new U(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));this.targetFocus.addScaledVector(u,-h*.025),this.targetFocus.addScaledVector(f,d*.025),this.lastPinchDist=o,this.lastPinchMid=l}},{passive:!1}),this.canvas.addEventListener("touchend",n=>{n.touches.length<2&&setTimeout(()=>{this.isMultiTouch=!1},60)}),this.canvas.addEventListener("wheel",n=>{n.preventDefault(),this.targetDistance=wn.clamp(this.targetDistance+n.deltaY*.012,9.5,32)},{passive:!1})}updateRaycastHover(){if(this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.layers.set(1),this.compassGroup.visible){const t=this.raycaster.intersectObjects(this.compassArrows.map(i=>i.hitMesh),!1);if(t.length>0){const i=t[0].object.userData.compassFacing;this.hoveredCompass!==i&&(this.hoveredCompass=i,this.callbacks.onFacingHover?.(i));for(const n of this.compassArrows)n.mat.emissiveIntensity=n.facing===i?3.2:1.5,n.mesh.scale.setScalar(n.facing===i?1.38:1);this.raycaster.layers.set(0);return}else if(this.hoveredCompass!==null){this.hoveredCompass=null,this.callbacks.onFacingHover?.(null);for(const i of this.compassArrows)i.mat.emissiveIntensity=1.5,i.mesh.scale.setScalar(1)}}if(!this.diorama||!this.engine){this.raycaster.layers.set(0);return}const e=this.raycaster.intersectObjects(this.diorama.tileHitMeshes,!1);if(this.raycaster.layers.set(0),e.length>0){const t=e[0].object.userData,i=Ot(t.col,t.row,t.height,this.engine.stage.cols,this.engine.stage.rows);this.cursorMesh.position.set(i.x,i.y+.05,i.z),this.cursorMesh.visible=!0,(!this.hoveredTile||this.hoveredTile.col!==t.col||this.hoveredTile.row!==t.row)&&(this.hoveredTile={col:t.col,row:t.row},this.callbacks.onTileHover?.(t.col,t.row))}else this.cursorMesh.visible=!1,this.hoveredTile!==null&&(this.hoveredTile=null,this.callbacks.onTileHover?.(null,null))}startLoop(){this.renderer.setAnimationLoop(()=>{if(this.disposed)return;this.timer.update();const e=Math.min(Math.max(this.timer.getDelta(),0),.1),t=performance.now();this.isAnimating&&this.animatingSinceMs>0&&t-this.animatingSinceMs>4e3&&(console.warn("[BattlefieldTactics3D] Watchdog released stuck animation lock."),this.isAnimating=!1,this.animatingSinceMs=0),this.callbacks.onFrameTick?.(t,e),this.hitStopTimer>0&&(this.hitStopTimer=Math.max(0,this.hitStopTimer-e));const i=this.hitStopTimer>0?.08:this.timeScale,n=e*i;this.elapsed+=n,this.envPulseTimer>0&&(this.envPulseTimer=Math.max(0,this.envPulseTimer-e),this.envPulseMode==="storm_dark"?(this.sunLight.intensity=this.baseSunIntensity*.22,this.hemiLight.intensity=this.baseHemiIntensity*.35):this.envPulseMode==="blood_sky"&&(this.scene.background.setHex(4851720),this.scene.fog.color.setHex(4851720)),this.envPulseTimer===0&&(this.envPulseMode=null,this.sunLight.intensity=this.baseSunIntensity,this.hemiLight.intensity=this.baseHemiIntensity,this.scene.background.setHex(this.baseSkyColor),this.scene.fog.color.setHex(this.currentBiomePreset.fogColor)));const s=9*e,r=new U(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),o=new U(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));(this.keysDown.has("w")||this.keysDown.has("arrowup"))&&this.targetFocus.addScaledVector(o,s),(this.keysDown.has("s")||this.keysDown.has("arrowdown"))&&this.targetFocus.addScaledVector(o,-s),(this.keysDown.has("d")||this.keysDown.has("arrowright"))&&this.targetFocus.addScaledVector(r,s),(this.keysDown.has("a")||this.keysDown.has("arrowleft"))&&this.targetFocus.addScaledVector(r,-s),this.targetFocus.x=wn.clamp(this.targetFocus.x,-12,12),this.targetFocus.z=wn.clamp(this.targetFocus.z,-12,12);const l=1-Math.exp(-10*e);this.azimuth+=(this.targetAzimuth-this.azimuth)*l,this.polar+=(this.targetPolar-this.polar)*l,this.distance+=(this.targetDistance-this.distance)*l,this.focusPoint.lerp(this.targetFocus,l),this.trauma=Math.max(0,this.trauma-1.65*e),this.shakeTime+=e*34;const c=this.trauma*this.trauma,h=new U(Math.sin(this.shakeTime*1.7)*.28*c,Math.sin(this.shakeTime*2.3)*.22*c,Math.cos(this.shakeTime*1.3)*.28*c),d=Math.sin(this.polar),u=Math.cos(this.polar);this.camera.position.set(this.focusPoint.x+this.distance*d*Math.sin(this.azimuth),this.focusPoint.y+this.distance*u,this.focusPoint.z+this.distance*d*Math.cos(this.azimuth)),this.camera.position.add(h),this.camera.lookAt(this.focusPoint);const f=.5+.5*Math.sin(this.elapsed*4.5);this.moveMat.uniforms.uTime.value=this.elapsed,this.attackMat.uniforms.uTime.value=this.elapsed,this.aoeMat.uniforms.uTime.value=this.elapsed,this.telegraphMat.uniforms.uTime.value=this.elapsed,this.cursorMesh.scale.setScalar(.96+f*.08),this.compassGroup.visible&&(this.compassGroup.position.y=this.compassBaseY+Math.sin(this.elapsed*5)*.04);for(const p of this.pointLightPool)if(p.light.intensity>0){p.life+=e;const v=Math.min(1,p.life/p.maxLife);p.light.intensity=p.peakIntensity*(1-v),v>=1&&(p.light.intensity=0)}this.diorama?.update(this.elapsed,n),this.effects.update(n);for(const p of this.unitVisuals.values()){p.rig.root.position.lerp(p.worldPos,1-Math.exp(-16*e)),p.rig.root.position.y+=p.skyDiveOffsetY;let g=eo(p.facing)-p.rig.root.rotation.y;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;p.rig.root.rotation.y+=g*(1-Math.exp(-14*e)),p.animDuration>0&&(p.animTimer+=n,p.animTimer>=p.animDuration&&!p.isDead&&(p.animState="idle",p.animDuration=0)),p.lastAppliedState!==p.animState&&(p.rig.setState(p.animState),p.lastAppliedState=p.animState);const m=p.animDuration>0?p.animTimer/p.animDuration:0;p.rig.update(n,this.elapsed,m)}if(this.callbacks.onUnitProjections&&this.engine){const p=[];for(const v of this.engine.units){const g=this.getUnitTopScreenPosition(v.id);g&&p.push(g)}this.callbacks.onUnitProjections(p)}this.postFX.render()})}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),this.timer.dispose(),this.diorama?.dispose();for(const e of this.unitVisuals.values())e.rig.dispose();this.unitVisuals.clear(),this.postFX.dispose(),fx(),this.moveMat.dispose(),this.attackMat.dispose(),this.aoeMat.dispose(),this.telegraphMat.dispose(),this.tileOverlayGeom.dispose(),this.renderer.dispose()}}class qx{modalEl;bodyEl;goldEl;campaign;activeTab="campaign";selectedHeroUid=null;toastMessage="";onLaunchStage;onClose;constructor(e,t,i){this.campaign=e,this.onLaunchStage=t,this.onClose=i,this.modalEl=document.getElementById("barracks-modal"),this.bodyEl=document.getElementById("barracks-body"),this.goldEl=document.getElementById("barracks-gold"),document.getElementById("btn-close-barracks")?.addEventListener("click",()=>{this.hide(),this.onClose()}),this.modalEl.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{this.activeTab=n.dataset.tab??"campaign",this.modalEl.querySelectorAll(".tab-btn").forEach(s=>s.classList.remove("active")),n.classList.add("active"),this.render()})})}show(e){e&&(this.activeTab=e,this.modalEl.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.tab===e)})),this.modalEl.classList.remove("hidden"),this.render()}hide(){this.modalEl.classList.add("hidden")}isOpen(){return!this.modalEl.classList.contains("hidden")}setToast(e){this.toastMessage=e,this.render()}render(){const e=this.campaign.getData();this.goldEl.textContent=`🪙 ${e.gold} Ouro`,(!this.selectedHeroUid||!e.roster.some(i=>i.uid===this.selectedHeroUid))&&(this.selectedHeroUid=e.roster[0]?.uid??null);const t=this.toastMessage?`<div style="margin-bottom:12px;padding:8px 12px;border-radius:6px;background:rgba(217,119,6,0.22);border:1px solid #f59e0b;color:#fde68a;font-size:12px;font-weight:600;">${this.toastMessage}</div>`:"";this.activeTab==="campaign"?(this.bodyEl.innerHTML=t+this.renderCampaignTab(),this.bindCampaignEvents()):this.activeTab==="squad"?(this.bodyEl.innerHTML=t+this.renderSquadTab(),this.bindSquadEvents()):(this.bodyEl.innerHTML=t+this.renderShopTab(),this.bindShopEvents())}renderCampaignTab(){const e=this.campaign.getData();return`<div class="grid-2">${En.map(i=>{const n=i.id<=e.unlockedStage,s=e.completedStages.includes(i.id),r=s?'<span class="pill-tag cleared">✔ Concluída (Rejogável)</span>':n?'<span class="pill-tag">⚔️ Disponível</span>':'<span class="pill-tag">🔒 Bloqueada</span>';return`
        <div class="card-box ${n?"":"locked"}">
          <div class="card-row">
            <span class="stage-kicker">FASE ${i.id} • ${i.biome.toUpperCase()}</span>
            ${r}
          </div>
          <h3>${i.name}</h3>
          <div class="card-meta">${i.subtitle}</div>
          <div class="card-meta">${i.description}</div>
          <div class="card-row">
            <span>👹 Chefe: <strong>${i.bossTitle}</strong></span>
          </div>
          <div class="card-row">
            <span>Recompensa: <strong>🪙 ${i.goldReward}</strong> • <strong>⭐ ${i.jpReward} JP</strong></span>
            <button class="hud-btn ${n?"hud-btn-primary":""}" data-play-stage="${i.id}" ${n?"":"disabled"}>
              ${s?"🔁 Rejogar Fase":n?"⚔️ Iniciar Batalha":"🔒 Bloqueada"}
            </button>
          </div>
        </div>
      `}).join("")}</div>`}bindCampaignEvents(){this.bodyEl.querySelectorAll("[data-play-stage]").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.playStage);this.campaign.selectStage(t)&&(this.hide(),this.onLaunchStage(t))})})}renderSquadTab(){const e=this.campaign.getData(),t=e.roster.filter(d=>d.deployed).length,i=e.roster.map(d=>{const u=Gt[d.jobId];return`
          <div class="card-box" style="cursor:pointer;border-color:${d.uid===this.selectedHeroUid?"#fde047":"rgba(148,163,184,0.28)"}" data-select-hero="${d.uid}">
            <div class="card-row">
              <strong>${u.icon} ${d.name} <small style="color:#94a3b8">(Nv.${d.level})</small></strong>
              <button class="hud-btn" data-toggle-deploy="${d.uid}">${d.deployed?"✔ Em Campo":"Reserva"}</button>
            </div>
            <div class="card-meta">${u.name} • ⭐ ${d.jp} JP • EXP ${d.exp}/${d.level*100}</div>
          </div>
        `}).join(""),n=e.roster.find(d=>d.uid===this.selectedHeroUid)??e.roster[0],s=Gt[n.jobId],r=Ph(n),o=s.skills.map(d=>{const u=n.unlockedSkills.includes(d.id)||d.isBasic;return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${d.name}</strong> <small style="color:#60a5fa">(${d.mpCost} MP)</small>
              <div class="card-meta">${d.description}</div>
            </div>
            ${u?'<span class="pill-tag cleared">Desbloqueada</span>':`<button class="hud-btn hud-btn-gold" data-unlock-skill="${d.id}" ${n.jp>=d.jpCost?"":"disabled"}>⭐ ${d.jpCost} JP</button>`}
          </div>
        `}).join(""),l=s.passivePool.map(d=>{const u=el[d],f=n.passiveUpgrades.includes(d);return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${u.name}</strong>
              <div class="card-meta">${u.description}</div>
            </div>
            ${f?'<span class="pill-tag cleared">Ativa</span>':`<button class="hud-btn hud-btn-gold" data-unlock-passive="${d}" ${n.jp>=u.jpCost?"":"disabled"}>⭐ ${u.jpCost} JP</button>`}
          </div>
        `}).join(""),h=[{slot:"weapon",label:"Arma"},{slot:"shield",label:"Escudo"},{slot:"armor",label:"Armadura"},{slot:"accessory",label:"Acessório"}].map(({slot:d,label:u})=>{const f=Zi(n.equipment[d]),p=e.inventory.map((m,x)=>({eq:Zi(m),idx:x})).filter(m=>m.eq&&m.eq.slot===d&&(!m.eq.allowedJobs||m.eq.allowedJobs.includes(n.jobId))),v=Array.from(new Map(p.map(m=>[m.eq.id,m.eq])).values()),g=v.map(m=>`<option value="${m.id}">${m.name} (Nv.${m.tier})</option>`).join("");return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${u}:</strong> ${f?`<span style="color:#fde68a">${f.name}</span>`:'<span style="color:#64748b">Vazio</span>'}
              <div class="card-meta">${f?f.description:"Selecione um item do inventário"}</div>
            </div>
            <div style="display:flex;gap:4px;align-items:center;">
              ${v.length>0?`<select data-equip-select="${d}" style="background:#0f172a;color:#f1f5f9;border:1px solid #475569;border-radius:4px;padding:4px;font-size:11px;">
                       <option value="">Equipar...</option>${g}
                     </select>`:""}
              ${f?`<button class="hud-btn" data-unequip-slot="${d}">Remover</button>`:""}
            </div>
          </div>
        `}).join("");return`
      <div class="squad-layout">
        <div class="squad-sidebar">
          <div class="card-meta">Esquadrão em Campo: <strong>${t}/5 Heróis</strong></div>
          ${i}
        </div>
        <div class="card-box">
          <div class="card-row">
            <h3>${s.icon} ${n.name} — ${s.name} (Nível ${n.level})</h3>
            <span class="gold-pill">⭐ ${n.jp} JP</span>
          </div>
          <div class="card-meta">
            HP: <strong>${r.hp}</strong> • MP: <strong>${r.mp}</strong> • ATK: <strong>${r.atk}</strong> • MAG: <strong>${r.mag}</strong> • DEF: <strong>${r.def}</strong> • SPD: <strong>${r.speed}</strong> • MOV: <strong>${r.move}</strong> • JUMP: <strong>${r.jump}</strong>
          </div>
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Equipamentos</div>
          ${h}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Habilidades de Classe</div>
          ${o}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Melhorias Passivas Permanentes</div>
          ${l}
        </div>
      </div>
    `}bindSquadEvents(){this.bodyEl.querySelectorAll("[data-select-hero]").forEach(e=>{e.addEventListener("click",t=>{t.target.closest("button")||(this.selectedHeroUid=e.dataset.selectHero??null,this.render())})}),this.bodyEl.querySelectorAll("[data-toggle-deploy]").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const i=this.campaign.toggleDeployHero(e.dataset.toggleDeploy);!i.ok&&i.reason?this.setToast(i.reason):this.render()})}),this.bodyEl.querySelectorAll("[data-unlock-skill]").forEach(e=>{e.addEventListener("click",()=>{if(!this.selectedHeroUid)return;const t=this.campaign.unlockSkillWithJP(this.selectedHeroUid,e.dataset.unlockSkill);this.setToast(t.ok?"Habilidade desbloqueada com sucesso!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-unlock-passive]").forEach(e=>{e.addEventListener("click",()=>{if(!this.selectedHeroUid)return;const t=this.campaign.upgradePassiveWithJP(this.selectedHeroUid,e.dataset.unlockPassive);this.setToast(t.ok?"Passiva aprendida!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-equip-select]").forEach(e=>{e.addEventListener("change",()=>{if(!this.selectedHeroUid||!e.value)return;const t=this.campaign.equipItem(this.selectedHeroUid,e.value);this.setToast(t.ok?"Equipamento atualizado!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-unequip-slot]").forEach(e=>{e.addEventListener("click",()=>{this.selectedHeroUid&&(this.campaign.unequipSlot(this.selectedHeroUid,e.dataset.unequipSlot),this.render())})})}renderShopTab(){const e=this.campaign.getData(),t=$d.map(n=>{const s=Gt[n];return`
        <div class="card-box">
          <div class="card-row">
            <strong>${s.icon} ${s.name}</strong>
            <button class="hud-btn hud-btn-gold" data-recruit-job="${n}" ${e.gold>=220?"":"disabled"}>Recrutar (🪙 220)</button>
          </div>
          <div class="card-meta">${s.title} • HP ${s.baseStats.hp} • MOV ${s.baseStats.move} • JUMP ${s.baseStats.jump}</div>
        </div>
      `}).join(""),i=tl.map(n=>{const s=e.inventory.filter(o=>o===n.id).length,r=n.allowedJobs?n.allowedJobs.map(o=>Gt[o].name.split(" ")[0]).join(", "):"Todas as Classes";return`
        <div class="card-box">
          <div class="card-row">
            <strong>${n.name}</strong>
            <span class="pill-tag">Nv.${n.tier}</span>
          </div>
          <div class="card-meta">${n.description}</div>
          <div class="card-meta">Uso: ${r} ${s>0?`• No baú: ${s}`:""}</div>
          <div class="card-row">
            <span>Slot: ${n.slot.toUpperCase()}</span>
            <button class="hud-btn hud-btn-gold" data-buy-eq="${n.id}" ${e.gold>=n.price?"":"disabled"}>Comprar (🪙 ${n.price})</button>
          </div>
        </div>
      `}).join("");return`
      <h3 style="margin:0 0 8px;font-family:Cinzel,serif;color:#e2b154;">🍺 Taverna Real — Recrutar Heróis das 6 Classes</h3>
      <div class="grid-2" style="margin-bottom:16px;">${t}</div>
      <h3 style="margin:0 0 8px;font-family:Cinzel,serif;color:#e2b154;">⚒️ Arsenal Real — Armas, Escudos, Armaduras e Acessórios (Nível 1 a 5)</h3>
      <div class="grid-2">${i}</div>
    `}bindShopEvents(){this.bodyEl.querySelectorAll("[data-recruit-job]").forEach(e=>{e.addEventListener("click",()=>{const t=this.campaign.recruitHero(e.dataset.recruitJob);t.ok&&t.hero?(this.selectedHeroUid=t.hero.uid,this.setToast(`${t.hero.name} (${Gt[t.hero.jobId].name}) juntou-se ao esquadrão!`)):this.setToast(t.reason??"Erro ao recrutar.")})}),this.bodyEl.querySelectorAll("[data-buy-eq]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.buyEq,i=this.campaign.buyEquipment(t),n=Zi(t);this.setToast(i.ok?`${n?.name} adicionado ao inventário!`:i.reason??"Erro.")})})}}const $x={grass:"Grama",stone:"Pedra",cobble:"Calçamento",wood:"Madeira",water:"Água",lava:"Lava",snow:"Neve",ice:"Gelo",swamp:"Pântano (Custo 2)",obsidian:"Obsidiana",carpet:"Tapete Real",metal:"Metal"},Yx={N:"Norte (N)",S:"Sul (S)",E:"Leste (L)",W:"Oeste (O)"};class Rh{campaign;audio;battlefield;barracks;engine;phase="busy";isBusy=!1;busySinceMs=0;battleSessionId=0;moveMap=new Map;selectedSkill=null;targetableSet=new Set;speedScale=1;graphicsPreset="HIGH";stageBonusGold=0;stageBonusJp=0;skillsMenuOpen=!1;hudHidden=!1;heroCollapsed=!1;targetCollapsed=!1;pendingTargetCell=null;floatBarEls=new Map;topHudEl=document.getElementById("top-hud");activeHeroPanelEl=document.getElementById("active-hero-panel");activeHeroBodyEl=document.getElementById("active-hero-body");targetPanelEl=document.getElementById("target-forecast-panel");restoreHudBtnEl=document.getElementById("btn-restore-hud");openTargetPillEl=document.getElementById("btn-open-target");floatingLayer=document.getElementById("floating-layer");ctbTimelineEl=document.getElementById("ctb-timeline");castBannerEl=document.getElementById("cast-banner");skillsSubmenuEl=document.getElementById("skills-submenu");skillsListEl=document.getElementById("skills-list");facingSubmenuEl=document.getElementById("facing-submenu");constructor(){this.campaign=new eu,this.audio=new Jd;const e=document.getElementById("game-canvas");this.battlefield=new Xx(e,{onTileHover:(l,c)=>this.handleTileHover(l,c),onTileClick:(l,c)=>{this.handleTileClick(l,c)},onFacingClick:l=>{this.confirmFacing(l)},onUnitProjections:l=>this.updateFloatingBars(l),onFrameTick:l=>this.checkBusyWatchdog(l)}),this.barracks=new qx(this.campaign,l=>this.startStage(l),()=>this.refreshHudHeader());const t=new URLSearchParams(window.location.search),i=t.get("preset");(i==="LOW"||i==="MEDIUM"||i==="HIGH")&&this.battlefield.setGraphicsPreset(i),this.graphicsPreset=this.battlefield.getGraphicsPreset();const n=document.getElementById("btn-graphics");n&&(n.textContent=`⚙️ GRÁFICOS: ${this.graphicsPreset}`),window.innerWidth<=768&&this.setTargetCollapsed(!0),this.bindUiControls(),this.syncHudHeightVar(),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.syncHudHeightVar()).observe(this.topHudEl),window.addEventListener("resize",()=>this.syncHudHeightVar()),window.addEventListener("orientationchange",()=>this.syncHudHeightVar());const s=window.__coaDebug??{};s.loadStageById=l=>this.startStage(l),window.__coaDebug=s,t.get("hideHud")==="1"&&this.setHudHidden(!0);const r=Number(t.get("stage")),o=Number.isInteger(r)&&r>=1&&r<=5?r:this.campaign.getData().selectedStageId||1;this.startStage(o)}setBusy(e){this.isBusy=e,this.busySinceMs=e?performance.now():0,e&&(this.phase="busy")}syncHudHeightVar(){const e=this.topHudEl.classList.contains("hidden")?12:Math.ceil(this.topHudEl.getBoundingClientRect().bottom+8);document.documentElement.style.setProperty("--top-hud-height",`${e}px`)}setHudHidden(e){this.hudHidden=e,this.topHudEl.classList.toggle("hidden",e),this.activeHeroPanelEl.classList.toggle("hidden",e),this.targetPanelEl.classList.toggle("hidden",e||this.targetCollapsed),this.openTargetPillEl.classList.toggle("hidden",e||!this.targetCollapsed),this.restoreHudBtnEl.classList.toggle("hidden",!e),this.syncHudHeightVar()}setHeroCollapsed(e){this.heroCollapsed=e,this.activeHeroBodyEl.classList.toggle("hidden",e),this.activeHeroPanelEl.classList.toggle("collapsed",e);const t=document.getElementById("btn-collapse-hero");t&&(t.textContent=e?"▴":"▾")}setTargetCollapsed(e){this.targetCollapsed=e,this.targetPanelEl.classList.toggle("hidden",this.hudHidden||e),this.openTargetPillEl.classList.toggle("hidden",this.hudHidden||!e)}bindUiControls(){const e=()=>this.audio.unlockAndStartMusic();window.addEventListener("pointerdown",e,{once:!0}),window.addEventListener("keydown",e,{once:!0}),document.getElementById("btn-rot-left")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.battlefield.rotate90(-1)}),document.getElementById("btn-rot-right")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.battlefield.rotate90(1)});const t=document.getElementById("btn-speed");t.addEventListener("click",()=>{this.speedScale=this.speedScale===1?2:1,this.battlefield.setTimeScale(this.speedScale),t.textContent=`⚡ ${this.speedScale}x`,this.audio.playUiConfirm()});const i=document.getElementById("btn-graphics");i?.addEventListener("click",()=>{const s=["HIGH","LOW","MEDIUM"],r=(s.indexOf(this.graphicsPreset)+1)%s.length;this.graphicsPreset=s[r],this.battlefield.setGraphicsPreset(this.graphicsPreset),i.textContent=`⚙️ GRÁFICOS: ${this.graphicsPreset}`,this.audio.playUiConfirm()});const n=document.getElementById("btn-mute");n.addEventListener("click",()=>{const s=this.audio.toggleMute();n.textContent=s?"🔇":"🔊"}),document.getElementById("btn-open-barracks")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.barracks.show("campaign")}),document.getElementById("btn-toggle-hud")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHudHidden(!0)}),this.restoreHudBtnEl.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHudHidden(!1)}),document.getElementById("btn-collapse-hero")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHeroCollapsed(!this.heroCollapsed)}),document.getElementById("btn-collapse-target")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setTargetCollapsed(!0)}),this.openTargetPillEl.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setTargetCollapsed(!1)}),document.getElementById("btn-close-skills")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const s=this.engine.getActiveUnit();this.audio.playUiCancel(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.phase==="target"&&(this.phase="command"),this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),s&&this.updateCommandMenuButtons(s)}),document.getElementById("btn-close-facing")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const s=this.engine.getActiveUnit();this.audio.playUiCancel(),this.phase==="SELECT_FACING"&&(this.phase="command"),this.battlefield.showFacingCompass(null),s&&this.updateCommandMenuButtons(s)}),document.getElementById("btn-confirm-forecast")?.addEventListener("click",()=>{!this.isBusy&&this.pendingTargetCell&&this.phase==="target"&&this.selectedSkill&&this.executeTargetedSkillAt(this.pendingTargetCell.col,this.pendingTargetCell.row)}),document.getElementById("cmd-move")?.addEventListener("click",()=>this.enterMoveMode()),document.getElementById("cmd-attack")?.addEventListener("click",()=>this.enterBasicAttackMode()),document.getElementById("cmd-skills")?.addEventListener("click",()=>this.toggleSkillsMenu()),document.getElementById("cmd-wait")?.addEventListener("click",()=>this.waitAction()),document.getElementById("btn-confirm-facing")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const s=this.engine.getActiveUnit();s&&s.team==="ally"&&this.phase==="SELECT_FACING"&&this.confirmFacing(s.facing)}),document.querySelectorAll(".face-btn").forEach(s=>{s.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const r=s.dataset.facing;r&&this.confirmFacing(r)})}),window.addEventListener("keydown",s=>{if(s.key!=="Enter"&&s.key!==" "&&s.code!=="Space"||this.isBusy||this.phase!=="SELECT_FACING")return;const r=!document.getElementById("barracks-modal")?.classList.contains("hidden"),o=!document.getElementById("result-modal")?.classList.contains("hidden");if(r||o)return;const l=this.engine?.getActiveUnit();!l||l.team!=="ally"||(s.preventDefault(),this.confirmFacing(l.facing))}),document.getElementById("btn-result-barracks")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden"),this.barracks.show("squad")}),document.getElementById("btn-result-replay")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden"),this.startStage(this.engine.stage.id)}),document.getElementById("btn-result-next")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden");const s=Math.min(5,this.engine.stage.id+1);this.campaign.selectStage(s),this.startStage(s)})}startStage(e){this.battleSessionId++;const t=jd(e),i=this.campaign.getDeployedHeroes();this.engine=new lu(t,i),this.stageBonusGold=0,this.stageBonusJp=0,this.isBusy=!1,this.busySinceMs=0,this.phase="busy",this.selectedSkill=null,this.pendingTargetCell=null,this.skillsMenuOpen=!1;for(const n of this.floatBarEls.values())n.remove();this.floatBarEls.clear(),document.getElementById("result-modal")?.classList.add("hidden"),this.battlefield.loadStage(this.engine),this.battlefield.syncFromEngine(this.engine),this.refreshHudHeader(),this.renderCTBTimeline(),requestAnimationFrame(()=>this.syncHudHeightVar()),this.advanceTurn()}refreshHudHeader(){const e=this.engine.stage;document.getElementById("hud-stage-kicker").textContent=e.subtitle.toUpperCase(),document.getElementById("hud-stage-title").textContent=e.name,document.getElementById("hud-turn-badge").textContent=`Turno ${Math.max(1,this.engine.turnCount)}`,document.getElementById("hud-gold-badge").textContent=`🪙 ${this.campaign.getData().gold}`}renderCTBTimeline(e,t,i){let n;const s=this.engine.getActiveUnit();if(e&&s&&t!==void 0&&i!==void 0){const o=this.engine.getAoeTiles(t,i,e,s.col,s.row),l=[],c=[];for(const h of o){const d=this.engine.getUnitAt(h.col,h.row);if(d){if(e.buffType==="haste"&&d.team===s.team)l.push(d.id);else if(e.statusEffect==="slow"&&d.team!==s.team)l.push(d.id);else if(!e.isHeal&&!e.isBuff&&d.team!==s.team){const u=this.engine.computeCombatForecast(s,e,d.col,d.row);u&&u.predictedDamage>=d.hp&&c.push(d.id)}}}(l.length>0||c.length>0)&&(n={targetUnitIds:l,ctDelta:e.ctBoost,speedMult:e.buffType==="haste"?1.4:e.statusEffect==="slow"?.65:void 0,assumeDefeatedIds:c})}const r=ru(this.engine.units,10,n);this.ctbTimelineEl.innerHTML=r.map((o,l)=>{const c=Gt[o.jobId];return`
          <div class="${["ctb-slot",o.team,o.isBoss?"boss":"",l===0?"first":"",n?.targetUnitIds.includes(o.unitId)?"hasted":""].filter(Boolean).join(" ")}" title="${o.name} (${c.name})">
            <span class="ctb-icon">${c.icon}</span>
            <span class="ctb-name">${o.name.split(" ")[0]}</span>
          </div>
        `}).join(""),requestAnimationFrame(()=>this.syncHudHeightVar())}async showCastBanner(e,t=1500){this.castBannerEl.textContent=e,this.castBannerEl.classList.remove("hidden"),await new Promise(i=>setTimeout(i,t/this.speedScale)),this.castBannerEl.classList.add("hidden")}async advanceTurn(){if(this.phase==="ended")return;const e=this.battleSessionId;this.setBusy(!0);try{for(;e===this.battleSessionId&&!this.engine.combatEnded&&this.phase!=="ended";){this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.busySinceMs=performance.now();const t=this.engine.advanceToNextTurn();for(const s of t.burnDamageEvents){const r=this.engine.getUnit(s.unitId);r&&this.spawnUnitTextPopup(r,`-${s.damage} 🔥`,"fall")}for(const s of t.poisonDamageEvents){const r=this.engine.getUnit(s.unitId);r&&this.spawnUnitTextPopup(r,`-${s.damage} ☠️`,"fall")}if(t.detonatedMeteor){const s=t.detonatedMeteor,r=Gt.belias_boss.skills[2],o=this.engine.getAoeTiles(s.centerCol,s.centerRow,r);if(this.battlefield.focusOnTile(s.centerCol,s.centerRow),this.audio.playSkillSfx(r),this.showCastBanner("☄️ APOCALYPSE METEOR DETONOU!",1800),await this.battlefield.animateUnitSkill("e5_belias",r,s.centerCol,s.centerRow,o),e!==this.battleSessionId)return;for(const l of s.hits){const c=this.engine.getUnit(l.targetId);c&&(this.battlefield.triggerHitFeedback(c.id,!0,!1,l.killed),this.spawnUnitTextPopup(c,`-${l.damage} ☄️`,"crit"))}this.battlefield.syncFromEngine(this.engine)}const i=this.engine.checkVictoryCondition();if(i){this.handleBattleEnd(i);return}const n=t.activeUnit;if(!n)return;if(this.battlefield.syncFromEngine(this.engine),this.battlefield.focusOnTile(n.col,n.row),this.refreshHudHeader(),this.renderCTBTimeline(),this.renderActiveHeroPanel(n),n.team==="ally"){this.phase="command",this.skillsMenuOpen=!1;return}await this.executeEnemyTurn(n,e)}}catch(t){console.error("[GameController] Error in advanceTurn:",t)}finally{if(e===this.battleSessionId){this.isBusy=!1,this.busySinceMs=0;const t=this.engine.checkVictoryCondition();if(t&&this.phase!=="ended")this.handleBattleEnd(t);else if(this.phase!=="ended"){const i=this.engine.getActiveUnit();i&&i.team==="ally"?(this.phase==="busy"&&(this.phase="command"),this.renderActiveHeroPanel(i),this.updateCommandMenuButtons(i)):i&&i.team==="enemy"&&(this.engine.endUnitTurn(i.facing),this.battlefield.syncFromEngine(this.engine),queueMicrotask(()=>{this.advanceTurn()}))}}}}renderActiveHeroPanel(e){const t=Gt[e.jobId];document.getElementById("active-avatar").textContent=t.icon,document.getElementById("active-name").textContent=e.name,document.getElementById("active-lvl").textContent=`Nv. ${e.level}`,document.getElementById("active-job").textContent=`${t.name} • MOV ${e.move} • JUMP ${e.jump}`,document.getElementById("active-hp-fill").style.width=`${e.hp/e.maxHp*100}%`,document.getElementById("active-hp-text").textContent=`${e.hp}/${e.maxHp}`,document.getElementById("active-mp-fill").style.width=`${e.mp/Math.max(1,e.maxMp)*100}%`,document.getElementById("active-mp-text").textContent=`${e.mp}/${e.maxMp}`,document.getElementById("active-ct-fill").style.width=`${Math.min(100,e.ct)}%`,document.getElementById("active-ct-text").textContent=`${Math.round(e.ct)}`;const i=document.getElementById("active-statuses");i.innerHTML=e.statuses.map(r=>`<span class="status-pill">${r.id.toUpperCase()} (${r.turns})</span>`).join("");const n=e.rosterUid?this.campaign.getHero(e.rosterUid):void 0,s=n?[n.equipment.weapon,n.equipment.shield,n.equipment.armor,n.equipment.accessory].map(r=>Zi(r)?.name).filter(Boolean).join(" • "):e.team==="enemy"?"Unidade Inimiga":"";document.getElementById("active-equip-line").textContent=s||"Sem equipamentos extras"}updateCommandMenuButtons(e){const t=e.team==="ally"&&!this.isBusy&&this.phase!=="ended",i=document.getElementById("cmd-move"),n=document.getElementById("cmd-attack"),s=document.getElementById("cmd-skills"),r=document.getElementById("cmd-wait"),o=this.engine.canUnitMove(e),l=!e.hasActedThisTurn&&this.engine.getAvailableSkills(e).length>0;i.disabled=!t||!o,n.disabled=!t||!l,s.disabled=!t||!l,r.disabled=!t,i.classList.toggle("active",this.phase==="move"),n.classList.toggle("active",this.phase==="target"&&!!this.selectedSkill?.isBasic),s.classList.toggle("active",this.skillsMenuOpen||this.phase==="target"&&!this.selectedSkill?.isBasic),r.classList.toggle("active",this.phase==="SELECT_FACING");const c=!e.hasMovedThisTurn&&!e.hasActedThisTurn?40:e.hasMovedThisTurn!==e.hasActedThisTurn?20:0,h=document.getElementById("wait-btn-label");h&&(h.textContent=this.phase==="SELECT_FACING"?"✅ PASSAR VEZ":"🧭 ESPERAR / DIREÇÃO"),document.getElementById("wait-ct-hint").textContent=this.phase==="SELECT_FACING"?"Confirmar / Enter":c>0?`+${c} CT`:"Encerrar turno",document.querySelectorAll(".face-btn").forEach(d=>{d.classList.toggle("selected",d.dataset.facing===e.facing)}),this.skillsSubmenuEl.classList.toggle("hidden",!this.skillsMenuOpen),this.facingSubmenuEl.classList.toggle("hidden",this.phase!=="SELECT_FACING")}enterMoveMode(){const e=this.engine.getActiveUnit();if(!e||e.team!=="ally"||!this.engine.canUnitMove(e)||this.isBusy||this.phase==="busy"||this.phase==="ended")return;this.audio.playUiConfirm(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.phase="move",this.moveMap=this.engine.getMoveRange(e);const t=Array.from(this.moveMap.values()).map(i=>({col:i.col,row:i.row}));this.battlefield.clearHighlights(),this.battlefield.setMoveTiles(t),this.updateCommandMenuButtons(e)}enterBasicAttackMode(){const e=this.engine.getActiveUnit();if(!e||e.team!=="ally"||e.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")return;const t=this.engine.getAvailableSkills(e),i=t.find(n=>n.isBasic)??t[0];i&&(this.skillsMenuOpen=!1,this.enterSkillTargetMode(i))}toggleSkillsMenu(){const e=this.engine.getActiveUnit();if(!(!e||e.team!=="ally"||e.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")){if(this.audio.playUiConfirm(),this.skillsMenuOpen=!this.skillsMenuOpen,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.skillsMenuOpen){const t=this.engine.getAvailableSkills(e);this.skillsListEl.innerHTML=t.map(i=>{const n=e.mp>=i.mpCost;return`
            <button class="skill-choice-btn ${this.selectedSkill?.id===i.id?"active":""}" data-skill-id="${i.id}" ${n?"":"disabled"}>
              <div>
                <div style="font-size:12px;font-weight:700;">${i.name}</div>
                <div style="font-size:10px;color:#94a3b8;">${i.description}</div>
              </div>
              <span class="skill-mp">${i.mpCost} MP</span>
            </button>
          `}).join(""),this.skillsListEl.querySelectorAll("[data-skill-id]").forEach(i=>{i.addEventListener("click",()=>{const n=t.find(s=>s.id===i.dataset.skillId);n&&this.enterSkillTargetMode(n)})})}this.updateCommandMenuButtons(e)}}enterSkillTargetMode(e){const t=this.engine.getActiveUnit();if(!t||t.team!=="ally"||t.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")return;this.audio.playUiConfirm(),this.selectedSkill=e,this.pendingTargetCell=null,this.phase="target",this.battlefield.showFacingCompass(null);const i=this.engine.getSkillTargetableTiles(t,e);this.targetableSet=new Set(i.map(n=>kt(n.col,n.row))),this.battlefield.clearHighlights(),this.battlefield.setAttackTiles(i),this.updateCommandMenuButtons(t)}syncPostActionState(e){if(this.phase==="ended")return;const t=this.engine.getPostActionState(e);if(t==="VICTORY"){this.handleBattleEnd("victory");return}if(t==="DEFEAT"){this.handleBattleEnd("defeat");return}if(t==="SELECT_FACING"){this.enterFacingMode(!1);return}this.phase="command",this.battlefield.showFacingCompass(null),this.renderActiveHeroPanel(e),this.updateCommandMenuButtons(e)}enterFacingMode(e=!0){if(this.isBusy||this.phase==="ended")return;const t=this.engine.getActiveUnit();!t||t.team!=="ally"||(e&&this.audio.playUiConfirm(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.phase="SELECT_FACING",this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.battlefield.showFacingCompass(t),this.battlefield.focusOnTile(t.col,t.row),this.heroCollapsed&&this.setHeroCollapsed(!1),this.renderActiveHeroPanel(t),this.updateCommandMenuButtons(t),requestAnimationFrame(()=>{this.facingSubmenuEl.scrollIntoView({block:"nearest",behavior:"smooth"})}))}waitAction(){if(this.isBusy||this.phase==="ended")return;const e=this.engine.getActiveUnit();if(!(!e||e.team!=="ally")){if(this.phase==="SELECT_FACING"){this.confirmFacing(e.facing);return}this.enterFacingMode(!0)}}checkBusyWatchdog(e){if(!this.isBusy||this.busySinceMs<=0||this.phase==="ended"||e-this.busySinceMs<=4e3)return;console.warn("[GameController] Watchdog released stuck busy lock after 4.0s."),this.isBusy=!1,this.busySinceMs=0,this.battlefield.isAnimating=!1,this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.battlefield.syncFromEngine(this.engine);const t=this.engine.checkVictoryCondition();if(t){this.handleBattleEnd(t);return}const i=this.engine.getActiveUnit();if(!i||i.hp<=0){this.advanceTurn();return}if(i.team==="enemy"){this.engine.endUnitTurn(i.facing),this.battlefield.syncFromEngine(this.engine),this.renderCTBTimeline(),this.advanceTurn();return}this.syncPostActionState(i)}handleTileHover(e,t){if(e===null||t===null){this.battlefield.setAoeTiles([]),this.battlefield.setParabolicArc(null,null),this.hideForecast();return}const i=this.engine.getTile(e,t);i&&(document.getElementById("tile-coords").textContent=`Tile (${e}, ${t})`,document.getElementById("tile-height-badge").textContent=`H: ${i.height}`,document.getElementById("tile-surface-badge").textContent=$x[i.surface]??i.surface);const n=this.engine.getUnitAt(e,t,!0),s=document.getElementById("target-unit-box");if(n){const o=Gt[n.jobId];s.classList.remove("hidden"),document.getElementById("target-avatar").textContent=o.icon,document.getElementById("target-name").textContent=n.name,document.getElementById("target-lvl").textContent=`Nv. ${n.level}`,document.getElementById("target-job").textContent=n.hp<=0?`${o.name} (CAÍDO)`:o.name,document.getElementById("target-facing-text").textContent=`Olhando: ${Yx[n.facing]}`,document.getElementById("target-hp-fill").style.width=`${n.hp/n.maxHp*100}%`,document.getElementById("target-hp-text").textContent=`${n.hp}/${n.maxHp}`,document.getElementById("target-mp-fill").style.width=`${n.mp/Math.max(1,n.maxMp)*100}%`,document.getElementById("target-mp-text").textContent=`${n.mp}/${n.maxMp}`}else s.classList.add("hidden");const r=this.engine.getActiveUnit();if(this.phase==="target"&&r&&this.selectedSkill&&this.targetableSet.has(kt(e,t))){const o=this.engine.getAoeTiles(e,t,this.selectedSkill,r.col,r.row);this.battlefield.setAoeTiles(o),this.battlefield.setParabolicArc({col:r.col,row:r.row},{col:e,row:t},this.selectedSkill.isHeal?4906624:16436245),this.renderCTBTimeline(this.selectedSkill,e,t);const l=this.engine.computeCombatForecast(r,this.selectedSkill,e,t);l?(this.pendingTargetCell={col:e,row:t},!this.hudHidden&&this.targetCollapsed&&this.setTargetCollapsed(!1),this.showForecast(l.formattedBanner)):(this.pendingTargetCell=null,this.hideForecast())}else this.battlefield.setAoeTiles([]),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.renderCTBTimeline()}showForecast(e){document.getElementById("forecast-card").classList.remove("hidden"),document.getElementById("forecast-banner").textContent=e}hideForecast(){document.getElementById("forecast-card").classList.add("hidden")}async handleTileClick(e,t){if(this.isBusy||this.phase==="busy"||this.phase==="ended")return;const i=this.engine.getActiveUnit();if(!(!i||i.team!=="ally")){if(this.phase==="move"){const n=this.moveMap.get(kt(e,t));if(!n){this.audio.playUiCancel();return}const s=this.battleSessionId;this.setBusy(!0),this.battlefield.clearHighlights(),this.updateCommandMenuButtons(i);try{if(await this.battlefield.animateUnitMovePath(i.id,n.path,()=>{this.audio.playStep()}),s!==this.battleSessionId)return;const r=this.engine.moveUnit(i,e,t);if(r.openedChest){this.audio.playVictoryFanfare(),this.campaign.addGold(r.openedChest.gold),this.stageBonusGold+=r.openedChest.gold,r.openedChest.itemId&&this.campaign.addInventoryItem(r.openedChest.itemId);const o=Zi(r.openedChest.itemId)?.name;this.showCastBanner(`📦 BAÚ ABERTO! +${r.openedChest.gold} 🪙${o?` + ${o}!`:""}`,2100),this.refreshHudHeader()}this.campaign.awardActionEXPAndJP(i.rosterUid,12,10),this.battlefield.syncFromEngine(this.engine)}catch(r){console.error("[GameController] Error during move sequence:",r)}finally{s===this.battleSessionId&&(this.isBusy=!1,this.busySinceMs=0,this.syncPostActionState(i))}return}if(this.phase==="target"&&this.selectedSkill){if(!this.targetableSet.has(kt(e,t))){this.audio.playUiCancel();return}if(!this.engine.computeCombatForecast(i,this.selectedSkill,e,t)&&this.selectedSkill.aoeShape!=="self"){this.audio.playUiCancel();return}if(Qo()&&(!this.pendingTargetCell||this.pendingTargetCell.col!==e||this.pendingTargetCell.row!==t)){this.audio.playUiConfirm(),this.handleTileHover(e,t);return}await this.executeTargetedSkillAt(e,t)}}}async executeTargetedSkillAt(e,t){if(this.isBusy||this.phase==="ended")return;const i=this.engine.getActiveUnit();if(!i||i.team!=="ally"||!this.selectedSkill||this.phase!=="target")return;if(!this.targetableSet.has(kt(e,t))){this.audio.playUiCancel();return}if(!this.engine.computeCombatForecast(i,this.selectedSkill,e,t)&&this.selectedSkill.aoeShape!=="self"){this.audio.playUiCancel();return}const s=this.selectedSkill,r=this.battleSessionId;this.setBusy(!0),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.updateCommandMenuButtons(i);try{const o=this.engine.getAvailableSkills(i).find(d=>d.isBasic)?.id,l=s.isBasic&&s.id===o?this.engine.executeAttack(i,e,t)??this.engine.executeSkill(i,s,e,t):this.engine.executeSkill(i,s,e,t);if(this.audio.playSkillSfx(s),(s.jpCost>0||!s.isBasic)&&this.showCastBanner(`✨ ${i.name.toUpperCase()} CONJURA: ${s.name.toUpperCase()}!`,1350),await this.battlefield.animateUnitSkill(i.id,s,e,t,l.aoeTiles),r!==this.battleSessionId)return;let c=24,h=22;for(const d of l.hits){const u=this.engine.getUnit(d.targetId);u&&(d.isBlocked?(this.audio.playShieldBlock(),this.battlefield.triggerHitFeedback(u.id,!1,!0,!1),this.spawnUnitTextPopup(u,"BLOQUEADO!","block")):d.isEvaded?this.spawnUnitTextPopup(u,"ESQUIVOU!","block"):d.revived?(this.spawnUnitTextPopup(u,`REVIVE +${d.healed}`,"heal"),c+=25,h+=20):d.healed>0?(this.spawnUnitTextPopup(u,`+${d.healed} HP`,"heal"),c+=16,h+=15):d.mpRestored>0?this.spawnUnitTextPopup(u,`+${d.mpRestored} MP`,"heal"):d.appliedStatus&&d.damage===0?this.spawnUnitTextPopup(u,`${d.appliedStatus.toUpperCase()}!`,"heal"):(d.isCrit&&this.audio.playCriticalHit(),this.battlefield.triggerHitFeedback(u.id,d.isCrit,!1,d.killed),this.spawnUnitTextPopup(u,d.isCrit?`CRÍTICO! -${d.damage}`:`-${d.damage}`,d.isCrit?"crit":"normal"),d.fallDamage>0&&this.spawnUnitTextPopup(u,`QUEDA! -${d.fallDamage}`,"fall"),d.killed&&(this.stageBonusGold+=u.isBoss?120:45,this.stageBonusJp+=25,this.campaign.addGold(u.isBoss?120:45),c+=40,h+=35)))}this.campaign.awardActionEXPAndJP(i.rosterUid,c,h),this.battlefield.syncFromEngine(this.engine),this.renderActiveHeroPanel(i),this.renderCTBTimeline()}catch(o){console.error("[GameController] Error during skill/attack execution:",o)}finally{if(r===this.battleSessionId){this.isBusy=!1,this.busySinceMs=0;const o=this.engine.checkVictoryCondition();o?this.handleBattleEnd(o):this.syncPostActionState(i)}}}async confirmFacing(e){if(this.isBusy||this.phase==="ended")return;const t=this.engine.getActiveUnit();if(!(!t||t.team!=="ally")){try{this.audio.playUiConfirm()}catch{}this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.engine.endUnitTurn(e),this.battlefield.syncFromEngine(this.engine),this.renderCTBTimeline(),await this.advanceTurn()}}async executeEnemyTurn(e,t){let i=e.facing;try{this.busySinceMs=performance.now();const n=cu.chooseBestAction(this.engine,e);if(i=n.endFacing,n.moveCol!==e.col||n.moveRow!==e.row){if(await this.battlefield.animateUnitMovePath(e.id,n.movePath,()=>{this.audio.playStep()}),t!==this.battleSessionId)return;this.engine.moveUnit(e,n.moveCol,n.moveRow),this.battlefield.syncFromEngine(this.engine)}if(n.skill){if(this.busySinceMs=performance.now(),this.battlefield.focusOnTile(n.targetCol,n.targetRow),await this.showCastBanner(`⚔️ ${e.name.toUpperCase()} CONJURA: ${n.skill.name.toUpperCase()}!`,1450),t!==this.battleSessionId)return;const s=this.engine.executeSkill(e,n.skill,n.targetCol,n.targetRow);if(this.audio.playSkillSfx(n.skill),await this.battlefield.animateUnitSkill(e.id,n.skill,n.targetCol,n.targetRow,s.aoeTiles),t!==this.battleSessionId)return;s.telegraphedMeteor&&this.showCastBanner("🔥 CHÃO MARCADO! SAIA DA ÁREA EM 1 TURNO!",1750);for(const r of s.hits){const o=this.engine.getUnit(r.targetId);o&&(r.isBlocked?(this.audio.playShieldBlock(),this.battlefield.triggerHitFeedback(o.id,!1,!0,!1),this.spawnUnitTextPopup(o,"BLOQUEADO!","block")):r.isEvaded?this.spawnUnitTextPopup(o,"ESQUIVOU!","block"):r.healed>0?this.spawnUnitTextPopup(o,`+${r.healed}`,"heal"):r.damage>0&&(r.isCrit&&this.audio.playCriticalHit(),this.battlefield.triggerHitFeedback(o.id,r.isCrit,!1,r.killed),this.spawnUnitTextPopup(o,r.isCrit?`CRÍTICO! -${r.damage}`:`-${r.damage}`,r.isCrit?"crit":"normal"),r.fallDamage>0&&this.spawnUnitTextPopup(o,`QUEDA! -${r.fallDamage}`,"fall")),r.lifesteal>0&&this.spawnUnitTextPopup(e,`+${r.lifesteal}`,"heal"))}this.battlefield.syncFromEngine(this.engine)}}catch(n){console.error("[GameController] Error during enemy turn:",n)}finally{if(t===this.battleSessionId){const n=this.engine.checkVictoryCondition();n?this.handleBattleEnd(n):(this.engine.activeUnitId===e.id&&(this.engine.endUnitTurn(i),this.battlefield.syncFromEngine(this.engine)),await new Promise(s=>setTimeout(s,260/this.speedScale)))}}}handleBattleEnd(e){this.isBusy=!1,this.busySinceMs=0,this.phase="ended",this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.skillsSubmenuEl.classList.add("hidden"),this.facingSubmenuEl.classList.add("hidden");const t=document.getElementById("result-modal"),i=document.getElementById("result-kicker"),n=document.getElementById("result-title"),s=document.getElementById("result-desc"),r=document.getElementById("result-rewards"),o=document.getElementById("btn-result-next");if(e==="victory"){this.audio.playVictoryFanfare();const l=this.campaign.completeStage(this.engine.stage.id,this.stageBonusGold,this.stageBonusJp);i.textContent=`FASE ${this.engine.stage.id} CONCLUÍDA`,n.textContent=this.engine.stage.id===5?"COROA CONQUISTADA!":"STAGE CLEAR!",s.textContent=this.engine.stage.id===5?"Belias, o Titã das Cinzas, tombou! Você conquistou o Santuário do Trono das Cinzas e venceu a campanha!":`Vitória tática em ${this.engine.stage.name}! A próxima fase da campanha foi desbloqueada.`,r.innerHTML=`🪙 Ouro Ganho: <strong>+${l.goldEarned}</strong> &nbsp;|&nbsp; ⭐ Job Points: <strong>+${l.jpEarned} JP</strong>`,o.classList.toggle("hidden",this.engine.stage.id>=5)}else this.audio.playDefeatChord(),i.textContent="ESQUADRAO CAÍDO",n.textContent="DERROTA TÁTICA",s.textContent="Seus heróis foram derrotados. Fortaleça armas e habilidades no Quartel ou tente novamente!",r.innerHTML="💡 Dica: Use flanqueamento pelas Costas (+50%), Vantagem de Altura e empurre inimigos de penhascos.",o.classList.add("hidden");this.refreshHudHeader(),t.classList.remove("hidden")}spawnUnitTextPopup(e,t,i){const n=this.battlefield.getUnitTopScreenPosition(e.id);if(!n||!n.visible)return;const s=document.createElement("div");s.className=`dmg-popup ${i}`,s.textContent=t,s.style.left=`${n.x+(Math.random()-.5)*28}px`,s.style.top=`${n.y-14}px`,this.floatingLayer.appendChild(s),setTimeout(()=>s.remove(),1180)}updateFloatingBars(e){const t=this.topHudEl.classList.contains("hidden")?null:this.topHudEl.getBoundingClientRect(),i=this.activeHeroPanelEl.classList.contains("hidden")?null:this.activeHeroPanelEl.getBoundingClientRect(),n=this.targetPanelEl.classList.contains("hidden")?null:this.targetPanelEl.getBoundingClientRect(),s=(r,o,l)=>l!==null&&r>=l.left-34&&r<=l.right+34&&o>=l.top-10&&o<=l.bottom+30;for(const r of e){const o=this.engine.getUnit(r.unitId);if(!o)continue;let l=this.floatBarEls.get(r.unitId);l||(l=document.createElement("div"),l.className=`unit-float-bar ${o.isBoss?"is-boss":""}`,l.innerHTML=`<div class="unit-float-name">${o.name}</div><div class="unit-float-hp-track"><div class="unit-float-hp-fill ${o.isBoss?"boss":o.team}"></div></div>`,this.floatingLayer.appendChild(l),this.floatBarEls.set(r.unitId,l));const c=s(r.x,r.y,t)||s(r.x,r.y,i)||s(r.x,r.y,n);if(!r.visible||o.hp<=0||c){l.style.display="none";continue}l.style.display="block",l.style.left=`${r.x}px`,l.style.top=`${r.y}px`,l.classList.toggle("is-active",this.engine.activeUnitId===o.id);const h=l.querySelector(".unit-float-hp-fill");h.style.width=`${Math.max(0,o.hp/o.maxHp*100)}%`}}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{new Rh}):new Rh;
