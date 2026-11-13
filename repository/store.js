const { Supplier, StoreClaim, User } = require("../db/dbMongo/config/db_buildSchema");
const { Item } = require("../model/item");
const moment = require('moment');
const { Comment } = require("../model/comment");


const createStore = async payload => {
  const ownerId = payload?.store_owner;
  const user = await User.findById(ownerId);
  if (!user) {
    const error = new Error("Store owner account not found");
    error.code = 404;
    throw error;
  }
  // Preserve existing app roles, especially platform administrators.
  const types = Array.isArray(user.user_type) ? user.user_type : [];
  if (!types.includes("supplier")) {
    user.user_type = [...types, "supplier"];
    await user.save();
  }
  return await Supplier.create({
    ...payload,
    store_owner: user._id,
    store_admins: [user._id]
  });
};

const updateStore = async (filter, payload) => {
  try {
    return await Supplier.findOneAndUpdate(filter, payload, { new: true });
  } catch (error) {
    console.log({ error });
  }
};

const newStoreClaim = async (payload) => {
  const newClaim = new StoreClaim({ ...payload, status: "PENDING" })
  return await newClaim.save()
}

const getAllStoreClaims = async () => {
  return await StoreClaim.find();
}

const updateStoreClaimStatus = (status) => {
  switch (status) {
    case "APPROVED":

  }
}

const checkStoreAvailability = async (filter) => {
  try {
    const store = await StoreClaim.findOne({
      user: filter.user,
      store: filter.store
    })

    let message = '';
    const store_ = await getStore({
      _id: filter.store
    })

    if (store) {
      switch (store.status) {
        case "PENDING":
          if (filter.user?.toString() === store.user?._id?.toString()) {
            message = 'The admin is yes to approve your ownship of this store'
            return null;
          } else {
            return store_
          }
        case 'APPROVED':
          message = 'Store has been approved'
          return null
        case "REJECTED":
          if (filter.user?.toString() === store.user?._id?.toString()) {
            message = 'The admin has already rejected to claim for this store'
            return null
          } else {
            return store_
          }

        case "UNAPPROVED":
          return store_;
        default: return null;
      }
    } else {
      throw new Error('Store cannot be found')
    }
  } catch (e) {
    console.log(e)
  }
}

