const { meals } = require("../db/dbMongo/config/db_buildSchema");

exports.createMeal = async (payload) => {
  try {
    const checkMealExist = await meals.findOne({
      meal_name: payload.meal_name,
      user: payload.user,
    });
    if (checkMealExist) {
      throw { message: "meal already exists" };
    }
    return await meals.create(payload);
  } catch (error) {
    console.log({ error });
    throw {
      messsage: error.message || "create meals operation failed",
      code: error.code || 500,
    };
  }
};

exports.getMeals = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const mealsResponse = await meals
      .find(filter)
      .limit(getPaginate.limit)
      .skip(getPaginate.skip)
      .populate("user similar_meals stores_available");
    return { meals: mealsResponse, count: getPaginate.docCount };
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

exports.getMeal = async (filter) => {
  try {
    const mealResponse = await meals
      .findOne(filter)
      .populate("user similar_meals stores_available");
    return { meal: mealResponse };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get meals operation failed",
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
  return { skip, limit, docCount };
};
