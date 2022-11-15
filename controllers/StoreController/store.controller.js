const { Response } = require("http-status-codez");
const StoreService = require("../../services/storeService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createStore: async (req, res) => {
    try {
      req.body.store_owner = req.decoded.id;
      const store = await StoreService.createStore(req.body, req.files);
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateStore: async (req, res) => {
    try {
      const store = await StoreService.updateStore(
        { _id: req.params.storeId, ...req.query },
        req.body,
        req.files || req.file || null
      );
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getStores: async (req, res) => {
    try {
      const store = await StoreService.getStores(req.params.page, req.query);
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getStore: async (req, res) => {
    try {
      const store = await StoreService.getSinglStore({
        _id: req.params.storeId,
      });
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteStore: async (req, res) => {
    try {
      const store = await StoreService.removeStore(req.params.StoreId);
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
