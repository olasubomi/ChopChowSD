const { User } = require("../db/dbMongo/config/db_buildSchema");
const { cart } = require("../model/cart");

const addToCartList = async (payload) => {
    try {
        //saving cart list to mongoDb
        const cartlist = new cart({

            user: payload.userId,
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
    return await cart.find(filter)
}

const updateItem = async (filter, data) => {
    try {
        return await cart.findOneAndUpdate(filter, data, { new: true });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteCartItem = async (id) => {
    try {
        return await cart.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteCart = async (id) => {
    try {
        return await cart.deleteMany({ user: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const GetAllCartItems = async (id) => {
    try {
        return await cart.find({ user: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    addToCartList,
    findCartUser,
    updateItem,
    deleteCartItem,
    deleteCart,
    GetAllCartItems
}
