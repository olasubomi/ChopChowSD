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
      console.log(error)
      throw error;
    }
  }

  static async deleteMeal(id) {
    try {
      return await createMeal(id);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }


  static async getMeals(page,filter) {
    try {
      return await getMeals(page,filter);
    } catch (error) {
      throw error;
    }
  }

  static async getMeal(id) {
    try {
      return await getMeal(id);
    } catch (error) {
      throw error;
    }
  }

  static async deleteMeal(id) {
    try {
      return await deleteMeal(id);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async updateMeal(filter, payload) {
    try {
      return await updateMeal(filter,payload);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async updateNested(filter, payload) {
    try {
      return await updateMeal(filter,payload);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async getSuggestedMeals(page,filter) {
    try {
      return await getSuggestedMeals(page,filter);
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

  static async addSuggestion(payload) {
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

  static async getAllMealCactegories(filter) {
    try {
      return await getAllCategories(filter);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MealService;
