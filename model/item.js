const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { products, meals } = require("../db/dbMongo/config/db_buildSchema");

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },

    item_images: [{ type: String, required: true }],

    item_type: { type: String, required: true },

    item_price: { type: String, required: true },

    store_available: { type: mongoose.Types.ObjectId, ref: "Supplier" },

    store_name: { type: String, required: true },

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

    item_description: [
      {
        object_name: { type: String },
        object_quantity: { type: Number },
        object_measurement: {},
        formatted_string: { type: String },
      },
    ],

    item_categories: [{ type: mongoose.Types.ObjectId, ref: "categories" }],

    item_data: { type: products.schema || meals.schema },
  },

  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

function validateItem(item) {
  const schema = Joi.object({
    item_name: Joi.string().required(),

    item_images: Joi.array().items(Joi.string().required()).required(),

    item_type: Joi.string().required(),

    item_price: Joi.string().required(),

    store_available: Joi.objectId().required(),

    store_name: Joi.string().required(),

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
      Joi.object({
        object_name: Joi.string(),
        object_quantity: Joi.number(),
        object_measurement: Joi.any(),
        formatted_string: Joi.string(),
      })
    ),

    item_categories: Joi.array().items(Joi.objectId().required()).required(),

    item_data: Joi.object().optional(),
  });

  return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validate = validateItem;
