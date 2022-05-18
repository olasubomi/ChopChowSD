const { getHashPassword } = require("../lib/hashPassword");
const { signUpSchema, resetPasswordSchema, } = require("../utils/validators");
const {
  createCustomer,
  updateCustomerPasswordToken,
  resetCustomerPassword,
  deleteCustomerUsingEmail,
  getCustomerGroceryList
} = require("../repository");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");

const {
  customer_grocery_list,
} = require("../db/dbMongo/config/db_buildSchema");
const { signUpEmail, forgotPasswordEmail } = require("../mailer/nodemailer");
const {
  checkEmailUser,
  checkEmail_customer,
  checkValideToken,
} = require("../db/dbPostgress/queries/authentication/checkEmail");

class CustomerService {
  async customerSignup(payload) {
    try {
      //validate input data with joi
      const validate = signUpSchema.validate(payload);
      //check for errors after data validation
      const checkError = validate.error && {
        error: validate.error.details[0].message,
        code: 400,
      };
      //if validation error throw said error
      if (!checkError) {
        //check if email already exixts
        const emailExists = await checkEmailUser(payload.email);
        if (!emailExists[0]) {
          //hash user password
          const hashedPassword = await getHashPassword(payload.password);
          //create customer entity
          const customer = await createCustomer({
            ...payload,
            password: hashedPassword,
            phonenumber: parseInt(payload.phonenumber),
          });
          //create grocerylist
          const groceryList = await customer_grocery_list.create({
            list_id: customer.rows._id,
            grocery_list: [],
          });
          if (groceryList && customer) {
            //send signup email
            signUpEmail(payload.email);
            return JSON.stringify({
              msg: "User signed up successfully",
              done: true,
            });
          }
        } else {
          //throw error if email is already in use
          throw { code: "401", message: "email is already in use" };
        }
      } else {
        throw checkError;
      }
    } catch (error) {
      const customerCreated = await checkEmailUser(payload.email);
      if(error.message !=="email is already in use" && customerCreated[0]){
        deleteCustomerUsingEmail(payload.email)
        throw error;
      }
      throw error;
    }
  }

  async login(payload) {
    const emailExists = await checkEmail_customer(payload.email);
    try {
      if (emailExists.rows[0]) {
        const validatePassword = await bcrypt.compare(
          payload.password,
          emailExists.rows[0].password
        );

        const userInfo = {
          id: emailExists.rows[0].id,
          username: emailExists.rows[0].username,
          email: emailExists.rows[0].email,
        };
        const generatedToken = await sign(userInfo, process.env.SECRET, {
          expiresIn: "1h",
        });
        return {
          success: true,
          message: "Authentication successful!",
          token: generatedToken,
          customerID: emailExists.rows[0].id,
          role: "customer",
        };
      } else {
        throw { code: 401, message: "invalid user email" };
      }
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(payload) {
    try {
      const { email } = payload;
      // Check username as well when testing forgot password
      const userExists = await checkEmailUser(email);
      if (!userExists[0]) {
        throw { code: 401, message: "customer does not exist" };
      }
      let token = crypto.randomBytes(20).toString("hex");
      const updateCustomerToken = await updateCustomerPasswordToken(
        userExists[0].id,
        token
      );
      if (!updateCustomerToken.rows[0]) {
        throw { code: 401, message: "password reset operation failed" };
      }
      let resetLink =
        process.env.APP_HOST +
        "/resetpass?token=" +
        updateCustomerToken.rows[0].passwordtoken;

      forgotPasswordEmail(userExists[0].email, resetLink);
      return {
        msg: "Email with reset link has been sent to you.",
        done: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(payload) {
    const validate = resetPasswordSchema.validate(payload)
    if (validate.error) {
      throw ({
        message: validate.error.details[0].message,
        code: 400,
      })
    }
    const validateToken = await checkValideToken(payload.token)
    if (!validateToken.rows[0]) {
      throw ({
        message: "Invalid reset token provided",
        code: 400,
      })
    }
    
    const hashedPassword = await getHashPassword(payload.password1);
    const resetPassword = await resetCustomerPassword(validateToken.rows[0].id, hashedPassword)
    if(resetPassword.rows[0]){
      throw ({
        message: "operation failed",  
        code: 401,
      })
    }
      return {message:"password reset successful" }
  }

  async getGroceryList(customerId){
    try{
      const getGroceryList = await getCustomerGroceryList(customerId)
      return getGroceryList
    }catch(error){
    throw error
    }
  }
}

module.exports = CustomerService;
