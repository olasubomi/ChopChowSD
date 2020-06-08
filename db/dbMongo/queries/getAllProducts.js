const { all_products } = require('../config/db_buildSchema')
exports.getAllProducts = (req, res) => {
    return all_products.find()
        .then(productsResp => {
            console.log("Successfully gets all products for typeahead :)")
            // console.log(productsResp);
            res.send({
                data: productsResp
            })
        })
        .catch(() => ({ code: 500, msg: 'sorry , found Inernal server error when getting all products' }))
    }