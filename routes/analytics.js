const router = require("express").Router();
const AnalyticsController = require("../controllers/analytics");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");

//analytics routes
router.get(
  "/get-meals-count/",
  verifyAuthentication,
  AnalyticsController.getMealsCount
);
router.get(
  "/get-products-count/",
  verifyAuthentication,
  AnalyticsController.getProductsCount
);
router.get(
  "/get-users-count/",
  verifyAuthentication,
  AnalyticsController.getUsersCount
);
router.get(
  "/get-suppliers-count/",
  verifyAuthentication,
  AnalyticsController.getSuppliersCount
);
router.get(
  "/get-categories-count",
  verifyAuthentication,
  AnalyticsController.getCategoriesCount
);
router.get(
  "/get-measurements-count/",
  verifyAuthentication,
  AnalyticsController.getMeasurementsCount
);
router.get(
  "/get-orders-count/",
  verifyAuthentication,
  AnalyticsController.getOrdersCount
);

router.get(
  "/get-inventories-count/",
  verifyAuthentication,
  AnalyticsController.getInventoriesCount
);

module.exports = router;
