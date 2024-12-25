const router = require("express").Router();
const MealsController = require("../controllers/MealContoller/meal.controller");
const { upload, transformArray } = require("../utils/middleware");
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

//meal routes
router.post(
  "/create",
  verifyAuthentication,
  uploadToCloudinary.any(),
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
  uploadToCloudinary.any(),
  transformArray,
  MealsController.updateMeal
);
router.get("/get-all-categories", MealsController.getMealCategories);

module.exports = router;
