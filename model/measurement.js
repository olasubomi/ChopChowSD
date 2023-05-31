const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  measurement_name: {type: String},
  status: { type: String, default: "Draft" },
});

const Measurement = mongoose.model("Measurement", measurementSchema);
//const Measurement = mongoose.models.Measurement || mongoose.model('Measurement', measurementSchema);  

function validateMeasurement(measurement) {
  const schema = Joi.object({
    measurement_name: Joi.string().required(),
    status: Joi.string().optional(),
  });

  return schema.validate(measurement);
}

exports.measurementSchema = measurementSchema;
exports.Measurement = Measurement;
exports.validate = validateMeasurement;