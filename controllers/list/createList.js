const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { addList } = require('../../db/dbPostgress/queries/list/addList')
const { addListCustomer } = require('../../db/dbPostgress/queries/list/addListCustomer')
module.exports = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;
    const { valueProductName, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce } = req.body;
        console.log('ressss');
        
    
                    var createList = new list({ id: idItem, product_name: valueProductName, product_image: valueProductImage, product_price: valueProductPrice, sizes: valueProductSize, price_per_ounce: valuePricePerOunce })
                    var createCustomerList = new customer_list({ list_id: idItem, customer_id: customerId })
                    addList(idItem, valueProductName, valueProductImage, valueProductPrice, valueProductSize).then(result => {
                        // console.log(666666);
    console.log(444444,result.rows);
    
                        addListCustomer(idItem, customerId).then(resu => {
    
                        createList.save((err, resultList) => {
                            // console.log(5555);
    
                            createCustomerList.save((err, resultListCustomer) => {
                                if (err) {
                                    res.status(500).send('internal server error');
                                }
                                res.status(200).send({
                                    data: result.rows
                                })
    
                            })
                        })
    
                        })
                    })
                







}

