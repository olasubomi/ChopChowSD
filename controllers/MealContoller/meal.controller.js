const { Response } = require("http-status-codez");
const MealService = require("../../services/MealService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  getMeals: async (req, res) => {
    try {
      const meals = await  MealService.getMeals();
      if (meals) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(meals));
      } else {
        throw meals;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getSingleMeal: async (req, res) => {
    try {
      const meal = await  MealService.getMeal(req?.params?.id);
      if (meal) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(meal));
      } else {
        throw meal;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getSuggestedMeals: async (req, res) => {
    try {
      const suggestedMweals = await  MealService.getSuggestedMeals();
      if (suggestedMweals) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(suggestedMweals));
      } else {
        throw suggestedMweals;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getSuggestedMealImages: async (req, res) => {
    try {
      const suggestedMealImages =
        await  MealService.getSuggestedMealImages();
      if (suggestedMealImages) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(suggestedMealImages));
      } else {
        throw suggestedMealImages;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  removeSuggestedMealItem: async (req, res) => {
    try {
      const { suggestedMealID } = req.params;
      const deleteSuggestedMeal = await MealService.deleteSuggestedMeal(
        suggestedMealID
      );
      if (deleteSuggestedMeal) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(deleteSuggestedMeal));
      } else {
        throw deleteSuggestedMeal;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
  createMealFromSuggestedMeals: async (req, res) => {
    try {
      const { data_ids } = req.body;
      console.log('from create suggestion')
      console.log({body:req.body})
      const createMeals = await MealService.createMealFromSuggestedMeals(
        data_ids
      );
      if (createMeals) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(createMeals));
      } else {
        throw createMeals;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  addMealSuggestion: async (req, res) => {
    try {
      const suggestions = await MealService.addSuggestion(
        req.files["mealImage"],
        req.body
      );
      if (suggestions) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(suggestions));
      } else {
        throw suggestions;
      }
    } catch (error) {
      console.log(error)
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateSuggestedMealItem: async (req, res) => {
    try {
      const updateSuggestions = await MealService.updateMealSuggestion(
        req.body
      );  
      if (updateSuggestions) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(updateSuggestions));
      } else {
        throw updateSuggestions;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getMealCategories: async (req, res) => {
    try {
      const mealCategories = await MealService.getAllMealCactegories();
      if (mealCategories) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(mealCategories));
      } else {
        throw mealCategories;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },
};
