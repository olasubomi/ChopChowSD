"use strict";
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
require("dotenv").config();
const Crypto = require("crypto");
exports.randomString = function (size = 15) {
  return Crypto.randomBytes(size).toString("base64").slice(0, size);
};
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
const groceryRoutes = require("./routes/groceries");
// const itemRoutes = require("./routes/items");
// const groceryRoutes = require("./routes/groceries");
const measurementRoutes = require("./routes/measurement");
// const descriptionRoutes = require("./routes/description");
const itemRoutes = require("./routes/item");
const categoryRoutes = require("./routes/category");
const storeRoutes = require("./routes/store");
const analyticsRoutes = require("./routes/analytics");
const inventoryRoutes = require("./routes/inventory");

//----------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.json({ limit: "50mb" }));
app.use(cookie());
// app.use(sslRedirect());
var whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://chopchow.app",
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
app.use("/api/categories", categoryRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/items", itemRoutes);


// test multer logging
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
  console.log(error);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
