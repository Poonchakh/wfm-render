const API_URL = "https://wfm-render.onrender.com/prices"; // ссылка на твой сервер
const tableBody = document.querySelector("#prices-table tbody");
const lastUpdated = document.getElementById("last-updated");
const refreshButton = document.getElementById("refresh");

async function fetchPrices() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    lastUpdated.textContent = "Последнее обновление: " + data.updated;

    tableBody.innerHTML = ""; // очищаем таблицу
    for (const item in data.prices) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = item;
      const priceCell = document.createElement("td");

      // Можно показывать минимальную цену среди ордеров
      const sellOrders = data.prices[item].payload.orders.filter(o => o.order_type === "sell" && o.visible);
      const minPrice = sellOrders.length ? Math.min(...sellOrders.map(o => o.platinum)) : "—";
      priceCell.textContent = minPrice;

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      tableBody.appendChild(row);
    }
  } catch (err) {
    console.error(err);
    alert("Ошибка при получении данных");
  }
}

// Обновление по кнопке
refreshButton.addEventListener("click", fetchPrices);

// Автообновление каждые 5 минут
setInterval(fetchPrices, 5 * 60 * 1000);

// Загружаем данные сразу
fetchPrices();
