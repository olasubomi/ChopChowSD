const {
  getMeals,
  getMeal,
  getAllCategories,
  createMeal,
  deleteMeal,
  updateMeal,
  createCategory,
  createProduct,
  createMeasurement,
} = require("../repository/index");

class MealService {
  static async createMeal(payload) {
    try {
      if (payload?.meal_categories) {
        
        JSON.parse(payload?.meal_categories)?.map((category) => {
          createCategory({
            category_name: category,
            category_type: "meal",
            affiliated_objects: "MEAL",
          });
        });
      }
      if (payload?.kitchen_utensils) {
        JSON.parse(payload.kitchen_utensils)?.map((utensil) => {
          createProduct({
            product_name: utensil,
            product_type: "Utensil",
          });
        });
      }

      if (payload?.formatted_ingredients) {
        JSON.parse(payload.formatted_ingredients)?.map((ingredient) => {
          // ingredient = JSON.parse(ingredient);
          createProduct({
            product_name: ingredient,
            product_type: "Ingredient"
          })
          // createProduct({ ...ingredient, product_type: "Ingredient" });
          if (ingredient?.measurement) {
            createMeasurement({ measurement_name: ingredient?.measurement });
          }
        });
      }

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

  static async createCategories(payload) {
    try {
      createCategory(payload);
    } catch (error) {
      throw error;
    }
  }

  static createUtensils(filter) {
    try {
      getAllCategories(filter);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MealService;
