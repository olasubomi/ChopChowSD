const { list } = require('../../dbMongo/config/db_buildSchema')

const { getDataCustomer } = require('../../dbPostgress/queries/getDataCustomer')
const { getDataCustomerId } = require('../../dbPostgress/queries/getDataCustomerId')
const {genCookieCustomer} = require('../authuntication/genCookieCustomer'); 
exports.getList = (req, res) => {

    getDataCustomer().then(resultCustomer => {

        getDataCustomerId(resultCustomer.rows[0].listid).then((result) => {
            if(result){
                const {customerId} = req.params
                console.log(8888888888888);
                
                genCookieCustomer(customerId).then((token)=>{
                    console.log(6666666666666666);
                    
                    res.cookie('customerId',token,{ maxAge: 60 * 60 * 60 });
                    res.json('done')
                }).catch(err=>console.log(err)
                )
            }
            let data = {};
            data = result.rows[0];
            return list.find({ id: data.listid })
                .then(resList => {
                    res.send({
                        data: resList
                    })

                })// data from list that it spcail of this customer
        })
    })
        .catch(err => console.log(err))
}


