const {createItem } = require('../../dbMongo/queries/createList');
module.exports=(req,res)=>{
    createItem()
    .then((result)=>{
        res.send({
            data:result.rows
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}

