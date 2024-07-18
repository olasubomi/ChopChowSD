
const Joi = require("joi");
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

            payment_transaction_id: ObjectId, //yet to validate

            customer_id: ObjectId, //yet to validate


            pickup_details: { type: {} }, //yet to validate

            intermediaries_details: ObjectId, //need more clarifiaction on these

            delivery_details: { type: {} }, //yet to validate

            payment_details: { type: {} }, //yet to validate

            drivers_id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },

            order_group: {
                type: mongoose.Types.ObjectId,
                ref: "OrderGroup",
            },

            pickup_or_delivery: {

                type: String //Need More Clarity
            },

            Notification_status: {
                type: mongoose.Types.ObjectId,
                ref: "Notification_status",  ///need more clarity
            },
            status: {
                type: String,
                required: true,
                default: "PENDING",
                enum: ["DELIVERED", "PENDING", "PROCESSED", "PICKEDUP"],
            },

            frequency_to_deliver: { type: String },

            supplier_confirmation_picture: { type: String },

            driver_confirmation_picture: { type: String },

            customer_confirmation_picture: { type: String },
        },

        { timestamps: true }
    )
);

function validateOrder(order) {
    const schema = Joi.object({
        total_order_price: Joi.string().optional(),

        user: Joi.object().optional(),

        order_items: Joi.array().items(Joi.object()).optional(),

        pickup_details,
        intermediaries_details,
        delivery_details,
        payment_details,
        drivers_id: Joi.object().optional(),
        order_group: Joi.array(),
        Notification_status : Joi.array().items(Joi.object()).optional(),
        status: Joi.string().optional(),
        customer_confirmation_picture: Joi.string().optional(),
        driver_confirmation_picture: Joi.string().optional(),
        supplier_confirmation_picture: Joi.string().optional(),
        frequency_to_deliver: Joi.string().optional(),
    });

    return schema.validate(cart);
}

exports.validateOrder = validateOrder;