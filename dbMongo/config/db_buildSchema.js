const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.grocery_listItem = mongoose.model('grocery_listItem', new Schema({
  _id: Schema.Types.ObjectId,
  name_grocery: String
}))

exports.Customer = mongoose.model('Customer', new Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: Number,
  street: String,
  city: String,
  zip_code: Number,
  ips_id: Number,
  grocery_listItem_id: [{ type: Schema.Types.ObjectId, ref: 'grocery_listItem' }],
}))

exports.admin = mongoose.model('admin', new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
}))

exports.supplier = mongoose.model('supplier', new Schema({
  _id: Schema.Types.ObjectId,
  store_name: String,
}))


