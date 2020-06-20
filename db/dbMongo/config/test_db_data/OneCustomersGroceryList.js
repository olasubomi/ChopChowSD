const { customer_grocery_list } = require('../db_buildSchema');
module.exports = async () => {
    const allCustomersLists = [
        {
            list_id: 1,
            grocery_list: [1,2,3,4,5,6,7,8]
        }
    ]
    return customer_grocery_list.create(allCustomersLists)
}