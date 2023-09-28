const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { Item } = require("./item");

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
          item_id: mongoose.Schema.ObjectId,
          item: {
            type: Item.schema,
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
                item_id: Joi.objectId().optional(),
                itemId: Joi.objectId().required(),
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

function validateItemToBeAddedToAGroceryList(list) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    groceryList: Joi.object({
      listName: Joi.string().required(),
      groceryItems: Joi.object({
        itemId: Joi.string().required(),
        quantity: Joi.string().optional(),
        measurement: Joi.string().optional()
      })
    })
  })

  return schema.validate(list)
}

function vaidateJsonDataToBeAddedToGroceryList(list) {
  const schema = Joi.object({
    item_name: Joi.string().required(),
    listName: Joi.string().required(),
    quantity: Joi.string().optional(),
    measurement: Joi.string().optional()
  })
  return schema.validate(list)
}



exports.grocerySchema = grocerySchema;
exports.Grocery = Grocery;
exports.validate = validateGrocery;
exports.validateItemToBeAddedToAGroceryList = validateItemToBeAddedToAGroceryList
exports.vaidateJsonDataToBeAddedToGroceryList = vaidateJsonDataToBeAddedToGroceryList