const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    const {itemId} = req.params;
    console.log(11111,req.params);
    
    list.remove({id:itemId})
    .then(()=>{
        res.send({
            data:'delete successfully',
            id:itemId
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

