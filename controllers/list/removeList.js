const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports = (req, res) => {
    const { customerId } = req.params

    // getDataCustomerId(customerId).then((result) => {
        let data = {};
        // deleteListsCustomer(customerId).then(result => {
            // customer_grocery_list.find({list_id: customerId})
            //     .then((result) => {
            //         data = result.rows;
            //         console.log("retrieving customers grocery list from db to update")
            //         const list_ids = data.map((el) => el.list_id)
                    // customer_grocery_list.deleteMany({ $and: [{ list_id: list_ids, customer_id: customerId }] }).then(elem => {
                    //     res.send({
                    //         data: 'all items deleted'
                    //     })
                    // })
                // })
                // .catch(() => next({ code: 500, msg: 'sorry , found Internal server error when deleting customers grocery list' }))
        // })
    // })

    customer_grocery_list.update({list_id: customerId },{$set:{ grocery_list: [] } }, function(err,list){
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted entire list");
            console.log(list);
        }
    })
}
