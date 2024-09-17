const { validate, validateItemMeal, validateItemProduct, Item, videoFileSchema } = require("../model/item");

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
  filterStoresByUsername,
} = require("../repository/item");
const fs = require('fs')
const OpenAI = require('openai');
const {
  createProduct
} = require('../repository/product')
const test_json = require('../test.json')
const ai = require('../ai.json')
const { createClient } = require("@deepgram/sdk");
const { createMeal } = require('../repository/meal')
const instagramDl = require("@sasmeee/igdl");
// const youtubedl = require('youtube-dl-exec')
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const AdmZip = require("adm-zip")
ffmpeg.setFfmpegPath(ffmpegStatic);

const {
  createCategoriesFromCreateMeal
} = require('../repository/category');
const { createDescription } = require("../repository/description");
const { createNewMeasurment } = require("../repository/measurement");
const { createNewIngredient, getAllIngredient } = require("../repository/ingredient");
const GroceryService = require("./groceryService");
const { capitalize } = require("lodash");
// const ytdl = require('@distube/ytdl-core');
const axios = require('axios');
// const fetch = require('node-fetch');
const { URL } = require('url');
const path = require('path');
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

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
          if (files?.item_images?.length) {
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


        if (query?.action === 'update') {
          const item = await Item.findById(query?._id);
          if (Array.isArray(files?.item_images)) {
            for (let i = 0; i < item_images.length; i++) {
              payload.item_images = item.item_images
              payload.item_images.push(item_images[i].location)
              if (item.item_images.length) {
                payload[`itemImage${i + item.item_images.length - 1}`] = item_images[i].location

              } else {
                payload[`itemImage${i}`] = item_images[i].location

              }
            }

          }

          for (let i = 1; i < 6; i++) {
            if (files[`image_or_video_content_${i}`] !== undefined) {
              const image = files[`image_or_video_content_${i}`];
              payload[`meal_image_or_video_content${i}`] = image[0].location
            }
          }

        } else {

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

          // await createNewIngredient({
          //   item_name
          // })
        }
        if (payload?.formatted_ingredients) {
          Promise.all(
            (payload?.formatted_ingredients || [])?.map(async (ingredient) => {
              const checkExist = await Item.findOne({
                item_name: ingredient?.item_name,
                item_type: 'Product'
              })
              if (!checkExist) {
                await createItem({
                  item_name: ingredient?.item_name,
                  item_type: 'Product',
                  user: payload.user,
                  item_status: [{
                    status: "Draft",
                    status_note: "Pending Approval",
                  },]
                })
              }
            })
          )
        }

        // 
        if (JSON.parse(payload?.item_data?.kitchen_utensils)) {
          Promise.all(
            JSON.parse(payload?.item_data?.kitchen_utensils)?.map(async (ele) => {
              const checkExist = await Item.findOne({
                item_name: ele,
                item_type: 'Utensil'
              })
              if (!checkExist) {
                await createItem({
                  item_name: ele,
                  item_type: 'Utensil'
                })
              }
            })
          )
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

        if (query?.action === 'update') {
          const item = await Item.findById(query?._id);
          if (files?.item_images?.length) {
            for (let i = 0; i < files?.item_images.length; i++) {
              payload.item_images = item.item_images
              payload.item_images.push(item_images[i].location)
              if (item.item_images.length) {
                payload[`itemImage${i + item.item_images.length - 1}`] = item_images[i].location

              } else {
                payload[`itemImage${i}`] = item_images[i].location

              }
            }
          }

        } else {
          if (files?.item_images?.length) {
            for (let i = 0; i < files?.item_images.length; i++) {
              payload.item_images.push(item_images[i].location)
              payload[`itemImage${i}`] = item_images[i].location
            }
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

        console.log(payload?.formatted_ingredients, 'formatted_ingredients')

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

          // const abc = await createNewIngredient({
          //   item_name
          // })
          // console.log('abe', abc)
        }

        if (payload?.formatted_ingredients) {
          Promise.all(
            (payload?.formatted_ingredients || [])?.map(async (ingredient) => {
              const checkExist = await Item.findOne({
                item_name: ingredient?.item_name,
                item_type: 'Product'
              })
              if (!checkExist) {
                await createItem({
                  item_name: ingredient?.item_name,
                  item_type: 'Product',
                  user: payload.user,
                  item_status: [{
                    status: "Draft",
                    status_note: "Pending Approval",
                  }]
                })
              }
            })
          )
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
        console.log(payload, files, 'payoload')
        console.log(query, 'query?.action')
        if (query?.action === 'update') {
          return await updateItem({ _id: query?._id }, payload)
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

  static async getStoresByUsername(name) {
    try {
      return await filterStoresByUsername(name);
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

  static async getItemForOneUser(userId, res) {
    console.log(userId, 'userid')
    try {
      return await getItemsForAUser(userId)
    } catch (error) {
      console.log(error)
    }
  }

  static async filterUserItem(filter, query) {
    try {
      return await filterItem(filter, query)
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

  static async processVideo(req, res) {
    try {
      console.log(req.file, req.body, 'payload')
      let buffer = ''
      const file_name = `File-${Math.floor(Math.random() * 1000000)}.mp4`
      const filePath = path.join(TEMP_DIR, file_name);

      if (req.file) {
        const { value, error } = videoFileSchema(req.file)
        buffer = req.file.buffer
      } else if (req.body.url) {
        const { url } = req.body;
        const videoURL = new URL(url);

        if (videoURL.hostname.includes('youtube.com') || videoURL.hostname.includes('youtu.be')) {
          // if (!ytdl.validateURL(url)) {
          //   return res.status(400).json({ error: 'Invalid YouTube URL' });
          // }

          // const promise = await youtubedl(url, { dumpSingleJson: true })
          // const _url = Array.isArray(promise?.requested_formats) && promise.requested_formats.length >= 1 && promise.requested_formats[1]?.hasOwnProperty("url") && promise.requested_formats[1]?.url;
          // if (!_url) throw new Error("Unable to extract video from url")
          // await this.downloadVideo(_url, file_name);
          // const videoFile = fs.readFileSync(filePath)
          // buffer = videoFile
          // fs.unlinkSync(filePath);
          return res.status(400).json({ error: 'Unsupported video platform' });

        } else if (videoURL.hostname.includes('instagram.com')) {
          const dataList = await instagramDl(url);
          await this.downloadVideo(dataList[0]?.download_link, file_name);
          const videoFile = fs.readFileSync(filePath)
          buffer = videoFile
          // fs.unlinkSync(filePath);


        } else {
          return res.status(400).json({ error: 'Unsupported video platform' });
        }
      }
      const resp = await this.transcribeFile(buffer)
      return resp

      // console.log(value, error)
    } catch (e) {
      console.log(e)
    }
  }

  static async transcribeFile(file) {
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      file,
      {
        model: "nova-2",
        paragraphs: true
      }
    );

    if (error) throw error;
    if (!error) {
      // const result = test_json;
      const transcript = result.results.channels[0].alternatives[0].transcript;
      const words = result.results.channels[0].alternatives[0].words;
      if (!error) {
        const payload = await this.openAi(transcript);
        console.dir(payload, { depth: null })
        const ai_ = JSON.parse(payload);
        let obj = {};
        result.results.channels[0].alternatives[0].paragraphs.paragraphs.map((element) => {
          element.sentences.map((entry) => ({
            [this.formatSeconds(entry.start)]: entry.text
          })).forEach((ele) => {
            obj = {
              ...obj,
              ...ele
            }
          })
        })

        const resp = {
          transcription: obj,
          data: ai_
        }
        // console.dir(obj, { depth: null })
        return resp
      }

    }
  };

  static async openAi(transcription) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": `Text: ${transcription}
                Return the following details in pure JSON format without the json tag:
                1. Meal name (returned as meal_name)
                2. Meal preparation summary (150 words) (returned as meal_preparation_summary)
                3. Meal preparation steps (returned as meal_preparation_steps, array of objects like [{ step: 1, step_title: "3-word title", step_instruction: ["instruction1", "instruction2"] }])
                4. Ingredients used (returned as ingredients, array of objects like [{ ingredient_name: "name", ingredient_measurement: "measurement", ingredient_quantity: "quantity" }])
                5. Kitchen utensils used (returned as kitchen_utensils, array of strings)
                6. Suggested meal categories (returned as meal_categories)
                7. Prep time (returned as prep_time)
                8. Cook time (return as cook_time)
                When generating the Meal preparation steps, I want you to get the start (key should be timestamp_start) and end (key should be timestamp_end) timestamps in this format hh:mm:ss of where each step is carried out, I want to use it so split the video.  
                `
              }
            ]
          },
        ],
        temperature: 1.2,
        max_tokens: 1800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return response.choices[0].message.content
    } catch (e) {
      console.log(e, 'error')
    }



  }

  static formatSeconds(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(2);
    const hrsStr = String(hrs).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    const secsStr = String(secs).padStart(5, '0');
    return `${hrsStr}:${minsStr}:${secsStr}`;
  }

  static async divideTranscriptIntoMinutes(transcriptData) {
    const transcriptByMinute = {};
    let currentMinute = 1;
    let currentWords = [];

    for (const item of transcriptData) {
      const { start, end, word } = item;
      const startMinute = Math.floor(start / 60) + 1;
      const endMinute = Math.floor(end / 60) + 1;

      if (startMinute !== endMinute) {
        const endOfCurrentMinute = (startMinute * 60) - start;
        currentWords.push(word);
        transcriptByMinute[`00:${String(currentMinute).padStart(2, '0')}:00`] = currentWords.join(' ');

        currentMinute = endMinute;
        currentWords = [];
        currentWords.push(word);
      } else {
        if (startMinute > currentMinute) {
          transcriptByMinute[`00:${String(currentMinute).padStart(2, '0')}:00`] = currentWords.join(' ');
          currentMinute = startMinute;
          currentWords = [];
        }
        currentWords.push(word);
      }
    }

    if (currentWords.length > 0) {
      transcriptByMinute[`00:${String(currentMinute).padStart(2, '0')}:00`] = currentWords.join(' ');
    }

    return transcriptByMinute;
  }

  static async downloadVideo(videoUrl, filename) {
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    const filePath = path.join(TEMP_DIR, filename);
    response.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve(filePath));
      response.data.on('error', reject);
    });
  };

  static async splitVideos(timestamps, outputDir, filePath) {
    const currentTime = new Date().getTime()
    // const outputDir = `output/${currentTime}`;
    console.log(!fs.existsSync(outputDir), 'exising dir')
    // if (!fs.existsSync(outputDir)) {

    // }
    fs.mkdirSync(outputDir, {
      recursive: true
    });

    const promises = timestamps.map((timestamp, index) => {
      return new Promise((resolve, reject) => {
        const outputFilePath = path.join(outputDir, `segment-${index + 1}.mp4`);

        const [startHours, startMinutes, startSeconds] = timestamp.timestamp_start.split(':').map(parseFloat);
        const [endHours, endMinutes, endSeconds] = timestamp.timestamp_end.split(':').map(parseFloat);

        const startTotalSeconds = (startHours * 3600) + (startMinutes * 60) + startSeconds;
        const endTotalSeconds = (endHours * 3600) + (endMinutes * 60) + endSeconds;

        const durationSeconds = endTotalSeconds - startTotalSeconds;

        const durationHours = Math.floor(durationSeconds / 3600).toString().padStart(2, '0');
        const durationMinutes = Math.floor((durationSeconds % 3600) / 60).toString().padStart(2, '0');
        const durationSecs = (durationSeconds % 60).toFixed(2).padStart(5, '0');

        const duration = `${durationHours}:${durationMinutes}:${durationSecs}`;

        ffmpeg(filePath)
          .setStartTime(timestamp.timestamp_start)
          .setDuration(duration)
          .output(outputFilePath)
          .on('end', () => resolve(outputFilePath))
          .on('error', reject)
          .run();
      });
    });

    return Promise.all(promises)
  }


}

module.exports = ItemService;
