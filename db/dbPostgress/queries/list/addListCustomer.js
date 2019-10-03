const dbconnection = require('../../config/db_connection');

exports.addListCustomer = ( idItem,customerId) => {
  const sql = {
    text: 'INSERT INTO customer_list (list_id,customer_id) VALUES ($1,$2) ',
    values: [idItem,customerId],
  };
  return dbconnection.query(sql);
};
