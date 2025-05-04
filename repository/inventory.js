const { Supplier } = require("../db/dbMongo/config/db_buildSchema");
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
      console.log("Checking ingredient:", element?.item_name); // Debugging the ingredient
      console.log("Matched ingredient:", current || "No match found"); // Debugging match status
      console.log("Processing set_prices:", current?.set_prices || "No set_prices found");

      arr.push({
        // item_price: Number(current?.set_price),
        item_price: Array.isArray(current?.set_prices)
          ? current?.set_prices.map((price) => ({
            store_id: price.store_id,
            currency: price.currency,
            price: Number(price.price),
          }))
          : [],
        product_available: current?.product_available,
        item_quantity: current?.item_quantity,
        item_name: element?.item_name,
        item_measurement: element?.item_measurement,
        formatted_string_of_item: element?.formatted_string_of_item,
        _id: element._id,
      });
    });
    console.log("Final Inventory Payload:", JSON.stringify(payload, null, 2));

    const newInventory = await Inventory.create(payload);

    await Item.findByIdAndUpdate(
      { _id: payload?.item },
      {
        $set: {
          item_price: Array.isArray(payload?.meal_price)
            ? Number(payload.meal_price[0]?.price || 0)
            : Number(payload?.meal_price),
          item_available: payload?.in_stock,
          meal_prep_time: payload?.estimated_preparation_time,
          ingredeints_in_item: arr.map((ingredient) => ({
            ...ingredient,
            item_price: Array.isArray(ingredient.set_prices) && ingredient.set_prices.length > 0
              ? Number(ingredient.set_prices[0].price)
              : 0,
            set_prices: Array.isArray(ingredient.set_prices)
              ? ingredient.set_prices.map((p) => ({
                store_id: mongoose.Types.ObjectId(p.store_id),
                currency: p.currency,
                price: Number(p.price),
              }))
              : [],
          })),

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

function normalizeArray(arr) {
  const uniqueSet = new Set();

  arr.forEach(item => {
    item.split(",").forEach(id => uniqueSet.add(id.trim()));
  });

  return Array.from(uniqueSet);
}
exports.getInventories = async (page, filter_) => {
  try {
    let filter = { ...filter_ };
    if (filter.country) {
      delete filter.country
    }
    let getPaginate = await paginate(page, filter);
    const inventoriesResponse = await Inventory.find(filter)
    const storeIds = inventoriesResponse
      .filter((inventory) => Boolean(inventory.storeId))
      .map((inventory) => inventory.storeId.toString())
    const arr = normalizeArray(storeIds)

    const country_filter = filter_?.country
      ? { 'supplier_address.country': filter_.country }
      : {};
    const response = await Supplier.find({
      _id: {
        $in: arr
      },
      ...country_filter
    })
    // .limit(getPaginate.limit)
    // .skip(getPaginate.skip)

    return { inventory: response, count: getPaginate.docCount };
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
