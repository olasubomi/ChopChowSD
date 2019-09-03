const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    const {listId, customerId} = req.params;
    console.log(11111,req.params);
    
    list.remove({$and: [{id:listId, cusomerId: customerId}]})
    .then(()=>{
        res.send({
            data:'delete successfully',
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}