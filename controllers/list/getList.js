
const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getCustomerListId } = require('../../db/dbPostgress/queries/getCustomerListId')
exports.getList = (req, res) => {
    const { customerId } = req.params
    getCustomerListId(customerId).then((result) => {
        let data = {};
        list.find({})
            .then((r) => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                list.find({ id: { $in: list_ids } })
                    .then(result => {
                        res.send({
                            data: result
                        })
                    })
                    .catch(err => {
                        res.status(500).send('internal server error');
                    })
            })
    })
}

