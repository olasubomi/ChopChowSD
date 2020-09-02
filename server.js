"use strict";
// allow to store local env variables in nodejs process event environment(env) object
// var sslRedirect = require('heroku-ssl-redirect');
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require("dotenv").config();

const Crypto = require('crypto');
function randomString(size = 15) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size)
}

const pw = process.env.MongoPassword;
const chalk = require('chalk');
const uri = "mongodb+srv://Olasubomi:" +pw +"@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority";
require("./db/dbMongo/config/db_connection");

const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const facebook = require("./routes/facebook");
const login = require("./routes/manual_login");
const bodyParser = require("body-parser");

//----------------------------------------------------------------------------------
const { authenticateLoginToken,} = require("./controllers/authentication/1.authenticateLoginToken");
const {  isAuthenticated,} = require("./controllers/authentication/3.isAuthenticated");
const verifyAuthentication = require("./controllers/authentication/2.verifyTokenAuthenticator.js");
const { hashPassword } = require("./controllers/hashPassword");
const {  authenticationSignup,} = require("./controllers/authentication/authenticationSignup");
const authunticationLogout = require("./controllers/authentication/authunticationLogout");
const {  signupCustomer,  forgotPassword,  resetPassword,} = require("./controllers/authentication/signup");
const {  addMealSuggestion,} = require("./db/dbMongo/queries/mealsAPI/addMealSuggestion");
const { sendMealtable, } = require("./db/dbMongo/queries/mealsAPI/sendMealtable");
const { updateSuggestedMealItem, } = require("./db/dbMongo/queries/list/updateSuggestedMealItem");
const {  getCustomerGroceryList,} = require("./db/dbMongo/queries/list/getCustomerGroceryList");
const {  getAllDataLists,} = require("./db/dbMongo/queries/list/getAllDataLists");
const { getMeals } = require("./db/dbMongo/queries/mealsAPI/getMeals");
const { getSuggestedMeals } = require("./db/dbMongo/queries/mealsAPI/getSuggestedMeals");
const {  getAllProducts,} = require("./db/dbMongo/queries/productsAPI/getAllProducts");
// const appendItem = require('./db/dbMongo/queries/list/appendItem')
const removeItem = require("./db/dbMongo/queries/list/removeItem");
const removeSuggestedMealItem = require("./db/dbMongo/queries/list/removeSuggestedMealItem");

// const createList = require('./db/dbMongo/queries/list/createList')
const removeList = require("./db/dbMongo/queries/list/removeList");
const getIdsItems = require("./db/dbMongo/queries/list/getIdsItems");
// const getCustomersLists = require('./db/dbMongo/queries/list/getCustomersLists') // commented out until needed
const getIdsCustomers = require("./controllers/authentication/getIdsCustomers");
const getItemId = require("./db/dbMongo/queries/list/getItemId");
const getDataItemTypeahead = require("./db/dbMongo/queries/list/getDataItemTypeahead");
const addGroceryItemToCustomerList = require("./db/dbMongo/queries/list/addGroceryItemToCustomerList");
const {  getAllCategories,} = require("./db/dbMongo/queries/mealsAPI/getAllCategories");

//----------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookie());
// app.use(sslRedirect());
app.use(cors());

app.use("/facebook", facebook);
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(
  bodyParser.urlencoded({
    // Middleware
    extended: true,
  })
);
app.use(bodyParser.json());

//***********************************************************************************
var multer  = require('multer');
var storage = multer.diskStorage(
  {
      destination: 'client/build/uploads/',
      filename: function ( req, file, cb ) {
          const str1=randomString().replace("+","").replace("-","").replace("/","").replace("*","").replace("/","").replace("?","")
          cb( null, str1+"_"+file.originalname);
      }
  }
);
var upload = multer( { storage: storage } );

app.post("/api/addMealSuggestion/", upload.array('imgSrc'), addMealSuggestion);
app.post("/api/updateSuggestItem/", upload.array('imgSrc'), updateSuggestedMealItem);


//***********************************************************************************
var insrtucionImg_multer  = require('multer');
var insrtucionImg_storage = insrtucionImg_multer.diskStorage(
  {
      destination: 'client/build/instruction/',
      filename: function ( req, file, cb ) {
          const str1=randomString().replace("+","").replace("-","").replace("/","").replace("*","").replace("/","").replace("?","")
          cb( null, str1+"_"+file.originalname);
      }
  }
);
var insrtucionImg_upload = insrtucionImg_multer( { storage: insrtucionImg_storage } );

const {  getInstructionImgPath,} = require("./db/dbMongo/queries/mealsAPI/getInstructionImgPath");

app.post("/api/getInstructionImgURL/", insrtucionImg_upload.array('instructionImgs'), getInstructionImgPath);

