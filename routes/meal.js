const router = require("express").Router();
const MealsController = require("../controllers/MealContoller/meal.controller");
const { validatePayload, upload,transformArray } = require("../utils/middleware");


//meal routes
router.post(
  "/create",
  upload.any(),
  transformArray,
  validatePayload("createMealSchema"),
  MealsController.createMeal
);
router.get("/get-meals/:page", MealsController.getMeals);
router.get("/get-meal/:mealId", MealsController.getSingleMeal);
router.delete("/delete/:mealId", MealsController.deleteMeal);
router.post("/update/:mealId", upload.any(),transformArray,MealsController.updateMeal);
router.get("/get-all-categories", MealsController.getMealCategories);


module.exports = router;
