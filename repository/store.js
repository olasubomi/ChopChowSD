const { Supplier, StoreClaim, User } = require("../db/dbMongo/config/db_buildSchema");
const { Item } = require("../model/item");
const moment = require('moment');


const createStore = async (payload) => {
  try {
    if (payload?.store_owner) {
      await User.findByIdAndUpdate({ _id: payload?.store_owner }, { hasSupplierAffiliation: true })
    } else if (payload?.store_admin) {
      await User.findByIdAndUpdate({ _id: payload?.store_admin }, { sub_store_admin: true })
      payload.sub_app_admin = [payload.store_admin]
    }

    return await Supplier.create(payload);
  } catch (error) {
    console.log({ error });
  }
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
    let getPaginate = await paginate(page, filter);
    const allProducts = await Supplier.find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip)
      .populate("store_account_users"); //sugggested_meals_and_products
    return {
      products: allProducts,
      count: getPaginate.docCount,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all stores operation failed",
      code: error.code || 500,
    };
  }
};

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


const getStore = async (filter, req) => {
  try {

    const supplier = await Supplier.findOne(filter).populate(
      "store_account_users"
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
  checkStoreAvailability
};
