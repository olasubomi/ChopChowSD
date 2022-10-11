const {
  grocery_list,
  products,
  users,
  cart,
} = require("../db/dbMongo/config/db_buildSchema");

const createUser = async (payload) => {
  const newUser = await users.create(payload);
  if (newUser) {
    await grocery_list.create({
      user: newUser._id,
      products: [],
    });

    await cart.create({
      user: newUser._id,
      total: "0",
    });
  }
  return newUser;
};

const updateUser = async (filter, data) => {
  return await users.findOneAndUpdate(filter, payload);
};

const deleteUser = async (id) => {
  return await users.deleteOne({ _id: id });
};

const findUser = async (filter) => {
  return await users.findOne(filter);
};

const findUsers = async (filter, page) => {
  const limit = 10;
  const skip = parseInt(page) === 1 ? 0 : limit * page;
  const docCount = await users.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }

  return await users.find(filter).limit(limit).skip(skip);
};

const validatePassWord = async (email, password) => {
  const user = await findUser({ email: email });

  return await user.comparePassword(password);
};

const generateAccessTokens = async (payload) => {
  const user = await findUser({ email: payload.email });
  return await user.generateAccessTokens(payload);
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
};
