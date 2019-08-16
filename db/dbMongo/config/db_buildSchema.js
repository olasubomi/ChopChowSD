
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const list = mongoose.model('list', new Schema({
    id: Number,
    product_name: String,
    product_image:String,
    product_price:String,
    sizes:String
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

module.exports = {list}