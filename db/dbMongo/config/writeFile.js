// As well as this worked, one thing to notice is that we did not call gridfs bucket 
// at all. Perhaps this is due to the fact that the grid bucket has already been initialized
// In the example provided here: https://thecodebarbarian.com/mongodb-gridfs-stream
// we find that gridfsbucket was used to call function openUploadStream but we instead use
// gridfs.createWriteStream() :)

// async function run() {

//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
exports.writeFile = (req, res, next) => {
    console.log("Comes in write file ");
    // console.log(req.file);
    console.log(req.files);

    console.log("confirming meal images name in server, to write to gridfs");

    // console.log(req.files['mealImage']);
    console.log(req.files['mealImage'][0]);

    if(req.files['mealImage' === undefined){
        next();
    }
    const mealImageNameInServer =  req.files['mealImage'][0].filename;
    console.log(mealImageNameInServer);
    const imageType =  req.files['mealImage'][0].mimetype;

//2. Connect to MongoDB and its database
mongooseDrv.connect("mongodb+srv://Olasubomi:cuuXt0ZYcogEJa7e@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );

//3. The Connection Object
var connection = mongooseDrv.connection;
if (connection !== "undefined") {
    console.log(connection.readyState.toString());

//4. The Path object
    // var path = require("path");

//5. The grid-stream
    var grid = require("gridfs-stream");

//6. The File-System module
    var fs = require("fs");

//7.Read the video/image file from the videoread folder
    // we will need to get image locally, before streaming it to store actual image in mongo
    var fileToReadsPathOnLocal =  "/Users/olasubomiawokoya/Documents/projects/ChopChowSD/multerFilesToDBs/"+ mealImageNameInServer;

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
                content_type: imageType
            });

//9b. create a readstream from the filetoread folder
            //and pipe into the database
            fs.createReadStream(fileToReadsPathOnLocal).pipe(streamwrite);

//9c. Complete the write operation with completion handler
            streamwrite.on("close", function (file) {
                console.log("Write of Meal image written successfully to gridfs database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
    console.log('Sorry not connected');
}
console.log("done");
// };
next();
}

// run().catch(console.dir);
