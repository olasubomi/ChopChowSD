const {grocery_listItem} = require('../../dbMongo/queries/getDataList')

module.exports=(req,res)=>{
    grocery_listItem()
    .then((resList)=>{
        res.send({
            data:resList.rows
        })
        .catch(()=>next({code: 500 , msg:'internal server error'}))
    })
}
