const { blog } = require("../db/dbMongo/config/db_buildSchema")

class BlogService {

    static async createBlog(payload) {
        try {
            return await blog.create(payload)
        } catch (e) {
            console.log(e)
        }
    }

    static async editBlog(id, payload) {
        try {
            await this.getOne(id)
            await blog.findByIdAndUpdate({ _id: id }, { ...payload })
        } catch (e) {
            console.log(e)
        }
    }

    static async searchBlog(title) {
        try {
            return await blog.findOne({
                title: { $regex: title, $options: "i" },
            })
        } catch (e) {
            console.log(e)
        }
    }

    static async getOne(id) {
        try {
            const oneBlog = await blog.findById(id).populate('author')
            if (!oneBlog) throw new Error("Blog not found")
            return oneBlog.toJSON()
        } catch (e) {
            console.log(e)
            throw new Error(JSON.stringify(e))
        }
    }

    static async getOneBlogPost(id) {
        try {
            const oneBlog = await blog.findById(id).populate('author')
            if (!oneBlog) throw new Error("Blog not found")
            const recent_post = await blog.find({
                _id: {
                    $ne: id
                }
            }).limit(5).sort({
                createdAt: 1
            })
            return {
                data: oneBlog.toJSON(),
                recent_post
            }
        } catch (e) {
            console.log(e)
            throw new Error(JSON.stringify(e))
        }
    }

    static async paginate(page, filter = {}) {
        const limit = parseInt(filter.limit) || 10;
        let skip = parseInt(page) === 1 ? 0 : limit * page;
        delete filter.limit;
        delete filter.page;
        let query = { ...filter };
        const docCount = await blog.countDocuments(query);
        if (docCount < skip) {
            skip = (page - 1) * limit;
        }
        return { skip, limit, docCount };
    };

    static async getAllBlog(query_) {
        try {
            let query = { ...query_ }
            if (query?.title) {
                query.title = { $regex: query.title, $options: "i" }
            }

            const page = await this.paginate(query?.page || 1, query)
            for (let entry in query) {
                if (entry !== 'title') {
                    delete query[entry]
                }
            }
            if (query_?.status) {
                query.status = query_.status
            }
            const response = await blog.find(query).skip(page.skip).limit(page.limit).populate("author")
            return {
                data: response,
                total: page.docCount
            }
        } catch (e) {
            console.log(e)
            throw new Error(JSON.stringify(e))
        }
    }

    static async deleteBlog(id) {
        try {
            await this.getOne(id)
            return await blog.findByIdAndDelete(id)
        } catch (e) {
            console.log(e)
            throw new Error(JSON.stringify(e))
        }
    }
}

module.exports = BlogService