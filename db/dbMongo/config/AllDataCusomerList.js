

const { customer_list } = require('./db_buildSchema');
module.exports = async () => {
    const allDataCustomerList = [
        {
            id:1,
            customer_id: 1,
            list_id: 3,

        }, {
            id:2,
            customer_id: 1,
            list_id: 4,

        }, {
            id:3,
            customer_id: 1,
            list_id: 5,

        }, {
            id:4,
            customer_id: 1,
            list_id: 7,

        },
        {
            id:5,
            customer_id: 2,
            list_id: 4,

        },
        {
            id:6,
            customer_id: 2,
            list_id: 5,

        },
        {
            id:7,
            customer_id: 3,
            list_id: 9,

        },
        {
            id:8,
            customer_id:3,
            list_id: 5,

        }, {
            id:9,
            customer_id: 4,
            list_id: 7,

        }, {
            id:10,
            customer_id: 4,
            list_id: 6,

        }, {
            id:11,
            customer_id: 4,
            list_id: 9,

        }, {
            id:12,
            customer_id: 5,
            list_id: 10,

        }, {
            id:13,
            customer_id: 5,
            list_id: 4,

        },
        {
            id:14,
            customer_id: 6,
            list_id: 2,

        }, {
            id:15,
            customer_id: 6,
            list_id: 7,

        }, {
            id:16,
            customer_id: 6,
            list_id: 8,

        }, {
            id:17,
            customer_id: 7,
            list_id: 2,

        },
        {
            id:18,
            customer_id: 7,
            list_id: 3,

        },
        {
            id:19,
            customer_id: 8,
            list_id: 6,

        },
        {
            id:20,
            customer_id: 9,
            list_id: 10,

        },
        {
            id:21,
            customer_id:9,
            list_id: 11,

        }, {
            id:22,
            customer_id: 10,
            list_id: null

        }, {
            id:23,
            customer_id: 11,
            list_id: null

        }, {
            id:24,
            customer_id: 12,
            list_id: null

        }, {
            id:25,
            customer_id: 13,
            list_id: 5,

        }, {
            id:26,
            customer_id: 13,
            list_id: 7,

        }
        , {
            id:27,
            customer_id: 13,
            list_id: 1,

        }
    ]

    return customer_list.create(allDataCustomerList)
}


