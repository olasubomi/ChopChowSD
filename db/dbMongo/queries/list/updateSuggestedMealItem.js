const { suggested_meals } = require("../../config/db_buildSchema");

exports.updateSuggestedMealItem = (req, res) => {
  console.log('****creat meal data****', req.body);

  const id = req.body.id;  
  const img_change_flag = req.body.img_change_flag;  

  if(img_change_flag=="true")
  {
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

      suggested_meals.findByIdAndUpdate({_id: id}, mealObject).then(() => {
        res.send({ data: "item updated", });
    })
    .catch(() =>
        next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
    }));
  }else{
    const mealObject = {
        label: req.body.mealLabel,
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

      suggested_meals.findByIdAndUpdate({_id: id}, mealObject).then(() => {
        res.send({ data: "item updated", });
    })
    .catch(() =>
        next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
    }));
  }

};
