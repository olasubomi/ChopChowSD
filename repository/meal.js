const {
  meals,
  suggested_meals,
  products,
  categories,
} = require("../db/dbMongo/config/db_buildSchema");
const mongoose = require("mongoose");

exports.createMeal = async (payload) => {
  try {
    return await meals.create(payload);
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "create meals operation failed",
      code: 500,
    };
  }
};

exports.getMeals = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const mealsResponse = await meals
      .find(filter)
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return { meals: mealsResponse };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get meals operation failed",
      code: 500,
    };
  }
};

exports.deleteMeal = async (id) => {
  try {
    const mealResponse = await meals.deleteOne({ _id: id });
    return { message: "deleted sucessfully" };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "delete meals operation failed",
      code: 500,
    };
  }
};

exports.getMeal = async (id) => {
  try {
    const mealResponse = await meals.findOne({ _id: id });
    return { meal: mealResponse };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get meals operation failed",
      code: 500,
    };
  }
};

exports.getSuggestedMeals = async (page,filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const suggestedMeals = await suggested_meals.find(filter || {})
    .find(filter)
    .limit(getPaginate.limit)
    .skip(getPaginate.skip);
    return { suggestedMeals: suggestedMeals };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Get suggested meals operation failed",
      code: 500,
    };
  }
};

exports.updateMeal = async (filter, payload) => {
  try {
    return await meals.findOneAndUpdate(
      filter,
      {
        $set: payload,
      },
      { new: true }
    );
  } catch (error) {
    console.log({ error });
  }
};

exports.updateNestedMealValue = async (filter, payload) => {
  try {
    return await meals.findOneAndUpdate(
      filter,
      {
        $set: payload,
      },
      { new: true }
    );
  } catch (error) {
    console.log({ error });
  }
};

exports.removeSuggestedMeal = async (suggestedMealID) => {
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

exports.createMealFromSuggestion = async (data_ids) => {
  try {
    id_data = [];
    for (var i = 0; i < data_ids.length; i++) {
      id_data.push(mongoose.Types.ObjectId(data_ids[i]));
    }

    const suggestedMealsArray = await suggested_meals.find({
      _id: { $in: id_data },
    });

    if (suggestedMealsArray.length < 1) {
      throw { message: "sugested meals do not exist", code: 400 };
    }

    let createdMeals = [];
    suggestedMealsArray.forEach(async(doc) => {
      let create = await meals.create(doc);
      createdMeals.push(create)
    });

    await suggested_meals.remove({
      _id: { $in: id_data },
    });

    return {
      msg: "Succesfully created meals from suggested meals",
      done: true,
      meal: createdMeals,
    };
  } catch (error) {
    throw {
      message: error.message || "create meal operation failed",
      code: error.code || 500,
    };
  }
};

exports.addMealSuggestion = async (payload) => {
  try {
    const new_product_ingredients = payload.new_product_ingredients;
    for (i = 0; i < new_product_ingredients.length; i++) {
      const product = {
        product_name: JSON.parse(new_product_ingredients[i]).productName,
      };
      await products.create(product);
    }
    const suggestedMeals = await suggested_meals.create(payload);
    return {
      suggestedMeals: suggestedMeals,
      message: "Succesfully added",
      done: true,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "add meal suggestion failed",
      code: 500,
    };
  }
};

exports.updateSuggestedMealItem = async (payload) => {
  try {
    const udpateMeal = await suggested_meals.findOneAndUpdate(
      { _id: payload.id },
      {
        ...payload,
      },
      {
        new: true,
      }
    );
    return { message: "meal updated successfully", meal: udpateMeal };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "add meal suggestion failed",
      code: 500,
    };
  }
};

exports.getAllCategories = async (filter) => {
  try {
    const categories = await categories.find(filter);
    return { categories };
  } catch (error) {
    throw {
      error: error,
      message: error.message || "get all categories failed",
      code: 500,
    };
  }
};

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await meals.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit };
};
