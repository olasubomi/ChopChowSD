const ItemController = require("../controllers/ItemController/item.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { upload, transformObject } = require("../utils/middleware");
const express = require("express");
const router = express.Router();

router.get("/", ItemController.getAllItems);

router.post(
  "/",
  verifyAuthentication,
  upload.fields(
    [
      { name: "item_images", maxCount: 4 },
      { name: 'instruction_images', maxCount: 6 }
    ]
  ),
  ItemController.createItem
);

router.get("/store-items/:storeId", ItemController.getStoreItems);

router.get(
  "/user-items/:userId",
  verifyAuthentication,
  ItemController.getUserItems
);

router.get("/category-items/:categoryId", ItemController.getCategoryItems);

router.post("/item-control", verifyAuthentication, ItemController.approveItems);

router.delete("/delete", verifyAuthentication, ItemController.deleteItem);

router.post("/comments", verifyAuthentication, ItemController.updateComment);

module.exports = router;
