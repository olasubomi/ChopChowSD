const {
  getMealsCount,
  getProductsCount,
  getUsersCount,
  getCategoriesCount,
  getSuppliersCount,
  getOrdersCount,
  getMeasurementsCount,
  getGroceryListsCount,
} = require("../repository/index");

const { percentageCalculator } = require("../utils/helpers");

class AnalyticsService {
  static async getMealsCount(filter) {
    try {
      const mealsCount = await getMealsCount(filter);

      const percentage = percentageCalculator(
        mealsCount.docCount,
        mealsCount.totalCount
      );

      return { ...mealsCount, percentage };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getProductsCount(filter) {
    try {
      const productCount = await getProductsCount(filter);

      const percentage = percentageCalculator(
        productCount.docCount,
        productCount.totalCount
      );

      return { ...productCount, percentage };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getUsersCount(filter) {
    try {
      const userCount = await getUsersCount(filter);

      const percentage = percentageCalculator(
        userCount.docCount,
        userCount.totalCount
      );

      return { ...userCount, percentage };
    } catch (error) {
      throw error;
    }
  }

  static async getCategoriesCount(filter) {
    try {
      const categoriesCount = await getCategoriesCount(filter);
      const percentage = percentageCalculator(
        categoriesCount.docCount,
        categoriesCount.totalCount
      );
      return { ...categoriesCount, percentage };
    } catch (error) {
      throw error;
    }
  }

  static async getSuppliersCount(filter) {
    try {
      const suppliersCount = await getSuppliersCount(filter);

      const percentage = percentageCalculator(
        suppliersCount.docCount,
        suppliersCount.totalCount
      );

      return { ...suppliersCount, percentage };
    } catch (error) {
      throw error;
    }
  }

  static async getOrdersCount(filter) {
    try {
      const orderCount = await getOrdersCount(filter);

      const percentage = percentageCalculator(
        orderCount.docCount,
        orderCount.totalCount
      );

      return { ...orderCount, percentage };
    } catch (error) {
      throw error;
    }
  }

  static async getMeasurementsCount(filter) {
    try {
      const measurementCount = await getMeasurementsCount(filter);

      const percentage = percentageCalculator(
        measurementCount.docCount,
        measurementCount.totalCount
      );

      return { ...measurementCount, percentage };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AnalyticsService;
