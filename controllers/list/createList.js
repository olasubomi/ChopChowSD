const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    const {itemId} = req.params;
    const {customerId} = req.params;
    const {valueProductName,valueProductImage,valueProductPrice,valueProductSize} = req.body;

console.log(111,req.body);

    var createList=new list({id: itemId, product_name: valueProductName, product_image: valueProductImage, product_price:valueProductPrice , sizes:valueProductSize })
    var createCustomerList = new customer_list({list_id:itemId, customer_id: customerId})
    
    createList.save((err,book)=>{
       createCustomerList.save((err,boook)=>{
        if (err){
                    res.status(500).send('internal');
                }
                    console.log('kkkkkk');
                    res.status(200).send({
                                data:'add successfully'
                            })

            })
       })
         


       
}

