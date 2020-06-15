const { all_meal_categories } = require("../db_buildSchema");
module.exports = async () => {
  console.log("populating categories");
  const populateCategories = [
    {
      id: 1,
      category_name: "snacks",
    },
    {
      id: 2,
      category_name: "vegeterian",
    },
    {
      id: 3,
      category_name: "african",
    },
    {
      id: 4,
      category_name: "cloves",
    },
  ];
  return all_meal_categories.create(populateCategories);
};
