const { Measurement } = require("../model/measurement");

const saveMeasurement = async (payload) => {
  try {
    const measurements = new Measurement(payload);
    return await measurements.save(payload);
  } catch (error) {
    console.log({ error });
  }
};

const findMeasurement = async (filter) => {
  try {
    return await Measurement.findOne(filter).collation({
      locale: "en",
      strength: 2,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getAllMeasurement = async () => {
  try {
    return await Measurement.find();
  } catch (error) {
    console.log(error);
  }
};

const updateMeasurement = async (payload, measurementId) => {
  try {
    return await Measurement.findOneAndUpdate(
      { _id: measurementId },
      {
        $set: {
          status: payload.status,
        },
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteMeasurement = async (measurementId) => {
  try {
    return await Measurement.findByIdAndDelete(measurementId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveMeasurement,
  findMeasurement,
  getAllMeasurement,
  updateMeasurement,
  deleteMeasurement,
};
