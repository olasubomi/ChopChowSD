const router = require("express").Router();
const MealsController = require("../controllers/MealContoller/meal.controller");
const { validatePayload, upload } = require("../utils/middleware");


//meal routes
router.post(
  "/create",
  upload.array("meal_images"),
  validatePayload("createMealSchema"),
  MealsController.createMeal
);
router.get("/get-meals/:page", MealsController.getMeals);
router.get("/get-meal/:mealId", MealsController.getSingleMeal);
router.delete("/delete/:mealId", MealsController.deleteMeal);
router.post("/update/:mealId", upload.array("meal_images"), MealsController.updateMeal);
// router.get("/getmealsbydate", MealsController.getMealsByDate); // with count limit
// router.get("/getmealsbystatus", MealsController.getMealsByStatus); // with count limit


router.post(
  "/addMealSuggestion/",
  upload.array("meal_images"),
  MealsController.addMealSuggestion
);

router.post(
  "/updateSuggestedMealItem/",
  upload.array("meal_images"),
  MealsController.updateSuggestedMealItem
);
router.get("/get-suggested-meals/:page", MealsController.getSuggestedMeals);

router.get(
  "/removeSeggestItem/:suggestedMealID",
  MealsController.removeSuggestedMealItem
);

router.get("/get-all-categories", MealsController.getMealCategories);

// router.put("/updatemeal/:mealId", MealsController.updateMeal);
// router.put("/updatesimilarmeal/:mealId", MealsController.updateSimilarMeal);


module.exports = router;
