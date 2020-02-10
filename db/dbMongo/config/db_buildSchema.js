
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.meals = mongoose.model('meals', new Schema({
    id: Number,
    label: String,
    imageSrc: String,
    readTime: String,
    cookTime: String,
    intro: String,
    ingredients: Array,
    products: Array,
    product_slider: [{ingredient: String, image: String}],
    instructions: Array,
    display: Boolean
}))

exports.Store_Products = mongoose.model('Store_Products', new Schema({
    id: Number,
    store_name: String,
    store_image: String,
    products: Array
}))

exports.list = mongoose.model('list', new Schema({
    id: Number,
    product_name: String,
    product_image:String,
    product_price:Number,
    sizes:String,
    price_per_ounce:Number,

}))

exports.customer = mongoose.model('customer', new Schema({
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
    emailnotifcation: Boolean
}))
exports.customer_list = mongoose.model('customer_list', new Schema({
    id: Number,
    customer_id: Number,
    list_id:Number,

}))

exports.admin = mongoose.model('admin', new Schema({
    id: Schema.Types.ObjectId,
    name: String,
}))

exports.supplier = mongoose.model('supplier', new Schema({
    id: Schema.Types.ObjectId,
    storeName: String,
}))




