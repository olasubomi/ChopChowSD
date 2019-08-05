const getTableCustomer = require('../../dbPostgress/queries/getDataCustomer')
module.exports=(req,res)=>{
    getTableCustomer()
    .then((result)=>{
        res.send({
            data:result.rows
        })
        .catch(()=>next({code: 500 , msg:'internal server error'}))
    })
}
