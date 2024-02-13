const { validate } = require("../model/measurement");
const { Measurement } = require("../model/measurement");

const {
  saveMeasurement,
  findMeasurement,
  getAllMeasurement,
  getProductMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require("../repository/measurement");

class MeasurementService {
  static async createMeasurement(payload, res) {
    //validating request body
    const { error } = validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    const measurement = await findMeasurement({
      measurement_name: payload.measurement_name,
    });

    if (measurement)
      return res.status(400).send("This measurement Name already exists!");

    const measurements = await saveMeasurement(payload);

    return res.send({
      status: 200,
      message: "Measurement Created Successfully",
      data: measurements,
    });
  }
  static async getMeasurement(req, res) {
    const measurements = await getAllMeasurement(
      req.params.page,
      req.query || {}
    );

    return res.json({ status: 200, data: measurements });
  }

  static async getAllProductMeasurement(req, res) {
    const measurements = await getProductMeasurement(
      req.query || {}
    );

    return res.json({ status: 200, data: measurements });
  }

  

  static async updateMeasurement(payload, res) {
    //validating request body
    const { error } = validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    const measurementData = await findMeasurement({
      measurement_name: payload.measurement_name,
    });

    if (!measurementData)
      return res.status(200).send("This measurement does not exist!");

    const measurementId = measurementData._id;

    const measurements = await updateMeasurement(payload, measurementId);

    return res.json({
      status: 200,
      message: "Measurement Status Updated Successfully!",
      data: measurements,
    });
  }

  static async deleteMeasurement(payload, res) {
    try {
      //validating request body
      const { error } = validate(payload);
      if (error) return res.status(400).send(error.details[0].message);

      const measurementData = await findMeasurement({
        measurement_name: payload.measurement_name,
      });

      if (!measurementData)
        return res.status(200).send("This measurement does not exist!");

      const measurementId = measurementData._id;

      const measurements = await deleteMeasurement(measurementId);

      return res.json({
        status: 200,
        message: "Measurement Deleted Successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MeasurementService;
