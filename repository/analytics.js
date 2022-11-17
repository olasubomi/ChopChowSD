const {
  meals,
  products,
  categories,
  User,
  Supplier,
  Order,
  Measurement,
} = require("../db/dbMongo/config/db_buildSchema");

exports.getMealsCount = async (filter) => {
  try {
    const totalCount = await meals.countDocuments();
    const docCount = await meals.countDocuments(filter);
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get meals count failed",
      code: 500,
    };
  }
};

exports.getProductsCount = async (filter) => {
  try {
    const totalCount = await products.countDocuments();
    const docCount = await products.countDocuments(filter);
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get products count failed",
      code: 500,
    };
  }
};

exports.getUsersCount = async (filter) => {
  try {
    const totalCount = await User?.countDocuments();
    const docCount = await User?.countDocuments(filter);
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get users count failed",
      code: 500,
    };
  }
};

exports.getCategoriesCount = async (filter) => {
  try {
    const totalCount = await categories.countDocuments();
    const docCount = await categories.countDocuments(filter);
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get category count failed",
      code: 500,
    };
  }
};

exports.getSuppliersCount = async (filter, payload) => {
  try {
    const docCount = await Supplier.countDocuments(filter);
    const totalCount = await Supplier.countDocuments();
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get supliers count failed",
      code: 500,
    };
  }
};

exports.getOrdersCount = async (filter) => {
  try {
    const docCount = await Order.countDocuments(filter);
    const totalCount = await Order.countDocuments();
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get orders count failed",
      code: 500,
    };
  }
};

exports.getMeasurementsCount = async (filter) => {
  try {
    console.log({ filter });

    const docCount = await Measurement.countDocuments(filter);
    console.log({ docCount });
    const totalCount = await Measurement.countDocuments();
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get measurement count failed",
      code: 500,
    };
  }
};

exports.getGroceryListsCount = async (filter) => {
  try {
    const docCount = await Grocery_list.countDocuments(filter);
    const totalCount = await Supplier.countDocuments();
    return { totalCount, docCount };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      message: error.message || "get groceryList count failed",
      code: 500,
    };
  }
};
