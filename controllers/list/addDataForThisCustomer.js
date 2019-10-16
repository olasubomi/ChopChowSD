const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { addList } = require('../../db/dbPostgress/queries/list/addList')
const { addListCustomer } = require('../../db/dbPostgress/queries/list/addListCustomer')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')

exports.add = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;

    let arr = []

    getDataCustomerId(customerId).then((result) => {
        let data = {};
        list.find({})
            .then(() => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                arr = list_ids;
                if (arr.includes(Number(idItem))) {
                    res.status(400).send(JSON.stringify('you cannt add this item because this item is found in list his customer'))
                } else {
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
            })
    })
}

