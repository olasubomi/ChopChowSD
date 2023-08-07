const { validate } = require("../model/description");
const { Description } = require("../model/description");

const {
  saveDescription,
  findDescription,
  getAllDescription,
  updateDescription,
  deleteDescription,
} = require("../repository/description");

class DescriptionService {
  static async createDescription(payload, res) {
    //validating request body
    const { error } = validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    const descriptionKey = await findDescription({
      description_key: payload.description_key,
    });

    if (descriptionKey)
      return res.status(400).send("This description Key already exists!");

    const descriptions = await saveDescription(payload);

    return res.send({
      status: 200,
      message: "Description Created Successfully",
      data: descriptions,
    });
  }
  static async getDescription(req, res) {
    const descriptions = await getAllDescription();

    return res.json({ status: 200, data: descriptions });
  }

  static async updateDescription(payload, res) {
    //validating request body
    const { error } = validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    const descriptionData = await findDescription({
      description_key: payload.description_key,
    });

    if (!descriptionData)
      return res.status(200).send("This measurement does not exist!");

    const descriptionId = descriptionData._id;

    const description = await updateDescription(payload, descriptionId);

    return res.json({
      status: 200,
      message: "Description Status Added Successfully!",
      data: description,
    });
  }

  static async deleteDescription(payload, res) {
    try {
      //validating request body
      //  const { error } = validate(payload);
      //  if (error) return res.status(400).send(error.details[0].message);

      if (payload.description_key === undefined)
        return res.status(400).send("description_key is required");
      if (payload.description_key === "")
        return res.status(400).send("description_key cannot be empty");
      if (typeof payload.description_key !== "string")
        return res.status(400).send("description_key must be a string");

      const descriptionData = await findDescription({
        description_key: payload.description_key,
      });

      if (!descriptionData)
        return res.status(200).send("This description does not exist!");

      const descriptionId = descriptionData._id;

      const description = await deleteDescription(descriptionId);

      return res.json({
        status: 200,
        message: "Description Deleted Successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DescriptionService;
