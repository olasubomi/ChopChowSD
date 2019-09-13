const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
const {deleteListsCustomer} = require('../../db/dbPostgress/queries/list/deleteListsCustomer')



module.exports = (req, res) => {
    const { customerId } = req.params

    getDataCustomerId(customerId).then((result) => {
        let data = {};
deleteListsCustomer(customerId).then(result=>{
    console.log(444);
        list.find({})
            .then(() => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                console.log({ list_ids });
                customer_list.deleteMany({ $and: [{ list_id: list_ids, customer_id: customerId }] }).then(elem => {
                    res.send({
                        data: 'delete all items'
                    })
                        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))

                })
                    .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))

            })
    })
})
}
