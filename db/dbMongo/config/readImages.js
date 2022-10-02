//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
//2. The grid-stream
var grid = require("gridfs-stream");
//3. The File-System module
var fs = require("fs");

//4. Establish connection between Mongo and GridFS
grid.mongo = mongooseDrv.mongo;

exports.readImages = (req, res) => {
    console.log("Gets in handler")
//5. Connect to MongoDB and its database
mongooseDrv.connect("mongodb+srv://Olasubomi:cuuXt0ZYcogEJa7e@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );
//6. The Connection Object
var connection = mongooseDrv.connection;
 
//7. Declare filename to read from DB
var filenameToDownloadToApp = "tomato.jpg";
console.log("Gets in handler2")

if (connection !== "undefined") {
    console.log("Gets in handler3")

    console.log(connection.readyState.toString());
    // var path = require("path");
    // const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db);
    // var videosrc = path.join(__dirname, "./filestowrite/celibration_write.mp4");
    console.log("Gets in handler4")

    //8.Open the connection and write file
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {

            console.log("Gets to Reading GridFS");

            gridfs.files.find().toArray((err, files)=>{
                console.log("Gets in gridfs find function");
                // Check if files
                if(!files || files.length === 0){
                    res.render('index', {files: false});
                    console.log("No Found image");
                    res.status(404);
                }
                else{
                    console.log("Finds Images!");
                    // var imagesToReturn = []
                    return res.json(files);

                    // const readstream = gfs.createReadStream(file.filename);
                    // readstream.pipe(res);
                }
              })
            // var streamwrite = gridfs.createWriteStream({
            //     //the file will be stored with the name
            //     filename: "butter.jpg"
            // });
            // var readstream = gridfs.createReadStream({
            //     filename: "tomato.jpg"
            // });
            // const {mongodb } = require("mongodb");
            // const bucket = new mongodb.GridFSBucket(db, { bucketName: 'productAndMealImages' });

            // const readstream = gridFSBucket.openUploadStream("tomato.jpg");
            // var bucket = new mongodb.GridFSBucket(db, {
            //     chunkSizeBytes: 1024,
            //     bucketName: 'songs'
            //   });
              
            // where does bucket come from ??
            // bucket.openDownloadStreamByName("tomato.jpg").
            //     pipe(fs.createWriteStream('./output.mp3')).
            //     on('error', function(error) {
            //     assert.ifError(error);
            //     }).
            //     on('finish', function() {
            //     console.log('done!');
            //     process.exit(0);
            //     });

            //error handling, e.g. file does not exist
            // readstream.on('error', function (err) {
            //     console.log('An error occurred!', err);
            //     throw err;
            // });

            // return piped readstream as response 
            // readstream.pipe(response);

            // not sure if this is necessary 
            // readstream.on("close", function (file) {
            //     console.log(file);
            //     console.log("File Read successfully from database");
            //     return res.status(200).send(file);    
            // });

        } else {
            console.log("Sorry No Grid FS Object");
            return res.status(404).send('Error occurred: Mongo GridFS error'); 

        }
    });
} else {
 
    console.log('Sorry not connected');
    return res.status(500).send('Error occurred: database error');    

}
console.log("done");
};