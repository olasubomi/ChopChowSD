const db_connection = require('../../config/db_connection');

const addCustomer = ({ firstname,lastname, email ,password , phoneNumber , street,city,zipCode,ipsid,username, emailNotification} ) => {
  const sql = {
    text: 'INSERT INTO customer(firstname, lastname, email , password ,phoneNumber,street,city, zipCode,ipsid,username, emailNotification) VALUES ( $1, $2, $3 ,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
    values: [firstname, lastname, email,password,phoneNumber,street,city,zipCode,ipsid,username, emailNotification],
  };
  return db_connection.query(sql);
};

module.exports = { addCustomer };
