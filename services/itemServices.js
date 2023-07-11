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
  getOneUserItem,
} = require("../repository/item");

const {
  createProduct
} = require('../repository/product')

const { createMeal } = require('../repository/meal')

const {
  createCategoriesFromCreateMeal
} = require('../repository/category');
const { createDescription } = require("../repository/description");
const { createNewMeasurment } = require("../repository/measurement");

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

        payload.item_data = product?._id;
        payload.item_model = 'Product';

        //product descrition
        const all_description = JSON.parse(payload.description) || []

        all_description.map(async (element) => {
          await createDescription({
            description_key: element.object_name
          })
          await createNewMeasurment({
            measurement_name: element.object_measurement
          })

        })
        payload.item_description = all_description;

      } else if (payload.item_type === 'Meal') {

        if (files.image_or_video_content_1?.length) {
          files.image_or_video_content_1.map(files => {
            payload.item_data.image_or_video_content_1 = files.location
          })
        }

        if (files.image_or_video_content_2?.length) {
          files.image_or_video_content_2.map(files => {
            payload.item_data.image_or_video_content_2 = files.location
          })
        }

        if (files.image_or_video_content_3?.length) {
          files.image_or_video_content_3.map(files => {
            payload.item_data.image_or_video_content_3 = files.location
          })
        }

        if (files.image_or_video_content_4?.length) {
          files.image_or_video_content_4.map(files => {
            payload.item_data.image_or_video_content_4 = files.location
          })
        }

        if (files.image_or_video_content_5?.length) {
          files.image_or_video_content_5.map(files => {
            payload.item_data.image_or_video_content_5 = files.location
          })
        }

        if (files.image_or_video_content_6?.length) {
          files.image_or_video_content_6.map(files => {
            payload.item_data.image_or_video_content_6 = files.location
          })
        }

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
      delete payload.description;
      const { error } = validate(payload); console.log('errr', error)
      if (error) return res.status(400).send(error.details[0].message);
      return await createItem(payload);

    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getAllItems(req, filter) {
    try {
      return await getItems(req, filter);
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

  static async getOneItem(filter, res) {
    try {
      return await getOneUserItem(filter)
    } catch (error) {
      console.log(error)
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
      console.log('payloader', payload)
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
