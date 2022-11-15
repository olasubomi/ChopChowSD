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
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory
} = require("./category");

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
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  createMeal,
  deleteMeal,
  updateMeal
};
