const {
  createProduct,
  getAllProducts,
  readImages,
  readImage,
  getStoreProducts,
} = require("../repository/index");

class ProductService {
  static async createProduct(payload, files) {
    try {
      let productImages = [];
      files.map((file) => {
        productImages.push(file.location);
      });

      payload.product_images = productImages;

      return await createProduct(payload);
    } catch (error) {
      console.log({error})
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

  static async readProductImages() {
    try {
      const productImages = await readImages();
      return productImages;
    } catch (error) {
      throw error;
    }
  }

  static async readSingleProductImage(filename) {
    try {
      const productImage = await readImage(filename);
      return productImage;
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
