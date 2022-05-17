const router = require('express').Router();
const removeList = require("../db/dbMongo/queries/list/removeList");
const removeItem = require("../db/dbMongo/queries/list/removeItem");
const getIdsItems = require('../db/dbMongo/queries/list/getIdsItems');
const getIdsCustomers = require("../controllers/authentication/getIdsCustomers");
const  addGroceryItemToCustomerList = require("../db/dbMongo/queries/list/addGroceryItemToCustomerList");
const { hashPassword } = require("../lib/hashPassword");
const authunticationLogout = require("../controllers/authentication/authunticationLogout");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const CustomerController = require('../controllers/CustomerController/customerController')

//customer routes
router.delete("/remove-list/:customerId", removeList);
router.delete("/remove-item/:idItem/:customerId", removeItem);
router.get("/get-ids-items/:customerId", getIdsItems);
router.get("/get-ids-customers", getIdsCustomers);


router.get("/getCustomerGroceryList/:customerId", verifyAuthentication,CustomerController.getGroceryList);
router.post("/addTypeaheadDataToCustomerGroceryList/:idItem/:customerId",verifyAuthentication, addGroceryItemToCustomerList.add);
router.post("/signup", CustomerController.signUp);
router.post("/signin", CustomerController.signIn);
router.post("/forgotpassword", CustomerController.forgotPassword);
router.post("/resetpassword",CustomerController.resetPassword);
router.get("/hash", hashPassword);
router.get("/logout", authunticationLogout);




module.exports = router;
