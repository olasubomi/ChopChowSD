const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { upload } = require("../utils/middleware");

//store routes
router.post(
  "/createstore",
  upload.any(),
  verifyAuthentication,
  StoreController.createStore
);

router.get("/getstore/:storeId", StoreController.getStore);
router.get("/getallstores/:page", StoreController.getStores); // sort by location/rating

router.put(
  "/updatestore/:storeId",
  upload.any(),
  verifyAuthentication,
  StoreController.updateStore
);

router.delete(
  "/deletestore/:storeId",
  verifyAuthentication,
  StoreController.deleteStore
);

module.exports = router;
