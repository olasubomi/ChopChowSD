const router = require('express').Router();
// const removeList = require("../db/dbMongo/queries/list/removeList");
// const removeItem = require("../db/dbMongo/queries/list/removeItem");
// const getIdsItems = require('../db/dbMongo/queries/list/getIdsItems');
// const getIdsUsers = require("../controllers/authentication/getIdsUsers");
// const  addGroceryItemToUserList = require("../db/dbMongo/queries/list/addGroceryItemToUserList");
const { hashPassword } = require("../lib/hashPassword");
const authunticationLogout = require("../controllers/authentication/authunticationLogout");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const UserController = require('../controllers/UserController/userController')

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.post("/forgotpassword", UserController.forgotPassword);
router.post("/resetpassword", UserController.resetPassword);

router.post("/inviteuser", UserController.inviteUser);
router.post("/notifyuser/", UserController.addNotification);

router.get("/findUser/:id", UserController.findUser);
router.get("/findUsers/:page", UserController.findUsers);
router.get("/hash", hashPassword);
router.get("/logout", authunticationLogout);

// router.get("/getsuggestedmeals", UserController.getSuggestedMeals);
router.get("/getUserGroceryList/:userId", verifyAuthentication, UserController.getGroceryList);
router.get("/getUserCartList/:userId", verifyAuthentication, UserController.getCartList);
router.get("/findStoreadmins/:storeId", UserController.findStoreAdmins);
router.get("/showappadmins/", UserController.getAppAdmins);

// router.get("/get-ids-items/:userId", getIdsItems);
// router.get("/get-ids-users", getIdsUsers);

router.put("/updatenotifications/:userId", UserController.updateNotificiations);
router.put("/updateuserprofile", UserController.updateUserProfile);
// router.put("/updategrocerylist/:listId", UserController.updateGroceryList);
// router.put("/addexistingitemtogrocerylist/:idItem/:userId", verifyAuthentication, addGroceryItemToUserList.add);
// router.put("/addnewitemtogrocerylist/:newItem/:userId", verifyAuthentication, addGroceryItemToUserList.add);
router.put("/updatecartlist/:listId", UserController.updateCartList);
router.put("/updategrocerysuggestionslist/:listId", UserController.updateGrocerySuggestionsList);

// router.delete("/removeallgrocerylistitems/:userId", removeList);
// router.delete("/removegrocerylistitem/:idItem/:userId", removeItem);
router.delete("/closeaccount", UserController.closeAccount);

module.exports = router;
