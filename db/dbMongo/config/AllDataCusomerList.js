const { customer_list } = require('./db_buildSchema');
module.exports = async () => {
    const allDataCustomerList = [
        {
            id:1,
            customer_id: 1,
            list_id: 1,

        }, {
            id:2,
            customer_id: 2,
            list_id: 2,

        }, {
            id:3,
            customer_id: 3,
            list_id: 3,

        }
    ]

    return customer_list.create(allDataCustomerList)
}
