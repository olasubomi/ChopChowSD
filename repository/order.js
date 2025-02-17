const { Order } = require("../model/order");

const addToMyOrderList = async (payload) => {
    try {
        //saving cart list to mongoDb
        return await Order.create(payload);
    } catch (error) {
        throw error;
    }
};

const findOrderUser = async (filter) => {
    try {
        return await Order.find(filter);
    } catch (error) {
        throw error;
    }
};

const updateItem = async (filter, data) => {
    try {
        return await Order.findOneAndUpdate(filter, data, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteMyOrderItem = async (id) => {
    try {
        return await Order.deleteOne({ _id: id });
    } catch (error) {
        throw error;
    }
};

const deleteOrder = async (id) => {
    try {
        return await Order.deleteMany({ user: id });
    } catch (error) {
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
    GetAllOrderItems,
};
