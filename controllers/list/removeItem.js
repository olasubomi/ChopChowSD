const { customer_grocery_list } = require('../../db/dbMongo/config/db_buildSchema')
// const {deleteListCustomer} = require('../../db/dbPostgress/queries/list/deleteListCustomer')
module.exports = (req, res) => {
    const { idItem, customerId } = req.params
    // deleteListCustomer(customerId,idItem).then(result=>{
        customer_grocery_list.update({list_id: customerId},{ $pull : { grocery_list: Number(idItem) }})
        .then(() => {
            res.send({
                data: 'item deleted'
            })
        })
        .catch(() => next({ code: 500, msg: 'sorry , found Inernal server error when deleting items in grocery list' }))
}
