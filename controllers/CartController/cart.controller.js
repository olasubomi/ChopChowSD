const CartService = require("../../services/cartService");
const { Response } = require("http-status-codez");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
    addToCart: async (req, res) => {
        try {
            const user = await CartService.addToCart(req.body);

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

    removeFromCart: async (req, res) => {
        try {
            const user = await CartService.removeFromCart(req.body);

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

    deleteFromCart: async (req, res) => {
        try {
            const user = await CartService.DeleteFromCart(req.body);

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

    deleteCart: async (req, res) => {
        try {
            const user = await CartService.DeleteCart(req.body);

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

    getCart: async (req, res) => {
        try {
            const user = await CartService.GetCart(req.body);

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
