const CartController = require("../controllers/CartController/cart.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

const router = require("express").Router();

router.post(
    "/addtocart", CartController.addToCart
);

router.post(
    "/removefromcart/:id", CartController.removeFromCart
);

router.get(
    "/cart", CartController.getCart
);

router.delete(
    "/deletefromcart/:id", CartController.deleteFromCart
);

router.delete(
    "/deletecart", CartController.deleteCart
);

module.exports = router;