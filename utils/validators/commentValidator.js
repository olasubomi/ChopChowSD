const Joi = require("joi");


exports.createCommentSchema = Joi.object({
    message: Joi.string().required(),
    rating: Joi.number(),
    item: Joi.string().required(),
    created_by: Joi.string().required(),
    up_votes: Joi.number(),
    down_votes: Joi.number(),
});


exports.replyCommentSchema = Joi.object({
    message: Joi.string().required(),
    rating: Joi.number(),
    item: Joi.string().required(),
    created_by: Joi.string().required(),
    parent_comment_id: Joi.string().required(),
    up_votes: Joi.number(),
    down_votes: Joi.number(),
});


exports.updateCommentSchema = Joi.object({
    message: Joi.string().required(),
    rating: Joi.number(),
    up_votes: Joi.number(),
    down_votes: Joi.number(),
});

