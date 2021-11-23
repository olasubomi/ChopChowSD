const { suggested_meals , all_products, all_meal_categories} = require("../../config/db_buildSchema");

exports.addMealSuggestion = (req, res) =>{
  const url = req.protocol + '://' + req.get('host')
  console.log('**** Gets in meal suggestion handler to submit to »»»»»»»| ****', req.body);

  //------------------- Confirming new categories to add ---------------------------
  const newCategories = JSON.parse(req.body.newCategories);
    //------------------- Confirming new categories to add ---------------------------
    const newProducts = JSON.parse(req.body.newProducts);
  
  for(var i = 0; i < newCategories.length; i++){
    const row_category = {
      id:1,
      category_name: newCategories[i]
    };
    all_meal_categories.create(row_category); 
  }


  //------------------- Confirming new ingredients to add ---------------------------
  const newer_ingredient_format = JSON.parse(req.body.formatted_ingredient);
  // const ingredient_list = JSON.parse(req.body.ingredient_list);
  // console.log("ingredientImgFlag_list:",ingredient_list);
  // const product_slider = []
  // var n = 0;
  // for(var i=0; i<newer_ingredient_format.length; i++){
  //   if(ingredient_list[i].path_flag){
  //     n += 1;
  //     product_slider.push({ingredient: newer_ingredient_format[i].product, image: url+"/uploads/" + req.files[n].filename, flag:ingredient_list[i].path_flag});
  //     const row_product = {1
  //       sizes:JSON.parse('["50lbs"]'),
  //       respective_prices: JSON.parse('[]'),
  //       id:11,
  //       product_name: newer_ingredient_format[i].product,
  //       product_image: url+"/uploads/" + req.files[n].filename,
  //       product_price: "12",
  //     };
  //     all_products.create(row_product);
  //   }else{
  //     product_slider.push({ingredient: newer_ingredient_format[i].product, image:url+"/uploads/products/"+ingredient_list[i].path, flag:ingredient_list[i].path_flag});
  //   }
  // }

  // Confirming products and product slider are ready to add
  const product_slider = JSON.parse(req.body.product_slider);
  var totalProducts = 0;
  if(totalProducts!=product_slider.length){
    // create product suggestions request.

  }

    // add product ids to meal for reference on product sliders
    for( i=0; i<newMeasurements.length; i++){       
    
    }


  // add product ids to meal for reference on product sliders
  for( i=0; i<newProducts.length; i++){       
    
  }

  for( i=0; i<product_slider.length; i++){       
    if(product_slider[i].flag && product_slider[i].image !==""){
      const row_product = {
        sizes:JSON.parse('["50lbs"]'),
        respective_prices: JSON.parse('[]'),
        id:11,
        product_name: newer_ingredient_format[i].product,
        product_image: product_slider[i].image,
        product_price: "12",
      };
      all_products.create(row_product);
    }
    
    product_slider[i].flag = false;    
  }






if(newCategories.length >0 || newProducts.length > 0 || mealNameKeyNames.contains(mealName)){
    // display to listed VSM's
}
else{
    // addToDisplay VSM
}






  // Submittting new meal to specific User and Admin access policy,  


  // 
  console.log("product_slider:",product_slider);
  const mealObject = {
    label: req.body.mealLabel,
    mealImage: url+"/uploads/" + req.files[0].filename,
    readTime: req.body.readTime,
    cookTime: req.body.cookTime,
    intro: req.body.intro,
    newer_ingredient_format: newer_ingredient_format,
    ingredients: req.body.ingredientStrings,
    instructions: JSON.parse(req.body.instructionsGroupList),
    servings: req.body.servings,
    product_slider:product_slider,
    categories: JSON.parse(req.body.categoryChips),
    display: false,

    mealName: String,
    intro: String,
    mealImages: Array,
    ingredientMeasurements: Array,
    prepTime: Object,
    cookTime: Object,
    stepSlides: Object,
    productImages: Array,
    productNames: Array,
    productPageUrl: Array,
    url: String,
    chef: String,
    servings: Number,
    instructions: [ { step: Object, image: String }],
    utensilsRequired: Array,
    categories: Array,
    tips: Array,
    calories: Object,
    servings: Object,
    total_carbs: Object,
    net_carbs: Object,
    fiber: Object,
    fat: Object,
    protein: Object,
  };

  console.log("const meal object created");
  return suggested_meals.create(mealObject).then(res.status(200).send(JSON.stringify({ msg: 'Succesfully added', done: true })) );
};
