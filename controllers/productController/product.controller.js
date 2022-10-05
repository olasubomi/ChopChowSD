const { Response } = require("http-status-codez");
const ProductService = require("../../services/productService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts(req.params.page,req.query);
      if (products) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(products));
      } else {
        throw products;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  readProductImages: async (req, res) => {
    try {
      const productImages = await ProductService.readProductImages();
      if (productImages) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(productImages));
      } else {
        throw productImages;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  readProductImage: async (req, res) => {
    try {
      const productImages = await ProductService.readSingleProductImage(
        req.params.filename
      );
      if (productImages) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(productImages));
      } else {
        throw productImages;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getStoreProducts: async (req, res) => {
    try {
      const storeProducts = await ProductService.storeProducts(req.params.page,req.query.storeId);
      if (storeProducts) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(storeProducts));
      } else {
        throw storeProducts;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
