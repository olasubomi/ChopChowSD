const { products, User } = require("../db/dbMongo/config/db_buildSchema");
const { Grocery } = require("../model/grocery");

const createGroceryList = async (payload) => {
  try {
    //saving grocery list to mongoDb
    const groceries = new Grocery(payload);
    return await groceries.save();
  } catch (error) {
    console.log({ error });
  }
};

const validateGroceryUser = async(userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.log(error);
  }
};

const findAllUserGroceryList = async(filter) => {
  try {
    return await Grocery.find(filter);
  } catch (error) {
    console.log({ error });
  }
}

const validateGroceryProduct = async(productId) => {
  try {
    return await products.findById(productId);
  } catch (error) {
    console.log({ error });
  }
}

const addProductToList = async(filter, payload, listedName) => {
  try {
    return await Grocery.updateOne(
      filter,
      {
        $addToSet: {
          "groceryList.$[elem].groceryItems": payload,
        },
      },
      { arrayFilters: [{ "elem.listName": listedName }] }
    );
  } catch (error) {
    console.log({ error });
  }
}

const createNewList = async(filter, payload) => {
  try {
    return await Grocery.updateOne(
      filter,
      {
        $addToSet: payload
      }
    );
  } catch (error) {
    console.log({ error });
  }
}

const getGroceryList = async (filter) => {
  try {
    return await Grocery.find(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all groceries operation failed",
      code: error.code || 500,
    };
  }
};

module.exports = {
  createGroceryList,
  validateGroceryUser,
  findAllUserGroceryList,
  validateGroceryProduct,
  createNewList,
  addProductToList,
  getGroceryList,
};
