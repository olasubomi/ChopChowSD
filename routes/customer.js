const router = require('express').Router();
const removeList = require("../db/dbMongo/queries/list/removeList");
const removeItem = require("../db/dbMongo/queries/list/removeItem");
const getIdsItems = require('../db/dbMongo/queries/list/getIdsItems');
const getIdsUsers = require("../controllers/authentication/getIdsUsers");
// const  addGroceryItemToUserList = require("../db/dbMongo/queries/list/addGroceryItemToUserList");
const { hashPassword } = require("../lib/hashPassword");
const authunticationLogout = require("../controllers/authentication/authunticationLogout");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const UserController = require('../controllers/UserController/userController')

//user routes
router.delete("/remove-list/:userId", removeList);
router.delete("/remove-item/:idItem/:userId", removeItem);
router.get("/get-ids-items/:userId", getIdsItems);
router.get("/get-ids-users", getIdsUsers);


router.get("/getUserGroceryList/:userId", verifyAuthentication,UserController.getGroceryList);
// router.post("/addTypeaheadDataToUserGroceryList/:idItem/:userId",verifyAuthentication, addGroceryItemToUserList.add);
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.post("/forgotpassword", UserController.forgotPassword);
router.post("/resetpassword",UserController.resetPassword);
router.get("/hash", hashPassword);
router.get("/logout", authunticationLogout);




module.exports = router;
