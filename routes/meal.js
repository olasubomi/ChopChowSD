const router = require("express").Router();
const MealsController = require("../controllers/MealContoller/meal.controller");
const {
  validatePayload,
  upload,
  transformArray,
} = require("../utils/middleware");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");

//meal routes
router.post(
  "/create",
  verifyAuthentication,
  upload.any(),
  transformArray,
  // validatePayload("createMealSchema"),
  MealsController.createMeal
);
router.get("/get-meals/:page", MealsController.getMeals);
router.get("/get-meal/:mealId", MealsController.getSingleMeal);
router.delete(
  "/delete/:mealId",
  verifyAuthentication,
  MealsController.deleteMeal
);
router.post(
  "/update/:mealId",
  verifyAuthentication,
  upload.any(),
  transformArray,
  MealsController.updateMeal
);
router.get("/get-all-categories", MealsController.getMealCategories);

module.exports = router;
