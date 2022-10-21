const {
  getMeals,
  getMeal,
  getAllCategories,
  getSuggestedMeals,
  removeSuggestedMeal,
  createMealFromSuggestion,
  createMeal,
  addMealSuggestion,
  updateSuggestedMealItem,
  deleteMeal,
  updateMeal,
} = require("../repository/index");

class MealService {
  static async createMeal(payload) {
    try {
      return await createMeal(payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMeals(page, filter) {
    try {
      return await getMeals(page, filter);
    } catch (error) {
      throw error;
    }
  }

  static async getMeal(filter) {
    try {
      return await getMeal(filter);
    } catch (error) {
      throw error;
    }
  }

  static async deleteMeal(id) {
    try {
      return await deleteMeal(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateMeal(filter, payload) {
    try {
      const meal = await getMeal(filter);

      if (payload.formatted_ingredients) {
        payload.formatted_ingredients = meal.formatted_ingredients.concat(
          payload.formatted_ingredients
        );
      }

      if (payload.formatted_instructions) {
        payload.formatted_instructions = meal.formatted_instructions.concat(
          payload.formatted_instructions
        );
      }

      return await updateMeal(filter, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateNested(filter, payload) {
    try {
      return await updateMeal(filter, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllMealCactegories(filter) {
    try {
      return await getAllCategories(filter);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MealService;
