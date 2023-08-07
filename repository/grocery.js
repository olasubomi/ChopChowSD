const { User } = require("../db/dbMongo/config/db_buildSchema");
const { Item } = require("../model/item");
const { Grocery } = require("../model/grocery");

const createGroceryList = async (
  payload,
  listedName,
  groceryItemBody,
  item
) => {
  try {
    //saving grocery list to mongoDb
    const groceries = new Grocery({
      userId: payload.userId,
      groceryList: [
        {
          listName: listedName,
          groceryItems: [
            {
              item_id: groceryItemBody[0].itemId,
              item: item,
              quantity: groceryItemBody[0].quantity,
              pickUpTime: groceryItemBody[0].pickUpTime,
            },
          ],
        },
      ],
    });
    return await groceries.save();
  } catch (error) {
    console.log({ error });
  }
};

const validateGroceryUser = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.log(error);
  }
};

const findAllUserGroceryList = async (filter) => {
  try {
    return await Grocery.find(filter);
  } catch (error) {
    console.log({ error });
  }
};

const validateGroceryItem = async (itemId) => {
  try {
    return await Item.findById(itemId);
  } catch (error) {
    console.log(error);
  }
};

const addItemToList = async (filter, payload, listedName) => {
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
};

const createNewList = async (filter, payload) => {
  try {
    return await Grocery.updateOne(filter, {
      $addToSet: payload,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getGroceryList = async (filter) => {
  try {
    return await Grocery.find(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "Get all groceries operation failed",
      code: error.code || 500,
    };
  }
};

module.exports = {
  createGroceryList,
  validateGroceryUser,
  findAllUserGroceryList,
  validateGroceryItem,
  createNewList,
  addItemToList,
  getGroceryList,
};
