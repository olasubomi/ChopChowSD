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
                refPath: "item_type",
                required: true,
            },
            item_type: {
                type: String,
                enum: ['User', 'Store', 'Item'],
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
            up_voted_users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
            down_votes: { type: Number, default: 0 },
            down_voted_users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
            replies: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment',
                },
            ],

        },
        {
            timestamps: true,
            methods: {
                calculateRatings() {
                    const up_votes = this.up_votes;
                    const down_votes = this.down_votes;
                    const totalVotes = up_votes + down_votes;
                    if (totalVotes === 0) {
                        this.rating = 0;
                        return this.save()

                    }
                    const rating = Math.floor((up_votes / totalVotes) * 5)
                    this.rating = rating;
                    return this.save()
                }
            }
        }
    )
);

