const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    list.createCollection({id:Number,product_name:String,product_image:String,product_price:String,sizes:String})
    .then(()=>{
        res.send({
            data:'create table list successfully'
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

