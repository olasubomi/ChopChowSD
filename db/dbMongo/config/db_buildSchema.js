
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.list = mongoose.model('list', new Schema({
    id: Number,
    product_name: String,
    product_image:String,
    product_price:Number,
    sizes:String,
    price_per_ounce:Number,
    customerid: [{ type: Schema.Types.ObjectId, ref: 'customer' }],

}))

exports.Customer = mongoose.model('Customer', new Schema({
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
    listid: [{ type: Schema.Types.ObjectId, ref: 'list' }],
}))

exports.admin = mongoose.model('admin', new Schema({
    id: Schema.Types.ObjectId,
    name: String,
}))

exports.supplier = mongoose.model('supplier', new Schema({
    id: Schema.Types.ObjectId,
    storeName: String,
}))
