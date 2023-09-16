const { User } = require("../db/dbMongo/config/db_buildSchema");
const { Item } = require("../model/item");
const { Grocery } = require("../model/grocery");
const { GroceryList } = require("../model/grocery-list");

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

const createNewGroceryList = async (payload) => {
  try {
    const groceryList = new GroceryList(payload);
    return await groceryList.save();
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Create grocery list operation failed",
      code: error.code || 500,
    };
  }
}

const addAnItemToAGroceryList = async (payload) => {
  try {

    await checkIfItemAlreadyExistInAGroceryList({
      listName: payload.listName,
      itemId: payload.itemId
    })

    return await GroceryList.findOneAndUpdate(
      { listName: payload.listName },
      {
        $push: {
          groceryItems: {
            item: payload.itemId,
            quantity: payload.quantity,
            measurement: payload.measurement
          }
        }
      }
    )
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Add item grocery list operation failed",
      code: error.code || 500,
    };
  }
}

const addJsonDataToGroceryList = async (payload) => {
  try {
    await checkIfJsonDataHasAlready({
      listName: payload.listName,
      item_name: payload.item_name
    })

    const data = {
      id: Math.floor(Math.random() * 1000000000000),
      item_name: payload.item_name,
      createdAt: new Date()
    }

    return await GroceryList.findOneAndUpdate(
      { listName: payload.listName },
      {
        $push: {
          groceryItems: {
            itemData: data
          }
        }
      }
    )
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Add item grocery list operation failed",
      code: error.code || 500,
    };
  }
}


const checkIfItemAlreadyExistInAGroceryList = async (payload) => {
  try {
    const groceryList = await checkIfGroceryListExist({ listName: payload.listName });
    console.log('present grocery', groceryList.groceryItems, payload.itemId.toString())
    const doesExist = groceryList.groceryItems.some(element => element?.item?.toString() === payload.itemId.toString());
    if (doesExist) {
      throw "Item already exist on grocery list"
    }
  } catch (error) {
    throw "Check operation failed"
  }
}

const checkIfJsonDataHasAlready = async (payload) => {
  try {
    const groceryList = await checkIfGroceryListExist({ listName: payload.listName });
    const doesExist = groceryList.groceryItems.some(element => element.itemData.item_name?.toString() === payload.item_name);
    if (doesExist) {
      throw "Item already exist on grocery list"
    }
  } catch (e) {
    throw "Check operation failed"

  }
}


const checkIfGroceryListExist = async (filter) => {
  try {
    return await GroceryList.findOne(filter).populate('groceryItems')
  } catch (error) {
    throw {
      error: error,
      message: error.message || "Grocery list does not exist",
      code: error.code || 500,
    };
  }
}


const getAllGroceryList = async (userId) => {
  try {
    return await GroceryList.find({ user: userId.toString() })
      .populate('user')
      .populate({
        path: 'groceryItems',
        populate: {
          path: 'item measurement'
        }
      })

  } catch (error) {
    throw error
  }
}

const getOneGrocery = async (id) => {
  try {
    return await GroceryList.findById({ _id: id })
      .populate('user')
      .populate({
        path: 'groceryItems',
        populate: {
          path: 'item measurement'
        }
      })
  } catch (error) {
    throw error
  }
}




const removeAnItemFromGroceryList = async (filter) => {
  try {
    return await GroceryList.findByIdAndUpdate(
      { _id: filter.groceryListId },
      {
        $pull: {
          groceryItems: {
            _id: filter.groceryItemId
          }
        }
      }
    )
  } catch (error) {
    throw error
  }
}

const updateGroceryDetails = async (id, payload) => {
  try {
    return await GroceryList.findByIdAndUpdate(
      { _id: id },
      { ...payload }
    )
  } catch (error) {
    throw error
  }
}


const deleteGroceryList = async (id) => {
  try {
    return await GroceryList.findByIdAndDelete({ _id: id })
  } catch (error) {
    throw error
  }
}


module.exports = {
  createGroceryList,
  validateGroceryUser,
  findAllUserGroceryList,
  validateGroceryItem,
  createNewList,
  addItemToList,
  getGroceryList,
  addAnItemToAGroceryList,
  createNewGroceryList,
  checkIfGroceryListExist,
  getAllGroceryList,
  getOneGrocery,
  removeAnItemFromGroceryList,
  updateGroceryDetails,
  deleteGroceryList,
  checkIfJsonDataHasAlready,
  addJsonDataToGroceryList
};
