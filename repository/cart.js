const { User } = require("../db/dbMongo/config/db_buildSchema");
const { cart } = require("../model/cart");

const addToCartList = async (payload) => {
    try {
        //saving cart list to mongoDb
        const cartlist = new cart({
            total: payload.amount,
            userId: payload.userId,
            cart_items: {
                item: payload.itemId,
                item_type: payload.item_type,
                store: payload.storeId,
                quantity_of_item: payload.amount

            }

        });
        return await cartlist.save();
    } catch (error) {
        console.log({ error });
    }
};

const findCartUser = async (filter) => {
    return await cart.findOne(filter)
}

module.exports = {
    addToCartList,
    findCartUser
}
