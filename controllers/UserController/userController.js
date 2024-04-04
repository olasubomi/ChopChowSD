const UserService = require("../../services/UserService");
const { Response } = require("http-status-codez");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");


module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await UserService.userSignup(req.body);
      console.log("verified email", user.user.is_verified)
      if (user.user.is_verified) {
        return res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(user).recordCreated());
      } else {
        return res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(user).recordCreated());
      }
    } catch (error) {
      console.log(error);
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  signIn: async (req, res) => {
    try {
      console.log(req.body);
      const authenticateUser = await UserService.login(req.body);
      if (authenticateUser) {
        res
          .status(authenticateUser.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(authenticateUser));
      } else {
        throw authenticateUser;
      }
    } catch (error) {
      console.log({ error });
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },


  manageNotification: async (req, res) => {
    try {
      console.log(req.params);
      const notification = await UserService.deleteUserNotification(req);
      if (notification) {
        res
          .status(notification.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(notification));
      } else {
        throw notification;
      }
    } catch (error) {
      console.log({ error });
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  userNotification: async (req, res) => {
    try {
      console.log(req.params);
      const notification = await UserService.getUserNotification(req);
      if (notification) {
        res
          .status(notification.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(notification));
      } else {
        throw notification;
      }
    } catch (error) {
      console.log({ error });
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateNotification: async (req, res) => {
    try {
      console.log(req.params);
      const notification = await UserService.updateUserNotification(req);
      if (notification) {
        res
          .status(notification.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(notification));
      } else {
        throw notification;
      }
    } catch (error) {
      console.log({ error });
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  refreshToken: async (req, res) => {
    try {
      console.log(req.decoded, 'decodedd');
      const authenticateUser = await UserService.refreshToken(req);
      if (authenticateUser) {
        res
          .status(authenticateUser.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(authenticateUser));
      } else {
        throw authenticateUser;
      }
    } catch (error) {
      console.log({ error });
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const response = await UserService.forgotPassword(req.body);
      if (response) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(response));
      } else {
        throw response;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  resetPassword: async (req, res) => {
    try {
      const response = await UserService.resetPassword(req.body);
      if (response) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(response));
      } else {
        throw response;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  inviteUser: async (req, res) => {
    return res.status(200);
  },

  addNotification: async (req, res) => {
    return res.status(200);
  },

  findUser: async (req, res) => {
    try {
      const user = await UserService.findSingleUser(req.params.id);
      if (user) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  findUsers: async (req, res) => {
    try {
      const user = await UserService.findMultipleUser(
        req.query || {},
        req.params.page
      );
      if (user) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const updatedProfile = await UserService.updateUserProfile(
        { _id: req.params.userId },
        req.body
      );
      if (updatedProfile) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(updatedProfile));
      } else {
        throw updatedProfile;
      }
    } catch (error) {
      console.log(error);
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteUserProfile: async (req, res) => {
    try {
      console.log("comes in here");
      const user = await UserService.deleteUserProfile(req.params.id);
      if (user) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(user));
        console.log("passes");

      } else {
        console.log("fails");

        throw user;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getGroceryList: async (req, res) => {
    const { userId } = req.params;
    try {
      const groceryList = await UserService.getGroceryList(userId);
      if (groceryList) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(groceryList));
      } else {
        throw groceryList;
      }
    } catch (error) {
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  verifyToken: async (req, res) => {
    try {
      const user = req.decoded;
      if (user) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getCartList: async (req, res) => {
    return res.status(200);
  },

  findStoreAdmins: async (req, res) => {
    return res.status(200);
  },

  getAppAdmins: async (req, res) => {
    return res.status(200);
  },

  updateNotificiations: async (req, res) => {
    return res.status(200);
  },

  updateCartList: async (req, res) => {
    return res.status(200);
  },

  updateGrocerySuggestionsList: async (req, res) => {
    return res.status(200);
  },
  //Email Verification
  verifyEmail: async (req, res) => {
    try {
      console.log("verifyemailcontroller", req.body)
      const user = await UserService.emailVerification(req.body);
      console.log("verifyemailcontroller", user)
      if (user) {
        return res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(user).recordCreated());
      } else {

        throw user;
      }
    } catch (error) {
      console.log(error);
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  //
  sendEmailOTP: async (req, res) => {
    try {
      return await UserService.sendEmailOTP(req.body.email);
    } catch (error) {
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
  verifyEmailOTP: async (req, res) => {
    try {
      return await UserService.verifyEmailOTP(req.body.email, req.body.otp);
    } catch (error) {
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
  requestNumber: async (req, res) => {
    try {
      console.log("reading req body in controller", req.body)
      console.log(req.body);
      return await UserService.requestNumber(req, res);
    } catch (error) {
      console.log("Error with calling request service");
      console.log(error);
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  //
  verifyNumber: async (req, res, next) => {
    try {
      console.log("verify req body", req.body)
      return await UserService.verifyNumber(req, res, next);
    }
    catch (error) {
      console.log(error);
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },


  //
  cancelNumberVerification: async (req, res) => {
    try {
      console.log("verify req body", req.body)
      return await UserService.cancelNumberVerification(req, res);
      // if (cancelled) {
      //   return res
      //     .status(Response.HTTP_ACCEPTED)
      //     .json(new SuccessResponse(cancelled).recordCreated());
      // } else {
      //   throw cancelled;
      // }
    } catch (error) {
      console.log(error);
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  }


};
