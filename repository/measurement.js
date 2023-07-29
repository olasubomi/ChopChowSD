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

const getAllMeasurement = async (page, filter) => {
  try {
    const status = filter.status !== 'all' ? { status: filter.status } : {}

    return await Measurement.find(status);
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



const createNewMeasurment = async (payload) => {
  try {
    const checkIfMeasurementExist = await getMeasurement({
      measurement_name: payload.measurement_name
    })
    if (checkIfMeasurementExist) {
      return { measurement: checkIfMeasurementExist, message: "Measurement already exist" }
    } else {
      const newMeasurment = await saveMeasurement(payload);
      return { measurement: newMeasurment }
    }
  } catch (error) {
    console.log({ error })
  }
}


const getMeasurement = async (filter) => {
  try {
    return await Measurement.findOne(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get one measurement operation failed",
      code: error.code || 500,
    };
  }
}



module.exports = {
  saveMeasurement,
  findMeasurement,
  getAllMeasurement,
  updateMeasurement,
  deleteMeasurement,
  createNewMeasurment
};
