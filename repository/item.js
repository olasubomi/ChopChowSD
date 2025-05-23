const { filter } = require("bluebird");
const { Item } = require("../model/item");
const { NotificationService } = require("./notificationService");
const {
  notifications,
  User,
  Supplier,
} = require("../db/dbMongo/config/db_buildSchema");

const { Inventory } = require("../db/dbMongo/config/inverntory");

const createItem = async (payload) => {
  try {
    //saving item to mongoDb
    const items = new Item(payload);
    return (await await items.save()).populate("item_categories");
  } catch (error) {
    console.log({ error });
  }
};

const getItems = async (page, filter) => {
  let query = {};
  if (filter?.user) {
    query.user = filter.user;
  }



  if (filter?.name) {
    query.item_name = { $regex: filter.name, $options: "i" };
  }

  let sort = {};

  if (filter?.createdAt) {
    sort.createdAt = Number(filter.createdAt);
  }
  if (filter.average_rating) {
    query.average_rating = {
      $gte: filter.average_rating,
    };
  }

  if (filter?.item_name) {
    sort.item_name = Number(filter.item_name);
  }

  if (filter?.item_price === "1") {
    query.item_price = {
      $gte: 1
    }
  } else if (filter?.item_price === '0') {
    query.item_price = { $exists: false }
  } else if (filter?.item_price === "All") {

  }

  if (filter?.type) {
    query.item_type = { $in: filter.type.split(",") };
  }
  if (filter.status !== "all" && Boolean(filter.status)) {
    query.item_status = {
      $elemMatch: {
        status: filter.status,
      },
    };
  }

  let getPaginate = await paginate(page, {
    ...query,
    limit: filter.limit ? filter.limit : 10
  });

  const withPaginate = filter.hasOwnProperty("withPaginage")
    ? filter.withPaginate === "false"
      ? false
      : true
    : true;
  delete filter.withPaginate;
  let itemResponse = [];
  if (withPaginate) {
    itemResponse = await Item.find(query)
      .sort(sort)
      .limit(getPaginate.limit)
      .skip(getPaginate.skip)
      .populate("item_categories item_description user")
      .populate("store_available")
      .populate({
        path: "inventories",
        select: "_id in_stock storeId meal_price",
      });

    if (filter?.startsWith) {
      const arr_1 = [];
      const arr_2 = [];
      itemResponse = itemResponse.map((entry) => {
        if (
          entry?.item_name
            .toLowerCase()
            .startsWith(filter?.startsWith.toLowerCase())
        ) {
          arr_1.push(entry);
        } else {
          arr_2.push(entry);
        }
      });
      itemResponse = [...arr_1, ...arr_2];
    }
  } else {
    await Item.find(query);
  }

  return { items: itemResponse, count: getPaginate.docCount };
};
const getStoreItems = async (filter) => {
  try {
    return await Item.find(filter);
  } catch (error) {
    console.log(error);
  }
};

const filterStoresByUsername = async (name) => {
  try {
    const items = await Item.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $match: {
          $or: [
            { "userDetails.first_name": { $regex: name, $options: "i" } },
            { "userDetails.last_name": { $regex: name, $options: "i" } },
          ],
        },
      },
    ]);

    let userIds = items.map((entry) => entry.user.toString());

    let uniqueUserIds = [];

    for (let id of userIds) {
      if (!uniqueUserIds.includes(id)) {
        uniqueUserIds.push(id);
      }
    }

    return await User.find({
      _id: {
        $in: uniqueUserIds,
      },
    }).select("first_name last_name username");
  } catch (e) {
    console.log(e);
  }
};

const getOneUserItem = async (filter) => {
  try {
    return await Item.find(filter).populate(
      "item_description item_categories store_available inventories"
    );
  } catch (error) {
    console.log(error);
  }
};

const filterItem = async (filter, query = {}) => {
  try {
    return await Item.find({
      $or: [
        {
          ingredeints_in_item: {
            $exists: true,
            $ne: [],
            $elemMatch: {
              item_name: filter,
            },
          },
        },
        {
          item_name: { $regex: filter, $options: "i" },
          item_status: {
            $elemMatch: {
              status: "Public",
            },
          },
          ...query,
        },
      ]
    })
      .populate('store_available user inventories');

  } catch (error) {
    console.log(error);
  }
};

const getUserItems = async (data) => {
  try {
    const { type, page, limit, user, filterBy = {} } = data;
    let getPaginate = await paginate2(page, { type, limit, user });
    const itemResponse = await Item.find({
      item_type: { $in: type.split(",") },
      user: user,
      ...filterBy,
    })
      .populate("item_categories item_description user inventories")
      .skip(getPaginate.skip)
      .limit(getPaginate.limit);
    return { items: itemResponse, count: getPaginate.docCount };
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

const getItemsForAUser = async (userId) => {
  try {
    return await Item.find({
      user: userId,
    });
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
    const updatedItem = await Item.findOneAndUpdate(
      { _id: payload.itemId },
      {
        $set: {
          "item_status.$[elemA].status": payload.status,
          "item_status.$[elemA].status_note": payload.status_note,
          rejectionMessage: {
            title: payload?.title ?? "",
            message: payload?.message ?? "",
          },
        },
      },
      {
        arrayFilters: [{ "elemA._id": arrayId }],
      }
    );
    if (payload.item_status !== "Pending" && payload.status !== "Pending") {
      const notfication = await notifications.create({
        message: `Suggested Meal: ${updatedItem.item_name} ${payload.status}`,
        notifiableType: "Item",
        notifiable: updatedItem,
      });
      await User.findByIdAndUpdate(
        {
          _id: updatedItem.user,
        },
        {
          $push: { notifications: notfication },
        }
      );
      NotificationService.publishMessage(updatedItem.user, "status_updated", {
        message: "Item status updated",
        data: updatedItem,
      });
    }

    return updatedItem;
  } catch (error) {
    console.log(error);
  }
};
const paginate = async (page, filter = {}) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  let query = { ...filter };
  if (filter.type) {
    query.item_type = { $in: filter.type.split(",") || [] };
  }

  if (filter?.user) {
    query.user = filter.user;
  }
  const docCount = await Item.countDocuments(query);
  // if (docCount < skip) {
  skip = (page - 1) * limit;
  // }
  return { skip, limit, docCount };
};

const paginate2 = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Item.countDocuments({
    item_type: { $in: filter.type.split(",") },
    user: filter.user,
  });
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};

const updateItem = async (filter, payload) => {
  try {
    return await Item.findOneAndUpdate(
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

const updateUserComment = async (payload) => { };

const getSimilarItem = async (itemNames) => {
  try {
    return await Item.find({
      ingredeints_in_item: {
        $elemMatch: {
          item_name: itemNames,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

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
  paginate,
  getOneUserItem,
  updateItem,
  filterItem,
  getSimilarItem,
  getItemsForAUser,
  filterStoresByUsername,
};
