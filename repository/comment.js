const { Comment } = require("../model/comment");
const CommentEventHandler = require("./commentEventEmitter")


const eventEmitter = CommentEventHandler.create();

const createComment = async (payload) => {
    try {

        const newComment = await Comment.create(payload);

        if (payload.rating) {
            eventEmitter.emit("commentEvent", newComment)
        }

        return newComment
    } catch (error) {
        console.log({ error });
        throw error
    }
};

const createCommentReply = async (payload) => {
    try {
        const comment = await Comment.create(payload);

        const updateComment = await Comment.findByIdAndUpdate(payload.parent_comment_id, {
            $push: { replies: comment._id },
        })

        return comment;
    } catch (error) {
        console.log({ error });
        throw error
    }
};

const updateComment = async (filter, payload) => {
    try {
        const updatedComment = await Comment.findOneAndUpdate(filter, payload, { new: true });

        if (payload.rating) {
            eventEmitter.emit("commentUpdatedEvent", updatedComment)
        }

        return updatedComment
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
            .populate("created_by")
            .populate({
                path: "replies",
                populate: {
                    path: "created_by",
                },
            })

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
        return await Comment.findOne(filter).populate("created_by").populate({
            path: "replies",
            populate: {
                path: "created_by",
            },
        });
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
        const getComment = await Comment.findById(id)

        const deleteComment = await Comment.deleteOne({ _id: id });
        if (deleteComment) {
            eventEmitter.emit("commentDeletedEvent", getComment)
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

const getItemCommentsCount = async (filter) => {
    const count = await Comment.countDocuments(filter);
    return { count }
};


module.exports = {
    createComment,
    createCommentReply,
    updateComment,
    getItemComments,
    getComment,
    deleteComment,
    getItemCommentsCount,
};
