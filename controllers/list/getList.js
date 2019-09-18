
const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList =  (req, res) => {
    const { customerId } = req.params
    getDataCustomerId(customerId).then((result) => {
       console.log(2222, result.rows);
       let data = {};
       list.find({})
           .then((r) => {
               console.log(5555,r);
               
               data = result.rows;
               const list_ids = data.map((el) => el.list_id)
               console.log({ list_ids });
               list.find( { id: { $in: list_ids} } )
                   .then(result => {

                       res.send({
                           data:result
                       })
                   })
                   .catch(err => console.log(err))
           })
       })
    }

