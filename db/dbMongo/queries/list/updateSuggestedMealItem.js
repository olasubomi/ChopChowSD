const { suggested_meals, all_products } = require("../../config/db_buildSchema");

exports.updateSuggestedMealItem = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const id = req.body.id;  
  const img_change_flag = req.body.img_change_flag;  

  console.log('****req.body.id****', id);


  console.log('****creat meal data****', req.body);
  console.log("Comes in meal suggestion handler");
  const mealIngredients = req.body.ingredientStrings;
  console.log("Printing ingedient chips");
  console.log(mealIngredients);

  console.log("imgSrc:",req.files);
  const newer_ingredient_format = JSON.parse(req.body.formatted_ingredient);
  // const ingredient_list = JSON.parse(req.body.ingredient_list);
  // const sliderData = JSON.parse(req.body.product_slider);
  const product_slider = JSON.parse(req.body.product_slider);
  
  // const product_slider = []

  for(var i=0; i<product_slider.length; i++){

    if(product_slider[i].flag && product_slider[i].image !==""){
      console.log("FFFFFFFF: ", newer_ingredient_format[i].product);

      await all_products.findOne({ 'product_name': newer_ingredient_format[i].product}, '_id', async function (err, result) {
        console.log("productNameData:  ", result);
        if(result === null){
          const row_product = {
            sizes:JSON.parse('["50lbs"]'),
            respective_prices: JSON.parse('[]'),
            id:11,
            product_name: newer_ingredient_format[i].product,
            product_image: product_slider[i].image,
            product_price: "12",
          };
          all_products.create(row_product);
        }else{
          const row_product = {
            sizes:JSON.parse('["50lbs"]'),
            respective_prices: JSON.parse('[]'),
            id:11,
            product_name: newer_ingredient_format[i].product,
            product_image: product_slider[i].image,
            product_price: "12",
          };
  
          all_products.findByIdAndUpdate({_id: result._id}, row_product).then((err, result1) => {
            console.log("Update_productNameData:  ");
            // res.send({ data: "item updated", });
          })
          .catch(() =>
              next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
          }));
        }
      })
    }
    product_slider[i].flag = false;    
  }


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

  console.log("product_slider:",product_slider);   
  var mealObject ;

  if(img_change_flag=="true")
  {
    mealObject = {
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

  }else{
    mealObject = {
      label: req.body.mealLabel,
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
  }

  suggested_meals.findByIdAndUpdate({_id: id}, mealObject).then(() => {
    res.send({ data: "item updated", });
  })
  .catch(
    console.log("suggested_meals table error")
  );
};
