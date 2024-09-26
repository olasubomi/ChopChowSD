const { categories } = require("../db/dbMongo/config/db_buildSchema");

const createCategory = async (payload) => {
  try {
    return await categories.insertMany(payload);
  } catch (error) {
    console.log(payload);
    console.log({ error });
  }
};

const createOneCategory = async (payload) => {
  try {
    const category = new categories(payload);
    return await category.save();
  } catch (error) {
    console.log(payload);
    console.log({ error });
  }
};


const createCategoriesFromCreateMeal = async (payload) => {
  try {
    const resps = payload.map(async (category) => {
      const checkCategory = await getCategory({ category_name: category });
      if (!checkCategory) {
        const res = await createOneCategory({
          category_name: category,
          category_type: payload.item_type === 'Meal' ? "meal" : "product",
          affiliated_objects: payload.item_type === 'Meal' ? "MEAL" : "PRODUCT",
        });
        console.log('resssss', res?._id?.toString())
        return res?._id?.toString()
      } else {

        return checkCategory?._id?.toString();
      }

    })
    return await resps


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
    let query = {}

    let sort = {}
    if (filter?.createdAt) {
      sort.createdAt = Number(filter.createdAt)
    }
    if (filter?.category_name) {
      query.category_name = { $regex: filter.category_name, $options: "i" }
    }
    if (filter.status !== 'all' && Boolean(filter.status)) {
      query.status = filter.status
    }
    let getPaginate = await paginate(page, query);
    const allCategories = await categories
      .find(query || {})
      .sort(sort)
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
  createCategoriesFromCreateMeal,
  createOneCategory
};
