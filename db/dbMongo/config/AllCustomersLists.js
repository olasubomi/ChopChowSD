const { customers_lists } = require('./db_buildSchema');
module.exports = async () => {
    const allCustomersLists = [
        {
            id:1,
            customer_id: 1,
            grocery_list_id: 1,
            cart_list_id: 1

        }, {
            id:2,
            customer_id: 2,
            grocery_list_id: 2,
            cart_list_id: 2

        }, {
            id:3,
            customer_id: 3,
            grocery_list_id: 3,
            cart_list_id: 3
        }
    ]

    return customers_lists.create(allCustomersLists)
}
