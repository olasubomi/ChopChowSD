// As well as this worked, one thing to notice is that we did not call gridfs bucket
// at all. Perhaps this is due to the fact that the grid bucket has already been initialized
// In the example provided here: https://thecodebarbarian.com/mongodb-gridfs-stream
// we find that gridfsbucket was used to call function openUploadStream but we instead use
// gridfs.createWriteStream() :)

// async function run() {

//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
var grid = require("gridfs-stream");
exports.writeFile = (req, res, next) => {
  // console.log(req.file);

  if (req.files["mealImage"] === undefined) {
    next();
  } else {

    const mealImageNameInServer = req.files["mealImage"][0].filename;

    const imageType = req.files["mealImage"][0].mimetype;

    var connection = mongooseDrv.connection;

    if (connection !== "undefined") {
      console.log(connection.readyState.toString());
      var fs = require("fs");
      var fileToReadsPathOnLocal =
        "/Users/olasubomiawokoya/Documents/projects/ChopChowSD/multerFilesToDBs/" +
        mealImageNameInServer;

      //8. Establish connection between Mongo and GridFS
      grid.mongo = mongooseDrv.mongo;

      console.log("Tries to open gridfs connection");

      //9.Open the connection and write file
      connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
          //9a. create writestream, to choose how to write file in database
          var streamwrite = gridfs.createWriteStream({
            //the file will be stored with the name
            filename: mealImageNameInServer,

            content_type: imageType,
          });

          fs.createReadStream(fileToReadsPathOnLocal).pipe(streamwrite);

          //9c. Complete the write operation with completion handler
          streamwrite.on("close", function (file) {
            console.log(
              "Write of Meal image written successfully to gridfs database"
            );
          });
        } else {
          throw {message:"No Grid FS Object"}
        }
      });
    } else {
   throw {message:"database connection failed"}
    }

    next();
  }
};
