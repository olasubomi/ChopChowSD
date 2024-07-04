module.exports = {
    CreateCart: async (req, res) => {
        try {
            const user = await CartService.createCart(req.body);

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