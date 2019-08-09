const {createItem } = require('../../dbMongo/queries/createItem');
module.exports=(req,res)=>{
    createItem()
    .then((result)=>{
        res.send({
            data:result.rows
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

