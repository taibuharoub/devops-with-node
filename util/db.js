const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://root:toor@mongo/?authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Sucessfully connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
