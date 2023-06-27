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

const {
  createProduct
} = require('../repository/product')

const { createMeal } = require('../repository/meal')

const {
  createCategoriesFromCreateMeal
} = require('../repository/category')

class ItemService {
  static async createItem(payload, files, res) {
    try {

      let itemImages = [];
      let instructionImages = []

      const item_images = files.item_images
      const instruction_images = files.instruction_images

      item_images.map((file) => {
        itemImages.push(file.location);
      });

      payload.item_images = itemImages;

      itemImages.map((element, idx) => {
        payload[`itemImage${idx}`] = element;
      })

      //check if user added formatted_ingredients
      //parse it to be indexed into the db
      if (payload.formatted_ingredients) {
        payload.formatted_ingredients = JSON.parse(payload.formatted_ingredients)
      }

      if (payload.intro) {
        payload.item_intro = payload.intro
      }

      if (payload.formatted_instructions) {
        payload.formatted_instructions = JSON.parse(payload.formatted_instructions)
      }

      if (payload.meal_categories) {
        payload.meal_categories = JSON.parse(payload.meal_categories)
      }

      if (payload.kitchen_utensils) {
        payload.kitchen_utensils = JSON.parse(payload.kitchen_utensils)
      }

      if (payload.item_data) {
        payload.item_data = JSON.parse(payload.item_data)
      }

      if (payload.item_categories) {
        payload.item_categories = JSON.parse(payload.item_categories)
      }

      if (payload.item_type === 'Product') {
        const product = await createProduct(payload.item_data);
        payload.item_model = 'Product';
        payload.item_data = product?._id
      } else if (payload.item_type === 'Meal') {

        instruction_images.map((file, idx) => {
          instructionImages.push(file.location);
          payload.item_data[`image_or_video_content_${idx + 1}`] = file.location
        });
        payload.item_data.user = payload.user;
        const meal = await createMeal(payload.item_data)
        payload.item_data = meal?._id;
        payload.item_model = 'Meal'

      }

      let itemCategories = [];

      // itemCategories.push(payload.item_categories);

      const createCategories = await createCategoriesFromCreateMeal(payload.item_categories)
      const ele = await Promise.all(createCategories)
        .then(res => {
          return res
        })
      payload.item_categories = ele
      payload.item_status = [
        {
          status: "Draft",
          status_note: "Pending Approval",
        },
      ];
      // validating request body
      console.log('payload', payload)
      const { error } = validate(payload); console.log('errr', error)
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
