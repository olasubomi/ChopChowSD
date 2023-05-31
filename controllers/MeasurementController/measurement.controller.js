const { Response } = require("http-status-codez");
const MeasurementService = require("../../services/measurementService");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  createMeasurement: async (req, res) => {
    try {
      const measurements = await MeasurementService.createMeasurement(
        req.body,
        res
      );
      if (measurements) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(measurements));
      } else {
        throw measurements;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getMeasurement: async (req, res) => {
    try {
      const measurements = await MeasurementService.getMeasurement(req, res);
      if (measurements) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(measurements));
      } else {
        throw measurements;
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateMeasurement: async (req, res) => {
    try {
      const measurements = await MeasurementService.updateMeasurement(
        req.body,
        res
      );
      if (measurements) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(measurements));
      } else {
        throw measurements;
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteMeasurement: async (req, res) => {
    try {
      const measurements = await MeasurementService.deleteMeasurement(
        req.body,
        res
      );
      if (measurements) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(measurements));
      } else {
        throw measurements;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
