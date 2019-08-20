const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    const {inputId,inputProductName,inputProductImage,inputProductPrice,inputSize} = req.body;
    list.insertMany({id:inputId , product_name:inputProductName, product_image:inputProductImage,product_price:inputProductPrice,sizes:inputSize})
    .then((result)=>{
        res.status(200).send({
            data:result[0]
        })
        .catch(()=>next({code:500,msg:'internal server error'}))
    })
}
