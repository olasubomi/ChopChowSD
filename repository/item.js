const { filter } = require("bluebird");
const { Item } = require("../model/item");
const { NotificationService } = require("./notificationService");
const { item_description } = require("../db/dbMongo/config/db_buildSchema");


const createItem = async (payload) => {
  try {
    //saving item to mongoDb
    const items = new Item(payload);
    return (await (await items.save())).populate('item_categories')
  } catch (error) {
    console.log({ error });
  }
};

const getItems = async (page, filter) => {
  let getPaginate = await paginate(page, filter);

  let query = {
    item_type: { $in: filter.type.split(',') },
  }
  if (filter.status !== 'all') {
    query.item_status = {
      $elemMatch: {
        status: filter.status
      }
    }
  }

  console.log('query', query)
  const itemResponse = await Item
    .find(query)
    .limit(getPaginate.limit)
    .skip(getPaginate.skip)
    .populate('item_categories item_description')
    .populate('store_available')
  return { items: itemResponse, count: getPaginate.docCount };

};

const getStoreItems = async (filter) => {
  try {
    return await Item.find(filter);
  } catch (error) {
    console.log(error);
  }
};

const getOneUserItem = async (filter) => {
  try {
    return await Item.find(filter)
      .populate('item_description item_categories');
  } catch (error) {
    console.log(error);
  }
};


const filterItem = async (filter) => {
  try {
    return await Item.find({
      $or: [
        {
          ingredeints_in_item: {
            $exists: true,
            $ne: [],
            $elemMatch: {
              item_name: filter
            }
          }
        },
        {
          item_name: { $regex: filter, $options: "i" },
          'item_status': {
            $elemMatch: {
              'status': 'Public'
            }
          }
        }
      ]
    })
      .populate('store_available');

  } catch (error) {
    console.log(error);
  }
};

const getUserItems = async (data) => {
  try {
    const { type, page, limit, user } = data;
    let getPaginate = await paginate2(page, { type, limit, user });
    const itemResponse = await Item.find({
      item_type: { $in: type.split(',') },
      user: user
    })
      .populate("item_categories item_description")
      .skip(getPaginate.skip)
      .limit(getPaginate.limit)

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
      user: userId
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
        },
      },
      {
        arrayFilters: [{ "elemA._id": arrayId }],
      }
    );

    if (payload.status || payload.item_status) {

      NotificationService.publishMessage(updatedItem.user, "status_updated",
        { message: "Item status updated", data: updatedItem })

    }

    return updatedItem;

  } catch (error) {
    console.log(error);
  }
};
const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Item.countDocuments(
    {
      item_type: { $in: filter.type.split(',') }
    }
  );
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  console.log(skip, limit, docCount)
  return { skip, limit, docCount };
};



const paginate2 = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Item.countDocuments(
    {
      item_type: { $in: filter.type.split(',') },
      user: filter.user
    }
  );
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  console.log(skip, limit, docCount)
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
          item_name: itemNames
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

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
  getItemsForAUser
};
