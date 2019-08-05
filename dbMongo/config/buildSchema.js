const mongoose =  require ('mongoose');
// const Schema = mongoose.Schema;

// // for connection database
// mongoose.set('debug', true);
// mongoose.Promise = require('bluebird');
// mongoose.connect(process.env.DB_DEV_URL,  { useNewUrlParser: true })

//  //To check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('We are connected to the Mongo database :)');}
);

// for schema database
exports.grocery_listItem = Schema({
  _id:Schema.Types.ObjectId,
  name_grocery: String
});
// exports.customer = Schema({
//   _id:Schema.Types.ObjectId,
//   first_name: String,
//   last_name: String,
//   email: String,
//   phone_number: Number,
//   street: String,
//   city: String,
//   zip_code: Number,
//   ips_id: Number,
//   grocery_listItem_id:[{ type: Schema.Types.ObjectId, ref: 'Item' }],

// });
// const Item = mongoose.model('Item', grocery_listItem);
// const admin = Schema({
// _id: Schema.Types.ObjectId,
// name: String,
// });
// exports.supplier = Schema({
//   _id: Schema.Types.ObjectId,
//   store_name: String,
// })



 