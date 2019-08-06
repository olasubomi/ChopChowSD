const mongoose =  require ('mongoose');
const Schema = mongoose.Schema;
// for schema database
const grocery_listItem = Schema({
  _id:Schema.Types.ObjectId,
  name_grocery: String
});
const customer = Schema({
  _id:Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: Number,
  street: String,
  city: String,
  zip_code: Number,
  ips_id: Number,
  grocery_listItem_id:[{ type: Schema.Types.ObjectId, ref: 'Item' }],

});
const Item = mongoose.model('Item', grocery_listItem);
const admin = Schema({
_id: Schema.Types.ObjectId,
name: String,
});
const supplier = Schema({
  _id: Schema.Types.ObjectId,
  store_name: String,
})

