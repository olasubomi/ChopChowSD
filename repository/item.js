const { Item } = require("../model/item");

const createItem = async (payload) => {
  try {
    //saving item to mongoDb
    const items = new Item(payload);
    return (await items.save()).populate('item_data')
  } catch (error) {
    console.log({ error });
  }
};

const getItems = async () => {
  return await Item.find();
};

const getStoreItems = async (filter) => {
  try {
    return await Item.find(filter);
  } catch (error) {
    console.log(error);
  }
};

const getUserItems = async (filter) => {
  try {
    return await Item.find(filter)
      .populate("item_data")
      .populate('item_categories')
  } catch (error) {
    console.log(error);
  }
};

const getCategoryItems = async (filter) => {
  try {
    return await Item.find(filter);
  } catch (error) {
    console.log(error);
  }
};

const confirmItem = async (payload) => {
  try {
    return await Item.findById(payload);
  } catch (error) {
    console.log(error);
  }
};

const updateControl = async (payload) => {
  try {
    return await Item.findByIdAndUpdate(
      { _id: payload.itemId },
      { $set: { publicly_available: payload.status } },
      { returnOriginal: false }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (payload) => {
  return await Item.deleteOne({
    _id: payload.itemId,
  });
};

const itemUpdate = async (payload, arrayId) => {
  try {
    return await Item.findOneAndUpdate(
      { _id: payload.itemId },
      {
        $set: {
          "item_status.$[elemA].status": payload.status,
          "item_status.$[elemA].status_note": payload.status_note,
        },
      },
      {
        arrayFilters: [{ "elemA._id": arrayId }],
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const updateUserComment = async (payload) => { };

module.exports = {
  createItem,
  getItems,
  getStoreItems,
  getUserItems,
  getCategoryItems,
  confirmItem,
  updateControl,
  deleteItem,
  itemUpdate,
};
