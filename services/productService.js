const {getAllProducts,readImages,readImage ,getStoreProducts} = require("../repository/index");

class Productervice {
  static async getAllProducts (page,filter){
    try {

        const allProducts = await getAllProducts(page,filter);
        return allProducts;
      } catch (error) {
        throw error;
      }
  }

  static async readProductImages (){
    try {
        const productImages = await readImages();
        return productImages;
      } catch (error) {
        throw error;
      }
  }

  static async readSingleProductImage (filename){
    try {
        const productImage = await readImage(filename);
        return productImage;
      } catch (error) {
        throw error;
      }
  }
  static async storeProducts (page,storeId){
    try {
        const storeProducts = await getStoreProducts(page,storeId);
        return storeProducts;
      } catch (error) {
        throw error;
      }
  }

}

module.exports = Productervice;
