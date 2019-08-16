const dbconnection = require('../../config/db_connection');

 const checkEmail = (email) => {
  const sql = {
    text: 'SELECT * FROM customer WHERE email = $1',
    values: [email],
  };
  return dbconnection.query(sql);
};

 module.exports = { checkEmail };
