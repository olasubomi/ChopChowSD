const Joi = require("joi");
const { ObjectId } = require("mongodb");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

function validateItem(item) {
  const schema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    store: Joi.string().required(),
  });

  return schema.validate(item);
}

exports.itemSchema = itemSchema;
exports.Item = Item;
exports.validate = validateItem;
