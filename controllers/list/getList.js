const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList = (req, res) => {
    const { customerId } = req.params   
    getDataCustomerId(customerId).then((result) => {
        console.log(2222,result.rows[0]);
        let data = {};
        data = result.rows;
        for(let i=0 ; i<=data.length-1;i++){
            console.log(1414,data[i].list_id);
            // return list.find()
            list.find({id:data[i].list_id})
                .then(resList => {

        for(let i=0 ; i<=resList.length-1;i++){
                    
                    console.log(3333,resList[i]);
                    // res.end()
                    res.send({
                        data: resList[i]
                    })
                }
                })// data from list that it spcial of this customer
                
            // .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
        }
        // res.end()
        
    })

}
