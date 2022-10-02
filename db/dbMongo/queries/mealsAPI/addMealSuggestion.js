const {suggested_meals, all_products, all_meal_categories, all_utensils, all_measurements } = require("../../config/db_buildSchema");
// const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

exports.addMealSuggestion = (req, res) => {
  console.log('**** Gets in meal suggestion handler to submit to Mongo');
  // const form = new formidable.IncomingForm();
  const url = req.protocol + '://' + req.get('host')
  console.log("Expected updated req body is : ");
  console.log(req.body);
  console.log(req.body.stepSlides);
  // form.parse(req, function(err, fields, files) {
  // console.log("Parsing form");
  // if (err) {
  //   console.log("There is an error here?");
  //   return res.status(400).json({ error: err.message });
  // }
  // const namesOfFileContentsSent = Object.keys(files);
  console.log("file data in request");
  // console.log(files);
  console.log("Printing files in request")
  console.log(req.files);
  var serverMealImageName
  if(req.files['mealImage'] === undefined){
     serverMealImageName = "";
  }
  else{
     serverMealImageName = req.files['mealImage'][0].filename;
    console.log(serverMealImageName);
  }

  // console.log(req.file);


  //------------------- Declare new items to add to db ---------------------------
  const new_product_ingredients = JSON.parse(req.body.new_product_ingredients);
  const new_measurements = req.body.new_measurements;
  const newKitchenUtensils = req.body.newKitchenUtensils;
  const newCategories = req.body.newCategories;

  const parsed_categories = JSON.parse(newCategories);
  const parsed_utensils = JSON.parse(newKitchenUtensils);
  const parsed_measurements = JSON.parse(new_measurements);

  //------------------- Confirming new product ingredients to add ---------------------------
  // Confirming products and product slider are ready to add
  // const product_slider = JSON.parse(req.body.product_slider);

  // add product ids to meal for reference on product sliders
  for (i = 0; i < new_product_ingredients.length; i++) {
    // if(product_slider[i].flag){
    //determine if product image exists ...
    const product = {
      product_name: new_product_ingredients[i].productName
      // sizes:JSON.parse('["50lbs"]'),
      // respective_prices: JSON.parse('[]'),
      // id:11,
      // product_image: product_slider[i].image,
      // product_price: "12",
    };
    all_products.create(product);
  }
  // ------------------- adding new measurements  ---------------------------  
  for (var i = 0; i < parsed_measurements.length; i++) {
    const measurement = {
      measurement: parsed_measurements[i]
    };
    all_measurements.create(measurement);
  }
  console.log("Gets passed measure,emts message");

  // ------------------- adding new kitchen utensils  ---------------------------  
  for (var i = 0; i < parsed_utensils.length; i++) {
    console.log(parsed_utensils[i]);

    const utensil = {
      kitchenUtensil: parsed_utensils[i]
    };
    all_utensils.create(utensil);
  }

  console.log("Gets passed utensils message");
  //------------------- Confirming new categories to add ---------------------------  
  // categories seem to be a string that looks like an array rather than an array of strings.
  // We need to convert this before iterating and adding to db
  for (var i = 0; i < parsed_categories.length; i++) {
    console.log(parsed_categories[i]);
    const row_category = {
      category_name: parsed_categories[i]
    };
    all_meal_categories.create(row_category);
  }

  console.log("Gets past products handler")

  // product_slider[i].flag = false;    

  // console.log( parsed_categories);
  // console.log(typeof(parsed_categories));
  // Submittting new meal to specific User and Admin access policy,  
  // console.log("product_slider:",product_slider);

  console.log("meal servings is " + Number(req.body.servings) + " of type " + typeof (Number(req.body.servings)));

  // let tmp_newer_ingredient_measurements= JSON.parse(req.body.new_product_ingredients);
  // let tmp_stepSlides= JSON.parse(req.body.stepSlides); // update stepSlides

  console.log(req.body.formatted_ingredient);
  console.log(req.body.stepSlides);

  // let tmp_categories= JSON.parse(req.body.categoryChips);
  // let tmp_utensilsreq.bodyuired= JSON.parse(req.body.kitchenUtensils);
  // let tmp_tips= JSON.parse(req.body.tips);

  console.log(req.body.categoryChips);
  console.log(req.body.kitchenUtensils);
  console.log(req.body.tips);

  // console.log(tmp_newer_ingredient_measurements);
  // console.log(tmp_stepSlides);
  // console.log(tmp_categories);
  // console.log(tmp_utensilsreq.bodyuired);
  // console.log(tmp_tips);

  console.log("Gets to define json parsed data");

  var ImageOrVideoContentMap = new Map();
  const mealObject = {
    mealName: req.body.mealName,
    // mealImage:  Buffer.from(JSON.stringify(r.mealImage)),
    mealImage: req.body.mealImage,
    mealImageName: serverMealImageName,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    intro: req.body.intro,
    chef: req.body.chef,
    formatted_ingredient: req.body.formatted_ingredient,
    stepSlides: req.body.stepSlides, // update stepSlides
    categories: req.body.categories,
    kitchenUtensils: req.body.kitchenUtensils,
    tips: req.body.tips,
    servings: Number(req.body.servings),
    // ImageOrVideoContent1: req.files.instructionChunkContent1,
    // ImageOrVideoContent2: req.files.instructionChunkContent2,
    // ImageOrVideoContent3: req.files.instructionChunkContent3,
    // ImageOrVideoContent4: req.files.instructionChunkContent4,
    // ImageOrVideoContent5: req.files.instructionChunkContent5,
    // ImageOrVideoContent6: req.files.instructionChunkContent6,

    // mealImage: url+"/uploads/" + req.body.files[0].filename,
    // ingredients: req.body.ingredientStrings,
    // instructions: JSON.parse(req.body.stepSlides),
    // product_slider:product_slider,
  };

  // if(newCategories.length >0 || newProducts.length > 0 || mealNameKeyNames.contains(mealName)){
  //     // display to listed VSM's
  // determine which db meal should go to
  // }
  // else{
  //     // addTo Displayed VSM
  // }

  console.log("gets to const meal object created");
  console.log(mealObject);
  return suggested_meals.create(mealObject).then(res.status(200).send(JSON.stringify({ msg: 'Succesfully added', done: true })));

  // });
};


  // const ingredient_list = JSON.parse(req.body.ingredient_list);
  // console.log("ingredientImgFlag_list:",ingredient_list);
  // const product_slider = []
  // var n = 0;
  // for(var i=0; i<newer_ingredient_format.length; i++){
  //   if(ingredient_list[i].path_flag){
  //     n += 1;
  //     product_slider.push({ingredient: newer_ingredient_format[i].product, image: url+"/uploads/" + req.body.files[n].filename, flag:ingredient_list[i].path_flag});
  //     const row_product = {1
  //       sizes:JSON.parse('["50lbs"]'),
  //       respective_prices: JSON.parse('[]'),
  //       id:11,
  //       product_name: newer_ingredient_format[i].product,
  //       product_image: url+"/uploads/" + req.body.files[n].filename,
  //       product_price: "12",
  //     };
  //     all_products.create(row_product);
  //   }else{
  //     product_slider.push({ingredient: newer_ingredient_format[i].product, image:url+"/uploads/products/"+ingredient_list[i].path, flag:ingredient_list[i].path_flag});
  //   }
  // }
