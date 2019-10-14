const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { addList } = require('../../db/dbPostgress/queries/list/addList')
const { addListCustomer } = require('../../db/dbPostgress/queries/list/addListCustomer')
exports.add = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;
    var createCustomerList = new customer_list({ list_id: idItem, customer_id: customerId })
    createCustomerList.save((err, resultListCustomer) => {
        if (err) {
            res.status(500).send('internal server error');
        }
        addListCustomer(idItem, customerId).then(resu => {
            res.status(200).send({
                data: resu.rows
            })
        })

    })
}



