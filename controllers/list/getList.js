const { list } = require('../../dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../dbPostgress/queries/getDataCustomerId')
const {sign} = require('jsonwebtoken')
exports.getList = (req, res) => {
    const { customerId } = req.params
    if(customerId){
     const tokenCustomer =   sign(customerId,process.env.SECRET);
    res.cookie('JWTcustomerId',tokenCustomer,{
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
      });   
    }else{
        res.status(401).send(JSON.stringify({msg:'you not authrized in this page'}))
    }
    

    getDataCustomerId(customerId).then((result) => {
        let data = {};
        data = result.rows[0];
        return list.find({ id: data.listid })
            .then(resList => {
                res.send({
                    data: resList
                })

            })// data from list that it spcial of this customer

        .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
    })

}
