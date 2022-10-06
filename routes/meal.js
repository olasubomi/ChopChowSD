const router = require("express").Router();
const MealsController = require("../controllers/MealContoller/meal.controller");
var multer = require("multer");
const { writeFile } = require("../db/dbMongo/config/writeFile");
const { transferToS3 } = require("../db/aws3/transferToS3");
const { multerOptionsToAcceptIntstructionContent } = require('../utils/multer/optionsAccept')
const { randomString } = require('../server');

let storage2 = multer.diskStorage({
  destination: "./multerFilesToDBs",
  filename: function (req, file, cb) {
    const str1 = randomString()
      .replace("+", "")
      .replace("-", "")
      .replace("/", "")
      .replace("*", "")
      .replace("/", "")
      .replace("?", "");
    cb(null, str1 + file.originalname);
  },
});

var storage = multer.diskStorage({
  destination: './multerFilesToDBs',
  filename: function (req, file, cb) {
    console.log("In filename instantiator where simple file details are:");
    console.log(file);
    // console.log("req is");
    // console.log(req);
    const str1 = randomString().replace("+", "").replace("-", "").replace("/", "").replace("*", "").replace("/", "").replace("?", "")
    cb(null, str1 + file.originalname)
  }
});

let upload2 = multer({ storage: storage2 });
var upload = multer({ storage: storage });


//meal routes
router.post("/send-mealData", MealsController.createMealFromSuggestedMeals);
router.post(
  "/addMealSuggestion/",
  upload2.fields(multerOptionsToAcceptIntstructionContent),
  writeFile,
  transferToS3,
  MealsController.addMealSuggestion
);

router.post("/updateSuggestedMealItem/", upload.array('imgSrc'), MealsController.updateSuggestedMealItem);

router.get("/get-meals", MealsController.getMeals);
// router.get("/getmealsbydate", MealsController.getMealsByDate); // with count limit
// router.get("/getmealsbystatus", MealsController.getMealsByStatus); // with count limit


router.get("/get-suggested-meals", MealsController.getSuggestedMeals);
router.get(
  "/get-suggested-meals-images",
  MealsController.getSuggestedMealImages
);
router.get(
  "/removeSeggestItem/:suggestedMealID",
  MealsController.removeSuggestedMealItem
);

router.get("/get-all-categories", MealsController.getMealCategories);

// router.put("/updatemeal/:mealId", MealsController.updateMeal);
// router.put("/updatesimilarmeal/:mealId", MealsController.updateSimilarMeal);

// router.delete("/deletemeal/:mealId", MealsController.deleteMeal);

module.exports = router;
