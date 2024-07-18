
//const { getProduct } = require("../repository");
const { validateOrder } = require("../model/order");
const { addToMyOrderList, deleteMyOrderItem, deleteOrder, GetAllOrderItemsById } = require("../repository/order");
const { deleteItem } = require("../repository/item");
const { findUser } = require("../repository/user");


class OrderService {
    static async addToMyOrderList(payload) {
        try {
            //validate input data with joi
            const validate = validateOrder(payload);

            if (validate.error) {
                throw {
                    message: validate.error.details[0].message,

                    path: validate.error.details[0].path[0],
                };
            }
            const userExist = await findUser({ _id: payload.userId });


            if (userExist && userExist.isVerified) {
                await addToMyOrderList(payload);
                return {

                    message: "order added successfully"
                };
            } else {
                return {

                    message: "Can't add to order -- User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }

    static async removeFromMyOrderList(payload) {
        try {

            const userExist = await findUser({ _id: payload.userId });


            if (userExist && userExist.isVerified) {


                await deleteMyOrderItem(payload._id)
                return {

                    message: "Removed From cart successfully"
                };

            } else {
                return {

                    message: " User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }


    static async DeleteMyOrders(userId) {
        try {

            const userExist = await findUser({ _id: payload.userId });


            if (userExist && userExist.isVerified) {


                await deleteOrder(payload.userExist._id)
                return {

                    message: "Removed From cart successfully"
                };

            } else {
                return {

                    message: " User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }

    static async GetMyOrder(userId) {
        try {
            const userExist = await findUser({ _id: payload.userId });

            if (userExist && userExist.isVerified) {

                return await GetAllOrderItemsById(userId);

            } else {
                return {

                    message: "User doesn't exist"
                };
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService