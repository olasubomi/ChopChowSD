const { item_description } = require("../db/dbMongo/config/db_buildSchema");
// const { Description } = require("../model/description");

// const paginate = async (page, filter) => {
//   const limit = parseInt(filter.limit) || 10;
//   let skip = parseInt(page) === 1 ? 0 : limit * page;
//   delete filter.limit;
//   const docCount = await descriptions.countDocuments(filter);
//   if (docCount < skip) {
//     skip = (page - 1) * limit;
//   }
//   return { skip, limit, docCount };
// };

const saveDescription = async (payload) => {
  try {
    const descriptions = new Description(payload);
    return await descriptions.save(payload);
  } catch (error) {
    console.log({ error });
  }
};

const findDescription = async (filter) => {
  try {
    return await Description.findOne(filter).collation({
      locale: "en",
      strength: 2,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getAllDescription = async (page, filter) => {
  try {
    let getPaginate = await paginateDes(page, filter);

    const status = filter.status !== 'all' ? { status: filter.status } : {}

    return await item_description.find(status)
      .limit(getPaginate.limit)
      .skip(getPaginate.skip)


  } catch (error) {
    console.log(error);
  }
};

const paginateDes = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;

  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;

  const docCount = await item_description.countDocuments();

  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
}

const updateItemDescription = async (payload) => {
  const id = payload._id;
  delete payload._id
  try {
    return await item_description.findOneAndUpdate(
      { _id: id },
      { status: payload.status }
    )
  } catch (e) {
    console.log(e)
  }
}

const deleteItemDescription = async (id) => {
  try {
    return await item_description.findByIdAndDelete(
      { _id: id },
    )
  } catch (e) {
    console.log(e)
  }
}


const updateDescription = async (payload, descriptionId) => {
  try {
    return await Description.findOneAndUpdate(
      { _id: descriptionId },
      { $push: { status: payload.status } },
      { returnOriginal: false }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteDescription = async (descriptionId) => {
  try {
    return await Description.findByIdAndDelete(descriptionId);
  } catch (error) {
    console.log(error);
  }
};

const createDescription = async (payload) => {
  console.log('payloader', payload)
  try {
    const checkIfDescriptionExist = await getDescription({
      description_key: payload.description_key
    })
    if (checkIfDescriptionExist) {
      return { description: checkIfDescriptionExist._id, message: "Description already exist" }
    } else {
      const newDescription = await saveDescriptionToDB(payload);
      return { description: newDescription._id }
    }
  } catch (error) {
    console.log({ error })
  }
}


const getDescription = async (filter) => {
  try {
    return await item_description.findOne(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get one description operation failed",
      code: error.code || 500,
    };
  }
}

const saveDescriptionToDB = async (payload) => {
  try {
    const desc = new item_description(payload);
    return await desc.save(payload);
  } catch (error) {
    console.log({ error });
  }
}


module.exports = {
  saveDescription,
  findDescription,
  getAllDescription,
  updateDescription,
  deleteDescription,
  getDescription,
  createDescription,
  saveDescriptionToDB,
  updateItemDescription,
  deleteItemDescription,
  paginateDes
};

