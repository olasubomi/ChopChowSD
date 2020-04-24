const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')
// const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
// const { getDataCustomerId } = require('../../db/dbPostgress/queries/getListIDFromCustomerId')

module.exports = (req, res) => {
    const { customerId } = req.params

    // getDataCustomerId(customerId).then((result) => {
        let data = {};
        customer_grocery_list.find({list_id: customerId})
            .then(() => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                res.send({
                    data:list_ids
                })
              

            })
    // })
}
