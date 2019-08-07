const db_connection = require('../config/db_connection');
exports.getDataCustomer = () => db_connection.query('SELECT * FROM customer');


