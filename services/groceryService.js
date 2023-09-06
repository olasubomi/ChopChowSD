const { getOneGroceryList } = require("../controllers/GroceryController/grocery.controller");
const { validate, validateItemToBeAddedToAGroceryList } = require("../model/grocery");
const { validateGroceryList, validateGroceryListUpdate } = require("../model/grocery-list");
const { Item } = require("../model/item");

const {
  createGroceryList,
  validateGroceryUser,
  validateGroceryItem,
  findAllUserGroceryList,
  addItemToList,
  createNewList,
  getGroceryList,
  checkIfGroceryListExist,
  createNewGroceryList,
  getAllGroceryList,
  getOneGrocery,
  addAnItemToAGroceryList,
  removeAnItemFromGroceryList,
  updateGroceryDetails,
  deleteGroceryList,
} = require("../repository/grocery");
const { getSimilarItem } = require("../repository/item");

class GroceryService {
  static async createGroceryList(payload, res) {
    try {
      //validating request body
      const { error } = validate(payload);
      if (error) return res.status(400).send(error.details[0].message);

      //validating user
      const checkUserId = await validateGroceryUser(payload.userId);
      if (!checkUserId)
        return res.status(400).send("The User With This ID Does Not Exist!");

      const listedName = payload.groceryList[0].listName;

      const groceryItemBody = payload.groceryList[0].groceryItems;

      //finding all grocery lists assigned to this user
      const userGrocery = await findAllUserGroceryList({
        userId: payload.userId,
      });

      //action if user have no grocery list
      if (userGrocery === undefined || userGrocery.length == 0) {
        //validating item
        const item = await validateGroceryItem(groceryItemBody[0].itemId);
        if (!item) return res.status(400).send("Invalid Item!");

        try {
          //saving grocery list to mongoDb
          const groceries = await createGroceryList(
            payload,
            listedName,
            groceryItemBody,
            item
          );

          if (groceries) {
            //  await createGroceryList(groceries);
            res.send({
              message: "Grocery List Created Successfully",
              status: 200,
              data: {
                userId: payload.userId,
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
              },
            });
          } else {
            res.send("An error occurred!");
          }
        } catch (error) {
          console.log(console.error);
        }
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

          //check if Item exist
          const item = await validateGroceryItem(groceryItemBody[0].itemId);
          if (!item) return res.status(400).send("Invalid Item!");

          // ✅ Find first object that matches condition for item ID
          const itemObj = mainItem.filter(function (userItem) {
            return userItem.item_id.toString() === mainItemId;
          })[0];

          if (itemObj)
            return res
              .status(400)
              .send("This Item Already exist in this list.");

          try {
            //adding item to grocery list
            await addItemToList(
              { userId: payload.userId },
              {
                item_id: groceryItemBody[0].itemId,
                item: item,
                quantity: groceryItemBody[0].quantity,
                pickUpTime: groceryItemBody[0].pickUpTime,
              },
              listedName
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
            console.log("f error", error);
            //  res.end(error);
          }
        } else {
          //ACTION IF THE SENT LIST NAME DOESN'T EXIST
          //check if item exist
          const item = await validateGroceryItem(groceryItemBody[0].itemId);
          if (!item) return res.status(400).send("Invalid Item!");

          //saving item with new list to mongoDb
          await createNewList(
            { userId: payload.userId },
            {
              groceryList: {
                listName: listedName,
                groceryItems: {
                  item_id: groceryItemBody[0].itemId,
                  item: item,
                  quantity: groceryItemBody[0].quantity,
                  pickUpTime: groceryItemBody[0].pickUpTime,
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
      console.log("d error", error);
      //res.end(error);
    }
  }

  static async getGroceryList(filter) {
    try {
      return await getGroceryList(filter);
    } catch (error) {
      throw error;
    }
  }


  static async AddNewGroceryList(payload, req, res) {
    try {
      payload.user = req.decoded.id;
      const { error } = validateGroceryList(payload);
      if (error) return res.status(400).send(error.details[0].message);
      const groceryList = await checkIfGroceryListExist({ listName: payload.listName })
      if (!groceryList) {
        return await createNewGroceryList(payload);
      } else {
        throw "Create grocery list operation failed"
      }
    } catch (error) {
      throw error
    }
  }

  static async AddNewItemToGroceryList(payload, res) {
    try {
      //validate request body
      const { error, value } = validateItemToBeAddedToAGroceryList(payload);
      console.log(error, value, 'james')
      if (error) return res.status(400).send(error.details[0].message);

      // const value = req.body;
      // console.log('value', value)

      //check if groceryList exist
      const checkExist = await checkIfGroceryListExist({ listName: value.groceryList.listName })
      if (checkExist) {

        //this function checks if an item has been added to a grocery list, if not it adds

        return await addAnItemToAGroceryList({
          listName: value.groceryList.listName,
          itemId: value.groceryList.groceryItems.itemId,
          quantity: value.groceryList.groceryItems.quantity,
          measurement: value.groceryList.groceryItems.measurement
        })
      }




    } catch (error) {
      throw error
    }
  }

  static async getAllGroceryList(req) {
    const id = req.decoded.id;
    try {
      return await getAllGroceryList(id)
    } catch (error) {
      throw error
    }
  }


  static async getOneGroceryList(id) {
    try {
      const groceryList = await getOneGrocery(id);


      const similar = groceryList.groceryItems.map(async curr => {
        const arr = curr.item.ingredeints_in_item || []
        const ingredeints_in_item_names = arr.map(element => element.item_name);
        console.log('ingredeints_in_item_names', ingredeints_in_item_names)
        const resp = await getSimilarItem(ingredeints_in_item_names)
        return resp
      })

      let promise = await Promise.all(similar)
      promise = promise.filter(element => element.length)

      return {
        similar: promise || [],
        groceryList
      }

    } catch (error) {
      throw error
    }
  }


  static async removeAnItemFromGrocery(payload) {
    try {

      //check if grocery list exist
      const checkExist = await checkIfGroceryListExist({ _id: payload.groceryListId });
      if (checkExist) {
        //check if the item exist on the grocery list
        const doesExist = checkExist.groceryItems.some(element => element._id.toString() === payload.groceryItemId.toString())
        if (doesExist) {
          return await removeAnItemFromGroceryList(payload)
        } else {
          throw 'Item does not exist on the grocery list'
        }
      }

    } catch (error) {
      throw error
    }
  }


  static async updateGroceryList(id, payload) {
    try {
      //validate request body;
      const { error, value } = validateGroceryListUpdate(payload);
      if (error) throw `${error.details[0].message}`
      const checkExist = await checkIfGroceryListExist({ _id: id });
      if (checkExist) {
        return await updateGroceryDetails(id, value)
      } else {
        throw 'Grocery list does not exist'
      }
    } catch (error) {
      throw error
    }
  }


  static async deleteOneGroceryList(id) {
    try {

      const checkExist = await checkIfGroceryListExist({ _id: id });
      if (checkExist) {
        return await deleteGroceryList(id)
      } else {
        throw 'Grocery list does not exist'
      }
    } catch (error) {
      throw error
    }
  }


}

module.exports = GroceryService;
