const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    const {customerId} = req.params;
    console.log(11111,req.params);
    
    list.remove({id:customerId})
    .then(()=>{
        res.send({
            data:'delete successfully',
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}
