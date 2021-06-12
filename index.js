const express = require("express");

const connectDB = require("./util/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("<h1>Server Up and Running</h1>");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
