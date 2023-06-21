const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { products } = require("../db/dbMongo/config/db_buildSchema");

const grocerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  groceryList: [
    {
      listName: {
        type: String,
        required: true,
      },
      groceryItems: [
        {
          product_id: mongoose.Schema.ObjectId,
          product: {
            type: products.schema,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          pickUpTime: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Grocery = mongoose.model("Grocery", grocerySchema);

function validateGrocery(grocery) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    groceryList: Joi.array()
      .items(
        Joi.object({
          listName: Joi.string().required(),
          groceryItems: Joi.array()
            .items(
              Joi.object({
<<<<<<< HEAD
                product_id: Joi.objectId().optional(),
                productId: Joi.objectId().required(),
=======
                item_id: Joi.objectId().optional(),
                itemId: Joi.objectId().required(),
>>>>>>> 2f226bc127236b5d77f9bb2009a79a53375959fb
                quantity: Joi.number().required(),
                pickUpTime: Joi.string().required(),
              })
            )
            .required(),
        })
      )
      .required(),
  });

  return schema.validate(grocery);
}

exports.grocerySchema = grocerySchema;
exports.Grocery = Grocery;
exports.validate = validateGrocery;
