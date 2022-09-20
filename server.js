"use strict";
// allow to store local env variables in nodejs process event environment(env) object
// var sslRedirect = require('heroku-ssl-redirect');
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
require("dotenv").config();

const Crypto = require("crypto");
function randomString(size = 15) {
  return Crypto.randomBytes(size).toString("base64").slice(0, size);
}

const pw = process.env.MongoPassword;
require("./db/dbMongo/config/db_connection");
// require('./db/dbMongo/queries/usersAPI/addAdminToDB')();

const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const facebook = require("./routes/facebook");
const bodyParser = require("body-parser");
//----------------------------------------------------------------------------------
const {
  authenticateLoginToken,
} = require("./controllers/authentication/1.authenticateLoginToken");
const {
  isAuthenticated,
} = require("./controllers/authentication/3.isAuthenticated");
const verifyAuthentication = require("./controllers/authentication/2.verifyTokenAuthenticator.js");
const {
  authenticationSignup,
} = require("./controllers/authentication/authenticationSignup");
const {
  signupCustomer,
  forgotPassword,
  resetPassword,
} = require("./controllers/authentication/signup");

const {
  sendMealtable,
} = require("./db/dbMongo/queries/mealsAPI/sendMealtable");
const {
  getAllDataLists,
} = require("./db/dbMongo/queries/list/getAllDataLists");
const getItemId = require("./db/dbMongo/queries/list/getItemId");
const getDataItemTypeahead = require("./db/dbMongo/queries/list/getDataItemTypeahead");
const customerRoutes = require("./routes/customer");
const mealRoutes = require("./routes/meal");
const productRoutes = require("./routes/product");

//----------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({extend: true, limit:'25mb'}));
// vv replaced with above for testing ^^
// app.use(express.urlencoded({extended: true, limit: '25mb'}));
// app.use(bodyParser.json({limit: '50mb'}));
app.use(cookie());
// app.use(sslRedirect());
var whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://chopchow.herokuapp.com",
  "http://chopchow.herokuapp.com",
  "https://chopchowsd.herokuapp.com",
  "https://chopchowsd.herokuapp.com/login",
  "https://chopchow-client.herokuapp.com",
  "http://chopchow-client.herokuapp.com",
  "https://chopchow-devclient.herokuapp.com",
  "http://chopchow-devclient.herokuapp.com/",
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
app.use("/api/customer", customerRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/products", productRoutes);

//***********************************************************************************
var insrtucionImg_multer = require("multer");
var insrtucionImg_storage = insrtucionImg_multer.diskStorage({
  destination: "client/build/instruction/",
  filename: function (req, file, cb) {
    const str1 = randomString()
      .replace("+", "")
      .replace("-", "")
      .replace("/", "")
      .replace("*", "")
      .replace("/", "")
      .replace("?", "");
    cb(null, str1 + "_" + file.originalname);
  },
});
var insrtucionImg_upload = insrtucionImg_multer({
  storage: insrtucionImg_storage,
});

const {
  getInstructionImgPath,
} = require("./db/dbMongo/queries/mealsAPI/getInstructionImgPath");

app.post(
  "/api/getInstructionImgURL/",
  insrtucionImg_upload.array("instructionImgs"),
  getInstructionImgPath
);

//***********************************************************************************
var productImg_multer = require("multer");
var productImg_storage = productImg_multer.diskStorage({
  destination: "client/build/uploads/products/",
  filename: function (req, file, cb) {
    const str1 = randomString()
      .replace("+", "")
      .replace("-", "")
      .replace("/", "")
      .replace("*", "")
      .replace("/", "")
      .replace("?", "");
    cb(null, str1 + "_" + file.originalname);
  },
});
var productImg_upload = productImg_multer({ storage: productImg_storage });

const {
  getProductImgPath,
} = require("./db/dbMongo/queries/mealsAPI/getProductImgPath");

app.post(
  "/api/getProductImgURL/",
  productImg_upload.array("productImgs"),
  getProductImgPath
);
// Serve static files from the React app

app.post("/api/login", authenticateLoginToken);
app.post("/api/signup/:newcustomerId", authenticationSignup);

app.get("/api/get-data-item/:idItem", getItemId);

app.get("/api/get-data-typeahead/:option", getDataItemTypeahead);

app.get("/api/authenticate-app-page", verifyAuthentication, isAuthenticated);
app.get("/api/get-all-data-lists", getAllDataLists);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/test", (req, res) => {
  console.log("To test page");
  res.send(JSON.stringify(req.session));
});

app.get("/redirect", (req, res) => {
  console.log("To redirect page");
  res.sendFile(path.join(__dirname + "/client", "public", "index.html"));
});

app.get("/renderEJS", (req, res) => {
  console.log("To render ");
  res.render("index");
});

app.get("/privacy-policy", (req, res) => {
  console.log("To render ");
  res.render("pages/privacy-policy");
});

app.get("/terms-of-service", (req, res) => {
  console.log("To render ");
  res.render("pages/terms-of-service");
});

// Serve static files from the React app
// app.get("*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });


app.post("/api/login", authenticateLoginToken);
app.post("/api/signup/:newcustomerId", authenticationSignup);
app.post("/api/send-mealData", sendMealtable);

// handle Instruction content upload
//***********************************************************************************
var multerOptionsToAcceptIntstructionContent = [
  { name: 'mealImage' },
  { name: 'instructionChunkContent1' },
  { name: 'instructionChunkContent2' },
  { name: 'instructionChunkContent3' },
  { name: 'instructionChunkContent4' },
  { name: 'instructionChunkContent5' },
  { name: 'instructionChunkContent6' },
]


// test multer logging
app.use((error, req, res, next) => {
  console.log('This is the rejected field ->', error.field);
  console.log(error)
});


// Test for multer error
// if(err instanceof instructionContentMulter.MulterError){
//   console.log("There is an error");
//   console.log(error.field);
// }
// app.post('/api/appendItem',appendItem)

app.listen(port, () => console.log(`Listening on port ${port}`));
