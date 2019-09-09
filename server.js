'use strict';
// allow to store local env variables in nodejs process event environment(env) object
// var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const pw = process.env.MongoPassword;
const uri = "mongodb+srv://Olasubomi:" + pw + "@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority";

require('./db/dbMongo/config/db_connection');
// require('./db/dbMongo/config/AllDataList')();
// require('./db/dbMongo/config/AllDataCusomerList')();
// require('./db/dbMongo/config/AllDataCustomer')();


const { isAuthenticated } = require('./controllers/authentication/3.isAuthenticated')
const { authenticationLogin } = require('./controllers/authentication/1.authunticationLogin')
const authenticationVerify = require('./controllers/authentication/2.authunticatinVerify')
const { hashPassword } = require('./controllers/hashPassword')
const authunticationLogout = require('./controllers/authentication/authunticationLogout')
const app = express();

const path = require('path');
const port = process.env.PORT || 4445;
const facebook = require("./routes/facebook");
const login = require("./routes/manual_login");
var bodyParser = require('body-parser');
const { getList } = require("./controllers/list/getList");
const { getAllDataLists } = require("./controllers/list/getAllDataLists");
 
const appendItem = require('./controllers/list/appendItem')
const removeItem = require('./controllers/list/removeItem');
const createList = require('./controllers/list/createList')
const removeList = require('./controllers/list/removeList')
const getIdsLists = require('./controllers/list/getIdsLists')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookie());
// app.use(sslRedirect());
app.use(cors());
app.use('/facebook', facebook);         

// Serve static files from the React app



// app.use('*', express.static(path.join(__dirname,'/client', 'public', 'manifests.json')));
app.get('/get_products', (req, res) => {
    console.log("Calling all Mongo products");
    var collection;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(uri);
    //const opts  = {db:{authSource: 'users'}};
    // uri = "mongodb://Olasubomi:"+this.password+"@cluster0-sqg7f.mongodb.net:27017";
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        // console.log(JSON.stringify(collection));
        // store = JSON.stringify(collection);
        // res.send(store);
        var dbo = db.db("Product_Supply");
        dbo.collection("all_products").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
            // perform actions on the collection object
            db.close();
        });
    });
});

app.get('/get_store_products', (req, res) => {

    console.log("Calling all Mongo meals");
    var collection;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(uri);
    //const opts  = {db:{authSource: 'users'}};
    // uri = "mongodb://Olasubomi:"+this.password+"@cluster0-sqg7f.mongodb.net:27017";
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        // console.log(JSON.stringify(collection));
        // store = JSON.stringify(collection);
        // res.send(store);
        var dbo = db.db("Product_Supply");
        dbo.collection("Store_Products").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            // perform actions on the collection object
            db.close();
        });
    });
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


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     console.log("Gets in client builds index");
//     res.sendFile(path.join(__dirname+'/client/build/'));
//   });
app.get('/getList/:customerId', getList)

app.get('/api/get-all-data-lists', getAllDataLists)



// on enetering landing page
app.get('/find', function (req, res) {
    app.get('/api/get-all-lists', getAllLists)




    console.log("Gets in get");
    if (!req.session.cart) {
        console.log("Creates a cart session")
        req.session.cart = {
            items: [],
            totals: 0.00,
            formattedTotals: ''
        };
    }
    else {
        console.log("Cart exists");
        console.log(req.session);
    }
    var products = [{ "_id": { "$oid": "5795e57c7078f66363833977" }, "product_id": 1362.0, "id": "B000H1DF7W", "title": "dragon naturally speaking standard v9", "description": "dragon naturallyspeaking 9 (standard edition) gives small business users and pc enthusiasts the power to create documents reports e-mails and more -- all by speaking! over three times faster than typing and amazingly accurate naturallyspeaking 9 translates your voice dictations into microsoft word and excel corel wordperfect and virtually all windows-based applications. it's never been easier to use -- with no script reading required you can get started right away! naturallyspeaking 9 translates your voice dictations into microsoft word and excel corel wordperfect and virtually all windows-based applications. view larger. three times faster than typing a c/net editor's choice for february 2006 and a pc world 100 best products of 2006 dragon naturallyspeaking 9 is up to 99 percent accurate and often more accurate than typing. dragon naturallyspeaking never makes a spelling mistake and it's actually programmed to get smarter the more your use it. and because most people speak over 120 words per minute but type less than 40 words a minute naturallyspeaking lets you create letters and e-mails about three times faster than typing by hand. dragon naturallyspeaking 9 is extremely easy to use and require no training. a full set of new on-screen tutorials simplify the training process so you can be an expert dragon naturallyspeaking user right away. an included approved free noise-canceling microphone helps you get started immediately. and you can use your voice to dictate edit and control just about any windows-based application which gives you unprecedented flexibility as you work. it even supports mozilla firefox and thunderbird. just talk and you can surf the web open and close applications even control your mouse and the entire desktop. you can also dictate edit and navigate more easily in microsoft word outlook express and corel wordperfect than in previous versions. for web browsing dragon naturallyspeaking 9 lets you search the web access information and navigate web pages by speaking urls and links. the dragonbar includes a select and say indicator that turns green when you are in an application or window where all of naturallyspeaking's functionality is supported. seamless editing functionality we all add unnecessary ums and ahs when we speak and the last thing you want is to spend your time editing all those extraneous insertions from your documents. thanks to its built-in nothing but speech (nbs) technology dragon naturallyspeaking 9 filters out inadvertent fillers and sounds between words keeping your document clean. the program's natural punctuation feature means that when you dictate casual writing styles you no longer have to say period and comma. so why type your emails or fiddle with your mouse to surf the web when you can more easily and quickly use your voice?", "manufacturer": "nuance communications inc.", "price": 99.99, "image": "5.jpeg" }
        , { "_id": { "$oid": "5795e57c7078f66363833978" }, "product_id": 1363.0, "id": "B000P9CR66", "title": "mediarecover", "description": "mediarecover gives you the ability to recover files you were positively convinced were gone forever - even if you've deleted them. losing memories of vacations and fun times is bad enough but losing important business files can threaten your livelihood. you owe it to yourself to be prepared. mediarecover's 3-step recovery process ensures you can access your photos music and files when you need to!", "manufacturer": "aladdin systems", "price": 29.99, "image": "1.jpeg" }
        , { "_id": { "$oid": "5795e57c7078f66363833979" }, "product_id": 1364.0, "id": "B000J588G4", "title": "photo explosion 3.0", "description": "photo explosion 3.0", "manufacturer": "nova development", "price": 29.99, "image": "8.jpeg" }]

    res.render('index', {
        pageTitle: 'Node.js Shopping Cart',
        products: products,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
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
    console.log("ends db search")
}
);



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





app.post('/api/login', authenticationLogin);
// app.use(authenticationVerify)
app.get('/api/grocery' ,authenticationVerify,isAuthenticated);
app.get('/api/getList/:customerId', getList)
app.get('/api/get-all-data-lists', getAllDataLists)
app.get('/hash', hashPassword);
app.get('/api/logout',authunticationLogout)
app.get('/api/get-ids-lists',getIdsLists)
app.post('/api/appendItem',appendItem)
app.delete('/api/remove-list/:customerId',authenticationVerify,removeList)
app.delete('/api/remove-item/:itemId/:customerId',authenticationVerify,removeItem)


app.post('/api/create-list/:itemId/:customerId',createList)
// app.post('/api/create-list',createList)


app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));
