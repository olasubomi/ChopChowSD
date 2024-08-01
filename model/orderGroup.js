
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



exports.order_groups = mongoose.model(
    "order_groups",
    new Schema(
        {
            pickup_region: { type: String },

            dropoff_regions: { type: String },

            orders: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Order",
                },
            ],

            number_of_drivers_currently_visibly_available: { type: String },

            sub_order_groups: ObjectId, //need more explanation on this
        },

        { timestamps: true }
    )
);