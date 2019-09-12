const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')



module.exports = (req, res) => {
    const { customerId } = req.params

    // getDataCustomerId(customerId).then((result) => {
        let data = {};
        list.find({})
            .then(result => {
              let arrIdsLists=[]
              result.map(resItem=>{
                arrIdsLists.push(resItem.id)
                
            })
            console.log(6666,arrIdsLists);
                        res.send({
                                data:arrIdsLists
                            })

            })
    
}
