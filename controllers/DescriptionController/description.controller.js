const { Response } = require("http-status-codez");
const DescriptionService = require("../../services/descriptionService");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createDescription: async (req, res) => {
    try {
      const descriptions = await DescriptionService.createDescription(
        req.body,
        res
      );
      if (descriptions) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(descriptions));
      } else {
        throw descriptions;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getDescription: async (req, res) => {
    try {
      const descriptions = await DescriptionService.getDescription(req, res);
      if (descriptions) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(descriptions));
      } else {
        throw descriptions;
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateDescription: async (req, res) => {
    try {
      const descriptions = await DescriptionService.updateDescription(
        req.body,
        res
      );
      if (descriptions) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(descriptions));
      } else {
        throw descriptions;
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteDescription: async (req, res) => {
    try {
      const description = await DescriptionService.deleteDescription(
        req.body,
        res
      );
      if (description) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(description));
      } else {
        throw description;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
