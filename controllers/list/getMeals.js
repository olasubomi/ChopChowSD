const { meals } = require('../../db/dbMongo/config/db_buildSchema')
exports.getMeals = (req, res) => {
    return meals.find()
        .then(resMeals => {
            res.send({
                data: resMeals
            })
        })
        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error' }))
    }