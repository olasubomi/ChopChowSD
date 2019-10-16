const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const {deleteListCustomer} = require('../../db/dbPostgress/queries/list/deleteListCustomer')
module.exports = (req, res) => {
    const { customerId, idItem } = req.params
    deleteListCustomer(customerId,idItem).then(result=>{
        customer_list.deleteMany({ $and: [{ list_id: idItem, customer_id: customerId }] }).then(elem => {
            
            res.send({
                data: 'delete  item'
            })
        })
    })
        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))

}

