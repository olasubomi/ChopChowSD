const { Utensil } = require("../db/dbMongo/config/db_buildSchema");

exports.createUtensil = async (payload) => {
  try {
    return await Utensil.create(payload);
  } catch (error) {
    console.log({ error });
  }
};

exports.createUtensilsFromCreateMeal = async (payload) => {
  try {
    payload.map(async (utensil) => {
      const checkUtensil = await Utensil.findOne({ name: utensil });
      if (!checkUtensil) {
        await Utensil.create({
          name: utensil,
        });
      }
    });
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "create utensil operation failed",
      code: error.code || 500,
    };
  }
};

exports.getAllUtensils = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const allUtensils = await Utensil.find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return {
      utensil: allUtensils,
      count: getpaginate.docCount,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all Utensil operation failed",
      code: error.code || 500,
    };
  }
};

exports.getUtensil = async (filter) => {
  try {
    return await Utensil.findOne(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all Utensil operation failed",
      code: error.code || 500,
    };
  }
};

exports.updateUtensil = async (filter, payload) => {
  try {
    return await Utensil.findOneAndUpdate(
      filter,
      {
        $set: payload,
      },
      { new: true }
    );
  } catch (error) {
    console.log({ error });
  }
};

exports.deleteUtensil = async (id) => {
  try {
    const deleteUtensil = await Utensil.deleteOne({ _id: id });
    if (deleteUtensil) {
      return { message: "Utensil sucessfully removed" };
    }
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all Utensil operation failed",
      code: error.code || 500,
    };
  }
};

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await Utensil.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};
