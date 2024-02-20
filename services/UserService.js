const { signUpSchema, resetPasswordSchema } = require("../utils/validators");
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

const { forgotPasswordEmail } = require("../mailer/nodemailer");
const { generateRefreshTokens } = require("../repository/user");
const { User, notifications } = require("../db/dbMongo/config/db_buildSchema");
const { nofication } = require("../controllers/UserController/userController");

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

      const generatedToken = await generateAccessTokens({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });

      return {
        user: newUser,
        token: generatedToken,
        message: "User sucessfully registered",
      };
    } catch (error) {
      console.log("caught");
      throw error;
    }
  }

  static async deleteUserNotification(req) {
    console.log('ppp', req.params)
    try {
      await User.findByIdAndUpdate({ _id: req.decoded.id }, {
        $pull: { notifications: { $in: [req.params.id] } }
      })
      return await notifications.findByIdAndDelete({ _id: req.params.id })

    } catch (error) {
      throw error
    }
  }

  static async refreshToken(req) {
    try {
      const user = req.user;
      const generatedToken = await generateAccessTokens({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      const generatedRefreshToken = await generateRefreshTokens({
        id: user._id,
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

  static async login(payload) {
    try {

      const userExist = await findUser({ email: payload.email })

      if (!userExist) {
        throw { message: "User does not exist" };
      }
      const validatePassword = await validatePassWord(
        payload.email,
        payload.password
      );
      if (!validatePassword) {
        throw { message: "Invalid user credentials" };
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

      return {
        success: true,
        message: "Authentication successful!",
        token: generatedToken,
        refreshToken: generatedRefreshToken,
        user: userExist,
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
      let resetLink = `https://${process.env.APP_HOST}/resetpass?token=${generatePasswordToken}`;
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
      console.log(tokenExist);

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
      const newPassword = await tokenExist.hashPassword(payload.password1);
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


}

module.exports = UserService;
