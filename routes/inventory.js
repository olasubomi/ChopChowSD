const router = require("express").Router();
const InventoryController = require("../controllers/inventory");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

router.post(
  "/create-inventory",
  verifyAuthentication,
  InventoryController.createInventory
);
router.post(
  "/update-inventory/:inventoryId",
  verifyAuthentication,
  InventoryController.updateInventory
);

router.get(
  '/user-inventory/:userId',
  InventoryController.getUserInventory
)
router.get(
  "/get-all-inentories/:page",
  verifyAuthentication,
  InventoryController.getInventories
);
router.get(
  "/get-inventory/:inventoryId",
  verifyAuthentication,
  InventoryController.getInventory
);
router.get(
  "/get-store-inventory/:storeId",
  InventoryController.getStoreInventory
);
router.delete(
  "/delete-inventory/:inventoryId",
  verifyAuthentication,
  InventoryController.deleteInventory
);

module.exports = router;
