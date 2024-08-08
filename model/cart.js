const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

exports.Cart = mongoose.model(
    "Cart",
    new Schema(
        {

            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
            cart_items:
            {
                type: mongoose.Types.ObjectId,
                ref: "Order_items",
            },

        },
        { timestamps: true }
    )
);




function validateCart(cart) {
    const schema = Joi.object({

        user: Joi.string().optional(),

        cart_items: Joi.array().items(Joi.string()).optional(),
    });

    return schema.validate(cart);
}

exports.validateCart = validateCart;