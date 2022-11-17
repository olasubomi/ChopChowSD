const { Response } = require("http-status-codez");
const AnalyticsService = require("../services/analyticsService");

const { ErrorResponse, SuccessResponse } = require("../lib/appResponse");

module.exports = {
  getMealsCount: async (req, res) => {
    try {
      const mealsCount = await AnalyticsService.getMealsCount(req.query || {});
      if (mealsCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(mealsCount));
      } else {
        throw mealsCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getProductsCount: async (req, res) => {
    try {
      const productCount = await AnalyticsService.getProductsCount(req.query || {});
      if (productCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(productCount));
      } else {
        throw productCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getUsersCount: async (req, res) => {
    try {
      const usersCount = await AnalyticsService.getUsersCount(req.query || {});
      if (usersCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(usersCount));
      } else {
        throw usersCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getCategoriesCount: async (req, res) => {
    try {
      const categoriesCount = await AnalyticsService.getCategoriesCount(
        req.query || {}
      );
      if (categoriesCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(categoriesCount));
      } else {
        throw categoriesCount;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getSuppliersCount: async (req, res) => {
    try {
      const suppliersCount = await AnalyticsService.getSuppliersCount(
        req.query || {}
      );
      if (suppliersCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(suppliersCount));
      } else {
        throw suppliersCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getOrdersCount: async (req, res) => {
    try {
      const ordersCount = await AnalyticsService.getOrdersCount(req.query || {});
      if (ordersCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(ordersCount));
      } else {
        throw ordersCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getMeasurementsCount: async (req, res) => {
    try {
      const measurementCount = await AnalyticsService.getMeasurementsCount(
        req.query || {}
      );
      if (measurementCount) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(measurementCount));
      } else {
        throw measurementCount;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
