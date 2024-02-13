const {
    createCategory,
    updateCategory,
    getAllProductCategories,
    getAllCategories,
    getCategory,
    deleteCategory,
} = require("../repository/index");

class CategoryService {
    static async createCategory(payload) {
        try {
            return await createCategory(payload);
        } catch (error) {
            console.log({ error });
            throw error;
        }
    }

    static async updateCategory(filter, payload) {
        try {
            return await updateCategory(filter, payload);
        } catch (error) {
            console.log({ error });
            throw error;
        }
    }

    static async getAllCategories(page, filter) {
        try {
            return await getAllCategories(page, filter);
        } catch (error) {
            throw error;
        }
    }

    static async getProductCategories(filter) {
        try {
            return await getAllProductCategories(filter);
        } catch (error) {
            throw error;
        }
    }

    static async getCategory(filter) {
        try {
            return await getCategory(filter);
        } catch (error) {
            throw error;
        }
    }

    static async deleteCategory(id) {
        try {
            return await deleteCategory(id);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CategoryService;
