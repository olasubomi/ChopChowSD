const { meals } = require('../config/db_buildSchema')
exports.addMealSuggestion = (req, res) => {
    console.log("Comes in meal suggestion handler");
    console.log(req.body);
    const mealIngredients = req.body.ingredientChips;

    console.log("Printing ingedient chips");
    console.log(mealIngredients);

    //check if mealIngredients all exist

    console.log(mealIngredients.length);
    const mealObject = {
        "label": req.body.mealLabel,
        "imageSrc": '/images/meal_pics/'+req.body.imgSrc ,
        "readTime": req.body.cookTime,
        "cookTime": req.body.cookTime,
        "intro": req.body.intro,
        "new_ingredient": {
            "Garri": {
                "servings": {
                    "quantity": 1,
                    "measurements": "Cup(s)"
                }
            },
            "Water": {
                "servings": {
                    "quantity": 1,
                    "measurements": "Cup(s)"
                }
            }
        },
        "product_slider": [{ "ingredient": "Garri", "image": "garri.jpg" }, { "ingredient": "Sugar", "image": "sugar.jpeg" }, { "ingredient": "Water", "image": "water.jpeg" }],
        "ingredients": req.body.ingredientChips,
        "instructions": req.body.instructions,
        "servings": req.body.servings,
        "categories": req.body.categoryChips,
        "display": false
    }

    console.log("const meal object created");
    return meals.create(mealObject)
}