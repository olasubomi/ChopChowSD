const { users } = require('../../db/dbMongo/config/db_buildSchema')
// we should be checking pg db not mongo.
let arrIdsUsers=[]
module.exports = (req, res) => {
    console.log("Comes in here to get users id's...")
    users.find({})
        .then(result => {
            let arrIdsUsers = []
            result.map(resUserId => {
                arrIdsUsers.push(resUserId.id)
            })
            res.send({
                data: arrIdsUsers
            })

        })

}

