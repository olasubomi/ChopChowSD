const { pickSafeStoreUpdate } = require("../../services/safeManagementUpdates");
const { isPlatformAdmin } = require("../../services/storeAccess");
const { Response } = require("http-status-codez");
const StoreService = require("../../services/storeService");
const UserService = require('../../services/UserService')
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createStore: async (req, res) => {
    try {
      // A customer cannot create a store on behalf of another account.
      // Only an authenticated platform admin may designate a different owner.
      const requestedOwner = req.body.store_owner;
      const owner = isPlatformAdmin(req.user) && requestedOwner
        ? requestedOwner : req.user._id.toString();
      const payload = { ...req.body, store_owner: owner };
      delete payload.store_admin;
      delete payload.store_admins;
      delete payload.store_sub_admins;
      delete payload.store_account_users;
      delete payload.inventory;
      delete payload.status;
      const store = await StoreService.createStore(payload, req.files);
      const userId = req.user._id.toString();
      // const user = await UserService.updateUserProfile({ _id: userId }, { user_type: "supplier" })
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
      // Allow only profile fields; privileged owner/admin/status changes must
      // go through separately authorized operations, never mass assignment.
      const payload = pickSafeStoreUpdate(req.body);
      const store = await StoreService.updateStore(
        { _id: req.params.storeId },
        payload,
        req.files || req.file || null
      );
      if (store) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(store));
      } else {
        throw store;
      }
    } catch (error) {
      return res
        .status((error && error.code) || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  claimStore: async (req, res) => {
    try {
      const store = await StoreService.claimStore(
        { _id: req.params.id },
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

  removeUserFromStore: async (req, res) => {
    try {
      const store = await StoreService.removeUserFromStore(
        req.params.userId,
        req.params.storeId
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
      const _req = {
        ...req.query,
        withPaginate: req.query?.hasOwnProperty('withPaginate') ? req.query.withPaginate === 'false' ? false : true : true,
        store_owner: {
          $ne: null
        }
      }
      const store = await StoreService.getStores(req.params.page, _req);
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


  allSupplier: async (req, res) => {
    try {

      const store = await StoreService.allSupplier(req.params?.page || 1, req.query || {});
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

  topSupplier: async (req, res) => {
    try {

      const store = await StoreService.topSupplierByComment();
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

  addUserToStore: async (req, res) => {
    try {
      const store = await StoreService.addUserToStore(req.body, req.params.storeId);
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

  getAllStoresForAuser: async (req, res) => {
    try {
      const store = await StoreService.getAllUserStore({
        $or: [
          { store_owner: req.params.userId },
          { store_sub_admins: { $in: [req.params.userId] } }
        ]
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
      const store = await StoreService.removeStore(req.params.storeId);
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
