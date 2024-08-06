const router = require('express').Router();
const { upload, transformObject } = require("../utils/middleware");
const { hashPassword } = require("../lib/hashPassword");
// const authenticationLogout = require("../utils/repositpry/authentication/authenticationLogout");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const UserController = require('../controllers/UserController/userController')
const { verifyRefreshToken } = require("../utils/authentication/2.verifyTokenAuthenticator.js");


router.post("/signup", upload.single('profile_picture'), transformObject, UserController.signUp);
router.post("/signin", UserController.signIn);
router.get("/refresh-token", verifyRefreshToken, UserController.refreshToken);
router.post("/forgotpassword", UserController.forgotPassword);
router.post("/resetpassword", UserController.resetPassword);
router.get("/findUser/:id", UserController.findUser);
router.get("/findUsers/:page", UserController.findUsers);
router.put("/updateuserprofile/:userId", verifyAuthentication, upload.single(), transformObject, UserController.updateUserProfile);
router.post("/inviteuser", UserController.inviteUser);
router.post("/notifyuser/", UserController.addNotification);
router.get("/verifyToken/", verifyAuthentication, UserController.verifyToken);
router.get("/verifyEmail", UserController.verifyEmail);
router.post("/requestnumber", UserController.requestNumber);
router.post("/verifynumber", UserController.verifyNumber);
router.post("/sendemailotp", UserController.sendEmailOTP);
router.post("/verifyEmailOTP", UserController.verifyEmailOTP);
router.delete("/cancelnumberverification", UserController.cancelNumberVerification);
router.get("/hash", hashPassword);
// router.get("/logout", authenticationLogout);
// router.get("/getsuggestedmeals", UserController.getSuggestedMeals);
router.get("/getUserGroceryList/:userId", verifyAuthentication, UserController.getGroceryList);
router.get("/getUserCartList/:userId", verifyAuthentication, UserController.getCartList);
router.get("/findStoreadmins/:storeId", UserController.findStoreAdmins);
router.get("/showappadmins/", UserController.getAppAdmins);
router.delete("/notification/:id", verifyAuthentication, UserController.manageNotification);
router.get("/notifications", verifyAuthentication, UserController.userNotification);
router.patch("/notification/:id", verifyAuthentication, UserController.updateNotification)
// router.get("/get-ids-items/:userId", getIdsItems);
// router.get("/get-ids-users", getIdsUsers);
router.put("/updatenotifications/:userId", UserController.updateNotificiations);
// router.put("/updategrocerylist/:listId", UserController.updateGroceryList);
// router.put("/addexistingitemtogrocerylist/:idItem/:userId", verifyAuthentication, addGroceryItemToUserList.add);
// router.put("/addnewitemtogrocerylist/:newItem/:userId", verifyAuthentication, addGroceryItemToUserList.add);
router.put("/updatecartlist/:listId", UserController.updateCartList);
router.put("/updategrocerysuggestionslist/:listId", UserController.updateGrocerySuggestionsList);
// router.delete("/removeallgrocerylistitems/:userId", removeList);
// router.delete("/removegrocerylistitem/:idItem/:userId", removeItem);
router.delete("/deleteuserprofile/:id", UserController.deleteUserProfile);

module.exports = router;
