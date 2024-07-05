
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.order_items = mongoose.model(
    "Order_items",
    new Schema({
        item: {
            type: mongoose.Types.ObjectId,
            refPath: "item_type",
            required: true,
        },

        item_type: {
            type: String,
            required: true,
            enum: ["Meal", "Product"],
        },

        store: {
            type: [mongoose.Types.ObjectId],
            ref: "Supplier",
        },

        quantity_of_item: { type: String },

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