const { list } = require('../../dbMongo/config/db_buildSchema')

const { getDataCustomer } = require('../../dbPostgress/queries/getDataCustomer')
const { getDataCustomerId } = require('../../dbPostgress/queries/getDataCustomerId')

exports.getList = (req, res) => {

    getDataCustomer().then(resultCustomer => {
        getDataCustomerId(resultCustomer.rows[0].listid).then((result) => {
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


