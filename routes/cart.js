const CartController = require("../controllers/CartController/cart.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

const router = require("express").Router();

router.post(
    "/addtocart", CartController.addToCart
);

router.post(
    "/removefromcart/", CartController.removeFromCart
);

router.post(
    "/cart", CartController.getCart
);

router.post(
    "/deletefromcart/", CartController.deleteFromCart
);

router.post(
    "/deletecart/", CartController.deleteCart
);

module.exports = router;