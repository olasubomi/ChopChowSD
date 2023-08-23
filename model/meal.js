const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const {
  products,
  meals,
  categories,
  Supplier,
} = require("../db/dbMongo/config/db_buildSchema");

const mealSchema = new mongoose.Schema(
  {
    image_or_video_content_1: [{ type: String }],

    image_or_video_content_2: [{ type: String }],

    image_or_video_content_3: [{ type: String }],

    image_or_video_content_4: [{ type: String }],

    image_or_video_content_5: [{ type: String }],

    prep_time: { type: String },

    cook_time: { type: String },

    chef: { type: String },

    servings: { type: String },

    total_rating: { type: String, required: false },

    average_rating: { type: String, required: false },

    kitchen_utensils: [{ type: String }],

    tips: [{ type: String }],

    formatted_instructions: [{ type: String }],

    image_or_video_content: [{ type: String }],

    similar_meals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Meal",
      },
    ],
  },

  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);

function validateMeal(meal) {
  const schema = Joi.object({
    image_or_video_content_1: Joi.array().items(Joi.string()).optional(),

    image_or_video_content_2: Joi.array().items(Joi.string()).optional(),

    image_or_video_content_3: Joi.array().items(Joi.string()).optional(),

    image_or_video_content_4: Joi.array().items(Joi.string()).optional(),

    image_or_video_content_5: Joi.array().items(Joi.string()).optional(),

    prep_time: Joi.string().optional(),

    cook_time: Joi.string().optional(),

    chef: Joi.string().optional(),

    servings: Joi.string().optional(),

    kitchen_utensils: Joi.array().items(Joi.string()).optional(),

    tips: Joi.array().items(Joi.string()).optional(),

    formatted_instructions: Joi.array().items(Joi.string()).optional(),

    image_or_video_content: Joi.array().items(Joi.string()).optional(),

    similar_meals: Joi.array().items(Joi.objectId()).optional(),
  });

  return schema.validate(meal);
}

exports.mealSchema = mealSchema;
exports.Meal = Meal;
exports.validateMeal = validateMeal;
