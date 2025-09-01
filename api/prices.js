import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/prices", (req, res) => {
  res.json({ message: "Render endpoint работает!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

