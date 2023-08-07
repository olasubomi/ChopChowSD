const DescriptionController = require("../controllers/DescriptionController/description.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const express = require("express");
const router = express.Router();

router.get("/", DescriptionController.getDescription);

router.post("/", verifyAuthentication, DescriptionController.createDescription);

router.post(
  "/update",
  verifyAuthentication,
  DescriptionController.updateDescription
);

router.post(
  "/delete",
  verifyAuthentication,
  DescriptionController.deleteDescription
);

module.exports = router;
