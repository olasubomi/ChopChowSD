const { Response } = require("http-status-codez");
const CategoryService = require("../../services/categoryService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const category = await CategoryService.createCategory(req.body);
      if (category) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(category));
      } else {
        throw category;
      }
    } catch (error) {
      console.log(error);
      return res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateCategory: async (req, res) => {
    try {
      const category = await CategoryService.updateCategory(
        { _id: req.params.categoryId, ...req.query },
        req.body,
        req.files || req.file || null
      );
      if (category) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(category));
      } else {
        throw category;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoryService.getAllCategories(
        req.params.page,
        req.query
      );
      if (categories) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(categories));
      } else {
        throw categories;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getAllProductCategories: async (req, res) => {
    try {
      const categories = await CategoryService.getProductCategories(req.query);
      if (categories) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(categories));
      } else {
        throw categories;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await CategoryService.getCategory(
        { _id: req.params.categoryId }
      );
      console.log({ category })
      if (category) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(category));
      } else {
        throw category;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await CategoryService.deleteCategory(
        req.params.categoryId
      );
      if (category) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(category));
      } else {
        throw category;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  }
};
