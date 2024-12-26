const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const {
  products,
  meals,
  Utensil,
} = require("../db/dbMongo/config/db_buildSchema");

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },

    item_images: [{ type: String }],

    itemImage0: { type: String },

    itemImage1: { type: String },

    itemImage2: { type: String },

    itemImage3: { type: String },

    item_intro: { type: String },

    item_available: { type: Boolean },

    rejectionMessage: {
      title: String,
      message: String,
    },

    item_categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],

    item_price: { type: String },

    total_rating: { type: Number, required: false, default: 0 },

    average_rating: { type: Number, required: false, default: 0 },

    hidden_ingredients_in_product: [{ type: String }],

    item_price: { type: Number },

    item_type: {
      type: String,
      enum: ["Meal", "Product", "Utensil", "Other"],
      required: true,
    },

    store_available: [{ type: mongoose.Types.ObjectId, ref: "Supplier" }],

    item_status: [
      {
        status: {
          type: String,
          default: "Draft",
        },
        status_note: {
          type: String,
        },
      },
    ],

    inventories: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }],

    user: { type: mongoose.Types.ObjectId, ref: "User" },

    comments: [
      {
        comment_user: { type: mongoose.Types.ObjectId, ref: "User" },
        comment_title: { type: String },
        comment_message: { type: String },
        comment_rating: { type: Number },
        comment_up_votes: { type: Number },
        comment_down_votes: { type: Number },
        comment_date_time: { type: Date, required: true },
        replies: [
          {
            replies_message: { type: String },
            replies_up_votes: { type: Number },
            replies_down_votes: { type: Number },
            replies_date_time: { type: Date, required: true },
          },
        ],
      },
    ],

    ingredeints_in_item: [
      {
        item_name: String,
        item_quantity: Number,
        item_measurement: String,
        formatted_string_of_item: String,
        item_price: Number,
        product_available: Boolean,
      },
    ],

    total_rating: { type: Number, default: 0 },

    average_rating: { type: Number, default: 0 },

    formatted_ingredients: [{ type: String }],

    user: { type: mongoose.Types.ObjectId, ref: "User" },

    product_size: { type: String },

    product_alternatives: [{ type: String }],

    meals_including_product: [{ type: String }],

    product_description: [{ type: String }],

    hidden_ingredients_in_product: [{ type: String }],

    meal_prep_time: { type: String },

    meal_cook_time: { type: String },

    meal_chef: { type: String },

    meal_servings: { type: String },

    meal_formatted_instructions: [{ type: Object }],

    meal_kitchen_utensils: [{ type: String }],

    meal_tips: [{ type: String }],

    meal_image_or_video_content1: { type: String },

    meal_image_or_video_content2: { type: String },

    meal_image_or_video_content3: { type: String },

    meal_image_or_video_content4: { type: String },

    meal_image_or_video_content5: { type: String },

    meal_image_or_video_content6: { type: String },

    item_description: [
      {
        type: mongoose.Types.ObjectId,
        ref: "item_description",
      },
    ],
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

function validateItemMeal(item) {
  const schema = Joi.object({
    item_name: Joi.string().required(),

    listName: Joi.string().optional(),

    item_intro: Joi.string().optional(),

    item_type: Joi.string().required(),

    // formatted_ingredients: Joi.array().items(Joi.string().required()).optional(),

    user: Joi.string().required(),

    ingredeints_in_item: Joi.array()
      .items(
        Joi.object({
          item_name: Joi.string().required(),
          item_quantity: Joi.number().optional(),
          item_measurement: Joi.string().optional(),
          formatted_string_of_item: Joi.string().required(),
        })
      )
      .optional(),

    item_categories: Joi.array().items(Joi.objectId().required()).optional(),

    meal_formatted_instructions: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          instructionSteps: Joi.array().items(Joi.string().optional()),
          dataName: Joi.any().optional(),
        })
      )
      .optional(),

    item_status: Joi.array()
      .items(
        Joi.object({
          status: Joi.string().required(),
          status_note: Joi.string().required(),
        })
      )
      .optional(),

    item_images: Joi.any(),

    itemImage0: Joi.string().optional(),

    itemImage1: Joi.string().optional(),

    itemImage2: Joi.string().optional(),

    itemImage3: Joi.string().optional(),

    meal_image_or_video_content1: Joi.string().optional(),

    meal_image_or_video_content2: Joi.string().optional(),

    meal_image_or_video_content3: Joi.string().optional(),

    meal_image_or_video_content4: Joi.string().optional(),

    meal_image_or_video_content5: Joi.string().optional(),

    meal_image_or_video_content6: Joi.string().optional(),

    meal_prep_time: Joi.string().optional(),

    meal_cook_time: Joi.string().optional(),

    meal_chef: Joi.string().optional(),

    meal_servings: Joi.string().optional(),

    meal_tips: Joi.array().items(Joi.string().required()).optional(),

    meal_kitchen_utensils: Joi.array().items(Joi.string()).optional(),
  });
  return schema.validate(item);
}