//***********************************************************************************
var productImg_multer  = require('multer');
var productImg_storage = productImg_multer.diskStorage(
  {
      destination: 'client/build/uploads/products/',
      filename: function ( req, file, cb ) {
          const str1=randomString().replace("+","").replace("-","").replace("/","").replace("*","").replace("/","").replace("?","")
          cb( null, str1+"_"+file.originalname);
      }
  }
);
var productImg_upload = productImg_multer( { storage: productImg_storage } );

const {  getProductImgPath,} = require("./db/dbMongo/queries/mealsAPI/getProductImgPath");

app.post("/api/getProductImgURL/", productImg_upload.array('productImgs'), getProductImgPath);



// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
// }

// app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // update to match the domain you will make the request from
//     // res.header("Access-Control-Allow-Origin", );
//     // res.header('Access-Control-Allow-Credentials', true);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });



// Serve static files from the React app

app.get("/get_store_products", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    console.log("Calling servers get_store_products to Mongo");
  //Check if we connected to the database or not
  let db = mongoose.connection;
  // let vari =  await db.collection("Store_Products").countDocuments();
  // console.log(vari);
  // console.log(vari);
  db.on("error", console.error.bind(console, "Connection error:"));
  await db.once("open", function () {
    console.log("We are supposedly connected to the Mongo database");
    // var dbo = db.model("Product_Supply");
    db.collection("Store_Products")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("store products results are in");
        console.log(result);
        res.send(result);
        //leaving db open to allow for call at any point (eg when changing the page)
        // db.close();
      });
    // perform actions on the collection object
  });
  // const vari = await
  // console.log(vari);
});

app.get("/api/get-meals", getMeals);
app.get("/api/get-suggested-meals", getSuggestedMeals);
app.get("/api/get-all-products", getAllProducts);
app.get("/api/get-all-categories", getAllCategories);

app.post("/api/login", authenticateLoginToken);
app.post("/api/forgotpass", forgotPassword);
app.post("/api/resetpass", resetPassword);
app.post("/api/signupuser", signupCustomer);
app.post("/api/signup/:newcustomerId", authenticationSignup);
app.post("/api/send-mealData", sendMealtable);


// app.post('/api/appendItem',appendItem)
app.delete("/api/remove-list/:customerId", removeList);
app.delete("/api/remove-item/:idItem/:customerId", removeItem);
app.get("/api/removeSeggestItem/:suggestedMealID", removeSuggestedMealItem);

// app.post('/api/create-list/:idItem/:customerId', createList) // no to create list on grocery page

app.get("/api/get-ids-items/:customerId", getIdsItems);
// app.get('/api/get-customers-lists', getCustomersLists)
app.get("/api/get-ids-customers", getIdsCustomers);
app.get("/api/get-data-item/:idItem", getItemId);

app.get("/api/get-data-typeahead/:option", getDataItemTypeahead);
app.get("/hash", hashPassword);
app.get("/api/logout", authunticationLogout);

app.get("/api/authenticate-app-page", verifyAuthentication, isAuthenticated);
app.get( "/api/getCustomerGroceryList/:customerId", verifyAuthentication, getCustomerGroceryList);
app.get("/api/get-all-data-lists", getAllDataLists);
app.post(  "/api/addTypeaheadDataToCustomerGroceryList/:idItem/:customerId",  addGroceryItemToCustomerList.add);

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

app.listen(port, () => console.log(`Listening on port ${port}`));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     console.log("Gets in client builds index");
//     res.sendFile(path.join(__dirname+'/client/build/'));
//   });

// app.get('/find', function (req, res) {
//     app.get('/api/get-all-lists', getAllLists)
//     console.log("Gets in servers find route.....");
//     if (!req.session.cart) {
//         console.log("Creates a cart session")
//         req.session.cart = {
//             items: [],
//             totals: 0.00,
//             formattedTotals: ''
//         };
//     }
//     else {
//         console.log("Cart exists");
//         console.log(req.session);
//     }
// Products.find({price: {'$gt': 0}}).sort({price: -1}).limit(6).then(products => {
//     console.log(products);
//     let format = new Intl.NumberFormat(req.app.locals.locale.lang, {style: 'currency', currency: req.app.locals.locale.currency });
//     products.forEach( (product) => {
//        product.formattedPrice = format.format(product.price);
//     });

//     res.render('index', {
//         pageTitle: 'Node.js Shopping Cart',
//         products: products,
//         nonce: Security.md5(req.sessionID + req.headers['user-agent'])
//     });

