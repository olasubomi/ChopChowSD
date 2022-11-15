const { Response } = require("http-status-codez");
const ProductService = require("../../services/productService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createProduct: async (req, res) => {
    try {
      req.body.user = req.decoded.id;
      const product = await ProductService.createProduct(req.body, req.files);
      if (product) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(product));
      } else {
        throw product;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await ProductService.updateProduct(
        { _id: req.params.productId, ...req.query },
        req.body,
        req.files || req.file || null
      );
      if (product) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(product));
      } else {
        throw product;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts(
        req.params.page,
        req.query
      );
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

  getProduct: async (req, res) => {
    try {
      const product = await ProductService.getProduct(
        {_id:req.params.productId}
      );
      console.log({product})
      if (product) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(product));
      } else {
        throw product;
      }
    } catch (error) {
      res
        .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await ProductService.deleteProduct(
      req.params.productId
      );
      if (product) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(product));
      } else {
        throw product;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getStoreProducts: async (req, res) => {
    try {
      const storeProducts = await ProductService.storeProducts(
        req.params.page,
        req.query.storeId
      );
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
