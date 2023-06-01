const { Response } = require("http-status-codez");
const MealService = require("../../services/MealService");

const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
  getMeals: async (req, res) => {
    try {
      const meals = await MealService.getMeals(
        req.params.page,
        req.query || {}
      );
      if (meals) {
        res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(meals));
      } else {
        throw meals;
      }
    } catch (error) {
      return res.json(new ErrorResponse(error));
    }
  },

  getSingleMeal: async (req, res) => {
    try {
      const meal = await MealService.getMeal(req?.params?.mealId);
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

  createMeal: async (req, res) => {
    req.body.user = req.decoded.id;
    try {
      
      const createMeal = await MealService.createMeal(req.body);
      if (createMeal) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(createMeal));
      } else {
        throw createMeal;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const removeMeal = await MealService.deleteMeal(req.params.mealId);
      if (removeMeal) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(removeMeal));
      } else {
        throw removeMeal;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateMeal: async (req, res) => {
    try {
      const updateMeal = await MealService.updateMeal(
        { _id: req.params.mealId } || req.query,
        req.body
      );
      if (updateMeal) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(updateMeal));
      } else {
        throw updateMeal;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  updateNestedMealValue: async (req, res) => {
    try {
      const nestedUpdate = await MealService.updateNested(
        { _id: req.params.mealId } || req.query,
        req.body
      );
      if (updateMeal) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(updateMeal));
      } else {
        throw updateMeal;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  getMealCategories: async (req, res) => {
    try {
      const mealCategories = await MealService.getAllMealCactegories(req.query);
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
