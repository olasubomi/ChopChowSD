const { list } = require('../../db/dbMongo/config/db_buildSchema')
module.exports=(req,res)=>{
const {option} = req.params;
    list.find({product_name:option})
    .then(result=>{
        res.send({
            data:result
        })       
    })
}