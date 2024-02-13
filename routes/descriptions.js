const express = require("express");
const router = express.Router();

const DescriptionsController = require("../controllers/DescriptionController/descriptions.controller.js");


router.get("/", DescriptionsController.getProductDescription)
router.get("/:page", DescriptionsController.getDescription)
router.patch('/', DescriptionsController.updateDescription)
router.delete('/:id', DescriptionsController.deleteDescription)

module.exports = router