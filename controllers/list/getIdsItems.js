const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getCustomerListId } = require('../../db/dbPostgress/queries/getCustomerListId')

module.exports = (req, res) => {
    const { customerId } = req.params

    getCustomerListId(customerId).then((result) => {
        let data = {};
        list.find({})
            .then(() => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                res.send({
                    data:list_ids
                })
              

            })
    })
}