const getAllStores = async (page, filter) => {
  try {

    let query = {}

    let sort = {}

    if (filter?.store_key) {
      query.store_name = { $regex: filter.store_key, $options: "i" }
    }

    if (filter?.createdAt) {
      sort.createdAt = Number(filter.createdAt)
    }

    if (filter?.store_name) {
      sort.store_name = Number(filter.store_name)
    }

    if (filter.status !== 'all' && Boolean(filter.status)) {
      query.status = filter.status.toUpperCase()
    }

    if (filter?.store_owner) {
      query.store_owner = filter?.store_owner
    }



    if (filter?.withPaginate) {
      delete filter.withPaginate
      let getPaginate = await paginate(page, query);
      let allProducts = await Supplier.find(query || {})
        .sort(sort)
        .limit(getPaginate.limit)
        .skip(getPaginate.skip)
        .populate("store_account_users"); //sugggested_meals_and_products

      if (filter?.startsWith) {
        const arr_1 = [];
        const arr_2 = [];
        allProducts = allProducts.map((entry) => {
          if (entry?.store_name.toLowerCase().startsWith(filter?.startsWith.toLowerCase())) {
            arr_1.push(entry)
          } else {
            arr_2.push(entry)
          }
        });
        allProducts = [...arr_1, ...arr_2]
      }
      return {
        products: allProducts,
        count: getPaginate.docCount,
      };
    } else {
      return await Supplier.find()
    }
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
};

const getTopSuppliers = async () => {
  try {
    let allComments = await Comment.aggregate([
      { $sort: { createdAt: 1, up_votes: 1 } },
      // { $limit: 10 },
      { $group: { _id: "$item" } },
      { $project: { item: "$_id", _id: 0 } }
    ]);


    allComments = allComments.map((entry) => entry.item);
    let supplier = await Item.distinct("user", {
      _id: { $in: allComments },
    })
    supplier = supplier.map((entry) => entry._id);
    console.log(supplier, 'top suppliers')
    const data = await User.find({
      _id: { $in: supplier },
    }).limit(10)
    return data

  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
}

const allSupplier = async (page, query) => {
  try {
    const limit = parseInt(query.limit) || 10;
    let skip = parseInt(page) === 1 ? 0 : limit * page;
    delete query.limit;
    let docCount = await Item.distinct("user", { ...query, user: { $ne: null } });
    docCount = docCount.filter((entry) => entry !== null); if (docCount < skip) {
      skip = (page - 1) * limit;
    }
    let allSupplier = await Item.aggregate([
      { $match: { ...query, user: { $ne: null } } },
      { $group: { _id: "$user" } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { user: 1 } }
    ]);
    allSupplier = allSupplier.filter((entry) => !Object.is(entry.user, null))
    return allSupplier
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
}

const getAllStoresForUser = async (filter) => {
  try {
    const allProducts = await Supplier.find(filter)
    return allProducts
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
};

// Assign existing accounts only. New-user invitations must use a separate,
// verified, expiring invitation flow; never generate/email plaintext passwords.
const removeUserFromStore = async (userId, storeId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User does not exist");
    error.code = 404;
    throw error;
  }
  const store = await Supplier.findById(storeId);
  if (!store) {
    const error = new Error("Store not found");
    error.code = 404;
    throw error;
  }
  if (String(store.store_owner) === String(userId)) {
    const error = new Error("Cannot remove store owner");
    error.code = 403;
    throw error;
  }
  const result = await Supplier.findOneAndUpdate(
    { _id: storeId, store_sub_admins: userId },
    { $pull: { store_sub_admins: userId } },
    { new: true, runValidators: true }
  );
  if (!result) {
    const error = new Error("User is not a store sub-admin");
    error.code = 404;
    throw error;
  }
  return result;
};

const addUserToStoreAdmin = async (user, storeId) => {
  const email = typeof user?.email === "string" ? user.email.trim().toLowerCase() : "";
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    const error = new Error("Valid existing account email required");
    error.code = 400;
    throw error;
  }
  const escapedEmail = email.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const appUser = await User.findOne({ email: new RegExp("^" + escapedEmail + "$", "i") });
  if (!appUser) {
    const error = new Error("Account not found. Secure invitation flow is not yet available; ask the user to register first.");
    error.code = 409;
    throw error;
  }
  const store = await Supplier.findById(storeId);
  if (!store) {
    const error = new Error("Store not found");
    error.code = 404;
    throw error;
  }
  if (String(store.store_owner) === String(appUser._id)) {
    const error = new Error("Store owner already has access");
    error.code = 409;
    throw error;
  }
  if (store.store_sub_admins.some(id => String(id) === String(appUser._id))) {
    const error = new Error("User is already a store sub-admin");
    error.code = 409;
    throw error;
  }
  return await Supplier.findByIdAndUpdate(
    storeId,
    { $addToSet: { store_sub_admins: appUser._id } },
    { new: true, runValidators: true }
  );
};

const getStore = async (filter, req) => {
  try {

    const supplier = await Supplier.findOne(filter).populate(
      "store_account_users store_sub_admins"
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

const getAllSupplierByAddress = async (filter, payload) => {
  try {

    const supplier = await Supplier.find({
      "supplier_address.address": { $regex: filter, $options: "i" }
    }).populate(
      "store_account_users"
    )
    if (supplier) {
      const mappedResp = supplier?.map((element) => {
        const { lat = '', lng = '', address } = element.supplier_address
        if (lat && lng) {
          const currentMoment = moment()
          const distance = calculateDistanceInMiles(lat, lng, payload.lat, payload.lng);
          const currentDay = currentMoment.format('dddd')?.toLowerCase();
          const currentHourStr = element?.hours[currentDay];

          const isOpened = moment(currentHourStr?.from, 'HH:mm:ss').isBefore(currentMoment);
          const isClosed = moment(currentHourStr?.to, 'HH:mm:ss').isBefore(currentMoment);
          return {
            miles_away: distance.toFixed(2),
            address,
            store_name: element?.store_name,
            is_open:
              currentHourStr?.open ? true : (
                isOpened && !isClosed ? true : false
              ),
            opening_time: `${(moment(currentHourStr?.from, 'HH:mm:ss')).format('h:mm:ss A')} - ${(moment(currentHourStr?.to, 'HH:mm:ss')).format('h:mm:ss A')}`,
            _id: element?._id
          }
        }
      })

      // console.log(supplier, 'supplier')
      return {
        supplier: mappedResp,
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
    console.log(deleteStore, 'delete')
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

const calculateDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8;

  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
}

module.exports = {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
  getAllSupplier,
  getAllSupplierByAddress,
  calculateDistanceInMiles,
  getAllStoresForUser,
  checkStoreAvailability,
  addUserToStoreAdmin,
  removeUserFromStore,
  allSupplier,
  getTopSuppliers
};
