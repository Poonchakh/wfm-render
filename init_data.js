import fs from "fs";

const DATA_FILE = "data.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
  console.log("✅ Файл data.json создан (пустой)");
} else {
  console.log("ℹ️ Файл data.json уже существует");
}
