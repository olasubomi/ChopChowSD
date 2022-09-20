const { createCustomer , updateCustomerPasswordToken,resetCustomerPassword, deleteCustomerUsingEmail,getCustomerGroceryList} = require('./user.js');
const {getMeals,getSuggestedMeals,getMealImages,removeSuggestedMeal,createMealFromSuggestion,addMealSuggestion,updateSuggestedMealItem,getAllCategories} = require('./meal');

const {getAllProducts,readImages,readImage,getStoreProducts} = require('./product');

module.exports ={
    createCustomer,
    updateCustomerPasswordToken,
    resetCustomerPassword,
    deleteCustomerUsingEmail,
    getCustomerGroceryList,
    getMeals,
    getSuggestedMeals,
    getMealImages,
    removeSuggestedMeal,
    createMealFromSuggestion,
    addMealSuggestion,
    updateSuggestedMealItem,
    getAllCategories,
    getAllProducts,
    readImages,
    readImage,
    getStoreProducts,
}
