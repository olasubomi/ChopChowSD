const {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
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

      return await createStore(payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async updateStore(filter, payload, files) {
    try {
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
      return await updateStore(filter, payload);
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
}

module.exports = StoreService;
