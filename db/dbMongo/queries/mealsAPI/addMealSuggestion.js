const { suggested_meals } = require("../../config/db_buildSchema");
exports.addMealSuggestion = (req, res) => {
  console.log("Comes in meal suggestion handler");
  console.log(req.body);
  const mealIngredients = req.body.ingredientStrings;

  console.log("Printing ingedient chips");
  console.log(mealIngredients);

  //check if mealIngredients all exist

  console.log(req.body.mealIngredients);

  const mealObject = {
    label: req.body.mealLabel,
    imageSrc: "/images/meal_pics/" + req.body.imgSrc,
    readTime: req.body.cookTime,
    cookTime: req.body.cookTime,
    intro: req.body.intro,
    newer_ingredient_format: req.body.formatted_ingredient,
    ingredients: req.body.ingredientStrings,
    instructions: req.body.instructions,
    servings: req.body.servings,
    categories: req.body.categoryChips,
    display: false,
  };

  console.log("const meal object created");
  return suggested_meals.create(mealObject);
};
