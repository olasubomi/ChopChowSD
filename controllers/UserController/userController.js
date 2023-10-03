const { Response } = require("http-status-codez");
const UserService = require("../../services/UserService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");


module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await UserService.userSignup(req.body);
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
      const user = await UserService.deleteUserProfile(req.params.id);
      if (userDeleted) {
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
  }
};
