const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  item_name: { type: String },
  status: { type: String, default: "Draft" },
}, { timestamps: true });

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


function validateIngredient(ingredient) {
  const schema = Joi.object({
    item_name: Joi.string().required(),
    status: Joi.string().optional(),
  });

  return schema.validate(ingredient);
}

exports.ingredientSchema = ingredientSchema;
exports.Ingredient = Ingredient;
exports.validateIngredient = validateIngredient;