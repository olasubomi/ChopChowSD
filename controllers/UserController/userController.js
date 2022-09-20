const { Response } = require('http-status-codez');
const UserService = require('../../services/UserService');


const {
  ErrorResponse,
  SuccessResponse,
} = require('../../lib/appResponse');

module.exports = {
  signUp: async (req, res) => {
    try {
      const User = await new UserService().userSignup(req.body);
      console.log(user)
      if (user) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status(500 ||  Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  signIn: async (req, res) => {
    try {
      const user = await new UserService().login(req.body);
      if (user) {
        res
          .status(error.code || Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(user));
      } else {
        throw user;
      }
    } catch (error) {
      return res
        .status( Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const response = await new UserService().forgotPassword(req.body);
      if (response) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(response));
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
      const response = await new UserService().resetPassword(req.body);
      if (response) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(response));
      } else {
        throw response;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
          .json(new ErrorResponse(error));
    }
  },

  getGroceryList: async (req,res)=>{
    const { userId } = req.params;
    let groceryListArray = [];
    try {
      const groceryList = await new UserService.getGroceryList(userId)
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
  }

};
