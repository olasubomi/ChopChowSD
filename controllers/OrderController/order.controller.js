const OrderService = require("../../services/orderService");
const { Response } = require("http-status-codez");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
    addToOrderList: async (req, res) => {
        try {
            const user = await OrderService.CreateOrder(req.body);

            return res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(user).recordCreated());

        } catch (error) {
            console.log(error);
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    removeFromMyOrderList: async (req, res) => {
        try {
            const user = await OrderService.removeFromMyOrderList(req.body);

            return res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(user).recordCreated());

        } catch (error) {
            console.log(error);
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    deleteMyOrders: async (req, res) => {
        try {
            const user = await OrderService.DeleteMyOrders(req.body);

            return res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(user).recordCreated());

        } catch (error) {
            console.log(error);
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    getMyOrder: async (req, res) => {
        try {
            const user = await OrderService.GetMyOrder(req.body);

            return res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(user).recordCreated());

        } catch (error) {
            console.log(error);
            return res
                .status(Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    }
}
