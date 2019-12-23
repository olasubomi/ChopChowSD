const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getCustomerListId } = require('../../db/dbPostgress/queries/getCustomerListId')
const { deleteListsCustomer } = require('../../db/dbPostgress/queries/list/deleteListsCustomer')
module.exports = (req, res) => {
    const { customerId } = req.params

    getCustomerListId(customerId).then((result) => {
        let data = {};
        deleteListsCustomer(customerId).then(result => {
            list.find({})
                .then(() => {
                    data = result.rows;
                    const list_ids = data.map((el) => el.list_id)
                    customer_list.deleteMany({ $and: [{ list_id: list_ids, customer_id: customerId }] }).then(elem => {
                        res.send({
                            data: 'delete all items'
                        })

                    })
                    
                })
                .catch(() => next({ code: 500, msg: 'sorry , found Internal server error' }))
        })
    })
}
