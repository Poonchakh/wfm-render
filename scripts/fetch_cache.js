import fs from 'fs/promises';
import fetch from 'node-fetch';

const items = JSON.parse(await fs.readFile('./data/items.json', 'utf8'));
const batchSize = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchItem(item) {
  try {
    const res = await fetch(`https://api.example.com/items/${item}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(`✅ ${item} загружен`);
      return data;
    } else if (res.status === 429) {
      console.log(`⚠️ 429 для ${item}, повтор через паузу`);
      await sleep(1000); // пауза перед повтором
      return fetchItem(item); // retry
    } else {
      console.log(`Ошибка для ${item}: ${res.status}`);
    }
  } catch (e) {
    console.log(`Ошибка для ${item}: ${e}`);
  }
}

async function main() {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    for (const item of batch) {
      await fetchItem(item);
      await sleep(200); // задержка между запросами
    }
    console.log(`✅ Обработан батч ${i}-${i + batch.length}`);
    await sleep(1000); // задержка между батчами
  }
}

main();
