const GroceryController = require("../controllers/GroceryController/grocery.controller");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const express = require("express");
const router = express.Router();
const { upload } = require("../utils/middleware");


router.get("/list", verifyAuthentication, GroceryController.getAllGroceryListForAUser)

router.get('/list/:id', verifyAuthentication, GroceryController.getOneGroceryList)

router.get("/:id", verifyAuthentication, GroceryController.getGroceryList);

router.post("/", verifyAuthentication, GroceryController.addNewItemToGroceryList);

router.post('/grocery-item', verifyAuthentication, GroceryController.addNewJsonDataItemToGroceryList)

router.post('/grocery-measurement', verifyAuthentication, GroceryController.addNewMeasurementToGroceryList)

router.post('/grocery-other', verifyAuthentication, upload.single('item_image'), GroceryController.addNewOtherToGroceryList)

router.patch('/remove/:groceryListId/:groceryItemId', verifyAuthentication, GroceryController.removeItemFromGroceryList)

router.post('/create', verifyAuthentication, GroceryController.createNewGroceryList)

router.patch('/create/:id', verifyAuthentication, GroceryController.updateGrocery)

router.delete('/create/:id', verifyAuthentication, GroceryController.deleteGrocery)



module.exports = router;
