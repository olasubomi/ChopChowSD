const { Inventory } = require("../db/dbMongo/config/inverntory");

exports.createInventory = async (payload) => {
  try {
    return await Inventory.create(payload);
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
      .skip(getPaginate.skip)
      .populate("item");
    return { inventory: inventoriesResponse, count: getPaginate.docCount };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get inventory operation failed",
      code: 500,
    };
  }
};

exports.deleteInventory = async (id) => {
  try {
    const inventoryResponse = await Inventory.deleteOne({ _id: id });
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
      "item"
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
