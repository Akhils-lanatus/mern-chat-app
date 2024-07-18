import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send(`<h1>Jai Hind</h1>`);
});
app.listen(PORT, () => {
  console.log(`Server running at port :: ${PORT}`);
});
