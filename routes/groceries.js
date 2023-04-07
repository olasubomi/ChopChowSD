const GroceryController = require("../controllers/GroceryController/grocery.controller");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const express = require("express");
const router = express.Router();


router.get("/:id", verifyAuthentication, GroceryController.getGroceryList);

router.post("/", verifyAuthentication, GroceryController.createGroceryList);

module.exports = router;
