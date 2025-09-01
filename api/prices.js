import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// ===== Твой список предметов (сюда вставляешь весь огромный массив) =====

const ITEMS = [
  // ===== Frames =====
  "ash_prime_set","ash_prime_blueprint","ash_prime_chassis_blueprint","ash_prime_neuroptics_blueprint","ash_prime_systems_blueprint",
  "atlas_prime_set","atlas_prime_blueprint","atlas_prime_chassis_blueprint","atlas_prime_neuroptics_blueprint","atlas_prime_systems_blueprint",
  "banshee_prime_set","banshee_prime_blueprint","banshee_prime_chassis_blueprint","banshee_prime_neuroptics_blueprint","banshee_prime_systems_blueprint",
  "baruuk_prime_set","baruuk_prime_blueprint","baruuk_prime_chassis_blueprint","baruuk_prime_neuroptics_blueprint","baruuk_prime_systems_blueprint",
  "chroma_prime_set","chroma_prime_blueprint","chroma_prime_chassis_blueprint","chroma_prime_neuroptics_blueprint","chroma_prime_systems_blueprint",
  "ember_prime_set","ember_prime_blueprint","ember_prime_chassis_blueprint","ember_prime_neuroptics_blueprint","ember_prime_systems_blueprint",
  "equinox_prime_set","equinox_prime_blueprint","equinox_prime_chassis_blueprint","equinox_prime_neuroptics_blueprint","equinox_prime_systems_blueprint",
  "frost_prime_set","frost_prime_blueprint","frost_prime_chassis_blueprint","frost_prime_neuroptics_blueprint","frost_prime_systems_blueprint",
  "gara_prime_set","gara_prime_blueprint","gara_prime_chassis_blueprint","gara_prime_neuroptics_blueprint","gara_prime_systems_blueprint",
  "garuda_prime_set","garuda_prime_blueprint","garuda_prime_chassis_blueprint","garuda_prime_neuroptics_blueprint","garuda_prime_systems_blueprint",
  "gauss_prime_set","gauss_prime_blueprint","gauss_prime_chassis_blueprint","gauss_prime_neuroptics_blueprint","gauss_prime_systems_blueprint",
  "grendel_prime_set","grendel_prime_blueprint","grendel_prime_chassis_blueprint","grendel_prime_neuroptics_blueprint","grendel_prime_systems_blueprint",
  "harrow_prime_set","harrow_prime_blueprint","harrow_prime_chassis_blueprint","harrow_prime_neuroptics_blueprint","harrow_prime_systems_blueprint",
  "hildryn_prime_set","hildryn_prime_blueprint","hildryn_prime_chassis_blueprint","hildryn_prime_neuroptics_blueprint","hildryn_prime_systems_blueprint",
  "hydroid_prime_set","hydroid_prime_blueprint","hydroid_prime_chassis_blueprint","hydroid_prime_neuroptics_blueprint","hydroid_prime_systems_blueprint",
  "inaros_prime_set","inaros_prime_blueprint","inaros_prime_chassis_blueprint","inaros_prime_neuroptics_blueprint","inaros_prime_systems_blueprint",
  "ivara_prime_set","ivara_prime_blueprint","ivara_prime_chassis_blueprint","ivara_prime_neuroptics_blueprint","ivara_prime_systems_blueprint",
  "khora_prime_set","khora_prime_blueprint","khora_prime_chassis_blueprint","khora_prime_neuroptics_blueprint","khora_prime_systems_blueprint",
  "lavos_prime_set","lavos_prime_blueprint","lavos_prime_chassis_blueprint","lavos_prime_neuroptics_blueprint","lavos_prime_systems_blueprint",
  "limbo_prime_set","limbo_prime_blueprint","limbo_prime_chassis_blueprint","limbo_prime_neuroptics_blueprint","limbo_prime_systems_blueprint",
  "loki_prime_set","loki_prime_blueprint","loki_prime_chassis_blueprint","loki_prime_neuroptics_blueprint","loki_prime_systems_blueprint",
  "mag_prime_set","mag_prime_blueprint","mag_prime_chassis_blueprint","mag_prime_neuroptics_blueprint","mag_prime_systems_blueprint",
  "mesa_prime_set","mesa_prime_blueprint","mesa_prime_chassis_blueprint","mesa_prime_neuroptics_blueprint","mesa_prime_systems_blueprint",
  "mirage_prime_set","mirage_prime_blueprint","mirage_prime_chassis_blueprint","mirage_prime_neuroptics_blueprint","mirage_prime_systems_blueprint",
  "nekros_prime_set","nekros_prime_blueprint","nekros_prime_chassis_blueprint","nekros_prime_neuroptics_blueprint","nekros_prime_systems_blueprint",
  "nezha_prime_set","nezha_prime_blueprint","nezha_prime_chassis_blueprint","nezha_prime_neuroptics_blueprint","nezha_prime_systems_blueprint",
  "nidus_prime_set","nidus_prime_blueprint","nidus_prime_chassis_blueprint","nidus_prime_neuroptics_blueprint","nidus_prime_systems_blueprint",
  "nova_prime_set","nova_prime_blueprint","nova_prime_chassis_blueprint","nova_prime_neuroptics_blueprint","nova_prime_systems_blueprint",
  "nyx_prime_set","nyx_prime_blueprint","nyx_prime_chassis_blueprint","nyx_prime_neuroptics_blueprint","nyx_prime_systems_blueprint",
  "oberon_prime_set","oberon_prime_blueprint","oberon_prime_chassis_blueprint","oberon_prime_neuroptics_blueprint","oberon_prime_systems_blueprint",
  "octavia_prime_set","octavia_prime_blueprint","octavia_prime_chassis_blueprint","octavia_prime_neuroptics_blueprint","octavia_prime_systems_blueprint",
  "protea_prime_set","protea_prime_blueprint","protea_prime_chassis_blueprint","protea_prime_neuroptics_blueprint","protea_prime_systems_blueprint",
  "revenant_prime_set","revenant_prime_blueprint","revenant_prime_chassis_blueprint","revenant_prime_neuroptics_blueprint","revenant_prime_systems_blueprint",
  "rhino_prime_set","rhino_prime_blueprint","rhino_prime_chassis_blueprint","rhino_prime_neuroptics_blueprint","rhino_prime_systems_blueprint",
  "saryn_prime_set","saryn_prime_blueprint","saryn_prime_chassis_blueprint","saryn_prime_neuroptics_blueprint","saryn_prime_systems_blueprint",
  "sevagoth_prime_set","sevagoth_prime_blueprint","sevagoth_prime_chassis_blueprint","sevagoth_prime_neuroptics_blueprint","sevagoth_prime_systems_blueprint",
  "titania_prime_set","titania_prime_blueprint","titania_prime_chassis_blueprint","titania_prime_neuroptics_blueprint","titania_prime_systems_blueprint",
  "trinity_prime_set","trinity_prime_blueprint","trinity_prime_chassis_blueprint","trinity_prime_neuroptics_blueprint","trinity_prime_systems_blueprint",
  "valkyr_prime_set","valkyr_prime_blueprint","valkyr_prime_chassis_blueprint","valkyr_prime_neuroptics_blueprint","valkyr_prime_systems_blueprint",
  "vauban_prime_set","vauban_prime_blueprint","vauban_prime_chassis_blueprint","vauban_prime_neuroptics_blueprint","vauban_prime_systems_blueprint",
  "volt_prime_set","volt_prime_blueprint","volt_prime_chassis_blueprint","volt_prime_neuroptics_blueprint","volt_prime_systems_blueprint",
  "wisp_prime_set","wisp_prime_blueprint","wisp_prime_chassis_blueprint","wisp_prime_neuroptics_blueprint","wisp_prime_systems_blueprint",
  "wukong_prime_set","wukong_prime_blueprint","wukong_prime_chassis_blueprint","wukong_prime_neuroptics_blueprint","wukong_prime_systems_blueprint",
  "xaku_prime_set","xaku_prime_blueprint","xaku_prime_chassis_blueprint","xaku_prime_neuroptics_blueprint","xaku_prime_systems_blueprint",
  "yareli_prime_set","yareli_prime_blueprint","yareli_prime_chassis_blueprint","yareli_prime_neuroptics_blueprint","yareli_prime_systems_blueprint",
  "zephyr_prime_set","zephyr_prime_blueprint","zephyr_prime_chassis_blueprint","zephyr_prime_neuroptics_blueprint","zephyr_prime_systems_blueprint",

  // ===== Primary =====
  "acceltra_prime_set","acceltra_prime_barrel","acceltra_prime_blueprint","acceltra_prime_receiver","acceltra_prime_stock",
  "astilla_prime_set","astilla_prime_barrel","astilla_prime_blueprint","astilla_prime_receiver","astilla_prime_stock",
  "baza_prime_set","baza_prime_barrel","baza_prime_blueprint","baza_prime_receiver","baza_prime_stock",
  "boar_prime_set","boar_prime_barrel","boar_prime_blueprint","boar_prime_receiver","boar_prime_stock",
  "boltor_prime_set","boltor_prime_barrel","boltor_prime_blueprint","boltor_prime_receiver","boltor_prime_stock",
  "braton_prime_set","braton_prime_barrel","braton_prime_blueprint","braton_prime_receiver","braton_prime_stock",
  "burston_prime_set","burston_prime_barrel","burston_prime_blueprint","burston_prime_receiver","burston_prime_stock",
  "cernos_prime_set","cernos_prime_blueprint","cernos_prime_grip","cernos_prime_lower_limb","cernos_prime_string","cernos_prime_upper_limb",
  "corinth_prime_set","corinth_prime_barrel","corinth_prime_blueprint","corinth_prime_receiver","corinth_prime_stock",
  "daikyu_prime_set","daikyu_prime_blueprint","daikyu_prime_grip","daikyu_prime_lower_limb","daikyu_prime_string","daikyu_prime_upper_limb",
  "fulmin_prime_set","fulmin_prime_barrel","fulmin_prime_blueprint","fulmin_prime_receiver","fulmin_prime_stock",
  "latron_prime_set","latron_prime_barrel","latron_prime_blueprint","latron_prime_receiver","latron_prime_stock",
  "nagantaka_prime_set","nagantaka_prime_barrel","nagantaka_prime_blueprint","nagantaka_prime_receiver","nagantaka_prime_stock",
  "panthera_prime_set","panthera_prime_barrel","panthera_prime_blueprint","panthera_prime_receiver","panthera_prime_stock",
  "paris_prime_set","paris_prime_blueprint","paris_prime_grip","paris_prime_lower_limb","paris_prime_string","paris_prime_upper_limb",
  "phantasma_prime_set","phantasma_prime_barrel","phantasma_prime_blueprint","phantasma_prime_receiver","phantasma_prime_stock",
  "rubico_prime_set","rubico_prime_barrel","rubico_prime_blueprint","rubico_prime_receiver","rubico_prime_stock",
  "scourge_prime_set","scourge_prime_barrel","scourge_prime_blade","scourge_prime_blueprint","scourge_prime_handle",
  "soma_prime_set","soma_prime_barrel","soma_prime_blueprint","soma_prime_receiver","soma_prime_stock",
  "stradavar_prime_set","stradavar_prime_barrel","stradavar_prime_blueprint","stradavar_prime_receiver","stradavar_prime_stock",
  "strun_prime_set","strun_prime_barrel","strun_prime_blueprint","strun_prime_receiver","strun_prime_stock",
  "sybaris_prime_set","sybaris_prime_barrel","sybaris_prime_blueprint","sybaris_prime_receiver","sybaris_prime_stock",
  "tenora_prime_set","tenora_prime_barrel","tenora_prime_blueprint","tenora_prime_receiver","tenora_prime_stock",
  "tiberon_prime_set","tiberon_prime_barrel","tiberon_prime_blueprint","tiberon_prime_receiver","tiberon_prime_stock",
  "tigris_prime_set","tigris_prime_barrel","tigris_prime_blueprint","tigris_prime_receiver","tigris_prime_stock",
  "trumna_prime_set","trumna_prime_barrel","trumna_prime_blueprint","trumna_prime_receiver","trumna_prime_stock",
  "vectis_prime_set","vectis_prime_barrel","vectis_prime_blueprint","vectis_prime_receiver","vectis_prime_stock",
  "zhuge_prime_set","zhuge_prime_barrel","zhuge_prime_blueprint","zhuge_prime_grip","zhuge_prime_receiver","zhuge_prime_string",

  // ===== Secondary =====
  "afuris_prime_set","afuris_prime_barrel","afuris_prime_barrel","afuris_prime_blueprint","afuris_prime_link","afuris_prime_receiver","afuris_prime_receiver",
  "akarius_prime_set","akarius_prime_barrel","akarius_prime_barrel","akarius_prime_blueprint","akarius_prime_link","akarius_prime_receiver","akarius_prime_receiver",
  "akbolto_prime_set","akbolto_prime_barrel","akbolto_prime_barrel","akbolto_prime_blueprint","akbolto_prime_link","akbolto_prime_receiver","akbolto_prime_receiver",
  "akbronco_prime_set","akbronco_prime_blueprint","akbronco_prime_link",
  "akjagara_prime_set","akjagara_prime_barrel","akjagara_prime_barrel","akjagara_prime_blueprint","akjagara_prime_link","akjagara_prime_receiver","akjagara_prime_receiver",
  "aklex_prime_set","aklex_prime_blueprint","aklex_prime_link",
  "akmagnus_prime_set","akmagnus_prime_blueprint","akmagnus_prime_link",
  "aksomati_prime_set","aksomati_prime_barrel","aksomati_prime_barrel","aksomati_prime_blueprint","aksomati_prime_link","aksomati_prime_receiver","aksomati_prime_receiver",
  "akstiletto_prime_set","akstiletto_prime_barrel","akstiletto_prime_barrel","akstiletto_prime_blueprint","akstiletto_prime_link","akstiletto_prime_receiver","akstiletto_prime_receiver",
  "akvasto_prime_set","akvasto_prime_blueprint","akvasto_prime_link",
  "ballistica_prime_set","ballistica_prime_blueprint","ballistica_prime_lower_limb","ballistica_prime_receiver","ballistica_prime_string","ballistica_prime_upper_limb",
  "bronco_prime_set","bronco_prime_barrel","bronco_prime_blueprint","bronco_prime_receiver",
  "epitaph_prime_set","epitaph_prime_barrel","epitaph_prime_blueprint","epitaph_prime_receiver",
  "euphona_prime_set","euphona_prime_barrel","euphona_prime_blueprint","euphona_prime_receiver",
  "hikou_prime_set","hikou_prime_blueprint","hikou_prime_pouch","hikou_prime_pouch","hikou_prime_stars","hikou_prime_stars",
  "hystrix_prime_set","hystrix_prime_barrel","hystrix_prime_blueprint","hystrix_prime_receiver",
  "knell_prime_set","knell_prime_barrel","knell_prime_blueprint","knell_prime_receiver",
  "lex_prime_set","lex_prime_barrel","lex_prime_blueprint","lex_prime_receiver",
  "magnus_prime_set","magnus_prime_barrel","magnus_prime_blueprint","magnus_prime_receiver",
  "pandero_prime_set","pandero_prime_barrel","pandero_prime_blueprint","pandero_prime_receiver",
  "pyrana_prime_set","pyrana_prime_barrel","pyrana_prime_blueprint","pyrana_prime_receiver",
  "sicarus_prime_set","sicarus_prime_barrel","sicarus_prime_blueprint","sicarus_prime_receiver",
  "spira_prime_set","spira_prime_blade","spira_prime_blade","spira_prime_blueprint","spira_prime_pouch","spira_prime_pouch",
  "vasto_prime_set","vasto_prime_barrel","vasto_prime_blueprint","vasto_prime_receiver",
  "velox_prime_set","velox_prime_barrel","velox_prime_blueprint","velox_prime_receiver",
  "zakti_prime_set","zakti_prime_barrel","zakti_prime_blueprint","zakti_prime_receiver",
  "zylok_prime_set","zylok_prime_barrel","zylok_prime_blueprint","zylok_prime_receiver",

  // ===== Melee =====
  "ankyros_prime_set","ankyros_prime_blade","ankyros_prime_blade","ankyros_prime_blueprint","ankyros_prime_gauntlet","ankyros_prime_gauntlet",
  "bo_prime_set","bo_prime_blueprint","bo_prime_handle","bo_prime_ornament","bo_prime_ornament",
  "cobra_and_crane_prime_set","cobra_and_crane_prime_blade","cobra_and_crane_prime_blueprint","cobra_and_crane_prime_guard","cobra_and_crane_prime_hilt",
  "dakra_prime_set","dakra_prime_blade","dakra_prime_blueprint","dakra_prime_handle",
  "destreza_prime_set","destreza_prime_blade","destreza_prime_blueprint","destreza_prime_handle",
  "dual_kamas_prime_set","dual_kamas_prime_blade","dual_kamas_prime_blade","dual_kamas_prime_blueprint","dual_kamas_prime_handle","dual_kamas_prime_handle",
  "dual_keres_prime_set","dual_keres_prime_blade","dual_keres_prime_blade","dual_keres_prime_blueprint","dual_keres_prime_handle","dual_keres_prime_handle",
  "fang_prime_set","fang_prime_blade","fang_prime_blade","fang_prime_blueprint","fang_prime_handle","fang_prime_handle",
  "fragor_prime_set","fragor_prime_blueprint","fragor_prime_handle","fragor_prime_head",
  "galatine_prime_set","galatine_prime_blade","galatine_prime_blueprint","galatine_prime_handle",
  "glaive_prime_set","glaive_prime_blade","glaive_prime_blade","glaive_prime_blueprint","glaive_prime_disc","glaive_prime_disc",
  "gram_prime_set","gram_prime_blade","gram_prime_blueprint","gram_prime_handle",
  "guandao_prime_set","guandao_prime_blade","guandao_prime_blade","guandao_prime_blueprint","guandao_prime_handle",
  "gunsen_prime_set","gunsen_prime_blade","gunsen_prime_blade","gunsen_prime_blueprint","gunsen_prime_handle","gunsen_prime_handle",
  "karyst_prime_set","karyst_prime_blade","karyst_prime_blueprint","karyst_prime_handle",
  "kogake_prime_set","kogake_prime_blueprint","kogake_prime_boot","kogake_prime_boot","kogake_prime_gauntlet","kogake_prime_gauntlet",
  "kronen_prime_set","kronen_prime_blade","kronen_prime_blade","kronen_prime_blueprint","kronen_prime_handle","kronen_prime_handle",
  "masseter_prime_set","masseter_prime_blade","masseter_prime_blueprint","masseter_prime_handle",
  "nami_skyla_prime_set","nami_skyla_prime_blade","nami_skyla_prime_blade","nami_skyla_prime_blueprint","nami_skyla_prime_blueprint","nami_skyla_prime_handle","nami_skyla_prime_handle",
  "nikana_prime_set","nikana_prime_blade","nikana_prime_blueprint","nikana_prime_hilt",
  "ninkondi_prime_set","ninkondi_prime_blueprint","ninkondi_prime_chain","ninkondi_prime_handle","ninkondi_prime_handle",
  "okina_prime_set","okina_prime_blade","okina_prime_blade","okina_prime_blueprint","okina_prime_handle","okina_prime_handle",
  "orthos_prime_set","orthos_prime_blade","orthos_prime_blade","orthos_prime_blueprint","orthos_prime_handle",
  "pangolin_prime_set","pangolin_prime_blade","pangolin_prime_blueprint","pangolin_prime_handle",
  "quassus_prime_set","quassus_prime_blade","quassus_prime_blade","quassus_prime_blueprint","quassus_prime_handle","quassus_prime_handle",
  "reaper_prime_set","reaper_prime_blade","reaper_prime_blueprint","reaper_prime_handle",
  "redeemer_prime_set","redeemer_prime_blade","redeemer_prime_blueprint","redeemer_prime_handle",
  "scindo_prime_set","scindo_prime_blade","scindo_prime_blueprint","scindo_prime_handle",
  "silva_and_aegis_prime_set","silva_and_aegis_prime_blade","silva_and_aegis_prime_blueprint","silva_and_aegis_prime_guard","silva_and_aegis_prime_hilt",
  "tatsu_prime_set","tatsu_prime_blade","tatsu_prime_blueprint","tatsu_prime_handle",
  "tekko_prime_set","tekko_prime_blade","tekko_prime_blade","tekko_prime_blueprint","tekko_prime_gauntlet","tekko_prime_gauntlet",
  "tipedo_prime_set","tipedo_prime_blueprint","tipedo_prime_handle","tipedo_prime_ornament","tipedo_prime_ornament",
  "venka_prime_set","venka_prime_blades","venka_prime_blades","venka_prime_blueprint","venka_prime_gauntlet","venka_prime_gauntlet",
  "volnus_prime_set","volnus_prime_blueprint","volnus_prime_handle","volnus_prime_head",

  // ===== Mods =====
  "primed_continuity","primed_continuity","primed_redirection","primed_redirection","primed_flow","primed_flow","primed_fast_hands","primed_fast_hands",
  "primed_magazine_warp","primed_magazine_warp","primed_cryo_rounds","primed_cryo_rounds","primed_rifle_ammo_mutation","primed_rifle_ammo_mutation",
  "primed_firestorm","primed_firestorm","primed_bane_of_grineer","primed_bane_of_grineer","primed_bane_of_infested","primed_bane_of_infested",
  "primed_bane_of_corpus","primed_bane_of_corpus","primed_bane_of_corrupted","primed_bane_of_corrupted","primed_stabilizer","primed_stabilizer",
  "primed_sniper_ammo_mutation","primed_sniper_ammo_mutation","primed_point_blank","primed_point_blank","primed_charged_shell","primed_charged_shell",
  "primed_cleanse_grineer","primed_cleanse_grineer","primed_cleanse_infested","primed_cleanse_infested","primed_cleanse_corpus","primed_cleanse_corpus",
  "primed_cleanse_corrupted","primed_cleanse_corrupted","primed_chilling_grasp","primed_chilling_grasp","primed_shotgun_ammo_mutation","primed_shotgun_ammo_mutation",
  "primed_ravage","primed_ravage","primed_ammo_stock","primed_ammo_stock","primed_counterbalance","primed_counterbalance","primed_quickdraw","primed_quickdraw",
  "primed_heated_charge","primed_heated_charge","primed_target_cracker","primed_target_cracker","primed_expel_grineer","primed_expel_grineer",
  "primed_expel_infested","primed_expel_infested","primed_expel_corpus","primed_expel_corpus","primed_expel_corrupted","primed_expel_corrupted",
  "primed_fulmination","primed_fulmination","primed_convulsion","primed_convulsion","primed_pistol_ammo_mutation","primed_pistol_ammo_mutation",
  "primed_pistol_gambit","primed_pistol_gambit","primed_slip_magazine","primed_slip_magazine","primed_steady_hands","primed_steady_hands",
  "primed_pressure_point","primed_pressure_point","primed_smite_grineer","primed_smite_grineer","primed_smite_infested","primed_smite_infested",
  "primed_smite_corpus","primed_smite_corpus","primed_smite_corrupted","primed_smite_corrupted","primed_smite_the_murmur","primed_smite_the_murmur",
  "primed_fever_strike","primed_fever_strike","primed_reach","primed_reach","primed_heavy_trauma","primed_heavy_trauma","primed_pack_leader","primed_pack_leader",
  "primed_animal_instinct","primed_animal_instinct","primed_regen","primed_regen","primed_morphic_transformer","primed_morphic_transformer","primed_dual_rounds","primed_dual_rounds",
  "primed_deadly_efficiency","primed_deadly_efficiency","primed_rubedo_lined_barrel","primed_rubedo_lined_barrel"
];

