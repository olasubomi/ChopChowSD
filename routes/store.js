const router = require("express").Router();
const StoreController = require("../controllers/StoreController/store.controller");

//store routes
router.post("/createstore", StoreController.suggestStore);

router.get("/getstore", StoreController.getStore);
router.get("/getallstores", StoreController.getAllStores); // sort by location/rating
router.get("/get_store_stores", StoreController.getStoreStores);

router.put("/updatestore", StoreController.editStore)
router.put("/updatestoreinventory", StoreController.editStoreInventory)
router.put("/editstorecomment", StoreController.editComment)
router.put("/updatestoreadmins", StoreController.updateStoreAdmins);

router.delete("/deletestore", StoreController.deleteStore)

module.exports = router;
