const { Description } = require("../model/description");

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

const getAllDescription = async () => {
  try {
    return await Description.find();
  } catch (error) {
    console.log(error);
  }
};

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


module.exports = {
  saveDescription,
  findDescription,
  getAllDescription,
  updateDescription,
  deleteDescription,
};

