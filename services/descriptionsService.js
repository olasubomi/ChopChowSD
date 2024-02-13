
const { validateItemDescription } = require("../db/dbMongo/config/db_buildSchema");
const {
    getAllDescription, updateItemDescription, deleteItemDescription, getDescription, getProductDescription
} = require("../repository/description");

class DescriptionsService {
    static async getDescriptions(req, res) {
        const descriptions = await getAllDescription(
            req.params.page,
            req.query || {});

        return res.json({ status: 200, data: descriptions });
    }

    static async getProductDescription(req, res) {
        const descriptions = await getProductDescription(
            req.params.page,
            req.query || {});

        return res.json({ status: 200, data: descriptions });
    }

    static async updateDescription(req, res) {
        const { error } = validateItemDescription(payload);
        if (error) return res.status(400).send(error.details[0].message);

        const isDescriptionAvailable = await getDescription({ _id: req.body.id });

        if (!isDescriptionAvailable) {
            return res.status(200).send("This description does not exist!");
        }
        const description = await updateItemDescription(req.body)
        return res.json({
            status: 200,
            message: "Description Status updated Successfully!",
            data: description,
        });
    }

    static async deleteDescription(req, res) {
        const description = await deleteItemDescription(req.params.id)
        return res.json({ status: 200, data: description })
    }
}

module.exports = DescriptionsService;
