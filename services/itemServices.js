const { validate, validateItemMeal, validateItemProduct } = require("../model/item");

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
  filterItem,
  getItemsForAUser,
  updateItem,
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
const { createNewIngredient, getAllIngredient } = require("../repository/ingredient");
const GroceryService = require("./groceryService");
const { capitalize } = require("lodash");

class ItemService {
  static async createItem(payload, files = [], res, query = { action: 'create', _id: "" }) {


    try {

      // files.item_images = [];
      console.log(payload, files)


      if (payload.item_type === 'Meal') {
        //check if there are just just items in the payload, item_name and item_itye
        // if yes, then the user is trying to create an item from the grocery list
        if (payload.listName) {
          payload.item_status = [
            {
              status: "Draft",
              status_note: "Pending Approval",
            },
          ];
          const item_images = files.item_images;

          payload.item_images = [];

          console.log('item_images', files.item_images)
          if (files.item_images.length) {
            for (let i = 0; i < item_images.length; i++) {
              payload.item_images.push(item_images[i].location)
              payload[`itemImage${i}`] = item_images[i].location
            }
          }

          const { error } = validateItemMeal(payload); console.log('errr', error)
          if (error) return res.status(400).send(error.details[0].message);

          const item = await createItem(payload);
          const groceryPayload = {
            userId: payload.user,
            groceryList: {
              listName: payload.listName,
              groceryItems: {
                itemId: item._id.toString(),
              }
            }
          }
          await GroceryService.AddNewItemToGroceryList(groceryPayload, res);
          return item

        }

        payload.formatted_ingredients = JSON.parse(payload?.formatted_ingredients || "[]")
        payload.item_categories = JSON.parse(payload?.item_categories || "[]")
        payload.meal_formatted_instructions = JSON.parse(payload?.formatted_instructions || "[]")
        payload.item_data = JSON.parse(payload?.item_data || "{}")
        payload.meal_prep_time = payload?.item_data.prep_time
        payload.meal_cook_time = payload?.item_data.cook_time
        payload.meal_chef = payload?.item_data.chef
        payload.meal_servings = payload?.item_data.servings
        payload.meal_kitchen_utensils = JSON.parse(payload?.item_data?.kitchen_utensils || "[]")
        payload.meal_tips = payload?.item_data?.tips;

        payload.item_status = [
          {
            status: "Draft",
            status_note: "Pending Approval",
          },
        ];
        const item_images = files.item_images;

        payload.item_images = [];



        if (Array.isArray(files?.item_images)) {
          for (let i = 0; i < item_images.length; i++) {
            payload.item_images.push(item_images[i].location)
            payload[`itemImage${i}`] = item_images[i].location
          }

        }

        for (let i = 1; i < 6; i++) {
          if (files[`image_or_video_content_${i}`] !== undefined) {
            const image = files[`image_or_video_content_${i}`];
            payload[`meal_image_or_video_content${i}`] = image[0].location
          }
        }

        payload.ingredeints_in_item = []

        for (let ingredient of payload?.formatted_ingredients || []) {
          const item_name = ingredient?.item_name //splited.slice(splited.length - 1).join(' ')
          const item_quantity = ingredient?.item_quantity// Number(splited[0])
          const item_measurement = ingredient?.item_measurement //splited[1]
          const formatted_string_of_item = capitalize(ingredient?.formatted_string_of_item || '')
          let obj = {}
          if (ingredient.item_name) {
            obj.item_name = ingredient.item_name
          }
          if (ingredient.item_quantity) {
            obj.item_quantity = ingredient.item_quantity
          }
          if (ingredient.item_measurement) {
            obj.item_measurement = ingredient.item_measurement
          }
          if (ingredient.formatted_string_of_item) {
            obj.formatted_string_of_item = ingredient.formatted_string_of_item
          }
          payload.ingredeints_in_item.push(obj)

          if (item_measurement) {
            await createNewMeasurment({
              measurement_name: item_measurement
            })
          }

          await createNewIngredient({
            item_name
          })

        }



        // payload.item_categories = JSON.parse(payload.item_categories).map(ele => ele.toString())

        const createCategories = await createCategoriesFromCreateMeal(payload.item_categories)
        const ele = await Promise.all(createCategories)
          .then(res => {
            return res
          })
        payload.item_categories = ele

        delete payload.formatted_instructions;
        delete payload.item_data
        delete payload.formatted_ingredients

        const keys = Object.keys(payload);
        keys.map((element) => {
          if (keys.indexOf(element) !== keys.lastIndexOf(element)) {
            delete payload[element]
          }
        })
        for (let ele in payload) {

          if (!Boolean(payload[ele])) {
            delete payload[ele]
          }
          if (Array.isArray(payload[ele]) && payload[ele].length === 0) {
            delete payload[ele]

          }
        }
        console.log(payload, 'payloading')


        const { error } = validateItemMeal(payload); console.log('errr', error)
        if (error) return res.status(400).send(error.details[0].message);


        if (query?.action == 'update') {
          return await updateItem({ _id: query?._id }, payload)
        } else {
          return await createItem(payload);
        }
      } else if (payload.item_type === 'Product' || payload.item_type === 'Utensil') {
        // 
        console.log(payload.listName)
        payload.item_status = [
          {
            status: "Draft",
            status_note: "Pending Approval",
          },
        ];
        const item_images = files.item_images || []
        payload.item_images = []
        console.log(files?.item_images, 'files?.item_images')

        if (files?.item_images?.length) {
          for (let i = 0; i < files?.item_images.length; i++) {
            payload.item_images.push(item_images[i].location)
            payload[`itemImage${i}`] = item_images[i].location
          }
        }

        if (payload.listName) {


          payload.item_images = [];

          const { error } = validateItemProduct(payload); console.log('errr', error)
          if (error) return res.status(400).send(error.details[0].message);
          const item = await createItem(payload);

          const groceryPayload = {
            userId: payload.user,
            groceryList: {
              listName: payload.listName,
              groceryItems: {
                itemId: item._id.toString(),
              }
            }
          }
          await GroceryService.AddNewItemToGroceryList(groceryPayload, res)
          return item
        }


        console.log(payload)
        payload.formatted_ingredients = JSON.parse(payload.formatted_ingredients || "[]")
        payload.item_data = JSON.parse(payload.item_data || "{}")
        //product descrition
        const all_description = JSON.parse(payload.description) || "[]";

        let resp = all_description.map(async (element) => {
          let name = element.object_name;
          delete element.object_name;
          const descrp = await createDescription({
            description_key: capitalize(name),
            ...element
          })

          await createNewMeasurment({
            measurement_name: element.object_measurement
          })
          return descrp.description.toString()
        })

        if (resp) {
          const allDesp = await Promise.all(resp)
            .then(res => {
              return res
            })
          payload.item_description = allDesp;
          if (payload?.item_data?.product_size) {
            payload.product_size = payload.item_data.product_size;

          }
        }
        payload.item_categories = JSON.parse(payload.item_categories).map(ele => ele.toString())

        const createCategories = await createCategoriesFromCreateMeal(payload.item_categories)
        const ele = await Promise.all(createCategories)
          .then(res => {
            return res
          })
        payload.item_categories = ele

        payload.ingredeints_in_item = []

        for (let ingredient of payload?.formatted_ingredients || []) {
          // const splited = ingredient.split(' ');
          const item_name = ingredient?.item_name //splited.slice(splited.length - 1).join(' ')
          const item_quantity = ingredient?.item_quantity// Number(splited[0])
          const item_measurement = ingredient?.item_measurement //splited[1]
          const formatted_string_of_item = capitalize(ingredient?.formatted_string_of_item || '')

          let obj = {}
          if (ingredient.item_name) {
            obj.item_name = ingredient.item_name
          }
          if (ingredient.item_quantity) {
            obj.item_quantity = ingredient.item_quantity
          }
          if (ingredient.item_measurement) {
            obj.item_measurement = ingredient.item_measurement
          }
          if (ingredient.formatted_string_of_item) {
            obj.formatted_string_of_item = ingredient.formatted_string_of_item
          }
          payload.ingredeints_in_item.push(obj)

          const abc = await createNewIngredient({
            item_name
          })
          console.log('abe', abc)
        }

        delete payload.item_data;
        delete payload.description;
        delete payload.formatted_ingredients;
        if (payload.item_description?.length === 0) {
          delete payload.item_description
        }

        for (let ele in payload) {
          if (!Boolean(payload[ele])) {
            delete payload[ele]
          }
          if (Array.isArray(payload[ele]) && payload[ele].length === 0) {
            delete payload[ele]

          }
        }
        const { error } = validateItemProduct(payload); console.log('errr', error)
        if (error) return res.status(400).send(error.details[0].message);
        if (query?.action == 'update') {

        } else {
          return await createItem(payload);
        }
      } else if (payload.item_type === 'Other') {
        console.log(payload, 'payayayay')
        const { error } = validateItemMeal(payload); console.log('errr', error)
        if (error) return res.status(400).send(error.details[0].message);

        let obj = {}
        if (files?.item_images?.length) {
          for (let i = 0; i < item_images.length; i++) {
            obj.item_images.push(item_images[i].location)
            obj[`itemImage${i}`] = item_images[i].location
          }
          obj.item_images = files?.item_images
        }

        console.log({
          item_name: payload.item_name,
          item_type: payload.item_type,
          ...obj
        }, 'item patload')

        const item = await createItem({
          item_name: payload.item_name,
          item_type: payload.item_type,
          ...obj
        });

        const payload_ = {
          userId: payload.user,
          groceryList: {
            listName: payload.listName,
            groceryItems: {
              itemId: item._id.toString()
            }
          }
        }

        console.log(payload_, 'payload_payload_')
        return await GroceryService.AddNewItemToGroceryList(payload_, res);

      }

      // let itemImages = [];
      // let instructionImages = []

      // const item_images = files.item_images
      // const instruction_images = files.instruction_images

      // item_images.map((file) => {
      //   itemImages.push(file.location);
      // });

      // payload.item_images = itemImages;

      // itemImages.map((element, idx) => {
      //   payload[`itemImage${idx}`] = element;
      // })

      // //check if user added formatted_ingredients
      // //parse it to be indexed into the db
      // if (payload.formatted_ingredients) {
      //   payload.formatted_ingredients = JSON.parse(payload.formatted_ingredients)
      // }

      // if (payload.intro) {
      //   payload.item_intro = payload.intro
      // }

      // if (payload.formatted_instructions) {
      //   payload.formatted_instructions = JSON.parse(payload.formatted_instructions)
      // }

      // if (payload.meal_categories) {
      //   payload.meal_categories = JSON.parse(payload.meal_categories)
      // }

      // if (payload.kitchen_utensils) {
      //   payload.kitchen_utensils = JSON.parse(payload.kitchen_utensils)
      // }

      // if (payload.item_data) {
      //   payload.item_data = JSON.parse(payload.item_data)
      // }

      // if (payload.item_categories) {
      //   payload.item_categories = JSON.parse(payload.item_categories)
      // }

      // if (payload.item_type === 'Product') {
      //   const product = await createProduct(payload.item_data);

      //   payload.item_data = product?._id;
      //   payload.item_type = 'Product';

      //   //product descrition
      //   const all_description = JSON.parse(payload.description) || [];

      //   let resp = all_description.map(async (element) => {
      //     let name = element.object_name;
      //     delete element.object_name;
      //     const descrp = await createDescription({
      //       description_key: name,
      //       ...element
      //     })
      //     await createNewMeasurment({
      //       measurement_name: element.object_measurement
      //     })
      //     return descrp.description.toString()
      //   })

      //   const allDesp = await Promise.all(resp)
      //     .then(res => {
      //       return res
      //     })

      //   payload.item_description = allDesp;

      // } else if (payload.item_type === 'Meal') {

      //   if (files.image_or_video_content_1?.length) {
      //     files.image_or_video_content_1.map(files => {
      //       payload.item_data.image_or_video_content_1 = files.location
      //     })
      //   }

      //   if (files.image_or_video_content_2?.length) {
      //     files.image_or_video_content_2.map(files => {
      //       payload.item_data.image_or_video_content_2 = files.location
      //     })
      //   }

      //   if (files.image_or_video_content_3?.length) {
      //     files.image_or_video_content_3.map(files => {
      //       payload.item_data.image_or_video_content_3 = files.location
      //     })
      //   }

      //   if (files.image_or_video_content_4?.length) {
      //     files.image_or_video_content_4.map(files => {
      //       payload.item_data.image_or_video_content_4 = files.location
      //     })
      //   }

      //   if (files.image_or_video_content_5?.length) {
      //     files.image_or_video_content_5.map(files => {
      //       payload.item_data.image_or_video_content_5 = files.location
      //     })
      //   }

      //   if (files.image_or_video_content_6?.length) {
      //     files.image_or_video_content_6.map(files => {
      //       payload.item_data.image_or_video_content_6 = files.location
      //     })
      //   }

      //   payload.item_data.user = payload.user;
      //   const meal = await createMeal(payload.item_data)
      //   payload.item_data = meal?._id;
      //   payload.item_type = 'Meal';

      // }

      // let itemCategories = [];

      // // itemCategories.push(payload.item_categories);

      // payload.item_categories = payload.item_categories.map(ele => ele.toString())
      // const createCategories = await createCategoriesFromCreateMeal(payload.item_categories)
      // const ele = await Promise.all(createCategories)
      //   .then(res => {
      //     return res
      //   })
      // payload.item_categories = ele
      // payload.item_status = [
      //   {
      //     status: "Draft",
      //     status_note: "Pending Approval",
      //   },
      // ];
      // // validating request body
      // console.log('payload', payload)
      // delete payload.description;
      // const { error } = validate(payload); console.log('errr', error)
      // if (error) return res.status(400).send(error.details[0].message);
      // return await createItem(payload);
      return res.json({ success: true })

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
  getItemsForAUser
  static async getOneItem(filter, res) {
    try {
      return await getOneUserItem(filter)
    } catch (error) {
      console.log(error)
    }
  }

  static async getItemForOneUser(userId, res) {
    console.log(userId, 'userid')
    try {
      return await getItemsForAUser(userId)
    } catch (error) {
      console.log(error)
    }
  }

  static async filterUserItem(filter, res) {
    try {
      return await filterItem(filter)
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
