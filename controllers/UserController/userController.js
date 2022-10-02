const { Response } = require("http-status-codez");
const UserService = require("../../services/UserService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await UserService().userSignup(req.body);
      if (user) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status(500 || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  signIn: async (req, res) => {
    try {
      const authenticateUser = await UserService().login(req.body);
      if (authenticateUser) {
        res
          .status(authenticateUser.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(authenticateUser));
      } else {
        throw authenticateUser;
      }
    } catch (error) {
      return res
        .status(Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const response = await UserService().forgotPassword(req.body);
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
      const response = await UserService().resetPassword(req.body);
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

  findUser: async (req, res) => {
    try {
      const user = await UserService().findSingleUser(req.params.id);
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
      const user = await UserService().findMultipleUser(
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


  getGroceryList: async (req, res) => {
    const { customerId } = req.params;
    let groceryListArray = [];
    try {
      const groceryList = await UserService.getGroceryList(customerId);
      if (groceryList) {
        res
          .status(error.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(groceryList));
      } else {
        throw groceryList;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
