const tableBody = document.querySelector("#pricesTable tbody");

// Функция для загрузки цен
async function loadPrices() {
  try {
    const res = await fetch("/prices"); // Это локальный маршрут твоего сервера
    if (!res.ok) throw new Error("Ошибка при загрузке цен");
    const data = await res.json();

    tableBody.innerHTML = ""; // очищаем таблицу

    for (const item in data.prices) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const priceCell = document.createElement("td");

      nameCell.textContent = item;
      // Например, берем цену первого ордера с buy_price, если есть
      const orders = data.prices[item].payload?.orders || [];
      const buyOrder = orders.find(o => o.order_type === "buy");
      priceCell.textContent = buyOrder ? buyOrder.platinum : "-";

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      tableBody.appendChild(row);
    }
  } catch (err) {
    console.error(err);
  }
}

// Загрузка таблицы каждые 5 минут
loadPrices();
setInterval(loadPrices, 5 * 60 * 1000);
