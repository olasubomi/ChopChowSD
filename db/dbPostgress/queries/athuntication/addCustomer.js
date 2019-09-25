const db_connection = require('../../config/db_connection');

const addCustomer = ({ firstname,lastname, email ,password , phoneNumber , street,city,zipCode,ipsid} ) => {
  const sql = {
    text: 'INSERT INTO customer(firstname, lastname, email , password ,phoneNumber,street,city, zipCode,ipsid) VALUES ( $1, $2, $3 ,$4,$5,$6,$7,$8,$9) RETURNING *',
    values: [firstname, lastname, email,password,phoneNumber,street,city,zipCode,ipsid],
  };
  return db_connection.query(sql);
};

module.exports = { addCustomer };
