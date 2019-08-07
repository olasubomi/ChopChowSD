const db_connection = require('../config/db_connection');
exports.getDataCustomerId = (grocery_listitem_id) => db_connection.query('SELECT * FROM customer WHERE grocery_listitem_id = $1', [grocery_listitem_id]);



