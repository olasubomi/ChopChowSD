const { Grocery, validate } = require("../model/grocery");
const { Item } = require("../model/item");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const mongoose = require("mongoose");
const express = require("express");
const { userSignup } = require("../services/UserService");
const router = express.Router();
const { getCustomerGroceryList, findUser } = require("../repository");
const { response } = require("express");

router.get("/:id", verifyAuthentication, async (req, res) => {
  //getting all user grocery list(s)
  const groceries = await Grocery.find({ userId: req.params.id });
  res.status(200).send({
    data: groceries,
  });
});

router.post("/", verifyAuthentication, async (req, res) => {
  try {
    //validating request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //validating user
    const checkUserId = await findUser({ _id: req.body.userId });
    if (!checkUserId)
      return res.status(400).send("The User With This ID Does Not Exist!");

    const listedName = req.body.groceryList[0].listName;
    const groceryItemBody = req.body.groceryList[0].groceryItems;

    //finding all grocery lists assigned to this user
    const userGrocery = await Grocery.find({ userId: req.body.userId });

    //action if user have no grocery list
    if (userGrocery === undefined || userGrocery.length == 0) {
      //validating product
      const item = await Item.findById(groceryItemBody[0].itemId);
      if (!item) return res.status(400).send("Invalid Item!");

      //saving grocery list to mongoDb
      const groceries = new Grocery({
        userId: req.body.userId,
        groceryList: [
          {
            listName: listedName,
            groceryItems: [
              {
                item_id: groceryItemBody[0].itemId,
                item: item,
                quantity: groceryItemBody[0].quantity,
                pickUpTime: groceryItemBody[0].pickUpTime,
              },
            ],
          },
        ],
      });

      await groceries.save();
      res.send({
        message: "Grocery List Created Successfully",
        status: 200,
        data: groceries,
      });
    } else {
      // ✅ Return all grocery list for dat user
      const listObj = userGrocery.filter(function (userList) {
        return userList.groceryList;
      })[0];

      //isolate the grocery lists
      const groceryListObj = listObj.groceryList;

      // ✅ Find first object that matches condition for list Name
      const mainListObj = groceryListObj.filter(function (userList) {
        return userList.listName === listedName;
      })[0];

      //action if list with list name available
      if (mainListObj) {
        const mainItemId = groceryItemBody[0].itemId;

        //isolating grocery items list from the grocery list
        const mainItem = mainListObj.groceryItems;

        //check if item exist
        const item = await Item.findById(groceryItemBody[0].itemId);
        if (!item) return res.status(400).send("Invalid Item!");

        // ✅ Find first object that matches condition for item ID
        const itemObj = mainItem.filter(function (userItem) {
          return userItem.item_id.toString() === mainItemId;
        })[0];

        if (itemObj)
          return res.status(400).send("This Item Already exist in this list.");

        try {
          //adding item to grocery list
          await Grocery.updateOne(
            { userId: req.body.userId },
            {
              $addToSet: {
                "groceryList.$[elem].groceryItems": {
                  item_id: groceryItemBody[0].itemId,
                  item: item,
                  quantity: groceryItemBody[0].quantity,
                  pickUpTime: groceryItemBody[0].pickUpTime,
                },
              },
            },
            { arrayFilters: [{ "elem.listName": listedName }] }
          );

          res.send({
            message: "Item Added To Grocery List Successfully",
            status: 200,
            data: {
              item_id: groceryItemBody[0].itemId,
              item: item,
              quantity: groceryItemBody[0].quantity,
              pickUpTime: groceryItemBody[0].pickUpTime,
            },
          });
        } catch (error) {
          console.log(error);
          res.end(error);
        }
      } else {
        //ACTION IF THE SENT LIST NAME DOESN'T EXIST
        //check if item exist
        const item = await Item.findById(groceryItemBody[0].itemId);
        if (!item) return res.status(400).send("Invalid Item!");

        //saving item with new list to mongoDb
        await Grocery.updateOne(
          { userId: req.body.userId },
          {
            $addToSet: {
              groceryList: {
                listName: listedName,
                groceryItems: {
                  item_id: groceryItemBody[0].itemId,
                  item: item,
                  quantity: groceryItemBody[0].quantity,
                  pickUpTime: groceryItemBody[0].pickUpTime,
                },
              },
            },
          }
        );

        res.send({
          message: "Grocery List Created Successfully",
          status: 200,
          data: {
            listName: listedName,
            groceryItems: {
              item_id: groceryItemBody[0].itemId,
              item: item,
              quantity: groceryItemBody[0].quantity,
              pickUpTime: groceryItemBody[0].pickUpTime,
            },
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.end(error);
  }
});

module.exports = router;
