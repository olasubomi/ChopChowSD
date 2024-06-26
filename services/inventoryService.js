const {
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
  createInventory,
  allUserInventory
} = require("../repository/index");
const { getStoreInventory } = require("../repository/inventory");

class InventoryService {
  static async createInventory(payload) {
    try {
      return await createInventory(payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async updateInventory(filter, payload) {
    try {
      return await updateInventory(filter, payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getAllUserInventory(filter, query) {
    try {
      return await allUserInventory(filter, query);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getInventories(page, filter) {
    try {
      return await getInventories(page, filter);
    } catch (error) {
      throw error;
    }
  }

  static async getInventory(filter) {
    try {
      return await getInventory(filter);
    } catch (error) {
      throw error;
    }
  }
  static async getStoreInventory(filter) {
    try {
      return await getStoreInventory(filter);
    } catch (error) {
      throw error;
    }
  }
  static async deleteInventory(id, item_id) {
    try {
      return await deleteInventory(id, item_id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InventoryService;
