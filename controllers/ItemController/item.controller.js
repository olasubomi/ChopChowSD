const { Response } = require("http-status-codez");
const ItemService = require("../../services/itemServices");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createItem: async (req, res) => {
    try {
      const item = await ItemService.createItem(req.body, req.files, res);
      if (item) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(item));
      } else {
        throw item;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getAllItems: async (req, res) => {
    try {
      const items = await ItemService.getAllItems();
      if (items) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(items));
      } else {
        throw items;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getStoreItems: async (req, res) => {
    try {
      const storeItems = await ItemService.getAllStoreItems(
        {
          store_available: req.query.storeId,
        },
        res
      );
      if (storeItems) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(storeItems));
      } else {
        throw storeItems;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getUserItems: async (req, res) => {
    try {
      const userItems = await ItemService.getAllUserItems(
        {
          user: req.query.userId,
        },
        res
      );
      if (userItems) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(userItems));
      } else {
        throw userItems;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getCategoryItems: async (req, res) => {
    try {
      const categoryItems = await ItemService.getAllCategoryItems(
        {
          item_categories: req.query.categoryId,
        },
        res
      );
      if (categoryItems) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(categoryItems));
      } else {
        throw categoryItems;
      }
    } catch (error) {
      console.log(error);
    }
  },

  approveItems: async (req, res) => {
    try {
      const itemControl = await ItemService.updateAvailability(req.body, res);
      if (itemControl) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(itemControl));
      } else {
        throw itemControl;
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteItem: async (req, res) => {
    try {
      const body = { itemId: req.params.itemId }
      const itemDelete = await ItemService.deleteItem(body, res);
      if (itemDelete) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse("Item deleted Successfully!"));
      } else {
        throw itemDelete;
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment = await ItemService.updateComment(req.body, res);
      if (comment) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(comment));
      } else {
        throw comment;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
