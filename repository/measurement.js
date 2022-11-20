const { Measurement } = require("../db/dbMongo/config/db_buildSchema");

const createMeasurement = async (payload) => {
  try {
    const checkMeasurement = await Measurement.findOne({
      measurement_name: payload.measurement_name,
    });
    if (checkMeasurement) {
      console.log("measurement already exist");
      retutn checkMeasurement;
    }
    return await Measurement.create(payload);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  createMeasurement,
};
