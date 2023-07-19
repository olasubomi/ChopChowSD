const ItemController = require("../controllers/ItemController/item.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { upload, transformObject } = require("../utils/middleware");
const express = require("express");
const router = express.Router();

router.get("/:page", ItemController.getAllItems);

router.get('/user/:name', ItemController.getOneItem)

router.post(
  "/",
  verifyAuthentication,
  upload.fields(
    [
      { name: "item_images", maxCount: 4 },
      // { name: 'instruction_images', maxCount: 6 },
      { name: 'image_or_video_content_1', maxCount: 1 },
      { name: 'image_or_video_content_2', maxCount: 1 },
      { name: 'image_or_video_content_3', maxCount: 1 },
      { name: 'image_or_video_content_4', maxCount: 1 },
      { name: 'image_or_video_content_5', maxCount: 1 },
      { name: 'image_or_video_content_6', maxCount: 1 },
    ]
  ),
  ItemController.createItem
);

router.get("/store-items/:storeId", ItemController.getStoreItems);

router.get(
  "/user-items/:page",
  // verifyAuthentication,
  ItemController.getUserItems
);


router.get("/category-items/:categoryId", ItemController.getCategoryItems);

router.post("/item-control", verifyAuthentication, ItemController.approveItems);

router.delete("/delete/:itemId", verifyAuthentication, ItemController.deleteItem);

router.post("/comments", verifyAuthentication, ItemController.updateComment);

module.exports = router;
