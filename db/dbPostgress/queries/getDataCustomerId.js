const db_connection = require('../config/db_connection');
exports.getDataCustomerId = (customerId) => db_connection.query('SELECT listid FROM customer WHERE id = $1', [customerId]);



