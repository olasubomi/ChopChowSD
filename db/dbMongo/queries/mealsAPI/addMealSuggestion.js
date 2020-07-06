const { suggested_meals } = require("../../config/db_buildSchema");

exports.addMealSuggestion = (req, res) =>{
  console.log('****creat meal data****', req.body);
  console.log("Comes in meal suggestion handler");
  console.log(req.body);
  const mealIngredients = req.body.ingredientStrings;

  console.log("Printing ingedient chips");
  console.log(mealIngredients);

  //check if mealIngredients all exist
  // console.log(" req.body : ", JSON.parse(req.body.instructionsChip));
  console.log("imgSrc:",req.file);

  const mealObject = {
    label: req.body.mealLabel,
    imageSrc: "uploads/" + req.file.filename,
    readTime: req.body.readTime,
    cookTime: req.body.cookTime,
    intro: req.body.intro,
    newer_ingredient_format: JSON.parse(req.body.formatted_ingredient),
    ingredients: req.body.ingredientStrings,
    instructions: JSON.parse(req.body.instructionsChip),
    servings: req.body.servings,
    categories: JSON.parse(req.body.categoryChips),
    display: false,
  };

  console.log("const meal object created");
  return suggested_meals.create(mealObject);
};
