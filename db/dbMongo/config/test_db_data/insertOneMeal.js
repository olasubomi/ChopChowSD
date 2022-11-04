// require('../../../../dotenv').config();
// require('dotenv').config();

// require('../db_connection');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//const { meals, mongoose } = require('../db_buildSchema');
var conn = mongoose.createConnection('mongodb://192.168.1.219:27017/mydb');
meals = conn.model('meals', new Schema({
    id: Number,
    label: String,
    imageSrc: String,
    readTime: String,
    cookTime: String,
    intro: String,
    ingredients: Array,
    products: Array,
    product_slider: [{ ingredient: String, image: String }],
    categories: Array,
    instructions: Array,
    display: Boolean
}));


console.log("Prints something");
const mealObject = {
    "id": 9,
    "label": "Lentil Soup",
    "imageSrc": '/images/meal_pics/lentils.jpg',
    "readTime": "10 mins read",
    "cookTime": "1 hour to prepare",
    "intro": "Lentils are legumes with numerous health benefits. Similar to beans, lentils can be made into a soup with varied textures and bold tastes. Lentils are low calorie, high in irons, folate and an excellent source of protein.  ",
    "ingredients": ["Garri", "Water", "Sugar"],
    "new_ingredient":{
        "Garri":{
        "servings":{
            "quantity": 1,
            "measurements": "Cup(s)"
        }},
        "Water":{
        "servings":{
            "quantity": 1,
            "measurements": "Cup(s)"
        }},
        "Sugar":{
            "servings":{
                "quantity": 1,
                "measurements": "Spoon(s)"
            }}
      
    },
    "products": ["Garri ", "Sugar ", "Water " ],
    "product_slider": [{"ingredient": "Garri", "image": "garri.jpg"}, {"ingredient": "Sugar", "image": "sugar.jpeg"}, {"ingredient": "Water", "image": "water.jpeg"}],
    "quantity":[1,2,1],
    "measurements":["Cup(s)","Cup(s)","Spoon(s)"],
    "instructions": ["Mix Garri and Sugar in a bowl", "Add ice, water and groundnuts as preffered", "Enjoy!"],
    "servings": 1,
    "display": false
    };

meals.create({id:10});

module.exports = async () => {
    const mealObject = {
    "id": 9,
    "label": "Lentil Soup",
    "imageSrc": '/images/meal_pics/lentils.jpg',
    "readTime": "10 mins read",
    "cookTime": "1 hour to prepare",
    "intro": "Lentils are legumes with numerous health benefits. Similar to beans, lentils can be made into a soup with varied textures and bold tastes. Lentils are low calorie, high in irons, folate and an excellent source of protein.  ",
    "ingredients": ["Garri", "Water", "Sugar"],
    "new_ingredient":{
        "Garri":{
        "servings":{
            "quantity": 1,
            "measurements": "Cup(s)"
        }},
        "Water":{
        "servings":{
            "quantity": 1,
            "measurements": "Cup(s)"
        }},
        "Sugar":{
            "servings":{
                "quantity": 1,
                "measurements": "Spoon(s)"
            }}
      
    },
    "products": ["Garri ", "Sugar ", "Water " ],
    "product_slider": [{"ingredient": "Garri", "image": "garri.jpg"}, {"ingredient": "Sugar", "image": "sugar.jpeg"}, {"ingredient": "Water", "image": "water.jpeg"}],
    "quantity":[1,2,1],
    "measurements":["Cup(s)","Cup(s)","Spoon(s)"],
    "instructions": ["Mix Garri and Sugar in a bowl", "Add ice, water and groundnuts as preffered", "Enjoy!"],
    "servings": 1,
    "display": false
    }
    return meals.create(mealObject)
}