
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.all_products = mongoose.model('all_products', new Schema({
    id: Number,
    product_name: String,
    product_image: String,
    product_price: String,
    sizes: Array,
    respective_prices: Array
}))


exports.store_products = mongoose.model('store_products', new Schema({
    id: Number,
    store_name: String,
    store_image: String,
    products: Array
}))

exports.meals = mongoose.model('meals', new Schema({
    id: Number,
    label: String,
    imageSrc: String,
    readTime: String,
    cookTime: String,
    intro: String,
    ingredients: Array,
    products: Array,
    product_slider: [{ ingredient: String, image: String }],
    categories: Array,
    instructions: Array,
    display: Boolean
}))

exports.all_meal_categories = mongoose.model('all_meal_categories', new Schema({
    id: Number,
    category_name: String
}))

exports.suggested_meals = mongoose.model('suggested_meals', new Schema({
    id: Number,
    label: String,
    imageSrc: String,
    readTime: String,
    cookTime: String,
    intro: String,
    ingredients: Array,
    products: Array,
    product_slider: [{ ingredient: String, image: String }],
    categories: Array,
    instructions: Array,
    display: Boolean
}))

exports.customers = mongoose.model('customers', new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phoneNumber: Number,
    street: String,
    city: String,
    zipCode: Number,
    ipsid: Number,
    username: String,
    emailNotification: Boolean
}))

exports.customers_lists = mongoose.model('customers_lists', new Schema({
    id: Number,
    customer_id: Number,
    grocery_list_id: Number,
    cart_list_id: Number
}))

exports.customer_cart_list = mongoose.model('customer_cart_list', new Schema({
    list_id: Number,
    cart_list: Array
}))

exports.customer_grocery_list = mongoose.model('customer_grocery_list', new Schema({
    list_id: Number,
    grocery_list: Array
}))


// exports.admin = mongoose.model('admin', new Schema({
//     id: Schema.Types.ObjectId,
//     name: String,
// }))

// exports.supplier = mongoose.model('supplier', new Schema({
//     id: Schema.Types.ObjectId,
//     storeName: String,
// }))

// exports.lists = mongoose.model('lists', new Schema({
//     id: Number,
//     product_name: String,
//     product_image:String,
//     product_price:Number,
//     sizes:String,
//     price_per_ounce:Number,
// }))




