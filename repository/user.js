const jwt = require("jsonwebtoken");
const {
  grocery_list,
  products,
  User,
} = require("../db/dbMongo/config/db_buildSchema");
const { cart } = require("../model/cart")

const createUser = async (payload) => {
  const newUser = await User.create(payload);

  try {
    if (newUser) {
      await grocery_list.create({
        user: newUser._id,
        products: [],
      });

      // await cart.create({
      //   user: newUser._id,
      //   total: "0",
      // });
    }
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (filter, data) => {
  try {
    return await User.findOneAndUpdate(filter, data, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await User.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findUser = async (filter) => {
  try {
    return await User.findOne(filter).populate('notifications')
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findUsers = async (filter, page) => {
  const limit = 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  try {
    const docCount = await User.countDocuments(filter);

    if (docCount < skip) {
      skip = (page - 1) * limit;
    }
    return await User.find(filter).limit(limit).skip(skip);
  } catch (error) {
    throw error;
  }
};

const validatePassWord = async (email, password) => {
  try {
    const user = await findUser({ email: email });
    console.log("line 75", password)
    return await user.comparePassword(password);
  } catch (error) {
    throw error;
  }
};

const generateAccessTokens = async (payload) => {
  try {
    const user = await findUser({ email: payload.email });
    return await user.generateAccessTokens(payload);
  } catch (error) {
    throw error;
  }
};

const generateRefreshTokens = async (payload) => {
  try {
    const user = await findUser({ email: payload.email });
    return await user.generateRefreshTokens(payload);
  } catch (error) {
    throw error;
  }
};

const generatePasswordResetToken = async (payload) => {
  const user = await findUser({ email: payload.email });
  return await user.generatePasswordResetToken(payload);
};

const validateToken = async (token) => {
  return await jwt.verify(token, process?.env?.SECRET);
};

const getUserGroceryList = async (userId) => {
  try {
    const grocery = await grocery_list.find({ list_id: userId });
    const groceryLists = await products.find({
      id: { $in: grocery[0].grocery_list },
    });
    return groceryLists;
  } catch (error) {
    console.log(error);
    throw {
      message: error.message || "get user grocerylist operation failed",
      code: error.code || 500,
    };
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser,
  validatePassWord,
  generateAccessTokens,
  generatePasswordResetToken,
  validateToken,
  getUserGroceryList,
  generateRefreshTokens
};
