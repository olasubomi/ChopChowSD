const dbconnection = require('../../config/db_connection');

const checkEmail_customer = (email) => {
  let conn; 
  try {
    console.log("Attempts to query database");
    const sql = {
      text: 'SELECT * FROM customer WHERE email = $1',
      values: [email],
    };
    conn = dbconnection.query(sql);
    console.log(conn);
   } catch(e) {
    console.log("fails to find email for customer ")
    //  debugger
    //  console.log("fails to find email for customer ")
   }

  return conn;
};


const checkEmail_admin = (email) => {
  let conn; 
  try {
    console.log("Attempts to query database");
    const sql = {
      text: 'SELECT * FROM admin WHERE email = $1',
      values: [email],
    };
    conn = dbconnection.query(sql);
    console.log(conn);
   } catch(e) {
    console.log("fails to find email for customer ")
    //  debugger
    //  console.log("fails to find email for customer ")
   }

  return conn;
};


const checkEmail_supplier = (email) => {
  let conn; 
  try {
    console.log("Attempts to query database");
    const sql = {
      text: 'SELECT * FROM supplier WHERE email = $1',
      values: [email],
    };
    conn = dbconnection.query(sql);
    console.log(conn);
   } catch(e) {
    console.log("fails to find email for customer ")
    //  debugger
    //  console.log("fails to find email for customer ")
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

//  const checkEmail = (email) => {
//   let conn; 
//   try {
//     console.log("Attempts to query database");
//     const sql = {
//       text: 'SELECT * FROM customer WHERE email = $1',
//       values: [email],
//     };
//     conn = dbconnection.query(sql);    
//     console.log(conn);
//    } catch(e) {
//     console.log("fails to find email for customer ")
//     //  debugger
//     //  console.log("fails to find email for customer ")
//    }

//   return conn;
// };

 module.exports = { checkEmail_admin, checkEmail_customer,checkEmail_supplier, checkEmailUser, checkValideToken };
