const {
  createProduct,
  updateProduct,
  getAllProducts,
  getStoreProducts,
  getProduct,
  deleteProduct,
  createCategory,
} = require("../repository/index");

class ProductService {
  static async createProduct(payload, files) {
    try {
      let productImages = [];
      files.map((file) => {
        productImages.push(file.location);
      });

      payload.product_images = productImages;

      if (payload.product_categories) {
        payload.product_categories?.map((category)=>{
          createCategory({
              category_name: category,
              category_type: "Product",
              affiliated_objects: "PRODUCT",
            })
          })
      }

      return await createProduct(payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async updateProduct(filter, payload, files) {
    try {
      let productImages = [];
      const product = await getProduct(filter);
      if (files) {
        files.map((file) => {
          productImages.push(file.location);
        });
        payload.product_images = product?.product_images?.concat(productImages);
      }

      return await updateProduct(filter, payload);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  static async getAllProducts(page, filter) {
    try {
      return await getAllProducts(page, filter);
    } catch (error) {
      throw error;
    }
  }

  static async getProduct(filter) {
    try {
      return await getProduct(filter);
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      return await deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }

  static async storeProducts(page, storeId) {
    try {
      const storeProducts = await getStoreProducts(page, storeId);
      return storeProducts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;
