const { list } = require('./db_buildSchema');
console.log(7777777777);

module.exports = async () => {
    console.log(1111111111111111);
    
    const allDataList = [
        {
            product_name: "Ijebu Garri",
            product_image: '/images/products/garri.jpg',
            product_price: 8.99,
            sizes:["50lbs"]
        },
        {
            product_name: "Ijebuhhhh Garri",
            product_image: '/images/products/garri.jpg',
            product_price: 88.99,
            sizes:["50nnlbs"]
        }
    ];
    return list.create(allDataList)
}
