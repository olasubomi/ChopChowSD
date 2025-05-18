
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Order_items = mongoose.model(
    "Order_items",
    new Schema({
        item: {
            type: mongoose.Types.ObjectId,
            refPath: "item_type",
            required: true,
        },

        item_type: {
            type: String,
            enum: ["Meal", "Product", "Utensil"],
            default: "Meal"
        },

        store: {
            type: [mongoose.Types.ObjectId],
            ref: "Supplier",
        },
        item_price: { type: String },

        item_Name: { type: String },

        item_image: { type: String },

        quantity_of_item: { type: Number },

        estimated_time_of_arrival: Date,
    })
);

// function validateOrder_Items(order_items) {
//     const schema = Joi.object({
//         item: Joi.array().items(Joi.objectId().required()).optional(),

//         user: Joi.string().optional(),

//         cart_items: Joi.array().items(Joi.string()).optional(),
//     });

//     return schema.validate(order_items);
// }

// exports.validateOrder_Items = validateOrder_Items;