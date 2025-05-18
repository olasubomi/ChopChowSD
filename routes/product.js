const router = require("express").Router();
const ProductController = require("../controllers/productController/product.controller");
const { upload, transformObject } = require("../utils/middleware");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');

router.post(
  "/create",
  verifyAuthentication,
  uploadToCloudinary.array("product_images"),
  ProductController.createProduct
);
router.post(
  "/update/:productId",
  verifyAuthentication,
  uploadToCloudinary.array("product_images"),
  transformObject,
  ProductController.updateProduct
);
router.get("/get-all-products/:page", verifyAuthentication, ProductController.getAllProducts);
router.get("/getproduct/:productId", ProductController.getProduct);
router.delete(
  "/deleteproduct/:productId",
  verifyAuthentication,
  ProductController.deleteProduct
);
// router.get("/getallingredients", ProductController.getAllIngredients);
// router.get("/getallutensils", ProductController.getAllUtensils);

//customer routes
router.get("/get_store_products/:page", ProductController.getStoreProducts);

module.exports = router;
