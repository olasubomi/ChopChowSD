
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Order = mongoose.model(
    "Order",
    new Schema(
        {
            total_order_price: { type: String },

            order_items: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Order_items",
                },
            ],

            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
            pickup_details: { type: {} },

            intermediaries_details: ObjectId, //need more clarifiaction on these

            delivery_details: { type: {} },

            payment_details: { type: {} },

            drivers_id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },

            order_group: Array,

            status: {
                type: String,
                required: true,
                default: "PENDING",
                enum: ["DELIVERED", "PENDING", "PROCESSED", "PICKEDUP"],
            },
        },

        { timestamps: true }
    )
);