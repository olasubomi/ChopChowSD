const router = require('express').Router();
const { upload, transformObject } = require("../utils/middleware");
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');
const { hashPassword } = require("../lib/hashPassword");
// const authenticationLogout = require("../utils/repositpry/authentication/authenticationLogout");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const UserController = require('../controllers/UserController/userController')
const { verifyRefreshToken } = require("../utils/authentication/2.verifyTokenAuthenticator.js");


router.post("/signup", uploadToCloudinary.single('profile_picture'), transformObject, UserController.signUp);
router.post("/signin", UserController.signIn);
router.get("/refresh-token", verifyRefreshToken, UserController.refreshToken);
// Basic per-instance throttling; use a shared store for multi-instance deployments.
const resetAttempts = new Map();
function throttlePasswordReset(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const prior = resetAttempts.get(key) || [];
  const recent = prior.filter((time) => now - time < 15 * 60 * 1000);
  if (recent.length >= 5) {
    return res.status(429).json({ message: "Too many reset requests. Please try again later." });
  }
  recent.push(now);
  resetAttempts.set(key, recent);
  if (resetAttempts.size > 10000) {
    for (const [ip, times] of resetAttempts) {
      if (times.every((time) => now - time >= 15 * 60 * 1000)) resetAttempts.delete(ip);
    }
  }
  next();
}
router.post("/forgotpassword", throttlePasswordReset, UserController.forgotPassword);
router.post("/resetpassword", UserController.resetPassword);
router.get("/findUser/:id", UserController.findUser);
router.get("/findUsers/:page", UserController.findUsers);
router.put("/updateuserprofile/:userId", verifyAuthentication, uploadToCloudinary.single(), transformObject, UserController.updateUserProfile);
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
router.post("/confirmaccount", UserController.confirmAccount);
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
router.post("/news-letter", UserController.newsletter);

module.exports = router;
