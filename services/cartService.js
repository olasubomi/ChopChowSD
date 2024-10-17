const {
    findCartUser,
    addToCartList,
    updateItem,
    deleteCartItem,
    deleteCart,
    GetAllCartItems,
    findO,
    findOrderList,
} = require("../repository/cart");
const { deleteItem } = require("../repository/item");
const { findUser } = require("../repository/user");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

class CartService {
    static async addToCart(payload) {
        try {
            const userId = new ObjectId(payload.user);
            const itemId = new ObjectId(payload.item);
            const userExist = await findUser({ _id: userId });

            if (userExist && userExist.isVerified) {
                let item;

                const confirmUserCart = await findCartUser({ user: userExist._id });
                if (confirmUserCart.length > 0) {
                    const itemExist = await findOrderList({ item: itemId });

                    if (itemExist) {
                        let update = await updateItem(
                            { _id: itemExist._id },
                            {
                                $set: {
                                    quantity_of_item: payload.quantity,
                                },
                            }
                        );
                    } else {
                        item = await addToCartList(payload);
                    }
                } else {
                    item = await addToCartList(payload);
                }
                return {
                    data: item,
                    message: "Added to cart successfully",
                };
            } else {
                return {
                    message: "Can't add to cart -- User doesn't exist",
                };
            }
        } catch (error) {
            console.log("caught");
            throw error;
        }
    }

    static async addMultipleItemsToCart(payload) {
        try {
            const userId = new ObjectId(payload.user);
            const userExist = await findUser({ _id: userId });

            if (userExist && userExist.isVerified) {
                let addedItems = [];
                const confirmUserCart = await findCartUser({ user: userExist._id });

                for (const itemPayload of payload.items) {
                    const itemId = new ObjectId(itemPayload.item);
                    let item;

                    if (confirmUserCart.length > 0) {
                        const itemExist = await findOrderList({ item: itemId });

                        if (itemExist) {
                            let update = await updateItem(
                                { _id: itemExist._id },
                                {
                                    $set: {
                                        quantity_of_item: itemPayload.quantity,
                                    },
                                }
                            );
                            addedItems.push({
                                item: itemExist,
                                quantity: itemPayload.quantity,
                                message: "Item quantity updated",
                            });
                        } else {
                            item = await addToCartList(itemPayload);
                            addedItems.push({
                                item,
                                message: "Item added to cart",
                            });
                        }
                    } else {
                        item = await addToCartList(itemPayload);
                        addedItems.push({
                            item,
                            message: "Item added to new cart",
                        });
                    }
                }

                return {
                    data: addedItems,
                    message: "Items processed successfully",
                };
            } else {
                return {
                    message: "Can't add to cart -- User doesn't exist",
                };
            }
        } catch (error) {
            console.log("caught", error);
            throw error;
        }
    }

    static async removeFromCart(payload) {
        try {
            //const itemId = new ObjectId(payload.item);
            const itemId = payload.item;
            const userId = new ObjectId(payload.user._id);
            const userExist = await findUser({ _id: userId });

            if (userExist && userExist.isVerified) {
                let item;

                const confirmUserCart = await findCartUser({ user: userExist._id });
                if (confirmUserCart.length > 0) {
                    let itemE = await findO();

                    const itemExist = await findOrderList({
                        $or: [{ _id: itemId }, { item: itemId }],
                    });

                    //let itemExist = confirmUserCart.find(x => x.cart_items.item == payload.item);
                    if (itemExist) {
                        if (itemExist.quantity_of_item == 1) {
                            await deleteCartItem(itemExist._id);
                            return {
                                message: "Removed From cart successfully",
                            };
                        } else {
                            await updateItem(
                                { _id: itemExist._id },
                                {
                                    $set: {
                                        quantity_of_item: payload.quantity,
                                    },
                                }
                            );
                            return {
                                message: "Quantity reduced From cart successfully",
                            };
                        }
                    }
                } else {
                    return {
                        message: "Cart is empty",
                    };
                }
            } else {
                return {
                    message: "Can't add to cart -- User doesn't exist",
                };
            }
        } catch (error) {
            console.log("caught");
            throw error;
        }
    }

    static async DeleteFromCart(payload) {
        try {
            const userId = new ObjectId(payload.user._id);
            const itemId = payload.item;
            const userExist = await findUser({ _id: userId });
            if (userExist && userExist.isVerified) {
                const confirmUserCart = await findCartUser({ user: userExist._id });
                if (confirmUserCart.length > 0) {
                    const itemExist = await findOrderList({
                        $or: [{ _id: itemId }, { item: itemId }],
                    });
                    if (itemExist) {
                        await deleteCartItem(itemExist._id);
                        return {
                            message: "Removed From cart successfully",
                        };
                    }
                } else {
                    return {
                        message: "Cart is empty",
                    };
                }
            } else {
                return {
                    message: "Can't remove cart -- User doesn't exist",
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
                const confirmUserCart = await findCartUser({ user: userExist._id });
                if (confirmUserCart.length > 0) {
                    return await deleteCart(userId);
                } else {
                    return {
                        message: "Cart is empty",
                    };
                }
            } else {
                return {
                    message: "User doesn't exist",
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
                const confirmUserCart = await findCartUser({ user: userExist._id });
                if (confirmUserCart.length > 0) {
                    let payload = await GetAllCartItems(userExist._id);
                    return {
                        data: payload,
                        message: "Cart Successfully Fetched",
                    };
                } else {
                    return {
                        message: "Cart is empty",
                    };
                }
            } else {
                return {
                    message: "User doesn't exist",
                };
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;
