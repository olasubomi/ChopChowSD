const { Inventory } = require("../db/dbMongo/config/inverntory");
const { Item } = require("../model/item");
const mongoose = require("mongoose");

exports.createInventory = async (payload) => {
  try {
    payload.storeId = Array.isArray(payload.storeId)
      ? payload.storeId
      : [payload.storeId];

    const checkExist = await Inventory.findOne({
      storeId: { $in: payload?.storeId },
      item: payload?.item,
      item_type: payload?.item_type,
    });
    if (checkExist) {
      throw "Item already exists in store inventory";
    }
    const item = await Item.findById({ _id: payload?.item });
    let ingredeints_in_item = [...item.ingredeints_in_item];
    let arr = [];

    ingredeints_in_item?.map((element) => {
      const current = payload?.ingredients?.find(
        (ele) => ele?.item_name === element?.item_name
      );
      arr.push({
        item_price: Number(current?.set_price),
        product_available: current?.product_available,
        item_quantity: current?.item_quantity,
        item_name: element?.item_name,
        item_measurement: element?.item_measurement,
        formatted_string_of_item: element?.formatted_string_of_item,
        _id: element._id,
      });
    });

    const newInventory = await Inventory.create(payload);

    await Item.findByIdAndUpdate(
      { _id: payload?.item },
      {
        $set: {
          item_price: Number(payload?.meal_price),
          item_available: payload?.in_stock,
          meal_prep_time: payload?.estimated_preparation_time,
          ingredeints_in_item: arr,
          stores_available: payload?.storeId?.map((storeId) =>
            mongoose.Types.ObjectId(storeId)
          ),
        },
        $addToSet: { inventories: newInventory._id },
      },
      { new: true }
    );

    return newInventory;
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "create inventory operation failed",
      code: 500,
    };
  }
};

exports.getInventories = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const inventoriesResponse = await Inventory.find(filter)
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);

    return { inventory: inventoriesResponse, count: getPaginate.docCount };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get inventory operation failed",
      code: 500,
    };
  }
};

exports.deleteInventory = async (id, item_id) => {
  try {
    if (item_id) {
      const inventoryResponse = await Inventory.deleteOne({ _id: id });
      await Item.findByIdAndUpdate(
        {
          _id: item_id,
        },
        {
          item_available: false,
          item_price: 0,
        }
      );

      await Item.findByIdAndUpdate(item_id, {
        $pull: { inventories: id },
        item_available: false,
        item_price: 0,
      });
    }
    return { message: "deleted sucessfully" };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "delete inventory operation failed",
      code: 500,
    };
  }
};

exports.getInventory = async (filter) => {
  try {
    const inventoryResponse = await Inventory.findOne(filter).populate(
      "item storeId"
    );
    return { inventory: inventoryResponse };
  } catch (error) {
    throw {
      error: error,

      messsage: error.message || "Get inventory operation failed",
      code: 500,
    };
  }
};
exports.getStoreInventory = async (filter) => {
  try {
    const inventoryResponse = await Inventory.find(filter).populate(
      "item storeId"
    );
    return { inventory: inventoryResponse };
  } catch (error) {
    throw {
      error: error,

      messsage: error.message || "Get inventory operation failed",
      code: 500,
    };
  }
};

exports.allUserInventory = async (filter, query = {}) => {
  try {
    if (Object.values(query).length) {
      query = {
        path: "item",
        model: "Item",
        match: { item_name: query?.item_name },
        select: "item_name itemImage0 item_price store_available",
      };
    } else {
      query = {
        path: "item",
        select: "item_name itemImage0 item_price store_available",
      };
    }

    const inventoryItems = await Inventory.find({ user: filter.userId })
      .populate(query)
      .populate({
        path: "storeId",
        select: "store_name, currency",
      });

    return { inventoryItems };
  } catch (error) {
    console.error("Error:", error);

    throw {
      error: error,
      message: error.message || "Get inventory operation failed",
      code: 500,
    };
  }
};

exports.updateInventory = async (filter, payload) => {
  try {
    return await Inventory.findOneAndUpdate(
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

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Inventory.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};
