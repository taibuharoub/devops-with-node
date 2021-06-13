const express = require("express");

const connectDB = require("./util/db");

connectDB();

const postRouter = require("./routes/post");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("<h1>Server Up and Running</h1>");
});

app.use("/api/v1/posts", postRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
