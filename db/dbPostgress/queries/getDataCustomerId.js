const db_connection = require('../config/db_connection');
exports.getDataCustomerId = (customerId) => db_connection.query('SELECT list_id FROM customer_list WHERE customer_id = $1', [customerId]);



