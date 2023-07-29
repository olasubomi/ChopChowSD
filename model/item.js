const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { products, meals, Utensil } = require("../db/dbMongo/config/db_buildSchema");

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },

    item_images: [{ type: String, required: true }],

    item_type: { type: String, required: true },

    item_price: { type: String, required: true },

    store_available: { type: mongoose.Types.ObjectId, ref: "Supplier" },


    itemImage2: { type: String },

    itemImage3: { type: String },

    store_available: { type: mongoose.Types.ObjectId, ref: "Supplier" },

    formatted_ingredients: [{ type: String }],

    formatted_instructions: [{ type: Object }],

    tips: [{ type: String }],

    hidden_ingredients_in_product: [{ type: String }],

    formatted_ingredients: [{ type: String }],

    hidden_ingredients_in_product: [{ type: String }],

    item_intro: { type: String },

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

    user: { type: mongoose.Types.ObjectId, ref: "User" },

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

    item_description: [{
      type: mongoose.Types.ObjectId,
      ref: 'item_description'
    }],

    item_categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],

    // item_categories: [{ type: mongoose.Types.ObjectId, ref: "categories" }],

    // item_data: { type: meals.schema || products.schema || Utensil.schema },
    item_data: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'item_type',
      required: true
    },
    item_type: {
      type: String,
      enum: ['Meal', 'Product', 'Utensil'],
      required: true
    }

  }, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

function validateItem(item) {
  const schema = Joi.object({
    item_name: Joi.string().required(),

    item_images: Joi.array().items(Joi.string().required()).required(),

    instruction_images: Joi.array().items(Joi.string().required()).optional(),

    itemImage0: Joi.string().required(),

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

    item_price: Joi.string().required(),

    formatted_instructions: Joi.array().items(Joi.object().required()).optional(),

    store_name: Joi.objectId().optional(),

    formatted_ingredients: Joi.array().items(Joi.string()).optional(),

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

    item_description: Joi.array().items(

      Joi.objectId().required()
    ),

    item_categories: Joi.array().items(Joi.objectId().required()).required(),

    item_data: Joi.object().optional(),
  });

  return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validate = validateItem;
