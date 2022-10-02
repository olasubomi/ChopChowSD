const {
  getMeals,
  getMeal,
  getAllCategories,
  getSuggestedMeals,
  getMealImages,
  removeSuggestedMeal,
  createMealFromSuggestion,
  addMealSuggestion,
  updateSuggestedMealItem,
} = require("../repository/index");

class MealService {
  static async getMeals() {
    try {
      const meals = await getMeals();
      return meals;
    } catch (error) {
      throw error;
    }
  }

  static async getMeal(id) {
    try {
      const meal = await getMeal(id);
      return meal;
    } catch (error) {
      throw error;
    }
  }

  static async getSuggestedMeals() {
    try {
      const suggestedMeals = await getSuggestedMeals();
      return suggestedMeals;
    } catch (error) {
      throw error;
    }
  }

  static async getSuggestedMealImages() {
    try {
      const mealImages = await getMealImages();
      return mealImages;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSuggestedMeal(suggestedMealID) {
    try {
      const deleteMeal = await removeSuggestedMeal(suggestedMealID);
      return deleteMeal;
    } catch (error) {
      throw error;
    }
  }

  static async createMealFromSuggestedMeals(suggestedMealID) {
    try {
      const createMeals = await createMealFromSuggestion(suggestedMealID);
      return createMeals;
    } catch (error) {
      throw error;
    }
  }

  static async addSuggestion(file, payload) {
    try {
      return await addMealSuggestion(file, payload);
    } catch (error) {
      throw error;
    }
  }

  static async updateMealSuggestion(payload) {
    try {
      return await updateSuggestedMealItem(payload);
    } catch (error) {
      throw error;
    }
  }

  static async getAllMealCactegories() {
    try {
      return await getAllCategories();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MealService;
