const { string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Notification_status = mongoose.model(
    "Notification_status",
    new Schema(
        {
            order_drafted_but_not_placed: { type: Boolean },

            date_time_order_placed: { type: Date },

            date_time_order_accepted: { type: Date },

            date_time_order_prepared: { type: Date },

            date_time_order_picked_up: { type: Date },

            date_time_order_delivered: { type: Date },

            date_time_order_cancelled: { type: Date },

            date_time_order_refunded: { type: Date },




        }))



