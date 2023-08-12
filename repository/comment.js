const { Comment } = require("../model/comment");
const { findUser } = require("./user");

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

        const updateComment = await Comment.findByIdAndUpdate(payload.parent_comment_id, {
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


const upVoteComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById({ _id: commentId });
        if (comment) {
            const hasUserAlreadyUpvoted = comment.up_voted_users.some(_id => _id.toString() === userId.toString());
            if (!hasUserAlreadyUpvoted) {
                const user = await findUser({ _id: userId })
                comment.up_voted_users.push(user);
                comment.up_votes = comment.up_votes + 1;
                comment.item_type = 'Item'
                await comment.save();
                await comment.calculateRatings();
            } else {
                console.log('User has already upvoted')
            }
        } else {
            throw Error(`Comment with id ${commentId} not found`)
        }
    } catch (e) {
        throw {
            error: e
        }
    }
}


const downVoteComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById({ _id: commentId });
        if (comment) {
            const hasUserAlreadyDownvoted = comment.down_voted_users.some(_id => _id.toString() === userId.toString());
            if (!hasUserAlreadyDownvoted) {
                const user = await findUser({ _id: userId })
                comment.down_voted_users.push(user);
                comment.down_votes = comment.down_votes + 1;
                await comment.save();
                await comment.calculateRatings();
            } else {
                console.log('User has already downvoted')
            }
        } else {
            throw Error(`Comment with id ${commentId} not found`)
        }
    } catch (e) {
        throw {
            error: e
        }
    }
}

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

// const calculateNewAverageRating = async (existingRating, totalRatings, newRating) => {

//     const totalRatingSum = existingRating * totalRatings + newRating;

//     const newTotalRatings = totalRatings + 1;

//     let newAverageRating = totalRatingSum / newTotalRatings;

//     newAverageRating = newAverageRating.toFixed(2)

//     return { newAverageRating, newTotalRatings };
// }

module.exports = {
    createComment,
    createCommentReply,
    updateComment,
    getItemComments,
    getComment,
    deleteComment,
    upVoteComment,
    downVoteComment
};
