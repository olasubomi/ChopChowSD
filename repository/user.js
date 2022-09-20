const db_connection = require('../db/dbPostgress/config/db_connection')
const { grocery_list,all_products  } = require('../db/dbMongo/config/db_buildSchema')

const createUser = async(payload)=>{
 const   {firstname,lastname, email, phonenumber, username, password, emailnotification} = payload
    let sql = {
        text: "insert into user (firstname,lastname, email, phonenumber, username, password, emailnotification) values($1, $2, $3, $4, $5 , $6, $7) RETURNING id",
        values: [firstname, lastname, email, phonenumber, username, password, emailnotification],
      }
const user = await db_connection.query(sql)
return user
}

const updateUserPasswordToken = async(id, token)=>{
    let sql = {
        text: "UPDATE user SET passwordtoken=$1 WHERE id=$2 RETURNING passwordtoken",
        values: [token, id]
      };
      const updateToken = await db_connection.query(sql)
      return updateToken;
}

const resetUserPassword = async(id,password)=>{
              let sql = {
                  text: `UPDATE user set password=$1, passwordtoken='' where id=$2`,
                  values: [password,id],
                };
      const updatePassword= await db_connection.query(sql)
      return updatePassword;
}


const deleteUserUsingEmail = async(email)=>{
    const newSql ={ text:`DELETE FROM user WHERE email = $1`,
          values: [email]
  }

const deleteUser= await db_connection.query(newSql)
return deleteUser;
}

const getUserGroceryList =  async(userId)=>{
  try{
    const grocery =  await  grocery_list
    .find({ list_id: userId });
     const  groceryLists  =  await all_products.find({ id: { $in: grocery[0].grocery_list } });
     return groceryLists
  }catch(error){
    console.log(error)
    throw {message:error.message || 'get user grocerylist operation failed', code:error.code || 500}
  }
}



module.exports={
    createUser,
    updateUserPasswordToken,
    resetUserPassword,
    deleteUserUsingEmail,
    getUserGroceryList
}
