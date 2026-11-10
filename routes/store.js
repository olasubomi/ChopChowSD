const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const { upload } = require("../utils/middleware");
const { protect } = require('../utils/middleware/authmiddleware')
const { requireStoreAccess, requireOwnUserOrPlatformAdmin } = require("../utils/storeAccessMiddleware")
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
router.post("/add-user/:storeId", protect, requireStoreAccess("manage_admins"), StoreController.addUserToStore);
router.patch('/claimstore/:id', protect, StoreController.claimStore)
router.delete('/removeuser/:userId/:storeId', protect, requireStoreAccess('manage_admins'), StoreController.removeUserFromStore)


router.get('/user/:userId', protect, requireOwnUserOrPlatformAdmin, StoreController.getAllStoresForAuser)

router.put(
  "/updatestore/:storeId",
  protect,
  requireStoreAccess("update_store"),
  uploadToCloudinary.any(),
  StoreController.updateStore
);

router.delete(
  "/deletestore/:storeId",
  protect,
  requireStoreAccess("delete_store"),
  StoreController.deleteStore
);

module.exports = router;
