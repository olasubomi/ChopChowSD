const { list } = require('../../db/dbMongo/config/db_buildSchema')
exports.getAllDataLists = (req, res) => {
    return list.find()
        .then(resAllLists => {
            res.send({
                data: resAllLists
            })

        })
        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))
    }

