const CartController = require("../controllers/CartController/cart.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

const router = require("express").Router();

router.post(
    "/create",
    verifyAuthentication,
    CartController.CreateCart
);

module.exports = router;