const router = require("express").Router();
const ProductController = require("../controllers/productController/product.controller");

//product routes
router.post("/suggestproduct", ProductController.suggestProduct);

router.get("/getproduct", ProductController.getProduct);
router.get("/getallproducts", ProductController.getAllProducts);
router.get("/getallingredients", ProductController.getAllIngredients);
router.get("/getallutensils", ProductController.getAllUtensils);
router.get("/getmoreingredients", ProductController.getMoreIngredients); // sorted by rating
router.get("/getmoreutensils", ProductController.getMoreUtensils); // sorted by rating

router.get("/getAllMongoFileImages", ProductController.readProductImages);
router.get("/getOneMongoFileData/:filename", ProductController.readProductImage);
router.get("/get_store_products", ProductController.getStoreProducts);

router.put("/editproduct", ProductController.editProduct)
router.put("/editproductcomment", ProductController.editComment)

router.delete("/deleteproduct", ProductController.deleteProduct)


module.exports = router;
