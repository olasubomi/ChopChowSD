const { all_meal_categories } = require('../db_buildSchema');
module.exports = async () => {
    console.log("populating categories");
    const populateCategories = [
        {
            id: 1,
            category_name: "snacks"
        },
        {
            id: 2,
            category_name: "vegeterian"
        },
        {
            id: 3,
            category_name: "african"
        }
    ]
    return all_meal_categories.create(populateCategories)
}