// }).catch(err => {
//     res.status(400).send('Bad request');
// });
// console.log("ends db search")
// }
// );
// after identifying unique  session tokens from MD5 string
// Then we are able to compare tokens in each singular form request:
// app.post('/test', (req, res) => {
//     let token = req.body.nonce;
//     if(Security.isValidNonce(token, req)) {
//       console.log("Post route test of valid Nonce says OK");

//     } else {
//       // Reject the request
//       console.log("Post route test of valid Nonce is REJECTED!");

//     }
// });

// app.get('/cart', (req, res) => {
//     console.log("Gets in cart route");
//     let sess = req.session;
//     console.log(sess);
//     let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
//     res.render('cart', {
//         pageTitle: 'Cart',
//         cart: cart,
//         nonce: Security.md5(req.sessionID + req.headers['user-agent'])
//     });
// });

// app.get('/cart/remove/:id/:nonce', (req, res) => {
//    let id = req.params.id;
//    if(/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
//        Cart.removeFromCart(parseInt(id, 10), req.session.cart);
//        res.redirect('/cart');
//    } else {
//        res.redirect('/');
//    }
// });

// app.get('/cart/empty/:nonce', (req, res) => {
//     if(Security.isValidNonce(req.params.nonce, req)) {
//         Cart.emptyCart(req);
//         res.redirect('/cart');
//     } else {
//         res.redirect('/');
//     }
// });

// app.post('/cart', (req, res) => {
//     let qty = parseInt(req.body.qty, 10);
//     let product = parseInt(req.body.product_id, 10);
//     if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
//       Products.findOne({product_id: product}).then(prod => {
//           Cart.addToCart(prod, qty);
//           Cart.saveCart(req);
//           res.redirect('/cart');
//       }).catch(err => {
//          res.redirect('/');
//       });
//   } else {
//       res.redirect('/');
//   }
//   });

//   app.post('/cart/update', (req, res) => {
//     let ids = req.body["product_id[]"];
//     let qtys = req.body["qty[]"];
//     if(Security.isValidNonce(req.body.nonce, req)) {
//         let cart = (req.session.cart) ? req.session.cart : null;
//         let i = (!Array.isArray(ids)) ? [ids] : ids;
//         let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
//         Cart.updateCart(i, q, cart);
//         Cart.saveCart(req);
//         res.redirect('/cart');
//     } else {
//         res.redirect('/');
//     }
//     });

//     app.get('/checkout', (req, res) => {
//         let sess = req.session;
//         let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
//         res.render('checkout', {
//             pageTitle: 'Checkout',
//             cart: cart,
//             checkoutDone: false,
//             nonce: Security.md5(req.sessionID + req.headers['user-agent'])
//         });
//     });

//     app.post('/checkout', (req, res) => {
//         let sess = req.session;
//         let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
//         if(Security.isValidNonce(req.body.nonce, req)) {
//             res.render('checkout', {
//                 pageTitle: 'Checkout',
//                 cart: cart,
//                 checkoutDone: true
//             });
//         } else {
//             res.redirect('/');
//         }
//     });

// const { parse } = require('url');
// require('dotenv').config();

//  let { DATABASE_URL: dbUrl } = process.env;

// const params = parse(dbUrl);
// const {
//   hostname: host, port, pathname, auth,
// } = params;

// const [user, password] = auth.split(':');

// console.log("port:",port);
// console.log("host:",host);
// console.log("pathname:",pathname);
// console.log("auth:",auth);
// console.log("user:",user);
// console.log("password:",password);
// const { readFileSync } = require('fs');
// const { join } = require('path');
// const dbconnection = require('../ChopChowSD/db/dbPostgress/config/db_connection');
// var sql = "CREATE TABLE ttt (id SERIAL PRIMARY KEY,  firstname TEXT,  lastname TEXT,  email TEXT,  password TEXT,  phoneNumber NUMERIC,  street TEXT,  city TEXT,  zipCode INTEGER,  ipsid INTEGER,  username TEXT,  emailnotifcation BOOLEAN,  passwordtoken TEXT,  list_id NUMERIC)";
// dbconnection.query(sql, function(err, result){
//   if(err)
//     throw err;
//   console.log("Database Created");
// });
// // const dbBuild = () => {
// //   new Promise((resolve, reject) => {
// //     console.log('111');
// //       readFileSync(join(__dirname, 'db_build.sql'), (errInFindingFile, sql) => {
// //         console.log('222');
// //           if (errInFindingFile) reject(errInFindFile);
// //           dbconnection(sql)
// //               .then(() => {
// //                   console.log('Database was built successfully');
// //                   resolve(true)
// //               }).catch((errInQuery) => {
// //                 console.log('333');
// //                   reject(errInQuery)
// //               });
// //       });

// //   })
// // }
// // dbBuild();


// // 




