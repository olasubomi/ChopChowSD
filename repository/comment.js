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

        const updateComment = await Comment.findByIdAndUpdate(payload.parentCommentId, {
            $push: { replies: comment._id },
        })

        console.log({ updateComment })
        return comment;
    } catch (error) {
        console.log({ error });
        throw error
    }
};

const updateComment = async (filter, payload) => {
    try {
        const comment = await Comment.findOne(filter)

        if (payload.rating) {
            const newRating = await calculateNewAverageRating(comment.rating, comment.totalRating, payload.rating);

            payload.totalRating = newRating.newTotalRatings;

            payload.rating = newRating.newAverageRating;
        }

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
            .populate("created_by").populate({
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

const calculateNewAverageRating = async (existingRating, totalRatings, newRating) => {

    const totalRatingSum = existingRating * totalRatings + newRating;

    const newTotalRatings = totalRatings + 1;

    let newAverageRating = totalRatingSum / newTotalRatings;

    newAverageRating = newAverageRating.toFixed(2)

    return { newAverageRating, newTotalRatings };
}

module.exports = {
    createComment,
    createCommentReply,
    updateComment,
    getItemComments,
    getComment,
    deleteComment,
};
