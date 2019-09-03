const { list } = require('../../db/dbMongo/config/db_buildSchema')

module.exports=(req,res)=>{
    console.log('dddddddd', req.body)
    var listInsert= new list(req.body)
    listInsert.save(function (err, book) {
        if (err) return console.error(err);
        // console.log('kkkkkk');
        res.status(200).send({
                    data:'add successfully'
                })
      });
    // const {inputId,inputProductName,inputProductImage,inputProductPrice,inputSize} = req.body;
    // list.insertMany({id:inputId , product_name:inputProductName, product_image:inputProductImage,product_price:inputProductPrice,sizes:inputSize})
    // list.insertOne(req.body)
    // .then(()=>{
        
    //     res.status(200).send({
    //         data:'add successfully'
    //     })
    //     .catch(()=>next({code:500,msg:'internal server error'}))
    // })
}
