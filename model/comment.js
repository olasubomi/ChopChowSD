const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Comment = mongoose.model(
    "Comment",
    new Schema(
        {
            message: { type: String },
            rating: { type: Number },
            item: {
                type: mongoose.Types.ObjectId,
                refPath: "Item",
                required: true,
            },
            createdBy: {
                type: mongoose.Types.ObjectId,
                refPath: "User",
                required: true,
            },
            replyTo: {
                type: mongoose.Types.ObjectId,
                refPath: "Comment",
                required: false,
            },
            up_votes: { type: Number },

            down_votes: { type: Number },
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