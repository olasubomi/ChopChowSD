const { list } = require('./db_buildSchema');
// import g from '../../../client/build/images/products/'
module.exports = async () => {
    const allDataList = [
        {
            id:1,
            product_name: "Ijebu Garri",
            product_image: 'butter.jpg',
            product_price: 8.99,
            sizes: ["50lbs"]
        }, {
            id:2,
            product_name: "Brown Beans",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }, {
            id:3,
            product_name: "Honey Beans",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }, {
            id:4,
            product_name: "Spinach",
            product_image: 'butter.jpg',
            product_price: 2.99,
            sizes: ["0.5lbs"]
        },
        {
            id:5,
            product_name: "Kale",
            product_image: 'butter.jpg',
            product_price: 2.99,
            sizes: ["0.5lbs"]
        }, {
            id:6,
            product_name: "Apples",
            product_image: 'butter.jpg',
            product_price: 2.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        },
        {
            id:6,
            product_name: "Blueberries",
            product_image: 'butter.jpg',
            product_price: 1.00,
            sizes: ["1lbs"]
        },
        {
            id:7,
            product_name: "Squash Potatoes",
            product_image: 'butter.jpg',
            product_price: 8.99,
            sizes: ["50lbs"]
        },
        {
            id:8,
            product_name: "Water",
            product_image: 'butter.jpg',
            product_price: 8.99,
            sizes: ["50lbs"]
        }, {
            id:9,
            product_name: "Plantain Chips",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }, {
            id:10,
            product_name: "Cashews",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }, {
            id:11,
            product_name: "Peanuts",
            product_image: 'butter.jpg',
            product_price: 8.99,
            sizes: ["50lbs"]
        }, {
            id:12,
            product_name: "Watermelon",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }, {
            id:13,
            product_name: "Pineapple",
            product_image: 'butter.jpg',
            product_price: 12.00,
            sizes: ["2 lbs"],
            price_per_ounce: 3.2
        }
       
    ]

    return list.create(allDataList)
}

