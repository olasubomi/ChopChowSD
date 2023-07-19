const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Comment = mongoose.model(
    "Comment",
    new Schema(
        {
            message: { type: String },

            rating: { type: Number, default: 0 },

            item: {
                type: mongoose.Types.ObjectId,
                refPath: "Item",
                required: true,
            },
            created_by: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
            parent_comment_id: {
                type: mongoose.Types.ObjectId,
                ref: "Comment",
                required: false,
            },
            up_votes: { type: Number, default: 0 },

            down_votes: { type: Number, default: 0 },
            replies: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment',
                },
            ],
        },
        { timestamps: true }
    )
);