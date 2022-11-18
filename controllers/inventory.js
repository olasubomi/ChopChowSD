const { Response } = require("http-status-codez");
const InventoryService = require("../services/inventoryService");

const { ErrorResponse, SuccessResponse } = require("../lib/appResponse");

module.exports = {
  getInventories: async (req, res) => {
    try {
      const inventories = await InventoryService.getInventories(
        req.params.page,
        req.query || {}
      );
      if (inventories) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(inventories));
      } else {
        throw inventories;
      }
    } catch (error) {
      return res.json(new ErrorResponse(error));
    }
  },

  getInventory: async (req, res) => {
    try {
      const inventory = await InventoryService.getInventory(
        {_id:req?.params?.inventoryId}
      );
      if (inventory) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(inventory));
      } else {
        throw inventory;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  createInventory: async (req, res) => {
    try {
      console.log({ payload: req.body });
      const inventory = await InventoryService.createInventory(req.body);
      if (inventory) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(inventory));
      } else {
        throw inventory;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteInventory: async (req, res) => {
    try {
      const removeInventory = await InventoryService.deleteInventory(
        req.params.inventoryId
      );
      if (removeInventory) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(removeInventory));
      } else {
        throw removeInventory;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateInventory: async (req, res) => {
    try {
      const updatedInventory = await InventoryService.updateInventory(
        { _id: req.params.inventoryId } || req.query,
        req.body
      );
      if (updatedInventory) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(updatedInventory));
      } else {
        throw updatedInventory;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
