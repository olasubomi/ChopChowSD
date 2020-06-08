const { meals } = require('../config/db_buildSchema')
exports.getMeals = (req, res) => {
    return meals.find()
        .then(resMeals => {
            // console.log(resMeals);
            res.send({
                data: resMeals
            })
        })
        .catch(() => ({ code: 500, msg: 'sorry , found Inernal server error' }))
    }