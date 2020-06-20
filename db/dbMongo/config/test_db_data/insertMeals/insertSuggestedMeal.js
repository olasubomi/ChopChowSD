const { suggested_meals } = require("../../db_buildSchema");

module.exports = async () => {
  const mealObject = {
    label: "Lentil Soup",
    imageSrc: "/images/meal_pics/lentils.jpg",
    readTime: "10 mins read",
    cookTime: "1 hour to prepare",
    intro:
      "Lentils are legumes with numerous health benefits. Similar to beans, lentils can be made into a soup with varied textures and bold tastes. Lentils are low calorie, high in irons, folate and an excellent source of protein.  ",
    newer_ingredient_format: [
      {
        product: "Garri",
        quantity: 1,
        measurement: "Cup(s)",
        image: "",
      },
      {
        product: "Water",
        quantity: 1,
        measurement: "Spoon(s)",
        image: "",
      },
      {
        product: "Sugar",
        quantity: 1,
        measurement: "Spoon(s)",
        image: "",
      },
    ],
    instructions: [
      "Mix Garri and Sugar in a bowl",
      "Add ice, water and groundnuts as preffered",
      "Enjoy!",
    ],
    categories: ["vegetarian", "beans", "continental"],
    servings: 1,
    display: false,
  };

  console.log("const meal object created");
  return suggested_meals.create(mealObject);
};
