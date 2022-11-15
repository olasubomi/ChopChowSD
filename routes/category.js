const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController/category.controller");

//category routes

router.post("/create", CategoryController.createCategory);
router.post("/update/:CategoryId", CategoryController.updateCategory);
router.get("/get-all-categories/:page", CategoryController.getAllCategories);
router.get("/get-category/:categoryId", CategoryController.getCategory);
router.delete("/delete-category/:categoryId", CategoryController.deleteCategory)



module.exports = router;
