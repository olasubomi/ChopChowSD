const { Measurement } = require("../db/dbMongo/config/db_buildSchema");

const createMeasurement = async (payload) => {
  try {
    const checkMeasurement = await Measurement.findOne({
      measurement_name: payload.measurement_name,
    });
    if (checkMeasurement) {
      ("measurement already exist");
    }
    return await Measurement.create(payload);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  createMeasurement,
};
