const {
  getCustomerGroceryList,
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  validatePassWord,
  generateAccessTokens,
  generatePasswordResetToken,
  validateToken,
  findUser,
} = require("./user.js");
const {
  getMeals,
  getMeal,
  createMeal,
  getSuggestedMeals,
  removeSuggestedMeal,
  createMealFromSuggestion,
  addMealSuggestion,
  updateSuggestedMealItem,
  deleteMeal,
  updateMeal,
} = require("./meal");

const {
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct
} = require("./product");

const {
  getAllCategories,
  getStoreCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory
} = require("./category");
const {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
}= require('./store');

module.exports = {
  getCustomerGroceryList,
  findUser,
  createUser,
  generateAccessTokens,
  validatePassWord,
  generatePasswordResetToken,
  updateUser,
  deleteUser,
  findUsers,
  validateToken,
  getMeals,
  getMeal,
  getSuggestedMeals,
  removeSuggestedMeal,
  createMealFromSuggestion,
  addMealSuggestion,
  updateSuggestedMealItem,
  getAllCategories,
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  createMeal,
  deleteMeal,
  updateMeal,
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
};
