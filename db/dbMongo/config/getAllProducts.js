const { all_products } = require('./db_buildSchema')
exports.getAllProducts = (req, res) => {
    return all_products.find()
        .then(productsResp => {
            console.log(productsResp);
            res.send({
                data: productsResp
            })
        })
        .catch(() => ({ code: 500, msg: 'sorry , found Inernal server error when getting all products' }))
    }