const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
module.exports = (req, res) => {
    const { customerId, itemId } = req.params
    customer_list.deleteMany({ $and: [{ list_id: itemId, customer_id: customerId }] }).then(elem => {
        res.send({
            data: 'delete  item'
        })
            .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))
    })
        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))

}

