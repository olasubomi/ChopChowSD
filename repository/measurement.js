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

    let query = {}

    let sort = {}

    if (filter?.measurement_key) {
      query.measurement_name = { $regex: filter.measurement_key, $options: "i" }
    }
    if (filter?.createdAt) {
      sort.createdAt = Number(filter.createdAt)
    }
    if (filter?.measurement_name) {
      sort.measurement_name = Number(filter.measurement_name)
    }

    if (filter.status !== 'all' && Boolean(filter.status)) {
      query.status = filter.status?.pop()
    }

    const withPaginate = filter.hasOwnProperty('withPaginate') ? filter.withPaginate === 'false' ? false : true : true
    delete filter.withPaginate
    let getPaginate = await paginateMesr(page, query)

    // const status = filter.status !== 'all' ? { status: filter.status } : {}

    let resp = []
    if (withPaginate) {
      resp = await Measurement
        .find(query)
        .sort(sort)
        .limit(getPaginate.limit)
        .skip(getPaginate.skip)
    } else {
      resp = await Measurement
        .find(status)
    }

    return { measurement: resp, count: getPaginate.docCount };

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

const paginateMesr = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;

  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;

  const docCount = await Measurement.countDocuments();
  console.log('measure coune', docCount)

  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
}

module.exports = {
  saveMeasurement,
  findMeasurement,
  getAllMeasurement,
  updateMeasurement,
  deleteMeasurement,
  createNewMeasurment
};
