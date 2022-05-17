const { getMeals,getAllCategories,getSuggestedMeals,getMealImages ,removeSuggestedMeal,createMealFromSuggestion,addMealSuggestion,updateSuggestedMealItem} = require("../repository/index");

class MealService {
  async getMeals() {
    try {
      const meals = await getMeals();
      return meals;
    } catch (error) {
      throw error;
    }
  }


  async getSuggestedMeals() {
    try {
      const suggestedMeals = await getSuggestedMeals();
      return suggestedMeals;
    } catch (error) {
      throw error;
    }
  }

  async getSuggestedMealImages() {
    try {
      const mealImages = await getMealImages();
      return mealImages;
    } catch (error) {
      throw error;
    }
  }

  async deleteSuggestedMeal (suggestedMealID){
    try {
        const deleteMeal = await removeSuggestedMeal(suggestedMealID);
        return deleteMeal;
      } catch (error) {
        throw error;
      }
  }

  async createMealFromSuggestedMeals (suggestedMealID){
    try {
        const createMeals = await createMealFromSuggestion(suggestedMealID);
        return createMeals;
      } catch (error) {
        throw error;
      }
  }

  async addMealSuggestion (file,payload){
    try {
        const mealSuggestions = await addMealSuggestion(file,payload);
        return mealSuggestions;
      } catch (error) {
        throw error;
      }
  }

  async updateMealSuggestion (payload){
    try {
        const updateSuggestions = await updateSuggestedMealItem(payload);
        return updateSuggestions;
      } catch (error) {
        throw error;
      }
  }


  async getAllMealCactegories (){
    try {
        const allMealCategories = await getAllCategories();
        return allMealCategories;
      } catch (error) {
        throw error;
      };
  }

}

module.exports = MealService;
