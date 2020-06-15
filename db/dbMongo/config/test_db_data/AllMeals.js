const { meals } = require('../db_buildSchema');
module.exports = async () => {
    const recreateAllMeals = [
        {
            list_id: 1,
            grocery_list: [1,2,3,4,5,6,7,8]
        }
    ]
    return meals.create(recreateAllMeals)
}
