const { descriptions } = require("../db/dbMongo/config/db_buildSchema");

const createDescription = async (payload) => {
    try {
        const checkDescription = await getDescription({
            description_name: payload.description_name,
        });
        if (checkDescription) {
            console.log("description already exist")
            return checkDescription;
        }
        return await descriptions.create(payload);
    } catch (error) {
        console.log({ error });
        throw error;
    }
};

const updateDescription = async (filter, payload) => {
    try {
        return await descriptions.findOneAndUpdate(filter, payload, { new: true });
    } catch (error) {
        console.log({ error });
    }
};

const getAllDescriptions = async (page, filter) => {
    try {
        let getPaginate = await paginate(page, filter);
        const allDescriptions = await descriptions
            .find(filter || {})
            .limit(getPaginate.limit)
            .skip(getPaginate.skip);
        return {
            descriptions: allDescriptions,
            count: getPaginate.docCount,
        };
    } catch (error) {
        console.log({ error });
        throw {
            error: error,
            messsage: error.message || "Get all descriptions operation failed",
            code: error.code || 500,
        };
    }
};

const getDescription = async (filter) => {
    try {
        return await descriptions.findOne(filter);
    } catch (error) {
        console.log({ error });
        throw {
            error: error,
            messsage: error.message || "Get all descriptions operation failed",
            code: error.code || 500,
        };
    }
};

const deleteDescription = async (id) => {
    try {
        const deleteDescription = await descriptions.deleteOne({ _id: id });
        if (deleteDescription) {
            return { message: "Description sucessfully removed" };
        }
    } catch (error) {
        console.log({ error });
        throw {
            error: error,
            messsage: error.message || "Get all descriptions operation failed",
            code: error.code || 500,
        };
    }
};

const paginate = async (page, filter) => {
    const limit = parseInt(filter.limit) || 10;
    let skip = parseInt(page) === 1 ? 0 : limit * page;
    delete filter.limit;
    const docCount = await descriptions.countDocuments(filter);
    if (docCount < skip) {
        skip = (page - 1) * limit;
    }
    return { skip, limit, docCount };
};

module.exports = {
    getAllDescriptions,
    createDescription,
    updateDescription,
    getDescription,
    deleteDescription,
};
