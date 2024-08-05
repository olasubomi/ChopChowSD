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

  addNewItemToGroceryList: async (req, res) => {
    try {
      const groceries = await GroceryService.AddNewItemToGroceryList(req.body, res);
      console.log('grocery', groceries)
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

  addNewJsonDataItemToGroceryList: async (req, res) => {
    try {
      const groceries = await GroceryService.AddNewJsonItemToGroceryList(req.body, res);
      console.log('grocery', groceries)
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

  addNewMeasurementToGroceryList: async (req, res) => {
    try {
      const groceries = await GroceryService.AddNewMeasurementToGroceryList(req.body, res);
      console.log('grocery', groceries)
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

  addNewOtherToGroceryList: async (req, res) => {
    try {

      const payload = {
        ...req.body,
        item_image: req.file.location
      }
      const groceries = await GroceryService.AddNewOtherToGroceryList(payload, res);
      console.log('grocery', groceries)
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
      console.log({ groceries })
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

  createNewGroceryList: async (req, res) => {
    try {
      const groceryList = await GroceryService.AddNewGroceryList(
        req.body,
        req,
        res
      )
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse({
          message: "Grocery List created Successfully",
          status: 200
        }));
      } else {
        throw groceryList;
      }
    } catch (error) {
      console.log('error', error)
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getAllGroceryListForAUser: async (req, res) => {
    try {
      const groceryList = await GroceryService.getAllGroceryList(
        req,
      )
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse({
          message: "All Grocery List",
          status: 200,
          data: groceryList
        }));
      } else {
        throw groceryList;
      }
    } catch (error) {
      console.log('error', error)
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getOneGroceryList: async (req, res) => {
    try {
      const groceryList = await GroceryService.getOneGroceryList(
        req.params.id,
        req.decoded.id
      )
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse({
          message: "One Grocery List",
          status: 200,
          data: groceryList
        }));
      } else {
        throw 'Error getting grocery';
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  removeItemFromGroceryList: async (req, res) => {
    try {
      const groceryList = await GroceryService.removeAnItemFromGrocery({
        groceryListId: req.params.groceryListId,
        groceryItemId: req.params.groceryItemId
      })
      console.log('groceryList', groceryList)
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse({
          message: "Remove successful",
          status: 200,
        }));
      } else {
        throw 'Error getting grocery';
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateGrocery: async (req, res) => {
    try {
      const groceryList = await GroceryService.updateGroceryList(
        req.params.id,
        req.body
      )
      console.log('groceryList', groceryList)
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(groceryList));
      } else {
        throw 'Error updating grocery';
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteGrocery: async (req, res) => {
    try {
      const groceryList = await GroceryService.deleteOneGroceryList(
        req.params.id,
      )
      console.log('groceryList', groceryList)
      if (groceryList) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse({
          message: "Delete successful",
          status: 200,
        }));
      } else {
        throw 'Error updating grocery';
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  }


};