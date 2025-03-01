const { Response } = require("http-status-codez");
const { validateBlog } = require("../db/dbMongo/config/db_buildSchema");
const { ErrorResponse, SuccessResponse } = require("../lib/appResponse");
const BlogService = require("../services/blogService");


module.exports = {
    createBlog: async (req, res) => {
        try {
            const { error, value } = validateBlog({
                ...req.body,
                featured_image: req.file.path,
            })
            if (error) return res.status(400).send(error.details[0].message);
            const blog = await BlogService.createBlog({
                ...value,
                author: req.decoded.id
            })
            if (blog) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(blog));
            } else {
                throw blog;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
    getAllBlog: async (req, res) => {
        try {
            const allBloog = await BlogService.getAllBlog(req.query || {})
            res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(allBloog));
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
    getOneBlog: async (req, res) => {
        try {
            const oneBlog = await BlogService.getOneBlogPost(req.params.id)
            if (oneBlog) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(oneBlog));
            } else {
                throw blog;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
    searchBlog: async (req, res) => {
        try {
            const oneBlog = await BlogService.searchBlog(req.query.title)
            if (oneBlog) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(oneBlog));
            } else {
                throw blog;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
    editBlog: async (req, res) => {
        try {
            const { error, value } = validateBlog({
                ...req.body,
                featured_image: req.file?.path ? req.file.path : req.body.featured_image
            })
            if (error) return res.status(400).send(error.details[0].message);

            const oneBlog = await BlogService.editBlog(req.params.id, value)
            res
                .status(Response.HTTP_ACCEPTED)
                .json(new SuccessResponse(oneBlog));
        } catch (error) {
            return res
                .status(error?.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const oneBlog = await BlogService.deleteBlog(req.params.id)
            if (oneBlog) {
                res
                    .status(Response.HTTP_ACCEPTED)
                    .json(new SuccessResponse(oneBlog));
            } else {
                throw blog;
            }
        } catch (error) {
            return res
                .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error));
        }
    },
}