function validateItemProduct(item) {
  const schema = Joi.object({
    item_name: Joi.string().required(),

    listName: Joi.string().optional(),

    item_intro: Joi.string().optional(),

    item_images: Joi.array().items(Joi.string().optional()).optional().sparse(false),

    product_size: Joi.string().optional(),

    item_description: Joi.array().items(Joi.objectId().required()).optional(),

    ingredeints_in_item: Joi.array()
      .items(
        Joi.object({
          item_name: Joi.string().required(),
          item_quantity: Joi.number().optional(),
          item_measurement: Joi.string().optional(),
          formatted_string_of_item: Joi.string().required(),
        })
      )
      .optional(),

    user: Joi.objectId().required(),

    // formatted_ingredients: Joi.array().items(Joi.string()).optional(),

    item_type: Joi.string().required(),

    itemImage0: Joi.string().optional(),

    itemImage1: Joi.string().optional(),

    itemImage2: Joi.string().optional(),

    itemImage3: Joi.string().optional(),

    item_status: Joi.array()
      .items(
        Joi.object({
          status: Joi.string().required(),
          status_note: Joi.string().required(),
        })
      )
      .optional(),

    item_categories: Joi.array().items(Joi.objectId().required()).optional(),
  });
  return schema.validate(item);
}

function videoFileSchema(item) {
  const schema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("video/mp4", "video/avi", "video/mkv", "video/mov", "video/wmv")
      .required(),
    buffer: Joi.binary().required(),
    size: Joi.number()
      .max(50 * 1024 * 1024)
      .required(), // 50MB limit
  }).required();

  return schema.validate(item);
}

function validateItem(item) {
  const schema = Joi.object({
    item_name: Joi.string().required(),

    item_images: Joi.array().items(Joi.string().optional()).optional().sparse(false),

    instruction_images: Joi.array().items(Joi.string().required()).optional(),

    itemImage0: Joi.string().optional(),

    itemImage1: Joi.string().optional(),

    itemImage2: Joi.string().optional(),

    itemImage3: Joi.string().optional(),

    item_model: Joi.string().optional(),

    image_or_video_content_1: Joi.string().optional(),

    image_or_video_content_2: Joi.string().optional(),

    image_or_video_content_3: Joi.string().optional(),

    image_or_video_content_4: Joi.string().optional(),

    image_or_video_content_5: Joi.string().optional(),

    image_or_video_content_6: Joi.string().optional(),

    item_type: Joi.string().required(),

    formatted_instructions: Joi.array()
      .items(Joi.object().optional())
      .optional(),

    store_name: Joi.objectId().optional(),

    // formatted_ingredients: Joi.array().items(Joi.string()).optional(),

    hidden_ingredients_in_product: Joi.array().items(Joi.string()).optional(),

    item_intro: Joi.string().optional(),
    item_status: Joi.array()
      .items(
        Joi.object({
          status: Joi.string().optional(),
          status_note: Joi.string().optional(),
        })
      )
      .optional(),

    user: Joi.objectId().required(),

    comments: Joi.array().items(
      Joi.object({
        comment_user: Joi.objectId(),
        comment_title: Joi.string().optional(),
        comment_message: Joi.string().optional(),
        comment_rating: Joi.number().optional(),
        comment_up_votes: Joi.number().optional(),
        comment_down_votes: Joi.number().optional(),
        comment_date_time: Joi.date().optional(),
        replies: Joi.array().items(
          Joi.object({
            replies_message: Joi.string().optional(),
            replies_up_votes: Joi.number().optional(),
            replies_down_votes: Joi.number().optional(),
            replies_date_time: Joi.date().optional(),
          })
        ),
      })
    ),

    item_description: Joi.array().items(Joi.objectId().required()),

    item_categories: Joi.array().items(Joi.objectId().required()).required(),

    // item_data: Joi.object().optional(),
  });

  return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validate = validateItem;
exports.validateItemMeal = validateItemMeal;
exports.validateItemProduct = validateItemProduct;
exports.videoFileSchema = videoFileSchema;
