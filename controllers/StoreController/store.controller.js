const { Response } = require("http-status-codez");
const StoreService = require("../../services/storeService");
const UserService = require('../../services/UserService')
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createStore: async (req, res) => {
    try {
      req.body.store_owner = req.decoded.id;
      const store = await StoreService.createStore(req.body, req.files);
      const userId = req.user._id.toString();
      const user = await UserService.updateUserProfile({ _id: userId }, { user_type: "supplier" })
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
      let query = {}

      if (req.query?.userId) {
        query.store_owner = req.query?.userId
      } else {
        query._id = req.params.storeId
      }
      console.log('uqery', query)
      const store = await StoreService.getSinglStore(query, req);
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

  queryStore: async (req, res) => {
    try {

      const store = await StoreService.getAllStore(req.params.name, req);
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

  queryStoreByAddress: async (req, res) => {
    try {
      const store = await StoreService.getAllStoresByAddress(req.params.address, req.body);
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
