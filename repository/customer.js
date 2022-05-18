const db_connection = require('../db/dbPostgress/config/db_connection')
const { customer_grocery_list,all_products  } = require('../db/dbMongo/config/db_buildSchema')

const createCustomer = async(payload)=>{
 const   {firstname,lastname, email, phonenumber, username, password, emailnotification} = payload
    let sql = {
        text: "insert into customer (firstname,lastname, email, phonenumber, username, password, emailnotification) values($1, $2, $3, $4, $5 , $6, $7) RETURNING id",
        values: [firstname, lastname, email, phonenumber, username, password, emailnotification],
      }
const customer = await db_connection.query(sql)
return customer
}

const updateCustomerPasswordToken = async(id, token)=>{
    let sql = {
        text: "UPDATE customer SET passwordtoken=$1 WHERE id=$2 RETURNING passwordtoken",
        values: [token, id]
      };
      const updateToken = await db_connection.query(sql)
      return updateToken;
}

const resetCustomerPassword = async(id,password)=>{
              let sql = {
                  text: `UPDATE customer set password=$1, passwordtoken='' where id=$2`,
                  values: [password,id],
                };
      const updatePassword= await db_connection.query(sql)
      return updatePassword;
}


const deleteCustomerUsingEmail = async(email)=>{
    const newSql ={ text:`DELETE FROM customer WHERE email = $1`,
          values: [email]
  }

const deleteCustomer= await db_connection.query(newSql)
return deleteCustomer;
}

const getCustomerGroceryList =  async(customerId)=>{
  try{
    const grocery =  await  customer_grocery_list
    .find({ list_id: customerId });
     const  groceryLists  =  await all_products.find({ id: { $in: grocery[0].grocery_list } });
     return groceryLists
  }catch(error){
    console.log(error)
    throw {message:error.message || 'get customer grocerylist operation failed', code:error.code || 500}
  }
}



module.exports={
    createCustomer,
    updateCustomerPasswordToken,
    resetCustomerPassword,
    deleteCustomerUsingEmail,
    getCustomerGroceryList
}
