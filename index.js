const express = require("express");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);

const connectDB = require("./util/db");

connectDB();

const postRouter = require("./routes/post");
const authRouter = require("./routes/auth");
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3000;

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
app.enable("trust proxy");
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000, //30000ms => 30 Seconds
    },
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1", (req, res, next) => {
  res.send("<h1>Server Up and Running</h1>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

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
