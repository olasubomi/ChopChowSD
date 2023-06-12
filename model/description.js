const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
  description_key: { type: String },
  status: [{}],
});

const Description = mongoose.model("Description", descriptionSchema);

function validateDescription(description) {
  const schema = Joi.object({
    description_key: Joi.string().required(),
    status: Joi.array().items(Joi.string()).required(),
  });

  return schema.validate(description);
}

exports.descriptionSchema = descriptionSchema;
exports.Description = Description;
exports.validate = validateDescription;
