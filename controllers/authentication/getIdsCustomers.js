const { customers } = require('../../db/dbMongo/config/db_buildSchema')
let arrIdsCustomers=[]
module.exports = (req, res) => {
    customers.find({})
        .then(result => {
            let arrIdsCustomers = []
            result.map(resCustomerId => {
                arrIdsCustomers.push(resCustomerId.id)
            })
            res.send({
                data: arrIdsCustomers
            })

        })

}

