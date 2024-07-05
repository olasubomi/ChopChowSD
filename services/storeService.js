const { validateStoreInformation } = require("../db/dbMongo/config/db_buildSchema");
const {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
  getAllSupplierByAddress,
  getAllStoresForUser,
  checkStoreAvailability
} = require("../repository/index");
const { getAllSupplier } = require("../repository/store");

class StoreService {
  static async createStore(payload, files) {
    console.log({ files });
    try {
      if (files) {
        files.map((file) => {
          if (file?.fieldname === "profile_picture") {
            payload.profile_picture = file?.location;
          }
          if (file?.fieldname === "background_picture") {
            payload.background_picture = file?.location;
          }
        });
      }
      payload.supplier_address = payload.supplier_address ? JSON.parse(payload.supplier_address) : {};
      payload.hours = payload.hours ? JSON.parse(payload.hours) : {};


      return await createStore(payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async updateStore(filter, payload, files) {
    try {
      delete payload.profile_picture;
      delete payload.background_picture
      console.log(files)
      if (files?.length) {

        files.map((file) => {
          if (file?.fieldname === "profile_picture") {
            payload.profile_picture = file?.location;
          }
          if (file?.fieldname === "background_picture") {
            payload.background_picture = file?.location;
          }
        });
      }
      console.log('payload--', payload)

      if (payload.supplier_address) {
        payload.supplier_address = JSON.parse(payload.supplier_address || "{}")

      }
      if (payload.hours) {
        payload.hours = payload.hours ? JSON.parse(payload.hours) : {};
      }
      if (payload.currency) {
        payload.currency = payload.currency ? JSON.parse(payload.currency) : {};
      }
      // for (let ele in payload) {
      //   payload[ele] = JSON.parse(payload.ele)
      // }

      return await updateStore(filter, payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async claimStore(filter, payload, file) {
    try {
      if (file) {
        payload.business_ownership_proof = file.location
      }
      const { error } = validateStoreInformation(payload);
      const store = await checkStoreAvailability({
        user: filter.userId,
        store: filter.storeId
      });
      if (!Object.is(store, null)) {

      }
      console.log('errr', error)
      if (error) throw new Error(error.details[0].message);

      return await updateStore(filter, { business_information: payload });
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }


  static async getStores(page, filter) {
    try {
      return await getAllStores(page, filter);
    } catch (error) {
      throw error;
    }
  }

  static async getSinglStore(filter, req) {
    try {
      return await getStore(filter, req);
    } catch (error) {
      throw error;
    }
  }

  static async removeStore(id) {
    try {
      return await deleteStore(id);
    } catch (error) {
      throw error;
    }
  }

  static async getAllStore(filter) {
    try {
      return await getAllSupplier(filter);
    } catch (error) {
      throw error;
    }
  }

  static async allStores(filter) {
    try {
      return await getAllSupplier(filter);
    } catch (error) {
      throw error;
    }
  }

  static async getAllStoresByAddress(filter, payload) {
    try {
      return await getAllSupplierByAddress(filter, payload);
    } catch (error) {
      throw error;
    }
  }

  static async getAllUserStore(filter, payload) {
    try {
      return await getAllStoresForUser(filter, payload);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StoreService;
