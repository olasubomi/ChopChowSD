const {removeList } = require('../../dbMongo/queries/removeList');
module.exports=(req,res)=>{
    removeList()
    .then((result)=>{
        res.send({
            data:result.rows
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}


