
//const { getProduct } = require("../repository");
const { validateCart } = require("../model/cart");
const { findCartUser, addToCartList, updateItem, deleteCartItem, deleteCart, GetAllCartItems, findO, findOrderList } = require("../repository/cart");
const { deleteItem } = require("../repository/item");
const { findUser } = require("../repository/user");
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

class CartService {
    static async addToCart(payload) {
        try {

            console.log("cart payload", payload)
            //validate input data with joi

            //var item;
            //const validate = validateCart(payload);
            //


            // if (validate.error) {
            //     throw {
            //         message: validate.error.details[0].message,

            //         path: validate.error.details[0].path[0],
            //     };
            // }
            const userId = new ObjectId(payload.user);
            const itemId = new ObjectId(payload.item);
            const userExist = await findUser({ _id: userId });


            if (userExist && userExist.isVerified) {
                //const item = await addToCartList(payload);
                let item;

                const confirmUserCart = await findCartUser({ user: userExist._id })
                console.log("confirmUserCart line39", confirmUserCart)
                if (confirmUserCart.length > 0) {
                    const itemExist = await findOrderList({ item: itemId });
                    console.log("itemExist line39", itemExist)
                    //let itemExist = confirmUserCart.find(x => x.cart_items === payload.item);

                    if (itemExist) {
                        await updateItem({ _id: itemExist._id }, {
                            $set: {
                                quantity_of_item: payload.quantity
                            }
                        });
                    } else {
                        //const getItemType = getProduct({ _id: payload.itemId })
                        item = await addToCartList(payload);
                        console.log("returned cart item", item)
                    }
                } else {
                    //const getItemType = getProduct({ _id: payload.itemId })
                    item = await addToCartList(payload);

                    console.log("returned cart item", item)
                }
                return {
                    data: item,
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
            console.log("cart payload", payload)
            //const itemId = new ObjectId(payload.item);
            const itemId = payload.item;
            const userId = new ObjectId(payload.user._id);
            const userExist = await findUser({ _id: userId });
            console.log("cart userExist", userExist)

            if (userExist && userExist.isVerified) {
                let item;

                const confirmUserCart = await findCartUser({ user: userExist._id })
                console.log("confirmUserCart line39", confirmUserCart)
                if (confirmUserCart.length > 0) {
                    let itemE = await findO()

                    const itemExist = await findOrderList({ $or: [{ _id: itemId }, { item: itemId }] });
                    console.log("cart itemE", itemE)
                    console.log("cart itemExist", itemExist)
                    console.log("cart itemE", itemId)
                    //let itemExist = confirmUserCart.find(x => x.cart_items.item == payload.item);
                    if (itemExist) {
                        if (itemExist.quantity_of_item == 1) {
                            await deleteCartItem(itemExist._id)
                            return {

                                message: "Removed From cart successfully"
                            };
                        } else {
                            await updateItem({ _id: itemExist._id }, {
                                $set: {

                                    quantity_of_item: payload.quantity

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
            console.log("cart payload", payload)
            const userId = new ObjectId(payload.user._id);
            const itemId = payload.item;
            const userExist = await findUser({ _id: userId });
            console.log("cart userExist", userExist)
            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                console.log("cart confirmUserCart", confirmUserCart)
                if (confirmUserCart.length > 0) {
                    const itemExist = await findOrderList({ $or: [{ _id: itemId }, { item: itemId }] });
                    console.log("cart itemExist", itemExist)
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
    static async DeleteCart(payload) {
        try {
            const userId = new ObjectId(payload.user._id);
            const userExist = await findUser({ _id: userId });

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

    static async GetCart(payload) {
        try {
            const user = new ObjectId(payload.user._id);
            const userExist = await findUser({ _id: user });

            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id })
                if (confirmUserCart.length > 0) {
                    let payload = await GetAllCartItems(userExist._id);
                    console.log("payload", payload)
                    return {
                        data: payload,
                        message: "Cart Successfully Fetched"
                    };
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