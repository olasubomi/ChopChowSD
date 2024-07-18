const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.cart = mongoose.model(
    "Cart",
    new Schema(
        {

            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
            cart_items: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Order_items",
                }, ``
            ],
        },
        { timestamps: true }
    )
);




function validateCart(cart) {
    const schema = Joi.object({

        user: Joi.object().optional(),

        cart_items: Joi.array().items(Joi.object()).optional(),
    });

    return schema.validate(cart);
}

exports.validateCart = validateCart;