const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController/Category.controller");

//category routes

router.post("/create", CategoryController.createCategory);
router.post("/update/:CategoryId", transformObject, CategoryController.updateCategory);
router.get("/get-all-categories/:page", CategoryController.getAllCategorys);
router.get("/get-category/:categoryId", CategoryController.getCategory);
router.delete("/delete-category/:categoryId", CategoryController.deleteCategory)

//customer routes
router.get("/get_store_Categorys/:page", CategoryController.getStoreCategorys);



module.exports = router;
