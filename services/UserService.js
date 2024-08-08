const {
  getCustomerGroceryList,
  findUser,
  findUsers,
  createUser,
  generateAccessTokens,
  validatePassWord,
  generatePasswordResetToken,
  updateUser,
  deleteUser,
  validateToken,
} = require("../repository");
const { signUpSchema, resetPasswordSchema } = require("../utils/validators");
const { requestNumber, } = require("../utils/authentication/vonage/requestNumber");
const { verifyNumber, } = require("../utils/authentication/vonage/verifyNumber");
const { cancelNumberVerification, } = require("../utils/authentication/vonage/cancelNumberVerification");
const { forgotPasswordEmail, signUpEmail, passwordResetEmail } = require("../utils/mailer/nodemailer");
const { generateRefreshTokens } = require("../repository/user");
const { User, notifications } = require("../db/dbMongo/config/db_buildSchema");
// const { nofication } = require("../controllers/UserController/userController");
const bcrypt = require('bcryptjs');
require('dotenv').config();

class UserService {
  static async userSignup(payload) {
    try {
      // validate input data with joi

      const validate = signUpSchema.validate(payload);

      if (validate.error) {
        throw {
          message: validate.error.details[0].message,

          path: validate.error.details[0].path[0],
        };
      }
      const userExist = await findUser({ email: payload.email });


      if (userExist) {
        throw {
          message: "User already exist",
        };
      }

      const newUser = await createUser(payload);
      console.log("newUser", newUser)
      const generatedToken = await generateAccessTokens({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });

      console.log("generated Token", generatedToken)

      // if (!Object.is(payload?.email_notifications, false)) {
      //   await signUpEmail(generatedToken, newUser);
      // }

      return {
        user: newUser,
        message: "User sucessfully registered"
      };
    } catch (error) {
      console.log("caught");
      throw error;
    }
  }

  static async deleteUserNotification(req) {
    console.log('ppp', req.decoded)
    try {
      await User.findByIdAndUpdate({ _id: req.decoded.id }, {
        $pull: { notifications: { $in: [req.params.id] } }
      })
      return await notifications.findByIdAndDelete({ _id: req.params.id })

    } catch (error) {
      throw error
    }
  }

  static async getUserNotification(req) {
    try {
      const user = await User.findById({ _id: req.decoded.id })
        .populate({
          path: "notifications",
          populate: {
            path: 'notifiable',

          }
        })
      return user.notifications
    } catch (error) {
      throw error
    }
  }

  static async updateUserNotification(req) {
    try {
      const user = await notifications.findByIdAndUpdate({
        _id: req.params.id
      }, {
        read: true
      })
      return user
    } catch (error) {
      throw error
    }
  }

