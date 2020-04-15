
const { customers_lists } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')
const {all_products} = require('../../db/dbMongo/config/db_buildSchema')

exports.getCustomerGroceryList =  (req, res) => {
    const { customerId } = req.params
    console.log("CUSTOMER ID IS "+ customerId);
    // getListIDFromCustomerId(customerId).then((result) => {
        customers_lists.find({customer_id:customerId, grocery_list_id:1 })
             .then( (result) => {
                // grocery_list = result.rows;
                console.log("RETURNED DATA IS:");
                console.log(result);
                console.log(result[0].grocery_list_id);
                let groceryListArray = []
                customer_grocery_list.find({ list_id: result[0].grocery_list_id})
                    .then( (result) => {
                        const groceryListIds = result[0].grocery_list; 
                        console.log("comes here");
                        console.log(groceryListIds);
                        // store all products for customers grocery list in data
                        /*
                        const grocery_list =  groceryListIds.map((productId) => 
                         all_products.find({id: productId})
                                .then(product=>{
                                    console.log(product);
                                    groceryListArray.push(product)
                                    console.log("grocery array here:")
                                    // console.log(groceryListArray)
                                    // product;
                                })
                                // .then(
                                //     console.log("Hello")
                                // )
                        )

                        console.log("grocery list is:");
                        console.log(grocery_list);
                        */
                       all_products.find({'id': {$in: groceryListIds}})
                        .then((result)=>{
                            console.log("Comes HERE")
                            console.log(result[0])
                            res.send({
                                data: result
                            })
                        }

                        )
                        console.log(groceryListArray)

                    })
                    .catch(err => {
                        res.status(500).send('internal server error');
                    })
                    // .finally(()=>{
                    //     console.log("Comes in finally")
                    //     console.log(groceryListArray)
                    // })
            })
    // })
}

