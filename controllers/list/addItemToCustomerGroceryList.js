const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
// const { addList } = require('../../db/dbPostgress/queries/list/addList')
// const { addListCustomer } = require('../../db/dbPostgress/queries/list/addListCustomer')
// const { getCustomerListId } = require('../../db/dbPostgress/queries/getCustomerListId')

exports.addItemToCustomerGroceryList = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;
    console.log("Itemid: "+idItem);
    console.log("Customerid: "+customerId);

    let arr = []

    // getCustomerListId(customerId).then((result) => {
    //     let data = {};
    //     console.log(result);
        // list.find({})
        //     .then(() => {
        //         data = result.rows;
        //         const list_ids = data.map((el) => el.list_id)
        //         arr = list_ids;
        //         // check for item already in customer list
        //         if (arr.includes(Number(idItem))) {
        //             res.status(400).send(JSON.stringify('this item is a duplicate found in this customers list.'))
        //         } else {
        //             // create new list for customer ? // how is id managed ?
        //             var createCustomerList = new customer_list({ list_id: idItem, customer_id: customerId })
        //             createCustomerList.save((err, resultListCustomer) => {
        //                 if (err) {
        //                     res.status(500).send('internal server error');
        //                 }
        //                 addListCustomer(idItem, customerId).then(resu => {
        //                     res.status(200).send({
        //                         data: resu.rows
        //                     })
        //                 })

        //             })
        //         }
        //     })
        //     .catch(()=>{
        //         res.status(404).send(
        //             JSON.stringify('caught an error while adding data for this customer.')
        //         )
        //     })
    // })  
    res.status(200).send({
        data: resu.rows
    })
}