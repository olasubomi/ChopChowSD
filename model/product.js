const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const {
  products,
  meals,
  categories,
  Supplier,
} = require("../db/dbMongo/config/db_buildSchema");

const productSchema = new mongoose.Schema(
  {
    product_size: { type: String },

    product_alternatives: [{ type: String }],

    meals_including_product: [{ type: mongoose.Types.ObjectId, ref: "Meal" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    product_size: Joi.string().optional(),
    product_alternatives: Joi.array().items(Joi.string()).optional(),
    meals_including_product: Joi.array().items(Joi.objectId().optional()),
  });

  return schema.validate(product);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validateProduct = validateProduct;
