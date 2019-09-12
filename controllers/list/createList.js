const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const {addList }=require('../../db/dbPostgress/queries/list/addList')
const {addListCustomer }=require('../../db/dbPostgress/queries/list/addListCustomer')


module.exports=(req,res)=>{
    const {idItem} = req.params;
    const {customerId} = req.params;
    const {valueProductName,valueProductImage,valueProductPrice,valueProductSize} = req.body;

console.log(111,req.body);
    // addList(idItem,valueProductName,valueProductImage,valueProductPrice,valueProductSize).then(result=>{
    //     console.log(result.rows);
        
    // })
    // addListCustomer(idItem,customerId).then(result=>{
    //     console.log(6565652,result.rows);
        
    // })
    var createList=new list({id: idItem, product_name: valueProductName, product_image: valueProductImage, product_price:valueProductPrice , sizes:valueProductSize })
    var createCustomerList = new customer_list({list_id:idItem, customer_id: customerId})
    
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

