
const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList = (req, res) => {
    const { customerId } = req.params
    getDataCustomerId(customerId).then((result) => {
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

