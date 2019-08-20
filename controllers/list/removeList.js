const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    list.collection.drop()
    .then(()=>{
        res.send({
            data:'delete table list successfully'
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

