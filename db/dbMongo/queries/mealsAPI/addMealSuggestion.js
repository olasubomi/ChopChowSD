const { suggested_meals , all_products, all_meal_categories} = require("../../config/db_buildSchema");

exports.addMealSuggestion = (req, res) =>{
  const url = req.protocol + '://' + req.get('host')
  console.log('****creat meal data****', req.body);
  console.log("Comes in meal suggestion handler");

  //------------------- To add new categories ---------------------------
  const newCategories = JSON.parse(req.body.newCategories);
  for(var i = 0; i < newCategories.length; i++){
    const row_category = {
      id:1,
      category_name: newCategories[i]
    };
    all_meal_categories.create(row_category); 
  }


    //------------------- To add new ingredient ---------------------------
  const newer_ingredient_format = JSON.parse(req.body.formatted_ingredient);
  // const ingredient_list = JSON.parse(req.body.ingredient_list);

  // console.log("ingredientImgFlag_list:",ingredient_list);

  // const product_slider = []
  // var n = 0;
  // for(var i=0; i<newer_ingredient_format.length; i++){
  //   if(ingredient_list[i].path_flag){
  //     n += 1;
  //     product_slider.push({ingredient: newer_ingredient_format[i].product, image: url+"/uploads/" + req.files[n].filename, flag:ingredient_list[i].path_flag});

  //     const row_product = {
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


  const product_slider = JSON.parse(req.body.product_slider);
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
  };

  console.log("const meal object created");
  return suggested_meals.create(mealObject).then(res.status(200).send(JSON.stringify({ msg: 'Succesfully added', done: true })) );
};
