const mongoose = require("mongoose");
const Joi = require('joi')


const Schema = mongoose.Schema;


const GroceryListSchema = new Schema({
    listName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    groceryItems: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        measurement: {
            type: Schema.Types.ObjectId,
            ref: 'Measurement',
            required: true
        },
        quantity: {
            type: String,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        default: "Private",
        enum: ["Draft", "Pending", "Public", "Private"],
    },
}, { timestamps: true })

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

const validateGroceryList = (groceryList) => {
    const schema = Joi.object({
        listName: Joi.string().required(),
        description: Joi.string().required(),
        user: Joi.objectId().required()
    })

    return schema.validate(groceryList)
}


function validateGroceryListUpdate(grocery) {
    const schema = Joi.object({
        listName: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().optional()
    })
    return schema.validate(grocery)
}


exports.GroceryList = GroceryList;
exports.validateGroceryList = validateGroceryList
exports.validateGroceryListUpdate = validateGroceryListUpdate