  static async refreshToken(req) {
    try {
      const user = req.user;
      console.log(user, 'userrrrr=rr=')
      const generatedToken = await generateAccessTokens({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      const generatedRefreshToken = await generateRefreshTokens({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return {
        success: true,
        message: "User refreshed successfully",
        token: generatedToken,
        refreshToken: generatedRefreshToken,
      };
    } catch (e) {
      console.log('Refresh token error', e)
    }
  }

  static async login(payload_) {
    try {

      const payload = {
        ...payload_,
        withAuth: payload_.hasOwnProperty('withAuth') ? payload_.withAuth : true
      }
      const userExist = await findUser({ email: payload.email })
      console.log("line 144", userExist)
      console.log("line 144", payload)
      if (!userExist) {
        throw { message: "User does not exist" };
      }
      if (payload?.withAuth) {
        const validatePassword = await validatePassWord(
          payload.email,
          payload.password
        );
        if (!validatePassword) {
          throw { message: "Invalid user credentials" };
        }
      }
      if (userExist && !userExist.isVerified && payload?.withAuth) {

        throw { message: "User does not exist" };
      }
      const generatedToken = await generateAccessTokens({
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
      });

      const generatedRefreshToken = await generateRefreshTokens({
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
      });
      console.log({
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        token: generatedToken,

      }, 'refrehhhh')
      return {
        success: true,
        message: "Authentication successful!",
        token: generatedToken,
        refreshToken: generatedRefreshToken,
        user: userExist,
        isVerified: userExist.isVerified
      };
    } catch (error) {
      throw error;
    }
  }
  static async forgotPassword(payload) {
    try {
      const { email } = payload;
      // Check username as well when testing forgot password
      const userExists = await findUser({ email });
      if (!userExists) {
        throw { code: 401, message: "user does not exist" };
      }
      const generatePasswordToken = await generatePasswordResetToken({
        email: userExists.email,
        id: userExists._id,
      });
      //let resetLink = `https://${process.env.APP_HOST}/resetpass?token=${generatePasswordToken}&email=${userExists.email}`;
      let resetLink = `http://${process.env.APP_HOST}/resetpassword?token=${generatePasswordToken}&email=${userExists.email}`;
      forgotPasswordEmail(userExists.email, resetLink);
      return {
        msg: "Email with reset link has been sent to you.",
        done: true,
      };
    } catch (error) {
      throw error;
    }
  }


  static async resetPassword(payload) {
    try {

      const validatepayload = resetPasswordSchema.validate(payload);
      if (!validatepayload) {
        throw {
          message: validatepayload.error.details[0].message,

          path: validatepayload.error.details[0].path[0],
        };
      }
      const tokenExist = await findUser({
        "tokens.passwordResetToken": payload.token,
      });


      if (!tokenExist) {
        throw {
          message: "Token does not exist",
          code: 400,
        };
      }
      const decodeToken = await validateToken(payload.token);

      if (!decodeToken) {
        throw {
          message: "Token expired",
          code: 400,
        };
      }
      const newPassword = await tokenExist.hashPassword(payload.password);
      const resetPassword = await updateUser(
        { _id: decodeToken.id },
        {
          password: newPassword,
        }
      );
      if (!resetPassword) {
        throw {
          message: "password reset failed",
          code: 500,
        };
      }
      await passwordResetEmail(tokenExist.email)
      return { message: "password reset successful" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findSingleUser(id) {
    try {
      return await findUser({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  static async findMultipleUser(filter, page) {
    try {
      const users = await findUsers(filter, page);
      return {
        users,
        page,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateUserProfile(userId, payload) {
    try {
      return await updateUser(userId, payload);
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserProfile(userId) {
    try {
      return await deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  static async getGroceryList(userId) {
    try {
      const getGroceryList = await getCustomerGroceryList(userId);
      return getGroceryList;
    } catch (error) {
      throw error;
    }
  }

  static async emailVerification(payload) {
    try {
      const mess = "";
      console.log("verifyemailservice", payload)
      const validUser = await findUser({ _id: payload.userid });
      console.log("verifyemailservice", validUser)
      const validToken = validUser.tokens.emailValidationToken;

      const compareToken = bcrypt.compare(payload.token, validToken)
      console.log("verifyemailservicecomparetoken", compareToken)
      if (compareToken) {
        if (validUser._id) {
          if (!validUser.is_verified) {
            const { expiresAt } = validUser
            if (expiresAt < Date.now() || validToken) {
              updateUser({ _id: validUser._id }, { is_verified: true })

            } else {
              mess = "Link has expired, please signup again";
              await deleteUser({ _id: validUser._id })
              throw {
                message: mess
              }

            }
          } else {
            throw {
              message: "User has been verified. Please Login"
            };
          }
        } else {
          await deleteUser({ _id: validUser._id })
          throw {
            message: "User Account record doesn't exist "
          };
        }

      } else {
        await deleteUser({ _id: validUser._id })
        throw {

          message: "Invalid access token, Sign up"
        };
      }

      const confirmedUser = await findUser({ _id: validUser._id });
      console.log("verify confirmedUser", confirmedUser)
      const generatedToken = await generateAccessTokens({
        id: confirmedUser._id,
        username: confirmedUser.username,
        email: confirmedUser.email,
      });


      return {
        user: confirmedUser,
        token: generatedToken,
        message: confirmedUser.is_verified ? "User sucessfully registered" : "Verification link sent",
      };
    } catch (error) {
      console.log("caught");
      throw error;
    }
  }

  static async requestNumber(req, res) {
    try {
      // confirm request edge cases,
      return await requestNumber(req, res);
    } catch (e) {
      console.log('Failed to send phone verification text', e)
    }
  }

  static async verifyNumber(req, res, next) {
    try {
      // confirm verification edge cases,
      const result = await verifyNumber(req, res, next);
      console.log('result', result)

      if (result) {

        const user = await findUser({ email: result.email });
        if (!user) throw { message: "User not found" };

        await updateUser(
          { _id: user.id },

          {
            $set: {
              phone_number_verified: true,
              isVerified: true
            }


          }
        );
        // const generatedToken = await generateAccessTokens({
        //   id: user._id,
        //   username: user.username,
        //   email: user.email,
        // });

        // const generatedRefreshToken = await generateRefreshTokens({
        //   id: user._id,
        //   username: user.username,
        //   email: user.email,
        // });
        return {
          success: true,
          message: "Authentication successful!",
          // token: generatedToken,
          // refreshToken: generatedRefreshToken,
          request: result,
          user: user,
        };
      }

      throw { message: "user verification failed" };
    } catch (e) {
      throw e;
    }
  }

  static async sendEmailOTP(email) {
    try {
      // confirm verification edge cases,
      const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      const user = await findUser({ email });

      const email_token = await bcrypt.hash(otp.toString(), 10)
      if (!user) throw { message: "User not found" };
      await updateUser(
        { _id: user.id },
        {
          email_token,
        }
      );


      console.log('req.body.email', otp.toString(), email)

      await signUpEmail(otp.toString(), user);
      return;
    } catch (e) {
      throw e;
    }
  }
  static async verifyEmailOTP(email, otp) {
    try {
      // confirm verification edge cases, 
      const user = await findUser({ email });

      if (!user) throw { message: "User not found" };

      const compareToken = await bcrypt.compare(otp, user.email_token)
      console.log('compareToken', compareToken)
      if (compareToken) {
        await updateUser(
          { _id: user.id },
          {
            $set: {
              email_verified: true,
              isVerified: true
            }



          }
        );
        // const generatedToken = await generateAccessTokens({
        //   id: user._id,
        //   username: user.username,
        //   email: user.email,
        // });

        // const generatedRefreshToken = await generateRefreshTokens({
        //   id: user._id,
        //   username: user.username,
        //   email: user.email,
        // });
        return {
          success: true,
          message: "Authentication successful!",
          // token: generatedToken,
          // refreshToken: generatedRefreshToken,
          user: user,
        };
      }
      throw { message: "Incorrect OTP" };

    } catch (e) {
      throw e
    }
  }


  static async cancelNumberVerification(req, res) {
    try {
      // confirm cancellation edge cases,
      return await cancelNumberVerification(req, res);
    } catch (e) {
      console.log('Failed to cancel phone verification', e)
    }
  }


  static async confirmAccount(payload) {
    try {
      console.log("confirmAccount", payload)
      const user = await findUser({ email: payload.email });
      console.log("confirmAccount", user)
      if (user && user.isVerified) {
        console.log(user.isVerified)
        return {
          user: user,
          message: "user has been verified successfully"
        }
      } else {
        return {
          message: "user not verified"
        }
      }


    } catch (e) {
      console.log('Failed to cancel phone verification', e)
    }
  }


}




module.exports = UserService;













  // static async forgotPassword(payload) {
  //   try {
  //     const { email } = payload;
  //     // Check username as well when testing forgot password
  //     const userExists = await findUser({ email });
  //     if (!userExists) {
  //       throw { code: 401, message: "user does not exist" };
  //     }
  //     const generatePasswordToken = await generatePasswordResetToken({
  //       email: userExists.email,
  //       id: userExists._id,
  //     });
  //     let resetLink = `https://${process.env.APP_HOST}/resetpass?token=${generatePasswordToken}`;
  //     forgotPasswordEmail(userExists.email, resetLink);
  //     return {
  //       msg: "Email with reset link has been sent to you.",
  //       done: true,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }