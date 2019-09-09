
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
