
const { validateItemDescription } = require("../db/dbMongo/config/db_buildSchema");
const {
    getAllDescription, updateItemDescription, deleteItemDescription,
} = require("../repository/description");

class DescriptionsService {
    static async getDescriptions(req, res) {
        const descriptions = await getAllDescription(
            req.params.page,
            req.query || {});

        return res.json({ status: 200, data: descriptions });
    }

    static async updateDescription(req, res) {

        const { error } = validateItemDescription(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const description = await updateItemDescription(req.body)
        return res.json({ status: 200, data: description })
    }

    static async deleteDescription(req, res) {
        const description = await deleteItemDescription(req.params.id)
        return res.json({ status: 200, data: description })
    }
}

module.exports = DescriptionsService;
