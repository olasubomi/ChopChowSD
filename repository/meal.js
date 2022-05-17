const {
  meals,
  suggested_meals,
  meal_images,
  all_products,
  all_meal_categories,
  all_utensils,
  all_measurements,
} = require("../db/dbMongo/config/db_buildSchema");
const mongoose = require("mongoose");

const getMeals = async (payload) => {
  try {
    const mealsResponse = await meals.find();
    return { meals: mealsResponse };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get meals operation failed",
      code: 500,
    };
  }
};

const getSuggestedMeals = async () => {
  try {
    const suggestedMeals = await suggested_meals.find();

    return { suggestedMeals: suggestedMeals };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Get suggested meals operation failed",
      code: 500,
    };
  }
};

const getMealImages = async () => {
  try {
    const mealImages = await meal_images.find();
    return mealImages;
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Get meal images operation failed",
      code: 500,
    };
  }
};

const removeSuggestedMeal = async (suggestedMealID) => {
  try {
    const removeSuggestesdMeal = await suggested_meals.findByIdAndRemove({
      _id: suggestedMealID,
    });
    if (removeSuggestesdMeal) {
      return { message: "item deleted", deleted: true };
    } else {
      throw { error: "operaion failed , meal not deleted" };
    }
  } catch (error) {
    throw {
      error: error,
      message: error.message || "remove meal operation failed",
      code: 500,
    };
  }
};

const createMealFromSuggestion = async (data_ids) => {
  try {
    id_data = [];
    for (var i = 0; i < data_ids.length; i++) {
      id_data.push(mongoose.Types.ObjectId(data_ids[i]));
    }
    const flag = 0;
    const suggestedMealsArray = await suggested_meals.find({
      _id: { $in: id_data },
    });

    let mealData = [];
    suggestedMealsArray.forEach((doc) => {
      mealData.push({
        categories: doc.categories,
        instructions: doc.instructions,
        label: doc.label,
        mealImage: doc.mealImage,
        readTime: doc.readTime,
        cookTime: doc.cookTime,
        intro: doc.intro,
        newer_ingredient_format: doc.newer_ingredient_format,
        servings: doc.servings,
        product_slider: doc.product_slider,
        display: doc.display,
      });
    });

    await suggested_meals.remove({
      _id: { $in: id_data },
    });

    await meals.create(mealData);

    return {
      msg: "Succesfully created meals from suggested meals",
      done: true,
    };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "create meal operation failed",
      code: 500,
    };
  }
};

const addMealSuggestion = async (file, payload) => {
  try {
    var serverMealImageName;
    if (file === undefined) {
      serverMealImageName = "";
    } else {
      serverMealImageName = file.filename;
    }

    const new_product_ingredients = JSON.parse(payload.new_product_ingredients);
    const new_measurements = payload.new_measurements;
    const newKitchenUtensils = payload.newKitchenUtensils;
    const newCategories = payload.newCategories;

    const parsed_categories = JSON.parse(newCategories);
    const parsed_utensils = JSON.parse(newKitchenUtensils);
    const parsed_measurements = JSON.parse(new_measurements);

    for (i = 0; i < new_product_ingredients.length; i++) {
      const product = {
        product_name: new_product_ingredients[i].productName,
      };
      all_products.create(product);
    }

    for (var i = 0; i < parsed_measurements.length; i++) {
      const measurement = {
        measurement: parsed_measurements[i],
      };
      all_measurements.create(measurement);
    }

    for (var i = 0; i < parsed_utensils.length; i++) {
      const utensil = {
        kitchenUtensil: parsed_utensils[i],
      };
      all_utensils.create(utensil);
    }

    for (var i = 0; i < parsed_categories.length; i++) {
      const row_category = {
        category_name: parsed_categories[i],
      };
      all_meal_categories.create(row_category);
    }
    ss;
    const mealObject = {
      mealName: payload.mealName,
      // mealImage:  Buffer.from(JSON.stringify(r.mealImage)),
      mealImage: payload.mealImage,
      mealImageName: serverMealImageName,
      prepTime: payload.prepTime,
      cookTime: payload.cookTime,
      intro: payload.intro,
      chef: payload.chef,
      formatted_ingredient: payload.formatted_ingredient,
      stepSlides: payload.instructionsGroupList, // update stepSlides
      categories: payload.categoryChips,
      utensilsrequired: payload.kitchenUtensils,
      tips: payload.mealTip,
      servings: Number(payload.servings),
    };
    const suggestedMeals = await suggested_meals.create(mealObject);

    return {
      suggestedMeals: suggestedMeals,
      message: "Succesfully added",
      done: true,
    };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "add meal suggestion failed",
      code: 500,
    };
  }
};

const updateSuggestedMealItem = async (payload) => {
  try {
    if (payload.img_change_flag == "true") {
      await suggested_meals.findOneAndUpdate(
        { _id: payload.id },
        {
          ...payload,
          stepSlides: JSON.parse(payload.instructionsGroupList),
          categories: JSON.parse(payload.categoryChips),
        }
      );
      return { message: "meal updated", done: true };
    } else {
      await suggested_meals.findOneAndUpdate(
        { _id: payload.id },
        {
          ...payload,
          stepSlides: JSON.parse(payload.instructionsGroupList),
          categories: JSON.parse(payload.categoryChips),
        }
      );
      return { message: "meal updated", done: true };
    }
  } catch (error) {
    throw {
      error: error,
      message: error.message || "add meal suggestion failed",
      code: 500,
    };
  }
};

const getAllCategories = async() => {
  try{
    const allMealCategories = await all_meal_categories.find()
    return {   data: allMealCategories,  };
  }catch(error){
    throw {
      error: error,
      message: error.message || "get all categories failed",
      code: 500,
    };
  }
};


module.exports = {
  getMeals,
  getSuggestedMeals,
  getMealImages,
  removeSuggestedMeal,
  createMealFromSuggestion,
  addMealSuggestion,
  updateSuggestedMealItem,
  getAllCategories,
};
