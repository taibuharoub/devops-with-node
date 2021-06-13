const session = require("express-session")
const redis = require("redis")
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("../config/config")
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const red = () => {
    session({
        store: new RedisStore({client: redisClient}),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 30000 //30 seconds
        }
    })
}

module.exports  = red