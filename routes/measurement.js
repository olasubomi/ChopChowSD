const MeasurementController = require("../controllers/MeasurementController/measurement.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const express = require("express");
const router = express.Router();

router.get("/", MeasurementController.getMeasurement);

router.post("/", verifyAuthentication, MeasurementController.createMeasurement);

router.post(
  "/update",
  verifyAuthentication,
  MeasurementController.updateMeasurement
);

router.post(
  "/delete",
  verifyAuthentication,
  MeasurementController.deleteMeasurement
);

module.exports = router;
