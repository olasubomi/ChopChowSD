const { validate } = require("../model/grocery");

const {
    createGroceryList,
    validateGroceryUser,
    validateGroceryProduct,
    findAllUserGroceryList,
    addProductToList,
    createNewList,
    getGroceryList,
  } = require("../repository/index");
  
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
            const userGrocery = await findAllUserGroceryList({ userId: payload.userId });
        
            //action if user have no grocery list
            if (userGrocery === undefined || userGrocery.length == 0) {
              //validating product
              const product = await validateGroceryProduct(groceryItemBody[0].productId);
              if (!product) return res.status(400).send("Invalid Product!");
        
              //saving grocery list to mongoDb
              await createGroceryList({
                userId: payload.userId,
                groceryList: [
                  {
                    listName: listedName,
                    groceryItems: [
                      {
                        product_id: groceryItemBody[0].productId,
                        product: product,
                        quantity: groceryItemBody[0].quantity,
                        pickUpTime: groceryItemBody[0].pickUpTime,
                      },
                    ],
                  },
                ],
              });
        
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
                            product_id: groceryItemBody[0].productId,
                            product: product,
                            quantity: groceryItemBody[0].quantity,
                            pickUpTime: groceryItemBody[0].pickUpTime,
                          },
                        ],
                      },
                    ],
                  },
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
                const mainProductId = groceryItemBody[0].productId;
        
                //isolating grocery items list from the grocery list
                const mainProduct = mainListObj.groceryItems;
        
                //check if Product exist
                const product = await validateGroceryProduct(groceryItemBody[0].productId);
                if (!product) return res.status(400).send("Invalid Product!");
        
                // ✅ Find first object that matches condition for product ID
                const productObj = mainProduct.filter(function (userProduct) {
                  return userProduct.product_id.toString() === mainProductId;
                })[0];
        
                if (productObj)
                  return res.status(400).send("This Product Already exist in this list.");
        
                try {
                  //adding item to grocery list
                  await addProductToList(
                    { userId: payload.userId },
                     {
                          product_id: groceryItemBody[0].productId,
                          product: product,
                          quantity: groceryItemBody[0].quantity,
                          pickUpTime: groceryItemBody[0].pickUpTime,
                    },
                     listedName,
                  );
        
                  res.send({
                    message: "Product Added To Grocery List Successfully",
                    status: 200,
                    data: {
                      product_id: groceryItemBody[0].productId,
                      product: product,
                      quantity: groceryItemBody[0].quantity,
                      pickUpTime: groceryItemBody[0].pickUpTime,
                    },
                  });
                } catch (error) {
                  console.log('f error',error);
                //  res.end(error);
                }
              } else {
                //ACTION IF THE SENT LIST NAME DOESN'T EXIST
                //check if product exist
                const product = await validateGroceryProduct(groceryItemBody[0].productId);
                if (!product) return res.status(400).send("Invalid Product!");
        
                //saving product with new list to mongoDb
                await createNewList(
                  { userId: payload.userId },
                     {
                      groceryList: {
                        listName: listedName,
                        groceryItems: {
                          product_id: groceryItemBody[0].productId,
                          product: product,
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
                      product_id: groceryItemBody[0].productId,
                      product: product,
                      quantity: groceryItemBody[0].quantity,
                      pickUpTime: groceryItemBody[0].pickUpTime,
                    },
                  },
                });
              }
            }
          } catch (error) {
            console.log('d error',error);
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

  }
  
  module.exports = GroceryService;
  