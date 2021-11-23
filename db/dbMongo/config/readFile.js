var mongooseDrv = require("mongoose");
var schema = mongooseDrv.Schema;
mongooseDrv.connect("mongodb+srv://Olasubomi:cuuXt0ZYcogEJa7e@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );

var connection = mongooseDrv.connection;
 
if (connection !== "undefined") {
    console.log(connection.readyState.toString());
    var path = require("path");
    var grid = require("gridfs-stream");
    var fs = require("fs");
    var videosrc = path.join(__dirname, "./filestowrite/celibration_write.mp4");
    grid.mongo = mongooseDrv.mongo;
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
            // var fsstreamwrite = fs.createWriteStream(
            //     path.join(__dirname, "./filestowrite/dbtomato.jpg")
            // );
 
            var readstream = gridfs.createReadStream({
                // may be better to pass in the id
                filename: "tomato.jpg"
            });

            // return piped readstrwam as response 
            // readstream.pipe(fsstreamwrite);
            readstream.on("close", function (file) {
                console.log("File Read successfully from database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");