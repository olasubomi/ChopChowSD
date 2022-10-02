require("dotenv").config();
const { MongoClient, mongodb } = require("mongodb");

const uri = process.env.MONGO_URI_DEV;
// Create a new MongoClient
// const client = new MongoClient(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    // Connect to DB
    await client.connect(err => {
      //   const collection = client.db("test").collection("devices");

      // perform actions on the collection object
      client.close();
    });
  
    // Establish and verify connection
    console.log("Connected successfully to server");
    // await client.db("Product_Supply").command({ ping: 1 });

    // Create a GridFS Bucket
    // const db = client.db("Product_Supply");
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'Product_Supply' });

    // Upload Files
    fs.createReadStream('./myFile').pipe(bucket.openUploadStream('myFile', {
      chunkSizeBytes: 1048576,
      metadata: { field: 'myField', value: 'myValue' }
    }));

    // Retrieve File Information
    const cursor = bucket.find({});
    cursor.forEach(doc => console.log(doc));

    // Download Files
    bucket.openDownloadStreamByName('myFile').
    pipe(fs.createWriteStream('./outputFile'));

    // delete bucket
    // bucket.delete(ObjectId("60edece5e06275bf0463aaf3"));
    console.log("Connected successfully to server");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
