const { categories } = require("../db/dbMongo/config/db_buildSchema");

const createCategory = async (payload) => {
  try {
    return await categories.insertMany(payload);
  } catch (error) {
    console.log(payload);
    console.log({ error });
  }
};


const createCategoriesFromCreateMeal = async (payload) => {
  try {
    payload.map(async (category) => {
      const checkCategory = await getCategory({ category_name: category });
      if (!checkCategory) {
        await createCategory({
          category_name: category,
          category_type: "meal",
          affiliated_objects: "MEAL",
        });
      }
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

const updateCategory = async (filter, payload) => {
  try {
    return await categories.findOneAndUpdate(filter, payload, { new: true });
  } catch (error) {
    console.log({ error });
  }
};

const getAllCategories = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const allCategories = await categories
      .find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return {
      categories: allCategories,
      count: getPaginate.docCount,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all categories operation failed",
      code: error.code || 500,
    };
  }
};

const getCategory = async (filter) => {
  try {
    return await categories.findOne(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all categories operation failed",
      code: error.code || 500,
    };
  }
};

const deleteCategory = async (id) => {
  try {
    const deleteCategory = await categories.deleteOne({ _id: id });
    if (deleteCategory) {
      return { message: "Category sucessfully removed" };
    }
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all categories operation failed",
      code: error.code || 500,
    };
  }
};

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await categories.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
