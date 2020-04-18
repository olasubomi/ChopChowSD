const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')
// const { customers_lists } = require('../../db/dbMongo/config/db_buildSchema')
// const { addList } = require('../../db/dbPostgress/queries/list/addList')
// const { addListCustomer } = require('../../db/dbPostgress/queries/list/addListCustomer')
// const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')

exports.add = (req, res) => {
    const { idItem } = req.params;
    const { customerId } = req.params;

    let arr = []


    // getDataCustomerId(customerId).then((result) => {
    let data = {};
    customer_grocery_list.update( {list_id: customerId },{ $push:  { grocery_list: idItem }}) 
    console.log("Comes in server side, after update");
    customer_grocery_list.updateOne( {list_id: customerId },{ $push:  { grocery_list: Number(idItem) }}) 
    .then((Response) => {
    console.log(Response)
    console.log("Comes in search for update to grocery list")
    })

     // .then(() => {
        //     data = result.rows;
        //     console.log("check current customer list for product id")
        //     console.log(result)

        //     const list_ids = data.map((el) => el.list_id)
        //     arr = list_ids;
            // check current customer list for product id
            // if (arr.includes(Number(idItem))) {
            //     res.status(400).send(JSON.stringify('Duplicate product in grocery list'))
            // } else {
            // var createCustomerList = new customer_list({ list_id: idItem, customer_id: customerId })
            // createCustomerList.save((err, resultListCustomer) => {
            //     if (err) {
            //         res.status(500).send('internal server error');
            //     }
            //     addListCustomer(idItem, customerId).then(resu => {
            //         res.status(201).send({
            //             // data: resu.rows
            //         })
            //     })

            // })
            // res.status(201).send({
            //     //             // data: resu.rows
            // })
        // })
            // })
            res.status(201).send(JSON.stringify({ msg: 'add data for customer supposedly added' }))
    // })
}

