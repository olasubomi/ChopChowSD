const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')

module.exports=(req,res)=>{
    const { customerId } = req.params   

    list.remove({id:customerId})
    .then(()=>{
        res.send({
            data:'delete successfully'
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

