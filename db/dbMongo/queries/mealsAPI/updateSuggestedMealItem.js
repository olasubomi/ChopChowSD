const { suggested_meals, all_products } = require("../../config/db_buildSchema");

exports.updateSuggestedMealItem = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const id = req.body.id;  
  // const meal_has_image = req.body.meal_has_image;  

  console.log('****req.body.id****', id);
  console.log('****creat meal data****', req.body);
  console.log("Comes in meal suggestion handler");
  const mealIngredients = req.body.ingredientStrings;
  console.log("Printing ingedient chips");
  console.log(mealIngredients);
  console.log("imgSrc:");
  console.log(req.files);
  console.log('formatted ingredients:');
  console.log('Printing expected step slides object');
  console.log(req.body.stepSlides);
  // console.log(JSON.parse(req.body.stepSlides));

  console.log(req.body.formatted_ingredient);
  const newer_ingredient_format = req.body.formatted_ingredient;


  // define mealImageName
  var serverMealImageName
  if(req.files['mealImage'] === undefined){
     serverMealImageName = "";
  }
  else{
    // check if different from previous name

     serverMealImageName = req.files['mealImage'][0].filename;
    console.log(serverMealImageName);
  }

    //------------------- Declare new items to add to db ---------------------------
    // const new_product_ingredients = JSON.parse(req.body.new_product_ingredients);
    // const new_measurements = req.body.new_measurements;
    // const newKitchenUtensils = req.body.newKitchenUtensils;
    // const newCategories = req.body.newCategories;
  
    // const parsed_categories = JSON.parse(newCategories);
    // const parsed_utensils = JSON.parse(newKitchenUtensils);
    // const parsed_measurements = JSON.parse(new_measurements);

  // var mealObject ;

  // check if meal image has been updated
  // if(meal_has_image=="true" )
  // {
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

      // mealName: req.body.mealName,
      // mealImage : req.body.mealImage,
      // mealImageName: req.files[0].filename,
      // prepTime: req.body.prepTime,
      // cookTime: req.body.cookTime,
      // intro: req.body.intro,
      // chef: req.body.chef,
      // formatted_ingredient: newer_ingredient_format,
      // stepSlides: JSON.parse(req.body.stepSlides),
      // categories: JSON.parse(req.body.categoryChips),
      // // ingredients: req.body.ingredientStrings,
      // utensilsRequired: JSON.parse(req.body.utensilsRequired),
      // tips: JSON.parse(req.body.tips),
      // servings: req.body.servings,
      // product_slider:product_slider,
      // display: false,
    };

  // }
  


  // check if instruction images have been updated

  suggested_meals.findOneAndUpdate({_id: id}, mealObject).then(() => {
    res.send({ data: "item updated", });
  })
  .catch(
    console.log("suggested_meals table error")
  );
};


  // else{
  //   mealObject = {
  //     mealName: req.body.mealName,
  //     prepTime: req.body.prepTime,
  //     cookTime: req.body.cookTime,
  //     intro: req.body.intro,
  //     formatted_ingredient: newer_ingredient_format,
  //     ingredients: req.body.ingredientStrings,
  //     stepSlides: req.body.stepSlides,
  //     // product_slider:product_slider,
  //     categories: req.body.categoryChips,
  //     servings: req.body.servings
  //     // display: false,
  //   };
  // }


  // const ingredient_list = JSON.parse(req.body.ingredient_list);
  // const sliderData = JSON.parse(req.body.product_slider);
  // const product_slider = JSON.parse(req.body.product_slider);
  
  // const product_slider = []

  // for(var i=0; i<product_slider.length; i++){

  //   if(product_slider[i].flag && product_slider[i].image !==""){
  //     console.log("FFFFFFFF: ", newer_ingredient_format[i].product);

  //     await all_products.findOne({ 'product_name': newer_ingredient_format[i].product}, '_id', async function (err, result) {
  //       console.log("productNameData:  ", result);
  //       if(result === null){
  //         const row_product = {
  //           sizes:JSON.parse('["50lbs"]'),
  //           respective_prices: JSON.parse('[]'),
  //           id:11,
  //           product_name: newer_ingredient_format[i].product,
  //           product_image: product_slider[i].image,
  //           product_price: "12",
  //         };
  //         all_products.create(row_product);
  //       }else{
  //         const row_product = {
  //           sizes:JSON.parse('["50lbs"]'),
  //           respective_prices: JSON.parse('[]'),
  //           id:11,
  //           product_name: newer_ingredient_format[i].product,
  //           product_image: product_slider[i].image,
  //           product_price: "12",
  //         };
  
  //         all_products.findByIdAndUpdate({_id: result._id}, row_product).then((err, result1) => {
  //           console.log("Update_productNameData:  ");
  //           // res.send({ data: "item updated", });
  //         })
  //         .catch(() =>
  //             next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
  //         }));
  //       }
  //     })
  //   }
  //   product_slider[i].flag = false;    
  // }


  // for(var i=0; i<newer_ingredient_format.length; i++){
  //   console.log("newer_ingredient_format: ", i);
  //   if(sliderData[i]==null){
  //     if(ingredient_list[i].path_flag){
  //       n += 1;
  //       product_slider.push({ingredient: newer_ingredient_format[i].product, image: url+"/uploads/" + req.files[n].filename, flag:ingredient_list[i].path_flag});

  //       const row_product = {
  //         sizes:JSON.parse('["50lbs"]'),
  //         respective_prices: JSON.parse('[]'),
  //         id:11,
  //         product_name: newer_ingredient_format[i].product,
  //         product_image: url+"/uploads/" + req.files[n].filename,
  //         product_price: "12",
  //       };
  //       all_products.create(row_product);

  //     }else{
  //       product_slider.push({ingredient: newer_ingredient_format[i].product, image:ingredient_list[i].path, flag:ingredient_list[i].path_flag});
  //     }
  //   }else{     
  //     console.log("newer_ingredient_format111: ", i);
  //     if(ingredient_list[i].path_flag){
  //       n += 1;
  //       console.log("newer_ingredient_format222: ", i);

  //       product_slider.push({ingredient: newer_ingredient_format[i].product, image: url+"/uploads/" + req.files[n].filename, flag:ingredient_list[i].path_flag});
        
  //       console.log("newer_IYYY:  ", newer_ingredient_format[i]);

  //       await all_products.findOne({ 'product_name': newer_ingredient_format[i].product}, '_id', async function (err, result) {
  //         console.log("productNameData:  ", result);
  //         console.log("newer_ingredient_format:  ", newer_ingredient_format); 
  //         console.log(" i = ", i);
  //         console.log("newer_I:  ", newer_ingredient_format[i]);

  //         const row_product = {
  //           sizes:JSON.parse('["50lbs"]'),
  //           respective_prices: JSON.parse('[]'),
  //           id:11,
  //           product_name: newer_ingredient_format[i].product,
  //           product_image: url+"/uploads/" + req.files[n].filename,
  //           product_price: "12",
  //         };

  //         all_products.findByIdAndUpdate({_id: result._id}, row_product).then((err, result1) => {
  //           console.log("Update_productNameData:  ", result1);
  //           // res.send({ data: "item updated", });
  //         })
  //         .catch(() =>
  //             next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
  //         }));
  //       });
        
  //     }else{
  //       product_slider.push(sliderData[i]);
  //     }
  //   }
  // }

  // console.log("product_slider:",product_slider);   