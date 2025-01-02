const ItemController = require("../controllers/ItemController/item.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const { transformObject, storage } = require("../utils/middleware");
const express = require("express");
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');


const upload = multer({ storage })

// const storage = multer.memoryStorage();
const memoryStorage = multer.memoryStorage();
const upload_ = multer({ storage: memoryStorage });


router.get("/:page", ItemController.getAllItems);

router.get('/user/:name', ItemController.getOneItem)
router.get('/item/:id', ItemController.getOneItemById)

router.get('/filter/:name', ItemController.filterItem)

router.post(
  "/",
  verifyAuthentication,
  uploadToCloudinary.fields(
    [
      { name: "item_images", maxCount: 4 },
      { name: 'instruction_images', maxCount: 6 },
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

router.put('/transcription', upload_.single('video'), ItemController.videoTranscription)
router.put('/content-extraction', upload_.array('image'), ItemController.productImage)
router.get("/store-items/:storeId", ItemController.getStoreItems);
router.get("/filterstore/:name", ItemController.filterUserItemByName);
router.get(
  "/user-items/:page",
  // verifyAuthentication,
  ItemController.getUserItems
);


router.get("/category-items/:categoryId", ItemController.getCategoryItems);

router.post("/item-control", verifyAuthentication, ItemController.approveItems);

router.get("/users/:userId", verifyAuthentication, ItemController.getOneUserItem);

router.delete("/delete/:itemId", verifyAuthentication, ItemController.deleteItem);

router.post("/comments", verifyAuthentication, ItemController.updateComment);

router.get("/suggested-meal/:id", verifyAuthentication)

module.exports = router;
