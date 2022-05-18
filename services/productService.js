const {getAllProducts,readImages,readImage ,getStoreProducts} = require("../repository/index");

class Productervice {
  async getAllProducts (){
    try {
        const allProducts = await getAllProducts(suggestedMealID);
        return allProducts;
      } catch (error) {
        throw error;
      }
  }

  async readProductImages (){
    try {
        const productImages = await readImages();
        return productImages;
      } catch (error) {
        throw error;
      }
  }

  async readSingleProductImage (filename){
    try {
        const productImage = await readImage(filename);
        return productImage;
      } catch (error) {
        throw error;
      }
  }
  async storeProducts (){
    try {
        const storeProducts = await getStoreProducts();
        return storeProducts;
      } catch (error) {
        throw error;
      }
  }

}

module.exports = Productervice;
