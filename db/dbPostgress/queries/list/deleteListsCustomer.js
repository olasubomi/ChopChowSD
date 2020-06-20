const dbconnection = require('../../config/db_connection');

exports.deleteListsCustomer = (customerId) => {
  const sql = {
    text: 'DELETE FROM customer_list WHERE customer_id = $1  RETURNING * ',
    values: [customerId],
  };
  return dbconnection.query(sql);
};
