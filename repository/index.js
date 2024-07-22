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
} = require("./meal.js");

const {
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require("./product.js");

const {
  createGroceryList,
  validateGroceryUser,
  findAllUserGroceryList,
  validateGroceryItem,
  addItemToList,
  createNewList,
  getGroceryList,
} = require("./grocery.js");

const { createItems, updateItem, getOneUserItem } = require("./item.js");




const {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
} = require("./category.js");

// const {
//   getAllDescriptions,
//   createDescription,
//   updateDescription,
//   getDescription,
//   deleteDescription,
// } = require("./description");


const {
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
  getAllSupplierByAddress,
  getAllStoresForUser,
  checkStoreAvailability
} = require("./store.js");

const {
  getMealsCount,
  getProductsCount,
  getUsersCount,
  getCategoriesCount,
  getSuppliersCount,
  getOrdersCount,
  getMeasurementsCount,
  getGroceryListsCount,
  getInventoriesCount,
} = require("./analytics.js");

const {
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
  createInventory,
  allUserInventory
} = require("./inventory.js");



const {
  createComment,
  createCommentReply,
  updateComment,
  getItemComments,
  getComment,
  deleteComment,
  getItemCommentsCount,
  upVoteComment,
  downVoteComment,
  getAllUserComment
} = require("./comment.js")

const { createMeasurement } = require("./measurement.js");

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
  // getAllDescriptions,
  // createDescription,
  // updateDescription,
  // getDescription,
  // deleteDescription,
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  createItems,
  createGroceryList,
  validateGroceryUser,
  findAllUserGroceryList,
  validateGroceryItem,
  addItemToList,
  updateItem,
  getOneUserItem,
  createNewList,
  getGroceryList,
  createMeal,
  deleteMeal,
  updateMeal,
  getAllStores,
  createStore,
  updateStore,
  getStore,
  deleteStore,
  getMealsCount,
  getProductsCount,
  getUsersCount,
  getCategoriesCount,
  getSuppliersCount,
  getOrdersCount,
  getMeasurementsCount,
  getGroceryListsCount,
  getInventoriesCount,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
  createInventory,
  createMeasurement,
  createCategory,
  createComment,
  createCommentReply,
  updateComment,
  getItemComments,
  getComment,
  deleteComment,
  getItemCommentsCount,
  upVoteComment,
  downVoteComment,
  getAllUserComment,
  getAllSupplierByAddress,
  getAllStoresForUser,
  checkStoreAvailability,
  allUserInventory
};
