const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { customer_list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')



module.exports=(req,res)=>{
    const {customerId} = req.params

     getDataCustomerId(customerId).then((result) => {
        console.log(2222, result.rows);
        let data = {};
        list.find({})
            .then(() => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                console.log({ list_ids });
    customer_list.deleteMany({$and: [{list_id:list_ids, customer_id: customerId}]}).then(elem=>{
        res.send({
                    data:'delete all items'
                })
                .catch(err=>console.log(err)
                )

                // list.find( { id: { $in: list_ids} } )
                //     .then(result => {
                        
                //         res.send({
                //             data:result
                //         })
                //     })
                //     .catch(err => console.log(err))
            }).catch(err => console.log(err))
        })
    // customer_list.deleteMany({$and: [{list_id:itemId, customer_id: customerId}]}).then(elem=>{
    //     res.send({
    //         data:'delete all items'
    //     })
    // })
    // .catch(err=>console.log(err)
    // )


    // customer_list.deleteMany({customer_id: customerId})
    // .then(()=>{
    //     res.send({
    //         data:'delete successfully',
    //     })
        // .catch(()=>next({code:500,msg:'internal server error'}))
    // })
})
}
