
const { customers_lists } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')
const { all_products } = require('../../db/dbMongo/config/db_buildSchema')

exports.getCustomerGroceryList = (req, res) => {
    const { customerId } = req.params
    console.log("CUSTOMER ID IS " + customerId);
    // getListIDFromCustomerId(customerId).then((result) => {
    customers_lists.find({ customer_id: customerId, grocery_list_id: 1 })
        .then((result) => {
            // grocery_list = result.rows;
            console.log("RETURNED DATA from getCustomerGroceryList IS:");
            console.log(result);
            let groceryListArray = []
            customer_grocery_list.find({ list_id: result[0].grocery_list_id })
                .then((result) => {
                    const groceryListIds = result[0].grocery_list;
                    console.log(groceryListIds);
                    // store all products for customers grocery list in data
                    all_products.find({ 'id': { $in: groceryListIds } })
                        .then((result) => {
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
        })
}

