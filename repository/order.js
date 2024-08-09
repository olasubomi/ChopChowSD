const { User } = require("../db/dbMongo/config/db_buildSchema");
const { Order } = require("../model/order");

const addToMyOrderList = async (payload) => {
    try {
        //saving cart list to mongoDb
        const orderlist = new Order({

            user: payload.userId,
            cart_items: {
                item: payload.itemId,
                item_type: payload.item_type,
                store: payload.storeId,
                quantity_of_item: payload.amount

            }

        });
        return await orderlist.save();
    } catch (error) {
        console.log({ error });
    }
};

const findOrderUser = async (filter) => {
    return await Order.find(filter)
}

const updateItem = async (filter, data) => {
    try {
        return await Order.findOneAndUpdate(filter, data, { new: true });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteMyOrderItem = async (id) => {
    try {
        return await Order.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteOrder = async (id) => {
    try {
        return await Order.deleteMany({ user: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const GetAllOrderItemsById = async (id) => {
    try {
        return await Order.find({ user: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const GetAllOrderItems = async () => {
    try {
        return await Order.find();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
module.exports = {
    addToMyOrderList,
    findOrderUser,
    updateItem,
    deleteMyOrderItem,
    deleteOrder,
    GetAllOrderItemsById,
    GetAllOrderItems
}
