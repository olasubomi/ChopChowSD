const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const { upload } = require("../utils/middleware");
const { protect } = require('../utils/middleware/authmiddleware')
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');

//store routes
router.post(
  "/createstore",
  protect,
  uploadToCloudinary.any(),
  verifyAuthentication,
  StoreController.createStore
);

router.get("/getstore/:storeId", StoreController.getStore);
router.get("/all-supplier/:page", StoreController.allSupplier);
router.get("/top-supplier", StoreController.topSupplier);
router.get("/getallstores/:page", StoreController.getStores); // sort by location/rating
router.get("/store/:name", StoreController.queryStore);
router.post("/list/:address", StoreController.queryStoreByAddress);
router.post("/add-user/:storeId", StoreController.addUserToStore);
router.patch('/claimstore/:id', StoreController.claimStore)
router.delete('/removeuser/:userId/:storeId', StoreController.removeUserFromStore)


router.get('/user/:userId', StoreController.getAllStoresForAuser)

router.put(
  "/updatestore/:storeId",
  uploadToCloudinary.any(),
  verifyAuthentication,
  StoreController.updateStore
);

router.delete(
  "/deletestore/:storeId",
  verifyAuthentication,
  StoreController.deleteStore
);

module.exports = router;
