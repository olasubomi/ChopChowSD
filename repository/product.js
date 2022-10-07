const {
  products,
} = require("../db/dbMongo/config/db_buildSchema");
//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
//2. The grid-stream
var grid = require("gridfs-stream");

const createProduct = async (payload) => {
  try {
    return await products.create(payload);
  } catch (error) {
    console.log({ error });
  }
};

const getAllProducts = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const allProducts = await products
      .find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return {
      data: allProducts,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: error.code || 500,
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
              return { fils: [] };
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
            };
          }
          return { file: file };
        });
      } else {
        throw {
          error: error,
          messsage:
            error.message || "read image operation failed, database error",
          code: 500,
        };
      }
    });
  } else {
    throw {
      error: error,
      messsage:
        error.message ||
        "Get all products operation failed database connection error",
      code: 500,
    };
  }
};

const getStoreProducts = async (page, storeId) => {
  try {
    let getPaginate = await paginate(page, filter);
    const storeProducts = await products
      .find(
        {
          _id: { $in: storeId },
        } || {}
      )
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
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

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await products.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit };
};

module.exports = {
  getAllProducts,
  readImages,
  readImage,
  getStoreProducts,
  createProduct,
};
