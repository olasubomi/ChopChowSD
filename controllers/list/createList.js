const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const{addList}=require('../../db/dbPostgress/queries/list/addList')
const {addListCustomer}=require('../../db/dbPostgress/queries/list/addListCustomer')
module.exports = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;
    const {  valueProductName,valueProductImage,valueProductSize,valueProductPrice,valuePricePerOunce} = req.body;
    var createList = new list({ id: idItem, product_name: valueProductName,product_image:valueProductImage,product_price:valueProductPrice,sizes:valueProductSize,price_per_ounce:valuePricePerOunce})
    var createCustomerList = new customer_list({ list_id: idItem, customer_id: customerId })
    addList(idItem,valueProductName,valueProductImage,valueProductPrice,valueProductSize).then(resss=>{
        console.log(44,resss.rows);
        
         addListCustomer(idItem,customerId).then(resu=>{
        console.log(44,resu.rows);

            createList.save((err, resultList) => {
                createCustomerList.save((err, resultListCustomer) => {
                    if (err) {
                        // res.status(500).send('internal server error');\
                        console.log('errr');
                        
                    }
                    res.status(200).send({
                        data: 'add successfully'
                    })
        
                })
            })
        
    })
    })
   
   

   



}

