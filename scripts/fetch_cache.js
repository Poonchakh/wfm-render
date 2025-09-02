import fetch from 'node-fetch';

const BATCH_SIZE = 50;              // размер батча
const SLEEP_BETWEEN_REQUESTS = 200; // ms
const SLEEP_BETWEEN_BATCHES = 1000; // ms

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchItem(item) {
  try {
    const res = await fetch(`https://api.warframe.market/v1/items/${item}/orders`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(`✅ ${item} загружен`);
      return data;
    } else if (res.status === 429) {
      console.log(`⚠️ 429 для ${item}, повтор через паузу`);
      await sleep(1000);
      return fetchItem(item);
    } else {
      console.log(`Ошибка для ${item}: ${res.status}`);
      return null;
    }
  } catch (e) {
    console.log(`Ошибка для ${item}: ${e}`);
    return null;
  }
}

// items приходит из основного файла, уже без дублей
export async function updateCache(items) {
  // Дедупликация на всякий случай
  const uniqueItems = Array.from(new Set(items));
  console.log("🔄 Обновляю кэш цен для", uniqueItems.length, "уникальных предметов.");

  const newCache = {};
  for (let i = 0; i < uniqueItems.length; i += BATCH_SIZE) {
    const batch = uniqueItems.slice(i, i + BATCH_SIZE);
    for (const item of batch) {
      const data = await fetchItem(item);
      if (data) newCache[item] = data;
      await sleep(SLEEP_BETWEEN_REQUESTS);
    }
    console.log(`✅ Обработан батч ${i}–${i + batch.length}`);
    await sleep(SLEEP_BETWEEN_BATCHES);
  }

  return newCache; // возвращаем кэш
}
