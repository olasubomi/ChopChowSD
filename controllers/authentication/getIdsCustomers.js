const { customer } = require('../../db/dbMongo/config/db_buildSchema')
let arrIdsCustomers=[]
module.exports = (req, res) => {
    customer.find({})
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

