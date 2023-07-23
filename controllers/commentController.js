const { Response } = require("http-status-codez");
const CommentService = require("../services/commentService");

const { ErrorResponse, SuccessResponse } = require("../lib/appResponse");

module.exports = {
    getComments: async (req, res) => {
        try {
            const comments = await CommentService.getComments(
                req.params.page,
                req.query || {}
            );
            if (comments) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(comments));
            } else {
                throw comments;
            }
        } catch (error) {
            return res.json(new ErrorResponse(error));
        }
    },

    getComment: async (req, res) => {
        try {
            const comment = await CommentService.getComment(
                { _id: req?.params?.commentId }
            );
            if (comment) {
                res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(comment));
            } else {
                throw comment;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    createComment: async (req, res) => {
        try {

            req.body.created_by = userId = req.user._id.toString();
            const comment = await CommentService.createComment(req.body);
            if (comment) {
                res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(comment));
            } else {
                throw comment;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    createCommentReply: async (req, res) => {
        try {
            req.body.created_by = userId = req.user._id.toString();
            const comment = await CommentService.createCommentReply(req.body);
            if (comment) {
                res.status(Response.HTTP_ACCEPTED).json(new SuccessResponse(comment));
            } else {
                throw comment;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    updateComment: async (req, res) => {
        try {
            const updatedComment = await CommentService.updateComment(
                { _id: req.params.commentId },
                req.body
            );
            if (updatedComment) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(updatedComment));
            } else {
                throw updatedComment;
            }
        } catch (error) {
            return res
                .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },

    deleteComment: async (req, res) => {
        try {
            const removeComment = await CommentService.deleteComment(
                req.params.commentId
            );
            if (removeComment) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(removeComment));
            } else {
                throw removeComment;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    }
};
