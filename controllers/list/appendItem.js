const {insertItem } = require('../../dbMongo/queries/insertItem');
module.exports=(req,res)=>{
    insertItem()
    .then((result)=>{
        res.send({
            data:result.rows
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}
