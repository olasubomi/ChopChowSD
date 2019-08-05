const db_connection = require('../config/db_connection');
const getCustomer = (grocery_listItem_id) => db_connection.query('SELECT * FROM customer WHERE grocery_listItem_id = $1', [grocery_listItem_id]);
module.exports= {getCustomer};
