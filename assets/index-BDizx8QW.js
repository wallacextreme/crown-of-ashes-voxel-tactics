(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const Fc=["holy_knight","black_mage","dragoon","sniper","white_mystic","ninja"],Dr={hp_up:{id:"hp_up",name:"Vitalidade de Ferro (+40 HP)",description:"Aumenta permanentemente o HP máximo em +40.",jpCost:70,stat:"hp",bonus:40},atk_up:{id:"atk_up",name:"Maestria Marcial (+6 ATK)",description:"Aumenta o Ataque Físico base em +6.",jpCost:85,stat:"atk",bonus:6},mag_up:{id:"mag_up",name:"Erudição Arcana (+6 MAG)",description:"Aumenta o Poder Mágico base em +6.",jpCost:85,stat:"mag",bonus:6},mp_up:{id:"mp_up",name:"Reservatório de Éter (+25 MP)",description:"Aumenta permanentemente o MP máximo em +25.",jpCost:65,stat:"mp",bonus:25},move_up:{id:"move_up",name:"Passo Tático (+1 MOVE)",description:"Aumenta o alcance de deslocamento no tabuleiro em +1 tile.",jpCost:140,stat:"move",bonus:1}},It={holy_knight:{id:"holy_knight",name:"Cavaleiro Sagrado",title:"Ordem da Rosa Branca",color:"#3b82f6",accentColor:"#fbbf24",icon:"⚔️",baseStats:{hp:260,mp:65,atk:44,mag:34,def:32,speed:10,move:4,jump:3,evasion:.08,shieldBlock:.28},growthPerLevel:{hp:24,mp:6,atk:5,mag:3,def:4,speed:.5},passivePool:["hp_up","atk_up","mp_up","move_up"],skills:[{id:"bash_strike",name:"Golpe de Escudo (Bash)",shortName:"Bash",description:"Ataque físico firme que empurra o inimigo 1 tile para trás (causa queda em penhascos!).",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.05,isBasic:!0,knockback:1,element:"physical",jpCost:0,vfxType:"bash"},{id:"judgment_blade",name:"Judgment Blade (Espada do Julgamento)",shortName:"Judgment Blade",description:"Ergue a espada rúnica e faz brotar lâminas de luz e gelo do chão em Cruz, podendo aplicar Stop.",mpCost:18,range:3,aoeRadius:1,aoeShape:"cross",multiplier:1.45,element:"holy",statusEffect:"stop",statusChance:.45,jpCost:0,vfxType:"judgment_blade"},{id:"hallowed_bolt",name:"Hallowed Bolt (Raio Divino)",shortName:"Hallowed Bolt",description:"Relâmpago celestial em área de Cruz com ondas de choque que aplicam Silêncio.",mpCost:24,range:4,aoeRadius:1,aoeShape:"cross",multiplier:1.65,element:"lightning",statusEffect:"silence",statusChance:.55,jpCost:120,vfxType:"hallowed_bolt"},{id:"aegis_stance",name:"Aegis Stance (Postura de Égide)",shortName:"Aegis Stance",description:"Aumenta a Defesa em +40% por 3 turnos e atrai a agressão inimiga.",mpCost:10,range:0,aoeRadius:0,aoeShape:"self",multiplier:0,isBuff:!0,buffType:"aegis",element:"holy",jpCost:90,vfxType:"aegis"}]},black_mage:{id:"black_mage",name:"Mago Negro",title:"Círculo de Obsidiana",color:"#6366f1",accentColor:"#facc15",icon:"🔮",baseStats:{hp:165,mp:130,atk:20,mag:56,def:16,speed:10,move:3,jump:2,evasion:.05,shieldBlock:0},growthPerLevel:{hp:14,mp:14,atk:2,mag:6,def:2,speed:.5},passivePool:["mag_up","mp_up","hp_up","move_up"],skills:[{id:"arcane_bolt",name:"Disparo Arcano",shortName:"Arcano",description:"Projétil rápido de energia arcana com o cajado.",mpCost:0,range:3,aoeRadius:0,aoeShape:"single",multiplier:.9,isBasic:!0,isMagic:!0,element:"dark",jpCost:0,vfxType:"arcane_bolt"},{id:"firaga",name:"Firaga (Explosão Ígnea)",shortName:"Firaga",description:"Coluna de fogo voxelizada em Diamante que incendeia os tiles por 2 turnos.",mpCost:20,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.5,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"blizzaga",name:"Blizzaga (Prisão Glacial)",shortName:"Blizzaga",description:"Espinhos de gelo cristalino brotam do solo em Diamante aplicando Slow (-35% Speed).",mpCost:20,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.45,isMagic:!0,element:"ice",statusEffect:"slow",statusChance:.75,jpCost:0,vfxType:"blizzaga"},{id:"thundaga",name:"Thundaga (Tempestade Arcana)",shortName:"Thundaga",description:"Raios ramificados 3D em Diamante. Causa +35% de dano em água ou metal.",mpCost:22,range:4,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"lightning",bonusWaterMetal:.35,jpCost:130,vfxType:"thundaga"},{id:"mana_font",name:"Mana Font (Meditação)",shortName:"Mana Font",description:"Canaliza éter ambiente recuperando 35% do MP máximo.",mpCost:0,range:0,aoeRadius:0,aoeShape:"self",multiplier:0,isBuff:!0,restoreMpPct:.35,element:"dark",jpCost:80,vfxType:"mana_font"}]},dragoon:{id:"dragoon",name:"Cavaleiro Dragão",title:"Lanceiro dos Céus",color:"#0ea5e9",accentColor:"#38bdf8",icon:"🐉",baseStats:{hp:240,mp:60,atk:48,mag:24,def:28,speed:11,move:4,jump:5,evasion:.1,shieldBlock:.1},growthPerLevel:{hp:22,mp:5,atk:5.5,mag:2.5,def:3.5,speed:.6},passivePool:["atk_up","hp_up","move_up","mp_up"],skills:[{id:"long_thrust",name:"Estocada Longa (Partisan)",shortName:"Estocada",description:"Golpe perfurante que alcança até 2 tiles em linha reta sem sofrer contra-ataque.",mpCost:0,range:2,aoeRadius:0,aoeShape:"line2",multiplier:1.15,isBasic:!0,element:"physical",jpCost:0,vfxType:"long_thrust"},{id:"sky_dive",name:"Sky Dive (Salto do Dragão)",shortName:"Sky Dive",description:"Salta aos céus ignorando altura e despenca como meteoro causando 220% de dano e empurrão!",mpCost:15,range:5,aoeRadius:0,aoeShape:"single",multiplier:2.2,ignoresHeight:!0,knockback:1,element:"physical",jpCost:0,vfxType:"sky_dive"},{id:"dragon_breath",name:"Dragon Breath (Sopro Dracônico)",shortName:"Sopro Dragão",description:"Cone frontal de chamas dracônicas que incendeia múltiplos alvos.",mpCost:18,range:2,aoeRadius:1,aoeShape:"cone",multiplier:1.4,isMagic:!0,element:"fire",igniteTiles:1,jpCost:110,vfxType:"dragon_breath"}]},sniper:{id:"sniper",name:"Franco-Atirador",title:"Patrulheiro Real",color:"#10b981",accentColor:"#a3e635",icon:"🏹",baseStats:{hp:190,mp:65,atk:42,mag:22,def:20,speed:12,move:4,jump:4,evasion:.15,shieldBlock:0},growthPerLevel:{hp:17,mp:6,atk:4.5,mag:2.5,def:2.5,speed:.7},passivePool:["atk_up","move_up","hp_up","mp_up"],skills:[{id:"arc_shot",name:"Disparo em Arco",shortName:"Flecha",description:"Tiro parabólico de longo alcance (+1 tile a cada 2 degraus de altura).",mpCost:0,minRange:2,range:6,aoeRadius:0,aoeShape:"single",multiplier:1.1,isBasic:!0,isBow:!0,element:"physical",jpCost:0,vfxType:"arc_shot"},{id:"leg_shot",name:"Leg Shot (Tiro Imobilizador)",shortName:"Leg Shot",description:"Disparo preciso que imobiliza o alvo no próximo turno.",mpCost:12,minRange:1,range:6,aoeRadius:0,aoeShape:"single",multiplier:1.15,isBow:!0,statusEffect:"immobilize",statusChance:.85,element:"physical",jpCost:0,vfxType:"leg_shot"},{id:"arrow_rain",name:"Arrow Rain (Chuva de Flechas)",shortName:"Chuva Flechas",description:"Dezenas de flechas caem dos céus em uma área 3x3.",mpCost:18,minRange:2,range:5,aoeRadius:1,aoeShape:"square3x3",multiplier:1.35,isBow:!0,element:"physical",jpCost:120,vfxType:"arrow_rain"}]},white_mystic:{id:"white_mystic",name:"Clérigo Místico",title:"Guardião do Tempo",color:"#f8fafc",accentColor:"#ef4444",icon:"✨",baseStats:{hp:175,mp:125,atk:22,mag:52,def:18,speed:11,move:3,jump:2,evasion:.08,shieldBlock:0},growthPerLevel:{hp:16,mp:13,atk:2,mag:5.5,def:2.5,speed:.6},passivePool:["mag_up","mp_up","hp_up","move_up"],skills:[{id:"curaga",name:"Curaga (Luz Restauradora)",shortName:"Curaga",description:"Feixe dourado descendente que cura todos os aliados na área em Cruz.",mpCost:16,range:4,aoeRadius:1,aoeShape:"cross",multiplier:1.45,isBasic:!0,isHeal:!0,isMagic:!0,element:"holy",jpCost:0,vfxType:"curaga"},{id:"hastega",name:"Hastega (Aceleração Temporal)",shortName:"Hastega",description:"Engrenagem rúnica sob os aliados que dá +40% Speed e +30 CT imediato.",mpCost:18,range:4,aoeRadius:1,aoeShape:"cross",multiplier:0,isBuff:!0,buffType:"haste",ctBoost:30,speedMult:1.4,element:"holy",jpCost:0,vfxType:"hastega"},{id:"holy",name:"Holy (Luz Suprema)",shortName:"Holy",description:"Esferas de luz convergente com dano sagrado massivo (+40% vs mortos-vivos/chefes).",mpCost:28,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.95,isMagic:!0,element:"holy",bonusUndeadBoss:.4,jpCost:150,vfxType:"holy"},{id:"revive",name:"Revive (Fênix Sagrada)",shortName:"Revive",description:"Ressuscita um aliado caído no tabuleiro com 50% do HP máximo.",mpCost:25,range:3,aoeRadius:0,aoeShape:"single",multiplier:0,isRevive:!0,healPct:.5,element:"holy",jpCost:100,vfxType:"revive"}]},ninja:{id:"ninja",name:"Lâmina das Sombras",title:"Shinobi Carmesim",color:"#dc2626",accentColor:"#a855f7",icon:"🗡️",baseStats:{hp:185,mp:60,atk:45,mag:28,def:19,speed:14,move:5,jump:5,evasion:.22,shieldBlock:.12},growthPerLevel:{hp:16,mp:5,atk:5,mag:3,def:2.5,speed:.8},passivePool:["atk_up","move_up","hp_up","mp_up"],skills:[{id:"dual_strike",name:"Dual Strike (Ataque Duplo)",shortName:"Dual Strike",description:"Golpeia duas vezes em X com lâminas gêmeas.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.35,hits:2,isBasic:!0,element:"physical",jpCost:0,vfxType:"dual_strike"},{id:"shadow_step",name:"Shadow Step (Passo das Sombras)",shortName:"Shadow Step",description:"Teleporta para o tile atrás do inimigo e desfere um Backstab crítico garantido!",mpCost:14,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.4,isShadowStep:!0,guaranteedCrit:!0,element:"dark",jpCost:0,vfxType:"shadow_step"},{id:"poison_kunai",name:"Kunai Venenosa",shortName:"Kunai Veneno",description:"Arremessa shuriken envenenada à distância aplicando Veneno por 3 turnos.",mpCost:8,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.05,statusEffect:"poison",statusChance:.85,element:"physical",jpCost:90,vfxType:"poison_kunai"}]},dark_knight_boss:{id:"dark_knight_boss",name:"Cavaleiro Negro",title:"Capitão Mercenário",color:"#4c1d95",accentColor:"#f43f5e",icon:"💀",baseStats:{hp:340,mp:90,atk:46,mag:36,def:30,speed:11,move:4,jump:3,evasion:.08,shieldBlock:.22},growthPerLevel:{hp:30,mp:8,atk:5,mag:4,def:4,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Corte Sombrio",shortName:"Corte",description:"Golpe pesado com espada negra.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.1,isBasic:!0,knockback:1,element:"dark",jpCost:0,vfxType:"slash"},{id:"shadowblade",name:"Shadowblade (Lâmina Sombria)",shortName:"Shadowblade",description:"Drena energia vital do alvo e restaura 50% do dano em HP!",mpCost:16,range:3,aoeRadius:0,aoeShape:"single",multiplier:1.45,lifestealPct:.5,element:"dark",jpCost:0,vfxType:"shadowblade"}]},dragoon_boss:{id:"dragoon_boss",name:"Comandante Dragoon",title:"Lança de Zeirchele",color:"#0369a1",accentColor:"#fb923c",icon:"🐲",baseStats:{hp:420,mp:95,atk:52,mag:28,def:31,speed:12,move:4,jump:6,evasion:.12,shieldBlock:.12},growthPerLevel:{hp:34,mp:7,atk:5.5,mag:3,def:4,speed:.6},passivePool:[],skills:[{id:"long_thrust",name:"Estocada Imperial",shortName:"Estocada",description:"Perfuração longa de 2 tiles.",mpCost:0,range:2,aoeRadius:0,aoeShape:"line2",multiplier:1.2,isBasic:!0,element:"physical",jpCost:0,vfxType:"long_thrust"},{id:"sky_dive",name:"Sky Dive Imperial",shortName:"Sky Dive",description:"Salto meteórico sobre o alvo.",mpCost:15,range:5,aoeRadius:0,aoeShape:"single",multiplier:1.9,ignoresHeight:!0,knockback:1,element:"physical",jpCost:0,vfxType:"sky_dive"},{id:"dragon_breath",name:"Dragon Breath",shortName:"Sopro Dragão",description:"Cone de chamas.",mpCost:18,range:2,aoeRadius:1,aoeShape:"cone",multiplier:1.35,isMagic:!0,element:"fire",jpCost:0,vfxType:"dragon_breath"}]},archmage_boss:{id:"archmage_boss",name:"Arquimago Glacial",title:"Senhor de Lionel",color:"#0284c7",accentColor:"#bae6fd",icon:"❄️",baseStats:{hp:460,mp:180,atk:26,mag:62,def:26,speed:11,move:3,jump:2,evasion:.1,shieldBlock:0},growthPerLevel:{hp:32,mp:15,atk:2,mag:6.5,def:3,speed:.5},passivePool:[],skills:[{id:"arcane_bolt",name:"Lanço Glacial",shortName:"Arcano",description:"Disparo de gelo.",mpCost:0,range:3,aoeRadius:0,aoeShape:"single",multiplier:1,isBasic:!0,isMagic:!0,element:"ice",jpCost:0,vfxType:"arcane_bolt"},{id:"blizzaga",name:"Blizzaga Supremo",shortName:"Blizzaga",description:"Prisão glacial em área.",mpCost:20,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"ice",statusEffect:"slow",statusChance:.75,jpCost:0,vfxType:"blizzaga"},{id:"thundaga",name:"Tempestade Boreal",shortName:"Thundaga",description:"Raios arcanos em área.",mpCost:22,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.5,isMagic:!0,element:"lightning",bonusWaterMetal:.35,jpCost:0,vfxType:"thundaga"}]},golem_enemy:{id:"golem_enemy",name:"Golem Voxel",title:"Colosso de Pedra",color:"#64748b",accentColor:"#38bdf8",icon:"🗿",baseStats:{hp:310,mp:30,atk:46,mag:14,def:38,speed:8,move:3,jump:2,evasion:0,shieldBlock:.15},growthPerLevel:{hp:28,mp:2,atk:5,mag:1,def:4.5,speed:.3},passivePool:[],skills:[{id:"bash_strike",name:"Esmagamento Sísmico",shortName:"Esmagar",description:"Golpe pesado que arremessa o inimigo.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1.2,isBasic:!0,knockback:1,element:"physical",jpCost:0,vfxType:"bash"}]},lich_boss:{id:"lich_boss",name:"Lich Invocador",title:"Soberano do Pântano",color:"#6b21a8",accentColor:"#a3e635",icon:"☠️",baseStats:{hp:520,mp:220,atk:28,mag:68,def:26,speed:12,move:3,jump:3,evasion:.12,shieldBlock:0},growthPerLevel:{hp:36,mp:16,atk:2,mag:7,def:3,speed:.6},passivePool:[],skills:[{id:"arcane_bolt",name:"Toque Necrótico",shortName:"Necrose",description:"Projétil sombrio.",mpCost:0,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.05,isBasic:!0,isMagic:!0,element:"dark",jpCost:0,vfxType:"arcane_bolt"},{id:"firaga",name:"Fogo Fátuo (Firaga)",shortName:"Firaga",description:"Chamas necróticas em área.",mpCost:20,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"shadowblade",name:"Drenar Alma",shortName:"Drenar",description:"Rouba vida à distância.",mpCost:18,range:4,aoeRadius:0,aoeShape:"single",multiplier:1.45,isMagic:!0,lifestealPct:.5,element:"dark",jpCost:0,vfxType:"shadowblade"}]},skeleton_enemy:{id:"skeleton_enemy",name:"Cavaleiro Esqueleto",title:"Legião Profana",color:"#cbd5e1",accentColor:"#22c55e",icon:"🦴",baseStats:{hp:195,mp:40,atk:40,mag:18,def:20,speed:11,move:4,jump:3,evasion:.08,shieldBlock:.12},growthPerLevel:{hp:18,mp:4,atk:4.5,mag:2,def:2.5,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Corte Ósseo",shortName:"Corte",description:"Ataque corpo a corpo.",mpCost:0,range:1,aoeRadius:0,aoeShape:"single",multiplier:1,isBasic:!0,element:"physical",jpCost:0,vfxType:"slash"}]},belias_boss:{id:"belias_boss",name:"Belias, o Titã das Cinzas",title:"Arquidemônio Lucavi",color:"#991b1b",accentColor:"#f59e0b",icon:"👹",baseStats:{hp:1150,mp:400,atk:64,mag:72,def:36,speed:12,move:4,jump:4,evasion:.08,shieldBlock:.15},growthPerLevel:{hp:60,mp:20,atk:6,mag:7,def:4,speed:.5},passivePool:[],skills:[{id:"bash_strike",name:"Garra das Cinzas",shortName:"Garra Titã",description:"Golpe colossal que arremessa o inimigo.",mpCost:0,range:2,aoeRadius:0,aoeShape:"single",multiplier:1.25,isBasic:!0,knockback:1,element:"fire",jpCost:0,vfxType:"bash"},{id:"firaga",name:"Chamas de Zodíaco",shortName:"Zodíaco",description:"Explosão infernal em área.",mpCost:24,range:5,aoeRadius:1,aoeShape:"diamond",multiplier:1.55,isMagic:!0,element:"fire",igniteTiles:2,jpCost:0,vfxType:"firaga"},{id:"apocalypse_meteor",name:"Apocalypse Meteor",shortName:"Apocalypse Meteor",description:"Telegrafa uma área 3x3 flamejante que explode 1 turno depois em impacto apocalíptico!",mpCost:35,range:6,aoeRadius:1,aoeShape:"square3x3",multiplier:2.35,isMagic:!0,element:"fire",igniteTiles:3,jpCost:0,vfxType:"apocalypse_meteor"}]}},Ur=[{id:"wp_iron_blade",name:"Espada Longa de Ferro",slot:"weapon",tier:1,price:120,allowedJobs:["holy_knight","ninja"],stats:{atk:8},description:"Lâmina confiável forjada para a guarda real (+8 ATK)."},{id:"wp_oak_staff",name:"Cajado de Carvalho Rúnico",slot:"weapon",tier:1,price:120,allowedJobs:["black_mage","white_mystic"],stats:{mag:9,mp:15},description:"Canaliza energia elemental básica (+9 MAG, +15 MP)."},{id:"wp_hunter_bow",name:"Arco Composto de Caça",slot:"weapon",tier:1,price:130,allowedJobs:["sniper"],stats:{atk:9,speed:1},description:"Arco leve de resposta rápida (+9 ATK, +1 SPD)."},{id:"wp_steel_lance",name:"Lança Partisan de Aço",slot:"weapon",tier:1,price:140,allowedJobs:["dragoon"],stats:{atk:10},description:"Lança balanceada para saltos elevados (+10 ATK)."},{id:"wp_mithril_sword",name:"Espada de Mithril",slot:"weapon",tier:2,price:280,allowedJobs:["holy_knight","ninja"],stats:{atk:17,speed:1},description:"Prata élfica afiada e leve (+17 ATK, +1 SPD)."},{id:"wp_ether_staff",name:"Cajado de Éter",slot:"weapon",tier:3,price:440,allowedJobs:["black_mage","white_mystic"],stats:{mag:24,mp:35},description:"Cristal flutuante de éter puro (+24 MAG, +35 MP)."},{id:"wp_elven_bow",name:"Arco Élfico dos Ventos",slot:"weapon",tier:3,price:460,allowedJobs:["sniper"],stats:{atk:22,speed:2,evasion:.05},description:"Disparos silenciosos e letais (+22 ATK, +2 SPD)."},{id:"wp_dragon_whisker",name:"Lança Bigode de Dragão",slot:"weapon",tier:4,price:680,allowedJobs:["dragoon"],stats:{atk:30,jump:1},description:"Lança lendária que amplia o salto (+30 ATK, +1 JUMP)."},{id:"wp_masamune",name:"Katanas Gêmeas Masamune",slot:"weapon",tier:4,price:700,allowedJobs:["ninja"],stats:{atk:28,speed:3,evasion:.08},description:"Lâminas sombrias de velocidade absurda (+28 ATK, +3 SPD)."},{id:"wp_excalibur",name:"Espada Rúnica Excalibur",slot:"weapon",tier:5,price:980,allowedJobs:["holy_knight"],stats:{atk:38,mag:16,speed:2},description:"Relíquia sagrada da Coroa (+38 ATK, +16 MAG, +2 SPD)."},{id:"wp_chaos_rod",name:"Cetro Astral do Apocalipse",slot:"weapon",tier:5,price:960,allowedJobs:["black_mage","white_mystic"],stats:{mag:40,mp:60,speed:1},description:"Amplifica feitiços arcanos e sagrados ao limite (+40 MAG, +60 MP)."},{id:"sh_buckler",name:"Broquel Real",slot:"shield",tier:1,price:110,allowedJobs:["holy_knight","dragoon","ninja"],stats:{def:5,shieldBlock:.08},description:"Escudo compacto (+5 DEF, +8% Bloqueio)."},{id:"sh_crystal_shield",name:"Escudo de Cristal",slot:"shield",tier:3,price:380,allowedJobs:["holy_knight","dragoon"],stats:{def:12,shieldBlock:.14,hp:35},description:"Reflete feixes mágicos e bloqueia golpes (+12 DEF, +14% Bloqueio)."},{id:"sh_aegis",name:"Escudo Égide Divino",slot:"shield",tier:5,price:780,allowedJobs:["holy_knight","dragoon"],stats:{def:20,shieldBlock:.2,hp:70,mag:8},description:"Barreira sagrada impenetrável (+20 DEF, +20% Bloqueio, +70 HP)."},{id:"ar_leather_coat",name:"Brigandina Tática",slot:"armor",tier:1,price:120,stats:{hp:35,def:4},description:"Proteção leve universal (+35 HP, +4 DEF)."},{id:"ar_mage_vest",name:"Manto de Seda Arcana",slot:"armor",tier:2,price:260,stats:{hp:45,mp:30,mag:8,def:5},description:"Tecido encantado com fios de mana (+45 HP, +30 MP, +8 MAG)."},{id:"ar_mithril_plate",name:"Peitoral de Mithril",slot:"armor",tier:3,price:450,stats:{hp:90,def:12},description:"Armadura forjada em liga nobre (+90 HP, +12 DEF)."},{id:"ar_maximilian",name:"Armadura Maximilian Real",slot:"armor",tier:5,price:890,stats:{hp:165,def:20,atk:6},description:"Obra-prima da engenharia de guerra (+165 HP, +20 DEF, +6 ATK)."},{id:"ac_battle_boots",name:"Botas de Couro Reforçadas",slot:"accessory",tier:2,price:240,stats:{jump:1,evasion:.05},description:"Facilita escaladas em degraus altos (+1 JUMP, +5% Esquiva)."},{id:"ac_hermes_boots",name:"Botas de Hermes (+1 Move)",slot:"accessory",tier:4,price:620,stats:{move:1,speed:2},description:"Concede +1 tile de movimento e +2 de Velocidade!"},{id:"ac_angel_ring",name:"Anel da Coroa de Cinzas",slot:"accessory",tier:5,price:880,stats:{hp:80,atk:10,mag:10,speed:2},description:"Relíquia real que fortalece todos os atributos ofensivos."}];function Bc(s,e){return It[s]?.skills.find(t=>t.id===e)}function Ci(s){if(s)return Ur.find(e=>e.id===s)}function Ul(s){const e=It[s.jobId],t=Math.max(0,s.level-1),i={hp:Math.round(e.baseStats.hp+e.growthPerLevel.hp*t),mp:Math.round(e.baseStats.mp+e.growthPerLevel.mp*t),atk:Math.round(e.baseStats.atk+e.growthPerLevel.atk*t),mag:Math.round(e.baseStats.mag+e.growthPerLevel.mag*t),def:Math.round(e.baseStats.def+e.growthPerLevel.def*t),speed:Math.round(e.baseStats.speed+e.growthPerLevel.speed*t),move:e.baseStats.move,jump:e.baseStats.jump,evasion:e.baseStats.evasion,shieldBlock:e.baseStats.shieldBlock};for(const a of s.passiveUpgrades){const r=Dr[a];r&&(i[r.stat]=i[r.stat]+r.bonus)}const n=[s.equipment.weapon,s.equipment.shield,s.equipment.armor,s.equipment.accessory];for(const a of n){const r=Ci(a);if(r)for(const[o,l]of Object.entries(r.stats)){const c=o;typeof l=="number"&&(i[c]=Number((i[c]+l).toFixed(3)))}}return i.evasion=Math.min(.65,i.evasion),i.shieldBlock=Math.min(.7,i.shieldBlock),i}function Oc(s,e,t=1,i=1){const n=It[s],a=Math.max(0,e-1);return{hp:Math.round((n.baseStats.hp+n.growthPerLevel.hp*a)*t),mp:Math.round(n.baseStats.mp+n.growthPerLevel.mp*a),atk:Math.round((n.baseStats.atk+n.growthPerLevel.atk*a)*i),mag:Math.round((n.baseStats.mag+n.growthPerLevel.mag*a)*i),def:Math.round(n.baseStats.def+n.growthPerLevel.def*a),speed:Math.round(n.baseStats.speed+n.growthPerLevel.speed*a),move:n.baseStats.move,jump:n.baseStats.jump,evasion:n.baseStats.evasion,shieldBlock:n.baseStats.shieldBlock}}function Fn(s,e,t){const i=[];for(let n=0;n<e;n++)for(let a=0;a<s;a++){const r=t(a,n),o=r.walkable!==void 0?r.walkable:r.surface!=="water"&&r.surface!=="lava"&&!r.prop;i.push({col:a,row:n,height:r.height,surface:r.surface,walkable:o,isStair:r.isStair,isBridge:r.isBridge,prop:r.prop,chest:r.chest})}return i}const Zi=[{id:1,name:"Ruínas da Abadia de Orbonne",subtitle:"Ato I — Emboscada no Pátio Sagrado",biome:"forest",cols:12,rows:12,goldReward:380,jpReward:95,description:"Pátio da antiga abadia com degraus de pedra, riacho central, escadarias e o Capitão Mercenário Gafgarion protegendo as relíquias.",bossTitle:"Capitão Mercenário Gafgarion",allySpawns:[{col:1,row:9,facing:"N"},{col:2,row:10,facing:"N"},{col:3,row:9,facing:"N"},{col:4,row:10,facing:"N"},{col:5,row:9,facing:"N"}],tiles:Fn(12,12,(s,e)=>e===6&&s<=7||e===5&&s>=8?s===3||s===6?{height:2,surface:"wood",isBridge:!0,walkable:!0}:{height:1,surface:"water",walkable:!1}:e<=2?(s===0||s===11)&&e===0?{height:5,surface:"stone",prop:"ruin_wall",walkable:!1}:(s===3||s===8)&&e===1?{height:5,surface:"stone",prop:"torch",walkable:!1}:s===10&&e===1?{height:5,surface:"cobble",chest:{id:"ch_orbonne_1",gold:150,opened:!1,itemId:"ar_leather_coat"}}:{height:4,surface:s>=4&&s<=7?"carpet":"cobble"}:e===3||e===4?s===4||s===7?{height:e===3?3:2,surface:"stone",isStair:!0,walkable:!0}:s===1&&e===4?{height:3,surface:"grass",prop:"tree",walkable:!1}:s===10&&e===3?{height:3,surface:"grass",prop:"tree",walkable:!1}:{height:e===3?3:2,surface:s>=3&&s<=8?"cobble":"grass"}:e===7&&(s===2||s===9)?{height:2,surface:"grass",prop:"tree",walkable:!1}:e===11&&(s===0||s===11)?{height:3,surface:"stone",prop:"pillar",walkable:!1}:s>=8&&e>=8?{height:3,surface:"grass"}:{height:2,surface:s>=2&&s<=5&&e>=8?"cobble":"grass"}),enemies:[{id:"e1_gafgarion",name:"Capitão Gafgarion",jobId:"dark_knight_boss",level:2,col:5,row:2,facing:"S",isBoss:!0,aiRole:"aggressive",hpScale:1},{id:"e1_knight",name:"Mercenário Escudeiro",jobId:"holy_knight",level:1,col:4,row:4,facing:"S",aiRole:"aggressive",hpScale:.72,atkScale:.85},{id:"e1_archer",name:"Besteiro de Orbonne",jobId:"sniper",level:1,col:8,row:3,facing:"S",aiRole:"sniper",hpScale:.72,atkScale:.85},{id:"e1_mage",name:"Acólito Negro",jobId:"black_mage",level:1,col:7,row:1,facing:"S",aiRole:"mage",hpScale:.75,atkScale:.85}]},{id:2,name:"Ponte do Desfiladeiro de Zeirchele",subtitle:"Ato II — Queda nas Cataratas",biome:"canyon",cols:13,rows:12,goldReward:540,jpReward:130,description:"Ponte elevada de pedra sobre um rio caudaloso. Empurrar inimigos das beiradas causa dano massivo de queda!",bossTitle:"Comandante Dragoon Aliste",allySpawns:[{col:1,row:4,facing:"E"},{col:1,row:5,facing:"E"},{col:1,row:6,facing:"E"},{col:2,row:5,facing:"E"},{col:2,row:7,facing:"E"}],tiles:Fn(13,12,(s,e)=>s>=5&&s<=7?e>=4&&e<=7?(e===4||e===7)&&(s===5||s===7)?{height:5,surface:"cobble",prop:"torch",walkable:!1}:{height:5,surface:"cobble",isBridge:!0,walkable:!0}:{height:1,surface:"water",walkable:!1}:s<=4?s===4&&(e===2||e===9)?{height:6,surface:"stone",prop:"rock",walkable:!1}:e<=2&&s<=3?{height:6,surface:"stone"}:s===3&&(e===3||e===8)?{height:5,surface:"stone",isStair:!0,walkable:!0}:{height:4,surface:s>=3?"cobble":"stone"}:e<=2&&s>=9?s===11&&e===1?{height:7,surface:"cobble",chest:{id:"ch_zeirchele_1",gold:220,opened:!1,itemId:"ac_battle_boots"}}:{height:7,surface:"cobble"}:e>=9&&s>=9?{height:6,surface:"stone"}:s===9&&(e===3||e===8)?{height:6,surface:"stone",isStair:!0,walkable:!0}:s===12&&(e===4||e===7)?{height:6,surface:"stone",prop:"banner",walkable:!1}:{height:5,surface:"cobble"}),enemies:[{id:"e2_dragoon_boss",name:"Comandante Aliste",jobId:"dragoon_boss",level:3,col:10,row:5,facing:"W",isBoss:!0,aiRole:"aggressive"},{id:"e2_sniper_top",name:"Atirador da Torre Norte",jobId:"sniper",level:2,col:10,row:1,facing:"W",aiRole:"sniper",hpScale:.85},{id:"e2_sniper_bot",name:"Atirador da Torre Sul",jobId:"sniper",level:2,col:10,row:10,facing:"W",aiRole:"sniper",hpScale:.85},{id:"e2_knight",name:"Guarda da Ponte",jobId:"holy_knight",level:2,col:7,row:5,facing:"W",aiRole:"aggressive",hpScale:.9},{id:"e2_cleric",name:"Sacerdote de Campo",jobId:"white_mystic",level:2,col:11,row:6,facing:"W",aiRole:"support"}]},{id:3,name:"Fortaleza Glacial de Lionel",subtitle:"Ato III — Assalto às Muralhas de Gelo",biome:"arctic",cols:13,rows:13,goldReward:720,jpReward:165,description:"Muralhas nevadas imponentes de até 7 degraus e lago congelado propenso a magia elétrica (Thundaga +35%).",bossTitle:"Arquimago Boreal Vormav",allySpawns:[{col:4,row:11,facing:"N"},{col:5,row:11,facing:"N"},{col:6,row:11,facing:"N"},{col:7,row:11,facing:"N"},{col:8,row:11,facing:"N"}],tiles:Fn(13,13,(s,e)=>e<=2?(s===2||s===10)&&e===1?{height:7,surface:"cobble",prop:"crystal",walkable:!1}:s===6&&e===0?{height:7,surface:"carpet",prop:"banner",walkable:!1}:{height:6,surface:s>=5&&s<=7?"carpet":"cobble"}:e===3?s===3||s===9?{height:5,surface:"stone",isStair:!0,walkable:!0}:s===6?{height:4,surface:"metal",isStair:!0,walkable:!0}:{height:7,surface:"cobble",prop:"ruin_wall",walkable:!1}:e>=5&&e<=7&&(s<=3||s>=9)?{height:3,surface:"ice",walkable:!0}:e===4&&s===1?{height:4,surface:"snow",chest:{id:"ch_lionel_1",gold:280,opened:!1,itemId:"wp_ether_staff"}}:(s===1||s===11)&&e===9?{height:3,surface:"snow",prop:"pine",walkable:!1}:(s===4||s===8)&&e===6?{height:4,surface:"stone",prop:"torch",walkable:!1}:e>=4&&e<=8&&s>=5&&s<=7?{height:3,surface:"cobble"}:{height:e>=9?2:3,surface:"snow"}),enemies:[{id:"e3_archmage",name:"Arquimago Vormav",jobId:"archmage_boss",level:4,col:6,row:1,facing:"S",isBoss:!0,aiRole:"mage"},{id:"e3_golem_l",name:"Golem Rúnico Alfa",jobId:"golem_enemy",level:4,col:4,row:5,facing:"S",aiRole:"aggressive"},{id:"e3_golem_r",name:"Golem Rúnico Beta",jobId:"golem_enemy",level:4,col:8,row:5,facing:"S",aiRole:"aggressive"},{id:"e3_sniper",name:"Vigília da Muralha",jobId:"sniper",level:3,col:1,row:2,facing:"S",aiRole:"sniper"},{id:"e3_ninja",name:"Assassino de Lionel",jobId:"ninja",level:3,col:10,row:4,facing:"S",aiRole:"aggressive"}]},{id:4,name:"Pântano das Ruínas Proibidas",subtitle:"Ato IV — O Despertar do Lich",biome:"swamp",cols:13,rows:13,goldReward:940,jpReward:210,description:"Terreno alagado que dobra o custo de movimento. Plataformas antigas ligam o altar do Lich Invocador. Magia Holy causa +40% de dano!",bossTitle:"Lich Invocador Malakor",allySpawns:[{col:2,row:11,facing:"N"},{col:4,row:11,facing:"N"},{col:6,row:11,facing:"N"},{col:8,row:11,facing:"N"},{col:10,row:11,facing:"N"}],tiles:Fn(13,13,(s,e)=>e<=2&&s>=4&&s<=8?(s===4||s===8)&&e===1?{height:5,surface:"obsidian",prop:"crystal",walkable:!1}:{height:4,surface:"obsidian"}:(s===3||s===9)&&e>=3&&e<=9?e===6&&s===3?{height:3,surface:"stone",prop:"statue",walkable:!1}:e===4&&s===9?{height:3,surface:"cobble",chest:{id:"ch_swamp_1",gold:350,opened:!1,itemId:"ac_hermes_boots"}}:{height:3,surface:"cobble"}:s===6&&e>=3&&e<=10?{height:2,surface:"stone"}:s<=1&&e<=4||s>=11&&e<=4?{height:1,surface:"water",walkable:!1}:e>=10?{height:2,surface:"stone"}:s===1&&e===8||s===11&&e===8?{height:2,surface:"swamp",prop:"tree",walkable:!1}:{height:1,surface:"swamp",walkable:!0}),enemies:[{id:"e4_lich",name:"Lich Malakor",jobId:"lich_boss",level:5,col:6,row:1,facing:"S",isBoss:!0,isUndead:!0,aiRole:"mage"},{id:"e4_skel1",name:"Guardião Ósseo",jobId:"skeleton_enemy",level:4,col:3,row:4,facing:"S",isUndead:!0,aiRole:"aggressive"},{id:"e4_skel2",name:"Sentinela Óssea",jobId:"skeleton_enemy",level:4,col:9,row:5,facing:"S",isUndead:!0,aiRole:"aggressive"},{id:"e4_mage",name:"Necromante Sombrio",jobId:"black_mage",level:4,col:5,row:2,facing:"S",isUndead:!0,aiRole:"mage"},{id:"e4_ninja",name:"Espectro das Sombras",jobId:"ninja",level:4,col:7,row:4,facing:"S",isUndead:!0,aiRole:"aggressive"}]},{id:5,name:"Santuário do Trono das Cinzas",subtitle:"Ato Final — O Trono do Arquidemônio Lucavi",biome:"volcanic",cols:14,rows:14,goldReward:1800,jpReward:350,description:"Catedral vulcânica cercada por fissuras de lava. Enfrente o colossal Arquidemônio Belias (2x2) e esquive do Apocalypse Meteor!",bossTitle:"Arquidemônio Lucavi: Belias, o Titã das Cinzas",allySpawns:[{col:4,row:12,facing:"N"},{col:5,row:12,facing:"N"},{col:6,row:12,facing:"N"},{col:7,row:12,facing:"N"},{col:9,row:12,facing:"N"}],tiles:Fn(14,14,(s,e)=>(s<=1||s>=12)&&e>=2&&e<=11||e>=6&&e<=7&&(s===3||s===10)?{height:1,surface:"lava",walkable:!1}:e<=4&&s>=4&&s<=9?(s===4||s===9)&&e===0?{height:7,surface:"obsidian",prop:"brazier",walkable:!1}:(s===4||s===9)&&e===4?{height:6,surface:"obsidian",prop:"pillar",walkable:!1}:{height:6,surface:s>=5&&s<=8?"carpet":"obsidian"}:(e===5||e===6)&&s>=5&&s<=8?{height:e===5?5:4,surface:"stone",isStair:!0,walkable:!0}:s===2&&e===4?{height:4,surface:"obsidian",chest:{id:"ch_ashes_1",gold:500,opened:!1,itemId:"wp_excalibur"}}:(s===2||s===11)&&e===9?{height:3,surface:"obsidian",prop:"brazier",walkable:!1}:(s===4||s===9)&&e===9?{height:3,surface:"obsidian",prop:"crystal",walkable:!1}:e>=7&&e<=10?{height:3,surface:s>=5&&s<=8?"carpet":"obsidian"}:{height:2,surface:"obsidian"}),enemies:[{id:"e5_belias",name:"Belias, o Titã das Cinzas",jobId:"belias_boss",level:6,col:6,row:1,facing:"S",isBoss:!0,isUndead:!0,footprint:2,aiRole:"boss_belias"},{id:"e5_knight_l",name:"Templário das Cinzas",jobId:"dark_knight_boss",level:5,col:3,row:5,facing:"S",aiRole:"aggressive",hpScale:.78},{id:"e5_mage_r",name:"Invocador Lucavi",jobId:"black_mage",level:5,col:10,row:5,facing:"S",aiRole:"mage",hpScale:1.05},{id:"e5_dragoon",name:"Guarda Dracônico",jobId:"dragoon",level:5,col:8,row:7,facing:"S",aiRole:"aggressive"},{id:"e5_cleric",name:"Oráculo Profano",jobId:"white_mystic",level:5,col:5,row:3,facing:"S",aiRole:"support"}]}];function kc(s){return Zi.find(e=>e.id===s)??Zi[0]}class zc{ctx=null;masterGain=null;musicGain=null;sfxGain=null;muted=!1;bgmTimer=null;stepIdx=0;melodyNotes=[62,65,69,67,65,64,62,57,60,62,65,69,72,69,67,64];bassNotes=[38,38,41,41,43,43,45,45,36,36,38,38,41,40,38,33];ensureContext(){if(typeof window>"u")return null;if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:.72,this.masterGain.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.22,this.musicGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.65,this.sfxGain.connect(this.masterGain)}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}unlockAndStartMusic(){!this.ensureContext()||this.bgmTimer!==null||(this.bgmTimer=window.setInterval(()=>{this.muted||!this.ctx||this.ctx.state!=="running"||this.playBgmBeat()},340))}toggleMute(){return this.muted=!this.muted,this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(this.muted?0:.72,this.ctx.currentTime,.03),this.muted}isMuted(){return this.muted}midiToFreq(e){return 440*Math.pow(2,(e-69)/12)}playTone(e,t,i,n,a,r,o=0){const l=this.ctx;if(!l||!a||this.muted)return;const c=l.currentTime+o,d=l.createOscillator(),h=l.createGain();d.type=i,d.frequency.setValueAtTime(e,c),r!==void 0&&d.frequency.exponentialRampToValueAtTime(Math.max(20,r),c+t),h.gain.setValueAtTime(1e-4,c),h.gain.linearRampToValueAtTime(n,c+.015),h.gain.exponentialRampToValueAtTime(1e-4,c+t),d.connect(h),h.connect(a),d.start(c),d.stop(c+t+.02)}playNoise(e,t,i,n="bandpass"){const a=this.ensureContext();if(!a||!this.sfxGain||this.muted)return;const r=Math.floor(a.sampleRate*e),o=a.createBuffer(1,r,a.sampleRate),l=o.getChannelData(0);for(let u=0;u<r;u++)l[u]=(Math.random()*2-1)*(1-u/r);const c=a.createBufferSource();c.buffer=o;const d=a.createBiquadFilter();d.type=n,d.frequency.value=t;const h=a.createGain();h.gain.setValueAtTime(i,a.currentTime),h.gain.exponentialRampToValueAtTime(.001,a.currentTime+e),c.connect(d),d.connect(h),h.connect(this.sfxGain),c.start()}playBgmBeat(){const e=this.stepIdx%this.melodyNotes.length;this.stepIdx++;const t=this.midiToFreq(this.melodyNotes[e]),i=this.midiToFreq(this.bassNotes[e]);this.playTone(t,.31,"triangle",.22,this.musicGain),e%2===0&&(this.playTone(i,.65,"sawtooth",.09,this.musicGain),this.playTone(i*1.5,.62,"sine",.12,this.musicGain))}playUiConfirm(){this.ensureContext(),this.playTone(587.33,.09,"triangle",.16,this.sfxGain,880)}playUiCancel(){this.ensureContext(),this.playTone(392,.11,"triangle",.14,this.sfxGain,261.6)}playStep(){this.ensureContext(),this.playNoise(.06,950,.22,"lowpass"),this.playTone(135,.05,"triangle",.1,this.sfxGain,80)}playShieldBlock(){this.ensureContext(),this.playTone(520,.16,"square",.18,this.sfxGain,260),this.playTone(1040,.12,"triangle",.14,this.sfxGain,760)}playCriticalHit(){this.ensureContext(),this.playNoise(.24,1400,.42,"highpass"),this.playTone(210,.22,"sawtooth",.26,this.sfxGain,65),this.playTone(880,.2,"triangle",.2,this.sfxGain,1320,.04)}playSkillSfx(e){switch(this.ensureContext(),e.vfxType){case"firaga":case"dragon_breath":case"apocalypse_meteor":this.playNoise(.55,420,.5,"lowpass"),this.playTone(150,.45,"sawtooth",.28,this.sfxGain,48);break;case"blizzaga":this.playNoise(.32,3200,.38,"highpass"),this.playTone(1320,.22,"sine",.2,this.sfxGain,1960),this.playTone(1760,.18,"triangle",.16,this.sfxGain,980,.08);break;case"thundaga":case"hallowed_bolt":this.playNoise(.38,1900,.45,"bandpass"),this.playTone(460,.3,"sawtooth",.25,this.sfxGain,95);break;case"arc_shot":case"leg_shot":case"arrow_rain":this.playNoise(.18,2100,.3,"bandpass"),this.playTone(680,.14,"triangle",.18,this.sfxGain,260);break;case"curaga":case"revive":case"hastega":case"mana_font":case"aegis":this.playTone(523.25,.24,"sine",.18,this.sfxGain),this.playTone(659.25,.24,"sine",.18,this.sfxGain,void 0,.07),this.playTone(783.99,.35,"triangle",.18,this.sfxGain,void 0,.14);break;case"holy":case"judgment_blade":this.playTone(659.25,.32,"triangle",.22,this.sfxGain),this.playTone(987.77,.38,"sine",.22,this.sfxGain,void 0,.08),this.playNoise(.28,2500,.32,"highpass");break;default:this.playNoise(.14,2400,.34,"highpass"),this.playTone(340,.14,"sawtooth",.22,this.sfxGain,110);break}}playVictoryFanfare(){this.ensureContext();const e=[523.25,523.25,523.25,659.25,587.33,659.25,783.99],t=[0,.14,.28,.42,.65,.8,.96],i=[.12,.12,.12,.2,.12,.14,.65];for(let n=0;n<e.length;n++)this.playTone(e[n],i[n],"triangle",.26,this.sfxGain,void 0,t[n]),this.playTone(e[n]*.5,i[n],"sawtooth",.12,this.sfxGain,void 0,t[n])}playDefeatChord(){this.ensureContext(),this.playTone(220,.6,"sawtooth",.2,this.sfxGain,165),this.playTone(261.6,.65,"triangle",.18,this.sfxGain,196,.12)}}const Nl=1,la="crown_of_ashes_save_v1",bo="crown_of_ashes_save_v1_bak";class Hc{map=new Map;getItem(e){return this.map.get(e)??null}setItem(e,t){this.map.set(e,t)}removeItem(e){this.map.delete(e)}}function Gc(){try{if(typeof globalThis<"u"&&"localStorage"in globalThis&&globalThis.localStorage)return globalThis.localStorage}catch{}return new Hc}function yo(){return{version:Nl,gold:460,unlockedStage:1,completedStages:[],inventory:["ac_battle_boots"],roster:[{uid:"hero_ramza",name:"Ramza",jobId:"holy_knight",level:1,exp:0,jp:120,unlockedSkills:["bash_strike","judgment_blade"],passiveUpgrades:[],equipment:{weapon:"wp_iron_blade",shield:"sh_buckler",armor:"ar_leather_coat",accessory:null},deployed:!0},{uid:"hero_vivi",name:"Orlan",jobId:"black_mage",level:1,exp:0,jp:120,unlockedSkills:["arcane_bolt","firaga","blizzaga"],passiveUpgrades:[],equipment:{weapon:"wp_oak_staff",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_kain",name:"Kain",jobId:"dragoon",level:1,exp:0,jp:120,unlockedSkills:["long_thrust","sky_dive"],passiveUpgrades:[],equipment:{weapon:"wp_steel_lance",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_agrias",name:"Lyra",jobId:"sniper",level:1,exp:0,jp:120,unlockedSkills:["arc_shot","leg_shot"],passiveUpgrades:[],equipment:{weapon:"wp_hunter_bow",shield:null,armor:null,accessory:null},deployed:!0},{uid:"hero_alma",name:"Alma",jobId:"white_mystic",level:1,exp:0,jp:120,unlockedSkills:["curaga","hastega"],passiveUpgrades:[],equipment:{weapon:"wp_oak_staff",shield:null,armor:null,accessory:null},deployed:!0}],selectedStageId:1}}class Vc{storage;data;constructor(e){this.storage=e??Gc(),this.data=this.load()}validate(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.version=="number"&&t.version<=Nl&&typeof t.gold=="number"&&typeof t.unlockedStage=="number"&&Array.isArray(t.completedStages)&&Array.isArray(t.inventory)&&Array.isArray(t.roster)&&t.roster.length>0}load(){for(const t of[la,bo])try{const i=this.storage.getItem(t);if(!i)continue;const n=JSON.parse(i);if(this.validate(n))return n}catch{}const e=yo();return this.data=e,this.save(),e}save(){try{const e=this.storage.getItem(la);e&&this.storage.setItem(bo,e),this.storage.setItem(la,JSON.stringify(this.data))}catch{}}resetCampaign(){return this.data=yo(),this.save(),this.data}getData(){return this.data}getHero(e){return this.data.roster.find(t=>t.uid===e)}getDeployedHeroes(){return this.data.roster.filter(e=>e.deployed).slice(0,5)}selectStage(e){return e<1||e>Zi.length||e>this.data.unlockedStage?!1:(this.data.selectedStageId=e,this.save(),!0)}addGold(e){return this.data.gold=Math.max(0,this.data.gold+Math.round(e)),this.save(),this.data.gold}addInventoryItem(e){Ci(e)&&(this.data.inventory.push(e),this.save())}buyEquipment(e){const t=Ci(e);return t?this.data.gold<t.price?{ok:!1,reason:`Ouro insuficiente (precisa ${t.price} 🪙).`}:(this.data.gold-=t.price,this.data.inventory.push(t.id),this.save(),{ok:!0}):{ok:!1,reason:"Equipamento inválido."}}equipItem(e,t){const i=this.getHero(e),n=Ci(t);if(!i||!n)return{ok:!1,reason:"Herói ou item inválido."};if(n.allowedJobs&&!n.allowedJobs.includes(i.jobId))return{ok:!1,reason:`${It[i.jobId].name} não pode equipar ${n.name}.`};const a=this.data.inventory.indexOf(t);if(a===-1)return{ok:!1,reason:"Item não está no inventário."};this.data.inventory.splice(a,1);const r=i.equipment[n.slot];return r&&this.data.inventory.push(r),i.equipment[n.slot]=n.id,this.save(),{ok:!0}}unequipSlot(e,t){const i=this.getHero(e);if(!i)return!1;const n=i.equipment[t];return n?(i.equipment[t]=null,this.data.inventory.push(n),this.save(),!0):!1}recruitHero(e,t){if(this.data.gold<220)return{ok:!1,reason:"Recrutamento custa 220 🪙 Ouro."};const n=It[e],a={holy_knight:["Agrias","Delita","Cid"],black_mage:["Vivi","Lulu","Alaric"],dragoon:["Freya","Aranea","Estinien"],sniper:["Mustadio","Balthier","Viera"],white_mystic:["Ovelia","Aeris","Celia"],ninja:["Edge","Shadow","Yuffie"]},r=new Set(this.data.roster.map(h=>h.name)),o=t??a[e].find(h=>!r.has(h))??`${n.name.split(" ")[0]} #${this.data.roster.length+1}`,l=n.skills.filter(h=>h.jpCost===0).map(h=>h.id),c=this.data.roster.filter(h=>h.deployed).length,d={uid:`hero_${e}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,name:o,jobId:e,level:1,exp:0,jp:90,unlockedSkills:l,passiveUpgrades:[],equipment:{weapon:null,shield:null,armor:null,accessory:null},deployed:c<5};return this.data.gold-=220,this.data.roster.push(d),this.save(),{ok:!0,hero:d}}toggleDeployHero(e){const t=this.getHero(e);if(!t)return{ok:!1,reason:"Herói não encontrado."};const i=this.data.roster.filter(n=>n.deployed).length;if(t.deployed){if(i<=1)return{ok:!1,reason:"Pelo menos 1 herói deve ir para a batalha."};t.deployed=!1}else{if(i>=5)return{ok:!1,reason:"Limite máximo de 5 heróis em campo."};t.deployed=!0}return this.save(),{ok:!0}}unlockSkillWithJP(e,t){const i=this.getHero(e);if(!i)return{ok:!1,reason:"Herói não encontrado."};if(i.unlockedSkills.includes(t))return{ok:!1,reason:"Habilidade já desbloqueada."};const n=Bc(i.jobId,t);return n?i.jp<n.jpCost?{ok:!1,reason:`JP insuficiente (precisa ${n.jpCost} ⭐).`}:(i.jp-=n.jpCost,i.unlockedSkills.push(n.id),this.save(),{ok:!0}):{ok:!1,reason:"Habilidade inválida."}}upgradePassiveWithJP(e,t){const i=this.getHero(e),n=Dr[t];return!i||!n?{ok:!1,reason:"Dados inválidos."}:i.passiveUpgrades.includes(t)?{ok:!1,reason:"Melhoria passiva já adquirida."}:i.jp<n.jpCost?{ok:!1,reason:`JP insuficiente (precisa ${n.jpCost} ⭐).`}:(i.jp-=n.jpCost,i.passiveUpgrades.push(t),this.save(),{ok:!0})}awardActionEXPAndJP(e,t,i){if(!e)return{leveledUp:!1,newLevel:1};const n=this.getHero(e);if(!n)return{leveledUp:!1,newLevel:1};n.exp+=Math.max(0,Math.round(t)),n.jp+=Math.max(0,Math.round(i));let a=!1;for(;n.exp>=n.level*100&&n.level<30;)n.exp-=n.level*100,n.level+=1,a=!0;return this.save(),{leveledUp:a,newLevel:n.level}}completeStage(e,t=0,i=0){const n=Zi.find(o=>o.id===e)??Zi[0],a=n.goldReward+t,r=n.jpReward+i;this.data.gold+=a,this.data.completedStages.includes(e)||this.data.completedStages.push(e),e>=this.data.unlockedStage&&e<Zi.length&&(this.data.unlockedStage=e+1,this.data.selectedStageId=this.data.unlockedStage);for(const o of this.data.roster)o.deployed?this.awardActionEXPAndJP(o.uid,85,r):o.jp+=Math.round(r*.4);return this.save(),{goldEarned:a,jpEarned:r,unlockedStage:this.data.unlockedStage}}getEquipmentCatalog(){return Ur}}function At(s,e){return`${s},${e}`}function Sn(s,e,t,i){return Math.abs(s-t)+Math.abs(e-i)}function Fl(s){switch(s){case"N":return{dc:0,dr:-1};case"S":return{dc:0,dr:1};case"E":return{dc:1,dr:0};case"W":return{dc:-1,dr:0}}}function Yn(s,e,t="S"){return s===0&&e===0?t:Math.abs(s)>=Math.abs(e)?s>=0?"E":"W":e>=0?"S":"N"}function Bl(s){return s.footprint===2?[{col:s.col,row:s.row},{col:s.col+1,row:s.row},{col:s.col,row:s.row+1},{col:s.col+1,row:s.row+1}]:[{col:s.col,row:s.row}]}function Eo(s,e,t){return s.hp<=0?!1:Bl(s).some(i=>i.col===e&&i.row===t)}function Gt(s,e){return s.statuses.some(t=>t.id===e&&t.turns>0)}function Hs(s){let e=s.speed;return Gt(s,"haste")&&(e*=1.4),Gt(s,"slow")&&(e*=.65),Math.max(1,Number(e.toFixed(2)))}function ca(s){let e=s.def;return Gt(s,"aegis")&&(e*=1.4),Math.round(e)}function Ol(s,e,t,i,n){const a=s-t,r=e-i;if(a===0&&r===0)return"FRONT";const o=Fl(n),l=a*o.dc+r*o.dr,c=Math.abs(a*-o.dr+r*o.dc);return l>=c?"FRONT":-l>=c?"BACK":"SIDE"}function Wc(s){switch(s){case"BACK":return{damageMult:1.5,critBonus:.3,evasionMult:0,ignoresShield:!0,label:"🗡️ COSTAS (+50%)"};case"SIDE":return{damageMult:1.25,critBonus:.05,evasionMult:.5,ignoresShield:!0,label:"⚔️ FLANCO (+25%)"};default:return{damageMult:1,critBonus:0,evasionMult:1,ignoresShield:!1,label:"🛡️ FRONTAL"}}}function Xc(s,e){return s<=e?0:Math.min(.4,(s-e)*.1)}function qc(s,e,t){let i=s.range;return s.isBow&&e>t&&(i+=Math.floor((e-t)/2)),i}function $c(s){const e=s.filter(n=>n.hp>0);if(e.length===0)return null;const t=n=>n.sort((a,r)=>{if(r.ct!==a.ct)return r.ct-a.ct;const o=Hs(r)-Hs(a);return o!==0?o:a.team!==r.team?a.team==="ally"?-1:1:a.id.localeCompare(r.id)}),i=e.filter(n=>n.ct>=100&&!Gt(n,"stop"));if(i.length>0)return t(i),i[0];for(let n=0;n<500;n++){for(const r of e)Gt(r,"stop")?r.ct+=0:r.ct+=Hs(r);const a=e.filter(r=>r.ct>=100&&!Gt(r,"stop"));if(a.length>0)return t(a),a[0];if(e.every(r=>Gt(r,"stop")))for(const r of e)r.statuses=r.statuses.filter(o=>o.id!=="stop")}return e[0]}function Yc(s,e,t){return!e&&!t?s.ct=40:e!==t?s.ct=20:s.ct=0,s.ct}function Kc(s,e=10,t){const i=s.filter(r=>r.hp>0&&!t?.assumeDefeatedIds?.includes(r.id)).map(r=>{let o=r.ct,l=Hs(r);return t?.activeUnitId===r.id&&t.activeUnitEndCt!==void 0&&(o=t.activeUnitEndCt),t?.targetUnitIds.includes(r.id)&&(t.ctDelta&&(o+=t.ctDelta),t.speedMult&&(l=Math.max(1,l*t.speedMult))),{unitId:r.id,name:r.name,jobId:r.jobId,team:r.team,isBoss:r.isBoss,ct:o,speed:l,stopped:Gt(r,"stop")}});if(i.length===0)return[];const n=[];let a=0;for(;n.length<e&&a<400;){const r=i.filter(o=>o.ct>=100&&!o.stopped);if(r.length>0){r.sort((l,c)=>c.ct!==l.ct?c.ct-l.ct:c.speed!==l.speed?c.speed-l.speed:l.team!==c.team?l.team==="ally"?-1:1:l.unitId.localeCompare(c.unitId));const o=r[0];n.push({unitId:o.unitId,name:o.name,jobId:o.jobId,team:o.team,isBoss:o.isBoss,ticksUntilTurn:a,turnOrder:n.length+1}),o.ct-=100;continue}a++;for(const o of i)o.stopped||(o.ct+=o.speed);if(i.every(o=>o.stopped))break}return n}function Jc(s,e,t,i,n){const a=new Map;if(Gt(i,"immobilize"))return a.set(At(i.col,i.row),{col:i.col,row:i.row,cost:0,path:[{col:i.col,row:i.row}]}),a;const r=i.footprint??1,o=i.move,l=i.jump,c=(g,x)=>{for(let m=0;m<r;m++)for(let p=0;p<r;p++){const v=g+m,w=x+p;if(v<0||v>=e||w<0||w>=t)return!1;const y=s.get(At(v,w));if(!y||!y.walkable)return!1;const E=n.find(T=>T.id!==i.id&&T.hp>0&&Eo(T,v,w));if(E&&E.team!==i.team)return!1}return!0},d=(g,x)=>{for(let m=0;m<r;m++)for(let p=0;p<r;p++)if(n.find(w=>w.id!==i.id&&w.hp>0&&Eo(w,g+m,x+p)))return!1;return!0},h=new Map,u=[{col:i.col,row:i.row,cost:0,path:[{col:i.col,row:i.row}]}];h.set(At(i.col,i.row),0),a.set(At(i.col,i.row),u[0]);const f=[{dc:0,dr:-1},{dc:0,dr:1},{dc:1,dr:0},{dc:-1,dr:0}];for(;u.length>0;){u.sort((m,p)=>m.cost-p.cost);const g=u.shift(),x=s.get(At(g.col,g.row));if(x)for(const m of f){const p=g.col+m.dc,v=g.row+m.dr;if(!c(p,v))continue;const w=s.get(At(p,v));if(!w||Math.abs(w.height-x.height)>l)continue;const E=w.surface==="swamp"?2:1,T=g.cost+E;if(T>o)continue;const _=At(p,v),b=h.get(_);if(b===void 0||T<b){h.set(_,T);const L={col:p,row:v,cost:T,path:[...g.path,{col:p,row:v}]};u.push(L),d(p,v)&&a.set(_,L)}}}return a}class Zc{stage;tiles;units;activeUnitId=null;turnCount=0;combatEnded=null;rng;constructor(e,t,i=Math.random){this.stage=e,this.rng=i,this.tiles=new Map;for(const r of e.tiles)this.tiles.set(At(r.col,r.row),{...r,chest:r.chest?{...r.chest}:void 0,burningTurns:0});this.units=[];const n=t.filter(r=>r.deployed).slice(0,5);(n.length>0?n:t.slice(0,5)).forEach((r,o)=>{const l=e.allySpawns[o%e.allySpawns.length],c=Ul(r);this.units.push({id:`ally_${r.uid}`,rosterUid:r.uid,name:r.name,jobId:r.jobId,team:"ally",level:r.level,col:l.col,row:l.row,facing:l.facing,hp:c.hp,maxHp:c.hp,mp:c.mp,maxMp:c.mp,atk:c.atk,mag:c.mag,def:c.def,speed:c.speed,move:c.move,jump:c.jump,evasion:c.evasion,shieldBlock:c.shieldBlock,ct:20+c.speed*2,footprint:1,unlockedSkills:[...r.unlockedSkills],statuses:[],hasMovedThisTurn:!1,hasActedThisTurn:!1})});for(const r of e.enemies){const o=Oc(r.jobId,r.level,r.hpScale??1,r.atkScale??1),l=It[r.jobId];this.units.push({id:r.id,name:r.name,jobId:r.jobId,team:"enemy",level:r.level,col:r.col,row:r.row,facing:r.facing,hp:o.hp,maxHp:o.hp,mp:o.mp,maxMp:o.mp,atk:o.atk,mag:o.mag,def:o.def,speed:o.speed,move:o.move,jump:o.jump,evasion:o.evasion,shieldBlock:o.shieldBlock,ct:10+o.speed*2,isBoss:r.isBoss,isUndead:r.isUndead,footprint:r.footprint??1,bossPhase:r.isBoss?1:void 0,unlockedSkills:l.skills.map(c=>c.id),statuses:[],aiRole:r.aiRole,hasMovedThisTurn:!1,hasActedThisTurn:!1,pendingMeteor:null})}}getTile(e,t){return this.tiles.get(At(e,t))}getUnit(e){if(e)return this.units.find(t=>t.id===e)}getUnitAt(e,t,i=!1){return this.units.find(n=>!i&&n.hp<=0?!1:Bl(n).some(a=>a.col===e&&a.row===t))}getActiveUnit(){return this.getUnit(this.activeUnitId)}startNextTurn(){return this.advanceToNextTurn()}advanceToNextTurn(){if(this.checkVictoryCondition(),this.combatEnded)return this.activeUnitId=null,{activeUnit:null,burnDamageEvents:[],poisonDamageEvents:[]};const e=$c(this.units);if(!e)return this.activeUnitId=null,{activeUnit:null,burnDamageEvents:[],poisonDamageEvents:[]};this.activeUnitId=e.id,e.hasMovedThisTurn=!1,e.hasActedThisTurn=!1,this.turnCount++,e.mp=Math.min(e.maxMp,e.mp+4);const t=[],i=[];if(Gt(e,"poison")){const r=Math.max(10,Math.round(e.maxHp*.08));e.hp=Math.max(0,e.hp-r),t.push({unitId:e.id,damage:r,killed:e.hp<=0})}const n=this.getTile(e.col,e.row);if(n&&(n.burningTurns??0)>0&&e.hp>0){const r=Math.max(12,Math.round(e.maxHp*.07));e.hp=Math.max(0,e.hp-r),n.burningTurns=Math.max(0,(n.burningTurns??1)-1),i.push({unitId:e.id,damage:r,killed:e.hp<=0})}for(const r of e.statuses)r.turns-=1;e.statuses=e.statuses.filter(r=>r.turns>0);let a;if(e.hp>0&&e.pendingMeteor){const r=e.pendingMeteor;e.pendingMeteor=null;const o=[],l=this.getAoeTiles(r.centerCol,r.centerRow,{...It.belias_boss.skills[2]});for(const c of l){const d=this.getTile(c.col,c.row);d&&(d.burningTurns=2);const h=this.getUnitAt(c.col,c.row);if(h&&h.team==="ally"&&h.hp>0){const u=Math.max(25,Math.round(r.power*(100/(100+ca(h)))));h.hp=Math.max(0,h.hp-u),o.push({targetId:h.id,damage:u,killed:h.hp<=0})}}a={centerCol:r.centerCol,centerRow:r.centerRow,hits:o}}return e.hp<=0?(this.checkVictoryCondition(),this.combatEnded?(this.activeUnitId=null,{activeUnit:null,burnDamageEvents:i,poisonDamageEvents:t,detonatedMeteor:a}):this.advanceToNextTurn()):(this.checkVictoryCondition(),{activeUnit:e,burnDamageEvents:i,poisonDamageEvents:t,detonatedMeteor:a})}canUnitMove(e){return e.hp<=0||e.hasMovedThisTurn||e.move<=0||Gt(e,"immobilize")?!1:this.getMoveRange(e).size>1}getPostActionState(e){const t=this.checkVictoryCondition();return t==="victory"?"VICTORY":t==="defeat"?"DEFEAT":e.hasActedThisTurn?!e.hasMovedThisTurn&&this.canUnitMove(e)?"CONTINUE_TURN":"SELECT_FACING":e.hasMovedThisTurn&&this.getAvailableSkills(e).length===0?"SELECT_FACING":"CONTINUE_TURN"}endUnitTurn(e){const t=this.getActiveUnit();if(!t)return 0;e&&(t.facing=e);const i=Yc(t,t.hasMovedThisTurn,t.hasActedThisTurn);return t.hasMovedThisTurn=!1,t.hasActedThisTurn=!1,this.activeUnitId=null,this.checkVictoryCondition(),i}endTurn(e){return this.endUnitTurn(e)}getMoveRange(e){return Jc(this.tiles,this.stage.cols,this.stage.rows,e,this.units)}moveUnit(e,t,i){if(!this.getMoveRange(e).get(At(t,i)))return{moved:!1};(t!==e.col||i!==e.row)&&(e.facing=Yn(t-e.col,i-e.row,e.facing)),e.col=t,e.row=i,e.hasMovedThisTurn=!0;let r;if(e.team==="ally"){const o=this.getTile(t,i);o?.chest&&!o.chest.opened&&(o.chest.opened=!0,r={id:o.chest.id,gold:o.chest.gold,itemId:o.chest.itemId})}return{moved:!0,openedChest:r}}getAvailableSkills(e){const t=It[e.jobId],i=Gt(e,"silence");return t.skills.filter(n=>!(!e.unlockedSkills.includes(n.id)&&!n.isBasic||i&&n.isMagic))}getSkillTargetableTiles(e,t){if(t.aoeShape==="self")return[{col:e.col,row:e.row}];const n=this.getTile(e.col,e.row)?.height??1,a=t.minRange??1,r=[];for(let o=0;o<this.stage.rows;o++)for(let l=0;l<this.stage.cols;l++){const c=this.getTile(l,o);if(!c)continue;if(t.aoeShape==="line2"){const u=Math.abs(l-e.col),f=Math.abs(o-e.row);if(!(u===0&&f>=1&&f<=2||f===0&&u>=1&&u<=2))continue;r.push({col:l,row:o});continue}if(t.aoeShape==="cone"){Sn(e.col,e.row,l,o)===1&&r.push({col:l,row:o});continue}const d=Sn(e.col,e.row,l,o),h=qc(t,n,c.height);if(d>=a&&d<=h){if(!t.isMagic&&!t.isBow&&!t.ignoresHeight&&!t.isShadowStep&&!t.isHeal&&!t.isRevive&&!t.isBuff&&Math.abs(c.height-n)>Math.max(2,e.jump))continue;r.push({col:l,row:o})}}return r}getAoeTiles(e,t,i,n,a){const r=[],o=(l,c)=>{l>=0&&l<this.stage.cols&&c>=0&&c<this.stage.rows&&r.push({col:l,row:c})};if(i.aoeShape==="single"||i.aoeShape==="self")o(e,t);else if(i.aoeShape==="line2"){if(o(e,t),n!==void 0&&a!==void 0){const l=Math.sign(e-n),c=Math.sign(t-a);Sn(n,a,e,t)===1&&o(e+l,t+c)}}else if(i.aoeShape==="cross"){o(e,t);for(let l=1;l<=i.aoeRadius;l++)o(e+l,t),o(e-l,t),o(e,t+l),o(e,t-l)}else if(i.aoeShape==="diamond")for(let l=-i.aoeRadius;l<=i.aoeRadius;l++)for(let c=-i.aoeRadius;c<=i.aoeRadius;c++)Math.abs(l)+Math.abs(c)<=i.aoeRadius&&o(e+l,t+c);else if(i.aoeShape==="square3x3")for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++)o(e+l,t+c);else if(i.aoeShape==="cone"&&(o(e,t),n!==void 0&&a!==void 0)){const l=Math.sign(e-n),c=Math.sign(t-a);l!==0?(o(e+l,t),o(e+l,t-1),o(e+l,t+1)):c!==0&&(o(e,t+c),o(e-1,t+c),o(e+1,t+c))}return r}evaluateKnockback(e,t,i){if((i.footprint??1)>1)return null;const n=i.col-e,a=i.row-t;let r=0,o=0;Math.abs(n)>=Math.abs(a)?r=n>=0?1:-1:o=a>=0?1:-1;const l=i.col+r,c=i.row+o,d=this.getTile(i.col,i.row),h=this.getTile(l,c);if(!d||!h||!h.walkable||h.height>d.height||this.getUnitAt(l,c))return null;const u=d.height-h.height,f=u>2?Math.max(15*u,Math.round(i.maxHp*.12*u)):0;return{destCol:l,destRow:c,fallDamage:f}}findShadowStepTile(e,t){const i=Fl(e.facing),n=e.col-i.dc,a=e.row-i.dr,r=[{col:n,row:a},{col:e.col+i.dr,row:e.row-i.dc},{col:e.col-i.dr,row:e.row+i.dc},{col:e.col+i.dc,row:e.row+i.dr}];for(const o of r){const l=this.getTile(o.col,o.row);if(!l||!l.walkable)continue;const c=this.getUnitAt(o.col,o.row);if(!c||c.id===t.id)return o}return null}computeCombatForecast(e,t,i,n,a,r){const o=a??e.col,l=r??e.row,c=this.getAoeTiles(i,n,t,o,l),d=new Map;for(const J of c){const te=this.getUnitAt(J.col,J.row,!!t.isRevive);te&&(t.isHeal||t.isBuff?te.team===e.team&&te.hp>0&&d.set(te.id,te):t.isRevive?te.team===e.team&&te.hp<=0&&d.set(te.id,te):te.team!==e.team&&te.hp>0&&d.set(te.id,te))}const h=this.getUnitAt(i,n,!!t.isRevive)??Array.from(d.values())[0];if(!h)return null;const u=this.getTile(o,l),f=this.getTile(h.col,h.row),g=u?.height??1,x=f?.height??1;if(t.isHeal||t.isRevive||t.isBuff){const J=t.isRevive?Math.round(h.maxHp*(t.healPct??.5)):t.isHeal?Math.round(e.mag*t.multiplier*1.65):t.restoreMpPct?Math.round(e.maxMp*t.restoreMpPct):0,te=t.isRevive?"RESSUSCITAR":t.isHeal?`CURA PREVISTA: +${J} HP`:t.restoreMpPct?`MP +${J}`:`BUFF: ${t.shortName.toUpperCase()}`;return{attackerId:e.id,defenderId:h.id,skillId:t.id,predictedDamage:J,isHeal:!!t.isHeal,isRevive:!!t.isRevive,isBuff:!!t.isBuff,hitChance:100,critChance:0,blockChance:0,direction:"FRONT",directionLabel:"✨ ALIADO",heightDiff:g-x,heightBonusPct:0,heightLabel:`⛰️ ALT ${g}→${x}`,willKnockback:!1,expectedFallDamage:0,aoeTargetIds:Array.from(d.keys()),formattedBanner:`[${te} • CHANCE: 100%]`}}let m=o,p=l,v=Ol(m,p,h.col,h.row,h.facing);t.isShadowStep&&(v="BACK");const w=Wc(v),y=t.ignoresHeight?0:Xc(g,x),E=Math.round(y*100),T=t.isMagic?e.mag:e.atk,_=t.isMagic?Math.round(ca(h)*.7):ca(h);let b=T*t.multiplier*(100/(100+_));const L=t.isMagic?1+(w.damageMult-1)*.5:w.damageMult;b*=L*(1+y),t.bonusWaterMetal&&f&&(f.surface==="water"||f.surface==="swamp"||f.surface==="ice"||f.surface==="metal")&&(b*=1+t.bonusWaterMetal),t.bonusUndeadBoss&&(h.isUndead||h.isBoss)&&(b*=1+t.bonusUndeadBoss);const C=Math.max(8,Math.round(b)),I=t.isMagic||t.isShadowStep?0:h.evasion*w.evasionMult,B=Math.round(Math.max(55,Math.min(100,(1-I)*100))),G=.05+(e.jobId==="ninja"||e.jobId==="sniper"?.08:0),R=t.guaranteedCrit?100:Math.round(Math.min(100,(G+w.critBonus)*100)),z=t.isMagic||w.ignoresShield||t.isShadowStep?0:Math.round(h.shieldBlock*100);let W=0;const P=!!t.knockback;if(P){const J=this.evaluateKnockback(m,p,h);J&&(W=J.fallDamage)}const k=E>0?` • ⛰️ ALTURA (+${E}%)`:` • ⛰️ H:${g}→${x}`,F=W>0?` • 💥 QUEDA (+${W})`:"",Y=`[DANO PREVISTO: ${C} • CHANCE: ${B}% • CRÍTICO: ${R}% • ${w.label}${k}${F}]`;return{attackerId:e.id,defenderId:h.id,skillId:t.id,predictedDamage:C,isHeal:!1,isRevive:!1,isBuff:!1,hitChance:B,critChance:R,blockChance:z,direction:v,directionLabel:w.label,heightDiff:g-x,heightBonusPct:E,heightLabel:E>0?`⛰️ ALTURA (+${E}%)`:`⛰️ ALT ${g}→${x}`,willKnockback:P,expectedFallDamage:W,aoeTargetIds:Array.from(d.keys()),formattedBanner:Y}}executeAttack(e,t,i){const n=this.getAvailableSkills(e),a=n.find(r=>r.isBasic)??n[0];return a?this.executeSkill(e,a,t,i):null}executeSkill(e,t,i,n){e.mp=Math.max(0,e.mp-t.mpCost),e.hasActedThisTurn=!0,(i!==e.col||n!==e.row)&&(e.facing=Yn(i-e.col,n-e.row,e.facing));let a;if(t.isShadowStep){const c=this.getUnitAt(i,n);if(c){const d=this.findShadowStepTile(c,e);d&&(e.col=d.col,e.row=d.row,e.facing=Yn(c.col-d.col,c.row-d.row,e.facing),a=d)}}const r=this.getAoeTiles(i,n,t,e.col,e.row),o={attackerId:e.id,skill:t,targetCol:i,targetRow:n,aoeTiles:r,hits:[],teleportedTo:a};if(t.id==="apocalypse_meteor")return e.pendingMeteor={centerCol:i,centerRow:n,radius:t.aoeRadius,power:Math.round(e.mag*t.multiplier)},o.telegraphedMeteor={centerCol:i,centerRow:n,radius:t.aoeRadius},o;if(t.igniteTiles&&t.igniteTiles>0)for(const c of r){const d=this.getTile(c.col,c.row);d&&d.walkable&&(d.burningTurns=Math.max(d.burningTurns??0,t.igniteTiles))}if(t.aoeShape==="self"){if(t.restoreMpPct){const c=Math.round(e.maxMp*t.restoreMpPct);e.mp=Math.min(e.maxMp,e.mp+c),o.hits.push({targetId:e.id,targetName:e.name,damage:0,healed:0,revived:!1,mpRestored:c,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1})}return t.buffType==="aegis"&&(e.statuses.push({id:"aegis",turns:3}),o.hits.push({targetId:e.id,targetName:e.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,appliedStatus:"aegis",killed:!1})),o}const l=new Map;for(const c of r){const d=this.getUnitAt(c.col,c.row,!!t.isRevive);d&&(t.isHeal||t.isBuff?d.team===e.team&&d.hp>0&&l.set(d.id,d):t.isRevive?d.team===e.team&&d.hp<=0&&l.set(d.id,d):d.team!==e.team&&d.hp>0&&l.set(d.id,d))}for(const c of l.values()){if(t.isRevive){const I=Math.max(20,Math.round(c.maxHp*(t.healPct??.5)));c.hp=I,c.ct=30,o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:I,revived:!0,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1});continue}if(t.isHeal){const I=Math.round(e.mag*t.multiplier*1.65),B=c.hp;c.hp=Math.min(c.maxHp,c.hp+I),o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:c.hp-B,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,killed:!1});continue}if(t.isBuff&&t.buffType==="haste"){c.statuses=c.statuses.filter(I=>I.id!=="slow"&&I.id!=="haste"),c.statuses.push({id:"haste",turns:3}),c.ct=Math.min(100,c.ct+(t.ctBoost??30)),o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:!1,isEvaded:!1,direction:"FRONT",heightBonusPct:0,fallDamage:0,appliedStatus:"haste",killed:!1});continue}const d=this.computeCombatForecast(e,t,c.col,c.row),h=d?d.predictedDamage:Math.round(e.atk*t.multiplier),u=d?d.hitChance/100:1,f=d?d.critChance/100:.05,g=d?d.blockChance/100:0,x=d?d.direction:"FRONT",m=d?d.heightBonusPct:0,p=g>0&&this.rng()<g,v=!p&&this.rng()>u;if(p||v){o.hits.push({targetId:c.id,targetName:c.name,damage:0,healed:0,revived:!1,mpRestored:0,lifesteal:0,isCrit:!1,isBlocked:p,isEvaded:v,direction:x,heightBonusPct:m,fallDamage:0,killed:!1});continue}const w=t.guaranteedCrit||this.rng()<f,y=.94+this.rng()*.12,T=Math.max(10,Math.round(h*(w?1.5:1)*y));c.hp=Math.max(0,c.hp-T);let _=0;t.lifestealPct&&(_=Math.round(T*t.lifestealPct),e.hp=Math.min(e.maxHp,e.hp+_));let b;if(t.statusEffect&&c.hp>0){const I=t.statusChance??.6;this.rng()<I&&(c.statuses=c.statuses.filter(B=>B.id!==t.statusEffect),c.statuses.push({id:t.statusEffect,turns:2}),b=t.statusEffect)}let L,C=0;if(t.knockback&&c.hp>0){const I=this.evaluateKnockback(e.col,e.row,c);I&&(c.col=I.destCol,c.row=I.destRow,L={col:I.destCol,row:I.destRow},C=I.fallDamage,C>0&&(c.hp=Math.max(0,c.hp-C)))}c.jobId==="belias_boss"&&c.bossPhase===1&&c.hp>0&&c.hp<=c.maxHp*.55&&(c.bossPhase=2,c.speed+=2,c.atk=Math.round(c.atk*1.15),c.mag=Math.round(c.mag*1.15)),o.hits.push({targetId:c.id,targetName:c.name,damage:T,healed:0,revived:!1,mpRestored:0,lifesteal:_,isCrit:w,isBlocked:!1,isEvaded:!1,direction:x,heightBonusPct:m,knockbackMovedTo:L,fallDamage:C,appliedStatus:b,killed:c.hp<=0})}return this.checkVictoryCondition(),o}checkVictoryCondition(){const e=this.units.some(i=>i.team==="ally"&&i.hp>0);return this.units.some(i=>i.team==="enemy"&&i.hp>0)?e?this.combatEnded=null:this.combatEnded="defeat":this.combatEnded="victory",this.combatEnded}checkBattleEnd(){return this.checkVictoryCondition()}}class Qc{static chooseBestAction(e,t){const i=e.getMoveRange(t),n=Array.from(i.values()),a=e.getAvailableSkills(t).filter(f=>f.mpCost<=t.mp),r=e.units.filter(f=>f.team==="ally"&&f.hp>0),o=e.units.filter(f=>f.team==="enemy"&&f.hp>0);let l={moveCol:t.col,moveRow:t.row,movePath:[{col:t.col,row:t.row}],skill:null,targetCol:t.col,targetRow:t.row,endFacing:t.facing,score:-1/0};if(r.length===0)return l;const c=(f,g)=>{let x=r[0],m=Sn(f,g,x.col,x.row);for(const p of r){const v=Sn(f,g,p.col,p.row);v<m&&(m=v,x=p)}return{hero:x,dist:m}},d=t.col,h=t.row,u=n.slice(0,48);for(const f of u){t.col=f.col,t.row=f.row;const g=e.getTile(f.col,f.row),x=g?.height??1,m=(g?.burningTurns??0)>0?-35:0,p=t.aiRole==="sniper"?x*12:t.aiRole==="mage"||t.aiRole==="support"?x*4:x*2;for(const T of a){const _=e.getSkillTargetableTiles(t,T),b=[];if(T.aoeShape==="self")b.push({col:f.col,row:f.row});else if(T.aoeShape==="single"||T.aoeShape==="line2")for(const L of _){const C=e.getUnitAt(L.col,L.row);C&&(T.isHeal||T.isBuff?C.team==="enemy":C.team==="ally")&&b.push(L)}else{const L=new Set,C=T.isHeal||T.isBuff?o:r;for(const I of _)if(C.some(G=>Sn(G.col,G.row,I.col,I.row)<=T.aoeRadius+1)){const G=At(I.col,I.row);L.has(G)||(L.add(G),b.push(I))}}for(const L of b){let C=p+m;if(T.isHeal){const G=e.getAoeTiles(L.col,L.row,T,f.col,f.row);let R=0;for(const z of G){const W=e.getUnitAt(z.col,z.row);if(W&&W.team==="enemy"&&W.hp<W.maxHp*.8){const P=1-W.hp/W.maxHp;C+=55+P*75+(W.isBoss?35:0),R++}}if(R===0)continue}else if(T.isBuff)if(T.buffType==="haste"){const G=e.getAoeTiles(L.col,L.row,T,f.col,f.row);let R=0;for(const z of G){const W=e.getUnitAt(z.col,z.row);W&&W.team==="enemy"&&!Gt(W,"haste")&&(C+=34+(W.isBoss?25:0),R++)}if(R===0)continue}else continue;else if(T.id==="apocalypse_meteor"){if(t.pendingMeteor)continue;const G=e.getAoeTiles(L.col,L.row,T,f.col,f.row);let R=0;for(const z of G){const W=e.getUnitAt(z.col,z.row);W&&W.team==="ally"&&(R++,C+=125)}if(R===0)continue;R>=2&&(C+=160)}else{const G=e.getAoeTiles(L.col,L.row,T,f.col,f.row),R=new Set,z=new Set;for(const W of G){const P=e.getUnitAt(W.col,W.row);!P||P.hp<=0||(P.team==="ally"?R.add(P.id):P.id!==t.id&&z.add(P.id))}if(R.size===0)continue;C-=z.size*60,R.size>=2&&(C+=(R.size-1)*42);for(const W of R){const P=e.getUnit(W),k=e.computeCombatForecast(t,T,P.col,P.row,f.col,f.row);if(!k)continue;C+=Math.min(85,k.predictedDamage*.45),k.predictedDamage>=P.hp&&(C+=75);const F=Ol(f.col,f.row,P.col,P.row,P.facing);F==="BACK"?C+=45:F==="SIDE"&&(C+=22),(P.jobId==="black_mage"||P.jobId==="white_mystic")&&(C+=22),C+=(1-P.hp/P.maxHp)*28,Gt(P,"aegis")&&(C+=38),k.expectedFallDamage>0&&(C+=35)}}const{hero:I}=c(f.col,f.row),B=Yn(I.col-f.col,I.row-f.row,t.facing);C>l.score&&(l={moveCol:f.col,moveRow:f.row,movePath:f.path,skill:T,targetCol:L.col,targetRow:L.row,endFacing:B,score:C})}}const{hero:v,dist:w}=c(f.col,f.row),E=(t.aiRole==="sniper"?Math.abs(w-4)*-12+p:t.aiRole==="support"?-w*5+p:-w*14+p)+m-25;E>l.score&&(l={moveCol:f.col,moveRow:f.row,movePath:f.path,skill:null,targetCol:f.col,targetRow:f.row,endFacing:Yn(v.col-f.col,v.row-f.row,t.facing),score:E})}return t.col=d,t.row=h,l}}const Nr="187",jc=0,wo=1,eh=2,Kn=1,th=2,qn=3,en=0,Ht=1,gt=2,ji=0,Jn=1,Va=2,To=3,Ao=4,ih=5,Mn=100,nh=101,sh=102,ah=103,rh=104,oh=200,lh=201,ch=202,hh=203,kl=204,zl=205,dh=206,uh=207,fh=208,ph=209,mh=210,gh=211,_h=212,vh=213,xh=214,Wa=0,Xa=1,qa=2,es=3,$a=4,Ya=5,Ka=6,Ja=7,Fr=0,Mh=1,Sh=2,Ri=0,Br=1,Or=2,kr=3,na=4,zr=5,Hr=6,Gr=7,Hl=300,wn=301,ts=302,ha=303,da=304,is=1e3,Ai=1001,Za=1002,Dt=1003,bh=1004,fs=1005,Vt=1006,ua=1007,zi=1008,Qt=1009,Gl=1010,Vl=1011,ns=1012,Vr=1013,vi=1014,hi=1015,Xt=1016,Wr=1017,Xr=1018,Tn=1020,Wl=35902,Xl=35899,ql=1021,$l=1022,_i=1023,Vi=1026,Hi=1027,qr=1028,$r=1029,tn=1030,Yr=1031,Kr=1033,Gs=33776,Vs=33777,Ws=33778,Xs=33779,Qa=35840,ja=35841,er=35842,tr=35843,ir=36196,nr=37492,sr=37496,ar=37488,rr=37489,Ys=37490,or=37491,lr=37808,cr=37809,hr=37810,dr=37811,ur=37812,fr=37813,pr=37814,mr=37815,gr=37816,_r=37817,vr=37818,xr=37819,Mr=37820,Sr=37821,br=36492,yr=36494,Er=36495,wr=36283,Tr=36284,Ks=36285,Ar=36286,yh=3200,Js=0,Eh=1,Ti="",Zt="srgb",Zs="srgb-linear",Qs="linear",je="srgb",fa=7680,wh=519,Th=512,Ah=513,Ch=514,Yl=515,Rh=516,Ph=517,Kl=518,Jl=519,Lh=35044,Zl=35048,Co="300 es",di=2e3,ss=2001;function Ih(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function js(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Dh(){const s=js("canvas");return s.style.display="block",s}const Ro={};function Po(...s){const e="THREE."+s.shift();console.log(e,...s)}function Ql(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function De(...s){s=Ql(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=Ql(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function bn(...s){const e=s.join(" ");e in Ro||(Ro[e]=!0,De(...s))}function Uh(s,e,t){return new Promise(function(i,n){function a(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const Nh={[Wa]:Wa,[qa]:Ka,[$a]:$a,[es]:Ya,[Xa]:Xa,[Ka]:qa,[Ja]:Ja,[Ya]:es};class nn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const a=n.indexOf(t);a!==-1&&n.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let a=0,r=n.length;a<r;a++)n[a].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Lo=1234567;const Zn=Math.PI/180,as=180/Math.PI;function Pn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[s&255]+Ft[s>>8&255]+Ft[s>>16&255]+Ft[s>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function We(s,e,t){return Math.max(e,Math.min(t,s))}function Jr(s,e){return(s%e+e)%e}function Fh(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function Bh(s,e,t){return s!==e?(t-s)/(e-s):0}function Qn(s,e,t){return(1-t)*s+t*e}function Oh(s,e,t,i){return Qn(s,e,1-Math.exp(-t*i))}function kh(s,e=1){return e-Math.abs(Jr(s,e*2)-e)}function zh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Hh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Gh(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Vh(s,e){return s+Math.random()*(e-s)}function Wh(s){return s*(.5-Math.random())}function Xh(s){s!==void 0&&(Lo=s);let e=Lo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qh(s){return s*Zn}function $h(s){return s*as}function Yh(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Kh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function jl(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Jh(s,e,t,i,n){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),d=r((e+i)/2),h=a((e-i)/2),u=r((e-i)/2),f=a((i-e)/2),g=r((i-e)/2);switch(n){case"XYX":s.set(o*d,l*h,l*u,o*c);break;case"YZY":s.set(l*u,o*d,l*h,o*c);break;case"ZXZ":s.set(l*h,l*u,o*d,o*c);break;case"XZX":s.set(o*d,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*d,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*d,o*c);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Zr(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ec(s,e){if(e.constructor===Float32Array)return s;const t=Zr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function tc(s,e){if(e.constructor===Float32Array)return s;const t=Zr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}const Bn={DEG2RAD:Zn,RAD2DEG:as,generateUUID:Pn,clamp:We,euclideanModulo:Jr,mapLinear:Fh,inverseLerp:Bh,lerp:Qn,damp:Oh,pingpong:kh,smoothstep:zh,smootherstep:Hh,randInt:Gh,randFloat:Vh,randFloatSpread:Wh,seededRandom:Xh,degToRad:qh,radToDeg:$h,isPowerOfTwo:Yh,ceilPowerOfTwo:Kh,floorPowerOfTwo:jl,setQuaternionFromProperEuler:Jh,normalize:tc,denormalize:ec};class Ae{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*n+e.x,this.y=a*n+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ln{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,a,r,o){let l=i[n+0],c=i[n+1],d=i[n+2],h=i[n+3],u=a[r+0],f=a[r+1],g=a[r+2],x=a[r+3];if(h!==x||l!==u||c!==f||d!==g){let m=l*u+c*f+d*g+h*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const v=Math.acos(m),w=Math.sin(v);p=Math.sin(p*v)/w,o=Math.sin(o*v)/w,l=l*p+u*o,c=c*p+f*o,d=d*p+g*o,h=h*p+x*o}else{l=l*p+u*o,c=c*p+f*o,d=d*p+g*o,h=h*p+x*o;const v=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=v,c*=v,d*=v,h*=v}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,a,r){const o=i[n],l=i[n+1],c=i[n+2],d=i[n+3],h=a[r],u=a[r+1],f=a[r+2],g=a[r+3];return e[t]=o*g+d*h+l*f-c*u,e[t+1]=l*g+d*u+c*h-o*f,e[t+2]=c*g+d*f+o*u-l*h,e[t+3]=d*g-o*h-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(n/2),h=o(a/2),u=l(i/2),f=l(n/2),g=l(a/2);switch(r){case"XYZ":this._x=u*d*h+c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h-u*f*g;break;case"YXZ":this._x=u*d*h+c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h+u*f*g;break;case"ZXY":this._x=u*d*h-c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h-u*f*g;break;case"ZYX":this._x=u*d*h-c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h+u*f*g;break;case"YZX":this._x=u*d*h+c*f*g,this._y=c*f*h+u*d*g,this._z=c*d*g-u*f*h,this._w=c*d*h-u*f*g;break;case"XZY":this._x=u*d*h-c*f*g,this._y=c*f*h-u*d*g,this._z=c*d*g+u*f*h,this._w=c*d*h+u*f*g;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(a-c)*f,this._z=(r-n)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(n+r)/f,this._z=(a+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(a-c)/f,this._x=(n+r)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(r-n)/f,this._x=(a+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+r*o+n*c-a*l,this._y=n*d+r*l+a*o-i*c,this._z=a*d+r*c+i*l-n*o,this._w=r*d-i*o-n*l-a*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,a=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,a=-a,r=-r,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+a*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+a*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Io.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Io.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*n,this.y=a[1]*t+a[4]*i+a[7]*n,this.z=a[2]*t+a[5]*i+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*n+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*n+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*n+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*n-o*i),d=2*(o*t-a*n),h=2*(a*i-r*t);return this.x=t+l*c+r*h-o*d,this.y=i+l*d+o*c-a*h,this.z=n+l*h+a*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n,this.y=a[1]*t+a[5]*i+a[9]*n,this.z=a[2]*t+a[6]*i+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=n*l-a*o,this.y=a*r-i*l,this.z=i*o-n*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new N,Io=new Ln;class Be{static{this.prototype.isMatrix3=!0}constructor(e,t,i,n,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,r,o,l,c)}set(e,t,i,n,a,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=n,d[2]=o,d[3]=t,d[4]=a,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],f=i[5],g=i[8],x=n[0],m=n[3],p=n[6],v=n[1],w=n[4],y=n[7],E=n[2],T=n[5],_=n[8];return a[0]=r*x+o*v+l*E,a[3]=r*m+o*w+l*T,a[6]=r*p+o*y+l*_,a[1]=c*x+d*v+h*E,a[4]=c*m+d*w+h*T,a[7]=c*p+d*y+h*_,a[2]=u*x+f*v+g*E,a[5]=u*m+f*w+g*T,a[8]=u*p+f*y+g*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*r*d-t*o*c-i*a*d+i*o*l+n*a*c-n*r*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*r-o*c,u=o*l-d*a,f=c*a-r*l,g=t*h+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(n*c-d*i)*x,e[2]=(o*i-n*r)*x,e[3]=u*x,e[4]=(d*t-n*l)*x,e[5]=(n*a-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(r*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-n*c,n*l,-n*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return bn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ma.makeScale(e,t)),this}rotate(e){return bn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return bn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Be,Do=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uo=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zh(){const s={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(n,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===je&&(n.r=Pi(n.r),n.g=Pi(n.g),n.b=Pi(n.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(n.applyMatrix3(this.spaces[a].toXYZ),n.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===je&&(n.r=yn(n.r),n.g=yn(n.g),n.b=yn(n.b))),n},workingToColorSpace:function(n,a){return this.convert(n,this.workingColorSpace,a)},colorSpaceToWorking:function(n,a){return this.convert(n,a,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ti?Qs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,a=this.workingColorSpace){return n.fromArray(this.spaces[a].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,a,r){return n.copy(this.spaces[r].fromXYZ).multiply(this.spaces[a].toXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Zs]:{primaries:e,whitePoint:i,transfer:Qs,toXYZ:Do,fromXYZ:Uo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:i,transfer:je,toXYZ:Do,fromXYZ:Uo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),s}const $e=Zh();function Pi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function yn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let rn;class Qh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{rn===void 0&&(rn=js("canvas")),rn.width=e.width,rn.height=e.height;const n=rn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=rn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=js("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),a=n.data;for(let r=0;r<a.length;r++)a[r]=Pi(a[r]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pi(t[i]/255)*255):t[i]=Pi(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jh=0;class Qr{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Pn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let a;if(Array.isArray(n)){a=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?a.push(ga(n[r].image)):a.push(ga(n[r]))}else a=ga(n);i.url=a}return t||(e.images[this.uuid]=i),i}}function ga(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Qh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let ed=0;const _a=new N;class Ot extends nn{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=Ai,n=Ai,a=Vt,r=zi,o=_i,l=Qt,c=Ot.DEFAULT_ANISOTROPY,d=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Pn(),this.name="",this.source=new Qr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(_a).x}get height(){return this.source.getSize(_a).y}get depth(){return this.source.getSize(_a).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case is:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case is:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Hl;Ot.DEFAULT_ANISOTROPY=1;class ft{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*n+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*n+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*n+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,a;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(f+1)/2,E=(p+1)/2,T=(d+u)/4,_=(h+x)/4,b=(g+m)/4;return w>y&&w>E?w<.01?(i=0,n=.707106781,a=.707106781):(i=Math.sqrt(w),n=T/i,a=_/i):y>E?y<.01?(i=.707106781,n=0,a=.707106781):(n=Math.sqrt(y),i=T/n,a=b/n):E<.01?(i=.707106781,n=.707106781,a=0):(a=Math.sqrt(E),i=_/a,n=b/a),this.set(i,n,a,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(u-d)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class td extends nn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const n=i.count;for(let a=0;a<n;a++)this.textures[a]=new Ot({width:e,height:t,depth:i.depth}),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,a=this.textures.length;n<a;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Qr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qt extends td{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ic extends Ot{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class id extends Ot{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class tt{static{this.prototype.isMatrix4=!0}constructor(e,t,i,n,a,r,o,l,c,d,h,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,r,o,l,c,d,h,u,f,g,x,m)}set(e,t,i,n,a,r,o,l,c,d,h,u,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=n,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,n=1/on.setFromMatrixColumn(e,0).length(),a=1/on.setFromMatrixColumn(e,1).length(),r=1/on.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),d=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const u=r*d,f=r*h,g=o*d,x=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const u=l*d,f=l*h,g=c*d,x=c*h;t[0]=u+x*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*h,t[5]=r*d,t[9]=-o,t[2]=f*o-g,t[6]=x+u*o,t[10]=r*l}else if(e.order==="ZXY"){const u=l*d,f=l*h,g=c*d,x=c*h;t[0]=u-x*o,t[4]=-r*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*d,t[9]=x-u*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const u=r*d,f=r*h,g=o*d,x=o*h;t[0]=l*d,t[4]=g*c-f,t[8]=u*c+x,t[1]=l*h,t[5]=x*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const u=r*l,f=r*c,g=o*l,x=o*c;t[0]=l*d,t[4]=x-u*h,t[8]=g*h+f,t[1]=h,t[5]=r*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+g,t[10]=u-x*h}else if(e.order==="XZY"){const u=r*l,f=r*c,g=o*l,x=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+x,t[5]=r*d,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*d,t[10]=x*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nd,e,sd)}lookAt(e,t,i){const n=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Ui.crossVectors(i,$t),Ui.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Ui.crossVectors(i,$t)),Ui.normalize(),ps.crossVectors($t,Ui),n[0]=Ui.x,n[4]=ps.x,n[8]=$t.x,n[1]=Ui.y,n[5]=ps.y,n[9]=$t.y,n[2]=Ui.z,n[6]=ps.z,n[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],v=i[3],w=i[7],y=i[11],E=i[15],T=n[0],_=n[4],b=n[8],L=n[12],C=n[1],I=n[5],B=n[9],G=n[13],R=n[2],z=n[6],W=n[10],P=n[14],k=n[3],F=n[7],Y=n[11],J=n[15];return a[0]=r*T+o*C+l*R+c*k,a[4]=r*_+o*I+l*z+c*F,a[8]=r*b+o*B+l*W+c*Y,a[12]=r*L+o*G+l*P+c*J,a[1]=d*T+h*C+u*R+f*k,a[5]=d*_+h*I+u*z+f*F,a[9]=d*b+h*B+u*W+f*Y,a[13]=d*L+h*G+u*P+f*J,a[2]=g*T+x*C+m*R+p*k,a[6]=g*_+x*I+m*z+p*F,a[10]=g*b+x*B+m*W+p*Y,a[14]=g*L+x*G+m*P+p*J,a[3]=v*T+w*C+y*R+E*k,a[7]=v*_+w*I+y*z+E*F,a[11]=v*b+w*B+y*W+E*Y,a[15]=v*L+w*G+y*P+E*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],v=l*f-c*u,w=o*f-c*h,y=o*u-l*h,E=r*f-c*d,T=r*u-l*d,_=r*h-o*d;return t*(x*v-m*w+p*y)-i*(g*v-m*E+p*T)+n*(g*w-x*E+p*_)-a*(g*y-x*T+m*_)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],n=e[8],a=e[1],r=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(r*d-o*c)-i*(a*d-o*l)+n*(a*c-r*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=t*o-i*r,w=t*l-n*r,y=t*c-a*r,E=i*l-n*o,T=i*c-a*o,_=n*c-a*l,b=d*x-h*g,L=d*m-u*g,C=d*p-f*g,I=h*m-u*x,B=h*p-f*x,G=u*p-f*m,R=v*G-w*B+y*I+E*C-T*L+_*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/R;return e[0]=(o*G-l*B+c*I)*z,e[1]=(n*B-i*G-a*I)*z,e[2]=(x*_-m*T+p*E)*z,e[3]=(u*T-h*_-f*E)*z,e[4]=(l*C-r*G-c*L)*z,e[5]=(t*G-n*C+a*L)*z,e[6]=(m*y-g*_-p*w)*z,e[7]=(d*_-u*y+f*w)*z,e[8]=(r*B-o*C+c*b)*z,e[9]=(i*C-t*B-a*b)*z,e[10]=(g*T-x*y+p*v)*z,e[11]=(h*y-d*T-f*v)*z,e[12]=(o*L-r*I-l*b)*z,e[13]=(t*I-i*L+n*b)*z,e[14]=(x*w-g*E-m*v)*z,e[15]=(d*E-h*w+u*v)*z,this}scale(e){const t=this.elements,i=e.x,n=e.y,a=e.z;return t[0]*=i,t[4]*=n,t[8]*=a,t[1]*=i,t[5]*=n,t[9]*=a,t[2]*=i,t[6]*=n,t[10]*=a,t[3]*=i,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,d=a*o;return this.set(c*r+i,c*o-n*l,c*l+n*o,0,c*o+n*l,d*o+i,d*l-n*r,0,c*l-n*o,d*l+n*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,a,r){return this.set(1,i,a,0,e,1,r,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,d=r+r,h=o+o,u=a*c,f=a*d,g=a*h,x=r*d,m=r*h,p=o*h,v=l*c,w=l*d,y=l*h,E=i.x,T=i.y,_=i.z;return n[0]=(1-(x+p))*E,n[1]=(f+y)*E,n[2]=(g-w)*E,n[3]=0,n[4]=(f-y)*T,n[5]=(1-(u+p))*T,n[6]=(m+v)*T,n[7]=0,n[8]=(g+w)*_,n[9]=(m-v)*_,n[10]=(1-(u+x))*_,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let r=on.set(n[0],n[1],n[2]).length();const o=on.set(n[4],n[5],n[6]).length(),l=on.set(n[8],n[9],n[10]).length();a<0&&(r=-r),ri.copy(this);const c=1/r,d=1/o,h=1/l;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=d,ri.elements[5]*=d,ri.elements[6]*=d,ri.elements[8]*=h,ri.elements[9]*=h,ri.elements[10]*=h,t.setFromRotationMatrix(ri),i.x=r,i.y=o,i.z=l,this}makePerspective(e,t,i,n,a,r,o=di,l=!1){const c=this.elements,d=2*a/(t-e),h=2*a/(i-n),u=(t+e)/(t-e),f=(i+n)/(i-n);let g,x;if(l)g=a/(r-a),x=r*a/(r-a);else if(o===di)g=-(r+a)/(r-a),x=-2*r*a/(r-a);else if(o===ss)g=-r/(r-a),x=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,a,r,o=di,l=!1){const c=this.elements,d=2/(t-e),h=2/(i-n),u=-(t+e)/(t-e),f=-(i+n)/(i-n);let g,x;if(l)g=1/(r-a),x=r/(r-a);else if(o===di)g=-2/(r-a),x=-(r+a)/(r-a);else if(o===ss)g=-1/(r-a),x=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const on=new N,ri=new tt,nd=new N(0,0,0),sd=new N(1,1,1),Ui=new N,ps=new N,$t=new N,No=new tt,Fo=new Ln;class xi{constructor(e=0,t=0,i=0,n=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,a=n[0],r=n[4],o=n[8],l=n[1],c=n[5],d=n[9],h=n[2],u=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-We(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return No.makeRotationFromQuaternion(e),this.setFromRotationMatrix(No,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fo.setFromEuler(this),this.setFromQuaternion(Fo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class jr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ad=0;const Bo=new N,ln=new Ln,Si=new tt,ms=new N,On=new N,rd=new N,od=new Ln,Oo=new N(1,0,0),ko=new N(0,1,0),zo=new N(0,0,1),Ho={type:"added"},ld={type:"removed"},cn={type:"childadded",child:null},va={type:"childremoved",child:null};class ht extends nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new N,t=new xi,i=new Ln,n=new N(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new tt},normalMatrix:{value:new Be}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.multiply(ln),this}rotateOnWorldAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.premultiply(ln),this}rotateX(e){return this.rotateOnAxis(Oo,e)}rotateY(e){return this.rotateOnAxis(ko,e)}rotateZ(e){return this.rotateOnAxis(zo,e)}translateOnAxis(e,t){return Bo.copy(e).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oo,e)}translateY(e){return this.translateOnAxis(ko,e)}translateZ(e){return this.translateOnAxis(zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ms.copy(e):ms.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),On.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(On,ms,this.up):Si.lookAt(ms,On,this.up),this.quaternion.setFromRotationMatrix(Si),n&&(Si.extractRotation(n.matrixWorld),ln.setFromRotationMatrix(Si),this.quaternion.premultiply(ln.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ho),cn.child=e,this.dispatchEvent(cn),cn.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ld),va.child=e,this.dispatchEvent(va),va.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ho),cn.child=e,this.dispatchEvent(cn),cn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let a=0,r=n.length;a<r;a++)n[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(On,e,rd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(On,od,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*n,a[13]+=i-a[1]*t-a[5]*i-a[9]*n,a[14]+=n-a[2]*t-a[6]*i-a[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ht.DEFAULT_UP=new N(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ke extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cd={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cd)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const nc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Ma(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Re{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=Jr(e,1),t=We(t,0,1),i=We(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Ma(r,a,e+1/3),this.g=Ma(r,a,e),this.b=Ma(r,a,e-1/3)}return $e.colorSpaceToWorking(this,n),this}setStyle(e,t=Zt){function i(a){a!==void 0&&parseFloat(a)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseFloat(a[1]))/100,Math.min(100,parseFloat(a[2]))/100,Math.min(100,parseFloat(a[3]))/100,t);break;case"hsl":case"hsla":if(a=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=n[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const i=nc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return $e.workingToColorSpace(Bt.copy(this),e),Math.round(We(Bt.r*255,0,255))*65536+Math.round(We(Bt.g*255,0,255))*256+Math.round(We(Bt.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Bt.copy(this),t);const i=Bt.r,n=Bt.g,a=Bt.b,r=Math.max(i,n,a),o=Math.min(i,n,a);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=d<=.5?h/(r+o):h/(2-r-o),r){case i:l=(n-a)/h+(n<a?6:0);break;case n:l=(a-i)/h+2;break;case a:l=(i-n)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=Zt){$e.workingToColorSpace(Bt.copy(this),e);const t=Bt.r,i=Bt.g,n=Bt.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(gs);const i=Qn(Ni.h,gs.h,t),n=Qn(Ni.s,gs.s,t),a=Qn(Ni.l,gs.l,t);return this.setHSL(i,n,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*n,this.g=a[1]*t+a[4]*i+a[7]*n,this.b=a[2]*t+a[5]*i+a[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new Re;Re.NAMES=nc;class eo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=t}clone(){return new eo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class sc extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const oi=new N,bi=new N,Sa=new N,yi=new N,hn=new N,dn=new N,Go=new N,ba=new N,ya=new N,Ea=new N,wa=new ft,Ta=new ft,Aa=new ft;class ci{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),oi.subVectors(e,t),n.cross(oi);const a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,i,n,a){oi.subVectors(n,t),bi.subVectors(i,t),Sa.subVectors(e,t);const r=oi.dot(oi),o=oi.dot(bi),l=oi.dot(Sa),c=bi.dot(bi),d=bi.dot(Sa),h=r*c-o*o;if(h===0)return a.set(0,0,0),null;const u=1/h,f=(c*l-o*d)*u,g=(r*d-o*l)*u;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,t,i,n,a,r,o,l){return this.getBarycoord(e,t,i,n,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,yi.x),l.addScaledVector(r,yi.y),l.addScaledVector(o,yi.z),l)}static getInterpolatedAttribute(e,t,i,n,a,r){return wa.setScalar(0),Ta.setScalar(0),Aa.setScalar(0),wa.fromBufferAttribute(e,t),Ta.fromBufferAttribute(e,i),Aa.fromBufferAttribute(e,n),r.setScalar(0),r.addScaledVector(wa,a.x),r.addScaledVector(Ta,a.y),r.addScaledVector(Aa,a.z),r}static isFrontFacing(e,t,i,n){return oi.subVectors(i,t),bi.subVectors(e,t),oi.cross(bi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oi.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),oi.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,a){return ci.getInterpolation(e,this.a,this.b,this.c,t,i,n,a)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,a=this.c;let r,o;hn.subVectors(n,i),dn.subVectors(a,i),ba.subVectors(e,i);const l=hn.dot(ba),c=dn.dot(ba);if(l<=0&&c<=0)return t.copy(i);ya.subVectors(e,n);const d=hn.dot(ya),h=dn.dot(ya);if(d>=0&&h<=d)return t.copy(n);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0&&l-d>0)return r=l/(l-d),t.copy(i).addScaledVector(hn,r);Ea.subVectors(e,a);const f=hn.dot(Ea),g=dn.dot(Ea);if(g>=0&&f<=g)return t.copy(a);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(dn,o);const m=d*g-f*h;if(m<=0&&h-d>=0&&f-g>=0)return Go.subVectors(a,n),o=(h-d)/(h-d+(f-g)),t.copy(n).addScaledVector(Go,o);const p=1/(m+x+u);return r=x*p,o=u*p,t.copy(i).addScaledVector(hn,r).addScaledVector(dn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class sn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,li):li.fromBufferAttribute(a,r),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_s.copy(i.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const n=e.children;for(let a=0,r=n.length;a<r;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(kn),vs.subVectors(this.max,kn),un.subVectors(e.a,kn),fn.subVectors(e.b,kn),pn.subVectors(e.c,kn),Fi.subVectors(fn,un),Bi.subVectors(pn,fn),$i.subVectors(un,pn);let t=[0,-Fi.z,Fi.y,0,-Bi.z,Bi.y,0,-$i.z,$i.y,Fi.z,0,-Fi.x,Bi.z,0,-Bi.x,$i.z,0,-$i.x,-Fi.y,Fi.x,0,-Bi.y,Bi.x,0,-$i.y,$i.x,0];return!Ca(t,un,fn,pn,vs)||(t=[1,0,0,0,1,0,0,0,1],!Ca(t,un,fn,pn,vs))?!1:(xs.crossVectors(Fi,Bi),t=[xs.x,xs.y,xs.z],Ca(t,un,fn,pn,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new N,new N,new N,new N,new N,new N,new N,new N],li=new N,_s=new sn,un=new N,fn=new N,pn=new N,Fi=new N,Bi=new N,$i=new N,kn=new N,vs=new N,xs=new N,Yi=new N;function Ca(s,e,t,i,n){for(let a=0,r=s.length-3;a<=r;a+=3){Yi.fromArray(s,a);const o=n.x*Math.abs(Yi.x)+n.y*Math.abs(Yi.y)+n.z*Math.abs(Yi.z),l=e.dot(Yi),c=t.dot(Yi),d=i.dot(Yi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mt=new N,Ms=new Ae;let hd=0;class Gi extends nn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Lh,this.updateRanges=[],this.gpuType=hi,this.version=0,this._normalizationScale=e!==void 0?Zr(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,a=this.itemSize;n<a;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ms.fromBufferAttribute(this,t),Ms.applyMatrix3(e),this.setXY(t,Ms.x,Ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,a){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n),a=this._normalize(a)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ec(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):tc(e,this.array)}}class ac extends Gi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class rc extends Gi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ge extends Gi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const dd=new sn,zn=new N,Ra=new N;class In{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):dd.setFromPoints(e).getCenter(i);let n=0;for(let a=0,r=e.length;a<r;a++)n=Math.max(n,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zn.subVectors(e,this.center);const t=zn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(zn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ra.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zn.copy(e.center).add(Ra)),this.expandByPoint(zn.copy(e.center).sub(Ra))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ud=0;const ni=new tt,Pa=new ht,mn=new N,Yt=new sn,Hn=new sn,wt=new N;class Ct extends nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ih(e)?rc:ac)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Be().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,i){return ni.makeTranslation(e,t,i),this.applyMatrix4(ni),this}scale(e,t,i){return ni.makeScale(e,t,i),this.applyMatrix4(ni),this}lookAt(e){return Pa.lookAt(e),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mn).negate(),this.translate(mn.x,mn.y,mn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,a=e.length;n<a;n++){const r=e[n];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ge(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const a=t[i];Yt.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Hn.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(Yt.min,Hn.min),Yt.expandByPoint(wt),wt.addVectors(Yt.max,Hn.max),Yt.expandByPoint(wt)):(Yt.expandByPoint(Hn.min),Yt.expandByPoint(Hn.max))}Yt.getCenter(i);let n=0;for(let a=0,r=e.count;a<r;a++)wt.fromBufferAttribute(e,a),n=Math.max(n,i.distanceToSquared(wt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)wt.fromBufferAttribute(o,c),l&&(mn.fromBufferAttribute(e,c),wt.add(mn)),n=Math.max(n,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,a=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Gi(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[],c=new Uint8Array(i.count);for(let L=0;L<i.count;L++)o[L]=new N,l[L]=new N;const d=new N,h=new N,u=new N,f=new Ae,g=new Ae,x=new Ae,m=new N,p=new N;function v(L,C,I){c[L]=c[C]=c[I]=1,d.fromBufferAttribute(i,L),h.fromBufferAttribute(i,C),u.fromBufferAttribute(i,I),f.fromBufferAttribute(a,L),g.fromBufferAttribute(a,C),x.fromBufferAttribute(a,I),h.sub(d),u.sub(d),g.sub(f),x.sub(f);const B=1/(g.x*x.y-x.x*g.y);isFinite(B)&&(m.copy(h).multiplyScalar(x.y).addScaledVector(u,-g.y).multiplyScalar(B),p.copy(u).multiplyScalar(g.x).addScaledVector(h,-x.x).multiplyScalar(B),o[L].add(m),o[C].add(m),o[I].add(m),l[L].add(p),l[C].add(p),l[I].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let L=0,C=w.length;L<C;++L){const I=w[L],B=I.start,G=I.count;for(let R=B,z=B+G;R<z;R+=3)v(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const y=new N,E=new N,T=new N,_=new N;function b(L){T.fromBufferAttribute(n,L),_.copy(T);const C=o[L];y.copy(C),y.sub(T.multiplyScalar(T.dot(C))).normalize(),E.crossVectors(_,C);const B=E.dot(l[L])<0?-1:1;r.setXYZW(L,y.x,y.y,y.z,B)}for(let L=0,C=i.count;L<C;++L)c[L]&&b(L);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Gi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new N,a=new N,r=new N,o=new N,l=new N,c=new N,d=new N,h=new N;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);n.fromBufferAttribute(t,g),a.fromBufferAttribute(t,x),r.fromBufferAttribute(t,m),d.subVectors(r,a),h.subVectors(n,a),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)n.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),d.subVectors(r,a),h.subVectors(n,a),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*d;for(let p=0;p<d;p++)u[g++]=c[f++]}return new Gi(u,d,h)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(n[l]=d,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const d=n[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],h=a[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const La=new N,fd=new N,pd=new Be;class ki{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=La.subVectors(i,t).cross(fd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const n=e.delta(La),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||pd.getNormalMatrix(e),n=this.coplanarPoint(La).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let md=0;class an extends nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=Jn,this.side=en,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=zl,this.blendEquation=Mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fa,this.stencilZFail=fa,this.stencilZPass=fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=n(e.textures),r=n(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ki().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ae().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ae().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let a=0;a!==n;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const wi=new N,Ia=new N,Ss=new N,bs=new N;class to{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Ia.copy(e).add(t).multiplyScalar(.5),Ss.copy(t).sub(e).normalize(),bs.copy(this.origin).sub(Ia);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Ss),o=bs.dot(this.direction),l=-bs.dot(Ss),c=bs.lengthSq(),d=Math.abs(1-r*r);let h,u,f,g;if(d>0)if(h=r*l-o,u=r*o-l,g=a*d,h>=0)if(u>=-g)if(u<=g){const x=1/d;h*=x,u*=x,f=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=a,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*l)+c;else u=-a,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*a+o)),u=h>0?-a:Math.min(Math.max(-a,-l),a),f=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(h=Math.max(0,-(r*a+o)),u=h>0?a:Math.min(Math.max(-a,-l),a),f=-h*h+u*(u+2*l)+c);else u=r>0?-a:a,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(Ia).addScaledVector(Ss,u),f}intersectSphere(e,t){if(e.radius<0)return null;wi.subVectors(e.center,this.origin);const i=wi.dot(this.direction),n=wi.dot(wi)-i*i,a=e.radius*e.radius;if(n>a)return null;const r=Math.sqrt(a-n),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,a,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,n=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,n=(e.min.x-u.x)*c),d>=0?(a=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(a=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||a>n||((a>i||isNaN(i))&&(i=a),(r<n||isNaN(n))&&(n=r),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,i,n,a){const r=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,h=e.x-r.x,u=e.y-r.y,f=e.z-r.z,g=t.x-r.x,x=t.y-r.y,m=t.z-r.z,p=i.x-r.x,v=i.y-r.y,w=i.z-r.z,y=Math.abs(l),E=Math.abs(c),T=Math.abs(d);let _,b,L,C,I,B,G,R,z,W,P,k;if(y>=E&&y>=T?(L=l,B=h,z=g,k=p,l>=0?(_=c,b=d,C=u,I=f,G=x,R=m,W=v,P=w):(_=d,b=c,C=f,I=u,G=m,R=x,W=w,P=v)):E>=T?(L=c,B=u,z=x,k=v,c>=0?(_=d,b=l,C=f,I=h,G=m,R=g,W=w,P=p):(_=l,b=d,C=h,I=f,G=g,R=m,W=p,P=w)):(L=d,B=f,z=m,k=w,d>=0?(_=l,b=c,C=h,I=u,G=g,R=x,W=p,P=v):(_=c,b=l,C=u,I=h,G=x,R=g,W=v,P=p)),L===0)return null;const F=_/L,Y=b/L,J=1/L,te=C-F*B,be=I-Y*B,q=G-F*z,ne=R-Y*z,fe=W-F*k,Ee=P-Y*k,pe=fe*ne-Ee*q,Ue=te*Ee-be*fe,ct=q*be-ne*te;if(n){if(pe<0||Ue<0||ct<0)return null}else if((pe<0||Ue<0||ct<0)&&(pe>0||Ue>0||ct>0))return null;const Pe=pe+Ue+ct;if(Pe===0)return null;const Ze=J*(pe*B+Ue*z+ct*k);return(Pe>0?Ze<0:Ze>0)?null:this.at(Ze/Pe,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Fr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vo=new tt,Ki=new to,ys=new In,Wo=new N,Es=new N,ws=new N,Ts=new N,Da=new N,As=new N,Xo=new N,Cs=new N;class we extends ht{constructor(e=new Ct,t=new ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=n.length;a<r;a++){const o=n[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(a&&o){As.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],h=a[l];d!==0&&(Da.fromBufferAttribute(h,e),r?As.addScaledVector(Da,d):As.addScaledVector(Da.sub(t),d))}t.add(As)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.material,a=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ys.copy(i.boundingSphere),ys.applyMatrix4(a),Ki.copy(e.ray).recast(e.near),!(ys.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(ys,Wo)===null||Ki.origin.distanceToSquared(Wo)>(e.far-e.near)**2))&&(Vo.copy(a).invert(),Ki.copy(e.ray).applyMatrix4(Vo),!(i.boundingBox!==null&&Ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ki)))}_computeIntersections(e,t,i){let n;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=r[m.materialIndex],v=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=w;y<E;y+=3){const T=o.getX(y),_=o.getX(y+1),b=o.getX(y+2);n=Rs(this,p,e,i,c,d,h,T,_,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const v=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);n=Rs(this,r,e,i,c,d,h,v,w,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=r[m.materialIndex],v=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=w;y<E;y+=3){const T=y,_=y+1,b=y+2;n=Rs(this,p,e,i,c,d,h,T,_,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const v=m,w=m+1,y=m+2;n=Rs(this,r,e,i,c,d,h,v,w,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function gd(s,e,t,i,n,a,r,o){let l;if(e.side===Ht?l=i.intersectTriangle(r,a,n,!0,o):l=i.intersectTriangle(n,a,r,e.side===en,o),l===null)return null;Cs.copy(o),Cs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Cs);return c<t.near||c>t.far?null:{distance:c,point:Cs.clone(),object:s}}function Rs(s,e,t,i,n,a,r,o,l,c){s.getVertexPosition(o,Es),s.getVertexPosition(l,ws),s.getVertexPosition(c,Ts);const d=gd(s,e,t,i,Es,ws,Ts,Xo);if(d){const h=new N;ci.getBarycoord(Xo,Es,ws,Ts,h),n&&(d.uv=ci.getInterpolatedAttribute(n,o,l,c,h,new Ae)),a&&(d.uv1=ci.getInterpolatedAttribute(a,o,l,c,h,new Ae)),r&&(d.normal=ci.getInterpolatedAttribute(r,o,l,c,h,new N),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new N,materialIndex:0};ci.getNormal(Es,ws,Ts,u.normal),d.face=u,d.barycoord=h}return d}class oc extends Ot{constructor(e=null,t=1,i=1,n,a,r,o,l,c=Dt,d=Dt,h,u){super(null,r,o,l,c,d,n,a,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qo extends Gi{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gn=new tt,$o=new tt,Ps=[],Yo=new sn,_d=new tt,Gn=new we,Vn=new In;class ea extends we{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,_d)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,gn),Yo.copy(e.boundingBox).applyMatrix4(gn),this.boundingBox.union(Yo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,gn),Vn.copy(e.boundingSphere).applyMatrix4(gn),this.boundingSphere.union(Vn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,a=i.length+1,r=e*a+1;for(let o=0;o<i.length;o++)i[o]=n[r+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(Gn.geometry=this.geometry,Gn.material=this.material,Gn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vn.copy(this.boundingSphere),Vn.applyMatrix4(i),e.ray.intersectsSphere(Vn)!==!1))for(let a=0;a<n;a++){this.getMatrixAt(a,gn),$o.multiplyMatrices(i,gn),Gn.matrixWorld=$o,Gn.raycast(e,Ps);for(let r=0,o=Ps.length;r<o;r++){const l=Ps[r];l.instanceId=a,l.object=this,t.push(l)}Ps.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new qo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new oc(new Float32Array(n*this.count),n,this.count,qr,hi));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=n*e;return a[l]=o,a.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ji=new In,vd=new Ae(.5,.5),Ls=new N;class rs{constructor(e=new ki,t=new ki,i=new ki,n=new ki,a=new ki,r=new ki){this.planes=[e,t,i,n,a,r]}set(e,t,i,n,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di,i=!1){const n=this.planes,a=e.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],h=a[5],u=a[6],f=a[7],g=a[8],x=a[9],m=a[10],p=a[11],v=a[12],w=a[13],y=a[14],E=a[15];if(n[0].setComponents(c-r,f-d,p-g,E-v).normalize(),n[1].setComponents(c+r,f+d,p+g,E+v).normalize(),n[2].setComponents(c+o,f+h,p+x,E+w).normalize(),n[3].setComponents(c-o,f-h,p-x,E-w).normalize(),i)n[4].setComponents(l,u,m,y).normalize(),n[5].setComponents(c-l,f-u,p-m,E-y).normalize();else if(n[4].setComponents(c-l,f-u,p-m,E-y).normalize(),t===di)n[5].setComponents(c+l,f+u,p+m,E+y).normalize();else if(t===ss)n[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);const t=vd.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Ls.x=n.normal.x>0?e.max.x:e.min.x,Ls.y=n.normal.y>0?e.max.y:e.min.y,Ls.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Ls)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Ko=new tt;class io{constructor(){this.coordinateSystem=di,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let n=0;n<t.length;n++){const a=t[n];Ko.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),i[n]===void 0&&(i[n]=new rs),i[n].setFromProjectionMatrix(Ko,a.coordinateSystem,a.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let n=0;n<e._count;n++)t[n]===void 0&&(t[n]=new rs),t[n].copy(i[n]);return this._count=e._count,this}clone(){return new io().copy(this)}}class lc extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ta=new N,ia=new N,Jo=new tt,Wn=new to,Is=new In,Ua=new N,Zo=new N;class xd extends ht{constructor(e=new Ct,t=new lc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,a=t.count;n<a;n++)ta.fromBufferAttribute(t,n-1),ia.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=ta.distanceTo(ia);e.setAttribute("lineDistance",new Ge(i,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(n),Is.radius+=a,e.ray.intersectsSphere(Is)===!1)return;Jo.copy(n).invert(),Wn.copy(e.ray).applyMatrix4(Jo);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){const p=d.getX(x),v=d.getX(x+1),w=Ds(this,e,Wn,l,p,v,x);w&&t.push(w)}if(this.isLineLoop){const x=d.getX(g-1),m=d.getX(f),p=Ds(this,e,Wn,l,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){const p=Ds(this,e,Wn,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Ds(this,e,Wn,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=n.length;a<r;a++){const o=n[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ds(s,e,t,i,n,a,r){const o=s.geometry.attributes.position;if(ta.fromBufferAttribute(o,n),ia.fromBufferAttribute(o,a),t.distanceSqToSegment(ta,ia,Ua,Zo)>i)return;Ua.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ua);if(!(c<e.near||c>e.far))return{distance:c,point:Zo.clone().applyMatrix4(s.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:s}}class cc extends Ot{constructor(e=[],t=wn,i,n,a,r,o,l,c,d){super(e,t,i,n,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hc extends Ot{constructor(e,t,i,n,a,r,o,l,c){super(e,t,i,n,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class An extends Ot{constructor(e,t,i=vi,n,a,r,o=Dt,l=Dt,c,d=Vi,h=1){if(d!==Vi&&d!==Hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,n,a,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class dc extends An{constructor(e,t=vi,i=wn,n,a,r=Dt,o=Dt,l,c=Vi){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,n,a,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uc extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Lt extends Ct{constructor(e=1,t=1,i=1,n=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:a,depthSegments:r};const o=this;n=Math.floor(n),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,n,r,2),g("x","z","y",1,-1,e,i,-t,n,r,3),g("x","y","z",1,-1,e,t,i,n,a,4),g("x","y","z",-1,-1,e,t,-i,n,a,5),this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(h,2));function g(x,m,p,v,w,y,E,T,_,b,L){const C=y/_,I=E/b,B=y/2,G=E/2,R=T/2,z=_+1,W=b+1;let P=0,k=0;const F=new N;for(let Y=0;Y<W;Y++){const J=Y*I-G;for(let te=0;te<z;te++){const be=te*C-B;F[x]=be*v,F[m]=J*w,F[p]=R,c.push(F.x,F.y,F.z),F[x]=0,F[m]=0,F[p]=T>0?1:-1,d.push(F.x,F.y,F.z),h.push(te/_),h.push(1-Y/b),P+=1}}for(let Y=0;Y<b;Y++)for(let J=0;J<_;J++){const te=u+J+z*Y,be=u+J+z*(Y+1),q=u+(J+1)+z*(Y+1),ne=u+(J+1)+z*Y;l.push(te,be,ne),l.push(be,q,ne),k+=6}o.addGroup(f,k,L),f+=k,u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Qi extends Ct{constructor(e=1,t=1,i=1,n=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),a=Math.floor(a);const d=[],h=[],u=[],f=[];let g=0;const x=[],m=i/2;let p=0;v(),r===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(f,2));function v(){const y=new N,E=new N;let T=0;const _=(t-e)/i;for(let b=0;b<=a;b++){const L=[],C=b/a,I=C*(t-e)+e;for(let B=0;B<=n;B++){const G=B/n,R=G*l+o,z=Math.sin(R),W=Math.cos(R);E.x=I*z,E.y=-C*i+m,E.z=I*W,h.push(E.x,E.y,E.z),y.set(z,_,W).normalize(),u.push(y.x,y.y,y.z),f.push(G,1-C),L.push(g++)}x.push(L)}for(let b=0;b<n;b++)for(let L=0;L<a;L++){const C=x[L][b],I=x[L+1][b],B=x[L+1][b+1],G=x[L][b+1];(e>0||L!==0)&&(d.push(C,I,G),T+=3),(t>0||L!==a-1)&&(d.push(I,B,G),T+=3)}c.addGroup(p,T,0),p+=T}function w(y){const E=g,T=new Ae,_=new N;let b=0;const L=y===!0?e:t,C=y===!0?1:-1;for(let B=1;B<=n;B++)h.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),g++;const I=g;for(let B=0;B<=n;B++){const R=B/n*l+o,z=Math.cos(R),W=Math.sin(R);_.x=L*W,_.y=m*C,_.z=L*z,h.push(_.x,_.y,_.z),u.push(0,C,0),T.x=z*.5+.5,T.y=W*.5*C+.5,f.push(T.x,T.y),g++}for(let B=0;B<n;B++){const G=E+B,R=I+B;y===!0?d.push(R,R+1,G):d.push(R+1,R,G),b+=3}c.addGroup(p,b,y===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class os extends Qi{constructor(e=1,t=1,i=32,n=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,n,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new os(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class no extends Ct{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const a=[],r=[];o(n),c(i),d(),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(a.slice(),3)),this.setAttribute("uv",new Ge(r,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const w=new N,y=new N,E=new N;for(let T=0;T<t.length;T+=3)f(t[T+0],w),f(t[T+1],y),f(t[T+2],E),l(w,y,E,v)}function l(v,w,y,E){const T=E+1,_=[];for(let b=0;b<=T;b++){_[b]=[];const L=v.clone().lerp(y,b/T),C=w.clone().lerp(y,b/T),I=T-b;for(let B=0;B<=I;B++)B===0&&b===T?_[b][B]=L:_[b][B]=L.clone().lerp(C,B/I)}for(let b=0;b<T;b++)for(let L=0;L<2*(T-b)-1;L++){const C=Math.floor(L/2);L%2===0?(u(_[b][C+1]),u(_[b+1][C]),u(_[b][C])):(u(_[b][C+1]),u(_[b+1][C+1]),u(_[b+1][C]))}}function c(v){const w=new N;for(let y=0;y<a.length;y+=3)w.x=a[y+0],w.y=a[y+1],w.z=a[y+2],w.normalize().multiplyScalar(v),a[y+0]=w.x,a[y+1]=w.y,a[y+2]=w.z}function d(){const v=new N;for(let w=0;w<a.length;w+=3){v.x=a[w+0],v.y=a[w+1],v.z=a[w+2];const y=m(v)/2/Math.PI+.5,E=p(v)/Math.PI+.5;r.push(y,1-E)}g(),h()}function h(){for(let v=0;v<r.length;v+=6){const w=r[v+0],y=r[v+2],E=r[v+4],T=Math.max(w,y,E),_=Math.min(w,y,E);T>.9&&_<.1&&(w<.2&&(r[v+0]+=1),y<.2&&(r[v+2]+=1),E<.2&&(r[v+4]+=1))}}function u(v){a.push(v.x,v.y,v.z)}function f(v,w){const y=v*3;w.x=e[y+0],w.y=e[y+1],w.z=e[y+2]}function g(){const v=new N,w=new N,y=new N,E=new N,T=new Ae,_=new Ae,b=new Ae;for(let L=0,C=0;L<a.length;L+=9,C+=6){v.set(a[L+0],a[L+1],a[L+2]),w.set(a[L+3],a[L+4],a[L+5]),y.set(a[L+6],a[L+7],a[L+8]),T.set(r[C+0],r[C+1]),_.set(r[C+2],r[C+3]),b.set(r[C+4],r[C+5]),E.copy(v).add(w).add(y).divideScalar(3);const I=m(E);x(T,C+0,v,I),x(_,C+2,w,I),x(b,C+4,y,I)}}function x(v,w,y,E){E<0&&v.x===1&&(r[w]=v.x-1),y.x===0&&y.z===0&&(r[w]=E/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new no(e.vertices,e.indices,e.radius,e.detail)}}class so extends no{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=1/i,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new so(e.radius,e.detail)}}class Li extends Ct{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,d=l+1,h=e/o,u=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<d;p++){const v=p*u-r;for(let w=0;w<c;w++){const y=w*h-a;g.push(y,-v,0),x.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const w=v+c*p,y=v+c*(p+1),E=v+1+c*(p+1),T=v+1+c*p;f.push(w,y,T),f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(x,3)),this.setAttribute("uv",new Ge(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.widthSegments,e.heightSegments)}}class Jt extends Ct{constructor(e=.5,t=1,i=32,n=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:a,thetaLength:r},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],d=[];let h=e;const u=(t-e)/n,f=new N,g=new Ae;for(let x=0;x<=n;x++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let x=0;x<n;x++){const m=x*(i+1);for(let p=0;p<i;p++){const v=p+m,w=v,y=v+i+1,E=v+i+2,T=v+1;o.push(w,y,T),o.push(y,E,T)}}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class En extends Ct{constructor(e=1,t=32,i=16,n=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const d=[],h=new N,u=new N,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const v=[],w=p/i,y=r+w*o,E=e*Math.cos(y),T=Math.sqrt(e*e-E*E);let _=0;p===0&&r===0?_=.5/t:p===i&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){const L=b/t,C=n+L*a;h.x=-T*Math.cos(C),h.y=E,h.z=T*Math.sin(C),g.push(h.x,h.y,h.z),u.copy(h).normalize(),x.push(u.x,u.y,u.z),m.push(L+_,1-w),v.push(c++)}d.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){const w=d[p][v+1],y=d[p][v],E=d[p+1][v],T=d[p+1][v+1];(p!==0||r>0)&&f.push(w,y,T),(p!==i-1||l<Math.PI)&&f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(x,3)),this.setAttribute("uv",new Ge(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new En(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jn extends Ct{constructor(e=1,t=.4,i=12,n=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const l=[],c=[],d=[],h=[],u=new N,f=new N,g=new N;for(let x=0;x<=i;x++){const m=r+x/i*o;for(let p=0;p<=n;p++){const v=p/n*a;f.x=(e+t*Math.cos(m))*Math.cos(v),f.y=(e+t*Math.cos(m))*Math.sin(v),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),g.subVectors(f,u).normalize(),d.push(g.x,g.y,g.z),h.push(p/n),h.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){const p=(n+1)*x+m-1,v=(n+1)*(x-1)+m-1,w=(n+1)*(x-1)+m,y=(n+1)*x+m;l.push(p,v,y),l.push(v,w,y)}this.setIndex(l),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Cn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];if(Qo(n))n.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Qo(n[0])){const a=[];for(let r=0,o=n.length;r<o;r++)a[r]=n[r].clone();e[t][i]=a}else e[t][i]=n.slice();else e[t][i]=n}}return e}function zt(s){const e={};for(let t=0;t<s.length;t++){const i=Cn(s[t]);for(const n in i)e[n]=i[n]}return e}function Qo(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Md(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function fc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const ls={clone:Cn,merge:zt};var Sd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wt extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sd,this.fragmentShader=bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cn(e.uniforms),this.uniformsGroups=Md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Re().setHex(n.value);break;case"v2":this.uniforms[i].value=new Ae().fromArray(n.value);break;case"v3":this.uniforms[i].value=new N().fromArray(n.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(n.value);break;case"m4":this.uniforms[i].value=new tt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pc extends Wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ot extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mc extends ot{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return bn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){bn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class yd extends an{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Fr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ed extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wd extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ao extends ht{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Td extends ao{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Na=new tt,jo=new N,el=new N;class gc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rs,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(jo),el.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(el),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){Na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Na,e.coordinateSystem,e.reversedDepth);const a=this._frameExtents,r=n?n.z/a.x:1,o=n?n.w/a.y:1,l=n?n.x/a.x:0,c=n?n.y/a.y:0;e.coordinateSystem===ss||e.reversedDepth?t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Na)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Us=new N,Ns=new Ln,fi=new N;class _c extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Us,Ns,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Us,Ns,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Us,Ns,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Us,Ns,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new N,tl=new Ae,il=new Ae;class si extends _c{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=as*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return as*2*Math.atan(Math.tan(Zn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,tl,il),t.subVectors(il,tl)}setViewOffset(e,t,i,n,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,a=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*n/l,t-=r.offsetY*i/c,n*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ad extends gc{constructor(){super(new si(90,1,.5,500)),this.isPointLightShadow=!0}}class vc extends ao{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Ad}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ro extends _c{constructor(e=-1,t=1,i=1,n=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cd extends gc{constructor(){super(new ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rd extends ao{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Cd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const _n=-90,vn=1;class Cr extends ht{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new si(_n,vn,e,t);n.layers=this.layers,this.add(n);const a=new si(_n,vn,e,t);a.layers=this.layers,this.add(a);const r=new si(_n,vn,e,t);r.layers=this.layers,this.add(r);const o=new si(_n,vn,e,t);o.layers=this.layers,this.add(o);const l=new si(_n,vn,e,t);l.layers=this.layers,this.add(l);const c=new si(_n,vn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ss)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=x,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Pd extends si{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class xc{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ld.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ld(){this._document.hidden===!1&&this.reset()}const nl=new tt;class Id{constructor(e,t,i=0,n=1/0){this.ray=new to(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nl),this}intersectObject(e,t=!0,i=[]){return Rr(e,this,i,t),i.sort(sl),i}intersectObjects(e,t=!0,i=[]){for(let n=0,a=e.length;n<a;n++)Rr(e[n],this,i,t);return i.sort(sl),i}}function sl(s,e){return s.distance-e.distance}function Rr(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){const a=s.children;for(let r=0,o=a.length;r<o;r++)Rr(a[r],e,t,!0)}}function al(s,e,t,i){const n=Dd(i);switch(t){case ql:return s*e;case qr:return s*e/n.components*n.byteLength;case $r:return s*e/n.components*n.byteLength;case tn:return s*e*2/n.components*n.byteLength;case Yr:return s*e*2/n.components*n.byteLength;case $l:return s*e*3/n.components*n.byteLength;case _i:return s*e*4/n.components*n.byteLength;case Kr:return s*e*4/n.components*n.byteLength;case Gs:case Vs:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ws:case Xs:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ja:case tr:return Math.max(s,16)*Math.max(e,8)/4;case Qa:case er:return Math.max(s,8)*Math.max(e,8)/2;case ir:case nr:case ar:case rr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sr:case Ys:case or:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case lr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case cr:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case hr:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case dr:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ur:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case fr:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case pr:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case mr:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case gr:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case _r:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case vr:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case xr:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Mr:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Sr:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case br:case yr:case Er:return Math.ceil(s/4)*Math.ceil(e/4)*16;case wr:case Tr:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ks:case Ar:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dd(s){switch(s){case Qt:case Gl:return{byteLength:1,components:1};case ns:case Vl:case Xt:return{byteLength:2,components:1};case Wr:case Xr:return{byteLength:2,components:4};case vi:case Vr:case hi:return{byteLength:4,components:1};case Wl:case Xl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nr}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nr);function Mc(){let s=null,e=!1,t=null,i=null;function n(a,r){i=s.requestAnimationFrame(n),t(a,r)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){s=a}}}function Ud(s){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(s.bindBuffer(c,o),h.length===0)s.bufferSubData(c,0,d);else{h.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<h.length;f++){const g=h[u],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,h[u]=x)}h.length=u+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];s.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:a,update:r}}var Nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fd=`#ifdef USE_ALPHAHASH
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
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Od=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hd=`#ifdef USE_AOMAP
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
#endif`,Gd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vd=`#ifdef USE_BATCHING
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
#endif`,Wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$d=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yd=`#ifdef USE_IRIDESCENCE
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
#endif`,Kd=`#ifdef USE_BUMPMAP
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
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,iu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,su=`#define PI 3.141592653589793
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
} // validated`,au=`vec3 transformedNormal = objectNormal;
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
#endif`,ru=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ou=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hu="gl_FragColor = linearToOutputTexel( gl_FragColor );",du=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uu=`#ifdef USE_ENVMAP
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
#endif`,fu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,pu=`#ifdef USE_ENVMAP
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
#endif`,mu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gu=`#ifdef USE_ENVMAP
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
#endif`,_u=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Su=`#ifdef USE_GRADIENTMAP
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
}`,bu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wu=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tu=`#ifdef USE_ENVMAP
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
#endif`,Au=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ru=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lu=`PhysicalMaterial material;
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
#endif`,Iu=`uniform sampler2D dfgLUT;
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
}`,Du=`
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
#endif`,Uu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fu=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Bu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ou=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ku=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wu=`#if defined( USE_POINTS_UV )
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
#endif`,Xu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$u=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yu=`#if defined( USE_MORPHCOLORS )
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
#endif`,Ku=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ju=`#ifdef USE_MORPHTARGETS
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
#endif`,Zu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ju=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sf=`#ifdef USE_NORMALMAP
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
#endif`,af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,of=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ff=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mf=`float getShadowMask() {
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
}`,Sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bf=`#ifdef USE_SKINNING
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
#endif`,yf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ef=`#ifdef USE_SKINNING
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
#endif`,wf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Af=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rf=`#ifdef USE_TRANSMISSION
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
#endif`,Pf=`#ifdef USE_TRANSMISSION
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
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
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
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Of=`uniform float backgroundBlurriness;
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
}`,kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`#include <common>
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
}`,Gf=`#if DEPTH_PACKING == 3200
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
}`,Vf=`#define DISTANCE
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
}`,Wf=`#define DISTANCE
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
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`uniform float scale;
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
}`,Yf=`uniform vec3 diffuse;
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
}`,Kf=`#include <common>
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
}`,Jf=`uniform vec3 diffuse;
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
}`,Zf=`#define LAMBERT
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
}`,Qf=`#define LAMBERT
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
}`,jf=`#define MATCAP
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
}`,ep=`#define MATCAP
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
}`,tp=`#define NORMAL
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
}`,ip=`#define NORMAL
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
}`,np=`#define PHONG
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
}`,sp=`#define PHONG
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
}`,ap=`#define STANDARD
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
}`,rp=`#define STANDARD
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
}`,op=`#define TOON
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
}`,lp=`#define TOON
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
}`,cp=`uniform float size;
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
}`,hp=`uniform vec3 diffuse;
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
}`,dp=`#include <common>
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
}`,up=`uniform vec3 color;
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
}`,fp=`uniform float rotation;
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
}`,pp=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Nd,alphahash_pars_fragment:Fd,alphamap_fragment:Bd,alphamap_pars_fragment:Od,alphatest_fragment:kd,alphatest_pars_fragment:zd,aomap_fragment:Hd,aomap_pars_fragment:Gd,batching_pars_vertex:Vd,batching_vertex:Wd,begin_vertex:Xd,beginnormal_vertex:qd,bsdfs:$d,iridescence_fragment:Yd,bumpmap_pars_fragment:Kd,clipping_planes_fragment:Jd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Qd,clipping_planes_vertex:jd,color_fragment:eu,color_pars_fragment:tu,color_pars_vertex:iu,color_vertex:nu,common:su,defaultnormal_vertex:au,displacementmap_pars_vertex:ru,displacementmap_vertex:ou,emissivemap_fragment:lu,emissivemap_pars_fragment:cu,colorspace_fragment:hu,colorspace_pars_fragment:du,envmap_fragment:uu,envmap_common_pars_fragment:fu,envmap_pars_fragment:pu,envmap_pars_vertex:mu,envmap_physical_pars_fragment:Tu,envmap_vertex:gu,fog_vertex:_u,fog_pars_vertex:vu,fog_fragment:xu,fog_pars_fragment:Mu,gradientmap_pars_fragment:Su,lightmap_pars_fragment:bu,lights_lambert_fragment:yu,lights_lambert_pars_fragment:Eu,lights_pars_begin:wu,lights_toon_fragment:Au,lights_toon_pars_fragment:Cu,lights_phong_fragment:Ru,lights_phong_pars_fragment:Pu,lights_physical_fragment:Lu,lights_physical_pars_fragment:Iu,lights_fragment_begin:Du,lights_fragment_maps:Uu,lights_fragment_end:Nu,lightprobes_pars_fragment:Fu,logdepthbuf_fragment:Bu,logdepthbuf_pars_fragment:Ou,logdepthbuf_pars_vertex:ku,logdepthbuf_vertex:zu,map_fragment:Hu,map_pars_fragment:Gu,map_particle_fragment:Vu,map_particle_pars_fragment:Wu,metalnessmap_fragment:Xu,metalnessmap_pars_fragment:qu,morphinstance_vertex:$u,morphcolor_vertex:Yu,morphnormal_vertex:Ku,morphtarget_pars_vertex:Ju,morphtarget_vertex:Zu,normal_fragment_begin:Qu,normal_fragment_maps:ju,normal_pars_fragment:ef,normal_pars_vertex:tf,normal_vertex:nf,normalmap_pars_fragment:sf,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:rf,clearcoat_pars_fragment:of,iridescence_pars_fragment:lf,opaque_fragment:cf,packing:hf,premultiplied_alpha_fragment:df,project_vertex:uf,dithering_fragment:ff,dithering_pars_fragment:pf,roughnessmap_fragment:mf,roughnessmap_pars_fragment:gf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:vf,shadowmap_vertex:xf,shadowmask_pars_fragment:Mf,skinbase_vertex:Sf,skinning_pars_vertex:bf,skinning_vertex:yf,skinnormal_vertex:Ef,specularmap_fragment:wf,specularmap_pars_fragment:Tf,tonemapping_fragment:Af,tonemapping_pars_fragment:Cf,transmission_fragment:Rf,transmission_pars_fragment:Pf,uv_pars_fragment:Lf,uv_pars_vertex:If,uv_vertex:Df,worldpos_vertex:Uf,background_vert:Nf,background_frag:Ff,backgroundCube_vert:Bf,backgroundCube_frag:Of,cube_vert:kf,cube_frag:zf,depth_vert:Hf,depth_frag:Gf,distance_vert:Vf,distance_frag:Wf,equirect_vert:Xf,equirect_frag:qf,linedashed_vert:$f,linedashed_frag:Yf,meshbasic_vert:Kf,meshbasic_frag:Jf,meshlambert_vert:Zf,meshlambert_frag:Qf,meshmatcap_vert:jf,meshmatcap_frag:ep,meshnormal_vert:tp,meshnormal_frag:ip,meshphong_vert:np,meshphong_frag:sp,meshphysical_vert:ap,meshphysical_frag:rp,meshtoon_vert:op,meshtoon_frag:lp,points_vert:cp,points_frag:hp,shadow_vert:dp,shadow_frag:up,sprite_vert:fp,sprite_frag:pp},_e={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},gi={basic:{uniforms:zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:zt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:zt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Re(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:zt([_e.points,_e.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:zt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:zt([_e.common,_e.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:zt([_e.sprite,_e.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:zt([_e.common,_e.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:zt([_e.lights,_e.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};gi.physical={uniforms:zt([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Be},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Fs={r:0,b:0,g:0},mp=new tt,Sc=new Be;Sc.set(-1,0,0,0,1,0,0,0,1);function gp(s,e,t,i,n,a){const r=new Re(0);let o=n===!0?0:1,l,c,d=null,h=0,u=null;function f(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const y=v.backgroundBlurriness>0;w=e.get(w,y)}return w}function g(v){let w=!1;const y=f(v);y===null?m(r,o):y&&y.isColor&&(m(y,1),w=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(s.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,w){const y=f(w);y&&y.isCubeTexture?(c===void 0&&(c=new we(new Lt(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:Cn(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mp.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sc),c.material.toneMapped=$e.getTransfer(y.colorSpace)!==je,(d!==y||h!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new we(new Li(2,2),new Wt({name:"BackgroundMaterial",uniforms:Cn(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=$e.getTransfer(y.colorSpace)!==je,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,w){v.getRGB(Fs,fc(s)),t.buffers.color.setClear(Fs.r,Fs.g,Fs.b,w,a)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,w=1){r.set(v),o=w,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:x,dispose:p}}function _p(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null);let a=n,r=!1;function o(I,B,G,R,z){let W=!1;const P=h(I,R,G,B);a!==P&&(a=P,c(a.object)),W=f(I,R,G,z),W&&g(I,R,G,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(W||r)&&(r=!1,y(I,B,G,R),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(I){return s.bindVertexArray(I)}function d(I){return s.deleteVertexArray(I)}function h(I,B,G,R){const z=R.wireframe===!0;let W=i[B.id];W===void 0&&(W={},i[B.id]=W);const P=I.isInstancedMesh===!0?I.id:0;let k=W[P];k===void 0&&(k={},W[P]=k);let F=k[G.id];F===void 0&&(F={},k[G.id]=F);let Y=F[z];return Y===void 0&&(Y=u(l()),F[z]=Y),Y}function u(I){const B=[],G=[],R=[];for(let z=0;z<t;z++)B[z]=0,G[z]=0,R[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:R,object:I,attributes:{},index:null}}function f(I,B,G,R){const z=a.attributes,W=B.attributes;let P=0;const k=G.getAttributes();for(const F in k)if(k[F].location>=0){const J=z[F];let te=W[F];if(te===void 0&&(F==="instanceMatrix"&&I.instanceMatrix&&(te=I.instanceMatrix),F==="instanceColor"&&I.instanceColor&&(te=I.instanceColor)),J===void 0||J.attribute!==te||te&&J.data!==te.data)return!0;P++}return a.attributesNum!==P||a.index!==R}function g(I,B,G,R){const z={},W=B.attributes;let P=0;const k=G.getAttributes();for(const F in k)if(k[F].location>=0){let J=W[F];J===void 0&&(F==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),F==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));const te={};te.attribute=J,J&&J.data&&(te.data=J.data),z[F]=te,P++}a.attributes=z,a.attributesNum=P,a.index=R}function x(){const I=a.newAttributes;for(let B=0,G=I.length;B<G;B++)I[B]=0}function m(I){p(I,0)}function p(I,B){const G=a.newAttributes,R=a.enabledAttributes,z=a.attributeDivisors;G[I]=1,R[I]===0&&(s.enableVertexAttribArray(I),R[I]=1),z[I]!==B&&(s.vertexAttribDivisor(I,B),z[I]=B)}function v(){const I=a.newAttributes,B=a.enabledAttributes;for(let G=0,R=B.length;G<R;G++)B[G]!==I[G]&&(s.disableVertexAttribArray(G),B[G]=0)}function w(I,B,G,R,z,W,P){P===!0?s.vertexAttribIPointer(I,B,G,z,W):s.vertexAttribPointer(I,B,G,R,z,W)}function y(I,B,G,R){x();const z=R.attributes,W=G.getAttributes(),P=B.defaultAttributeValues;for(const k in W){const F=W[k];if(F.location>=0){let Y=z[k];if(Y===void 0&&(k==="instanceMatrix"&&I.instanceMatrix&&(Y=I.instanceMatrix),k==="instanceColor"&&I.instanceColor&&(Y=I.instanceColor)),Y!==void 0){const J=Y.normalized,te=Y.itemSize,be=e.get(Y);if(be===void 0)continue;const q=be.buffer,ne=be.type,fe=be.bytesPerElement,Ee=ne===s.INT||ne===s.UNSIGNED_INT||Y.gpuType===Vr;if(Y.isInterleavedBufferAttribute){const pe=Y.data,Ue=pe.isInterleavedBuffer===!0?pe.stride:pe.itemSize,ct=Y.offset;if(pe.isInstancedInterleavedBuffer||pe.isInstancedBufferAttribute){for(let Pe=0;Pe<F.locationSize;Pe++)p(F.location+Pe,pe.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Pe=0;Pe<F.locationSize;Pe++)m(F.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,q);for(let Pe=0;Pe<F.locationSize;Pe++)w(F.location+Pe,te/F.locationSize,ne,J,Ue*fe,(ct+te/F.locationSize*Pe)*fe,Ee)}else{if(Y.isInstancedBufferAttribute){for(let pe=0;pe<F.locationSize;pe++)p(F.location+pe,Y.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let pe=0;pe<F.locationSize;pe++)m(F.location+pe);s.bindBuffer(s.ARRAY_BUFFER,q);for(let pe=0;pe<F.locationSize;pe++)w(F.location+pe,te/F.locationSize,ne,J,te*fe,te/F.locationSize*pe*fe,Ee)}}else if(P!==void 0){const J=P[k];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(F.location,J);break;case 3:s.vertexAttrib3fv(F.location,J);break;case 4:s.vertexAttrib4fv(F.location,J);break;default:s.vertexAttrib1fv(F.location,J)}}}}v()}function E(){L();for(const I in i){const B=i[I];for(const G in B){const R=B[G];for(const z in R){const W=R[z];for(const P in W)d(W[P].object),delete W[P];delete R[z]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const B=i[I.id];for(const G in B){const R=B[G];for(const z in R){const W=R[z];for(const P in W)d(W[P].object),delete W[P];delete R[z]}}delete i[I.id]}function _(I){for(const B in i){const G=i[B];for(const R in G){const z=G[R];if(z[I.id]===void 0)continue;const W=z[I.id];for(const P in W)d(W[P].object),delete W[P];delete z[I.id]}}}function b(I){for(const B in i){const G=i[B],R=I.isInstancedMesh===!0?I.id:0,z=G[R];if(z!==void 0){for(const W in z){const P=z[W];for(const k in P)d(P[k].object),delete P[k];delete z[W]}delete G[R],Object.keys(G).length===0&&delete i[B]}}}function L(){C(),r=!0,a!==n&&(a=n,c(a.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:L,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function vp(s,e,t){let i;function n(l){i=l}function a(l,c){s.drawArrays(i,l,c),t.update(c,i,1)}function r(l,c,d){d!==0&&(s.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let f=0;f<d;f++)u+=c[f];t.update(u,i,1)}this.setMode=n,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function xp(s,e,t,i){let n;function a(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(_){return!(_!==_i&&i.convert(_)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const b=_===Xt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==Qt&&_!==hi&&!b&&i.convert(_)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(De("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&h===!1;t.reversedDepthBuffer===!0&&h===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&h===!0&&De("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:y,maxSamples:E,samples:T}}function Mp(s){const e=this;let t=null,i=0,n=!1,a=!1;const r=new ki,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||i!==0||n;return n=u,i=h.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!n||g===null||g.length===0||a&&!m)a?d(null):c();else{const v=a?0:i,w=v*4;let y=p.clippingState||null;l.value=y,y=d(g,u,w,f);for(let E=0;E!==w;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=f;w!==x;++w,y+=4)r.copy(h[w]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}class oo extends qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new cc(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Lt(5,5,5),a=new Wt({name:"CubemapFromEquirect",uniforms:Cn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:ji});a.uniforms.tEquirect.value=t;const r=new we(n,a),o=t.minFilter;return t.minFilter===zi&&(t.minFilter=Vt),new Cr(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,n);e.setRenderTarget(a)}}const rl=256,Sp=3,bp=20,bc=256,yc=16,yp=3,Ep=new N,wp=new Re;class cs{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Cr(1,10,null),this._boxMesh=new we(new Lt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,n=100,a={}){const{size:r=256,position:o=Ep}=a,l=this._renderer;this._setSize(r);const c=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const h=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(wp));const m=new Cr(i,n,d);return m.position.copy(o),m.update(l,e),l.autoClear=h,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=g,e.background=x,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(rl,jl(e))}_fromTexture(e,t){e.mapping===wn||e.mapping===ts?this._setSize(e.image.length===0?rl:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=ol(e,!1,!1),i=Math.log2(e)-Sp;for(let n=0;n<=i;n++)t.texture.mipmaps.push({width:e>>n,height:e>>n});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=ol(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const n=this._boxMesh,a=this._cubeCamera;n.material=i,a.renderTarget=e,a.activeMipmapLevel=t;const r=e.width>>t;e.viewport.set(0,0,r,r),a.update(this._renderer,n),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===wn||e.mapping===ts?(this._cubemapMaterial===null&&(this._cubemapMaterial=cl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ll()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Tp(),this._integrationMaterial=Ap());const t=this._cubeSize,i=e.texture.mipmaps.length-1,n=this._ggxMaterial.uniforms;n.envMap.value=this._sourceTarget.texture;const a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(t/yc);for(let r=0;r<=i;r++){const o=cs.lodToRoughness(r,i);if(r>i-yp)a.roughness.value=o,this._renderCube(e,r,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(bc*Math.pow(o,4)))+.5:0;n.roughness.value=o,n.lodBias.value=l,this._renderCube(e,r,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Cp());const i=this._blurMaterial,n=i.uniforms,a=this._sourceTarget;n.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,n.envMap.value=a.texture,this._renderCube(e,0,i),n.envMap.value=e.texture,this._renderCube(a,0,i)}}function ol(s,e,t){return new oo(s,{minFilter:zi,generateMipmaps:e,type:Xt,colorSpace:Zs,depthBuffer:t})}function hs(s,e,t){return new Wt({name:s,uniforms:e,vertexShader:He.cube_vert,fragmentShader:t,side:Ht,blending:ji,depthTest:!1,depthWrite:!1})}function Tp(){return hs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${bc}u

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
	`)}function Ap(){return hs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yc}},`

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
	`)}function Cp(){return hs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${bp}
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
	`)}function ll(){return hs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function cl(){return hs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Rp(s){let e=new WeakMap,t=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){const f=u.mapping;if(f===ha||f===da)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new oo(g.height);return x.fromEquirectangularTexture(s,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const f=u.mapping,g=f===ha||f===da,x=f===wn||f===ts;if(g||x){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new cs(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return g&&v&&v.height>0||x&&v&&l(v)?(i===null&&(i=new cs(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,f){return f===ha?u.mapping=wn:f===da&&(u.mapping=ts),u}function l(u){let f=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(u){const f=u.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:h}}function Pp(s){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&bn("WebGLRenderer: "+i+" extension not supported."),n}}}function Lp(s,e,t,i){const n={},a=new WeakMap,r=new FinalizationRegistry(g=>delete n[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(const m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete n[g.id],r.unregister(g);const x=a.get(g);x&&(e.remove(x),a.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,x){return n[x.id]!==void 0||(x.addEventListener("dispose",o),n[x.id]=new WeakRef(x),r.register(x,x.id,x),t.memory.geometries++),x}function d(g){const x=g.attributes;for(const m in x)e.update(x[m],s.ARRAY_BUFFER)}function h(g){const x=g.index,m=g.attributes.position;let p=0;if(m===void 0)return;const v=x!==null?x.array.length:m.array.length/3-1,w=m.count>=65535?rc:ac,y=new w(Math.ceil(v/3)*6,1),E=y.array;if(x!==null){const _=x.array;p=x.version;for(let b=0,L=0;b<v;b+=3){const C=_[b+0],I=_[b+1],B=_[b+2];E[L++]=C,E[L++]=I,E[L++]=I,E[L++]=B,E[L++]=B,E[L++]=C}}else{p=m.version;for(let _=0,b=0;_<v;_+=3){const L=_+0,C=_+1,I=_+2;E[b++]=L,E[b++]=C,E[b++]=C,E[b++]=I,E[b++]=I,E[b++]=L}}y.version=p;const T=a.get(g);T&&e.remove(T),a.set(g,y)}function u(g){const x=a.get(g);if(x){const m=g.index;m!==null&&x.version<m.version&&h(g)}else h(g);return a.get(g)}function f(){for(const g in n){const x=n[g].deref();x!==void 0&&l(x)}}return{get:c,update:d,getWireframeAttribute:u,dispose:f}}function Ip(s,e,t){let i;function n(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,u){s.drawElements(i,u,a,h*r),t.update(u,i,1)}function c(h,u,f){f!==0&&(s.drawElementsInstanced(i,u,a,h*r,f),t.update(u,i,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,h,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];t.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Dp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case s.TRIANGLES:t.triangles+=o*(a/3);break;case s.LINES:t.lines+=o*(a/2);break;case s.LINE_STRIP:t.lines+=o*(a-1);break;case s.LINE_LOOP:t.lines+=o*a;break;case s.POINTS:t.points+=o*a;break;default:Je("WebGLInfo: Unknown draw mode:",r);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Up(s,e,t){const i=new WeakMap,n=new ft;function a(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let C=function(){b.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var f=C;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let E=o.attributes.position.count*y,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const _=new Float32Array(E*T*4*h),b=new ic(_,E,T,h);b.type=hi,b.needsUpdate=!0;const L=y*4;for(let I=0;I<h;I++){const B=p[I],G=v[I],R=w[I],z=E*T*4*I;for(let W=0;W<B.count;W++){const P=W*L;g===!0&&(n.fromBufferAttribute(B,W),_[z+P+0]=n.x,_[z+P+1]=n.y,_[z+P+2]=n.z,_[z+P+3]=0),x===!0&&(n.fromBufferAttribute(G,W),_[z+P+4]=n.x,_[z+P+5]=n.y,_[z+P+6]=n.z,_[z+P+7]=0),m===!0&&(n.fromBufferAttribute(R,W),_[z+P+8]=n.x,_[z+P+9]=n.y,_[z+P+10]=n.z,_[z+P+11]=R.itemSize===4?n.w:1)}}u={count:h,texture:b,size:new Ae(E,T)},i.set(o,u),o.addEventListener("dispose",C)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",x),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:a}}function Np(s,e,t,i,n){let a=new WeakMap;function r(c){const d=n.render.frame,h=c.geometry,u=e.get(c,h);if(a.get(u)!==d&&(e.update(u),a.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){const f=c.skeleton;a.get(f)!==d&&(f.update(),a.set(f,d))}return u}function o(){a=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:o}}const Fp={[Br]:"LINEAR_TONE_MAPPING",[Or]:"REINHARD_TONE_MAPPING",[kr]:"CINEON_TONE_MAPPING",[na]:"ACES_FILMIC_TONE_MAPPING",[Hr]:"AGX_TONE_MAPPING",[Gr]:"NEUTRAL_TONE_MAPPING",[zr]:"CUSTOM_TONE_MAPPING"};function Bp(s,e,t,i,n,a){const r=new qt(e,t,{type:s,depthBuffer:n,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const d=new Ct;d.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Ge([0,2,0,0,2,0],2));const h=new pc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new we(d,h),f=new ro(-1,1,1,-1,0,1);let g=null,x=null,m=!1,p,v=null,w=[],y=!1;this.setSize=function(E,T){r.setSize(E,T),o!==null&&o.setSize(E,T),l!==null&&l.setSize(E,T);for(let _=0;_<w.length;_++){const b=w[_];b.setSize&&b.setSize(E,T)}},this.setEffects=function(E){w=E,y=w.length>0&&w[0].isRenderPass===!0;const T=r.width,_=r.height;w.length>0&&o===null&&(o=new qt(T,_,{type:Xt,depthBuffer:!1,stencilBuffer:!1}),l=new qt(T,_,{type:Xt,depthBuffer:!1,stencilBuffer:!1}));const b=n===!0&&w.some(L=>L.needsDepthTexture===!0);b!==(r.depthTexture!==null)&&(b===!0&&c===null&&(c=new An(T,_),a===!0&&(c.format=Hi,c.type=Tn)),r.dispose(),r.depthTexture=b?c:null,r.resolveDepthBuffer=b,r.storeMultisampledDepthBuffer=b);for(let L=0;L<w.length;L++){const C=w[L];C.setSize&&C.setSize(T,_),b&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(E,T){if(m||E.toneMapping===Ri&&w.length===0)return!1;if(v=T,T!==null){const _=T.width,b=T.height;(r.width!==_||r.height!==b)&&this.setSize(_,b)}return y===!1&&E.setRenderTarget(r),p=E.toneMapping,E.toneMapping=Ri,!0},this.hasRenderPass=function(){return y},this.end=function(E,T){E.toneMapping=p,m=!0;let _=r,b=o;for(let L=0;L<w.length;L++){const C=w[L];C.enabled!==!1&&(C.render(E,b,_,T),C.needsSwap!==!1&&(_=b,b=b===o?l:o))}if(g!==E.outputColorSpace||x!==E.toneMapping){g=E.outputColorSpace,x=E.toneMapping,h.defines={},$e.getTransfer(g)===je&&(h.defines.SRGB_TRANSFER="");const L=Fp[x];L&&(h.defines[L]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=_.texture,E.setRenderTarget(v),E.render(u,f),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),d.dispose(),h.dispose()}}const Ec=new Ot,wc=new An(1,1),Tc=new dc(1),Ac=new ic,Cc=new id,Rc=new cc,hl=[],dl=[],ul=new Float32Array(16),fl=new Float32Array(9),pl=new Float32Array(4);function Dn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let a=hl[n];if(a===void 0&&(a=new Float32Array(n),hl[n]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,s[r].toArray(a,o)}return a}function xt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Mt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function sa(s,e){let t=dl[e];t===void 0&&(t=new Int32Array(e),dl[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Op(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function kp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;s.uniform2fv(this.addr,e),Mt(t,e)}}function zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;s.uniform3fv(this.addr,e),Mt(t,e)}}function Hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;s.uniform4fv(this.addr,e),Mt(t,e)}}function Gp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(xt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,i))return;pl.set(i),s.uniformMatrix2fv(this.addr,!1,pl),Mt(t,i)}}function Vp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(xt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,i))return;fl.set(i),s.uniformMatrix3fv(this.addr,!1,fl),Mt(t,i)}}function Wp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(xt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,i))return;ul.set(i),s.uniformMatrix4fv(this.addr,!1,ul),Mt(t,i)}}function Xp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function qp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;s.uniform2iv(this.addr,e),Mt(t,e)}}function $p(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;s.uniform3iv(this.addr,e),Mt(t,e)}}function Yp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;s.uniform4iv(this.addr,e),Mt(t,e)}}function Kp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Jp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;s.uniform2uiv(this.addr,e),Mt(t,e)}}function Zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;s.uniform3uiv(this.addr,e),Mt(t,e)}}function Qp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;s.uniform4uiv(this.addr,e),Mt(t,e)}}function aa(s){return s.version===0&&(s.compareFunction=Jl,s.needsUpdate=!0),s}function jp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let a;this.type===s.SAMPLER_2D_SHADOW?a=aa(wc):a=Ec,t.setTexture2D(e||a,n)}function em(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Cc,n)}function tm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let a;this.type===s.SAMPLER_CUBE_SHADOW?a=aa(Tc):a=Rc,t.setTextureCube(e||a,n)}function im(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Ac,n)}function nm(s){switch(s){case 5126:return Op;case 35664:return kp;case 35665:return zp;case 35666:return Hp;case 35674:return Gp;case 35675:return Vp;case 35676:return Wp;case 5124:case 35670:return Xp;case 35667:case 35671:return qp;case 35668:case 35672:return $p;case 35669:case 35673:return Yp;case 5125:return Kp;case 36294:return Jp;case 36295:return Zp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return jp;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return im}}function sm(s,e){s.uniform1fv(this.addr,e)}function am(s,e){const t=Dn(e,this.size,2);s.uniform2fv(this.addr,t)}function rm(s,e){const t=Dn(e,this.size,3);s.uniform3fv(this.addr,t)}function om(s,e){const t=Dn(e,this.size,4);s.uniform4fv(this.addr,t)}function lm(s,e){const t=Dn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function cm(s,e){const t=Dn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function hm(s,e){const t=Dn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function dm(s,e){s.uniform1iv(this.addr,e)}function um(s,e){s.uniform2iv(this.addr,e)}function fm(s,e){s.uniform3iv(this.addr,e)}function pm(s,e){s.uniform4iv(this.addr,e)}function mm(s,e){s.uniform1uiv(this.addr,e)}function gm(s,e){s.uniform2uiv(this.addr,e)}function _m(s,e){s.uniform3uiv(this.addr,e)}function vm(s,e){s.uniform4uiv(this.addr,e)}function xm(s,e,t){const i=this.cache,n=e.length,a=sa(t,n);xt(i,a)||(s.uniform1iv(this.addr,a),Mt(i,a));let r;this.type===s.SAMPLER_2D_SHADOW?r=aa(wc):r=Ec;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||r,a[o])}function Mm(s,e,t){const i=this.cache,n=e.length,a=sa(t,n);xt(i,a)||(s.uniform1iv(this.addr,a),Mt(i,a));for(let r=0;r!==n;++r)t.setTexture3D(e[r]||Cc,a[r])}function Sm(s,e,t){const i=this.cache,n=e.length,a=sa(t,n);xt(i,a)||(s.uniform1iv(this.addr,a),Mt(i,a));let r;this.type===s.SAMPLER_CUBE_SHADOW?r=aa(Tc):r=Rc;for(let o=0;o!==n;++o)t.setTextureCube(e[o]||r,a[o])}function bm(s,e,t){const i=this.cache,n=e.length,a=sa(t,n);xt(i,a)||(s.uniform1iv(this.addr,a),Mt(i,a));for(let r=0;r!==n;++r)t.setTexture2DArray(e[r]||Ac,a[r])}function ym(s){switch(s){case 5126:return sm;case 35664:return am;case 35665:return rm;case 35666:return om;case 35674:return lm;case 35675:return cm;case 35676:return hm;case 5124:case 35670:return dm;case 35667:case 35671:return um;case 35668:case 35672:return fm;case 35669:case 35673:return pm;case 5125:return mm;case 36294:return gm;case 36295:return _m;case 36296:return vm;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return bm}}class Em{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=nm(t.type)}}class wm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ym(t.type)}}class Tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let a=0,r=n.length;a!==r;++a){const o=n[a];o.setValue(e,t[o.id],i)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function ml(s,e){s.seq.push(e),s.map[e.id]=e}function Am(s,e,t){const i=s.name,n=i.length;for(Fa.lastIndex=0;;){const a=Fa.exec(i),r=Fa.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===n){ml(t,c===void 0?new Em(o,s,e):new wm(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Tm(o),ml(t,h)),t=h}}}class qs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(t,r),l=e.getUniformLocation(t,o.name);Am(o,l,this)}const n=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(r):a.push(r);n.length>0&&(this.seq=n.concat(a))}setValue(e,t,i,n){const a=this.map[t];a!==void 0&&a.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,a=e.length;n!==a;++n){const r=e[n];r.id in t&&i.push(r)}return i}}function gl(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Cm=37297;let Rm=0;function Pm(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=n;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const _l=new Be;function Lm(s){$e._getMatrix(_l,$e.workingColorSpace,s);const e=`mat3( ${_l.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(s)){case Qs:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function vl(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),a=(s.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+Pm(s.getShaderSource(e),o)}else return a}function Im(s,e){const t=Lm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Dm={[Br]:"Linear",[Or]:"Reinhard",[kr]:"Cineon",[na]:"ACESFilmic",[Hr]:"AgX",[Gr]:"Neutral",[zr]:"Custom"};function Um(s,e){const t=Dm[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Bs=new N;function Nm(){$e.getLuminanceCoefficients(Bs);const s=Bs.x.toFixed(4),e=Bs.y.toFixed(4),t=Bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($n).join(`
`)}function Bm(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Om(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const a=s.getActiveAttrib(e,n),r=a.name;let o=1;a.type===s.FLOAT_MAT2&&(o=2),a.type===s.FLOAT_MAT3&&(o=3),a.type===s.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:s.getAttribLocation(e,r),locationSize:o}}return t}function $n(s){return s!==""}function xl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Ml(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const km=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pr(s){return s.replace(km,zm)}function zm(s,e){const t=He[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Pr(t)}const Hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sl(s){return s.replace(Hm,Gm)}function Gm(s,e,t,i){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function bl(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Vm={[Kn]:"SHADOWMAP_TYPE_PCF",[qn]:"SHADOWMAP_TYPE_VSM"};function Wm(s){return Vm[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Xm={[ts]:"ENVMAP_MODE_REFRACTION"};function qm(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Xm[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $m={[Fr]:"ENVMAP_BLENDING_MULTIPLY",[Mh]:"ENVMAP_BLENDING_MIX",[Sh]:"ENVMAP_BLENDING_ADD"};function Ym(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":$m[s.combine]||"ENVMAP_BLENDING_NONE"}function Km(s,e,t,i){const n=s.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=Wm(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=qm(t),h=Ym(t),u=Fm(t),f=Bm(a),g=n.createProgram();let x,m,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter($n).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter($n).join(`
`),m.length>0&&(m+=`
`)):(x=[bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($n).join(`
`),m=[bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?He.tonemapping_pars_fragment:"",t.toneMapping!==Ri?Um("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Im("linearToOutputTexel",t.outputColorSpace),Nm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($n).join(`
`)),r=Pr(r),r=xl(r,t),r=Ml(r,t),o=Pr(o),o=xl(o,t),o=Ml(o,t),r=Sl(r),o=Sl(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===Co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=p+x+r,w=p+m+o,y=gl(n,n.VERTEX_SHADER,v),E=gl(n,n.FRAGMENT_SHADER,w);n.attachShader(g,y),n.attachShader(g,E),t.index0AttributeName!==void 0?n.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(g,0,"position"),n.linkProgram(g);function T(C){if(s.debug.checkShaderErrors){const I=n.getProgramInfoLog(g)||"",B=n.getShaderInfoLog(y)||"",G=n.getShaderInfoLog(E)||"",R=I.trim(),z=B.trim(),W=G.trim();let P=!0,k=!0;if(n.getProgramParameter(g,n.LINK_STATUS)===!1)if(P=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,g,y,E);else{const F=vl(n,y,"vertex"),Y=vl(n,E,"fragment");Je("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(g,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+R+`
`+F+`
`+Y)}else R!==""?De("WebGLProgram: Program Info Log:",R):(z===""||W==="")&&(k=!1);k&&(C.diagnostics={runnable:P,programLog:R,vertexShader:{log:z,prefix:x},fragmentShader:{log:W,prefix:m}})}n.deleteShader(y),n.deleteShader(E),_=new qs(n,g),b=Om(n,g)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=n.getProgramParameter(g,Cm)),L},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rm++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=E,this}let Jm=0;class Zm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Qm(e),t.set(e,i)),i}}class Qm{constructor(e){this.id=Jm++,this.code=e,this.usedTimes=0}}function jm(s){return s===tn||s===Ys||s===Ks}function eg(s,e,t,i,n,a){const r=new jr,o=new Zm,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,b,L,C,I,B){const G=C.fog,R=I.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,P=e.get(_.envMap||z,W),k=u[_.type];let F=i.precision;_.precision!==null&&(F=i.getMaxPrecision(_.precision),F!==_.precision&&De("WebGLProgram.getParameters:",_.precision,"not supported, using",F,"instead."));const Y=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,J=Y!==void 0?Y.length:0;let te=0;R.morphAttributes.position!==void 0&&(te=1),R.morphAttributes.normal!==void 0&&(te=2),R.morphAttributes.color!==void 0&&(te=3);let be,q,ne,fe;if(k){const ge=gi[k];be=ge.vertexShader,q=ge.fragmentShader}else{be=_.vertexShader,q=_.fragmentShader;const ge=o.getVertexShaderStage(_),et=o.getFragmentShaderStage(_);o.update(_,ge,et),ne=ge.id,fe=et.id}const Ee=s.getRenderTarget(),pe=s.state.buffers.depth.getReversed(),Ue=I.isInstancedMesh===!0,ct=I.isBatchedMesh===!0,Pe=!!_.map,Ze=!!_.matcap,Oe=!!P,Ve=Oe&&P.isPMREMTexture===!0,_t=!!_.aoMap,dt=!!_.lightMap,St=!!_.bumpMap&&_.wireframe===!1,it=!!_.normalMap,ui=!!_.displacementMap,bt=!!_.emissiveMap,jt=!!_.metalnessMap,ei=!!_.roughnessMap,ti=_.anisotropy>0,O=_.clearcoat>0,ii=_.diffuseRoughness>0,at=_.dispersion>0,rt=_.retroreflectivity>0,me=_.iridescence>0,vt=_.sheen>0,Le=_.transmission>0,Ne=ti&&!!_.anisotropyMap,A=O&&!!_.clearcoatMap,M=O&&!!_.clearcoatNormalMap,V=O&&!!_.clearcoatRoughnessMap,ie=ii&&!!_.diffuseRoughnessMap,ee=me&&!!_.iridescenceMap,re=me&&!!_.iridescenceThicknessMap,de=vt&&!!_.sheenColorMap,Z=vt&&!!_.sheenRoughnessMap,Q=!!_.specularMap,le=!!_.specularColorMap,D=!!_.specularIntensityMap,j=Le&&!!_.transmissionMap,K=Le&&!!_.thicknessMap,ce=!!_.gradientMap,ae=!!_.alphaMap,oe=_.alphaTest>0,Te=!!_.alphaHash,ze=!!_.extensions;let se=Ri;_.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(se=s.toneMapping);const Ce=Ve?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,ke={shaderID:k,shaderType:_.type,shaderName:_.name,vertexShader:be,fragmentShader:q,defines:_.defines,customVertexShaderID:ne,customFragmentShaderID:fe,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:F,batching:ct,batchingColor:ct&&I._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&I.instanceColor!==null,instancingMorph:Ue&&I.morphTexture!==null,outputColorSpace:Ee===null?s.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Pe,matcap:Ze,envMap:Oe,envMapMode:Oe&&P.mapping,envMapPMREM:Ve,envMapMaxLod:Ve?Ce.length-1:null,envMapSize:Ve?Ce[0].width:null,aoMap:_t,lightMap:dt,bumpMap:St,normalMap:it,displacementMap:ui,emissiveMap:bt,normalMapObjectSpace:it&&_.normalMapType===Eh,normalMapTangentSpace:it&&_.normalMapType===Js,packedNormalMap:it&&_.normalMapType===Js&&jm(_.normalMap.format),metalnessMap:jt,roughnessMap:ei,anisotropy:ti,anisotropyMap:Ne,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:M,clearcoatRoughnessMap:V,diffuseRoughness:ii,diffuseRoughnessMap:ie,dispersion:at,retroreflection:rt,iridescence:me,iridescenceMap:ee,iridescenceThicknessMap:re,sheen:vt,sheenColorMap:de,sheenRoughnessMap:Z,specularMap:Q,specularColorMap:le,specularIntensityMap:D,transmission:Le,transmissionMap:j,thicknessMap:K,gradientMap:ce,opaque:_.transparent===!1&&_.blending===Jn&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:oe,alphaHash:Te,combine:_.combine,mapUv:Pe&&f(_.map.channel),aoMapUv:_t&&f(_.aoMap.channel),lightMapUv:dt&&f(_.lightMap.channel),bumpMapUv:St&&f(_.bumpMap.channel),normalMapUv:it&&f(_.normalMap.channel),displacementMapUv:ui&&f(_.displacementMap.channel),emissiveMapUv:bt&&f(_.emissiveMap.channel),metalnessMapUv:jt&&f(_.metalnessMap.channel),roughnessMapUv:ei&&f(_.roughnessMap.channel),anisotropyMapUv:Ne&&f(_.anisotropyMap.channel),clearcoatMapUv:A&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:M&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ie&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:ee&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:re&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:de&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:Z&&f(_.sheenRoughnessMap.channel),specularMapUv:Q&&f(_.specularMap.channel),specularColorMapUv:le&&f(_.specularColorMap.channel),specularIntensityMapUv:D&&f(_.specularIntensityMap.channel),transmissionMapUv:j&&f(_.transmissionMap.channel),thicknessMapUv:K&&f(_.thicknessMap.channel),alphaMapUv:ae&&f(_.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(it||ti),vertexNormals:!!R.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!R.attributes.uv&&(Pe||ae),fog:!!G,useFog:_.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||R.attributes.normal===void 0&&it===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:pe,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:te,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:B.filter(ge=>ge.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:se,decodeVideoTexture:Pe&&_.map.isVideoTexture===!0&&$e.getTransfer(_.map.colorSpace)===je,decodeVideoTextureEmissive:bt&&_.emissiveMap.isVideoTexture===!0&&$e.getTransfer(_.emissiveMap.colorSpace)===je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gt,flipSided:_.side===Ht,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ze&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&_.extensions.multiDraw===!0||ct)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function x(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)b.push(L),b.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(m(b,_),p(b,_),b.push(s.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function p(_,b){r.disableAll(),b.instancing&&r.enable(0),b.instancingColor&&r.enable(1),b.instancingMorph&&r.enable(2),b.matcap&&r.enable(3),b.envMap&&r.enable(4),b.normalMapObjectSpace&&r.enable(5),b.normalMapTangentSpace&&r.enable(6),b.clearcoat&&r.enable(7),b.iridescence&&r.enable(8),b.alphaTest&&r.enable(9),b.vertexColors&&r.enable(10),b.vertexAlphas&&r.enable(11),b.vertexUv1s&&r.enable(12),b.vertexUv2s&&r.enable(13),b.vertexUv3s&&r.enable(14),b.vertexTangents&&r.enable(15),b.anisotropy&&r.enable(16),b.alphaHash&&r.enable(17),b.batching&&r.enable(18),b.dispersion&&r.enable(19),b.retroreflection&&r.enable(24),b.diffuseRoughness&&r.enable(25),b.batchingColor&&r.enable(20),b.gradientMap&&r.enable(21),b.packedNormalMap&&r.enable(22),b.vertexNormals&&r.enable(23),_.push(r.mask),r.disableAll(),b.fog&&r.enable(0),b.useFog&&r.enable(1),b.flatShading&&r.enable(2),b.logarithmicDepthBuffer&&r.enable(3),b.reversedDepthBuffer&&r.enable(4),b.skinning&&r.enable(5),b.morphTargets&&r.enable(6),b.morphNormals&&r.enable(7),b.morphColors&&r.enable(8),b.premultipliedAlpha&&r.enable(9),b.shadowMapEnabled&&r.enable(10),b.doubleSided&&r.enable(11),b.flipSided&&r.enable(12),b.useDepthPacking&&r.enable(13),b.dithering&&r.enable(14),b.transmission&&r.enable(15),b.sheen&&r.enable(16),b.opaque&&r.enable(17),b.pointsUvs&&r.enable(18),b.decodeVideoTexture&&r.enable(19),b.decodeVideoTextureEmissive&&r.enable(20),b.alphaToCoverage&&r.enable(21),b.numLightProbeGrids>0&&r.enable(22),b.hasPositionAttribute&&r.enable(23),_.push(r.mask)}function v(_){const b=u[_.type];let L;if(b){const C=gi[b];L=ls.clone(C.uniforms)}else L=_.uniforms;return L}function w(_,b){let L=d.get(b);return L!==void 0?++L.usedTimes:(L=new Km(s,b,_,n),c.push(L),d.set(b,L)),L}function y(_){if(--_.usedTimes===0){const b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:x,getUniforms:v,acquireProgram:w,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:T}}function tg(){let s=new WeakMap;function e(r){return s.has(r)}function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function i(r){s.delete(r)}function n(r,o,l){s.get(r)[o]=l}function a(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:a}}function ig(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function yl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function El(){const s=[];let e=0;const t=[],i=[],n=[];function a(){e=0,t.length=0,i.length=0,n.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let v=s[e];return v===void 0?(v={id:u.id,object:u,geometry:f,material:g,materialVariant:r(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},s[e]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=g,v.materialVariant=r(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=m,v.group=p),e++,v}function l(u,f,g,x,m,p,v){v.reversedDepth===!0&&(m=-m);const w=o(u,f,g,x,m,p);g.transmission>0?i.push(w):g.transparent===!0?n.push(w):t.push(w)}function c(u,f,g,x,m,p){const v=o(u,f,g,x,m,p);g.transmission>0?i.unshift(v):g.transparent===!0?n.unshift(v):t.unshift(v)}function d(u,f){t.length>1&&t.sort(u||ig),i.length>1&&i.sort(f||yl),n.length>1&&n.sort(f||yl)}function h(){for(let u=e,f=s.length;u<f;u++){const g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:n,init:a,push:l,unshift:c,finish:h,sort:d}}function ng(){let s=new WeakMap;function e(i,n){const a=s.get(i);let r;return a===void 0?(r=new El,s.set(i,[r])):n>=a.length?(r=new El,a.push(r)):r=a[n],r}function t(){s=new WeakMap}return{get:e,dispose:t}}function sg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new Re};break;case"SpotLight":t={position:new N,direction:new N,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function ag(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let rg=0;function og(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function lg(s){const e=new sg,t=ag(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const n=new N,a=new tt,r=new tt;function o(c){let d=0,h=0,u=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,v=0,w=0,y=0,E=0,T=0,_=0,b=0,L=0,C=0;c.sort(og);for(let B=0,G=c.length;B<G;B++){const R=c[B],z=R.color,W=R.intensity,P=R.distance;let k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===tn?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=z.r*W,h+=z.g*W,u+=z.b*W;else if(R.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(R.sh.coefficients[F],W);C++}else if(R.isSunLight){const F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,J=t.get(R);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),i.sunShadow[g]=J,i.sunShadowMap[g]=k;const te=Y.getViewportCount();for(let be=0;be<te;be++)i.sunShadowMatrix[x+be]=Y.getMatrix(be),i.sunShadowCascade[x+be]=Y._cascadeData[be];x+=te,g++}i.sun[f]=F,f++}else if(R.isDirectionalLight){const F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,J=t.get(R);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,i.directionalShadow[m]=J,i.directionalShadowMap[m]=k,i.directionalShadowMatrix[m]=R.shadow.matrix,E++}i.directional[m]=F,m++}else if(R.isSpotLight){const F=e.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(z).multiplyScalar(W),F.distance=P,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,i.spot[v]=F;const Y=R.shadow;if(R.map&&(i.spotLightMap[b]=R.map,b++,Y.updateMatrices(R),R.castShadow&&L++),i.spotLightMatrix[v]=Y.matrix,R.castShadow){const J=t.get(R);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,i.spotShadow[v]=J,i.spotShadowMap[v]=k,_++}v++}else if(R.isRectAreaLight){const F=e.get(R);F.color.copy(z).multiplyScalar(W),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),i.rectArea[w]=F,w++}else if(R.isPointLight){const F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){const Y=R.shadow,J=t.get(R);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,J.shadowCameraNear=Y.camera.near,J.shadowCameraFar=Y.camera.far,i.pointShadow[p]=J,i.pointShadowMap[p]=k,i.pointShadowMatrix[p]=R.shadow.matrix,T++}i.point[p]=F,p++}else if(R.isHemisphereLight){const F=e.get(R);F.skyColor.copy(R.color).multiplyScalar(W),F.groundColor.copy(R.groundColor).multiplyScalar(W),i.hemi[y]=F,y++}}w>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const I=i.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==p||I.spotLength!==v||I.rectAreaLength!==w||I.hemiLength!==y||I.numSunShadows!==g||I.numDirectionalShadows!==E||I.numPointShadows!==T||I.numSpotShadows!==_||I.numSpotMaps!==b||I.numLightProbes!==C)&&(i.sun.length=f,i.directional.length=m,i.spot.length=v,i.rectArea.length=w,i.point.length=p,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+b-L,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=C,I.sunLength=f,I.directionalLength=m,I.pointLength=p,I.spotLength=v,I.rectAreaLength=w,I.hemiLength=y,I.numSunShadows=g,I.numDirectionalShadows=E,I.numPointShadows=T,I.numSpotShadows=_,I.numSpotMaps=b,I.numLightProbes=C,i.version=rg++)}function l(c,d){let h=0,u=0,f=0,g=0,x=0,m=0;const p=d.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const y=c[v];if(y.isSunLight){const E=i.sun[h];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),h++}else if(y.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(p),u++}else if(y.isSpotLight){const E=i.spot[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(p),g++}else if(y.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),r.identity(),a.copy(y.matrixWorld),a.premultiply(p),r.extractRotation(a),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),x++}else if(y.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function wl(s){const e=new lg(s),t=[],i=[],n=[];function a(h){d.camera=h,t.length=0,i.length=0,n.length=0}function r(h){h.isLightProbeGrid?n.push(h):t.push(h)}function o(h){i.push(h)}function l(){e.setup(t),n.sort((h,u)=>h.priority-u.priority||h.id-u.id)}function c(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function cg(s){let e=new WeakMap;function t(n,a=0){const r=e.get(n);let o;return r===void 0?(o=new wl(s),e.set(n,[o])):a>=r.length?(o=new wl(s),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dg=`uniform sampler2D shadow_pass;
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
}`,ug=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],fg=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Tl=new tt,Xn=new N,Ba=new N;function pg(s,e,t){let i=new rs;const n=new Ae,a=new Ae,r=new ft,o=new Ed,l=new wd,c={},d=t.maxTextureSize,h={[en]:Ht,[Ht]:en,[gt]:gt},u=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:hg,fragmentShader:dg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new Gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new we(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kn;let p=this.type;this.render=function(T,_,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===th&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Kn);const L=s.getRenderTarget(),C=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),B=s.state;B.setBlending(ji),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const G=p!==this.type;G&&_.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(z=>z.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,z=T.length;R<z;R++){const W=T[R],P=W.shadow;if(P===void 0){De("WebGLShadowMap:",W,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;n.copy(P.mapSize);const k=P.getFrameExtents();n.multiply(k),a.copy(P.mapSize),(n.x>d||n.y>d)&&(n.x>d&&(a.x=Math.floor(d/k.x),n.x=a.x*k.x,P.mapSize.x=a.x),n.y>d&&(a.y=Math.floor(d/k.y),n.y=a.y*k.y,P.mapSize.y=a.y));const F=s.state.buffers.depth.getReversed();if(P.camera._reversedDepth=F,P.map===null||G===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===qn){if(W.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new qt(n.x,n.y,{format:tn,type:Xt,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),P.map.texture.name=W.name+".shadowMap",P.map.depthTexture=new An(n.x,n.y,hi),P.map.depthTexture.name=W.name+".shadowMapDepth",P.map.depthTexture.format=Vi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Dt,P.map.depthTexture.magFilter=Dt}else W.isPointLight?(P.map=new oo(n.x),P.map.depthTexture=new dc(n.x,vi)):(P.map=new qt(n.x,n.y),P.map.depthTexture=new An(n.x,n.y,vi)),P.map.depthTexture.name=W.name+".shadowMap",P.map.depthTexture.format=Vi,this.type===Kn?(P.map.depthTexture.compareFunction=F?Kl:Yl,P.map.depthTexture.minFilter=Vt,P.map.depthTexture.magFilter=Vt):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Dt,P.map.depthTexture.magFilter=Dt);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==n.x||P.map.height!==n.y)&&P.map.setSize(n.x,n.y);const Y=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();W.isPointLight!==!0&&P.updateMatrices(W,b);const J=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:b.layers;for(let te=0;te<Y;te++){const be=P.getCamera(te);if(W.isPointLight){const q=P.camera,ne=P.matrix,fe=W.distance||q.far;fe!==q.far&&(q.far=fe,q.updateProjectionMatrix()),Xn.setFromMatrixPosition(W.matrixWorld),q.position.copy(Xn),Ba.copy(q.position),Ba.add(ug[te]),q.up.copy(fg[te]),q.lookAt(Ba),q.updateMatrixWorld(),ne.makeTranslation(-Xn.x,-Xn.y,-Xn.z),Tl.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),P._frustum.setFromProjectionMatrix(Tl,q.coordinateSystem,q.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)s.setRenderTarget(P.map,te),s.clear();else{te===0&&(s.setRenderTarget(P.map),s.clear());const q=P.getViewport(te);r.set(a.x*q.x,a.y*q.y,a.x*q.z,a.y*q.w),B.viewport(r)}i=P.getFrustum(te),y(_,b,be,W,J,this.type)}P.isPointLightShadow!==!0&&this.type===qn&&v(P,b),P.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(L,C,I)};function v(T,_){const b=e.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new qt(n.x,n.y,{format:tn,type:Xt}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(_,null,b,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(_,null,b,f,x,null)}function w(T,_,b,L){let C=null;const I=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)C=I;else if(C=b.isPointLight===!0?l:o,s.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const B=C.uuid,G=_.uuid;let R=c[B];R===void 0&&(R={},c[B]=R);let z=R[G];z===void 0&&(z=C.clone(),R[G]=z,_.addEventListener("dispose",E)),C=z}if(C.visible=_.visible,C.wireframe=_.wireframe,L===qn?C.side=_.shadowSide!==null?_.shadowSide:_.side:C.side=_.shadowSide!==null?_.shadowSide:h[_.side],C.alphaMap=_.alphaMap,C.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,C.map=_.map,C.clipShadows=_.clipShadows,C.clippingPlanes=_.clippingPlanes,C.clipIntersection=_.clipIntersection,C.displacementMap=_.displacementMap,C.displacementScale=_.displacementScale,C.displacementBias=_.displacementBias,C.wireframeLinewidth=_.wireframeLinewidth,C.linewidth=_.linewidth,b.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const B=s.properties.get(C);B.light=b}return C}function y(T,_,b,L,C,I){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===qn)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const R=e.update(T),z=T.material;if(Array.isArray(z)){const W=R.groups;for(let P=0,k=W.length;P<k;P++){const F=W[P],Y=z[F.materialIndex];if(Y&&Y.visible){const J=w(T,Y,L,I);T.onBeforeShadow(s,T,_,b,R,J,F),s.renderBufferDirect(b,null,R,J,T,F),T.onAfterShadow(s,T,_,b,R,J,F)}}}else if(z.visible){const W=w(T,z,L,I);T.onBeforeShadow(s,T,_,b,R,W,null),s.renderBufferDirect(b,null,R,W,T,null),T.onAfterShadow(s,T,_,b,R,W,null)}}const G=T.children;for(let R=0,z=G.length;R<z;R++)y(G[R],_,b,L,C,I)}function E(T){T.target.removeEventListener("dispose",E);for(const b in c){const L=c[b],C=T.target.uuid;C in L&&(L[C].dispose(),delete L[C])}}}function mg(s,e){function t(){let D=!1;const j=new ft;let K=null;const ce=new ft(0,0,0,0);return{setMask:function(ae){K!==ae&&!D&&(s.colorMask(ae,ae,ae,ae),K=ae)},setLocked:function(ae){D=ae},setClear:function(ae,oe,Te,ze,se){se===!0&&(ae*=ze,oe*=ze,Te*=ze),j.set(ae,oe,Te,ze),ce.equals(j)===!1&&(s.clearColor(ae,oe,Te,ze),ce.copy(j))},reset:function(){D=!1,K=null,ce.set(-1,0,0,0)}}}function i(){let D=!1,j=!1,K=null,ce=null,ae=null;return{setReversed:function(oe){if(j!==oe){const Te=e.get("EXT_clip_control");oe?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),j=oe;const ze=ae;ae=null,this.setClear(ze)}},getReversed:function(){return j},setTest:function(oe){oe?pe(s.DEPTH_TEST):Ue(s.DEPTH_TEST)},setMask:function(oe){K!==oe&&!D&&(s.depthMask(oe),K=oe)},setFunc:function(oe){if(j&&(oe=Nh[oe]),ce!==oe){switch(oe){case Wa:s.depthFunc(s.NEVER);break;case Xa:s.depthFunc(s.ALWAYS);break;case qa:s.depthFunc(s.LESS);break;case es:s.depthFunc(s.LEQUAL);break;case $a:s.depthFunc(s.EQUAL);break;case Ya:s.depthFunc(s.GEQUAL);break;case Ka:s.depthFunc(s.GREATER);break;case Ja:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ce=oe}},setLocked:function(oe){D=oe},setClear:function(oe){ae!==oe&&(ae=oe,j&&(oe=1-oe),s.clearDepth(oe))},reset:function(){D=!1,K=null,ce=null,ae=null,j=!1}}}function n(){let D=!1,j=null,K=null,ce=null,ae=null,oe=null,Te=null,ze=null,se=null;return{setTest:function(Ce){D||(Ce?pe(s.STENCIL_TEST):Ue(s.STENCIL_TEST))},setMask:function(Ce){j!==Ce&&!D&&(s.stencilMask(Ce),j=Ce)},setFunc:function(Ce,ke,ge){(K!==Ce||ce!==ke||ae!==ge)&&(s.stencilFunc(Ce,ke,ge),K=Ce,ce=ke,ae=ge)},setOp:function(Ce,ke,ge){(oe!==Ce||Te!==ke||ze!==ge)&&(s.stencilOp(Ce,ke,ge),oe=Ce,Te=ke,ze=ge)},setLocked:function(Ce){D=Ce},setClear:function(Ce){se!==Ce&&(s.clearStencil(Ce),se=Ce)},reset:function(){D=!1,j=null,K=null,ce=null,ae=null,oe=null,Te=null,ze=null,se=null}}}const a=new t,r=new i,o=new n;let l={};const c=new WeakMap;let d={},h={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,w=null,y=null,E=null,T=null,_=null,b=new Re(0,0,0),L=0,C=!1,I=null,B=null,G=null,R=null,z=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,k=0;const F=s.getParameter(s.VERSION);F.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(F)[1]),P=k>=1):F.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),P=k>=2);let Y=null,J={};const te=s.getParameter(s.SCISSOR_BOX),be=s.getParameter(s.VIEWPORT),q=new ft().fromArray(te),ne=new ft().fromArray(be);function fe(D,j,K,ce){const ae=new Uint8Array(4),oe=s.createTexture();s.bindTexture(D,oe),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Te=0;Te<K;Te++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(j,0,s.RGBA,1,1,ce,0,s.RGBA,s.UNSIGNED_BYTE,ae):s.texImage2D(j+Te,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ae);return oe}const Ee={};Ee[s.TEXTURE_2D]=fe(s.TEXTURE_2D,s.TEXTURE_2D,1),Ee[s.TEXTURE_CUBE_MAP]=fe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[s.TEXTURE_2D_ARRAY]=fe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ee[s.TEXTURE_3D]=fe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),pe(s.DEPTH_TEST),r.setFunc(es),St(!1),it(wo),pe(s.CULL_FACE),_t(ji);function pe(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function Ue(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function ct(D,j){return u[D]!==j?(s.bindFramebuffer(D,j),u[D]=j,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=j),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=j),!0):!1}function Pe(D,j){let K=g,ce=!1;if(D){K=f.get(j),K===void 0&&(K=[],f.set(j,K));const ae=D.textures;if(K.length!==ae.length||K[0]!==s.COLOR_ATTACHMENT0){for(let oe=0,Te=ae.length;oe<Te;oe++)K[oe]=s.COLOR_ATTACHMENT0+oe;K.length=ae.length,ce=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,ce=!0);ce&&s.drawBuffers(K)}function Ze(D){return x!==D?(s.useProgram(D),x=D,!0):!1}const Oe={[Mn]:s.FUNC_ADD,[nh]:s.FUNC_SUBTRACT,[sh]:s.FUNC_REVERSE_SUBTRACT};Oe[ah]=s.MIN,Oe[rh]=s.MAX;const Ve={[oh]:s.ZERO,[lh]:s.ONE,[ch]:s.SRC_COLOR,[kl]:s.SRC_ALPHA,[mh]:s.SRC_ALPHA_SATURATE,[fh]:s.DST_COLOR,[dh]:s.DST_ALPHA,[hh]:s.ONE_MINUS_SRC_COLOR,[zl]:s.ONE_MINUS_SRC_ALPHA,[ph]:s.ONE_MINUS_DST_COLOR,[uh]:s.ONE_MINUS_DST_ALPHA,[gh]:s.CONSTANT_COLOR,[_h]:s.ONE_MINUS_CONSTANT_COLOR,[vh]:s.CONSTANT_ALPHA,[xh]:s.ONE_MINUS_CONSTANT_ALPHA};function _t(D,j,K,ce,ae,oe,Te,ze,se,Ce){if(D===ji){m===!0&&(Ue(s.BLEND),m=!1);return}if(m===!1&&(pe(s.BLEND),m=!0),D!==ih){if(D!==p||Ce!==C){if((v!==Mn||E!==Mn)&&(s.blendEquation(s.FUNC_ADD),v=Mn,E=Mn),Ce)switch(D){case Jn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Va:s.blendFunc(s.ONE,s.ONE);break;case To:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ao:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",D);break}else switch(D){case Jn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Va:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case To:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ao:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",D);break}w=null,y=null,T=null,_=null,b.set(0,0,0),L=0,p=D,C=Ce}return}ae=ae||j,oe=oe||K,Te=Te||ce,(j!==v||ae!==E)&&(s.blendEquationSeparate(Oe[j],Oe[ae]),v=j,E=ae),(K!==w||ce!==y||oe!==T||Te!==_)&&(s.blendFuncSeparate(Ve[K],Ve[ce],Ve[oe],Ve[Te]),w=K,y=ce,T=oe,_=Te),(ze.equals(b)===!1||se!==L)&&(s.blendColor(ze.r,ze.g,ze.b,se),b.copy(ze),L=se),p=D,C=!1}function dt(D,j){D.side===gt?Ue(s.CULL_FACE):pe(s.CULL_FACE);let K=D.side===Ht;j&&(K=!K),St(K),D.blending===Jn&&D.transparent===!1?_t(ji):_t(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);const ce=D.stencilWrite;o.setTest(ce),ce&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),bt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function St(D){I!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),I=D)}function it(D){D!==jc?(pe(s.CULL_FACE),D!==B&&(D===wo?s.cullFace(s.BACK):D===eh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ue(s.CULL_FACE),B=D}function ui(D){D!==G&&(P&&s.lineWidth(D),G=D)}function bt(D,j,K){D?(pe(s.POLYGON_OFFSET_FILL),(R!==j||z!==K)&&(R=j,z=K,r.getReversed()&&(j=-j,K=-K),s.polygonOffset(j,K))):Ue(s.POLYGON_OFFSET_FILL)}function jt(D){D?pe(s.SCISSOR_TEST):Ue(s.SCISSOR_TEST)}function ei(D){D===void 0&&(D=s.TEXTURE0+W-1),Y!==D&&(s.activeTexture(D),Y=D)}function ti(D,j,K){K===void 0&&(Y===null?K=s.TEXTURE0+W-1:K=Y);let ce=J[K];ce===void 0&&(ce={type:void 0,texture:void 0},J[K]=ce),(ce.type!==D||ce.texture!==j)&&(Y!==K&&(s.activeTexture(K),Y=K),s.bindTexture(D,j||Ee[D]),ce.type=D,ce.texture=j)}function O(){const D=J[Y];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ii(){try{s.compressedTexImage2D(...arguments)}catch(D){Je("WebGLState:",D)}}function at(){try{s.compressedTexImage3D(...arguments)}catch(D){Je("WebGLState:",D)}}function rt(){try{s.texSubImage2D(...arguments)}catch(D){Je("WebGLState:",D)}}function me(){try{s.texSubImage3D(...arguments)}catch(D){Je("WebGLState:",D)}}function vt(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Je("WebGLState:",D)}}function Le(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Je("WebGLState:",D)}}function Ne(){try{s.texStorage2D(...arguments)}catch(D){Je("WebGLState:",D)}}function A(){try{s.texStorage3D(...arguments)}catch(D){Je("WebGLState:",D)}}function M(){try{s.texImage2D(...arguments)}catch(D){Je("WebGLState:",D)}}function V(){try{s.texImage3D(...arguments)}catch(D){Je("WebGLState:",D)}}function ie(D){return h[D]!==void 0?h[D]:s.getParameter(D)}function ee(D,j){h[D]!==j&&(s.pixelStorei(D,j),h[D]=j)}function re(D){q.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),q.copy(D))}function de(D){ne.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),ne.copy(D))}function Z(D,j){let K=c.get(j);K===void 0&&(K=new WeakMap,c.set(j,K));let ce=K.get(D);ce===void 0&&(ce=s.getUniformBlockIndex(j,D.name),s.uniformBlockBinding(j,ce,ce),K.set(D,ce))}function Q(D,j,K){const ae=c.get(j).get(D);l[ae]!==K&&(s.bindBufferBase(s.UNIFORM_BUFFER,ae,K),l[ae]=K)}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),d={},h={},Y=null,J={},u={},l={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,w=null,y=null,E=null,T=null,_=null,b=new Re(0,0,0),L=0,C=!1,I=null,B=null,G=null,R=null,z=null,q.set(0,0,s.canvas.width,s.canvas.height),ne.set(0,0,s.canvas.width,s.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:pe,disable:Ue,bindFramebuffer:ct,drawBuffers:Pe,useProgram:Ze,setBlending:_t,setMaterial:dt,setFlipSided:St,setCullFace:it,setLineWidth:ui,setPolygonOffset:bt,setScissorTest:jt,activeTexture:ei,bindTexture:ti,unbindTexture:O,compressedTexImage2D:ii,compressedTexImage3D:at,texImage2D:M,texImage3D:V,pixelStorei:ee,getParameter:ie,updateUBOMapping:Z,uniformBlockBinding:Q,texStorage2D:Ne,texStorage3D:A,texSubImage2D:rt,texSubImage3D:me,compressedTexSubImage2D:vt,compressedTexSubImage3D:Le,scissor:re,viewport:de,reset:le}}function gg(s,e,t,i,n,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,d=new WeakMap,h=new Set;let u;const f=new WeakMap,g=new Set,x=new FinalizationRegistry(A=>g.delete(A));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,M){return m?new OffscreenCanvas(A,M):js("canvas")}function v(A,M,V){let ie=1;const ee=Ne(A);if((ee.width>V||ee.height>V)&&(ie=V/Math.max(ee.width,ee.height)),ie<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const re=Math.floor(ie*ee.width),de=Math.floor(ie*ee.height);u===void 0&&(u=p(re,de));const Z=M?p(re,de):u;return Z.width=re,Z.height=de,Z.getContext("2d").drawImage(A,0,0,re,de),De("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+re+"x"+de+")."),Z}else return"data"in A&&De("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function w(A){return A.generateMipmaps}function y(A){s.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(A,M,V,ie,ee,re=!1){if(A!==null){if(s[A]!==void 0)return s[A];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let de;ie&&(de=e.get("EXT_texture_norm16"),de||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=M;if(M===s.RED&&(V===s.FLOAT&&(Z=s.R32F),V===s.HALF_FLOAT&&(Z=s.R16F),V===s.UNSIGNED_BYTE&&(Z=s.R8),V===s.UNSIGNED_SHORT&&de&&(Z=de.R16_EXT),V===s.SHORT&&de&&(Z=de.R16_SNORM_EXT)),M===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(Z=s.R8UI),V===s.UNSIGNED_SHORT&&(Z=s.R16UI),V===s.UNSIGNED_INT&&(Z=s.R32UI),V===s.BYTE&&(Z=s.R8I),V===s.SHORT&&(Z=s.R16I),V===s.INT&&(Z=s.R32I)),M===s.RG&&(V===s.FLOAT&&(Z=s.RG32F),V===s.HALF_FLOAT&&(Z=s.RG16F),V===s.UNSIGNED_BYTE&&(Z=s.RG8),V===s.UNSIGNED_SHORT&&de&&(Z=de.RG16_EXT),V===s.SHORT&&de&&(Z=de.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(Z=s.RG8UI),V===s.UNSIGNED_SHORT&&(Z=s.RG16UI),V===s.UNSIGNED_INT&&(Z=s.RG32UI),V===s.BYTE&&(Z=s.RG8I),V===s.SHORT&&(Z=s.RG16I),V===s.INT&&(Z=s.RG32I)),M===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),V===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),V===s.UNSIGNED_INT&&(Z=s.RGB32UI),V===s.BYTE&&(Z=s.RGB8I),V===s.SHORT&&(Z=s.RGB16I),V===s.INT&&(Z=s.RGB32I)),M===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),V===s.UNSIGNED_INT&&(Z=s.RGBA32UI),V===s.BYTE&&(Z=s.RGBA8I),V===s.SHORT&&(Z=s.RGBA16I),V===s.INT&&(Z=s.RGBA32I)),M===s.RGB&&(V===s.UNSIGNED_SHORT&&de&&(Z=de.RGB16_EXT),V===s.SHORT&&de&&(Z=de.RGB16_SNORM_EXT),V===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),V===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),M===s.RGBA){const Q=re?Qs:$e.getTransfer(ee);V===s.FLOAT&&(Z=s.RGBA32F),V===s.HALF_FLOAT&&(Z=s.RGBA16F),V===s.UNSIGNED_BYTE&&(Z=Q===je?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT&&de&&(Z=de.RGBA16_EXT),V===s.SHORT&&de&&(Z=de.RGBA16_SNORM_EXT),V===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(A,M){let V;return A?M===null||M===vi||M===Tn?V=s.DEPTH24_STENCIL8:M===hi?V=s.DEPTH32F_STENCIL8:M===ns&&(V=s.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===vi||M===Tn?V=s.DEPTH_COMPONENT24:M===hi?V=s.DEPTH_COMPONENT32F:M===ns&&(V=s.DEPTH_COMPONENT16),V}function b(A,M){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==Dt&&A.minFilter!==Vt?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function L(A){const M=new WeakRef(A);i.get(A).__ref=M,g.add(M),x.register(A,M,M)}function C(A){const M=i.get(A).__ref;M!==void 0&&(g.delete(M),x.unregister(M))}function I(A){G(A.target)}function B(A){R(A.target)}function G(A){A.removeEventListener("dispose",I),C(A),W(A),A.isVideoTexture&&d.delete(A),A.isHTMLTexture&&h.delete(A)}function R(A){A.removeEventListener("dispose",B),C(A),k(A)}function z(){for(const A of g){const M=A.deref();M!==void 0&&(M.isRenderTarget===!0?R(M):G(M))}g.clear(),h.clear()}function W(A){const M=i.get(A);if(M.__webglInit===void 0)return;const V=A.source,ie=f.get(V);if(ie){const ee=ie[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&P(A),Object.keys(ie).length===0&&f.delete(V)}i.remove(A)}function P(A){const M=i.get(A);s.deleteTexture(M.__webglTexture);const V=A.source,ie=f.get(V);delete ie[M.__cacheKey],r.memory.textures--}function k(A){const M=i.get(A);M.__depthDisposeCallback&&M.__depthDisposeCallback();const V=A.depthTexture;if(V&&V.renderTarget===A&&G(V),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(M.__webglFramebuffer[ee]))for(let re=0;re<M.__webglFramebuffer[ee].length;re++)s.deleteFramebuffer(M.__webglFramebuffer[ee][re]);else s.deleteFramebuffer(M.__webglFramebuffer[ee]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ee])}else{if(Array.isArray(M.__webglFramebuffer))for(let ee=0;ee<M.__webglFramebuffer.length;ee++)s.deleteFramebuffer(M.__webglFramebuffer[ee]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ee=0;ee<M.__webglColorRenderbuffer.length;ee++)M.__webglColorRenderbuffer[ee]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ee]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const ie=A.textures;for(let ee=0,re=ie.length;ee<re;ee++){const de=i.get(ie[ee]);de.__webglTexture&&(s.deleteTexture(de.__webglTexture),r.memory.textures--),i.remove(ie[ee])}i.remove(A)}let F=0;function Y(){F=0}function J(){return F}function te(A){F=A}function be(){const A=F;return A>=n.maxTextures&&De("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+n.maxTextures),F+=1,A}function q(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.mipmapsAutoUpdate),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function ne(A,M){const V=i.get(A);if(A.isVideoTexture&&vt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const ie=A.image;if(ie===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{dt(V,A,M);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+M)}function fe(A,M){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){dt(V,A,M);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+M)}function Ee(A,M){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){dt(V,A,M);return}t.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+M)}function pe(A,M){const V=i.get(A);if(A.version>0&&V.__version!==A.version){St(V,A,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+M)}const Ue={[is]:s.REPEAT,[Ai]:s.CLAMP_TO_EDGE,[Za]:s.MIRRORED_REPEAT},ct={[Dt]:s.NEAREST,[bh]:s.NEAREST_MIPMAP_NEAREST,[fs]:s.NEAREST_MIPMAP_LINEAR,[Vt]:s.LINEAR,[ua]:s.LINEAR_MIPMAP_NEAREST,[zi]:s.LINEAR_MIPMAP_LINEAR},Pe={[Th]:s.NEVER,[Jl]:s.ALWAYS,[Ah]:s.LESS,[Yl]:s.LEQUAL,[Ch]:s.EQUAL,[Kl]:s.GEQUAL,[Rh]:s.GREATER,[Ph]:s.NOTEQUAL};function Ze(A,M){if(M.type===hi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Vt||M.magFilter===ua||M.magFilter===fs||M.magFilter===zi||M.minFilter===Vt||M.minFilter===ua||M.minFilter===fs||M.minFilter===zi)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,Ue[M.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Ue[M.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Ue[M.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,ct[M.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,ct[M.minFilter]),M.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Dt||M.minFilter!==fs&&M.minFilter!==zi||M.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,n.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Oe(A,M){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",I),L(M));const ie=M.source;let ee=f.get(ie);ee===void 0&&(ee={},f.set(ie,ee));const re=q(M);if(re!==A.__cacheKey){ee[re]===void 0&&(ee[re]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,V=!0),ee[re].usedTimes++;const de=ee[A.__cacheKey];de!==void 0&&(ee[A.__cacheKey].usedTimes--,de.usedTimes===0&&P(M)),A.__cacheKey=re,A.__webglTexture=ee[re].texture}return V}function Ve(A,M,V){return Math.floor(Math.floor(A/V)/M)}function _t(A,M,V,ie){const re=A.updateRanges;if(re.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,V,ie,M.data);else{re.sort((D,j)=>D.start-j.start);let de=0;for(let D=1;D<re.length;D++){const j=re[de],K=re[D],ce=j.start+j.count,ae=Ve(K.start,M.width,4),oe=Ve(j.start,M.width,4);K.start<=ce+1&&ae===oe&&Ve(K.start+K.count-1,M.width,4)===ae?j.count=Math.max(j.count,K.start+K.count-j.start):(++de,re[de]=K)}re.length=de+1;const Z=t.getParameter(s.UNPACK_ROW_LENGTH),Q=t.getParameter(s.UNPACK_SKIP_PIXELS),le=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let D=0,j=re.length;D<j;D++){const K=re[D],ce=Math.floor(K.start/4),ae=Math.ceil(K.count/4),oe=ce%M.width,Te=Math.floor(ce/M.width),ze=ae,se=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(s.UNPACK_SKIP_ROWS,Te),t.texSubImage2D(s.TEXTURE_2D,0,oe,Te,ze,se,V,ie,M.data)}A.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Z),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(s.UNPACK_SKIP_ROWS,le)}}function dt(A,M,V){let ie=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ie=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ie=s.TEXTURE_3D);const ee=Oe(A,M),re=M.source;t.bindTexture(ie,A.__webglTexture,s.TEXTURE0+V);const de=i.get(re);if(re.version!==de.__version||ee===!0){if(t.activeTexture(s.TEXTURE0+V),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const se=$e.getPrimaries($e.workingColorSpace),Ce=M.colorSpace===Ti?null:$e.getPrimaries(M.colorSpace),ke=M.colorSpace===Ti||se===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let Q=v(M.image,!1,n.maxTextureSize);Q=Le(M,Q);const le=a.convert(M.format,M.colorSpace),D=a.convert(M.type);let j=T(M.internalFormat,le,D,M.normalized,M.colorSpace,M.isVideoTexture);Ze(ie,M);let K;const ce=M.mipmaps,ae=M.isVideoTexture!==!0,oe=de.__version===void 0||ee===!0,Te=re.dataReady,ze=b(M,Q);if(M.isDepthTexture)j=_(M.format===Hi,M.type),oe&&(ae?t.texStorage2D(s.TEXTURE_2D,1,j,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,j,Q.width,Q.height,0,le,D,null));else if(M.isDataTexture)if(ce.length>0){ae&&oe&&t.texStorage2D(s.TEXTURE_2D,ze,j,ce[0].width,ce[0].height);for(let se=0,Ce=ce.length;se<Ce;se++)K=ce[se],ae?Te&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,K.width,K.height,le,D,K.data):t.texImage2D(s.TEXTURE_2D,se,j,K.width,K.height,0,le,D,K.data);M.generateMipmaps=!1}else ae?(oe&&t.texStorage2D(s.TEXTURE_2D,ze,j,Q.width,Q.height),Te&&_t(M,Q,le,D)):t.texImage2D(s.TEXTURE_2D,0,j,Q.width,Q.height,0,le,D,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ae&&oe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ze,j,ce[0].width,ce[0].height,Q.depth);for(let se=0,Ce=ce.length;se<Ce;se++)if(K=ce[se],M.format!==_i)if(le!==null)if(ae){if(Te)if(M.layerUpdates.size>0){const ke=al(K.width,K.height,M.format,M.type);for(const ge of M.layerUpdates){const et=K.data.subarray(ge*ke/K.data.BYTES_PER_ELEMENT,(ge+1)*ke/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,ge,K.width,K.height,1,le,et)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,K.width,K.height,Q.depth,le,K.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,j,K.width,K.height,Q.depth,0,K.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Te&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,K.width,K.height,Q.depth,le,D,K.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,j,K.width,K.height,Q.depth,0,le,D,K.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{ae&&oe&&t.texStorage2D(s.TEXTURE_2D,ze,j,ce[0].width,ce[0].height);for(let se=0,Ce=ce.length;se<Ce;se++)K=ce[se],M.format!==_i?le!==null?ae?Te&&t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,K.width,K.height,le,K.data):t.compressedTexImage2D(s.TEXTURE_2D,se,j,K.width,K.height,0,K.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Te&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,K.width,K.height,le,D,K.data):t.texImage2D(s.TEXTURE_2D,se,j,K.width,K.height,0,le,D,K.data)}else if(M.isDataArrayTexture)if(ae){if(oe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ze,j,Q.width,Q.height,Q.depth),Te)if(M.layerUpdates.size>0){const se=al(Q.width,Q.height,M.format,M.type);for(const Ce of M.layerUpdates){const ke=Q.data.subarray(Ce*se/Q.data.BYTES_PER_ELEMENT,(Ce+1)*se/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ce,Q.width,Q.height,1,le,D,ke)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,D,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,j,Q.width,Q.height,Q.depth,0,le,D,Q.data);else if(M.isData3DTexture)ae?(oe&&t.texStorage3D(s.TEXTURE_3D,ze,j,Q.width,Q.height,Q.depth),Te&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,D,Q.data)):t.texImage3D(s.TEXTURE_3D,0,j,Q.width,Q.height,Q.depth,0,le,D,Q.data);else if(M.isFramebufferTexture){if(oe)if(ae)t.texStorage2D(s.TEXTURE_2D,ze,j,Q.width,Q.height);else{let se=Q.width,Ce=Q.height;for(let ke=0;ke<ze;ke++)t.texImage2D(s.TEXTURE_2D,ke,j,se,Ce,0,le,D,null),se>>=1,Ce>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){const se=s.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),Q.parentNode!==se){se.appendChild(Q),h.add(M),se.onpaint=Ce=>{const ke=Ce.changedElements;for(const ge of h)ke.includes(ge.image)&&(ge.needsUpdate=!0)},se.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{const ke=s.RGBA,ge=s.RGBA,et=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ke,ge,et,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ce.length>0){if(ae&&oe){const se=Ne(ce[0]);t.texStorage2D(s.TEXTURE_2D,ze,j,se.width,se.height)}for(let se=0,Ce=ce.length;se<Ce;se++)K=ce[se],ae?Te&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,le,D,K):t.texImage2D(s.TEXTURE_2D,se,j,le,D,K);M.generateMipmaps=!1}else if(ae){if(oe){const se=Ne(Q);t.texStorage2D(s.TEXTURE_2D,ze,j,se.width,se.height)}Te&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,D,Q)}else t.texImage2D(s.TEXTURE_2D,0,j,le,D,Q);w(M)&&M.mipmapsAutoUpdate===!0&&y(ie),de.__version=re.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function St(A,M,V){if(M.image.length!==6)return;const ie=Oe(A,M),ee=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+V);const re=i.get(ee);if(ee.version!==re.__version||ie===!0){t.activeTexture(s.TEXTURE0+V);const de=$e.getPrimaries($e.workingColorSpace),Z=M.colorSpace===Ti?null:$e.getPrimaries(M.colorSpace),Q=M.colorSpace===Ti||de===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const le=M.isCompressedTexture||M.image[0].isCompressedTexture,D=M.image[0]&&M.image[0].isDataTexture,j=[];for(let ge=0;ge<6;ge++)!le&&!D?j[ge]=v(M.image[ge],!0,n.maxCubemapSize):j[ge]=D?M.image[ge].image:M.image[ge],j[ge]=Le(M,j[ge]);const K=j[0],ce=a.convert(M.format,M.colorSpace),ae=a.convert(M.type);let oe=T(M.internalFormat,ce,ae,M.normalized,M.colorSpace);const Te=M.isVideoTexture!==!0,ze=re.__version===void 0||ie===!0,se=ee.dataReady;let Ce=b(M,K);Ze(s.TEXTURE_CUBE_MAP,M);let ke;if(M.isDepthTexture){if(oe=_(M.format===Hi,M.type),ze)if(Te)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,oe,K.width,K.height);else for(let ge=0;ge<6;ge++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,oe,K.width,K.height,0,ce,ae,null)}else if(le){Te&&ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,oe,K.width,K.height);for(let ge=0;ge<6;ge++){ke=j[ge].mipmaps;for(let et=0;et<ke.length;et++){const yt=ke[et];M.format!==_i?ce!==null?Te?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et,0,0,yt.width,yt.height,ce,yt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et,oe,yt.width,yt.height,0,yt.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Te?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et,0,0,yt.width,yt.height,ce,ae,yt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et,oe,yt.width,yt.height,0,ce,ae,yt.data)}}}else{if(ke=M.mipmaps,Te&&ze){ke.length>0&&Ce++;const ge=Ne(j[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,oe,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(D){Te?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,j[ge].width,j[ge].height,ce,ae,j[ge].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,oe,j[ge].width,j[ge].height,0,ce,ae,j[ge].data);for(let et=0;et<ke.length;et++){const Ii=ke[et].image[ge].image;Te?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et+1,0,0,Ii.width,Ii.height,ce,ae,Ii.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et+1,oe,Ii.width,Ii.height,0,ce,ae,Ii.data)}}else{Te?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,ce,ae,j[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,oe,ce,ae,j[ge]);for(let et=0;et<ke.length;et++){const yt=ke[et];Te?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et+1,0,0,ce,ae,yt.image[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,et+1,oe,ce,ae,yt.image[ge])}}}w(M)&&M.mipmapsAutoUpdate===!0&&y(s.TEXTURE_CUBE_MAP),re.__version=ee.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function it(A,M,V,ie,ee,re){const de=a.convert(V.format,V.colorSpace),Z=a.convert(V.type),Q=T(V.internalFormat,de,Z,V.normalized,V.colorSpace),le=i.get(M),D=i.get(V);if(D.__renderTarget=M,!le.__hasExternalTextures){const j=Math.max(1,M.width>>re),K=Math.max(1,M.height>>re);ee===s.TEXTURE_3D||ee===s.TEXTURE_2D_ARRAY?t.texImage3D(ee,re,Q,j,K,M.depth,0,de,Z,null):t.texImage2D(ee,re,Q,j,K,0,de,Z,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ie,ee,D.__webglTexture,0,rt(M)):(ee===s.TEXTURE_2D||ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ie,ee,D.__webglTexture,re),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ui(A,M,V){if(s.bindRenderbuffer(s.RENDERBUFFER,A),M.depthBuffer){const ie=M.depthTexture,ee=ie&&ie.isDepthTexture?ie.type:null,re=_(M.stencilBuffer,ee),de=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt(M),re,M.width,M.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt(M),re,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,re,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,A)}else{const ie=M.textures;for(let ee=0;ee<ie.length;ee++){const re=ie[ee],de=a.convert(re.format,re.colorSpace),Z=a.convert(re.type),Q=T(re.internalFormat,de,Z,re.normalized,re.colorSpace);me(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt(M),Q,M.width,M.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt(M),Q,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Q,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function bt(A,M,V){const ie=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ee=i.get(M.depthTexture);ee.__renderTarget=M;const re=ie?M.depthTexture.image[0]:M.depthTexture.image;(!ee.__webglTexture||re.width!==M.width||re.height!==M.height)&&(re.width=M.width,re.height=M.height,M.depthTexture.needsUpdate=!0),ie?pe(M.depthTexture,0):ne(M.depthTexture,0);const de=ee.__webglTexture,Z=rt(M),Q=ie?s.TEXTURE_CUBE_MAP_POSITIVE_X+V:s.TEXTURE_2D,le=M.depthTexture.format===Hi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Vi)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,Q,de,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,le,Q,de,0);else if(M.depthTexture.format===Hi)me(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,Q,de,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,le,Q,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function jt(A){const M=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const ie=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ie){const ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ie.removeEventListener("dispose",ee)};ie.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=ie}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(V)for(let ie=0;ie<6;ie++)bt(M.__webglFramebuffer[ie],A,ie);else A.texture.mipmaps.length>0?bt(M.__webglFramebuffer[0],A,0):bt(M.__webglFramebuffer,A,0);else if(V){M.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[ie]),M.__webglDepthbuffer[ie]===void 0)M.__webglDepthbuffer[ie]=s.createRenderbuffer(),ui(M.__webglDepthbuffer[ie],A,!1);else{const ee=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer[ie];s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,re)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ui(M.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,re)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ei(A,M,V){const ie=i.get(A);M!==void 0&&it(ie.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&jt(A)}function ti(A){const M=A.texture,V=i.get(A),ie=i.get(M);A.addEventListener("dispose",B),L(A);const ee=A.textures,re=A.isWebGLCubeRenderTarget===!0,de=ee.length>1;if(de||(ie.__webglTexture===void 0&&(ie.__webglTexture=s.createTexture()),ie.__version=M.version,r.memory.textures++),re){V.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(M.mipmaps.length>0){V.__webglFramebuffer[Z]=[];for(let Q=0;Q<M.mipmaps.length;Q++)V.__webglFramebuffer[Z][Q]=s.createFramebuffer()}else V.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(M.mipmaps.length>0){V.__webglFramebuffer=[];for(let Z=0;Z<M.mipmaps.length;Z++)V.__webglFramebuffer[Z]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(de)for(let Z=0,Q=ee.length;Z<Q;Z++){const le=i.get(ee[Z]);le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture(),r.memory.textures++)}if(A.samples>0&&me(A)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Z=0;Z<ee.length;Z++){const Q=ee[Z];V.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[Z]);const le=a.convert(Q.format,Q.colorSpace),D=a.convert(Q.type),j=T(Q.internalFormat,le,D,Q.normalized,Q.colorSpace,A.isXRRenderTarget===!0),K=rt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,K,j,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,V.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),ui(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(re){t.bindTexture(s.TEXTURE_CUBE_MAP,ie.__webglTexture),Ze(s.TEXTURE_CUBE_MAP,M);for(let Z=0;Z<6;Z++)if(M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)it(V.__webglFramebuffer[Z][Q],A,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else it(V.__webglFramebuffer[Z],A,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);w(M)?y(s.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}else if(de){for(let Z=0,Q=ee.length;Z<Q;Z++){const le=ee[Z],D=i.get(le);let j=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(j=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(j,D.__webglTexture),Ze(j,le),it(V.__webglFramebuffer,A,le,s.COLOR_ATTACHMENT0+Z,j,0),w(le)&&y(j)}t.unbindTexture()}else{let Z=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Z,ie.__webglTexture),Ze(Z,M),M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)it(V.__webglFramebuffer[Q],A,M,s.COLOR_ATTACHMENT0,Z,Q);else it(V.__webglFramebuffer,A,M,s.COLOR_ATTACHMENT0,Z,0);w(M)?y(Z):M.mipmaps.length>0&&s.texParameteri(Z,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&jt(A)}function O(A){const M=A.textures;for(let V=0,ie=M.length;V<ie;V++){const ee=M[V];if(w(ee)&&ee.mipmapsAutoUpdate===!0){const re=E(A),de=i.get(ee).__webglTexture;t.bindTexture(re,de),y(re),t.unbindTexture()}}}const ii=[];function at(A){if(A.samples>0){if(me(A)===!1){const M=A.textures,V=A.width,ie=A.height;let ee=s.COLOR_BUFFER_BIT;const re=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=i.get(A),Z=M.length>1;if(Z)for(let le=0;le<M.length;le++)t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let le=0;le<M.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,de.__webglColorRenderbuffer[le]);const D=i.get(M[le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,D,0)}s.blitFramebuffer(0,0,V,ie,0,0,V,ie,ee,s.NEAREST),l===!0&&(ii.length=0,ii.push(s.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&ii.push(re),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ii))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let le=0;le<M.length;le++){t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,de.__webglColorRenderbuffer[le]);const D=i.get(M[le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,D,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const M=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function rt(A){return Math.min(n.maxSamples,A.samples)}function me(A){const M=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function vt(A){const M=r.render.frame;d.get(A)!==M&&(d.set(A,M),A.update())}function Le(A,M){const V=A.colorSpace,ie=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==Zs&&V!==Ti&&($e.getTransfer(V)===je?(ie!==_i||ee!==Qt)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",V)),M}function Ne(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=be,this.resetTextureUnits=Y,this.getTextureUnits=J,this.setTextureUnits=te,this.setTexture2D=ne,this.setTexture2DArray=fe,this.setTexture3D=Ee,this.setTextureCube=pe,this.rebindTextures=ei,this.setupRenderTarget=ti,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=me,this.dispose=z}function _g(s,e){function t(i,n=Ti){let a;const r=$e.getTransfer(n);if(i===Qt)return s.UNSIGNED_BYTE;if(i===Wr)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Xr)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Wl)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Xl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gl)return s.BYTE;if(i===Vl)return s.SHORT;if(i===ns)return s.UNSIGNED_SHORT;if(i===Vr)return s.INT;if(i===vi)return s.UNSIGNED_INT;if(i===hi)return s.FLOAT;if(i===Xt)return s.HALF_FLOAT;if(i===ql)return s.ALPHA;if(i===$l)return s.RGB;if(i===_i)return s.RGBA;if(i===Vi)return s.DEPTH_COMPONENT;if(i===Hi)return s.DEPTH_STENCIL;if(i===qr)return s.RED;if(i===$r)return s.RED_INTEGER;if(i===tn)return s.RG;if(i===Yr)return s.RG_INTEGER;if(i===Kr)return s.RGBA_INTEGER;if(i===Gs||i===Vs||i===Ws||i===Xs)if(r===je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Gs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ws)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Gs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ws)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xs)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qa||i===ja||i===er||i===tr)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Qa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ja)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===er)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===tr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ir||i===nr||i===sr||i===ar||i===rr||i===Ys||i===or)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ir||i===nr)return r===je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===sr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ar)return a.COMPRESSED_R11_EAC;if(i===rr)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Ys)return a.COMPRESSED_RG11_EAC;if(i===or)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===lr||i===cr||i===hr||i===dr||i===ur||i===fr||i===pr||i===mr||i===gr||i===_r||i===vr||i===xr||i===Mr||i===Sr)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===lr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ur)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_r)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sr)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===br||i===yr||i===Er)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===br)return r===je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Er)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wr||i===Tr||i===Ks||i===Ar)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===wr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Tr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ks)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ar)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Tn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}const vg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xg=`
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

}`;class Mg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Wt({vertexShader:vg,fragmentShader:xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new Li(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sg extends nn{constructor(e,t){super();const i=this;let n=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new Mg,p={},v=t.getContextAttributes();let w=null,y=null;const E=[],T=[],_=new Ae;let b=null,L=null;const C=new si;C.viewport=new ft;const I=new si;I.viewport=new ft;const B=[C,I],G=new Pd;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ne=E[q];return ne===void 0&&(ne=new xa,E[q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(q){let ne=E[q];return ne===void 0&&(ne=new xa,E[q]=ne),ne.getGripSpace()},this.getHand=function(q){let ne=E[q];return ne===void 0&&(ne=new xa,E[q]=ne),ne.getHandSpace()};function W(q){const ne=T.indexOf(q.inputSource);if(ne===-1)return;const fe=E[ne];fe!==void 0&&(fe.update(q.inputSource,q.frame,c||r),fe.dispatchEvent({type:q.type,data:q.inputSource}))}function P(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",P),n.removeEventListener("inputsourceschange",k);for(let q=0;q<E.length;q++){const ne=T[q];ne!==null&&(T[q]=null,E[q].disconnect(ne))}R=null,z=null,m.reset();for(const q in p)delete p[q];if(e.setRenderTarget(w),f=null,u=null,h=null,n=null,y=null,be.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(_.width,_.height,!1),L!==null){const q=L.camera;q.fov=L.fov,q.zoom=L.zoom,q.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(n,t)),h},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(q){if(n=q,n!==null){if(w=e.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",P),n.addEventListener("inputsourceschange",k),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(_),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Ee=null,pe=null;v.depth&&(pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=v.stencil?Hi:Vi,Ee=v.stencil?Tn:vi);const Ue={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:a};h=this.getBinding(),u=h.createProjectionLayer(Ue),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new qt(u.textureWidth,u.textureHeight,{format:_i,type:Qt,depthTexture:new An(u.textureWidth,u.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const fe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(n,t,fe),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new qt(f.framebufferWidth,f.framebufferHeight,{format:_i,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await n.requestReferenceSpace(o),be.setContext(n),be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(q){for(let ne=0;ne<q.removed.length;ne++){const fe=q.removed[ne],Ee=T.indexOf(fe);Ee>=0&&(T[Ee]=null,E[Ee].disconnect(fe))}for(let ne=0;ne<q.added.length;ne++){const fe=q.added[ne];let Ee=T.indexOf(fe);if(Ee===-1){for(let Ue=0;Ue<E.length;Ue++)if(Ue>=T.length){T.push(fe),Ee=Ue;break}else if(T[Ue]===null){T[Ue]=fe,Ee=Ue;break}if(Ee===-1)break}const pe=E[Ee];pe&&pe.connect(fe)}}function F(q,ne){ne===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ne.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(n===null)return;let ne=q.near,fe=q.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),G.near=I.near=C.near=ne,G.far=I.far=C.far=fe,(R!==G.near||z!==G.far)&&(n.updateRenderState({depthNear:G.near,depthFar:G.far}),R=G.near,z=G.far),G.layers.mask=q.layers.mask|6,C.layers.mask=G.layers.mask&-5,I.layers.mask=G.layers.mask&-3;const Ee=q.parent,pe=G.cameras;F(G,Ee);for(let Ue=0;Ue<pe.length;Ue++)F(pe[Ue],Ee);G.projectionMatrix.copy(C.projectionMatrix),G.projectionMatrixInverse.copy(C.projectionMatrixInverse),L===null&&q.isPerspectiveCamera&&(L={camera:q,fov:q.fov,zoom:q.zoom}),Y(q,G,Ee)};function Y(q,ne,fe){fe===null?q.matrix.copy(ne.matrixWorld):(q.matrix.copy(fe.matrixWorld),q.matrix.invert(),q.matrix.multiply(ne.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=as*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(q){return p[q]};let J=null;function te(q,ne){if(d=ne.getViewerPose(c||r),g=ne,d!==null){const fe=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ee=!1;fe.length!==G.cameras.length&&(G.cameras.length=0,Ee=!0);for(let Pe=0;Pe<fe.length;Pe++){const Ze=fe[Pe];let Oe=null;if(f!==null)Oe=f.getViewport(Ze);else{const _t=h.getViewSubImage(u,Ze);Oe=_t.viewport,Pe===0&&(e.setRenderTargetTextures(y,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(y))}let Ve=B[Pe];Ve===void 0&&(Ve=new si,Ve.layers.enable(Pe),Ve.viewport=new ft,B[Pe]=Ve),Ve.matrix.fromArray(Ze.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ze.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Pe===0&&(G.matrix.copy(Ve.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ee===!0&&G.cameras.push(Ve)}const pe=n.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const Pe=h.getDepthInformation(fe[0]);Pe&&Pe.isValid&&Pe.texture&&m.init(Pe,n.renderState)}if(pe&&pe.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let Pe=0;Pe<fe.length;Pe++){const Ze=fe[Pe].camera;if(Ze){let Oe=p[Ze];Oe||(Oe=new uc,p[Ze]=Oe);const Ve=h.getCameraImage(Ze);Oe.sourceTexture=Ve}}}}for(let fe=0;fe<E.length;fe++){const Ee=T[fe],pe=E[fe];Ee!==null&&pe!==void 0&&pe.update(Ee,ne,c||r)}J&&J(q,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}const be=new Mc;be.setAnimationLoop(te),this.setAnimationLoop=function(q){J=q},this.dispose=function(){}}}const bg=new tt,Pc=new Be;Pc.set(-1,0,0,0,1,0,0,0,1);function yg(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,fc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,w,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(m,p):p.isMeshLambertMaterial?(a(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(m,p),h(m,p)):p.isMeshPhongMaterial?(a(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),x(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,v,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),w=v.envMap,y=v.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(bg.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pc),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Eg(s,e,t,i){let n={},a={};function r(v,w){const y=w.program;i.uniformBlockBinding(v,y,n[v.id])}function o(v,w){let y=n[v.id];y===void 0&&(g(v),y=l(v),n[v.id]=y,v.addEventListener("dispose",m));const E=w.program;i.updateUBOMapping(v,E);const T=e.render.frame;a[v.id]!==T&&(c(v),a[v.id]=T)}function l(v){const w=s.createBuffer(),y=v.__size,E=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,y,E),s.bindBuffer(s.UNIFORM_BUFFER,null),w}function c(v){const w=n[v.id],y=v.uniforms,E=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let T=0,_=y.length;T<_;T++){const b=y[T];if(Array.isArray(b))for(let L=0,C=b.length;L<C;L++)d(b[L],T,L,E);else d(b,T,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,w,y,E){if(u(v,w,y,E)===!0){const T=v.__offset,_=v.value;if(Array.isArray(_)){let b=0;for(let L=0;L<_.length;L++){const C=_[L],I=x(C,!0);h(C,v.__data,b),b+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else h(_,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,v.__data)}}function h(v,w,y){typeof v=="number"||typeof v=="boolean"?w[y]=v:v.isMatrix3?(w[y]=v.elements[0],w[y+1]=v.elements[1],w[y+2]=v.elements[2],w[y+3]=0,w[y+4]=v.elements[3],w[y+5]=v.elements[4],w[y+6]=v.elements[5],w[y+7]=0,w[y+8]=v.elements[6],w[y+9]=v.elements[7],w[y+10]=v.elements[8],w[y+11]=0):ArrayBuffer.isView(v)?w.set(v.subarray(0,w.length-y),y):v.toArray(w,y)}function u(v,w,y,E){const T=v.value,_=w+"_"+y;if(Array.isArray(T)){E[_]===void 0&&(E[_]=[]);const b=E[_];let L=!1;for(let C=0;C<T.length;C++)f(T[C],b,C)===!0&&(L=!0);return L}return f(T,E,_)}function f(v,w,y){if(w[y]===void 0)return typeof v=="number"||typeof v=="boolean"?w[y]=v:ArrayBuffer.isView(v)?w[y]=v.slice():w[y]=v.clone(),!0;{const E=w[y];if(typeof v=="number"||typeof v=="boolean"){if(E!==v)return w[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(E.equals(v)===!1)return E.copy(v),!0}}return!1}function g(v){const w=v.uniforms;let y=0;const E=16;for(let _=0,b=w.length;_<b;_++){const L=Array.isArray(w[_])?w[_]:[w[_]];for(let C=0,I=L.length;C<I;C++){const B=L[C],G=Array.isArray(B.value)?B.value:[B.value],R=Array.isArray(w[_])||Array.isArray(B.value);let z=y;for(let P=0,k=G.length;P<k;P++){const F=G[P],Y=x(F,R),J=y%E,te=J%Y.boundary,be=J+te;y+=te,be!==0&&E-be<Y.storage&&(y+=E-be),P===0&&(z=y),y+=Y.storage}const W=B.type==="int"?Int32Array:B.type==="uint"?Uint32Array:Float32Array;B.__data=new W((y-z)/Float32Array.BYTES_PER_ELEMENT),B.__offset=z}}const T=y%E;return T>0&&(y+=E-T),v.__size=y,v.__cache={},this}function x(v,w){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):De("WebGLRenderer: Unsupported uniform value type.",v),w===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(v){const w=v.target;w.removeEventListener("dispose",m),s.deleteBuffer(n[w.id]),delete n[w.id],delete a[w.id]}function p(){for(const v in n)s.deleteBuffer(n[v]);n={},a={}}return{bind:r,update:o,dispose:p}}const wg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pi=null;function Tg(){return pi===null&&(pi=new oc(wg,16,16,tn,Xt),pi.name="DFG_LUT",pi.minFilter=Vt,pi.magFilter=Vt,pi.wrapS=Ai,pi.wrapT=Ai,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}class Ag{constructor(e={}){const{canvas:t=Dh(),context:i=null,depth:n=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const x=f,m=new Set([Kr,Yr,$r]),p=new Set([Qt,vi,ns,Tn,Wr,Xr]),v=new Uint32Array(4),w=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]};let E=null,T=null;const _=[],b=[];let L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let I=!1,B=null,G=null,R=null,z=null;this._outputColorSpace=Zt;let W=0,P=0,k=null,F=-1,Y=null;const J=new ft,te=new ft;let be=null;const q=new Re(0);let ne=0,fe=t.width,Ee=t.height,pe=1,Ue=null,ct=null;const Pe=new ft(0,0,fe,Ee),Ze=new ft(0,0,fe,Ee);let Oe=!1;const Ve=new rs,_t=new io;let dt=!1,St=!1;const it=new tt,ui=new N,bt=new ft,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ei=!1;function ti(){return k===null?pe:1}let O=i;function ii(S,U){return t.getContext(S,U)}let at,rt,me,vt,Le,Ne,A,M,V,ie,ee,re,de,Z,Q,le,D,j,K,ce,ae,oe,Te;try{const S={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nr}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",ge,!1),O===null){const U="webgl2";if(O=ii(U,S),O===null)throw ii(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(S){throw t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Je("WebGLRenderer: "+S.message),S}function ze(){at=new Pp(O),at.init(),ae=new _g(O,at),rt=new xp(O,at,e,ae),me=new mg(O,at),rt.reversedDepthBuffer&&u&&me.buffers.depth.setReversed(!0),G=O.createFramebuffer(),R=O.createFramebuffer(),z=O.createFramebuffer(),vt=new Dp(O),Le=new tg,Ne=new gg(O,at,me,Le,rt,ae,vt),A=new Rp(C),M=new Ud(O),oe=new _p(O,M),V=new Lp(O,M,vt,oe),ie=new Np(O,V,M,oe,vt),j=new Up(O,rt,Ne),Q=new Mp(Le),ee=new eg(C,A,at,rt,oe,Q),re=new yg(C,Le),de=new ng,Z=new cg(at),D=new gp(C,A,me,ie,g,l),le=new pg(C,ie,rt),Te=new Eg(O,vt,rt,me),K=new vp(O,at,vt),ce=new Ip(O,at,vt),vt.programs=ee.programs,C.capabilities=rt,C.extensions=at,C.properties=Le,C.renderLists=de,C.shadowMap=le,C.state=me,C.info=vt}x!==Qt&&(L=new Bp(x,t.width,t.height,o,n,a));const se=new Sg(C,O);this.xr=se,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=at.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=at.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(S){S!==void 0&&(pe=S,this.setSize(fe,Ee,!1))},this.getSize=function(S){return S.set(fe,Ee)},this.setSize=function(S,U,$=!0){if(se.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=S,Ee=U,t.width=Math.floor(S*pe),t.height=Math.floor(U*pe),$===!0&&(t.style.width=S+"px",t.style.height=U+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(fe*pe,Ee*pe).floor()},this.setDrawingBufferSize=function(S,U,$){fe=S,Ee=U,pe=$,t.width=Math.floor(S*$),t.height=Math.floor(U*$),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(x===Qt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(J)},this.getViewport=function(S){return S.copy(Pe)},this.setViewport=function(S,U,$,H){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,U,$,H),me.viewport(J.copy(Pe).multiplyScalar(ti()).round())},this.getScissor=function(S){return S.copy(Ze)},this.setScissor=function(S,U,$,H){S.isVector4?Ze.set(S.x,S.y,S.z,S.w):Ze.set(S,U,$,H),me.scissor(te.copy(Ze).multiplyScalar(ti()).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(S){me.setScissorTest(Oe=S)},this.setOpaqueSort=function(S){Ue=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,$=!0){let H=0;if(S){let X=!1;if(k!==null){const ue=k.texture.format;X=m.has(ue)}if(X){const ue=k.texture.type,xe=p.has(ue),he=D.getClearColor(),ve=D.getClearAlpha(),ye=he.r,Fe=he.g,Xe=he.b;xe?(v[0]=ye,v[1]=Fe,v[2]=Xe,v[3]=ve,O.clearBufferuiv(O.COLOR,0,v)):(w[0]=ye,w[1]=Fe,w[2]=Xe,w[3]=ve,O.clearBufferiv(O.COLOR,0,w))}else H|=O.COLOR_BUFFER_BIT}U&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),B=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),D.dispose(),de.dispose(),Z.dispose(),Ne.dispose(),Le.dispose(),A.dispose(),ie.dispose(),V.dispose(),oe.dispose(),Te.dispose(),ee.dispose(),se.dispose(),se.removeEventListener("sessionstart",uo),se.removeEventListener("sessionend",fo),Wi.stop()};function Ce(S){S.preventDefault(),Po("WebGLRenderer: Context Lost."),I=!0}function ke(){Po("WebGLRenderer: Context Restored."),I=!1;const S=vt.autoReset,U=le.enabled,$=le.autoUpdate,H=le.needsUpdate,X=le.type;ze(),vt.autoReset=S,le.enabled=U,le.autoUpdate=$,le.needsUpdate=H,le.type=X}function ge(S){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function et(S){const U=S.target;U.removeEventListener("dispose",et),yt(U)}function yt(S){Ii(S),Le.remove(S)}function Ii(S){const U=Le.get(S).programs;U!==void 0&&(U.forEach(function($){ee.releaseProgram($)}),S.isShaderMaterial&&ee.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,$,H,X,ue){U===null&&(U=jt);const xe=X.isMesh&&X.matrixWorld.determinantAffine()<0,he=Dc(S,U,$,H,X);me.setMaterial(H,xe);let ve=$.index,ye=1;if(H.wireframe===!0){if(ve=V.getWireframeAttribute($),ve===void 0)return;ye=2}const Fe=$.drawRange,Xe=$.attributes.position;let Me=Fe.start*ye,qe=(Fe.start+Fe.count)*ye;ue!==null&&(Me=Math.max(Me,ue.start*ye),qe=Math.min(qe,(ue.start+ue.count)*ye)),ve!==null?(Me=Math.max(Me,0),qe=Math.min(qe,ve.count)):Xe!=null&&(Me=Math.max(Me,0),qe=Math.min(qe,Xe.count));const pt=qe-Me;if(pt<0||pt===1/0)return;oe.setup(X,H,he,$,ve);let st,nt=K;if(ve!==null&&(st=M.get(ve),nt=ce,nt.setIndex(st)),X.isMesh)H.wireframe===!0?(me.setLineWidth(H.wireframeLinewidth*ti()),nt.setMode(O.LINES)):nt.setMode(O.TRIANGLES);else if(X.isLine){let Ut=H.linewidth;Ut===void 0&&(Ut=1),me.setLineWidth(Ut*ti()),X.isLineSegments?nt.setMode(O.LINES):X.isLineLoop?nt.setMode(O.LINE_LOOP):nt.setMode(O.LINE_STRIP)}else X.isPoints?nt.setMode(O.POINTS):X.isSprite&&nt.setMode(O.TRIANGLES);if(X.isBatchedMesh)if(at.get("WEBGL_multi_draw"))nt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ut=X._multiDrawStarts,Se=X._multiDrawCounts,kt=X._multiDrawCount,Qe=ve?M.get(ve).bytesPerElement:1,Xi=Le.get(H).currentProgram.getUniforms();for(let Nt=0;Nt<kt;Nt++)Xi.setValue(O,"_gl_DrawID",Nt),nt.render(Ut[Nt]/Qe,Se[Nt])}else if(X.isInstancedMesh)nt.renderInstances(Me,pt,X.count);else if($.isInstancedBufferGeometry){const Ut=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Se=Math.min($.instanceCount,Ut);nt.renderInstances(Me,pt,Se)}else nt.render(Me,pt)};function ho(S,U,$,H){B!==null&&S.isNodeMaterial&&B.setObject(H,S),dt===!0&&Q.setState(S,$,!1),S.transparent===!0&&S.side===gt&&S.forceSinglePass===!1?(S.side=Ht,S.needsUpdate=!0,Nn(S,U,H),S.side=en,S.needsUpdate=!0,Nn(S,U,H),S.side=gt):Nn(S,U,H)}this.compile=function(S,U,$=null){$===null&&($=S),B!==null&&B.renderStart(S,U,$),T=Z.get($),T.init(U),b.push(T),$.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),S!==$&&S.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),T.setupLights(),B!==null&&B.updateLights(T.state.lightsArray),St=this.localClippingEnabled,dt=Q.init(this.clippingPlanes,St),dt===!0&&Q.setGlobalState(this.clippingPlanes,U),B!==null&&le.render(T.state.shadowsArray,$,U);const H=new Set;return S.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ue=X.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){const he=ue[xe];ho(he,$,U,X),H.add(he)}else ho(ue,$,U,X),H.add(ue)}),T=b.pop(),B!==null&&B.renderEnd(),H},this.compileAsync=function(S,U,$=null){const H=this.compile(S,U,$);return new Promise(X=>{function ue(){if(H.forEach(function(xe){const ve=Le.get(xe).currentProgram;(ve===void 0||ve.isReady())&&H.delete(xe)}),H.size===0){X(S);return}setTimeout(ue,10)}at.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let ra=null;function Lc(S){ra&&ra(S)}function uo(){Wi.stop()}function fo(){Wi.start()}const Wi=new Mc;Wi.setAnimationLoop(Lc),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(S){ra=S,se.setAnimationLoop(S),S===null?Wi.stop():Wi.start()},se.addEventListener("sessionstart",uo),se.addEventListener("sessionend",fo),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;B!==null&&B.renderStart(S,U);const $=se.enabled===!0&&se.isPresenting===!0,H=L!==null&&(k===null||$)&&L.begin(C,k);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(U),U=se.getCamera()),S.isScene===!0&&S.onBeforeRender(C,S,U,k),T=Z.get(S,b.length),T.init(U),T.state.textureUnits=Ne.getTextureUnits(),b.push(T),it.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?_t.setFromArrayCamera(U):Ve.setFromProjectionMatrix(it,di,U.reversedDepth),St=this.localClippingEnabled,dt=Q.init(this.clippingPlanes,St),E=de.get(S,_.length),E.init(),_.push(E),this.info.render.frame++,se.enabled===!0&&se.isPresenting===!0){const xe=C.xr.getDepthSensingMesh();xe!==null&&oa(xe,U,-1/0,C.sortObjects)}oa(S,U,0,C.sortObjects),E.finish(),B!==null&&B.updateLights(T.state.lightsArray),C.sortObjects===!0&&E.sort(Ue,ct),ei=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,ei&&D.addToRenderList(E,S),this.info.autoReset===!0&&this.info.reset(),dt===!0&&Q.beginShadows();const X=T.state.shadowsArray;if(le.render(X,S,U),dt===!0&&Q.endShadows(),(H&&L.hasRenderPass())===!1){const xe=E.opaque,he=E.transmissive;if(T.setupLights(),U.isArrayCamera){const ve=U.cameras;if(he.length>0)for(let ye=0,Fe=ve.length;ye<Fe;ye++){const Xe=ve[ye];mo(xe,he,S,Xe)}ei&&D.render(S);for(let ye=0,Fe=ve.length;ye<Fe;ye++){const Xe=ve[ye];po(E,S,Xe,Xe.viewport)}}else he.length>0&&mo(xe,he,S,U),ei&&D.render(S),po(E,S,U)}k!==null&&P===0&&(Ne.updateMultisampleRenderTarget(k),Ne.updateRenderTargetMipmap(k)),H&&L.end(C),S.isScene===!0&&S.onAfterRender(C,S,U),oe.resetDefaultState(),F=-1,Y=null,b.pop(),b.length>0?(T=b[b.length-1],Ne.setTextureUnits(T.state.textureUnits),dt===!0&&Q.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,_.pop(),_.length>0?E=_[_.length-1]:E=null,B!==null&&B.renderEnd()};function oa(S,U,$,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){const xe=U.isArrayCamera?_t:Ve;if(!S.frustumCulled||S.intersectsFrustum(xe)){H&&bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(it);const he=ie.update(S),ve=S.material;ve.visible&&E.push(S,he,ve,$,bt.z,null,U)}}else if(S.isMesh||S.isLine||S.isPoints){const xe=U.isArrayCamera?_t:Ve;if(!S.frustumCulled||S.intersectsFrustum(xe)){const he=ie.update(S),ve=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),bt.copy(S.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),bt.copy(he.boundingSphere.center)),bt.applyMatrix4(S.matrixWorld).applyMatrix4(it)),Array.isArray(ve)){const ye=he.groups;for(let Fe=0,Xe=ye.length;Fe<Xe;Fe++){const Me=ye[Fe],qe=ve[Me.materialIndex];qe&&qe.visible&&E.push(S,he,qe,$,bt.z,Me,U)}}else ve.visible&&E.push(S,he,ve,$,bt.z,null,U)}}}const ue=S.children;for(let xe=0,he=ue.length;xe<he;xe++)oa(ue[xe],U,$,H)}function po(S,U,$,H){const{opaque:X,transmissive:ue,transparent:xe}=S;T.setupLightsView($),dt===!0&&Q.setGlobalState(C.clippingPlanes,$),H&&me.viewport(J.copy(H)),X.length>0&&ds(X,U,$),ue.length>0&&ds(ue,U,$),xe.length>0&&ds(xe,U,$),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function mo(S,U,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Me=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new qt(1,1,{generateMipmaps:!0,type:Me?Xt:Qt,minFilter:zi,samples:Math.max(4,rt.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const ue=T.state.transmissionRenderTarget[H.id],xe=H.viewport||J;ue.setSize(xe.z*C.transmissionResolutionScale,xe.w*C.transmissionResolutionScale);const he=C.getRenderTarget(),ve=C.getActiveCubeFace(),ye=C.getActiveMipmapLevel();C.setRenderTarget(ue),C.getClearColor(q),ne=C.getClearAlpha(),ne<1&&C.setClearColor(16777215,.5),C.clear(),ei&&D.render($);const Fe=C.toneMapping;C.toneMapping=Ri;const Xe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),dt===!0&&Q.setGlobalState(C.clippingPlanes,H),ds(S,$,H),Ne.updateMultisampleRenderTarget(ue),Ne.updateRenderTargetMipmap(ue),at.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let qe=0,pt=U.length;qe<pt;qe++){const st=U[qe],{object:nt,geometry:Ut,material:Se,group:kt}=st;if(Se.side===gt&&nt.layers.test(H.layers)){const Qe=Se.side;Se.side=Ht,Se.needsUpdate=!0,go(nt,$,H,Ut,Se,kt),Se.side=Qe,Se.needsUpdate=!0,Me=!0}}Me===!0&&(Ne.updateMultisampleRenderTarget(ue),Ne.updateRenderTargetMipmap(ue))}C.setRenderTarget(he,ve,ye),C.setClearColor(q,ne),Xe!==void 0&&(H.viewport=Xe),C.toneMapping=Fe}function ds(S,U,$){const H=U.isScene===!0?U.overrideMaterial:null;for(let X=0,ue=S.length;X<ue;X++){const xe=S[X],{object:he,geometry:ve,group:ye}=xe;let Fe=xe.material;Fe.allowOverride===!0&&H!==null&&(Fe=H),he.layers.test($.layers)&&go(he,U,$,ve,Fe,ye)}}function go(S,U,$,H,X,ue){B!==null&&X.isNodeMaterial&&B.setObject(S,X),S.onBeforeRender(C,U,$,H,X,ue),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),X.onBeforeRender(C,U,$,H,S,ue),X.transparent===!0&&X.side===gt&&X.forceSinglePass===!1?(X.side=Ht,X.needsUpdate=!0,C.renderBufferDirect($,U,H,X,S,ue),X.side=en,X.needsUpdate=!0,C.renderBufferDirect($,U,H,X,S,ue),X.side=gt):C.renderBufferDirect($,U,H,X,S,ue),S.onAfterRender(C,U,$,H,X,ue)}function _o(S){let U=0;for(const $ of S)$.texture!==null&&U++;return U}function Nn(S,U,$){U.isScene!==!0&&(U=jt);const H=Le.get(S),X=T.state.lights,ue=T.state.shadowsArray,xe=X.state.version,he=ee.getParameters(S,X.state,ue,U,$,T.state.lightProbeGridArray),ve=ee.getProgramCacheKey(he);let ye=H.programs;H.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const Fe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;H.envMap=A.get(S.envMap||H.environment,Fe),H.envMapRotation=H.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,ye===void 0&&(S.addEventListener("dispose",et),ye=new Map,H.programs=ye,H.programVariants=new Map);let Xe=ye.get(ve);if(Xe!==void 0){if(H.currentProgram===Xe&&H.lightsStateVersion===xe)return xo(S,he),Xe}else he.uniforms=ee.getUniforms(S),B!==null&&S.isNodeMaterial&&B.build(S,$,he),S.onBeforeCompile(he,C),Xe=ee.acquireProgram(he,ve),ye.set(ve,Xe),H.uniforms=he.uniforms;const Me=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Me.clippingPlanes=Q.uniform),xo(S,he),H.needsLights=Nc(S),H.lightsStateVersion=xe,H.needsLights&&(Me.ambientLightColor.value=X.state.ambient,Me.lightProbe.value=X.state.probe,Me.sunLights.value=X.state.sun,Me.sunLightShadows.value=X.state.sunShadow,Me.directionalLights.value=X.state.directional,Me.directionalLightShadows.value=X.state.directionalShadow,Me.spotLights.value=X.state.spot,Me.spotLightShadows.value=X.state.spotShadow,Me.rectAreaLights.value=X.state.rectArea,Me.ltc_1.value=X.state.rectAreaLTC1,Me.ltc_2.value=X.state.rectAreaLTC2,Me.pointLights.value=X.state.point,Me.pointLightShadows.value=X.state.pointShadow,Me.hemisphereLights.value=X.state.hemi,Me.sunShadowMatrix.value=X.state.sunShadowMatrix,Me.sunShadowCascade.value=X.state.sunShadowCascade,Me.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Me.spotLightMatrix.value=X.state.spotLightMatrix,Me.spotLightMap.value=X.state.spotLightMap,Me.pointShadowMatrix.value=X.state.pointShadowMatrix),H.numLightProbeGrids=_o(T.state.lightProbeGridArray),H.currentProgram=Xe,H.uniformsList=null,Xe}function Ic(S,U,$,H,X){const ue=Le.get(S),xe=ue.currentProgram.id+","+H+","+X;let he=ue.programVariants.get(xe);return he===void 0?(he=Nn(S,U,$),ue.programVariants.set(xe,he)):(ue.currentProgram=he,ue.uniformsList=null,ue.outputColorSpace=H,ue.toneMapping=X),he}function vo(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=qs.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function xo(S,U){const $=Le.get(S);$.outputColorSpace=U.outputColorSpace,$.batching=U.batching,$.batchingColor=U.batchingColor,$.instancing=U.instancing,$.instancingColor=U.instancingColor,$.instancingMorph=U.instancingMorph,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function Dc(S,U,$,H,X){U.isScene!==!0&&(U=jt),Ne.resetTextureUnits();const ue=U.fog,xe=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,he=k===null?C.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:$e.workingColorSpace,ve=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,ye=A.get(H.envMap||xe,ve),Fe=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Xe=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Me=!!$.morphAttributes.position,qe=!!$.morphAttributes.normal,pt=!!$.morphAttributes.color;let st=Ri;H.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(st=C.toneMapping);const nt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ut=nt!==void 0?nt.length:0,Se=Le.get(H),kt=T.state.lights;if(dt===!0&&(St===!0||S!==Y)){const lt=S===Y&&H.id===F;Q.setState(H,S,lt)}let Qe=!1,Xi=!1;H.version===Se.__version?Se.needsLights&&Se.lightsStateVersion!==kt.state.version||X.isBatchedMesh&&Se.batching===!1||!X.isBatchedMesh&&Se.batching===!0||X.isBatchedMesh&&Se.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Se.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Se.instancing===!1||!X.isInstancedMesh&&Se.instancing===!0||X.isSkinnedMesh&&Se.skinning===!1||!X.isSkinnedMesh&&Se.skinning===!0||X.isInstancedMesh&&Se.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Se.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Se.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Se.instancingMorph===!1&&X.morphTexture!==null||Se.envMap!==ye||H.fog===!0&&Se.fog!==ue||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Q.numPlanes||Se.numIntersection!==Q.numIntersection)||Se.vertexAlphas!==Fe||Se.vertexTangents!==Xe||Se.morphTargets!==Me||Se.morphNormals!==qe||Se.morphColors!==pt||Se.morphTargetsCount!==Ut||Se.numLightProbeGrids!==_o(T.state.lightProbeGridArray)?Qe=!0:(Se.outputColorSpace!==he||Se.toneMapping!==st)&&(Xi=!0):(Qe=!0,Se.__version=H.version);let Nt=Se.currentProgram;(Qe===!0||Xi===!0)&&(Nt=Xi===!0?Ic(H,U,X,he,st):Nn(H,U,X),B&&H.isNodeMaterial&&B.onUpdateProgram(H,Nt,Se));let us=!1,Di=!1,qi=!1;const Ye=Nt.getUniforms(),Rt=Se.uniforms;if(me.useProgram(Nt.program)&&(us=!0,Di=!0,qi=!0),H.id!==F&&(F=H.id,Di=!0),us||Y!==S){me.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Ye.setValue(O,"projectionMatrix",S.projectionMatrix),Ye.setValue(O,"viewMatrix",S.matrixWorldInverse);const Et=Ye.map.cameraPosition;Et!==void 0&&Et.setValue(O,ui.setFromMatrixPosition(S.matrixWorld)),rt.logarithmicDepthBuffer&&Ye.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ye.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),Y!==S&&(Y=S,Di=!0,qi=!0)}if(Se.needsLights&&(kt.state.sunShadowMap.length>0&&Ye.setValue(O,"sunShadowMap",kt.state.sunShadowMap,Ne),kt.state.directionalShadowMap.length>0&&Ye.setValue(O,"directionalShadowMap",kt.state.directionalShadowMap,Ne),kt.state.spotShadowMap.length>0&&Ye.setValue(O,"spotShadowMap",kt.state.spotShadowMap,Ne),kt.state.pointShadowMap.length>0&&Ye.setValue(O,"pointShadowMap",kt.state.pointShadowMap,Ne)),X.isSkinnedMesh){Ye.setOptional(O,X,"bindMatrix"),Ye.setOptional(O,X,"bindMatrixInverse");const lt=X.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),Ye.setValue(O,"boneTexture",lt.boneTexture,Ne))}X.isBatchedMesh&&(Ye.setOptional(O,X,"batchingTexture"),Ye.setValue(O,"batchingTexture",X._matricesTexture,Ne),Ye.setOptional(O,X,"batchingIdTexture"),Ye.setValue(O,"batchingIdTexture",X._indirectTexture,Ne),Ye.setOptional(O,X,"batchingColorTexture"),X._colorsTexture!==null&&Ye.setValue(O,"batchingColorTexture",X._colorsTexture,Ne));const ai=$.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&j.update(X,$,Nt),(Di||Se.receiveShadow!==X.receiveShadow)&&(Se.receiveShadow=X.receiveShadow,Ye.setValue(O,"receiveShadow",X.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(Rt.envMapIntensity.value=U.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=Tg()),Di){if(Ye.setValue(O,"toneMappingExposure",C.toneMappingExposure),Se.needsLights&&Uc(Rt,qi),ue&&H.fog===!0&&re.refreshFogUniforms(Rt,ue),re.refreshMaterialUniforms(Rt,H,pe,Ee,T.state.transmissionRenderTarget[S.id]),Se.needsLights&&Se.numLightProbeGrids>0){const lt=y;let Et=0;for(const Mi of T.state.lightProbeGridArray)Mi.texture!==null&&(lt.textures[Et]=Mi.texture,lt.min[Et]=Mi.boundingBox.min,lt.max[Et]=Mi.boundingBox.max,lt.resolution[Et]=Mi.resolution,Et++);for(const Mi in lt)lt[Mi].length=Et;Rt.probesSH.value=lt.textures,Rt.probesMin.value=lt.min,Rt.probesMax.value=lt.max,Rt.probesResolution.value=lt.resolution}qs.upload(O,vo(Se),Rt,Ne)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(qs.upload(O,vo(Se),Rt,Ne),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ye.setValue(O,"center",X.center),Ye.setValue(O,"modelViewMatrix",X.modelViewMatrix),Ye.setValue(O,"normalMatrix",X.normalMatrix),Ye.setValue(O,"modelMatrix",X.matrixWorld),H.uniformsGroups!==void 0){const lt=H.uniformsGroups;for(let Et=0,Mi=lt.length;Et<Mi;Et++){const So=lt[Et];Te.update(So,Nt),Te.bind(So,Nt)}}return Nt}function Uc(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.sunLights.needsUpdate=U,S.sunLightShadows.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Nc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(S,U,$){const H=Le.get(S);H.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Le.get(S.texture).__webglTexture=U,Le.get(S.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const $=Le.get(S);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,$=0){k=S,W=U,P=$;let H=null,X=!1,ue=!1;if(S){const he=Le.get(S);if(he.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(O.FRAMEBUFFER,he.__webglFramebuffer),J.copy(S.viewport),te.copy(S.scissor),be=S.scissorTest,me.viewport(J),me.scissor(te),me.setScissorTest(be),F=-1;return}else if(he.__webglFramebuffer===void 0)Ne.setupRenderTarget(S);else if(he.__hasExternalTextures)Ne.rebindTextures(S,Le.get(S.texture).__webglTexture,Le.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Fe=S.depthTexture;if(he.__boundDepthTexture!==Fe){if(Fe!==null&&Le.has(Fe)&&(S.width!==Fe.image.width||S.height!==Fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(S)}}const ve=S.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(ue=!0);const ye=Le.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ye[U])?H=ye[U][$]:H=ye[U],X=!0):S.samples>0&&Ne.useMultisampledRTT(S)===!1?H=Le.get(S).__webglMultisampledFramebuffer:Array.isArray(ye)?H=ye[$]:H=ye,J.copy(S.viewport),te.copy(S.scissor),be=S.scissorTest}else J.copy(Pe).multiplyScalar(pe).floor(),te.copy(Ze).multiplyScalar(pe).floor(),be=Oe;if($!==0&&(H=G),me.bindFramebuffer(O.FRAMEBUFFER,H)&&me.drawBuffers(S,H),me.viewport(J),me.scissor(te),me.setScissorTest(be),X){const he=Le.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,he.__webglTexture,$)}else if(ue){const he=U;for(let ve=0;ve<S.textures.length;ve++){const ye=Le.get(S.textures[ve]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+ve,ye.__webglTexture,$,he)}}else if(S!==null&&$!==0){const he=Le.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,he.__webglTexture,$)}F=-1};function Mo(S){const U=Le.get(S);return(U.__readFormat!==S.format||U.__readType!==S.type)&&(U.__readFormat=S.format,U.__readType=S.type,U.__formatReadable=rt.textureFormatReadable(S.format),U.__typeReadable=rt.textureTypeReadable(S.type)),U}this.readRenderTargetPixels=function(S,U,$,H,X,ue,xe,he=0){if(!(S&&S.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Le.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(ve=ve[xe],Array.isArray(ve)&&(ve=ve[0])),ve){me.bindFramebuffer(O.FRAMEBUFFER,ve);try{const ye=S.textures[he],Fe=ye.format,Xe=ye.type;S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+he);const Me=Mo(ye);if(Me.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&$>=0&&$<=S.height-X&&O.readPixels(U,$,H,X,ae.convert(Fe),ae.convert(Xe),ue)}finally{const ye=k!==null?Le.get(k).__webglFramebuffer:null;me.bindFramebuffer(O.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(S,U,$,H,X,ue,xe,he=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Le.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(ve=ve[xe],Array.isArray(ve)&&(ve=ve[0])),ve)if(U>=0&&U<=S.width-H&&$>=0&&$<=S.height-X){me.bindFramebuffer(O.FRAMEBUFFER,ve);const ye=S.textures[he],Fe=ye.format,Xe=ye.type;S.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+he);const Me=Mo(ye);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.bufferData(O.PIXEL_PACK_BUFFER,ue.byteLength,O.STREAM_READ),O.readPixels(U,$,H,X,ae.convert(Fe),ae.convert(Xe),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const pt=k!==null?Le.get(k).__webglFramebuffer:null;me.bindFramebuffer(O.FRAMEBUFFER,pt);const st=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Uh(O,st,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ue),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(qe),O.deleteSync(st),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,$=0){const H=Math.pow(2,-$),X=Math.floor(S.image.width*H),ue=Math.floor(S.image.height*H),xe=U!==null?U.x:0,he=U!==null?U.y:0;Ne.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,xe,he,X,ue),me.unbindTexture()},this.copyTextureToTexture=function(S,U,$=null,H=null,X=0,ue=0){let xe,he,ve,ye,Fe,Xe,Me,qe,pt;const st=S.isCompressedTexture?S.mipmaps[ue]:S.image;if($!==null)xe=$.max.x-$.min.x,he=$.max.y-$.min.y,ve=$.isBox3?$.max.z-$.min.z:1,ye=$.min.x,Fe=$.min.y,Xe=$.isBox3?$.min.z:0;else{const Ye=Math.pow(2,-X);xe=Math.floor(st.width*Ye),he=Math.floor(st.height*Ye),S.isDataArrayTexture?ve=st.depth:S.isData3DTexture?ve=Math.floor(st.depth*Ye):ve=1,ye=0,Fe=0,Xe=0}H!==null?(Me=H.x,qe=H.y,pt=H.z):(Me=0,qe=0,pt=0);const nt=ae.convert(U.format),Ut=ae.convert(U.type);let Se;U.isData3DTexture?(Ne.setTexture3D(U,0),Se=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ne.setTexture2DArray(U,0),Se=O.TEXTURE_2D_ARRAY):(Ne.setTexture2D(U,0),Se=O.TEXTURE_2D),me.activeTexture(O.TEXTURE0),me.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),me.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),me.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const kt=me.getParameter(O.UNPACK_ROW_LENGTH),Qe=me.getParameter(O.UNPACK_IMAGE_HEIGHT),Xi=me.getParameter(O.UNPACK_SKIP_PIXELS),Nt=me.getParameter(O.UNPACK_SKIP_ROWS),us=me.getParameter(O.UNPACK_SKIP_IMAGES);me.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),me.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),me.pixelStorei(O.UNPACK_SKIP_PIXELS,ye),me.pixelStorei(O.UNPACK_SKIP_ROWS,Fe),me.pixelStorei(O.UNPACK_SKIP_IMAGES,Xe);const Di=S.isDataArrayTexture||S.isData3DTexture,qi=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const Ye=Le.get(S),Rt=Le.get(U),ai=Le.get(Ye.__renderTarget),lt=Le.get(Rt.__renderTarget);me.bindFramebuffer(O.READ_FRAMEBUFFER,ai.__webglFramebuffer),me.bindFramebuffer(O.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Et=0;Et<ve;Et++)Di&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(S).__webglTexture,X,Xe+Et),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(U).__webglTexture,ue,pt+Et)),O.blitFramebuffer(ye,Fe,ye+xe,Fe+he,Me,qe,Me+xe,qe+he,O.DEPTH_BUFFER_BIT,O.NEAREST);me.bindFramebuffer(O.READ_FRAMEBUFFER,null),me.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(X!==0||S.isRenderTargetTexture||Le.has(S)){const Ye=Le.get(S),Rt=Le.get(U);me.bindFramebuffer(O.READ_FRAMEBUFFER,R),me.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let ai=0;ai<ve;ai++)Di?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ye.__webglTexture,X,Xe+ai):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ye.__webglTexture,X),qi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Rt.__webglTexture,ue,pt+ai):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Rt.__webglTexture,ue),X!==0?O.blitFramebuffer(ye,Fe,ye+xe,Fe+he,Me,qe,Me+xe,qe+he,O.COLOR_BUFFER_BIT,O.NEAREST):qi?O.copyTexSubImage3D(Se,ue,Me,qe,pt+ai,ye,Fe,xe,he):O.copyTexSubImage2D(Se,ue,Me,qe,ye,Fe,xe,he);me.bindFramebuffer(O.READ_FRAMEBUFFER,null),me.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else qi?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(Se,ue,Me,qe,pt,xe,he,ve,nt,Ut,st.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Se,ue,Me,qe,pt,xe,he,ve,nt,st.data):O.texSubImage3D(Se,ue,Me,qe,pt,xe,he,ve,nt,Ut,st):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ue,Me,qe,xe,he,nt,Ut,st.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ue,Me,qe,st.width,st.height,nt,st.data):O.texSubImage2D(O.TEXTURE_2D,ue,Me,qe,xe,he,nt,Ut,st);me.pixelStorei(O.UNPACK_ROW_LENGTH,kt),me.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qe),me.pixelStorei(O.UNPACK_SKIP_PIXELS,Xi),me.pixelStorei(O.UNPACK_SKIP_ROWS,Nt),me.pixelStorei(O.UNPACK_SKIP_IMAGES,us),ue===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&O.generateMipmap(Se),me.unbindTexture()},this.initRenderTarget=function(S){Le.get(S).__webglFramebuffer===void 0&&Ne.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ne.setTextureCube(S,0):S.isData3DTexture?Ne.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ne.setTexture2DArray(S,0):Ne.setTexture2D(S,0),me.unbindTexture()},this.resetState=function(){W=0,P=0,k=null,me.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class Cg extends sc{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Lt;e.deleteAttribute("uv");const t=new ot({side:Ht}),i=new ot,n=new vc(16777215,900,28,2);n.position.set(.418,16.199,.3),this.add(n);const a=new we(e,t);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const r=new ea(e,i,6),o=new ht;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),r.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),r.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),r.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),r.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),r.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),r.setMatrixAt(5,o.matrix),this.add(r);const l=new we(e,xn(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new we(e,xn(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const d=new we(e,xn(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const h=new we(e,xn(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const u=new we(e,xn(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new we(e,xn(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function xn(s){return new yd({color:0,emissive:16777215,emissiveIntensity:s})}const $s={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Un{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Rg=new ro(-1,1,1,-1,0,1);class Pg extends Ct{constructor(){super(),this.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ge([0,2,0,0,2,0],2))}}const Lg=new Pg;class lo{constructor(e){this._mesh=new we(Lg,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Rg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ig extends Un{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Wt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ls.clone(e.uniforms),this.material=new Wt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new lo(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Al extends Un{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,r,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class Dg extends Un{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ug{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ae);this._width=i.width,this._height=i.height,t=new qt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ig($s),this.copyPass.material.blending=ji,this.timer=new xc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,a=this.passes.length;n<a;n++){const r=this.passes[n];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),r.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Al!==void 0&&(r instanceof Al?i=!0:r instanceof Dg&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Os={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Ng extends Un{constructor(){super(),this.isOutputPass=!0,this.uniforms=ls.clone(Os.uniforms),this.material=new pc({name:Os.name,uniforms:this.uniforms,vertexShader:Os.vertexShader,fragmentShader:Os.fragmentShader}),this._fsQuad=new lo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Br?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Or?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===na?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===zr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fg extends Un{constructor(e,t,i=null,n=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Re}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let a,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=n}}const Bg={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Re(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Rn extends Un{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new Ae(e.x,e.y):new Ae(256,256),this.clearColor=new Re(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new qt(a,r,{type:Xt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new qt(a,r,{type:Xt,depthBuffer:!1});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const u=new qt(a,r,{type:Xt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),a=Math.round(a/2),r=Math.round(r/2)}const o=Bg;this.highPassUniforms=ls.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Wt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ae(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ls.clone($s.uniforms),this.blendMaterial=new Wt({uniforms:this.copyUniforms,vertexShader:$s.vertexShader,fragmentShader:$s.fragmentShader,premultipliedAlpha:!0,blending:Va,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Re,this._oldClearAlpha=1,this._basic=new ut,this._fsQuad=new lo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,n),this.renderTargetsVertical[a].setSize(i,n),this.separableBlurMaterials[a].uniforms.invSize.value=new Ae(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Rn.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Rn.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);const n=[],a=[];for(let r=1;r<e;r+=2){const o=t[r],l=r+1<e?t[r+1]:0,c=o+l;n.push((r*o+(r+1)*l)/c),a.push(c)}return new Wt({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ae(.5,.5)},direction:{value:new Ae(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:n},gaussianWeights:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Wt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Rn.BlurDirectionX=new Ae(1,0);Rn.BlurDirectionY=new Ae(0,1);const Cl=new Map;let Oa=null,ka=null,za=null,ks=null;function co(s){if(typeof document>"u")return null;const e=512,t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");if(!i)return null;const n=i.createImageData(e,e),a=n.data,r=.12,o=(c,d)=>{const h=Math.sin(c*12.9898+d*78.233)*43758.5453;return h-Math.floor(h)};for(let c=0;c<e;c++){const d=c/(e-1);for(let h=0;h<e;h++){const u=h/(e-1);let f=0,g=0,x=1;if(u<r?f-=(r-u)/r*.65:u>1-r&&(f+=(u-(1-r))/r*.65),d<r?g-=(r-d)/r*.65:d>1-r&&(g+=(d-(1-r))/r*.65),s==="cloth"){const v=Math.sin(u*Math.PI*24)*.08,w=Math.cos(d*Math.PI*24)*.08;f+=v,g+=w}else if(s==="stone"){const v=(o(Math.floor(h/4),Math.floor(c/4))-.5)*.22,w=(o(Math.floor(h/4)+17,Math.floor(c/4)+31)-.5)*.22;f+=v,g+=w}else{const v=(o(Math.floor(h/8),Math.floor(c/8))-.5)*.06;f+=v,g+=v}const m=Math.hypot(f,g,x)||1;f/=m,g/=m,x/=m;const p=(c*e+h)*4;a[p]=Math.round((f*.5+.5)*255),a[p+1]=Math.round((g*.5+.5)*255),a[p+2]=Math.round((x*.5+.5)*255),a[p+3]=255}}i.putImageData(n,0,0);const l=new hc(t);return l.colorSpace=Ti,l.wrapS=is,l.wrapT=is,l.anisotropy=4,l.needsUpdate=!0,l}function zs(){return Oa||(Oa=co("bevel")),Oa}function Og(){return ka||(ka=co("cloth")),ka}function kg(){return za||(za=co("stone")),za}function Lr(s){const e=Cl.get(s);if(e)return e;let t;switch(s){case"steel":t=new ot({vertexColors:!0,metalness:.78,roughness:.25,normalMap:zs(),normalScale:new Ae(.45,.45)});break;case"gold":t=new ot({vertexColors:!0,metalness:.85,roughness:.22,normalMap:zs(),normalScale:new Ae(.5,.5)});break;case"cloth":t=new ot({vertexColors:!0,metalness:.04,roughness:.9,normalMap:Og(),normalScale:new Ae(.35,.35)});break;case"leather":t=new ot({vertexColors:!0,metalness:.08,roughness:.72,normalMap:zs(),normalScale:new Ae(.4,.4)});break;case"stone":t=new ot({vertexColors:!0,metalness:.08,roughness:.78,normalMap:kg(),normalScale:new Ae(.55,.55)});break;case"ice":t=new mc({vertexColors:!0,metalness:.1,roughness:.14,clearcoat:.9,clearcoatRoughness:.12,normalMap:zs(),normalScale:new Ae(.5,.5)});break;case"emissive":{const i=new ot({vertexColors:!0,emissive:new Re(16777215),emissiveIntensity:2.35,metalness:.1,roughness:.2});i.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <emissivemap_fragment>",`
          #include <emissivemap_fragment>
          totalEmissiveRadiance *= vColor.rgb;
          `)},t=i;break}}return Cl.set(s,t),t}function zg(){if(!ks&&typeof document<"u"){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");if(t){const i=t.createRadialGradient(128,128,20.48,128,128,122.88);i.addColorStop(0,"rgba(0, 0, 0, 0.85)"),i.addColorStop(.55,"rgba(0, 0, 0, 0.45)"),i.addColorStop(1,"rgba(0, 0, 0, 0.0)"),t.fillStyle=i,t.fillRect(0,0,256,256)}ks=new hc(e),ks.colorSpace=Zt}return new ut({color:16777215,map:ks,transparent:!0,opacity:.56,depthWrite:!1})}const Hg=[{dir:[1,0,0],corners:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],shade:.94},{dir:[-1,0,0],corners:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],shade:.89},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.72},{dir:[0,0,1],corners:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],shade:.97},{dir:[0,0,-1],corners:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],shade:.86}],Rl=[[0,0],[1,0],[1,1],[0,1]];function Pl(s,e,t){return`${s},${e},${t}`}function Gg(s){return s.emissive?"emissive":s.mat?s.mat:(s.metalness??0)>=.82?"gold":(s.metalness??0)>=.45?"steel":"cloth"}function Pt(s,e=.048,t=[0,0,0]){const i=new Ke;if(s.length===0)return i;const n=new Map;let a=1/0,r=-1/0;for(const u of s){const f=Math.round(u.x),g=Math.round(u.y),x=Math.round(u.z);g<a&&(a=g),g>r&&(r=g),n.set(Pl(f,g,x),{...u,x:f,y:g,z:x})}const o=Math.max(1,r-a),l=(u,f,g)=>n.has(Pl(u,f,g)),c=new Map,d=u=>{let f=c.get(u);return f||(f={positions:[],normals:[],colors:[],uvs:[],indices:[]},c.set(u,f)),f},h=new Re;for(const u of n.values()){const f=Gg(u),g=d(f);h.setHex(u.color);const x=u.emissive?1:.85+.15*((u.y-a)/o);for(const m of Hg){const p=u.x+m.dir[0],v=u.y+m.dir[1],w=u.z+m.dir[2];if(l(p,v,w))continue;const y=g.positions.length/3,E=[],T=[];m.dir[0]===0&&T.push([1,0,0]),m.dir[1]===0&&T.push([0,1,0]),m.dir[2]===0&&T.push([0,0,1]);const _=T[0],b=T[1];for(let L=0;L<4;L++){const C=m.corners[L],I=(u.x+C[0]-.5+t[0])*e,B=(u.y+C[1]-.5+t[1])*e,G=(u.z+C[2]-.5+t[2])*e;g.positions.push(I,B,G),g.normals.push(m.dir[0],m.dir[1],m.dir[2]),g.uvs.push(Rl[L][0],Rl[L][1]);let R=1;if(!u.emissive){const W=_[0]?C[0]?1:-1:_[1]?C[1]?1:-1:C[2]?1:-1,P=b[0]?C[0]?1:-1:b[1]?C[1]?1:-1:C[2]?1:-1,k=l(p+_[0]*W,v+_[1]*W,w+_[2]*W)?1:0,F=l(p+b[0]*P,v+b[1]*P,w+b[2]*P)?1:0,Y=l(p+_[0]*W+b[0]*P,v+_[1]*W+b[1]*P,w+_[2]*W+b[2]*P)?1:0;R=k&&F?.42:1-(k+F+Y)*.17}E.push(R);const z=u.emissive?1:R*x*m.shade;g.colors.push(h.r*z,h.g*z,h.b*z)}E[0]+E[2]>E[1]+E[3]?g.indices.push(y,y+1,y+2,y,y+2,y+3):g.indices.push(y+1,y+2,y+3,y+1,y+3,y)}}for(const[u,f]of c.entries()){if(f.indices.length===0)continue;const g=new Ct;g.setAttribute("position",new Ge(f.positions,3)),g.setAttribute("normal",new Ge(f.normals,3)),g.setAttribute("color",new Ge(f.colors,3)),g.setAttribute("uv",new Ge(f.uvs,2)),g.setIndex(f.indices),g.computeBoundingSphere();const x=new we(g,Lr(u));x.castShadow=u!=="emissive",x.receiveShadow=!0,i.add(x)}return i}class Kt{list=[];box(e,t,i,n,a,r,o,l){for(let c=e;c<=n;c++)for(let d=t;d<=a;d++)for(let h=i;h<=r;h++)this.list.push({x:c,y:d,z:h,color:o,emissive:l==="emissive",mat:l})}dot(e,t,i,n,a){this.list.push({x:e,y:t,z:i,color:n,emissive:a==="emissive",mat:a})}}function Vg(s,e){const t=e==="enemy";switch(s){case"holy_knight":return{armor:t?6583435:13161699,armorDark:4674921,trim:16096779,cloth:t?10033947:1920728,cape:t?8330525:1982639,leather:7877903,skin:15120540,accentGlow:3718648,armorMat:"steel"};case"dark_knight_boss":return{armor:3018853,armorDark:1973067,trim:14753096,cloth:1579035,cape:4982041,leather:2565930,skin:3223169,accentGlow:16007006,armorMat:"steel"};case"black_mage":return{armor:1981066,armorDark:1516884,trim:15381256,cloth:t?5774471:1920728,cape:1973067,leather:7877903,skin:592139,accentGlow:16707722,armorMat:"cloth"};case"archmage_boss":return{armor:223649,armorDark:805486,trim:8246268,cloth:481669,cape:12248829,leather:3359061,skin:988970,accentGlow:3718648,armorMat:"ice"};case"dragoon":case"dragoon_boss":return{armor:s==="dragoon_boss"?10105874:165063,armorDark:s==="dragoon_boss"?4396039:805486,trim:16096779,cloth:1976635,cape:s==="dragoon_boss"?14427686:12456508,leather:7421714,skin:15120540,accentGlow:s==="dragoon_boss"?16486972:3718648,armorMat:"steel"};case"sniper":return{armor:t?4153874:1409085,armorDark:1332013,trim:11817737,cloth:t?3560212:1467700,cape:t?4153874:1467700,leather:7877903,skin:15120540,accentGlow:10741301,armorMat:"leather"};case"white_mystic":return{armor:10399426,armorDark:8228515,trim:t?8266446:12131356,cloth:10399426,cape:9083824,leather:9584654,skin:15120540,accentGlow:16638023,armorMat:"cloth"};case"ninja":return{armor:1579035,armorDark:592139,trim:t?9647082:14427686,cloth:2565930,cape:t?8266446:14427686,leather:2565930,skin:15120540,accentGlow:12616956,armorMat:"cloth"};case"golem_enemy":return{armor:8246268,armorDark:3718648,trim:4674921,cloth:4674921,cape:3359061,leather:4674921,skin:6583435,accentGlow:3718648,armorMat:"ice"};case"skeleton_enemy":return{armor:13358561,armorDark:9741240,trim:4674921,cloth:1976635,cape:3359061,leather:3359061,skin:13751771,accentGlow:11032055,armorMat:"stone"};case"lich_boss":return{armor:3868516,armorDark:1973067,trim:10741301,cloth:5774471,cape:3018853,leather:1841431,skin:13358561,accentGlow:8702998,armorMat:"cloth"};default:return{armor:2696484,armorDark:1841431,trim:16096779,cloth:8330525,cape:10033947,leather:4524554,skin:8330525,accentGlow:16733440,armorMat:"stone"}}}function Wg(s,e,t=!1){const i=s==="belias_boss",n=i?.072:t?.054:.048,a=Vg(s,e),r=new Ke,o=new Ke;r.add(o);const l=i?1.05:.48,c=new we(new Li(l*2.15,l*2.15),zg());c.rotation.x=-Math.PI/2,c.position.y=.014,r.add(c);const d=e==="ally"?3718648:t?16096779:16007006,h=new we(new Jt(l*.84,l,32),new ut({color:d,side:gt,transparent:!0,opacity:.78,depthWrite:!1}));h.rotation.x=-Math.PI/2,h.position.y=.02,r.add(h);const u=new Ke;u.position.y=8.5*n,o.add(u);const f=P=>{const k=new Kt,F=P===-1?-1:0,Y=P===-1?1:2;s==="skeleton_enemy"?(k.box(0,-7,0,0,0,0,a.skin,"stone"),k.box(0,-8,0,0,-8,2,a.armorDark,"stone")):(k.box(F,-5,-1,Y,0,1,a.cloth,"cloth"),k.box(F,-6,-1,Y,-4,2,a.armorDark,a.armorMat),k.box(F,-8,-1,Y,-7,3,a.leather,"leather"),k.dot(P===-1?0:1,-4,2,a.trim,"gold"));const J=new Ke;return J.position.set(P*2.2*n,0,0),J.add(Pt(k.list,n)),J},g=f(-1),x=f(1);u.add(g,x);const m=new Ke;m.position.y=9*n,o.add(m);const p=new Kt;if(i)p.box(-6,0,-4,6,12,4,2696484,"stone"),p.box(-5,2,4,5,10,5,4524554,"stone"),p.box(-1,2,5,1,9,5,16733440,"emissive"),p.box(-4,5,5,-2,6,5,16739072,"emissive"),p.box(2,5,5,4,6,5,16739072,"emissive"),p.box(-10,8,-4,-6,13,4,1841431,"steel"),p.box(6,8,-4,10,13,4,1841431,"steel"),p.box(-9,13,-1,-8,16,1,16096779,"gold"),p.box(8,13,-1,9,16,1,16096779,"gold"),p.box(-11,6,-6,-7,17,-4,4524554,"stone"),p.box(7,6,-6,11,17,-4,4524554,"stone"),p.box(-12,12,-6,-10,19,-5,16733440,"emissive"),p.box(10,12,-6,12,19,-5,16733440,"emissive"),p.box(-6,0,-4,6,2,5,16096779,"gold");else if(s==="skeleton_enemy"){p.box(-3,0,-1,3,9,1,1976635,"cloth");for(let P=2;P<=8;P+=2)p.box(-4,P,-2,4,P,2,a.skin,"stone");p.box(-4,0,-2,4,1,2,a.armorDark,"steel")}else p.box(-4,0,-3,4,9,3,a.cloth,"cloth"),p.box(-4,2,-3,4,9,3,a.armor,a.armorMat),p.box(-4,0,-3,4,1,3,a.leather,"leather"),p.box(-1,0,3,1,1,4,a.trim,"gold"),p.box(-7,7,-3,-4,10,3,a.armor,a.armorMat),p.box(4,7,-3,7,10,3,a.armor,a.armorMat),p.box(-7,9,-2,-5,11,2,a.trim,"gold"),p.box(5,9,-2,7,11,2,a.trim,"gold"),s==="holy_knight"||s==="dark_knight_boss"?(p.box(-2,3,3,2,8,4,a.trim,"gold"),p.box(-1,4,4,1,7,4,a.cloth,"cloth"),p.dot(0,6,4,a.accentGlow,"emissive")):s==="dragoon"||s==="dragoon_boss"?(p.box(-8,10,-2,-6,13,1,a.trim,"gold"),p.box(6,10,-2,8,13,1,a.trim,"gold"),p.box(-2,3,3,2,8,3,a.armorDark,"steel"),p.dot(0,6,4,a.accentGlow,"emissive")):s==="sniper"?(p.box(-3,2,3,-2,4,3,a.leather,"leather"),p.box(-1,4,3,0,6,3,a.leather,"leather"),p.box(1,6,3,2,8,3,a.leather,"leather"),p.box(1,2,-5,3,8,-3,a.leather,"leather"),p.dot(1,9,-4,16708551,"cloth"),p.dot(3,9,-4,16708551,"cloth"),p.dot(2,10,-5,16007006,"cloth")):s==="white_mystic"?(p.box(-2,1,3,2,8,3,a.trim,"cloth"),p.box(-1,2,4,1,8,4,14251782,"gold")):s==="ninja"?(p.box(-3,2,-4,-2,8,-4,592139,"leather"),p.box(2,2,-4,3,8,-4,592139,"leather"),p.box(-2,3,3,2,7,3,a.trim,"cloth")):(s==="black_mage"||s==="archmage_boss")&&(p.box(-4,-3,-3,4,0,3,a.cloth,"cloth"),p.box(-4,-3,3,4,-2,3,a.trim,"gold"));m.add(Pt(p.list,n));const v=new Ke;v.position.set(0,9.2*n,-3.5*n),m.add(v);let w;if(s==="ninja"){const P=new Kt;P.box(-3,-1,0,3,1,1,a.cape,"cloth"),P.box(0,-7,-2,2,-1,0,a.cape,"cloth"),P.box(1,-13,-4,3,-7,-2,a.trim,"cloth"),w=new Ke,w.add(Pt(P.list,n)),v.add(w)}else if(s!=="golem_enemy"&&!i){const P=new Kt,k=s==="sniper"?-10:-13;P.box(-4,-5,-1,4,0,0,a.cape,"cloth"),P.box(-5,k+2,-2,5,-5,-1,a.cape,"cloth"),P.box(-5,k,-2,5,k+1,-1,a.trim,"gold"),v.add(Pt(P.list,n))}const y=new Ke;y.position.set(0,(i?13:10.5)*n,0),m.add(y);const E=new Kt;if(s==="black_mage"||s==="archmage_boss"){E.box(-3,0,-3,3,6,3,592139,"cloth"),E.box(-2,2,3,-1,3,4,a.accentGlow,"emissive"),E.box(1,2,3,2,3,4,a.accentGlow,"emissive");const P=s==="archmage_boss"?165063:11817737,k=s==="archmage_boss"?"ice":"cloth";E.box(-6,6,-6,6,6,6,P,k),E.box(-4,7,-4,4,8,4,1973067,"cloth"),E.box(-1,7,4,1,8,5,16096779,"gold"),E.box(-3,9,-3,3,11,3,P,k),E.box(-2,12,-4,2,14,1,P,k),E.box(-1,15,-6,1,16,-2,P,k)}else s==="holy_knight"||s==="dark_knight_boss"?(E.box(-3,0,-3,3,7,3,a.armor,"steel"),E.box(-2,3,3,2,4,3,988970,"steel"),E.box(0,1,3,0,5,3,988970,"steel"),s==="dark_knight_boss"?(E.dot(-1,3,4,16007006,"emissive"),E.dot(1,3,4,16007006,"emissive"),E.box(-5,6,-1,-4,11,1,a.trim,"gold"),E.box(4,6,-1,5,11,1,a.trim,"gold")):(E.box(-1,7,-3,1,9,2,a.trim,"gold"),E.box(0,9,-4,0,11,0,a.cloth,"cloth"),E.box(-4,5,-1,-4,9,1,14870768,"steel"),E.box(4,5,-1,4,9,1,14870768,"steel"))):s==="dragoon"||s==="dragoon_boss"?(E.box(-3,0,-3,3,7,3,a.armor,"steel"),E.box(-2,1,3,2,3,3,a.skin,"cloth"),E.box(-2,5,2,2,7,6,a.armor,"steel"),E.box(-4,7,-3,-3,11,1,a.trim,"gold"),E.box(3,7,-3,4,11,1,a.trim,"gold"),E.box(-5,11,-5,-4,13,-2,a.trim,"gold"),E.box(4,11,-5,5,13,-2,a.trim,"gold"),E.dot(0,6,6,a.accentGlow,"emissive")):s==="sniper"?(E.box(-3,0,-2,3,5,3,a.skin,"cloth"),E.box(-3,0,2,3,2,3,1332013,"cloth"),E.dot(-1,3,3,988970,"cloth"),E.dot(1,3,3,988970,"cloth"),E.box(-4,5,-4,4,8,4,a.armor,"cloth"),E.box(-4,0,-4,4,6,-1,a.armor,"cloth"),E.box(3,7,0,4,11,2,16707722,"cloth")):s==="white_mystic"?(E.box(-3,0,-2,3,5,3,a.skin,"cloth"),E.dot(-1,3,3,1976635,"cloth"),E.dot(1,3,3,1976635,"cloth"),E.box(-4,5,-4,4,8,4,a.cloth,"cloth"),E.box(-4,0,-4,4,6,-1,a.cloth,"cloth"),E.box(-3,6,4,3,7,4,a.trim,"cloth"),E.box(-1,8,3,1,9,4,a.trim,"cloth")):s==="ninja"?(E.box(-3,0,-3,3,6,3,1579035,"cloth"),E.box(-2,3,3,2,4,3,a.skin,"cloth"),E.dot(-1,3,4,592139,"cloth"),E.dot(1,3,4,592139,"cloth"),E.box(-4,5,-3,4,6,4,a.trim,"cloth"),E.box(-3,7,-3,3,8,2,592139,"cloth")):s==="belias_boss"?(E.box(-4,0,-4,4,8,4,8330525,"stone"),E.box(-2,4,4,-1,5,5,16707722,"emissive"),E.box(1,4,4,2,5,5,16707722,"emissive"),E.box(-7,6,0,-4,10,2,1841431,"stone"),E.box(-9,9,-3,-7,13,0,16733440,"emissive"),E.box(4,6,0,7,10,2,1841431,"stone"),E.box(7,9,-3,9,13,0,16733440,"emissive"),E.box(-3,8,-2,-2,13,0,1841431,"steel"),E.box(2,8,-2,3,13,0,1841431,"steel")):s==="lich_boss"?(E.box(-3,0,-3,3,6,3,13358561,"stone"),E.dot(-1,3,4,8702998,"emissive"),E.dot(1,3,4,8702998,"emissive"),E.box(-4,6,-4,4,9,4,5774471,"cloth"),E.dot(0,9,4,10741301,"emissive")):(E.box(-3,0,-3,3,6,3,a.armor,a.armorMat),E.dot(-1,3,4,a.accentGlow,"emissive"),E.dot(1,3,4,a.accentGlow,"emissive"));y.add(Pt(E.list,n));const T=new Ke;T.position.set((i?-9:-6.5)*n,(i?10:8.5)*n,0),m.add(T);const _=new Kt;_.box(-2,-6,-1,0,0,1,a.armor,a.armorMat),_.box(-2,-7,-1,0,-7,1,a.skin,"cloth"),i&&_.box(-2,-9,0,0,-8,2,16733440,"emissive"),T.add(Pt(_.list,n));const b=new Ke;b.position.set(-2.2*n,-5.5*n,2.2*n),T.add(b);let L;if(s==="holy_knight"||s==="dark_knight_boss"||s==="skeleton_enemy"){const P=new Kt;P.box(-2,-5,0,2,5,1,a.trim,"gold"),P.box(-3,-3,1,3,3,1,a.cloth,"cloth"),P.dot(0,0,2,a.accentGlow,"emissive"),b.add(Pt(P.list,n))}else if(s==="ninja"){const P=new Kt;P.box(0,-1,-2,0,0,1,a.leather,"leather"),P.box(-1,-1,-3,1,1,-2,a.trim,"gold"),P.box(0,0,-12,0,1,-3,14870768,"steel"),P.dot(0,1,-12,a.accentGlow,"emissive"),b.add(Pt(P.list,n))}else if(s==="white_mystic"||s==="lich_boss"){const P=new Kt;P.box(-3,-2,0,-1,2,1,s==="lich_boss"?3868516:10033947,"leather"),P.box(1,-2,0,3,2,1,s==="lich_boss"?3868516:10033947,"leather"),P.box(-2,-1,1,-1,2,2,14870768,"cloth"),P.box(1,-1,1,2,2,2,14870768,"cloth"),P.dot(0,1,2,a.accentGlow,"emissive"),L=new Ke,L.position.set(-4.5*n,4*n,4.5*n),L.add(Pt(P.list,n)),m.add(L)}const C=new Ke;C.position.set((i?9:6.5)*n,(i?10:8.5)*n,0),m.add(C);const I=new Kt;I.box(0,-6,-1,2,0,1,a.armor,a.armorMat),I.box(0,-7,-1,2,-7,1,a.skin,"cloth"),i&&I.box(0,-9,0,2,-8,2,16733440,"emissive"),C.add(Pt(I.list,n));const B=new Ke;B.position.set(1*n,-6.5*n,2*n),C.add(B);let G;const R=new Kt;if(s==="holy_knight"||s==="dark_knight_boss"||s==="skeleton_enemy")R.box(0,-3,0,0,0,1,a.leather,"leather"),R.box(-3,1,0,3,2,1,a.trim,"gold"),R.box(0,2,0,0,16,1,14870768,"steel"),R.box(0,5,1,0,13,1,a.accentGlow,"emissive");else if(s==="black_mage"||s==="white_mystic"||s==="archmage_boss"||s==="lich_boss")R.box(0,-6,0,0,15,0,5722958,"leather"),R.box(-2,15,-2,2,16,2,a.trim,"gold"),s==="white_mystic"?(R.box(-2,17,0,-2,20,0,a.trim,"gold"),R.box(2,17,0,2,20,0,a.trim,"gold"),R.box(-1,21,0,1,21,0,a.trim,"gold"),R.dot(0,19,0,a.accentGlow,"emissive")):R.box(-1,18,-1,1,20,1,a.accentGlow,"emissive");else if(s==="dragoon"||s==="dragoon_boss")R.box(0,-9,0,0,18,0,7877903,"leather"),R.box(-1,17,-1,1,18,1,14427686,"cloth"),R.box(-2,19,0,2,22,0,a.trim,"gold"),R.box(-1,21,0,1,27,0,14870768,"steel"),R.dot(0,28,0,a.accentGlow,"emissive");else if(s==="sniper"){R.box(0,-1,2,0,8,3,7877903,"leather"),R.box(0,8,0,0,12,2,9584654,"leather"),R.box(0,-6,0,0,-1,2,9584654,"leather"),R.dot(0,12,-1,16096779,"gold"),R.dot(0,-6,-1,16096779,"gold");const P=new Kt;P.box(0,-5,-1,0,11,-1,14870768,"cloth"),P.box(0,3,-1,0,3,8,10741301,"emissive"),G=new Ke,G.add(Pt(P.list,n)),B.add(G)}else s==="ninja"?(R.box(0,-1,0,0,1,1,a.leather,"leather"),R.box(-1,1,0,1,2,1,a.trim,"gold"),R.box(0,2,0,0,13,1,14870768,"steel"),R.dot(0,14,1,a.accentGlow,"emissive")):s==="belias_boss"&&(R.box(-1,-4,0,1,1,1,1841431,"leather"),R.box(-4,1,-1,4,3,1,16096779,"gold"),R.box(-1,3,0,1,20,1,1841431,"steel"),R.box(0,4,1,0,19,1,16733440,"emissive"));B.add(Pt(R.list,n));let z;if(s==="black_mage"||s==="archmage_boss"||i){z=new Ke,z.position.y=(i?26:15)*n;const P=i?5:3,k=i?.95:.52,F=i?16733440:s==="archmage_boss"?3718648:16436245;for(let Y=0;Y<P;Y++){const J=Y/P*Math.PI*2,te=new Kt;te.box(0,0,0,1,1,1,F,"emissive");const be=Pt(te.list,n*.85);be.position.set(Math.cos(J)*k,0,Math.sin(J)*k),z.add(be)}o.add(z)}const W=(i?38:29)*n;return{root:r,bodyPivot:o,headPivot:y,torsoPivot:m,leftArmPivot:T,rightArmPivot:C,weaponPivot:B,shieldPivot:b,capePivot:v,legsPivot:u,leftLegPivot:g,rightLegPivot:x,grimoirePivot:L,orbitingRunesPivot:z,bowStringPivot:G,scarfPivot:w,shadowDisc:c,teamRing:h,materials:[],heightWorld:W,voxelSize:n}}function Xg(s,e,t,i=0){if(s.bodyPivot.position.set(0,0,0),s.bodyPivot.rotation.set(0,0,0),s.bodyPivot.scale.set(1,1,1),s.torsoPivot.rotation.set(0,0,0),s.headPivot.rotation.set(0,0,0),s.leftArmPivot.rotation.set(0,0,0),s.rightArmPivot.rotation.set(0,0,0),s.weaponPivot.rotation.set(.32,0,0),s.shieldPivot.rotation.set(0,0,0),s.leftLegPivot.rotation.set(0,0,0),s.rightLegPivot.rotation.set(0,0,0),s.capePivot.rotation.x=.16+Math.sin(t*3-.6)*.09,s.scarfPivot&&(s.scarfPivot.rotation.y=Math.sin(t*4.2-.6)*.18),s.grimoirePivot&&(s.grimoirePivot.position.y=4*s.voxelSize+Math.sin(t*3.6)*.06,s.grimoirePivot.rotation.z=Math.sin(t*5)*.14),s.orbitingRunesPivot&&(s.orbitingRunesPivot.rotation.y=t*1.8,s.orbitingRunesPivot.position.y+=Math.sin(t*2.5)*.04),s.bowStringPivot&&(s.bowStringPivot.position.z=0),e==="dead"){s.bodyPivot.rotation.x=-Math.PI/2,s.bodyPivot.position.y=.16,s.teamRing.visible=!1;return}switch(s.teamRing.visible=!0,e){case"idle":{const n=Math.sin(t*3.2)*.022;s.torsoPivot.position.y=9*s.voxelSize+n,s.rightArmPivot.rotation.x=-.22+Math.sin(t*2.1)*.06,s.leftArmPivot.rotation.x=-.14-Math.sin(t*2.1)*.06;break}case"walk":{const n=Math.sin(t*13)*.72;s.leftLegPivot.rotation.x=n,s.rightLegPivot.rotation.x=-n,s.leftArmPivot.rotation.x=-n*.75,s.rightArmPivot.rotation.x=n*.75,s.torsoPivot.rotation.x=.12,s.bodyPivot.position.y=Math.abs(Math.sin(t*13))*.095,s.capePivot.rotation.x=.48+Math.sin(t*13-.6)*.18;break}case"slash":{const n=Math.min(1,i);if(n<.28){const a=n/.28;s.torsoPivot.rotation.y=.45*a,s.rightArmPivot.rotation.x=-1.65*a}else if(n<.6){const a=(n-.28)/.32;s.torsoPivot.rotation.y=.45-1.15*a,s.rightArmPivot.rotation.x=-1.65+2.85*a,s.weaponPivot.rotation.x=.95}else{const a=(n-.6)/.4;s.torsoPivot.rotation.y=-.7*(1-a),s.rightArmPivot.rotation.x=1.2*(1-a)}break}case"dual":{const n=Math.min(1,i),a=Math.sin(n*Math.PI*2)*1.45;s.rightArmPivot.rotation.x=-.75+a,s.leftArmPivot.rotation.x=-.75-a,s.torsoPivot.rotation.y=Math.sin(n*Math.PI*2)*.55;break}case"bow":{const n=Math.min(1,i),a=n<.6?n/.6:1-(n-.6)/.4;s.torsoPivot.rotation.y=-.42,s.rightArmPivot.rotation.x=-1.45,s.leftArmPivot.rotation.x=-1.3,s.leftArmPivot.rotation.y=.38,s.bowStringPivot&&(s.bowStringPivot.position.z=-a*2.5*s.voxelSize);break}case"cast":{const n=Math.sin(t*11)*.16;s.rightArmPivot.rotation.x=-2.2+n,s.leftArmPivot.rotation.x=-1.8-n,s.bodyPivot.position.y=.1+Math.sin(t*7)*.04,s.capePivot.rotation.x=.62;break}case"jump_up":{s.torsoPivot.rotation.x=.28,s.rightArmPivot.rotation.x=-2.5,s.bodyPivot.scale.set(.88,1.15,.88);break}case"jump_down":{s.torsoPivot.rotation.x=-.35,s.rightArmPivot.rotation.x=.75,s.weaponPivot.rotation.x=1.45,s.bodyPivot.scale.set(1.12,.88,1.12);break}case"hit":{s.torsoPivot.rotation.x=-.48,s.headPivot.rotation.x=-.32,s.bodyPivot.position.z=-.14;break}case"block":{s.leftArmPivot.rotation.x=-1.15,s.leftArmPivot.rotation.y=.55,s.shieldPivot.rotation.y=-.5;break}}}const Ie=1.5,mi=.42;function Tt(s,e,t,i,n){const a=(s-(i-1)/2)*Ie,r=(e-(n-1)/2)*Ie,o=t*mi;return new N(a,o,r)}function qg(s,e){switch(s){case"grass":return{topA:4153874,topB:5078031,side:7029795,deep:3880242};case"cobble":return e==="arctic"?{topA:6583435,topB:8689325,side:3359061,deep:1976635}:e==="canyon"?{topA:9198140,topB:10576452,side:7028262,deep:4401176}:{topA:5722958,topB:7038561,side:4472892,deep:2696484};case"stone":return e==="volcanic"?{topA:3617842,topB:4472892,side:2696484,deep:1841431}:e==="canyon"?{topA:10112562,topB:11820092,side:8141347,deep:4528643}:{topA:4674921,topB:6583435,side:3359061,deep:1976635};case"wood":return{topA:8736014,topB:10576391,side:7421714,deep:4528643};case"snow":return{topA:9741240,topB:12109012,side:4674921,deep:3359061};case"ice":return{topA:3718648,topB:8246268,side:165063,deep:805486};case"swamp":return{topA:3560212,topB:4153874,side:3876884,deep:1841431};case"obsidian":return{topA:2236968,topB:3421245,side:1579035,deep:592139};case"carpet":return{topA:8917815,topB:10424889,side:5244708,deep:2696484};case"metal":return{topA:6583435,topB:9741240,side:3359061,deep:1976635};case"water":return{topA:165063,topB:959977,side:481669,deep:805486};case"lava":return{topA:14427686,topB:16347926,side:4524554,deep:1841431}}}function Ll(s,e){const t=Math.sin(s*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Ha(s){const e=s==="lava"?1:s==="swamp_water"?2:s==="canyon_river"?3:0;return new Wt({uniforms:{uTime:{value:0},uMode:{value:e}},vertexShader:`
      precision highp float;
      uniform float uTime;
      uniform float uMode;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vWave;

      void main() {
        vUv = uv;
        vec3 pos = position;
        vec4 wp = modelMatrix * vec4(pos, 1.0);
        float speed = uMode == 1.0 ? 1.5 : (uMode == 3.0 ? 4.2 : 2.6);
        float amp = uMode == 1.0 ? 0.045 : 0.06;
        float flow = uMode == 3.0 ? wp.z * 2.8 - uTime * speed : wp.x * 2.2 + uTime * speed;
        float wave = sin(flow) * cos(wp.z * 2.1 - uTime * speed * 0.7) * amp;
        pos.y += wave;
        vWave = wave;
        vec4 finalWp = modelMatrix * vec4(pos, 1.0);
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
        float edgeFoam = 1.0 - smoothstep(0.02, 0.16, edgeDist);

        if (uMode == 1.0) {
          float n1 = sin(vWorldPos.x * 3.1 + uTime * 1.2) * cos(vWorldPos.z * 2.7 - uTime * 0.9);
          float n2 = sin((vWorldPos.x + vWorldPos.z) * 4.5 - uTime * 1.6);
          float magma = clamp(0.5 + 0.35 * n1 + 0.25 * n2 + vWave * 4.0, 0.0, 1.0);
          vec3 crust = vec3(0.18, 0.04, 0.03);
          vec3 orange = vec3(1.15, 0.34, 0.04);
          vec3 bright = vec3(1.90, 1.05, 0.22);
          vec3 col = mix(crust, orange, smoothstep(0.25, 0.68, magma));
          col = mix(col, bright, smoothstep(0.68, 0.96, magma));
          col += vec3(0.95, 0.45, 0.1) * edgeFoam * 0.65;
          gl_FragColor = vec4(col, 1.0);
        } else if (uMode == 2.0) {
          float murk = sin(vWorldPos.x * 2.8 + uTime * 1.4) * cos(vWorldPos.z * 3.2 - uTime * 1.1);
          vec3 deepSwamp = vec3(0.08, 0.20, 0.12);
          vec3 toxic = vec3(0.24, 0.45, 0.16);
          vec3 ether = vec3(0.45, 0.22, 0.62);
          vec3 col = mix(deepSwamp, toxic, 0.5 + 0.5 * murk);
          col = mix(col, ether, smoothstep(0.6, 0.95, sin(vWorldPos.x * 1.9 - uTime * 0.8)) * 0.45);
          col += vec3(0.45, 0.78, 0.35) * edgeFoam * 0.4;
          gl_FragColor = vec4(col, 0.92);
        } else {
          float flow = uMode == 3.0 ? (vWorldPos.z * 3.8 - uTime * 4.5) : (vWorldPos.x * 4.0 + uTime * 2.3);
          float ripple = sin(flow) * cos(vWorldPos.x * 3.2 - uTime * 2.0);
          float spec = smoothstep(0.48, 0.94, ripple + vWave * 8.0);
          vec3 deepWater = vec3(0.03, 0.24, 0.44);
          vec3 shallowWater = uMode == 3.0 ? vec3(0.12, 0.58, 0.84) : vec3(0.07, 0.48, 0.72);
          vec3 col = mix(deepWater, shallowWater, 0.5 + 0.5 * ripple);
          col += vec3(0.65, 0.92, 1.0) * spec * (uMode == 3.0 ? 0.52 : 0.32);
          col = mix(col, vec3(0.86, 0.96, 1.0), edgeFoam * (uMode == 3.0 ? 0.82 : 0.62));
          gl_FragColor = vec4(col, 0.88);
        }
      }
    `,transparent:e!==1})}function $g(s,e){const t=[],i=(n,a,r,o,l,c,d,h)=>{for(let u=n;u<=o;u++)for(let f=a;f<=l;f++)for(let g=r;g<=c;g++)t.push({x:u,y:f,z:g,color:d,emissive:h==="emissive",mat:h})};switch(s){case"tree":{e==="swamp"?(i(-2,0,-2,2,1,2,3878703,"leather"),i(-1,2,-1,1,7,1,4472892,"leather"),i(-4,7,-1,-1,9,1,4472892,"leather"),i(1,8,-2,4,10,1,4472892,"leather"),i(-4,5,0,-4,6,0,5078031,"cloth"),i(4,6,0,4,7,0,5078031,"cloth")):(i(-3,0,-1,3,1,1,6044193,"leather"),i(-1,0,-3,1,1,3,6044193,"leather"),i(-1,2,-1,1,7,1,7877903,"leather"),i(-5,7,-5,5,10,5,1467700,"cloth"),i(-4,11,-4,4,13,4,1409085,"cloth"),i(-2,14,-2,2,16,2,2278750,"cloth"));break}case"pine":{i(-1,0,-1,1,4,1,6044193,"leather"),i(-5,4,-5,5,6,5,1332013,"cloth"),i(-4,7,-4,4,9,4,1467700,"cloth"),i(-3,10,-3,3,12,3,1409085,"cloth"),i(-2,13,-2,2,14,2,12109012,"cloth"),i(-1,15,-1,1,16,1,13358561,"cloth");break}case"pillar":{const n=e==="volcanic"?2565930:5722958,a=e==="volcanic"?16096779:7893356,r=e==="volcanic"?"gold":"stone";i(-2,0,-2,2,2,2,n,"stone"),i(-1,3,-1,1,13,1,n,"stone"),i(-2,14,-2,2,15,2,a,r),e==="forest"&&i(-2,4,2,-1,6,2,5078031,"cloth");break}case"ruin_wall":{e==="forest"?(i(-5,0,-2,-3,11,2,5722958,"stone"),i(3,0,-2,5,8,2,5722958,"stone"),i(-4,11,-2,2,13,2,7038561,"stone"),i(-4,4,2,-2,7,2,5078031,"cloth")):e==="arctic"?(i(-5,0,-2,5,9,2,6583435,"stone"),i(-5,10,-2,-3,12,2,9741240,"stone"),i(-1,10,-2,1,12,2,9741240,"stone"),i(3,10,-2,5,12,2,9741240,"stone"),i(-5,13,-2,-3,13,2,12109012,"cloth")):(i(-5,0,-2,5,8,2,4472892,"stone"),i(-5,9,-2,-2,11,2,5722958,"stone"),i(2,9,-2,5,11,2,5722958,"stone"));break}case"torch":case"brazier":{const n=e==="swamp"?3718648:16347926,a=e==="swamp"?10875900:16707722;i(-2,0,-2,2,2,2,2696484,"steel"),i(-1,3,-1,1,7,1,4144966,"steel"),i(-2,7,-2,2,8,2,7877903,"gold"),i(-1,9,-1,1,11,1,n,"emissive"),i(0,12,0,0,14,0,a,"emissive");break}case"crystal":{const n=e==="volcanic"?16007006:e==="swamp"?11032055:3718648,a=e==="arctic";i(-2,0,-2,2,2,2,3359061,"stone"),i(-2,3,-1,0,9,1,n,a?"ice":"emissive"),i(0,3,-2,2,13,1,n,a?"ice":"emissive"),i(0,14,-1,1,16,0,14742270,"emissive");break}case"statue":{i(-2,0,-2,2,2,2,4674921,"stone"),i(-2,3,-1,2,9,1,6583435,"stone"),i(-1,10,-1,1,13,1,9741240,"stone"),i(-3,5,1,3,7,2,4674921,"stone");break}case"rock":{const n=e==="canyon"?10112562:5722958,a=e==="canyon"?11820092:7893356;i(-3,0,-3,3,2,3,n,"stone"),i(-2,3,-2,2,4,2,a,"stone");break}case"banner":{i(0,0,0,0,16,0,9741240,"steel"),i(-3,14,0,3,14,0,16096779,"gold"),i(-2,7,1,2,13,1,e==="volcanic"?10033947:1920728,"cloth"),i(-1,9,2,1,11,2,16498468,"emissive");break}}return t}function Il(s){const e=[];for(let n=-3;n<=3;n++)for(let a=0;a<=3;a++)for(let r=-2;r<=2;r++){const o=n===-3||n===3||a===3&&r===2;e.push({x:n,y:a,z:r,color:o?16096779:7877903,mat:o?"gold":"leather"})}if(!s){for(let n=-3;n<=3;n++)for(let a=4;a<=5;a++)for(let r=-2;r<=2;r++){const o=n===-3||n===3||a===4&&r===2;e.push({x:n,y:a,z:r,color:o?16096779:9584654,mat:o?"gold":"leather"})}e.push({x:0,y:3,z:3,color:16707722,emissive:!0,mat:"emissive"})}return Pt(e,.085)}class Yg{group=new Ke;tileHitMeshes=[];chestMeshes=new Map;liquidMaterials=[];floatingCrystals=[];ambientMesh=null;ambientMotes=[];maxAmbient=140;densityRatio=1;dummy=new ht;stage;constructor(e,t){this.stage=e,this.buildDioramaGeometry(e,t),this.buildBiomeArchitecture(e),this.buildAmbientParticles(e)}buildDioramaGeometry(e,t){const i=[],n=[],a=[],r=[],o=[],l=[],c=[],d=[],h=[],u=[],f=new Re,g=new Lt(1,1,1),x=g.attributes.position,m=g.attributes.normal,p=g.attributes.uv,v=g.index,w=(k,F,Y,J,te,be,q,ne=1,fe=!1)=>{const Ee=fe?l:i,pe=fe?c:n,Ue=fe?d:a,ct=fe?h:r,Pe=fe?u:o,Ze=Ee.length/3;f.setHex(q);for(let Oe=0;Oe<x.count;Oe++){const Ve=x.getX(Oe)*J+k,_t=x.getY(Oe)*te+F,dt=x.getZ(Oe)*be+Y,St=m.getY(Oe);Ee.push(Ve,_t,dt),pe.push(m.getX(Oe),St,m.getZ(Oe)),ct.push(p.getX(Oe),p.getY(Oe));const it=St>.5?ne:St<-.5?.52:.8;Ue.push(f.r*it,f.g*it,f.b*it)}for(let Oe=0;Oe<v.count;Oe++)Pe.push(Ze+v.getX(Oe))},y=new Lt(Ie*.96,.14,Ie*.96),E=new ut({visible:!1}),T=[],_=[],b=-1.6,L=e.cols*Ie,C=e.rows*Ie,I=e.biome==="volcanic"?1579035:e.biome==="canyon"?4528643:2696484,B=e.biome==="arctic"?3359061:e.biome==="canyon"?8141347:4472892;w(0,-.55,0,L+.45,.9,C+.45,B),w(0,-1.25,0,L-.5,.7,C-.5,I);for(let k=0;k<e.cols;k+=2)for(let F=0;F<e.rows;F+=2){const Y=Ll(k,F);if(Y>.32){const J=Tt(k,F,0,e.cols,e.rows),te=.65+Y*1.75;w(J.x,b-te*.5,J.z,Ie*.92,te,Ie*.92,I)}}const G=[];for(const k of t.values()){const F=Tt(k.col,k.row,k.height,e.cols,e.rows),Y=qg(k.surface,e.biome),J=Ll(k.col,k.row),te=J>.5?Y.topA:Y.topB;if(k.surface==="water")T.push(k),w(F.x,(k.height-1)*mi*.5-.1,F.z,Ie*.99,k.height*mi,Ie*.99,Y.deep);else if(k.surface==="lava")_.push(k),w(F.x,-.2,F.z,Ie*.99,.35,Ie*.99,1841431);else if(k.isBridge){const q=F.y-.14;w(F.x,q,F.z,Ie*.98,.28,Ie*.98,te,1.04),(k.col+k.row)%2===0&&w(F.x,q*.5,F.z,.34,q,.34,Y.deep),e.biome==="canyon"&&(w(F.x-Ie*.42,F.y+.35,F.z-Ie*.42,.14,.7,.14,5722958),w(F.x+Ie*.42,F.y+.35,F.z+Ie*.42,.14,.7,.14,5722958))}else if(k.isStair){const q=k.height*mi,ne=Math.max(.2,q-mi);w(F.x,ne*.5,F.z,Ie*.96,ne,Ie*.96,Y.side);for(let fe=0;fe<3;fe++){const Ee=ne+(fe+.5)/3*mi,pe=Ie*(.94-fe*.24);w(F.x,Ee,F.z,pe,mi/3,pe,te,1+fe*.03)}}else{const q=k.height*mi,ne=.22,fe=Math.max(.1,q-ne),Ee=k.surface==="ice";w(F.x,fe*.5,F.z,Ie*.95,fe,Ie*.95,Y.side,1,Ee),w(F.x,q-ne*.5,F.z,Ie*.98,ne,Ie*.98,te,1.04,Ee),k.surface==="grass"&&!k.prop&&J>.78&&G.push(F.clone())}const be=new we(y,E);if(be.position.set(F.x,F.y+.02,F.z),be.userData={col:k.col,row:k.row,height:k.height},this.group.add(be),this.tileHitMeshes.push(be),k.prop){const q=$g(k.prop,e.biome),ne=Pt(q,.082);ne.position.set(F.x,F.y+.03,F.z),this.group.add(ne),k.prop==="crystal"&&this.floatingCrystals.push(ne)}if(k.chest){const q=Il(k.chest.opened);q.position.set(F.x,F.y+.03,F.z),this.group.add(q),this.chestMeshes.set(k.chest.id,q)}}const R=new Ct;R.setAttribute("position",new Ge(i,3)),R.setAttribute("normal",new Ge(n,3)),R.setAttribute("color",new Ge(a,3)),R.setAttribute("uv",new Ge(r,2)),R.setIndex(o),R.computeBoundingSphere();const z=new we(R,Lr("stone"));if(z.castShadow=!0,z.receiveShadow=!0,this.group.add(z),u.length>0){const k=new Ct;k.setAttribute("position",new Ge(l,3)),k.setAttribute("normal",new Ge(c,3)),k.setAttribute("color",new Ge(d,3)),k.setAttribute("uv",new Ge(h,2)),k.setIndex(u),k.computeBoundingSphere();const F=new we(k,Lr("ice"));F.receiveShadow=!0,this.group.add(F)}if(G.length>0){const k=new Lt(.11,.14,.11),F=new ot({color:16777215,roughness:.7}),Y=new ea(k,F,G.length),J=[16707722,16020150,3718648,16486972],te=new ht,be=new Re;G.forEach((q,ne)=>{te.position.set(q.x+(ne%2===0?.34:-.34),q.y+.06,q.z+(ne%3===0?.25:-.28)),te.updateMatrix(),Y.setMatrixAt(ne,te.matrix),be.setHex(J[ne%J.length]),Y.setColorAt(ne,be)}),this.group.add(Y)}const W=(k,F)=>{if(k.length===0)return;const Y=Ha(F);this.liquidMaterials.push(Y);const J=new Li(Ie*.99,Ie*.99,4,4);J.rotateX(-Math.PI/2);for(const te of k){const be=Tt(te.col,te.row,te.height,e.cols,e.rows),q=new we(J,Y);q.position.set(be.x,be.y-.11,be.z),this.group.add(q)}},P=e.biome==="canyon"?"canyon_river":e.biome==="swamp"?"swamp_water":"water";W(T,P),W(_,"lava"),g.dispose()}buildBiomeArchitecture(e){if(e.biome==="forest"){const t=Tt(0,6,1,e.cols,e.rows),i=new we(new Li(Ie*.92,2.2),Ha("canyon_river"));this.liquidMaterials.push(i.material),i.position.set(t.x-Ie*.51,t.y-1.1,t.z),i.rotation.y=-Math.PI/2,this.group.add(i)}else if(e.biome==="canyon")for(const t of[0,e.rows-1])for(const i of[5,6,7]){const n=Tt(i,t,1,e.cols,e.rows),a=new we(new Li(Ie*.96,2.5),Ha("canyon_river"));this.liquidMaterials.push(a.material),a.position.set(n.x,n.y-1.25,n.z+(t===0?-Ie*.51:Ie*.51)),t===0&&(a.rotation.y=Math.PI),this.group.add(a)}else if(e.biome==="arctic"){const t=Tt(6,3,4,e.cols,e.rows),i=[];for(let a=-5;a<=5;a++)if(i.push({x:a,y:12,z:0,color:3359061,mat:"steel"}),a%2===0)for(let r=7;r<=11;r++)i.push({x:a,y:r,z:0,color:1976635,mat:"steel"});for(let a=0;a<=12;a++)i.push({x:-6,y:a,z:0,color:4674921,mat:"stone"}),i.push({x:6,y:a,z:0,color:4674921,mat:"stone"});const n=Pt(i,.11);n.position.copy(t),this.group.add(n)}else if(e.biome==="volcanic"){const t=Tt(6,0,6,e.cols,e.rows),i=[];for(let a=0;a<=24;a++)i.push({x:-10,y:a,z:-4,color:1579035,mat:"stone"}),i.push({x:-9,y:a,z:-4,color:16096779,mat:"gold"}),i.push({x:18,y:a,z:-4,color:1579035,mat:"stone"}),i.push({x:17,y:a,z:-4,color:16096779,mat:"gold"});for(let a=-10;a<=18;a++)i.push({x:a,y:24,z:-4,color:1579035,mat:"stone"}),i.push({x:a,y:23,z:-4,color:16096779,mat:"gold"});for(let a=-5;a<=13;a+=3)for(let r=8;r<=20;r+=2)i.push({x:a,y:r,z:-4,color:(a+r)%2===0?16007006:16347926,emissive:!0,mat:"emissive"});const n=Pt(i,.11);n.position.copy(t),this.group.add(n)}}buildAmbientParticles(e){const t=new Lt(.08,.08,.08),i=new ut({color:16777215,transparent:!0,opacity:.85});this.ambientMesh=new ea(t,i,this.maxAmbient),this.ambientMesh.instanceMatrix.setUsage(Zl),this.ambientMesh.frustumCulled=!1;const a={forest:[16638023,8843180,16498468],canyon:[14742270,12248829,16777215],arctic:[16777215,14742270,12248829],swamp:[10741301,12616956,3718648],volcanic:[16733440,16707722,7434618]}[e.biome],r=new Re,o=e.cols*Ie,l=e.rows*Ie;for(let c=0;c<this.maxAmbient;c++){const d=(Math.random()-.5)*o*1.15,h=(Math.random()-.5)*l*1.15,u=.6+Math.random()*6.5;let f;e.biome==="arctic"?f=new N(1.6+Math.random(),-1.8-Math.random(),.9):e.biome==="volcanic"||e.biome==="canyon"?f=new N((Math.random()-.5)*.6,.8+Math.random()*1.1,(Math.random()-.5)*.6):e.biome==="forest"?f=new N(.45+Math.random()*.3,-.45-Math.random()*.3,.3):f=new N((Math.random()-.5)*.5,Math.sin(c)*.25,(Math.random()-.5)*.5),this.ambientMotes.push({pos:new N(d,u,h),vel:f,phase:Math.random()*Math.PI*2,scale:.65+Math.random()*.85}),r.setHex(a[c%a.length]),this.ambientMesh.setColorAt(c,r)}this.group.add(this.ambientMesh)}setParticleDensity(e){this.densityRatio=Math.max(0,Math.min(1,e))}markChestOpened(e){const t=this.chestMeshes.get(e);if(!t)return;const i=t.position.clone();this.group.remove(t);const n=Il(!0);n.position.copy(i),this.group.add(n),this.chestMeshes.set(e,n)}update(e,t=.016){for(const i of this.liquidMaterials)i.uniforms.uTime.value=e;for(let i=0;i<this.floatingCrystals.length;i++)this.floatingCrystals[i].rotation.y=e*.65+i;if(this.ambientMesh){const i=Math.floor(this.maxAmbient*this.densityRatio),n=this.stage.cols*Ie*.6,a=this.stage.rows*Ie*.6;for(let r=0;r<this.maxAmbient;r++){if(r>=i){this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.ambientMesh.setMatrixAt(r,this.dummy.matrix);continue}const o=this.ambientMotes[r];o.pos.addScaledVector(o.vel,t),o.pos.x+=Math.sin(e*1.8+o.phase)*.008,o.pos.y<.2&&(o.pos.y=7.2),o.pos.y>7.5&&(o.pos.y=.4),o.pos.x>n&&(o.pos.x=-n),o.pos.x<-n&&(o.pos.x=n),o.pos.z>a&&(o.pos.z=-a),o.pos.z<-a&&(o.pos.z=a),this.dummy.position.copy(o.pos),this.dummy.rotation.set(e+o.phase,e*.8,o.phase),this.dummy.scale.setScalar(o.scale),this.dummy.updateMatrix(),this.ambientMesh.setMatrixAt(r,this.dummy.matrix)}this.ambientMesh.instanceMatrix.needsUpdate=!0}}dispose(){this.group.traverse(e=>{e.isMesh&&e.geometry?.dispose()});for(const e of this.liquidMaterials)e.dispose()}}class Kg{group=new Ke;particleMesh;particles=[];maxParticles=200;dummy=new ht;transientEffects=[];getFloorHeight;triggerLight;triggerEnvPulse;constructor(e,t,i){this.getFloorHeight=e,this.triggerLight=t,this.triggerEnvPulse=i;const n=new Lt(.1,.1,.1),a=new ot({color:16777215,roughness:.35,metalness:.15,emissive:2236962,emissiveIntensity:.4});this.particleMesh=new ea(n,a,this.maxParticles),this.particleMesh.instanceMatrix.setUsage(Zl),this.particleMesh.frustumCulled=!1;const r=new tt().makeScale(0,0,0);for(let o=0;o<this.maxParticles;o++)this.particles.push({active:!1,pos:new N,vel:new N,rot:new xi,rotVel:new N,scale:1,life:0,maxLife:1,color:new Re(16777215)}),this.particleMesh.setMatrixAt(o,r),this.particleMesh.setColorAt(o,new Re(16777215));this.group.add(this.particleMesh)}spawnVoxelBurst(e,t,i,n=4.5,a=4.5,r=1){let o=0;for(let l=0;l<this.maxParticles&&o<t;l++){const c=this.particles[l];if(c.active)continue;c.active=!0,c.pos.copy(e).add(new N((Math.random()-.5)*.45,Math.random()*.45+.15,(Math.random()-.5)*.45));const d=Math.random()*Math.PI*2,h=(.35+Math.random()*.9)*n;c.vel.set(Math.cos(d)*h,a*(.55+Math.random()*.8),Math.sin(d)*h),c.rot.set(Math.random()*3,Math.random()*3,Math.random()*3),c.rotVel.set((Math.random()-.5)*14,(Math.random()-.5)*14,(Math.random()-.5)*14),c.scale=r*(.65+Math.random()*.75),c.life=0,c.maxLife=.75+Math.random()*.65,c.color.setHex(i[Math.floor(Math.random()*i.length)]),this.particleMesh.setColorAt(l,c.color),o++}this.particleMesh.instanceColor&&(this.particleMesh.instanceColor.needsUpdate=!0)}addTransient(e,t,i){this.group.add(e),this.transientEffects.push({mesh:e,life:0,maxLife:t,update:i})}spawnCasterMagicCircle(e,t){const i=new Ke,n=new ut({color:t,side:gt,transparent:!0,opacity:.92,depthWrite:!1}),a=new we(new Jt(.68,.82,24),n);a.rotation.x=-Math.PI/2;const r=new we(new Jt(.32,.42,6),n);r.rotation.x=-Math.PI/2,i.add(a,r),i.position.set(e.x,e.y+.06,e.z),this.addTransient(i,.65,o=>{i.rotation.y+=.12;const l=o<.2?.4+o/.2*.7:1.1;i.scale.setScalar(l),n.opacity=o>.6?.92*(1-(o-.6)/.4):.92})}spawnSwordSlashRibbon(e,t,i,n=!1){const a=(r,o)=>{const l=new ot({color:16777215,emissive:i,emissiveIntensity:2.8,side:gt,transparent:!0,opacity:.96,depthWrite:!1}),c=new we(new Jt(.55,.96,20,1,0,Math.PI*1.05),l);c.position.set(e.x,e.y+.85,e.z),c.rotation.set(o,t,r),this.addTransient(c,.3,d=>{c.rotation.z+=.18,c.scale.setScalar(.85+d*.55),l.opacity=Math.max(0,.96*(1-d))})};n?(a(.75,.5),a(-.75,-.5)):a(.35,1.15)}spawnSkyDiveWindRings(e){const t=new ut({color:12248829,side:gt,transparent:!0,opacity:.85,depthWrite:!1}),i=new we(new Jt(.25,.55,20),t);i.rotation.x=-Math.PI/2,i.position.set(e.x,e.y+.08,e.z),this.addTransient(i,.35,n=>{i.scale.setScalar(1+n*2.2),t.opacity=.85*(1-n)})}playSkillVFX(e,t,i,n,a=0){if(e.isMagic||e.isHeal||e.isBuff||e.vfxType==="judgment_blade"){const r=e.element==="fire"?16347926:e.element==="ice"?3718648:e.element==="lightning"?16436245:e.isHeal?4906624:16638023;this.spawnCasterMagicCircle(t,r)}switch(e.vfxType){case"judgment_blade":{this.triggerLight(i.clone().add(new N(0,1.8,0)),3718648,12,.8);for(let r=0;r<n.length;r++){const o=n[r],l=new Ke,c=new ot({color:14742270,emissive:r%2===0?3718648:16638023,emissiveIntensity:2.7,transparent:!0,opacity:.94}),d=new we(new Lt(.22,2.6,.08),c);d.position.y=1.4;const h=new we(new Lt(.65,.14,.14),c);h.position.y=2.4;const u=new we(new os(.32,1.35,4),c);u.position.y=.65,l.add(d,h,u);const f=new ut({color:16707722,side:gt,transparent:!0,opacity:.9}),g=new we(new Jt(.3,.68,16),f);g.rotation.x=-Math.PI/2,g.position.y=.08,l.add(g),l.position.copy(o),this.addTransient(l,.82,x=>{const m=x<.25?(1-x/.25)*4.5:0;d.position.y=1.4+m,h.position.y=2.4+m,u.scale.setScalar(x<.25?.1:1),g.scale.setScalar(1+x*1.5),c.opacity=Math.max(0,1-Math.max(0,x-.6)/.4),f.opacity=Math.max(0,.9*(1-x))}),this.spawnVoxelBurst(o,12,[3718648,14742270,16707722],4,5.2,1.1)}break}case"hallowed_bolt":case"thundaga":{this.triggerEnvPulse?.("storm_dark",260);const r=e.vfxType==="hallowed_bolt"?16707722:6333946;this.triggerLight(i.clone().add(new N(0,2,0)),r,14,.55);for(const o of n){const l=new Ke,c=new ot({color:16777215,emissive:r,emissiveIntensity:3,transparent:!0,opacity:.95});for(let u=0;u<3;u++){const f=(u-1)*.25;for(let g=0;g<4;g++){const x=new we(new Qi(.05,.08,1.15,6),c);x.position.set(f+(g%2===0?.14:-.14),.55+g*1,g%2===0?-.08:.08),x.rotation.z=g%2===0?.22:-.22,l.add(x)}}const d=new ut({color:r,side:gt,transparent:!0,opacity:.9}),h=new we(new Jt(.25,.68,20),d);h.rotation.x=-Math.PI/2,h.position.y=.08,l.add(h),l.position.copy(o),this.addTransient(l,.52,u=>{c.opacity=1-u,h.scale.setScalar(.8+u*2.2),d.opacity=.9*(1-u)}),this.spawnVoxelBurst(o,12,[r,16777215,3718648],4.5,4.8,.9)}break}case"firaga":case"dragon_breath":{this.triggerLight(i.clone().add(new N(0,1.4,0)),16347926,14,.8);const r=new ot({color:16707722,emissive:16733440,emissiveIntensity:3,transparent:!0,opacity:.95}),o=new we(new En(.42,12,12),r);o.position.set(i.x,i.y+3.2,i.z),this.addTransient(o,.45,l=>{o.position.y=i.y+3.2*(1-l*l)+.3,o.scale.setScalar(1+l*.8),r.opacity=1-l});for(const l of n){const c=new Ke,d=new ot({color:16772565,emissive:16347926,emissiveIntensity:2.8,transparent:!0,opacity:.9}),h=new we(new Qi(.28,.64,2.4,8),d);h.position.y=1.2;const u=new ut({color:16486972,side:gt,transparent:!0,opacity:.85}),f=new we(new Jt(.2,.55,18),u);f.rotation.x=-Math.PI/2,f.position.y=.08,c.add(h,f),c.position.copy(l),this.addTransient(c,.7,g=>{const x=Math.sin(g*Math.PI);h.scale.set(.6+x*.95,.5+x*1.15,.6+x*.95),h.rotation.y+=.22,d.opacity=Math.max(0,1-g),f.scale.setScalar(1+g*2.1),u.opacity=.85*(1-g)}),this.spawnVoxelBurst(l,14,[16347926,15680580,16707722],4.2,5.5,1.1)}break}case"blizzaga":{this.triggerLight(i.clone().add(new N(0,1.2,0)),3718648,11,.72);for(let r=0;r<n.length;r++){const o=n[r],l=new Ke,c=new mc({color:14742270,emissive:959977,emissiveIntensity:1.85,roughness:.14,metalness:.2,clearcoat:.9,transparent:!0,opacity:.92});for(let h=0;h<5;h++){const u=new we(new os(.2,1.55,5),c),f=h/5*Math.PI*2;u.position.set(Math.cos(f)*.26,.65,Math.sin(f)*.26),u.rotation.z=Math.cos(f)*.28,u.rotation.x=Math.sin(f)*.28,l.add(u)}l.position.copy(o);const d=r*.06;this.addTransient(l,.78,h=>{const u=Math.max(0,(h-d)/(1-d)),f=u<.22?u/.22:1;l.scale.set(1,Math.max(.05,f),1),c.opacity=Math.max(0,1-Math.max(0,u-.55)/.45)}),this.spawnVoxelBurst(o,12,[12248829,3718648,16777215],3.8,4.4,1)}break}case"sky_dive":{this.triggerLight(i.clone().add(new N(0,1,0)),3718648,13,.65);const r=new Ke,o=new ut({color:3718648,side:gt,transparent:!0,opacity:.95}),l=new we(new Jt(.3,.75,24),o);l.rotation.x=-Math.PI/2,l.position.y=.08,r.add(l);const c=new ot({color:14742270,emissive:959977,emissiveIntensity:2.5,transparent:!0,opacity:.85}),d=new we(new Qi(.18,.5,4.8,8),c);d.position.y=2.4,r.add(d),r.position.copy(i),this.addTransient(r,.58,h=>{l.scale.setScalar(1+h*2.7),o.opacity=1-h,c.opacity=.85*(1-h),d.scale.set(1-h*.6,1,1-h*.6)}),this.spawnVoxelBurst(i,30,[3718648,16707722,9741240],5.8,6.2,1.25);break}case"arc_shot":case"leg_shot":case"arcane_bolt":case"poison_kunai":{const r=e.vfxType==="arcane_bolt"?11032055:e.vfxType==="poison_kunai"?2278750:16707722,o=new ot({color:r,emissive:r,emissiveIntensity:2.5}),l=new we(e.vfxType==="arcane_bolt"?new En(.16,8,8):new Lt(.08,.08,.55),o),c=t.clone().add(new N(0,1,0)),d=i.clone().add(new N(0,.8,0));l.position.copy(c),this.addTransient(l,.34,h=>{const u=Math.sin(h*Math.PI)*1.45;l.position.lerpVectors(c,d,h),l.position.y+=u,l.lookAt(d)}),this.spawnVoxelBurst(i,10,[r,16777215],3.2,3.5,.9);break}case"arrow_rain":{this.triggerLight(i.clone().add(new N(0,1.8,0)),10741301,9,.6);const r=new ot({color:16707722,emissive:10741301,emissiveIntensity:2});for(const o of n){for(let l=0;l<4;l++){const c=new we(new Lt(.06,.65,.06),r),d=(Math.random()-.5)*.9,h=(Math.random()-.5)*.9,u=l*.06;c.position.set(o.x+d,o.y+5.5,o.z+h),this.addTransient(c,.55,f=>{const g=Math.max(0,(f-u)/(1-u));c.position.y=o.y+5.5*(1-g)+.3})}this.spawnVoxelBurst(o,6,[10741301,16707722],3,3.5,.85)}break}case"curaga":case"revive":case"mana_font":{const r=e.vfxType==="mana_font"?3718648:4906624;this.triggerLight(i.clone().add(new N(0,1.5,0)),r,11,.7);for(const o of n){const l=new ot({color:16777215,emissive:r,emissiveIntensity:2.2,transparent:!0,opacity:.7}),c=new we(new Qi(.45,.45,3.5,12),l);c.position.set(o.x,o.y+1.75,o.z),this.addTransient(c,.65,d=>{l.opacity=.7*Math.sin(d*Math.PI),c.rotation.y+=.1}),this.spawnVoxelBurst(o,10,[r,16707722,16777215],2.2,5,.85)}break}case"hastega":case"aegis":{const r=e.vfxType==="aegis"?6333946:16436245;this.triggerLight(i.clone().add(new N(0,1.2,0)),r,10,.65);for(const o of n){const l=new Ke,c=new ot({color:r,emissive:r,emissiveIntensity:2.3,transparent:!0,opacity:.9}),d=new we(new jn(.58,.06,6,16),c);d.rotation.x=Math.PI/2,l.add(d);for(let h=0;h<6;h++){const u=new we(new Lt(.14,.08,.18),c),f=h/6*Math.PI*2;u.position.set(Math.cos(f)*.65,0,Math.sin(f)*.65),u.rotation.y=-f,l.add(u)}l.position.set(o.x,o.y+.12,o.z),this.addTransient(l,.75,h=>{l.rotation.y+=.12,l.position.y=o.y+.12+h*.75,c.opacity=.9*(1-h)})}break}case"holy":{this.triggerLight(i.clone().add(new N(0,1.5,0)),16707722,16,.75);const r=new ot({color:16777215,emissive:16638023,emissiveIntensity:3,transparent:!0,opacity:.95}),o=new we(new En(.55,16,16),r);o.position.set(i.x,i.y+1,i.z),this.addTransient(o,.65,l=>{const c=l<.45?.3+l/.45*1.4:1.7+(l-.45)*2.5;o.scale.setScalar(c),r.opacity=l<.45?.95:Math.max(0,1-(l-.45)/.55)}),this.spawnVoxelBurst(i,32,[16707722,16777215,3718648],5.5,6.2,1.15);break}case"shadow_step":{this.triggerLight(i.clone().add(new N(0,1,0)),11032055,11,.55);const r=new ut({color:11032055,transparent:!0,opacity:.65}),o=new we(new Lt(.5,1.1,.4),r);o.position.set(t.x,t.y+.65,t.z),this.addTransient(o,.45,l=>{r.opacity=.65*(1-l),o.scale.set(1+l*.4,1-l*.3,1+l*.4)}),this.spawnSwordSlashRibbon(i,a,16007006,!0),this.spawnVoxelBurst(t,18,[8266446,1973067,12616956],3.2,3.8,1.1),this.spawnVoxelBurst(i,24,[12616956,16007006,1973067],4.4,4.8,1.15);break}case"apocalypse_meteor":{this.triggerEnvPulse?.("blood_sky",950),this.triggerLight(i.clone().add(new N(0,2.5,0)),16729344,18,.95);const r=new Ke,o=new ot({color:4524554,emissive:16733440,emissiveIntensity:2.8,roughness:.5}),l=new we(new so(1.1,1),o),c=new ut({color:16707722,side:gt,transparent:!0,opacity:.9}),d=new we(new jn(1.4,.08,6,20),c),h=new we(new jn(1.8,.06,6,20),c);h.rotation.x=Math.PI/2,r.add(l,d,h);const u=i.clone().add(new N(-4.5,9.5,-3.5)),f=i.clone().add(new N(0,.5,0));r.position.copy(u),this.addTransient(r,.85,g=>{r.position.lerpVectors(u,f,g*g),l.rotation.x+=.14,l.rotation.z+=.1,d.rotation.y+=.2,h.rotation.z+=.22,g>.85&&r.scale.setScalar(1+(g-.85)*6)});for(const g of[2.5,4.2]){const x=new ut({color:16733440,side:gt,transparent:!0,opacity:.85}),m=new we(new Jt(.3,.7,24),x);m.rotation.x=-Math.PI/2,m.position.set(i.x,i.y+.1,i.z),this.addTransient(m,.85,p=>{m.scale.setScalar(1+p*g),x.opacity=.85*(1-p)})}for(const g of n)this.spawnVoxelBurst(g,12,[16733440,16707722,4524554],6.2,7.5,1.35);break}default:{const r=e.vfxType==="dual_strike",o=e.vfxType==="shadowblade"?11032055:r?16007006:16707722;this.triggerLight(i.clone().add(new N(0,1,0)),o,9,.35),this.spawnSwordSlashRibbon(i,a,o,r),this.spawnVoxelBurst(i,14,[o,16777215,9741240],3.8,4.2,1);break}}}update(e){let t=!1;for(let i=0;i<this.maxParticles;i++){const n=this.particles[i];if(!n.active)continue;if(t=!0,n.life+=e,n.life>=n.maxLife){n.active=!1,this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix);continue}n.vel.y-=18*e,n.pos.addScaledVector(n.vel,e),n.rot.x+=n.rotVel.x*e,n.rot.y+=n.rotVel.y*e,n.rot.z+=n.rotVel.z*e;const a=this.getFloorHeight(n.pos.x,n.pos.z)+.05;n.pos.y<a&&(n.pos.y=a,n.vel.y=Math.abs(n.vel.y)*.46,n.vel.x*=.72,n.vel.z*=.72);const r=n.life>n.maxLife*.6?1-(n.life-n.maxLife*.6)/(n.maxLife*.4):1,o=Math.max(.001,n.scale*r);this.dummy.position.copy(n.pos),this.dummy.rotation.copy(n.rot),this.dummy.scale.setScalar(o),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(i,this.dummy.matrix)}t&&(this.particleMesh.instanceMatrix.needsUpdate=!0);for(let i=this.transientEffects.length-1;i>=0;i--){const n=this.transientEffects[i];n.life+=e;const a=Math.min(1,n.life/n.maxLife);n.update(a,e),n.life>=n.maxLife&&(this.group.remove(n.mesh),n.mesh.traverse(r=>{if(r.isMesh){const o=r;o.geometry?.dispose(),Array.isArray(o.material)?o.material.forEach(l=>l.dispose()):o.material?.dispose()}}),this.transientEffects.splice(i,1))}}static tileSize(){return{tileSize:Ie,stepHeight:mi}}}function Ir(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(max-width: 820px), (pointer: coarse)").matches}function Ga(s){switch(s){case"S":return 0;case"N":return Math.PI;case"E":return Math.PI/2;case"W":return-Math.PI/2}}class Jg{canvas;renderer;scene;camera;composer;bloomPass;timer;hemiLight;sunLight;pointLightPool=[];diorama=null;effects;engine=null;unitVisuals=new Map;currentPreset="HIGH";baseSkyColor=791330;baseSunIntensity=1.35;baseHemiIntensity=.45;envPulseTimer=0;envPulseMode=null;hitStopTimer=0;overlayGroup=new Ke;moveOverlayMeshes=[];attackOverlayMeshes=[];aoeOverlayMeshes=[];telegraphMeshes=[];cursorMesh;parabolicArc;compassGroup=new Ke;compassArrows=[];compassBaseY=0;isAnimating=!1;animatingSinceMs=0;azimuth=Math.PI*.25;targetAzimuth=Math.PI*.25;polar=.88;targetPolar=.88;distance=18.5;targetDistance=18.5;focusPoint=new N(0,1.2,0);targetFocus=new N(0,1.2,0);trauma=0;shakeTime=0;tapThresholdPx=14;raycaster=new Id;pointer=new Ae(-99,-99);isDraggingOrbit=!1;isDraggingPan=!1;isMultiTouch=!1;lastPinchDist=0;lastPinchMid={x:0,y:0};pointerDownPos={x:0,y:0};pointerDownOnCanvas=!1;activePointerId=null;dragStart={x:0,y:0};hasDragged=!1;keysDown=new Set;hoveredTile=null;hoveredCompass=null;callbacks;elapsed=0;timeScale=1;activeSkillHighlightColor=3718648;disposed=!1;tileOverlayGeom=new Li(Ie*.86,Ie*.86);moveMat;attackMat;aoeMat;telegraphMat;constructor(e,t){this.canvas=e,this.callbacks=t,this.renderer=new Ag({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.toneMapping=na,this.renderer.toneMappingExposure=.94,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Kn,this.scene=new sc,this.scene.background=new Re(791330),this.scene.fog=new eo(791330,.016),this.camera=new si(40,window.innerWidth/Math.max(1,window.innerHeight),.2,140);const i=new cs(this.renderer),n=new Cg;this.scene.environment=i.fromScene(n,.04).texture,this.scene.environmentIntensity=.85,n.dispose(),i.dispose(),this.hemiLight=new Td(12314367,3352350,.42),this.scene.add(this.hemiLight),this.sunLight=new Rd(16773590,1.35),this.sunLight.position.set(14,24,12),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.bias=-4e-4,this.sunLight.shadow.normalBias=.015;const a=this.sunLight.shadow.camera;a.near=2,a.far=65,a.left=-16,a.right=16,a.top=16,a.bottom=-16,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target);for(let c=0;c<3;c++){const d=new vc(16777215,0,11,1.5);d.castShadow=!1,this.scene.add(d),this.pointLightPool.push({light:d,life:0,maxLife:0,peakIntensity:0})}this.composer=new Ug(this.renderer),this.composer.addPass(new Fg(this.scene,this.camera)),this.bloomPass=new Rn(new Ae(window.innerWidth,window.innerHeight),.45,.32,1.02),this.composer.addPass(this.bloomPass),this.composer.addPass(new Ng),this.tileOverlayGeom.rotateX(-Math.PI/2),this.moveMat=new ut({color:3718648,transparent:!0,opacity:.45,depthWrite:!1}),this.attackMat=new ut({color:16007006,transparent:!0,opacity:.48,depthWrite:!1}),this.aoeMat=new ut({color:16436245,transparent:!0,opacity:.62,depthWrite:!1}),this.telegraphMat=new ut({color:16729344,transparent:!0,opacity:.65,depthWrite:!1}),this.scene.add(this.overlayGroup),this.cursorMesh=new we(new Jt(Ie*.36,Ie*.47,4),new ut({color:16777215,side:gt,transparent:!0,opacity:.9,depthWrite:!1})),this.cursorMesh.rotation.x=-Math.PI/2,this.cursorMesh.rotation.z=Math.PI/4,this.cursorMesh.visible=!1,this.scene.add(this.cursorMesh);const r=Array.from({length:25},()=>new N),o=new Ct().setFromPoints(r),l=new lc({color:16436245,transparent:!0,opacity:.95});this.parabolicArc=new xd(o,l),this.parabolicArc.visible=!1,this.scene.add(this.parabolicArc),this.buildFacingCompass(),this.scene.add(this.compassGroup),this.effects=new Kg((c,d)=>this.sampleFloorHeight(c,d),(c,d,h,u)=>this.flashPointLight(c,d,h,u),(c,d)=>{this.envPulseMode=c,this.envPulseTimer=d/1e3}),this.scene.add(this.effects.group),Object.assign(window,{renderer:this.renderer,scene:this.scene}),this.timer=new xc,this.timer.connect(document),Ir()&&this.setGraphicsPreset("MEDIUM"),this.bindEvents(),this.startLoop()}buildFacingCompass(){const e=[{facing:"N",offset:[0,-1.08],rotY:Math.PI},{facing:"S",offset:[0,1.08],rotY:0},{facing:"E",offset:[1.08,0],rotY:Math.PI/2},{facing:"W",offset:[-1.08,0],rotY:-Math.PI/2}],t=new os(.3,.56,4);t.rotateX(Math.PI/2);const i=new En(.68,12,10),n=new ut({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1});for(const a of e){const r=new ot({color:16638023,emissive:16096779,emissiveIntensity:1.9,roughness:.2}),o=new we(t,r);o.position.set(a.offset[0],.35,a.offset[1]),o.rotation.y=a.rotY,o.userData={compassFacing:a.facing};const l=new we(i,n);l.position.set(a.offset[0],.42,a.offset[1]),l.userData={compassFacing:a.facing},this.compassGroup.add(o),this.compassGroup.add(l),this.compassArrows.push({facing:a.facing,mesh:o,hitMesh:l,mat:r})}this.compassGroup.visible=!1}flashPointLight(e,t,i,n){let a=this.pointLightPool.find(r=>r.life>=r.maxLife||r.light.intensity<=.01);a||(a=this.pointLightPool.reduce((r,o)=>r.life/Math.max(.01,r.maxLife)>o.life/Math.max(.01,o.maxLife)?r:o)),a.light.position.copy(e),a.light.color.setHex(t),a.peakIntensity=i,a.light.intensity=i,a.life=0,a.maxLife=Math.max(.15,n)}sampleFloorHeight(e,t){if(!this.engine)return 0;const i=Math.round(e/Ie+(this.engine.stage.cols-1)/2),n=Math.round(t/Ie+(this.engine.stage.rows-1)/2),a=this.engine.getTile(i,n);return a?a.height*mi:0}loadStage(e){this.engine=e,this.clearHighlights(),this.showFacingCompass(null),this.setParabolicArc(null,null),this.diorama&&(this.scene.remove(this.diorama.group),this.diorama.dispose(),this.diorama=null);for(const n of this.unitVisuals.values())this.scene.remove(n.rig.root);this.unitVisuals.clear();const t={forest:{sky:1450552,sunColor:16770232,sunInt:1.45,hemiSky:12248829,hemiGround:3878175,hemiInt:.44},canyon:{sky:2234154,sunColor:16772565,sunInt:1.4,hemiSky:16639626,hemiGround:4528643,hemiInt:.42},arctic:{sky:924982,sunColor:14412542,sunInt:1.25,hemiSky:9684477,hemiGround:1976635,hemiInt:.46},swamp:{sky:727319,sunColor:11006928,sunInt:1.05,hemiSky:7268279,hemiGround:1841431,hemiInt:.4},volcanic:{sky:2165517,sunColor:16757642,sunInt:1.35,hemiSky:16557477,hemiGround:2560787,hemiInt:.42}},i=t[e.stage.biome]??t.forest;this.baseSkyColor=i.sky,this.baseSunIntensity=i.sunInt,this.baseHemiIntensity=i.hemiInt,this.scene.background=new Re(i.sky),this.scene.fog.color.setHex(i.sky),this.sunLight.color.setHex(i.sunColor),this.sunLight.intensity=i.sunInt,this.hemiLight.color.setHex(i.hemiSky),this.hemiLight.groundColor.setHex(i.hemiGround),this.hemiLight.intensity=i.hemiInt,this.diorama=new Yg(e.stage,e.tiles),this.diorama.setParticleDensity(this.currentPreset==="LOW"?.4:this.currentPreset==="MEDIUM"?.75:1),this.scene.add(this.diorama.group);for(const n of e.units){const a=Wg(n.jobId,n.team,!!n.isBoss),r=this.getUnitAnchorWorldPos(n);a.root.position.copy(r),a.root.rotation.y=Ga(n.facing),this.scene.add(a.root),this.unitVisuals.set(n.id,{id:n.id,rig:a,col:n.col,row:n.row,facing:n.facing,worldPos:r.clone(),animState:n.hp>0?"idle":"dead",animTimer:0,animDuration:0,skyDiveOffsetY:0,isDead:n.hp<=0})}this.targetFocus.set(0,1.4,0),this.focusPoint.copy(this.targetFocus),this.targetDistance=e.stage.cols>=14?21.5:18.5}getUnitAnchorWorldPos(e){if(!this.engine)return new N;const i=this.engine.getTile(e.col,e.row)?.height??1,n=Tt(e.col,e.row,i,this.engine.stage.cols,this.engine.stage.rows);return e.footprint===2&&(n.x+=Ie*.5,n.z+=Ie*.5),n}syncFromEngine(e){this.engine=e;for(const t of e.units){const i=this.unitVisuals.get(t.id);if(!i)continue;i.col=t.col,i.row=t.row,i.facing=t.facing,i.worldPos.copy(this.getUnitAnchorWorldPos(t)),i.isDead=t.hp<=0,i.isDead?i.animState="dead":i.animState==="dead"&&(i.animState="idle");const n=e.activeUnitId===t.id&&t.hp>0;i.rig.teamRing.scale.setScalar(n?1.24:1)}for(const t of e.tiles.values())t.chest?.opened&&this.diorama&&this.diorama.markChestOpened(t.chest.id);this.refreshPersistentTileEffects(e)}refreshPersistentTileEffects(e){for(const i of this.telegraphMeshes)this.overlayGroup.remove(i);this.telegraphMeshes=[];const t=new Map;for(const i of e.units)if(i.hp>0&&i.pendingMeteor){const n=i.pendingMeteor;for(let a=-1;a<=1;a++)for(let r=-1;r<=1;r++){const o=n.centerCol+a,l=n.centerRow+r;e.getTile(o,l)&&t.set(At(o,l),{col:o,row:l,isMeteor:!0})}}for(const i of e.tiles.values())if((i.burningTurns??0)>0){const n=At(i.col,i.row);t.has(n)||t.set(n,{col:i.col,row:i.row,isMeteor:!1})}for(const i of t.values()){const n=e.getTile(i.col,i.row);if(!n)continue;const a=Tt(n.col,n.row,n.height,e.stage.cols,e.stage.rows),r=new we(this.tileOverlayGeom,this.telegraphMat);r.position.set(a.x,a.y+.04,a.z),this.overlayGroup.add(r),this.telegraphMeshes.push(r)}}clearHighlights(){for(const e of[...this.moveOverlayMeshes,...this.attackOverlayMeshes,...this.aoeOverlayMeshes])this.overlayGroup.remove(e);this.moveOverlayMeshes=[],this.attackOverlayMeshes=[],this.aoeOverlayMeshes=[]}setTileListHighlight(e,t,i,n){for(const a of t)this.overlayGroup.remove(a);if(t.length=0,!!this.engine)for(const a of e){const r=this.engine.getTile(a.col,a.row);if(!r)continue;const o=Tt(r.col,r.row,r.height,this.engine.stage.cols,this.engine.stage.rows),l=new we(this.tileOverlayGeom,i);l.position.set(o.x,o.y+n,o.z),this.overlayGroup.add(l),t.push(l)}}setMoveTiles(e){this.setTileListHighlight(e,this.moveOverlayMeshes,this.moveMat,.025)}setAttackTiles(e){this.setTileListHighlight(e,this.attackOverlayMeshes,this.attackMat,.03)}setAoeTiles(e){this.setTileListHighlight(e,this.aoeOverlayMeshes,this.aoeMat,.038)}setParabolicArc(e,t,i=16436245){if(!e||!t||!this.engine){this.parabolicArc.visible=!1;return}const n=this.engine.getTile(e.col,e.row),a=this.engine.getTile(t.col,t.row);if(!n||!a){this.parabolicArc.visible=!1;return}const r=Tt(e.col,e.row,n.height,this.engine.stage.cols,this.engine.stage.rows),o=Tt(t.col,t.row,a.height,this.engine.stage.cols,this.engine.stage.rows);r.y+=1.05,o.y+=.9;const l=r.distanceTo(o),c=Math.max(.85,l*.35),d=[];for(let h=0;h<=24;h++){const u=h/24,f=new N().lerpVectors(r,o,u);f.y+=Math.sin(u*Math.PI)*c,d.push(f)}this.parabolicArc.geometry.setFromPoints(d),this.parabolicArc.material.color.setHex(i),this.parabolicArc.visible=!0}showFacingCompass(e){if(!e||!this.engine){this.compassGroup.visible=!1,this.hoveredCompass=null;for(const i of this.compassArrows)i.mat.emissiveIntensity=1.5,i.mesh.scale.setScalar(1);return}const t=this.getUnitAnchorWorldPos(e);this.compassBaseY=t.y,this.compassGroup.position.copy(t),this.compassGroup.visible=!0,this.hoveredCompass=null;for(const i of this.compassArrows){const n=i.facing===e.facing;i.mat.emissiveIntensity=n?2.5:1.5,i.mesh.scale.setScalar(n?1.18:1)}this.compassGroup.updateMatrixWorld(!0)}focusOnTile(e,t){if(!this.engine)return;const n=this.engine.getTile(e,t)?.height??1,a=Tt(e,t,n,this.engine.stage.cols,this.engine.stage.rows);this.targetFocus.set(a.x,a.y+.85,a.z)}getGraphicsPreset(){return this.currentPreset}setGraphicsPreset(e){this.currentPreset=e;const t=window.devicePixelRatio||1,i=Ir();let n=Math.min(t,2),a=2048,r=1;e==="LOW"?(n=1,a=1024,this.bloomPass.enabled=!1,r=.4):e==="MEDIUM"?(n=i?Math.min(t,1.35):Math.min(t,1.5),a=i?1024:2048,this.bloomPass.enabled=!0,r=.75):(n=Math.min(t,2),a=2048,this.bloomPass.enabled=!0,r=1),this.renderer.setPixelRatio(n),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer.setSize(window.innerWidth,window.innerHeight),this.bloomPass.resolution.set(window.innerWidth,window.innerHeight),this.sunLight.shadow.mapSize.x!==a&&(this.sunLight.shadow.mapSize.set(a,a),this.sunLight.shadow.map?.dispose(),this.sunLight.shadow.map=null),this.diorama?.setParticleDensity(r)}rotate90(e){this.targetAzimuth+=e*(Math.PI/2)}setTimeScale(e){this.timeScale=e}addTrauma(e){this.trauma=Math.min(1,this.trauma+e)}async animateUnitMovePath(e,t,i){const n=this.unitVisuals.get(e),a=this.engine;if(!(!n||!a||t.length<=1)){this.isAnimating=!0,this.animatingSinceMs=performance.now();try{n.animState="walk";for(let r=1;r<t.length&&!this.disposed;r++){const o=t[r-1],l=t[r],c=a.getTile(o.col,o.row),d=a.getTile(l.col,l.row);if(!c||!d)continue;const h=Tt(o.col,o.row,c.height,a.stage.cols,a.stage.rows),u=Tt(l.col,l.row,d.height,a.stage.cols,a.stage.rows);a.getUnit(e)?.footprint===2&&(h.x+=Ie*.5,h.z+=Ie*.5,u.x+=Ie*.5,u.z+=Ie*.5);const g=l.col-o.col,x=l.row-o.row;(g!==0||x!==0)&&(n.facing=Math.abs(g)>=Math.abs(x)?g>0?"E":"W":x>0?"S":"N");const m=Math.abs(d.height-c.height)>0?.48:.14,p=165/this.timeScale,v=performance.now();i?.(l.col,l.row),await new Promise(w=>{const y=()=>{if(this.disposed){w();return}const E=Math.min(1,(performance.now()-v)/p);n.worldPos.lerpVectors(h,u,E),n.worldPos.y+=Math.sin(E*Math.PI)*m,E>=1?(n.col=l.col,n.row=l.row,w()):requestAnimationFrame(y)};requestAnimationFrame(y)})}}finally{n.isDead||(n.animState="idle"),this.isAnimating=!1,this.animatingSinceMs=0}}}async animateUnitSkill(e,t,i,n,a){const r=this.engine;if(!r)return;const o=this.unitVisuals.get(e);this.isAnimating=!0,this.animatingSinceMs=performance.now();try{const l=r.getTile(i,n),c=Tt(i,n,l?.height??1,r.stage.cols,r.stage.rows),d=a.map(f=>{const g=r.getTile(f.col,f.row);return Tt(f.col,f.row,g?.height??1,r.stage.cols,r.stage.rows)}),h=o?o.worldPos.clone():c.clone();if(o){if(i!==o.col||n!==o.row){const f=i-o.col,g=n-o.row;o.facing=Math.abs(f)>=Math.abs(g)?f>0?"E":"W":g>0?"S":"N"}if(t.vfxType==="sky_dive"){o.rig.bodyPivot.scale.set(1.16,.8,1.16),await new Promise(v=>setTimeout(v,120/this.timeScale)),this.effects.spawnSkyDiveWindRings(h),o.animState="jump_up";const f=220/this.timeScale,g=performance.now();await new Promise(v=>{const w=()=>{if(this.disposed){v();return}const y=Math.min(1,(performance.now()-g)/f);o.skyDiveOffsetY=y*9,y>=1?v():requestAnimationFrame(w)};requestAnimationFrame(w)}),o.animState="jump_down";const x=200/this.timeScale,m=performance.now(),p=o.worldPos.clone();await new Promise(v=>{const w=()=>{if(this.disposed){o.skyDiveOffsetY=0,v();return}const y=Math.min(1,(performance.now()-m)/x);o.worldPos.lerpVectors(p,c,y),o.skyDiveOffsetY=(1-y)*9,y>=1?(o.skyDiveOffsetY=0,v()):requestAnimationFrame(w)};requestAnimationFrame(w)})}else o.animState=t.vfxType==="dual_strike"?"dual":t.isBow?"bow":t.isMagic||t.isHeal||t.isBuff||t.vfxType==="judgment_blade"?"cast":"slash",o.animTimer=0,o.animDuration=.48,await new Promise(f=>setTimeout(f,220/this.timeScale))}const u=o?Ga(o.facing):0;try{this.effects.playSkillVFX(t,h,c,d,u)}catch(f){console.error("[BattlefieldTactics3D] VFX error during skill animation:",f)}t.vfxType==="apocalypse_meteor"&&(this.hitStopTimer=.09),this.addTrauma(t.aoeRadius>0||t.vfxType==="sky_dive"?.55:.25),await new Promise(f=>setTimeout(f,290/this.timeScale))}finally{if(o){o.skyDiveOffsetY=0,o.rig.bodyPivot.scale.set(1,1,1),o.isDead||(o.animState="idle");const l=this.engine?.getUnit(e);l&&o.worldPos.copy(this.getUnitAnchorWorldPos(l))}this.isAnimating=!1,this.animatingSinceMs=0}}triggerHitFeedback(e,t,i,n){const a=this.unitVisuals.get(e);if(a){if(n){a.isDead=!0,a.animState="dead",this.effects.spawnVoxelBurst(a.worldPos,28,[9741240,16007006,16707722],5.2,6,1.2),this.addTrauma(.6);return}a.animState=i?"block":"hit",a.animTimer=0,a.animDuration=.35,t?(this.effects.spawnVoxelBurst(a.worldPos,22,[16436245,16347926,16777215],5,5.5,1.15),this.addTrauma(.75)):i&&this.effects.spawnVoxelBurst(a.worldPos,8,[6333946,16777215],2.8,3,.85)}}getUnitTopScreenPosition(e){const t=this.unitVisuals.get(e);if(!t)return null;const i=t.worldPos.clone();i.y+=t.rig.heightWorld+.32+t.skyDiveOffsetY,i.project(this.camera);const n=this.canvas.clientWidth||window.innerWidth,a=this.canvas.clientHeight||window.innerHeight;return{unitId:e,x:(i.x*.5+.5)*n,y:(-i.y*.5+.5)*a,visible:i.z>=-1&&i.z<=1}}bindEvents(){const e=()=>{if(this.disposed)return;const n=window.innerWidth,a=Math.max(1,window.innerHeight);this.camera.aspect=n/a,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,a,!1),this.composer.setSize(n,a),this.bloomPass.resolution.set(n,a)};window.addEventListener("resize",e);const t=n=>{const a=n.key.toLowerCase();this.keysDown.add(a),a==="q"&&this.rotate90(-1),a==="e"&&this.rotate90(1)},i=n=>{this.keysDown.delete(n.key.toLowerCase())};window.addEventListener("keydown",t),window.addEventListener("keyup",i),this.canvas.addEventListener("contextmenu",n=>n.preventDefault()),this.canvas.addEventListener("pointerdown",n=>{this.isMultiTouch||(this.activePointerId=n.pointerId,this.pointerDownOnCanvas=!0,this.pointerDownPos={x:n.clientX,y:n.clientY},this.dragStart={x:n.clientX,y:n.clientY},this.hasDragged=!1,n.button===2||n.button===1?(this.isDraggingPan=n.button===2,this.isDraggingOrbit=n.button===1):(n.button===0||n.pointerType==="touch")&&(this.isDraggingOrbit=!0))}),window.addEventListener("pointermove",n=>{if(this.isMultiTouch||this.pointerDownOnCanvas&&this.activePointerId!==null&&n.pointerId!==this.activePointerId||!this.isDraggingOrbit&&!this.isDraggingPan&&n.target!==this.canvas)return;const a=this.canvas.getBoundingClientRect();this.pointer.x=(n.clientX-a.left)/a.width*2-1,this.pointer.y=-((n.clientY-a.top)/a.height)*2+1;const r=Math.hypot(n.clientX-this.pointerDownPos.x,n.clientY-this.pointerDownPos.y);if(this.isDraggingOrbit){if(r>=this.tapThresholdPx)if(!this.hasDragged)this.hasDragged=!0,this.dragStart={x:n.clientX,y:n.clientY};else{const o=n.clientX-this.dragStart.x,l=n.clientY-this.dragStart.y;this.targetAzimuth-=o*.008,this.targetPolar=Bn.clamp(this.targetPolar-l*.006,.42,1.28),this.dragStart={x:n.clientX,y:n.clientY}}}else if(this.isDraggingPan){r>=this.tapThresholdPx&&(this.hasDragged=!0);const o=n.clientX-this.dragStart.x,l=n.clientY-this.dragStart.y,c=new N(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),d=new N(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));this.targetFocus.addScaledVector(c,-o*.02),this.targetFocus.addScaledVector(d,l*.02),this.dragStart={x:n.clientX,y:n.clientY}}this.updateRaycastHover()}),window.addEventListener("pointerup",n=>{if(this.activePointerId!==null&&n.pointerId!==this.activePointerId)return;if(this.isMultiTouch){this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1;return}const a=Math.hypot(n.clientX-this.pointerDownPos.x,n.clientY-this.pointerDownPos.y),r=n.button===0||n.pointerType==="touch",o=this.pointerDownOnCanvas&&!this.hasDragged&&a<this.tapThresholdPx&&r&&n.target===this.canvas;if(this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1,o){const l=this.canvas.getBoundingClientRect();if(this.pointer.x=(n.clientX-l.left)/l.width*2-1,this.pointer.y=-((n.clientY-l.top)/l.height)*2+1,this.updateRaycastHover(),this.compassGroup.visible&&this.hoveredCompass){this.callbacks.onFacingClick?.(this.hoveredCompass);return}this.hoveredTile&&this.callbacks.onTileClick?.(this.hoveredTile.col,this.hoveredTile.row)}}),window.addEventListener("pointercancel",n=>{this.activePointerId!==null&&n.pointerId!==this.activePointerId||(this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1)}),this.canvas.addEventListener("touchstart",n=>{if(n.touches.length>=2){n.preventDefault(),this.isMultiTouch=!0,this.pointerDownOnCanvas=!1,this.activePointerId=null,this.isDraggingOrbit=!1,this.isDraggingPan=!1,this.hasDragged=!1;const a=n.touches[0],r=n.touches[1];this.lastPinchDist=Math.hypot(r.clientX-a.clientX,r.clientY-a.clientY),this.lastPinchMid={x:(a.clientX+r.clientX)*.5,y:(a.clientY+r.clientY)*.5}}},{passive:!1}),this.canvas.addEventListener("touchmove",n=>{if(n.touches.length===2){n.preventDefault(),this.isMultiTouch=!0;const a=n.touches[0],r=n.touches[1],o=Math.hypot(r.clientX-a.clientX,r.clientY-a.clientY),l={x:(a.clientX+r.clientX)*.5,y:(a.clientY+r.clientY)*.5},c=o-this.lastPinchDist;this.targetDistance=Bn.clamp(this.targetDistance-c*.04,9.5,32);const d=l.x-this.lastPinchMid.x,h=l.y-this.lastPinchMid.y,u=new N(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),f=new N(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));this.targetFocus.addScaledVector(u,-d*.025),this.targetFocus.addScaledVector(f,h*.025),this.lastPinchDist=o,this.lastPinchMid=l}},{passive:!1}),this.canvas.addEventListener("touchend",n=>{n.touches.length<2&&setTimeout(()=>{this.isMultiTouch=!1},60)}),this.canvas.addEventListener("wheel",n=>{n.preventDefault(),this.targetDistance=Bn.clamp(this.targetDistance+n.deltaY*.012,9.5,32)},{passive:!1})}updateRaycastHover(){if(this.raycaster.setFromCamera(this.pointer,this.camera),this.compassGroup.visible){const t=this.raycaster.intersectObjects(this.compassArrows.map(i=>i.hitMesh),!1);if(t.length>0){const i=t[0].object.userData.compassFacing;this.hoveredCompass!==i&&(this.hoveredCompass=i,this.callbacks.onFacingHover?.(i));for(const n of this.compassArrows)n.mat.emissiveIntensity=n.facing===i?3.2:1.5,n.mesh.scale.setScalar(n.facing===i?1.38:1);return}else if(this.hoveredCompass!==null){this.hoveredCompass=null,this.callbacks.onFacingHover?.(null);for(const i of this.compassArrows)i.mat.emissiveIntensity=1.5,i.mesh.scale.setScalar(1)}}if(!this.diorama||!this.engine)return;const e=this.raycaster.intersectObjects(this.diorama.tileHitMeshes,!1);if(e.length>0){const t=e[0].object.userData,i=Tt(t.col,t.row,t.height,this.engine.stage.cols,this.engine.stage.rows);this.cursorMesh.position.set(i.x,i.y+.05,i.z),this.cursorMesh.visible=!0,(!this.hoveredTile||this.hoveredTile.col!==t.col||this.hoveredTile.row!==t.row)&&(this.hoveredTile={col:t.col,row:t.row},this.callbacks.onTileHover?.(t.col,t.row))}else this.cursorMesh.visible=!1,this.hoveredTile!==null&&(this.hoveredTile=null,this.callbacks.onTileHover?.(null,null))}startLoop(){this.renderer.setAnimationLoop(()=>{if(this.disposed)return;this.timer.update();const e=Math.min(Math.max(this.timer.getDelta(),0),.1),t=performance.now();this.isAnimating&&this.animatingSinceMs>0&&t-this.animatingSinceMs>4e3&&(console.warn("[BattlefieldTactics3D] Watchdog released stuck animation lock."),this.isAnimating=!1,this.animatingSinceMs=0),this.callbacks.onFrameTick?.(t,e),this.hitStopTimer>0&&(this.hitStopTimer=Math.max(0,this.hitStopTimer-e));const i=this.hitStopTimer>0?.08:this.timeScale,n=e*i;this.elapsed+=n,this.envPulseTimer>0&&(this.envPulseTimer=Math.max(0,this.envPulseTimer-e),this.envPulseMode==="storm_dark"?(this.sunLight.intensity=this.baseSunIntensity*.22,this.hemiLight.intensity=this.baseHemiIntensity*.35):this.envPulseMode==="blood_sky"&&(this.scene.background.setHex(4851720),this.scene.fog.color.setHex(4851720)),this.envPulseTimer===0&&(this.envPulseMode=null,this.sunLight.intensity=this.baseSunIntensity,this.hemiLight.intensity=this.baseHemiIntensity,this.scene.background.setHex(this.baseSkyColor),this.scene.fog.color.setHex(this.baseSkyColor)));const a=9*e,r=new N(Math.cos(this.azimuth),0,-Math.sin(this.azimuth)),o=new N(-Math.sin(this.azimuth),0,-Math.cos(this.azimuth));(this.keysDown.has("w")||this.keysDown.has("arrowup"))&&this.targetFocus.addScaledVector(o,a),(this.keysDown.has("s")||this.keysDown.has("arrowdown"))&&this.targetFocus.addScaledVector(o,-a),(this.keysDown.has("d")||this.keysDown.has("arrowright"))&&this.targetFocus.addScaledVector(r,a),(this.keysDown.has("a")||this.keysDown.has("arrowleft"))&&this.targetFocus.addScaledVector(r,-a),this.targetFocus.x=Bn.clamp(this.targetFocus.x,-12,12),this.targetFocus.z=Bn.clamp(this.targetFocus.z,-12,12);const l=1-Math.exp(-10*e);this.azimuth+=(this.targetAzimuth-this.azimuth)*l,this.polar+=(this.targetPolar-this.polar)*l,this.distance+=(this.targetDistance-this.distance)*l,this.focusPoint.lerp(this.targetFocus,l),this.trauma=Math.max(0,this.trauma-1.65*e),this.shakeTime+=e*34;const c=this.trauma*this.trauma,d=new N(Math.sin(this.shakeTime*1.7)*.28*c,Math.sin(this.shakeTime*2.3)*.22*c,Math.cos(this.shakeTime*1.3)*.28*c),h=Math.sin(this.polar),u=Math.cos(this.polar);this.camera.position.set(this.focusPoint.x+this.distance*h*Math.sin(this.azimuth),this.focusPoint.y+this.distance*u,this.focusPoint.z+this.distance*h*Math.cos(this.azimuth)),this.camera.position.add(d),this.camera.lookAt(this.focusPoint);const f=.5+.5*Math.sin(this.elapsed*4.5);this.aoeMat.opacity=.42+f*.32,this.telegraphMat.opacity=.45+f*.38,this.cursorMesh.scale.setScalar(.96+f*.08),this.compassGroup.visible&&(this.compassGroup.position.y=this.compassBaseY+Math.sin(this.elapsed*5)*.04);for(const g of this.pointLightPool)if(g.light.intensity>0){g.life+=e;const x=Math.min(1,g.life/g.maxLife);g.light.intensity=g.peakIntensity*(1-x),x>=1&&(g.light.intensity=0)}this.diorama?.update(this.elapsed,n),this.effects.update(n);for(const g of this.unitVisuals.values()){g.rig.root.position.lerp(g.worldPos,1-Math.exp(-16*e)),g.rig.root.position.y+=g.skyDiveOffsetY;let m=Ga(g.facing)-g.rig.root.rotation.y;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;g.rig.root.rotation.y+=m*(1-Math.exp(-14*e)),g.animDuration>0&&(g.animTimer+=n,g.animTimer>=g.animDuration&&!g.isDead&&(g.animState="idle",g.animDuration=0));const p=g.animDuration>0?g.animTimer/g.animDuration:0;Xg(g.rig,g.animState,this.elapsed,p)}if(this.callbacks.onUnitProjections&&this.engine){const g=[];for(const x of this.engine.units){const m=this.getUnitTopScreenPosition(x.id);m&&g.push(m)}this.callbacks.onUnitProjections(g)}this.composer.render()})}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),this.timer.dispose(),this.diorama?.dispose(),this.renderer.dispose()}}class Zg{modalEl;bodyEl;goldEl;campaign;activeTab="campaign";selectedHeroUid=null;toastMessage="";onLaunchStage;onClose;constructor(e,t,i){this.campaign=e,this.onLaunchStage=t,this.onClose=i,this.modalEl=document.getElementById("barracks-modal"),this.bodyEl=document.getElementById("barracks-body"),this.goldEl=document.getElementById("barracks-gold"),document.getElementById("btn-close-barracks")?.addEventListener("click",()=>{this.hide(),this.onClose()}),this.modalEl.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{this.activeTab=n.dataset.tab??"campaign",this.modalEl.querySelectorAll(".tab-btn").forEach(a=>a.classList.remove("active")),n.classList.add("active"),this.render()})})}show(e){e&&(this.activeTab=e,this.modalEl.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.tab===e)})),this.modalEl.classList.remove("hidden"),this.render()}hide(){this.modalEl.classList.add("hidden")}isOpen(){return!this.modalEl.classList.contains("hidden")}setToast(e){this.toastMessage=e,this.render()}render(){const e=this.campaign.getData();this.goldEl.textContent=`🪙 ${e.gold} Ouro`,(!this.selectedHeroUid||!e.roster.some(i=>i.uid===this.selectedHeroUid))&&(this.selectedHeroUid=e.roster[0]?.uid??null);const t=this.toastMessage?`<div style="margin-bottom:12px;padding:8px 12px;border-radius:6px;background:rgba(217,119,6,0.22);border:1px solid #f59e0b;color:#fde68a;font-size:12px;font-weight:600;">${this.toastMessage}</div>`:"";this.activeTab==="campaign"?(this.bodyEl.innerHTML=t+this.renderCampaignTab(),this.bindCampaignEvents()):this.activeTab==="squad"?(this.bodyEl.innerHTML=t+this.renderSquadTab(),this.bindSquadEvents()):(this.bodyEl.innerHTML=t+this.renderShopTab(),this.bindShopEvents())}renderCampaignTab(){const e=this.campaign.getData();return`<div class="grid-2">${Zi.map(i=>{const n=i.id<=e.unlockedStage,a=e.completedStages.includes(i.id),r=a?'<span class="pill-tag cleared">✔ Concluída (Rejogável)</span>':n?'<span class="pill-tag">⚔️ Disponível</span>':'<span class="pill-tag">🔒 Bloqueada</span>';return`
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
              ${a?"🔁 Rejogar Fase":n?"⚔️ Iniciar Batalha":"🔒 Bloqueada"}
            </button>
          </div>
        </div>
      `}).join("")}</div>`}bindCampaignEvents(){this.bodyEl.querySelectorAll("[data-play-stage]").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.playStage);this.campaign.selectStage(t)&&(this.hide(),this.onLaunchStage(t))})})}renderSquadTab(){const e=this.campaign.getData(),t=e.roster.filter(h=>h.deployed).length,i=e.roster.map(h=>{const u=It[h.jobId];return`
          <div class="card-box" style="cursor:pointer;border-color:${h.uid===this.selectedHeroUid?"#fde047":"rgba(148,163,184,0.28)"}" data-select-hero="${h.uid}">
            <div class="card-row">
              <strong>${u.icon} ${h.name} <small style="color:#94a3b8">(Nv.${h.level})</small></strong>
              <button class="hud-btn" data-toggle-deploy="${h.uid}">${h.deployed?"✔ Em Campo":"Reserva"}</button>
            </div>
            <div class="card-meta">${u.name} • ⭐ ${h.jp} JP • EXP ${h.exp}/${h.level*100}</div>
          </div>
        `}).join(""),n=e.roster.find(h=>h.uid===this.selectedHeroUid)??e.roster[0],a=It[n.jobId],r=Ul(n),o=a.skills.map(h=>{const u=n.unlockedSkills.includes(h.id)||h.isBasic;return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${h.name}</strong> <small style="color:#60a5fa">(${h.mpCost} MP)</small>
              <div class="card-meta">${h.description}</div>
            </div>
            ${u?'<span class="pill-tag cleared">Desbloqueada</span>':`<button class="hud-btn hud-btn-gold" data-unlock-skill="${h.id}" ${n.jp>=h.jpCost?"":"disabled"}>⭐ ${h.jpCost} JP</button>`}
          </div>
        `}).join(""),l=a.passivePool.map(h=>{const u=Dr[h],f=n.passiveUpgrades.includes(h);return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${u.name}</strong>
              <div class="card-meta">${u.description}</div>
            </div>
            ${f?'<span class="pill-tag cleared">Ativa</span>':`<button class="hud-btn hud-btn-gold" data-unlock-passive="${h}" ${n.jp>=u.jpCost?"":"disabled"}>⭐ ${u.jpCost} JP</button>`}
          </div>
        `}).join(""),d=[{slot:"weapon",label:"Arma"},{slot:"shield",label:"Escudo"},{slot:"armor",label:"Armadura"},{slot:"accessory",label:"Acessório"}].map(({slot:h,label:u})=>{const f=Ci(n.equipment[h]),g=e.inventory.map((p,v)=>({eq:Ci(p),idx:v})).filter(p=>p.eq&&p.eq.slot===h&&(!p.eq.allowedJobs||p.eq.allowedJobs.includes(n.jobId))),x=Array.from(new Map(g.map(p=>[p.eq.id,p.eq])).values()),m=x.map(p=>`<option value="${p.id}">${p.name} (Nv.${p.tier})</option>`).join("");return`
          <div class="card-row" style="padding:6px;background:rgba(15,23,42,0.7);border-radius:6px;">
            <div>
              <strong>${u}:</strong> ${f?`<span style="color:#fde68a">${f.name}</span>`:'<span style="color:#64748b">Vazio</span>'}
              <div class="card-meta">${f?f.description:"Selecione um item do inventário"}</div>
            </div>
            <div style="display:flex;gap:4px;align-items:center;">
              ${x.length>0?`<select data-equip-select="${h}" style="background:#0f172a;color:#f1f5f9;border:1px solid #475569;border-radius:4px;padding:4px;font-size:11px;">
                       <option value="">Equipar...</option>${m}
                     </select>`:""}
              ${f?`<button class="hud-btn" data-unequip-slot="${h}">Remover</button>`:""}
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
            <h3>${a.icon} ${n.name} — ${a.name} (Nível ${n.level})</h3>
            <span class="gold-pill">⭐ ${n.jp} JP</span>
          </div>
          <div class="card-meta">
            HP: <strong>${r.hp}</strong> • MP: <strong>${r.mp}</strong> • ATK: <strong>${r.atk}</strong> • MAG: <strong>${r.mag}</strong> • DEF: <strong>${r.def}</strong> • SPD: <strong>${r.speed}</strong> • MOV: <strong>${r.move}</strong> • JUMP: <strong>${r.jump}</strong>
          </div>
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Equipamentos</div>
          ${d}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Habilidades de Classe</div>
          ${o}
          <div style="font-size:12px;font-weight:700;color:#e2b154;margin-top:6px;">Melhorias Passivas Permanentes</div>
          ${l}
        </div>
      </div>
    `}bindSquadEvents(){this.bodyEl.querySelectorAll("[data-select-hero]").forEach(e=>{e.addEventListener("click",t=>{t.target.closest("button")||(this.selectedHeroUid=e.dataset.selectHero??null,this.render())})}),this.bodyEl.querySelectorAll("[data-toggle-deploy]").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const i=this.campaign.toggleDeployHero(e.dataset.toggleDeploy);!i.ok&&i.reason?this.setToast(i.reason):this.render()})}),this.bodyEl.querySelectorAll("[data-unlock-skill]").forEach(e=>{e.addEventListener("click",()=>{if(!this.selectedHeroUid)return;const t=this.campaign.unlockSkillWithJP(this.selectedHeroUid,e.dataset.unlockSkill);this.setToast(t.ok?"Habilidade desbloqueada com sucesso!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-unlock-passive]").forEach(e=>{e.addEventListener("click",()=>{if(!this.selectedHeroUid)return;const t=this.campaign.upgradePassiveWithJP(this.selectedHeroUid,e.dataset.unlockPassive);this.setToast(t.ok?"Passiva aprendida!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-equip-select]").forEach(e=>{e.addEventListener("change",()=>{if(!this.selectedHeroUid||!e.value)return;const t=this.campaign.equipItem(this.selectedHeroUid,e.value);this.setToast(t.ok?"Equipamento atualizado!":t.reason??"Erro")})}),this.bodyEl.querySelectorAll("[data-unequip-slot]").forEach(e=>{e.addEventListener("click",()=>{this.selectedHeroUid&&(this.campaign.unequipSlot(this.selectedHeroUid,e.dataset.unequipSlot),this.render())})})}renderShopTab(){const e=this.campaign.getData(),t=Fc.map(n=>{const a=It[n];return`
        <div class="card-box">
          <div class="card-row">
            <strong>${a.icon} ${a.name}</strong>
            <button class="hud-btn hud-btn-gold" data-recruit-job="${n}" ${e.gold>=220?"":"disabled"}>Recrutar (🪙 220)</button>
          </div>
          <div class="card-meta">${a.title} • HP ${a.baseStats.hp} • MOV ${a.baseStats.move} • JUMP ${a.baseStats.jump}</div>
        </div>
      `}).join(""),i=Ur.map(n=>{const a=e.inventory.filter(o=>o===n.id).length,r=n.allowedJobs?n.allowedJobs.map(o=>It[o].name.split(" ")[0]).join(", "):"Todas as Classes";return`
        <div class="card-box">
          <div class="card-row">
            <strong>${n.name}</strong>
            <span class="pill-tag">Nv.${n.tier}</span>
          </div>
          <div class="card-meta">${n.description}</div>
          <div class="card-meta">Uso: ${r} ${a>0?`• No baú: ${a}`:""}</div>
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
    `}bindShopEvents(){this.bodyEl.querySelectorAll("[data-recruit-job]").forEach(e=>{e.addEventListener("click",()=>{const t=this.campaign.recruitHero(e.dataset.recruitJob);t.ok&&t.hero?(this.selectedHeroUid=t.hero.uid,this.setToast(`${t.hero.name} (${It[t.hero.jobId].name}) juntou-se ao esquadrão!`)):this.setToast(t.reason??"Erro ao recrutar.")})}),this.bodyEl.querySelectorAll("[data-buy-eq]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.buyEq,i=this.campaign.buyEquipment(t),n=Ci(t);this.setToast(i.ok?`${n?.name} adicionado ao inventário!`:i.reason??"Erro.")})})}}const Qg={grass:"Grama",stone:"Pedra",cobble:"Calçamento",wood:"Madeira",water:"Água",lava:"Lava",snow:"Neve",ice:"Gelo",swamp:"Pântano (Custo 2)",obsidian:"Obsidiana",carpet:"Tapete Real",metal:"Metal"},jg={N:"Norte (N)",S:"Sul (S)",E:"Leste (L)",W:"Oeste (O)"};class Dl{campaign;audio;battlefield;barracks;engine;phase="busy";isBusy=!1;busySinceMs=0;battleSessionId=0;moveMap=new Map;selectedSkill=null;targetableSet=new Set;speedScale=1;graphicsPreset="HIGH";stageBonusGold=0;stageBonusJp=0;skillsMenuOpen=!1;hudHidden=!1;heroCollapsed=!1;targetCollapsed=!1;pendingTargetCell=null;floatBarEls=new Map;topHudEl=document.getElementById("top-hud");activeHeroPanelEl=document.getElementById("active-hero-panel");activeHeroBodyEl=document.getElementById("active-hero-body");targetPanelEl=document.getElementById("target-forecast-panel");restoreHudBtnEl=document.getElementById("btn-restore-hud");openTargetPillEl=document.getElementById("btn-open-target");floatingLayer=document.getElementById("floating-layer");ctbTimelineEl=document.getElementById("ctb-timeline");castBannerEl=document.getElementById("cast-banner");skillsSubmenuEl=document.getElementById("skills-submenu");skillsListEl=document.getElementById("skills-list");facingSubmenuEl=document.getElementById("facing-submenu");constructor(){this.campaign=new Vc,this.audio=new zc;const e=document.getElementById("game-canvas");this.battlefield=new Jg(e,{onTileHover:(i,n)=>this.handleTileHover(i,n),onTileClick:(i,n)=>{this.handleTileClick(i,n)},onFacingClick:i=>{this.confirmFacing(i)},onUnitProjections:i=>this.updateFloatingBars(i),onFrameTick:i=>this.checkBusyWatchdog(i)}),this.barracks=new Zg(this.campaign,i=>this.startStage(i),()=>this.refreshHudHeader()),this.graphicsPreset=this.battlefield.getGraphicsPreset();const t=document.getElementById("btn-graphics");t&&(t.textContent=`⚙️ GRÁFICOS: ${this.graphicsPreset}`),window.innerWidth<=768&&this.setTargetCollapsed(!0),this.bindUiControls(),this.syncHudHeightVar(),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.syncHudHeightVar()).observe(this.topHudEl),window.addEventListener("resize",()=>this.syncHudHeightVar()),window.addEventListener("orientationchange",()=>this.syncHudHeightVar()),this.startStage(this.campaign.getData().selectedStageId||1)}setBusy(e){this.isBusy=e,this.busySinceMs=e?performance.now():0,e&&(this.phase="busy")}syncHudHeightVar(){const e=this.topHudEl.classList.contains("hidden")?12:Math.ceil(this.topHudEl.getBoundingClientRect().bottom+8);document.documentElement.style.setProperty("--top-hud-height",`${e}px`)}setHudHidden(e){this.hudHidden=e,this.topHudEl.classList.toggle("hidden",e),this.activeHeroPanelEl.classList.toggle("hidden",e),this.targetPanelEl.classList.toggle("hidden",e||this.targetCollapsed),this.openTargetPillEl.classList.toggle("hidden",e||!this.targetCollapsed),this.restoreHudBtnEl.classList.toggle("hidden",!e),this.syncHudHeightVar()}setHeroCollapsed(e){this.heroCollapsed=e,this.activeHeroBodyEl.classList.toggle("hidden",e),this.activeHeroPanelEl.classList.toggle("collapsed",e);const t=document.getElementById("btn-collapse-hero");t&&(t.textContent=e?"▴":"▾")}setTargetCollapsed(e){this.targetCollapsed=e,this.targetPanelEl.classList.toggle("hidden",this.hudHidden||e),this.openTargetPillEl.classList.toggle("hidden",this.hudHidden||!e)}bindUiControls(){const e=()=>this.audio.unlockAndStartMusic();window.addEventListener("pointerdown",e,{once:!0}),window.addEventListener("keydown",e,{once:!0}),document.getElementById("btn-rot-left")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.battlefield.rotate90(-1)}),document.getElementById("btn-rot-right")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.battlefield.rotate90(1)});const t=document.getElementById("btn-speed");t.addEventListener("click",()=>{this.speedScale=this.speedScale===1?2:1,this.battlefield.setTimeScale(this.speedScale),t.textContent=`⚡ ${this.speedScale}x`,this.audio.playUiConfirm()});const i=document.getElementById("btn-graphics");i?.addEventListener("click",()=>{const a=["HIGH","LOW","MEDIUM"],r=(a.indexOf(this.graphicsPreset)+1)%a.length;this.graphicsPreset=a[r],this.battlefield.setGraphicsPreset(this.graphicsPreset),i.textContent=`⚙️ GRÁFICOS: ${this.graphicsPreset}`,this.audio.playUiConfirm()});const n=document.getElementById("btn-mute");n.addEventListener("click",()=>{const a=this.audio.toggleMute();n.textContent=a?"🔇":"🔊"}),document.getElementById("btn-open-barracks")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.barracks.show("campaign")}),document.getElementById("btn-toggle-hud")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHudHidden(!0)}),this.restoreHudBtnEl.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHudHidden(!1)}),document.getElementById("btn-collapse-hero")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setHeroCollapsed(!this.heroCollapsed)}),document.getElementById("btn-collapse-target")?.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setTargetCollapsed(!0)}),this.openTargetPillEl.addEventListener("click",()=>{this.audio.playUiConfirm(),this.setTargetCollapsed(!1)}),document.getElementById("btn-close-skills")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const a=this.engine.getActiveUnit();this.audio.playUiCancel(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.phase==="target"&&(this.phase="command"),this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),a&&this.updateCommandMenuButtons(a)}),document.getElementById("btn-close-facing")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const a=this.engine.getActiveUnit();this.audio.playUiCancel(),this.phase==="SELECT_FACING"&&(this.phase="command"),this.battlefield.showFacingCompass(null),a&&this.updateCommandMenuButtons(a)}),document.getElementById("btn-confirm-forecast")?.addEventListener("click",()=>{!this.isBusy&&this.pendingTargetCell&&this.phase==="target"&&this.selectedSkill&&this.executeTargetedSkillAt(this.pendingTargetCell.col,this.pendingTargetCell.row)}),document.getElementById("cmd-move")?.addEventListener("click",()=>this.enterMoveMode()),document.getElementById("cmd-attack")?.addEventListener("click",()=>this.enterBasicAttackMode()),document.getElementById("cmd-skills")?.addEventListener("click",()=>this.toggleSkillsMenu()),document.getElementById("cmd-wait")?.addEventListener("click",()=>this.waitAction()),document.getElementById("btn-confirm-facing")?.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const a=this.engine.getActiveUnit();a&&a.team==="ally"&&this.phase==="SELECT_FACING"&&this.confirmFacing(a.facing)}),document.querySelectorAll(".face-btn").forEach(a=>{a.addEventListener("click",()=>{if(this.isBusy||this.phase==="ended")return;const r=a.dataset.facing;r&&this.confirmFacing(r)})}),window.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" "&&a.code!=="Space"||this.isBusy||this.phase!=="SELECT_FACING")return;const r=!document.getElementById("barracks-modal")?.classList.contains("hidden"),o=!document.getElementById("result-modal")?.classList.contains("hidden");if(r||o)return;const l=this.engine?.getActiveUnit();!l||l.team!=="ally"||(a.preventDefault(),this.confirmFacing(l.facing))}),document.getElementById("btn-result-barracks")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden"),this.barracks.show("squad")}),document.getElementById("btn-result-replay")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden"),this.startStage(this.engine.stage.id)}),document.getElementById("btn-result-next")?.addEventListener("click",()=>{document.getElementById("result-modal")?.classList.add("hidden");const a=Math.min(5,this.engine.stage.id+1);this.campaign.selectStage(a),this.startStage(a)})}startStage(e){this.battleSessionId++;const t=kc(e),i=this.campaign.getDeployedHeroes();this.engine=new Zc(t,i),this.stageBonusGold=0,this.stageBonusJp=0,this.isBusy=!1,this.busySinceMs=0,this.phase="busy",this.selectedSkill=null,this.pendingTargetCell=null,this.skillsMenuOpen=!1;for(const n of this.floatBarEls.values())n.remove();this.floatBarEls.clear(),document.getElementById("result-modal")?.classList.add("hidden"),this.battlefield.loadStage(this.engine),this.battlefield.syncFromEngine(this.engine),this.refreshHudHeader(),this.renderCTBTimeline(),requestAnimationFrame(()=>this.syncHudHeightVar()),this.advanceTurn()}refreshHudHeader(){const e=this.engine.stage;document.getElementById("hud-stage-kicker").textContent=e.subtitle.toUpperCase(),document.getElementById("hud-stage-title").textContent=e.name,document.getElementById("hud-turn-badge").textContent=`Turno ${Math.max(1,this.engine.turnCount)}`,document.getElementById("hud-gold-badge").textContent=`🪙 ${this.campaign.getData().gold}`}renderCTBTimeline(e,t,i){let n;const a=this.engine.getActiveUnit();if(e&&a&&t!==void 0&&i!==void 0){const o=this.engine.getAoeTiles(t,i,e,a.col,a.row),l=[],c=[];for(const d of o){const h=this.engine.getUnitAt(d.col,d.row);if(h){if(e.buffType==="haste"&&h.team===a.team)l.push(h.id);else if(e.statusEffect==="slow"&&h.team!==a.team)l.push(h.id);else if(!e.isHeal&&!e.isBuff&&h.team!==a.team){const u=this.engine.computeCombatForecast(a,e,h.col,h.row);u&&u.predictedDamage>=h.hp&&c.push(h.id)}}}(l.length>0||c.length>0)&&(n={targetUnitIds:l,ctDelta:e.ctBoost,speedMult:e.buffType==="haste"?1.4:e.statusEffect==="slow"?.65:void 0,assumeDefeatedIds:c})}const r=Kc(this.engine.units,10,n);this.ctbTimelineEl.innerHTML=r.map((o,l)=>{const c=It[o.jobId];return`
          <div class="${["ctb-slot",o.team,o.isBoss?"boss":"",l===0?"first":"",n?.targetUnitIds.includes(o.unitId)?"hasted":""].filter(Boolean).join(" ")}" title="${o.name} (${c.name})">
            <span class="ctb-icon">${c.icon}</span>
            <span class="ctb-name">${o.name.split(" ")[0]}</span>
          </div>
        `}).join(""),requestAnimationFrame(()=>this.syncHudHeightVar())}async showCastBanner(e,t=1500){this.castBannerEl.textContent=e,this.castBannerEl.classList.remove("hidden"),await new Promise(i=>setTimeout(i,t/this.speedScale)),this.castBannerEl.classList.add("hidden")}async advanceTurn(){if(this.phase==="ended")return;const e=this.battleSessionId;this.setBusy(!0);try{for(;e===this.battleSessionId&&!this.engine.combatEnded&&this.phase!=="ended";){this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.busySinceMs=performance.now();const t=this.engine.advanceToNextTurn();for(const a of t.burnDamageEvents){const r=this.engine.getUnit(a.unitId);r&&this.spawnUnitTextPopup(r,`-${a.damage} 🔥`,"fall")}for(const a of t.poisonDamageEvents){const r=this.engine.getUnit(a.unitId);r&&this.spawnUnitTextPopup(r,`-${a.damage} ☠️`,"fall")}if(t.detonatedMeteor){const a=t.detonatedMeteor,r=It.belias_boss.skills[2],o=this.engine.getAoeTiles(a.centerCol,a.centerRow,r);if(this.battlefield.focusOnTile(a.centerCol,a.centerRow),this.audio.playSkillSfx(r),this.showCastBanner("☄️ APOCALYPSE METEOR DETONOU!",1800),await this.battlefield.animateUnitSkill("e5_belias",r,a.centerCol,a.centerRow,o),e!==this.battleSessionId)return;for(const l of a.hits){const c=this.engine.getUnit(l.targetId);c&&(this.battlefield.triggerHitFeedback(c.id,!0,!1,l.killed),this.spawnUnitTextPopup(c,`-${l.damage} ☄️`,"crit"))}this.battlefield.syncFromEngine(this.engine)}const i=this.engine.checkVictoryCondition();if(i){this.handleBattleEnd(i);return}const n=t.activeUnit;if(!n)return;if(this.battlefield.syncFromEngine(this.engine),this.battlefield.focusOnTile(n.col,n.row),this.refreshHudHeader(),this.renderCTBTimeline(),this.renderActiveHeroPanel(n),n.team==="ally"){this.phase="command",this.skillsMenuOpen=!1;return}await this.executeEnemyTurn(n,e)}}catch(t){console.error("[GameController] Error in advanceTurn:",t)}finally{if(e===this.battleSessionId){this.isBusy=!1,this.busySinceMs=0;const t=this.engine.checkVictoryCondition();if(t&&this.phase!=="ended")this.handleBattleEnd(t);else if(this.phase!=="ended"){const i=this.engine.getActiveUnit();i&&i.team==="ally"?(this.phase==="busy"&&(this.phase="command"),this.renderActiveHeroPanel(i),this.updateCommandMenuButtons(i)):i&&i.team==="enemy"&&(this.engine.endUnitTurn(i.facing),this.battlefield.syncFromEngine(this.engine),queueMicrotask(()=>{this.advanceTurn()}))}}}}renderActiveHeroPanel(e){const t=It[e.jobId];document.getElementById("active-avatar").textContent=t.icon,document.getElementById("active-name").textContent=e.name,document.getElementById("active-lvl").textContent=`Nv. ${e.level}`,document.getElementById("active-job").textContent=`${t.name} • MOV ${e.move} • JUMP ${e.jump}`,document.getElementById("active-hp-fill").style.width=`${e.hp/e.maxHp*100}%`,document.getElementById("active-hp-text").textContent=`${e.hp}/${e.maxHp}`,document.getElementById("active-mp-fill").style.width=`${e.mp/Math.max(1,e.maxMp)*100}%`,document.getElementById("active-mp-text").textContent=`${e.mp}/${e.maxMp}`,document.getElementById("active-ct-fill").style.width=`${Math.min(100,e.ct)}%`,document.getElementById("active-ct-text").textContent=`${Math.round(e.ct)}`;const i=document.getElementById("active-statuses");i.innerHTML=e.statuses.map(r=>`<span class="status-pill">${r.id.toUpperCase()} (${r.turns})</span>`).join("");const n=e.rosterUid?this.campaign.getHero(e.rosterUid):void 0,a=n?[n.equipment.weapon,n.equipment.shield,n.equipment.armor,n.equipment.accessory].map(r=>Ci(r)?.name).filter(Boolean).join(" • "):e.team==="enemy"?"Unidade Inimiga":"";document.getElementById("active-equip-line").textContent=a||"Sem equipamentos extras"}updateCommandMenuButtons(e){const t=e.team==="ally"&&!this.isBusy&&this.phase!=="ended",i=document.getElementById("cmd-move"),n=document.getElementById("cmd-attack"),a=document.getElementById("cmd-skills"),r=document.getElementById("cmd-wait"),o=this.engine.canUnitMove(e),l=!e.hasActedThisTurn&&this.engine.getAvailableSkills(e).length>0;i.disabled=!t||!o,n.disabled=!t||!l,a.disabled=!t||!l,r.disabled=!t,i.classList.toggle("active",this.phase==="move"),n.classList.toggle("active",this.phase==="target"&&!!this.selectedSkill?.isBasic),a.classList.toggle("active",this.skillsMenuOpen||this.phase==="target"&&!this.selectedSkill?.isBasic),r.classList.toggle("active",this.phase==="SELECT_FACING");const c=!e.hasMovedThisTurn&&!e.hasActedThisTurn?40:e.hasMovedThisTurn!==e.hasActedThisTurn?20:0,d=document.getElementById("wait-btn-label");d&&(d.textContent=this.phase==="SELECT_FACING"?"✅ PASSAR VEZ":"🧭 ESPERAR / DIREÇÃO"),document.getElementById("wait-ct-hint").textContent=this.phase==="SELECT_FACING"?"Confirmar / Enter":c>0?`+${c} CT`:"Encerrar turno",document.querySelectorAll(".face-btn").forEach(h=>{h.classList.toggle("selected",h.dataset.facing===e.facing)}),this.skillsSubmenuEl.classList.toggle("hidden",!this.skillsMenuOpen),this.facingSubmenuEl.classList.toggle("hidden",this.phase!=="SELECT_FACING")}enterMoveMode(){const e=this.engine.getActiveUnit();if(!e||e.team!=="ally"||!this.engine.canUnitMove(e)||this.isBusy||this.phase==="busy"||this.phase==="ended")return;this.audio.playUiConfirm(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.phase="move",this.moveMap=this.engine.getMoveRange(e);const t=Array.from(this.moveMap.values()).map(i=>({col:i.col,row:i.row}));this.battlefield.clearHighlights(),this.battlefield.setMoveTiles(t),this.updateCommandMenuButtons(e)}enterBasicAttackMode(){const e=this.engine.getActiveUnit();if(!e||e.team!=="ally"||e.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")return;const t=this.engine.getAvailableSkills(e),i=t.find(n=>n.isBasic)??t[0];i&&(this.skillsMenuOpen=!1,this.enterSkillTargetMode(i))}toggleSkillsMenu(){const e=this.engine.getActiveUnit();if(!(!e||e.team!=="ally"||e.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")){if(this.audio.playUiConfirm(),this.skillsMenuOpen=!this.skillsMenuOpen,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.skillsMenuOpen){const t=this.engine.getAvailableSkills(e);this.skillsListEl.innerHTML=t.map(i=>{const n=e.mp>=i.mpCost;return`
            <button class="skill-choice-btn ${this.selectedSkill?.id===i.id?"active":""}" data-skill-id="${i.id}" ${n?"":"disabled"}>
              <div>
                <div style="font-size:12px;font-weight:700;">${i.name}</div>
                <div style="font-size:10px;color:#94a3b8;">${i.description}</div>
              </div>
              <span class="skill-mp">${i.mpCost} MP</span>
            </button>
          `}).join(""),this.skillsListEl.querySelectorAll("[data-skill-id]").forEach(i=>{i.addEventListener("click",()=>{const n=t.find(a=>a.id===i.dataset.skillId);n&&this.enterSkillTargetMode(n)})})}this.updateCommandMenuButtons(e)}}enterSkillTargetMode(e){const t=this.engine.getActiveUnit();if(!t||t.team!=="ally"||t.hasActedThisTurn||this.isBusy||this.phase==="busy"||this.phase==="ended")return;this.audio.playUiConfirm(),this.selectedSkill=e,this.pendingTargetCell=null,this.phase="target",this.battlefield.showFacingCompass(null);const i=this.engine.getSkillTargetableTiles(t,e);this.targetableSet=new Set(i.map(n=>At(n.col,n.row))),this.battlefield.clearHighlights(),this.battlefield.setAttackTiles(i),this.updateCommandMenuButtons(t)}syncPostActionState(e){if(this.phase==="ended")return;const t=this.engine.getPostActionState(e);if(t==="VICTORY"){this.handleBattleEnd("victory");return}if(t==="DEFEAT"){this.handleBattleEnd("defeat");return}if(t==="SELECT_FACING"){this.enterFacingMode(!1);return}this.phase="command",this.battlefield.showFacingCompass(null),this.renderActiveHeroPanel(e),this.updateCommandMenuButtons(e)}enterFacingMode(e=!0){if(this.isBusy||this.phase==="ended")return;const t=this.engine.getActiveUnit();!t||t.team!=="ally"||(e&&this.audio.playUiConfirm(),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.phase="SELECT_FACING",this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.battlefield.showFacingCompass(t),this.battlefield.focusOnTile(t.col,t.row),this.heroCollapsed&&this.setHeroCollapsed(!1),this.renderActiveHeroPanel(t),this.updateCommandMenuButtons(t),requestAnimationFrame(()=>{this.facingSubmenuEl.scrollIntoView({block:"nearest",behavior:"smooth"})}))}waitAction(){if(this.isBusy||this.phase==="ended")return;const e=this.engine.getActiveUnit();if(!(!e||e.team!=="ally")){if(this.phase==="SELECT_FACING"){this.confirmFacing(e.facing);return}this.enterFacingMode(!0)}}checkBusyWatchdog(e){if(!this.isBusy||this.busySinceMs<=0||this.phase==="ended"||e-this.busySinceMs<=4e3)return;console.warn("[GameController] Watchdog released stuck busy lock after 4.0s."),this.isBusy=!1,this.busySinceMs=0,this.battlefield.isAnimating=!1,this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.battlefield.syncFromEngine(this.engine);const t=this.engine.checkVictoryCondition();if(t){this.handleBattleEnd(t);return}const i=this.engine.getActiveUnit();if(!i||i.hp<=0){this.advanceTurn();return}if(i.team==="enemy"){this.engine.endUnitTurn(i.facing),this.battlefield.syncFromEngine(this.engine),this.renderCTBTimeline(),this.advanceTurn();return}this.syncPostActionState(i)}handleTileHover(e,t){if(e===null||t===null){this.battlefield.setAoeTiles([]),this.battlefield.setParabolicArc(null,null),this.hideForecast();return}const i=this.engine.getTile(e,t);i&&(document.getElementById("tile-coords").textContent=`Tile (${e}, ${t})`,document.getElementById("tile-height-badge").textContent=`H: ${i.height}`,document.getElementById("tile-surface-badge").textContent=Qg[i.surface]??i.surface);const n=this.engine.getUnitAt(e,t,!0),a=document.getElementById("target-unit-box");if(n){const o=It[n.jobId];a.classList.remove("hidden"),document.getElementById("target-avatar").textContent=o.icon,document.getElementById("target-name").textContent=n.name,document.getElementById("target-lvl").textContent=`Nv. ${n.level}`,document.getElementById("target-job").textContent=n.hp<=0?`${o.name} (CAÍDO)`:o.name,document.getElementById("target-facing-text").textContent=`Olhando: ${jg[n.facing]}`,document.getElementById("target-hp-fill").style.width=`${n.hp/n.maxHp*100}%`,document.getElementById("target-hp-text").textContent=`${n.hp}/${n.maxHp}`,document.getElementById("target-mp-fill").style.width=`${n.mp/Math.max(1,n.maxMp)*100}%`,document.getElementById("target-mp-text").textContent=`${n.mp}/${n.maxMp}`}else a.classList.add("hidden");const r=this.engine.getActiveUnit();if(this.phase==="target"&&r&&this.selectedSkill&&this.targetableSet.has(At(e,t))){const o=this.engine.getAoeTiles(e,t,this.selectedSkill,r.col,r.row);this.battlefield.setAoeTiles(o),this.battlefield.setParabolicArc({col:r.col,row:r.row},{col:e,row:t},this.selectedSkill.isHeal?4906624:16436245),this.renderCTBTimeline(this.selectedSkill,e,t);const l=this.engine.computeCombatForecast(r,this.selectedSkill,e,t);l?(this.pendingTargetCell={col:e,row:t},!this.hudHidden&&this.targetCollapsed&&this.setTargetCollapsed(!1),this.showForecast(l.formattedBanner)):(this.pendingTargetCell=null,this.hideForecast())}else this.battlefield.setAoeTiles([]),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.renderCTBTimeline()}showForecast(e){document.getElementById("forecast-card").classList.remove("hidden"),document.getElementById("forecast-banner").textContent=e}hideForecast(){document.getElementById("forecast-card").classList.add("hidden")}async handleTileClick(e,t){if(this.isBusy||this.phase==="busy"||this.phase==="ended")return;const i=this.engine.getActiveUnit();if(!(!i||i.team!=="ally")){if(this.phase==="move"){const n=this.moveMap.get(At(e,t));if(!n){this.audio.playUiCancel();return}const a=this.battleSessionId;this.setBusy(!0),this.battlefield.clearHighlights(),this.updateCommandMenuButtons(i);try{if(await this.battlefield.animateUnitMovePath(i.id,n.path,()=>{this.audio.playStep()}),a!==this.battleSessionId)return;const r=this.engine.moveUnit(i,e,t);if(r.openedChest){this.audio.playVictoryFanfare(),this.campaign.addGold(r.openedChest.gold),this.stageBonusGold+=r.openedChest.gold,r.openedChest.itemId&&this.campaign.addInventoryItem(r.openedChest.itemId);const o=Ci(r.openedChest.itemId)?.name;this.showCastBanner(`📦 BAÚ ABERTO! +${r.openedChest.gold} 🪙${o?` + ${o}!`:""}`,2100),this.refreshHudHeader()}this.campaign.awardActionEXPAndJP(i.rosterUid,12,10),this.battlefield.syncFromEngine(this.engine)}catch(r){console.error("[GameController] Error during move sequence:",r)}finally{a===this.battleSessionId&&(this.isBusy=!1,this.busySinceMs=0,this.syncPostActionState(i))}return}if(this.phase==="target"&&this.selectedSkill){if(!this.targetableSet.has(At(e,t))){this.audio.playUiCancel();return}if(!this.engine.computeCombatForecast(i,this.selectedSkill,e,t)&&this.selectedSkill.aoeShape!=="self"){this.audio.playUiCancel();return}if(Ir()&&(!this.pendingTargetCell||this.pendingTargetCell.col!==e||this.pendingTargetCell.row!==t)){this.audio.playUiConfirm(),this.handleTileHover(e,t);return}await this.executeTargetedSkillAt(e,t)}}}async executeTargetedSkillAt(e,t){if(this.isBusy||this.phase==="ended")return;const i=this.engine.getActiveUnit();if(!i||i.team!=="ally"||!this.selectedSkill||this.phase!=="target")return;if(!this.targetableSet.has(At(e,t))){this.audio.playUiCancel();return}if(!this.engine.computeCombatForecast(i,this.selectedSkill,e,t)&&this.selectedSkill.aoeShape!=="self"){this.audio.playUiCancel();return}const a=this.selectedSkill,r=this.battleSessionId;this.setBusy(!0),this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.updateCommandMenuButtons(i);try{const o=this.engine.getAvailableSkills(i).find(h=>h.isBasic)?.id,l=a.isBasic&&a.id===o?this.engine.executeAttack(i,e,t)??this.engine.executeSkill(i,a,e,t):this.engine.executeSkill(i,a,e,t);if(this.audio.playSkillSfx(a),(a.jpCost>0||!a.isBasic)&&this.showCastBanner(`✨ ${i.name.toUpperCase()} CONJURA: ${a.name.toUpperCase()}!`,1350),await this.battlefield.animateUnitSkill(i.id,a,e,t,l.aoeTiles),r!==this.battleSessionId)return;let c=24,d=22;for(const h of l.hits){const u=this.engine.getUnit(h.targetId);u&&(h.isBlocked?(this.audio.playShieldBlock(),this.battlefield.triggerHitFeedback(u.id,!1,!0,!1),this.spawnUnitTextPopup(u,"BLOQUEADO!","block")):h.isEvaded?this.spawnUnitTextPopup(u,"ESQUIVOU!","block"):h.revived?(this.spawnUnitTextPopup(u,`REVIVE +${h.healed}`,"heal"),c+=25,d+=20):h.healed>0?(this.spawnUnitTextPopup(u,`+${h.healed} HP`,"heal"),c+=16,d+=15):h.mpRestored>0?this.spawnUnitTextPopup(u,`+${h.mpRestored} MP`,"heal"):h.appliedStatus&&h.damage===0?this.spawnUnitTextPopup(u,`${h.appliedStatus.toUpperCase()}!`,"heal"):(h.isCrit&&this.audio.playCriticalHit(),this.battlefield.triggerHitFeedback(u.id,h.isCrit,!1,h.killed),this.spawnUnitTextPopup(u,h.isCrit?`CRÍTICO! -${h.damage}`:`-${h.damage}`,h.isCrit?"crit":"normal"),h.fallDamage>0&&this.spawnUnitTextPopup(u,`QUEDA! -${h.fallDamage}`,"fall"),h.killed&&(this.stageBonusGold+=u.isBoss?120:45,this.stageBonusJp+=25,this.campaign.addGold(u.isBoss?120:45),c+=40,d+=35)))}this.campaign.awardActionEXPAndJP(i.rosterUid,c,d),this.battlefield.syncFromEngine(this.engine),this.renderActiveHeroPanel(i),this.renderCTBTimeline()}catch(o){console.error("[GameController] Error during skill/attack execution:",o)}finally{if(r===this.battleSessionId){this.isBusy=!1,this.busySinceMs=0;const o=this.engine.checkVictoryCondition();o?this.handleBattleEnd(o):this.syncPostActionState(i)}}}async confirmFacing(e){if(this.isBusy||this.phase==="ended")return;const t=this.engine.getActiveUnit();if(!(!t||t.team!=="ally")){try{this.audio.playUiConfirm()}catch{}this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.engine.endUnitTurn(e),this.battlefield.syncFromEngine(this.engine),this.renderCTBTimeline(),await this.advanceTurn()}}async executeEnemyTurn(e,t){let i=e.facing;try{this.busySinceMs=performance.now();const n=Qc.chooseBestAction(this.engine,e);if(i=n.endFacing,n.moveCol!==e.col||n.moveRow!==e.row){if(await this.battlefield.animateUnitMovePath(e.id,n.movePath,()=>{this.audio.playStep()}),t!==this.battleSessionId)return;this.engine.moveUnit(e,n.moveCol,n.moveRow),this.battlefield.syncFromEngine(this.engine)}if(n.skill){if(this.busySinceMs=performance.now(),this.battlefield.focusOnTile(n.targetCol,n.targetRow),await this.showCastBanner(`⚔️ ${e.name.toUpperCase()} CONJURA: ${n.skill.name.toUpperCase()}!`,1450),t!==this.battleSessionId)return;const a=this.engine.executeSkill(e,n.skill,n.targetCol,n.targetRow);if(this.audio.playSkillSfx(n.skill),await this.battlefield.animateUnitSkill(e.id,n.skill,n.targetCol,n.targetRow,a.aoeTiles),t!==this.battleSessionId)return;a.telegraphedMeteor&&this.showCastBanner("🔥 CHÃO MARCADO! SAIA DA ÁREA EM 1 TURNO!",1750);for(const r of a.hits){const o=this.engine.getUnit(r.targetId);o&&(r.isBlocked?(this.audio.playShieldBlock(),this.battlefield.triggerHitFeedback(o.id,!1,!0,!1),this.spawnUnitTextPopup(o,"BLOQUEADO!","block")):r.isEvaded?this.spawnUnitTextPopup(o,"ESQUIVOU!","block"):r.healed>0?this.spawnUnitTextPopup(o,`+${r.healed}`,"heal"):r.damage>0&&(r.isCrit&&this.audio.playCriticalHit(),this.battlefield.triggerHitFeedback(o.id,r.isCrit,!1,r.killed),this.spawnUnitTextPopup(o,r.isCrit?`CRÍTICO! -${r.damage}`:`-${r.damage}`,r.isCrit?"crit":"normal"),r.fallDamage>0&&this.spawnUnitTextPopup(o,`QUEDA! -${r.fallDamage}`,"fall")),r.lifesteal>0&&this.spawnUnitTextPopup(e,`+${r.lifesteal}`,"heal"))}this.battlefield.syncFromEngine(this.engine)}}catch(n){console.error("[GameController] Error during enemy turn:",n)}finally{if(t===this.battleSessionId){const n=this.engine.checkVictoryCondition();n?this.handleBattleEnd(n):(this.engine.activeUnitId===e.id&&(this.engine.endUnitTurn(i),this.battlefield.syncFromEngine(this.engine)),await new Promise(a=>setTimeout(a,260/this.speedScale)))}}}handleBattleEnd(e){this.isBusy=!1,this.busySinceMs=0,this.phase="ended",this.skillsMenuOpen=!1,this.selectedSkill=null,this.pendingTargetCell=null,this.battlefield.clearHighlights(),this.battlefield.showFacingCompass(null),this.battlefield.setParabolicArc(null,null),this.hideForecast(),this.skillsSubmenuEl.classList.add("hidden"),this.facingSubmenuEl.classList.add("hidden");const t=document.getElementById("result-modal"),i=document.getElementById("result-kicker"),n=document.getElementById("result-title"),a=document.getElementById("result-desc"),r=document.getElementById("result-rewards"),o=document.getElementById("btn-result-next");if(e==="victory"){this.audio.playVictoryFanfare();const l=this.campaign.completeStage(this.engine.stage.id,this.stageBonusGold,this.stageBonusJp);i.textContent=`FASE ${this.engine.stage.id} CONCLUÍDA`,n.textContent=this.engine.stage.id===5?"COROA CONQUISTADA!":"STAGE CLEAR!",a.textContent=this.engine.stage.id===5?"Belias, o Titã das Cinzas, tombou! Você conquistou o Santuário do Trono das Cinzas e venceu a campanha!":`Vitória tática em ${this.engine.stage.name}! A próxima fase da campanha foi desbloqueada.`,r.innerHTML=`🪙 Ouro Ganho: <strong>+${l.goldEarned}</strong> &nbsp;|&nbsp; ⭐ Job Points: <strong>+${l.jpEarned} JP</strong>`,o.classList.toggle("hidden",this.engine.stage.id>=5)}else this.audio.playDefeatChord(),i.textContent="ESQUADRAO CAÍDO",n.textContent="DERROTA TÁTICA",a.textContent="Seus heróis foram derrotados. Fortaleça armas e habilidades no Quartel ou tente novamente!",r.innerHTML="💡 Dica: Use flanqueamento pelas Costas (+50%), Vantagem de Altura e empurre inimigos de penhascos.",o.classList.add("hidden");this.refreshHudHeader(),t.classList.remove("hidden")}spawnUnitTextPopup(e,t,i){const n=this.battlefield.getUnitTopScreenPosition(e.id);if(!n||!n.visible)return;const a=document.createElement("div");a.className=`dmg-popup ${i}`,a.textContent=t,a.style.left=`${n.x+(Math.random()-.5)*28}px`,a.style.top=`${n.y-14}px`,this.floatingLayer.appendChild(a),setTimeout(()=>a.remove(),1180)}updateFloatingBars(e){const t=this.topHudEl.classList.contains("hidden")?null:this.topHudEl.getBoundingClientRect(),i=this.activeHeroPanelEl.classList.contains("hidden")?null:this.activeHeroPanelEl.getBoundingClientRect(),n=this.targetPanelEl.classList.contains("hidden")?null:this.targetPanelEl.getBoundingClientRect(),a=(r,o,l)=>l!==null&&r>=l.left-34&&r<=l.right+34&&o>=l.top-10&&o<=l.bottom+30;for(const r of e){const o=this.engine.getUnit(r.unitId);if(!o)continue;let l=this.floatBarEls.get(r.unitId);l||(l=document.createElement("div"),l.className=`unit-float-bar ${o.isBoss?"is-boss":""}`,l.innerHTML=`<div class="unit-float-name">${o.name}</div><div class="unit-float-hp-track"><div class="unit-float-hp-fill ${o.isBoss?"boss":o.team}"></div></div>`,this.floatingLayer.appendChild(l),this.floatBarEls.set(r.unitId,l));const c=a(r.x,r.y,t)||a(r.x,r.y,i)||a(r.x,r.y,n);if(!r.visible||o.hp<=0||c){l.style.display="none";continue}l.style.display="block",l.style.left=`${r.x}px`,l.style.top=`${r.y}px`,l.classList.toggle("is-active",this.engine.activeUnitId===o.id);const d=l.querySelector(".unit-float-hp-fill");d.style.width=`${Math.max(0,o.hp/o.maxHp*100)}%`}}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{new Dl}):new Dl;
