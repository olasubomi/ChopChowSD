const { validate } = require("../model/item");

const {
  createItem,
  getItems,
  getStoreItems,
  getUserItems,
  getCategoryItems,
  confirmItem,
  updateControl,
  deleteItem,
  itemUpdate,
  updateUserComment,
} = require("../repository/item");

class ItemService {
  static async createItem(payload, files, res) {
    try {
      let itemImages = [];
      files.map((file) => {
        itemImages.push(file.location);
      });

      payload.item_images = itemImages;

      let itemCategories = [];

      itemCategories.push(payload.item_categories);

      payload.item_categories = itemCategories;

      payload.item_status = [
        {
          status: "Draft",
          status_note: "Pending Approval",
        },
      ];

      // validating request body
      const { error } = validate(payload);
      if (error) return res.status(400).send(error.details[0].message);

      return await createItem(payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getAllItems(req, res) {
    try {
      return await getItems();
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllStoreItems(filter, res) {
    try {
      return await getStoreItems(filter);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUserItems(filter, res) {
    try {
      return await getUserItems(filter);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllCategoryItems(filter, res) {
    try {
      return await getCategoryItems(filter);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateAvailability(payload, res) {
    try {
      const checkItem = await confirmItem(payload.itemId);
      if (!checkItem)
        return res.send({ status: 400, message: "This Item does not exist!" });

      const arrayId = checkItem.item_status[0]._id.toString();

      const updateItem = await itemUpdate(payload, arrayId);

      if (updateItem) {
        const updated = await confirmItem(payload.itemId);
        res.status(200).send({
          message: "Item status updated successfully",
          data: updated,
        });
      } else {
        res.send("internal Server error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteItem(payload, res) {
    try {
      const checkItem = await confirmItem(payload.itemId);
      if (!checkItem)
        return res.send({ status: 400, message: "This Item does not exist!" });

      return await deleteItem(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateComment(payload, res) {
    try {
      const comment = await updateUserComment(payload);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ItemService;
