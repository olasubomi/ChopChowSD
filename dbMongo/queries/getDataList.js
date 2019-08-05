let db = mongoose.connection;
const db_connection = require('../../dbPostgress/config/db_connection');
const {getDataCustomer} = require('../../dbPostgress/queries/getDataCustomer')
let customerResult = db_connection().query(getDataCustomer)
db.grocery_listItem.find({_id: customerResult.grocery_listItem_id});
