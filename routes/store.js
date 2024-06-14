const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { upload } = require("../utils/middleware");
const { protect } = require('../utils/middleware/authmiddleware')

//store routes
router.post(
  "/createstore",
  protect,
  upload.any(),
  verifyAuthentication,
  StoreController.createStore
);

router.get("/getstore/:storeId", StoreController.getStore);
router.get("/getallstores/:page", StoreController.getStores); // sort by location/rating
router.get("/store/:name", StoreController.queryStore);
router.post("/list/:address", StoreController.queryStoreByAddress);
router.post("/add-user/:storeId", StoreController.addUserToStore);

router.patch('/claimstore/:id', StoreController.claimStore)
router.get('/user/:userId', StoreController.getAllStoresForAuser)

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
