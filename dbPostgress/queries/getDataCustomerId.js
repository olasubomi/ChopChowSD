const db_connection = require('../config/db_connection');
exports.getDataCustomerId = (listid) => db_connection.query('SELECT * FROM customer WHERE listid = $1', [listid]);



