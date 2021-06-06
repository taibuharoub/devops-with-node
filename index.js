const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.send("<h1>Server Up and Running...</h1>")
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`.yellow.bold);
});
