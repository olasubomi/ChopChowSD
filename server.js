"use strict";
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
require("dotenv").config();
const Crypto = require("crypto");
exports.randomString = function (size = 15) {
  return Crypto.randomBytes(size).toString("base64").slice(0, size);
}
const pw = process.env.MongoPassword;
require("./db/dbMongo/config/db_connection");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const facebook = require("./routes/facebook");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const mealRoutes = require("./routes/meal");
const productRoutes = require("./routes/product");
//----------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.json({ limit: '50mb' }));
app.use(cookie());
// app.use(sslRedirect());
var whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://chopchow.app"
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,PUT,POST,DELETE,OPTIONS",
  // allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(
  bodyParser.urlencoded({
    // Middleware
    extended: true,
  })
);
app.use(bodyParser.json());
//***********************************************************************************

app.use("/facebook", facebook);
app.use("/api/user", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/products", productRoutes);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.get("/redirect", (req, res) => {
  console.log("To redirect page");
  res.sendFile(path.join(__dirname + "/client", "public", "index.html"));
});

app.get("/privacy-policy", (req, res) => {
  console.log("To render ");
  res.render("pages/privacy-policy");
});

app.get("/terms-of-service", (req, res) => {
  console.log("To render ");
  res.render("pages/terms-of-service");
});

// test multer logging
app.use((error, req, res, next) => {
  console.log('This is the rejected field ->', error.field);
  console.log(error)
});


app.listen(port, () => console.log(`Listening on port ${port}`));
