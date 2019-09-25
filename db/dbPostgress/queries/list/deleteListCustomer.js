const dbconnection = require('../../config/db_connection');

exports.deleteListCustomer = (customerId, idItem) => {
  const sql = {
    text: 'DELETE FROM customer_list WHERE customer_id = $1 AND list_id = $2 RETURNING * ',
    values: [customerId, idItem],
  };
  return dbconnection.query(sql);
};
