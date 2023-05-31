const { Description } = require("../model/description");

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
