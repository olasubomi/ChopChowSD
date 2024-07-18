
//const { getProduct } = require("../repository");
const { validateCart } = require("../model/cart");
const { findCartUser, addToCartList, updateItem, deleteCartItem, deleteCart, GetAllCartItems } = require("../repository/cart");
const { deleteItem } = require("../repository/item");
const { findUser } = require("../repository/user");


class CartService {
    static async addToCart(payload) {
        try {
            //validate input data with joi
            const validate = validateCart(payload);

            if (validate.error) {
                throw {
                    message: validate.error.details[0].message,

                    path: validate.error.details[0].path[0],
                };
            }
            const userExist = await findUser({ _id: payload.userId });


            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    let itemExist = confirmUserCart.find(x => x.cart_items.item == payload.item);
                    if (itemExist) {
                        await updateItem({ _id: itemExist._id }, {
                            $set: {
                                cart_items: {
                                    quantity_of_item: payload.amount
                                }
                            }
                        });
                    }
                    //const getItemType = getProduct({ _id: payload.itemId })
                    await addToCartList(payload);
                } else {
                    //const getItemType = getProduct({ _id: payload.itemId })
                    await addToCartList(payload);
                }
                return {

                    message: "Added to cart successfully"
                };
            } else {
                return {

                    message: "Can't add to cart -- User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }

    static async removeFromCart(payload) {
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
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    let itemExist = confirmUserCart.find(x => x.cart_items.item == payload.item);
                    if (itemExist) {
                        if (itemExist.amount == 1) {
                            await deleteCartItem(itemExist._id)
                            return {

                                message: "Removed From cart successfully"
                            };
                        } else {
                            await updateItem({ _id: itemExist._id }, {
                                $set: {
                                    cart_items: {
                                        quantity_of_item: payload.amount
                                    }
                                }
                            });
                            return {

                                message: "Quantity reduced From cart successfully"
                            };
                        }

                    }

                } else {
                    return {

                        message: "Cart is empty"
                    };
                }


            } else {
                return {

                    message: "Can't add to cart -- User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }


    static async DeleteFromCart(payload) {
        try {
            //validate input data with joi

            const userExist = await findUser({ _id: payload.userId });

            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    let itemExist = confirmUserCart.find(x => x.cart_items.item == payload.item);
                    if (itemExist) {
                        await deleteCartItem(itemExist._id)
                        return {

                            message: "Removed From cart successfully"
                        };
                    }


                } else {
                    return {

                        message: "Cart is empty"
                    };
                }


            } else {
                return {

                    message: "Can't remove cart -- User doesn't exist"
                };
            }


        } catch (error) {
            console.log("caught");
            throw error;
        }
    }
    static async DeleteCart(userId) {
        try {
            const userExist = await findUser({ _id: payload.userId });

            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    return await deleteCart(userId);
                } else {
                    return {

                        message: "Cart is empty"
                    };
                }
            } else {
                return {

                    message: "User doesn't exist"
                };
            }
        } catch (error) {
            throw error;
        }
    }

    static async GetCart(userId) {
        try {
            const userExist = await findUser({ _id: payload.userId });

            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    return await GetAllCartItems(userId);
                } else {
                    return {

                        message: "Cart is empty"
                    };
                }
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

module.exports = CartService