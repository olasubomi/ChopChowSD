
const {
    getAllDescription, updateItemDescription, deleteItemDescription,
} = require("../repository/description");

class DescriptionsService {
    static async getDescriptions(req, res) {
        const descriptions = await getAllDescription();

        return res.json({ status: 200, data: descriptions });
    }

    static async updateDescription(req, res) {
        const description = await updateItemDescription(req.body)
        return res.json({ status: 200, data: description })
    }

    static async deleteDescription(req, res) {
        const description = await deleteItemDescription(req.params.id)
        return res.json({ status: 200, data: description })
    }
}

module.exports = DescriptionsService;
