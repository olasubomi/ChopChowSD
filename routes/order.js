const OrderController = require("../controllers/OrderController/order.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

const router = require("express").Router();

router.post(
    "/addtocart", OrderController.addToOrderList
);


router.get(
    "/order", OrderController.getMyOrder
);

router.delete(
    "/deletemyorderbyid/:id", OrderController.removeFromMyOrderList
);

router.delete(
    "/deleteorder", OrderController.deleteMyOrders
);

module.exports = router;