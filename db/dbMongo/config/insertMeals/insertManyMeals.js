const { meals } = require('../db_buildSchema');

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

    console.log("const meal object created");
    return meals.create(mealObject)
}