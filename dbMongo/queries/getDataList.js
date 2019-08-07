const {grocery_listItem} = require('../config/db_buildSchema') 

const {getDataCustomer} = require('../../dbPostgress/queries/getDataCustomer')
const {getDataCustomerId} = require('../../dbPostgress/queries/getDataCustomerId')
exports.grocery_listItem = () => {
  getDataCustomer().then(resultCustomer=>{
    getDataCustomerId(resultCustomer.rows[0].grocery_listitem_id).then((result) => {
            let data = {};
            data = result.rows[1];
            grocery_listItem.find({_id: data.grocery_listitem_id})
            .then(resList=>console.log(resList))// data from list that it spcail of this customer
        })})
        .catch(err=>console.log(err))
      }

      

