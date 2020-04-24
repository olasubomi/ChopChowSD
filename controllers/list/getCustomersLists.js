const { customers_lists } = require('../../db/dbMongo/config/db_buildSchema')

module.exports = (req, res) => {
    let data = {};
    customers_lists.find({})
        .then(result => {
            let arrIdsLists = []
            result.map(resItem => {
                arrIdsLists.push(resItem.id)

            })
            res.send({
                data: arrIdsLists
            })

        })

}

