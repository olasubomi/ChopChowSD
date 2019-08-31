const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList = (req, res) => {
    const { customerId } = req.params   
    getDataCustomerId(customerId).then((result) => {
        console.log(444,result.rows);
        
        let data = {};
        data = result.rows[0];
        return list.findOne({ id: data.listid })
            .then(resList => {
                console.log(55555,resList);
                
                res.send({
                    data: resList
                })

             })// data from list that it spcial of this customer

         .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
    })

 }
