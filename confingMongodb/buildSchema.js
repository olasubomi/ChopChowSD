const mongoose =  require ('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB_DEV_URL,  { useNewUrlParser: true })

//To check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('We are connected to the Mongo database :)');}
);

exports.grocery_listItem = mongoose.model('grocery_listItem', new Schema({
    _id: Schema.Types.ObjectId,
    name_grocery:String
}));

exports.customer = mongoose.model('customer', new Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: Number,
  street: String,
  city: String,
  zip_code: Number,
  ips_id: Number,
  grocery_listItem_id: [ String ],

}));

exports.admin = mongoose.model('admin', new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
}));
exports.supplier = mongoose.model('supplier', new Schema({
    _id: Schema.Types.ObjectId,
    store_name: String,
  }));