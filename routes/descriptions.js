const express = require("express");
const router = express.Router();
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");

const DescriptionsController = require("../controllers/DescriptionController/descriptions.controller.js");


router.get("/", DescriptionsController.getDescription)
router.patch('/', DescriptionsController.updateDescription)
router.delete('/:id', DescriptionsController.deleteDescription)

module.exports = router