const { deleteItem } = require('../../dbMongo/queries/index');
module.exports = (req, res) => {
    deleteItem()
        .then((result) => {
            res.send({
                data: result.rows
            })
                .catch(() => next({ code: 500, msg: 'internal server error' }))
        })
}

