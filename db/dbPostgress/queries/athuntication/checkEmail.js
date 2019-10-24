const dbconnection = require('../../config/db_connection');

 const checkEmail = (email) => {
  let conn; 
  try {
    const sql = {
      text: 'SELECT * FROM customer WHERE email = $1',
      values: [email],
    };
    conn = dbconnection.query(sql);
   } catch(e) {
     debugger
     console.log("ok")
   }

  return conn;
};

const checkEmailUser = (email) => {
  let conn; 
  try {
    const sql = {
      text: 'SELECT * FROM customer WHERE email = $1',
      values: [email],
    };
    conn = dbconnection.query(sql);
   } catch(e) {
     debugger
     console.log("ok")
   }

  return conn;
};

 module.exports = { checkEmail, checkEmailUser };
