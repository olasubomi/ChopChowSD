const { Response } = require("http-status-codez");
const DescriptionsService = require("../../services/descriptionsService");
const { ErrorResponse, SuccessResponse } = require("../../lib/appResponse");

module.exports = {
    getDescription: async (req, res) => {
        try {
            const descriptions = await DescriptionsService.getDescriptions(req, res);
            if (descriptions) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(descriptions));
            } else {
                throw descriptions;
            }
        } catch (error) {
            console.log(error);
        }
    },

    getProductDescription: async (req, res) => {
        try {
            const descriptions = await DescriptionsService.getProductDescription(req, res);
            if (descriptions) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(descriptions));
            } else {
                throw descriptions;
            }
        } catch (error) {
            console.log(error);
        }
    },


    updateDescription: async (req, res) => {
        try {
            const desription = await DescriptionsService.updateDescription(req, res)
            if (desription) {
                res
                    .status(Response.HTTP_ACCEPTED)
            } else {
                throw desription;
            }
        } catch (e) {
            console.log(e)
        }
    },
    deleteDescription: async (req, res) => {
        try {
            const desription = await DescriptionsService.deleteDescription(req, res)
            if (desription) {
                res
                    .status(Response.HTTP_ACCEPTED)
            } else {
                throw desription;
            }
        } catch (e) {
            console.log(e)
        }
    }


}