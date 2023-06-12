const { Response } = require("http-status-codez");
const GroceryService = require("../../services/groceryService");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
    createGroceryList: async (req, res) => {
      try {
        const groceries = await GroceryService.createGroceryList(req.body, res);
        if (groceries) {
          res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(groceries));
        } else {
          throw groceries;
        }
      } catch (error) {
        return res
          .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
          .json(new ErrorResponse(error));
      }
    },

    getGroceryList: async (req, res) => {
        try {
          const groceries = await GroceryService.getGroceryList(
            { userId: req.params.id }
          );
          console.log({groceries})
          if (groceries) {
            res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(groceries));
          } else {
            throw groceries;
          }
        } catch (error) {
          res
            .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
            .json(new ErrorResponse(error));
        }
      },

    };