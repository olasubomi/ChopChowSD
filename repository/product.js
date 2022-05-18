const {
  meals,
  suggested_meals,
  meal_images,
  all_products,
  store_products,
  all_meal_categories,
  all_utensils,
  all_measurements,
} = require("../db/dbMongo/config/db_buildSchema");
//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
//2. The grid-stream
var grid = require("gridfs-stream");

const getAllProducts = async () => {
  try {
    const allProducts = await all_products.find({});
    return {
      data: allProducts,
    };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: 500,
    };
  }
};

const readImages = async (req, res) => {
  try {
    //5. Connect to MongoDB and its database
    mongooseDrv.connect(process.env.MONGODB_PRODUCT_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //6. The Connection Object
    var connection = mongooseDrv.connection;
    //7. Declare filename to read from DB
    if (connection !== "undefined") {
      //8.Open the connection and write file
      connection.once("open", () => {
        var gridfs = grid(connection.db);
        if (gridfs) {
          gridfs.files.find().toArray((err, files) => {
            // Check if files
            if (!files || files.length === 0) {
              return { fils:[]};
            } else {
              mongooseDrv.disconnect();
              return { files: files };
            }
          });
        } else {
          throw { message: "Error occurred: Mongo GridFS error", code: 500 };
        }
      });
    } else {
      throw { message: "Error occurred: database error", code: 500 };
    }
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: 500,
    };
  }
};

const readImage = async (filename) => {
  var connection = mongooseDrv.connection;
  if (connection !== "undefined") {
    connection.once("open", () => {
      var gridfs = grid(connection.db);
      if (gridfs) {
        gridfs.files.findOne({ filename: filename }, (err, file) => {
          if (!file || file.length === 0) {
            return {
              file: {},
            }
          }
          return { file: file };
        });
      } else {
        throw {
          error: error,
          messsage: error.message || "read image operation failed, database error",
          code: 500,
        };
      }
    });
  } else {
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed database connection error",
      code: 500,
    };
  }
};

const getStoreProducts = async () => {
  try {
    const storeProducts = await store_products.find({});
    return {
      data: storeProducts,
    };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get store products operation failed",
      code: 500,
    };
  }
};

module.exports = {
  getAllProducts,
  readImages,
  readImage,
  getStoreProducts,
};
