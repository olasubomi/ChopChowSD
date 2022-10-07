const router = require("express").Router();
const ProductController = require("../controllers/productController/product.controller");
const { upload } = require("../utils/middleware")

//product routes
// router.post("/suggestproduct", ProductController.suggestProduct);

router.post("/create",upload.array("productImage"), ProductController.createProduct);
router.post("/update/:productId",upload.array("productImage"), ProductController.updateProduct);
router.get("/get-all-products/:page", ProductController.getAllProducts);
router.get("/getproduct/:productId", ProductController.getProduct);
router.delete("/deleteproduct/:productId", ProductController.deleteProduct)
// router.get("/getallingredients", ProductController.getAllIngredients);
// router.get("/getallutensils", ProductController.getAllUtensils);

//customer routes
router.get("/get_store_products/:page", ProductController.getStoreProducts);



module.exports = router;
