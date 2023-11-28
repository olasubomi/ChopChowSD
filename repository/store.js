const { Supplier } = require("../db/dbMongo/config/db_buildSchema");
const { Item } = require("../model/item");

const createStore = async (payload) => {
  try {
    return await Supplier.create(payload);
  } catch (error) {
    console.log({ error });
  }
};

const updateStore = async (filter, payload) => {
  try {
    return await Supplier.findOneAndUpdate(filter, payload, { new: true });
  } catch (error) {
    console.log({ error });
  }
};

const getAllStores = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const allProducts = await Supplier.find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip)
      .populate("store_account_users"); //sugggested_meals_and_products
    return {
      products: allProducts,
      count: getPaginate.docCount,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
};

const getStore = async (filter, req) => {
  try {

    const supplier = await Supplier.findOne(filter).populate(
      "store_account_users"
    )
    if (supplier) {
      const items = await Item.find({ user: supplier.store_owner })
      return {
        supplier,
        items
      }
    } else {
      return {}
    }

    // "sugggested_meals_and_products store_account_users"

  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get single store operation failed",
      code: error.code || 500,
    };
  }
};

const getAllSupplier = async (filter, req) => {
  try {

    const supplier = await Supplier.find({
      store_name: { $regex: filter, $options: "i" }
    }).populate(
      "store_account_users"
    )
    if (supplier) {
      return {
        supplier,
      }
    } else {
      return {}
    }

    // "sugggested_meals_and_products store_account_users"

  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get single store operation failed",
      code: error.code || 500,
    };
  }
};

const deleteStore = async (id) => {
  try {
    const deleteStore = await Supplier.deleteOne({ _id: id });
    if (deleteStore) {
      return { message: "store sucessfully removed" };
    }
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Delete store failed",
      code: error.code || 500,
    };
  }
};

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Supplier.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};

module.exports = {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
  getAllSupplier
};
