const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("debug", true);
mongoose.set('strictQuery', false);

mongoose.Promise = require("bluebird");

mongoose.connect(
  //"mongodb://localhost/chop_chow",
  process.env.MONGO_URI_DEV,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("We are connected to Mongo from db_connection in server.js");
  }
);


//Check if we connected to the database or not
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
