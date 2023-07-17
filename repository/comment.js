const { Comment } = require("../model/comment");

const createComment = async (payload) => {
    try {
        return await Comment.create(payload);
    } catch (error) {
        console.log({ error });
        throw error
    }
};


const createCommentReply = async (payload) => {
    try {
        const comment = await Comment.create(payload);
        await Comment.findByIdAndUpdate(parentCommentId, {
            $push: { replies: payload.replyTo },
        })
        return comment;
    } catch (error) {
        console.log({ error });
        throw error
    }
};

const updateComment = async (filter, payload) => {
    try {
        return await Comment.findOneAndUpdate(filter, payload, { new: true });
    } catch (error) {
        console.log({ error });
        throw error

    }
};

const getItemComments = async (page, filter) => {
    try {
        let getPaginate = await paginate(page, filter);
        const allComments = await Comment
            .find(filter || {})
            .limit(getPaginate.limit)
            .skip(getPaginate.skip)
            .populate("replies")
        return {
            comments: allComments,
            count: getPaginate.docCount,
        };
    } catch (error) {
        throw {
            error: error,
            message: error.message || "Get all comments operation failed",
            code: error.code || 500,
        };
    }
};

const getComment = async (filter) => {
    try {
        return await Comment.findOne(filter).populate("replies");
    } catch (error) {
        console.log({ error });
        throw {
            error: error,
            message: error.message || "Get all Comments. operation failed",
            code: error.code || 500,
        };
    }
};

const deleteComment = async (id) => {
    try {
        const deleteComment = await Comment.deleteOne({ _id: id });
        if (deleteComment) {
            return { message: "Comment successfully removed" };
        }
    } catch (error) {
        console.log({ error });
        throw {
            error: error,
            message: error.message || "Get all Comments. operation failed",
            code: error.code || 500,
        };
    }
};

const paginate = async (page, filter) => {
    const limit = parseInt(filter.limit) || 10;
    let skip = parseInt(page) === 1 ? 0 : limit * page;
    delete filter.limit;
    const docCount = await Comment.countDocuments(filter);
    if (docCount < skip) {
        skip = (page - 1) * limit;
    }
    return { skip, limit, docCount };
};

module.exports = {
    createComment,
    createCommentReply,
    updateComment,
    getItemComments,
    getComment,
    deleteComment,
};
