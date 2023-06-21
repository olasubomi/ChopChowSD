const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("debug", true);
mongoose.set('strictQuery', false);
mongoose.Promise = require("bluebird");

mongoose.connect(
  //"mongodb://localhost/chop_chow",
  process.env.MONGO_URI_DEV,
<<<<<<< HEAD
  { useNewUrlParser: true, useUnifiedTopology: true, },
=======
  { useNewUrlParser: true, useUnifiedTopology: true },
>>>>>>> 2f226bc127236b5d77f9bb2009a79a53375959fb
  () => {
    console.log("We are connected to Mongo from db_connection in server.js");
  }
);

//Check if we connected to the database or not
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
