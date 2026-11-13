const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");
const InventoryV2Controller = require("../controllers/StoreController/inventoryV2.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const { upload } = require("../utils/middleware");
const { protect } = require('../utils/middleware/authmiddleware')
const { requireStoreAccess, requireOwnUserOrPlatformAdmin, requirePlatformAdmin } = require("../utils/storeAccessMiddleware")
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
// Legacy claim endpoint writes directly to store records; restrict until a pending-claim workflow is built.
router.patch('/claimstore/:id', protect, requirePlatformAdmin, StoreController.claimStore)
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

/*
 * V2 store-specific inventory management. These endpoints are authenticated,
 * scoped to the store, and never write the legacy inventories collection.
 */
router.get("/:storeId/inventory-v2", protect, requireStoreAccess("manage_inventory"), InventoryV2Controller.list);
router.post("/:storeId/inventory-v2", protect, requireStoreAccess("manage_inventory"), InventoryV2Controller.create);
router.patch("/:storeId/inventory-v2/:inventoryId", protect, requireStoreAccess("manage_inventory"), InventoryV2Controller.update);

module.exports = router;
