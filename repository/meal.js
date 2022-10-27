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

exports.getMeal = async (filter) => {
  try {
    const mealResponse = await meals.findOne(filter);
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
  return { skip, limit };
};
