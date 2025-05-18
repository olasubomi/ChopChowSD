const { User } = require("../db/dbMongo/config/db_buildSchema");
const { Cart } = require("../model/cart");
const mongoose = require("mongoose");
const { Order_items } = require("../model/orderItems");

const addToCartList = async (payload) => {
    try {
        const storeId = new mongoose.Types.ObjectId(92929898);
        const itemId = new mongoose.Types.ObjectId(payload.item);
        let cart;

        if (payload.item_type == "" || payload.item_type == null) {
            let order_items = new Order_items({
                item: itemId,
                store: storeId,
                quantity_of_item: payload.quantity,
                item_price: payload.item_price,
                item_Name: payload.item_Name,
                item_image: payload.item_image,
                estimated_time_of_arrival: new Date(),
            });
            cart = await order_items.save();
        } else {
            let order_items = new Order_items({
                item: itemId,
                item_type: payload.item_type,
                store: storeId,
                quantity_of_item: payload.quantity,
                item_price: payload.item_price,
                item_Name: payload.item_Name,
                item_image: payload.item_image,
                estimated_time_of_arrival: new Date(),
            });
            cart = await order_items.save();
            console.log("cart line 36 --cart repo", cart);
        }
        //saving cart list to mongoDb

        //console.log("order_items line 21 --cart repo", order_items)

        const cartlist = new Cart({
            user: payload.user,
            cart_items: cart._id,
        });

        console.log("cartlist line 30 --cart repo", cartlist);
        return await cartlist.save();
    } catch (error) {
        console.log({ error });
    }
};

// async function addToCartList(payload) {
//     const itemObjectId = new mongoose.Types.ObjectId(payload.itemId);
//     const userObjectId = new mongoose.Types.ObjectId(payload.user);

//     const userCart = await cart.findOne({ user: userObjectId });

//     console.log("userCart line34", userCart)

//     if (userCart) {
//         const existingItem = userCart.cart_items.find(cartItem => cartItem.item.equals(itemObjectId));
//         console.log("existingItem line38", existingItem)
//         if (existingItem) {
//             existingItem.quantity_of_item += payload.quantity;
//         } else {
//             userCart.cart_items.push({
//                 item: itemObjectId,
//                 item_type: payload.item_type,
//                 store: payload.storeId,
//                 quantity_of_item: payload.quantity
//             });
//         }

//         await userCart.save();
//         return userCart;
//     } else {
//         const newCart = new cart({
//             user: userObjectId,
//             cart_items: [{
//                 item: itemObjectId,
//                 item_type: payload.item_type,
//                 store: payload.storeId,
//                 quantity_of_item: payload.quantity
//             }]
//         });

//         await newCart.save();
//         return newCart;
//     }
// }

const findO = async () => {
    return await Order_items.find();
};

const findCartUser = async (filter) => {
    return await Cart.find(filter);
};

const findOrderList = async (filter) => {
    return await Order_items.findOne(filter); //.populate('store');
};

const updateItem = async (filter, data) => {
    try {
        return await Order_items.findByIdAndUpdate(filter, data, { new: true });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteCartItem = async (id) => {
    try {
        //order_items
        await Order_items.deleteOne({ _id: id });
        return await Cart.deleteOne({ cart_items: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteCart = async (id) => {
    try {
        let cartItems = await Cart.find({ user: id });
        cartItems.forEach((element) => {
            Order_items.deleteOne({ _id: element.cart_items });
        });
        return await Cart.deleteMany({ user: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const GetAllCartItems = async (id) => {
    // try {
    //     let arrayOfOrder = [];
    //     let cartItems = await Cart.find({ user: id });
    //     cartItems.forEach(element => {
    //         let orderlistElement = Order_items.findOne({ _id: element.cart_items }).populate('store');
    //         arrayOfOrder.push(orderlistElement)
    //     });
    //     return arrayOfOrder;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
    try {
        // Initialize an empty array to store order items
        let arrayOfOrder = [];

        // Fetch cart items for the specified user
        let cartItems = await Cart.find({ user: id });

        // Use map to create an array of promises
        let orderPromises = cartItems.map(async (element) => {
            // Find the order item and populate the store field
            let orderlistElement = await Order_items.findById(
                element.cart_items
            ).populate("store");
            return orderlistElement;
        });

        // Wait for all promises to resolve
        arrayOfOrder = await Promise.all(orderPromises);
        console.log("line 174 cart array", arrayOfOrder);
        // Return the array of order items
        return arrayOfOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    addToCartList,
    findCartUser,
    updateItem,
    deleteCartItem,
    deleteCart,
    findOrderList,
    GetAllCartItems,
    findO,
};
