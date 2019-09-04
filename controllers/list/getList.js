const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList = (req, res) => {
    const { customerId } = req.params   
    getDataCustomerId(customerId).then((result) => {
        console.log(444,result.rows);
        
        let data = {};
        data = result.rows;
        for(let i =0 ; i<=data.length;i++){
            console.log(5566,data[1]);
            
            return list.find({ id: data[i].list_id })
                .then(resList => {
                    
                    console.log(55555,resList);
                    for(let v=0; v<=resList.length;v++){
                        console.log(2222211,resList);
                        
                    }
                    // res.send({
                    //     data: resList
                    // })
    
                 })// data from list that it spcial of this customer
    
             .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
        }
    })

 }
