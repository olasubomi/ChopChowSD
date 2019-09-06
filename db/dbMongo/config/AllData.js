const { list } = require('./db_buildSchema');
module.exports = async () => {
    const allDataList = [
        {
            id:1,
            product_name: "Ijebu Garri",
            product_image: 'garri.jpg',
            product_price: 8.99,
            sizes: '50lbs',
            price_per_ounce:null
        }, {
            id:2,
            product_name: "Brown Beans",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            price_per_ounce: 3.2,
        }, {
            id:3,
            product_name: "Honey Beans",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            price_per_ounce: 3.2
        }, {
            id:4,
            product_name: null,
            product_image: null,
            product_price:null,
            sizes: null,
            price_per_ounce:null
        },
        {
            id:5,
            product_name: "Kale",
            product_image: 'garri.jpg',
            product_price: 2.99,
            sizes: '0.5lbs',
            price_per_ounce:null
        },
        {
            id:6,
            product_name: "Oregano",
            product_image: 'oregano.jpg',
            product_price: 1.00,
            sizes: '1lbs',
            price_per_ounce:null
        },
        {
            id:7,
            product_name: "Squash Potatoes",
            product_image: 'red_potatoes.jpg',
            product_price: 8.99,
            sizes: '50lbs',
            price_per_ounce:null
        },
        {
            id:8,
            product_name: "Water",
            product_image: 'garri.jpg',
            product_price: 8.99,
            sizes: '50lbs',
            price_per_ounce:null
        }, {
            id:9,
            product_name: "Plantain Chips",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            price_per_ounce: 3.2
        }, {
            id:10,
            product_name: "Cashews",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            price_per_ounce: 3.2
        }, {
            id:11,
            product_name: "Peanuts",
            product_image: 'garri.jpg',
            product_price: 8.99,
            sizes: '50lbs'
        }, {
            id:12,
            product_name: "Watermelon",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            pric3_per_ounce: 3.2
        }, {
            id:13,
            product_name: "Pineapple",
            product_image: 'beans.jpeg',
            product_price: 12.00,
            sizes: '2 lbs',
            price_per_ounce: 3.2
        }
       
    ]

    return list.create(allDataList)
}

