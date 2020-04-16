'use strict';
// allow to store local env variables in nodejs process event environment(env) object
// var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();
const pw = process.env.MongoPassword;
const uri = "mongodb+srv://Olasubomi:" + pw + "@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority";

require('./db/dbMongo/config/db_connection');
// require('./db/dbMongo/config/AllCustomersLists')();
// require('./db/dbMongo/config/AllProductsList')();
// require('./db/dbMongo/config/AllCustomersData')();
// require('./db/dbMongo/config/OneCustomersGroceryList')();


const { isAuthenticated } = require('./controllers/authentication/3.isAuthenticated')
const { authenticationLogin } = require('./controllers/authentication/1.authunticationLogin')
const authenticationVerify = require('./controllers/authentication/2.authunticationVerify')

const { hashPassword } = require('./controllers/hashPassword')
const { authenticationSignup } = require('./controllers/authentication/authenticationSignup')
const authunticationLogout = require('./controllers/authentication/authunticationLogout')

const { signupCustomer, forgotPassword, resetPassword } = require('./controllers/authentication/signup');
const app = express();

const path = require('path');
const port = process.env.PORT || 5000;
const facebook = require("./routes/facebook");
const login = require("./routes/manual_login");
var bodyParser = require('body-parser');
const { getCustomerGroceryList } = require("./controllers/list/getCustomerGroceryList");
const { getAllDataLists } = require("./controllers/list/getAllDataLists");

const { getMeals } = require("./db/dbMongo/config/getMeals");
const { getAllProducts } = require("./db/dbMongo/config/getAllProducts");

// const appendItem = require('./controllers/list/appendItem')
const removeItem = require('./controllers/list/removeItem');
// const createList = require('./controllers/list/createList')
const removeList = require('./controllers/list/removeList')
const getIdsItems = require('./controllers/list/getIdsItems')
// const getCustomersLists = require('./controllers/list/getCustomersLists') // commented out until needed
const getIdsCustomers = require('./controllers/authentication/getIdsCustomers')

const getItemId = require('./controllers/list/getItemId')
const getDataItemTypeahead = require('./controllers/list/getDataItemTypeahead')
const addDataForThisCustomer = require('./controllers/list/addDataForThisCustomer')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookie());
// app.use(sslRedirect());
app.use(cors());
app.use('/facebook', facebook);
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Serve static files from the React app


app.get('/get_store_products', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Calling servers get_store_products to Mongo");
    //Check if we connected to the database or not
    let db = mongoose.connection;
    // let vari =  await db.collection("Store_Products").countDocuments();
    // console.log(vari);
    // console.log(vari);
    db.on('error', console.error.bind(console, 'Connection error:'));
    await db.once('open', function () {
        console.log('We are supposedly connected to the Mongo database');
        // var dbo = db.model("Product_Supply");
        db.collection("Store_Products").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log("store products results ate in")
            console.log(result);
            res.send(result);
            //leaving db open to allow for call at any point (eg when changing the page)
            // db.close();
        })
        // perform actions on the collection object
    });
    // const vari = await
    // console.log(vari);

});
app.get('/api/get-meals', getMeals);
app.get('/api/get-all-products', getAllProducts);

app.post('/api/login', authenticationLogin);
app.post('/api/forgotpass', forgotPassword)
app.post('/api/resetpass', resetPassword)
// app.use(authenticationVerify)
app.post('/api/signupuser', signupCustomer)
app.post('/api/signup/:newcustomerId', authenticationSignup)

// app.post('/api/appendItem',appendItem)
app.delete('/api/remove-list/:customerId', removeList)
app.delete('/api/remove-item/:idItem/:customerId', removeItem)
// app.post('/api/create-list/:idItem/:customerId', createList) // no to create list on grocery page

app.get('/api/get-ids-items/:customerId', getIdsItems)
// app.get('/api/get-customers-lists', getCustomersLists) 
app.get('/api/get-ids-customers', getIdsCustomers)

app.get('/api/get-data-item/:idItem', getItemId)

app.get('/api/get-data-typeahead/:option', getDataItemTypeahead)
app.get('/hash', hashPassword);
app.get('/api/logout', authunticationLogout)

app.get('/api/grocery', authenticationVerify, isAuthenticated);
app.get('/api/getCustomerGroceryList/:customerId', authenticationVerify, getCustomerGroceryList)
app.get('/api/get-all-data-lists', getAllDataLists)

app.post('/api/add-data-typeahead-for-customer/:idItem/:customerId',addDataForThisCustomer.add)

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.get('/test', (req, res) => {
    console.log("To test page");
    res.send(JSON.stringify(req.session));
});

app.get('/redirect', (req, res) => {
    console.log("To redirect page");
    res.sendFile(path.join(__dirname + '/client', 'public', 'index.html'));
});


app.get('/renderEJS', (req, res) => {
    console.log("To render ");
    res.render('index');
});

app.get('/privacy-policy', (req, res) => {
    console.log("To render ");
    res.render('pages/privacy-policy');
});

app.get('/terms-of-service', (req, res) => {
    console.log("To render ");
    res.render('pages/terms-of-service');
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