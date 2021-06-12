const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("../config/config");

const connectDB = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("Sucessfully connected to DB"))
    .catch((err) => {
      console.log(err);
      // setTimeout(connectDB, 5000); //will retry to connect to the mongodb sever until a connection is made
      //by default monogdb trys connect for 30seconds and if it fails it throws an error
      //adding the setTimeout will keep calling the function until a connection is made
    });
};

module.exports = connectDB;
