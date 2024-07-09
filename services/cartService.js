
const { getProduct } = require("../repository");
const { findCartUser } = require("../repository/cart");
const { findUser } = require("../repository/user");


class CartService {
    static async addToCart(payload) {
        try {
            //validate input data with joi
            const validate = cartSchema.validate(payload);

            if (validate.error) {
                throw {
                    message: validate.error.details[0].message,

                    path: validate.error.details[0].path[0],
                };
            }
            const userExist = await findUser({ _id: payload.userId });


            if (userExist && userExist.isVerified) {
                const IsCartCreated = await findCartUser({ user: userExist._id })
                if (IsCartCreated) {
                    const getItemType = getProduct({ _id: payload.itemId })
                    await addToCartList(payload, getProductType.item_type);
                }

            }




            return {
                user: newUser,
                message: "Added to cart successfully"
            };
        } catch (error) {
            console.log("caught");
            throw error;
        }
    }
}

module.exports = CartService