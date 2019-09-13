const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')



module.exports = (req, res) => {
    let data = {};
    list.find({})
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

