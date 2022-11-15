const router = require("express").Router();
const ProductController = require("../controllers/productController/product.controller");
const { upload, transformObject } = require("../utils/middleware");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");

//product routes
// router.post("/suggestproduct", ProductController.suggestProduct);

router.post(
  "/create",
  verifyAuthentication,
  upload.array("product_images"),
  ProductController.createProduct
);
router.post(
  "/update/:productId",
  verifyAuthentication,
  upload.array("product_images"),
  transformObject,
  ProductController.updateProduct
);
router.get("/get-all-products/:page", ProductController.getAllProducts);
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