// ===== Кэш для хранения цен =====
let cachedPrices = {};
let lastUpdated = null;

// ===== Функция для получения цен =====
async function fetchPrices(item) {
  const url = `https://api.warframe.market/v1/items/${item}/orders`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ошибка при запросе ${item}: ${res.status}`);
  }
  const data = await res.json();
  return { item, data };
}

// ===== Обновление кэша =====
async function updateCache() {
  console.log("🔄 Обновляю кэш цен...");
  const newCache = {};
  for (const item of ITEMS) {
    try {
      const { item: itemName, data } = await fetchPrices(item);
      newCache[itemName] = data;
    } catch (err) {
      console.error(`Ошибка для ${item}:`, err.message);
    }
  }
  cachedPrices = newCache;
  lastUpdated = new Date().toISOString();
  console.log("✅ Кэш обновлён в", lastUpdated);
}

// ===== Автообновление каждые 5 минут =====
setInterval(updateCache, 5 * 60 * 1000);

// ===== Эндпоинт /prices =====
app.get("/prices", (req, res) => {
  if (!lastUpdated) {
    return res.status(503).json({ error: "Данные ещё не загружены, подожди пару минут" });
  }
  res.json({
    updated: lastUpdated,
    prices: cachedPrices
  });
});

// ===== Запуск сервера =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  updateCache(); // загружаем данные сразу при старте
});
