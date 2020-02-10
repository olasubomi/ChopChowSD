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

const checkValideToken = (token) => {
  let conn; 
  try {
    const sql = {
      text: 'SELECT * FROM customer WHERE passwordtoken = $1',
      values: [token],
    };
    conn = dbconnection.query(sql);
   } catch(e) {
     console.log(e)
   }

  return conn;
};


 module.exports = { checkEmail, checkEmailUser, checkValideToken };
