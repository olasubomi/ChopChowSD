// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
// const s3Client = require("./s3Client");
// const PutObject = require ('@aws-sdk/client-s3');
// import PutObjectCommand from "@aws-sdk/client-s3";
// import s3Client from "./s3Client.js"; // Helper function that creates Amazon S3 service client module.
require("dotenv").config();
// crypt = require("crypto");

const const_region = process.env.S3_REGION;
const const_id = process.env.CHOPCHOWAPP_USER_AWS_KEY;
const const_secret = process.env.CHOPCHOWAPP_USER_AWS_SECRET;

exports.transferToS3 = (req, res, next) => {
  console.log("Comes in here to transfer to s3");
  var body = "";
  var jsonObj;
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // console.log('body: ' + body);
    //  jsonObj = JSON.parse(body);
    // console.log(jsonObj);
    // console.log(body);
  })

  // Submittting meal images/videos to specific User and Admin access policy buckets,  
  // console.log("Printing req body's meal content in transfertos3")
  // console.log(req.body.mealContentName);
  // console.log(req.body);
  console.log("Printing req files values ");
  // console.log(req.files[0].fieldname);
  // console.log(req.files);
  console.log( req.files['instructionChunkContent1']);
  console.log(req.files.instructionChunkContent1);

  // console.log(req.files.instructionChunkContent1[0]);

  const client = new S3Client({
    credientials: {
      const_id,
      const_secret,
      const_region
    }
  })

  const run = async (params) => {
    console.log("Gets in run function with params:");
    // console.log(params);
    // Create an object and upload it to the Amazon S3 bucket.
    try {

      const command = new PutObjectCommand(params);
      const results = await client.send(command);
      // const results = await s3.upload(params);

      console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
      );
      // return results; // For unit tests.
      console.log("Success", results);
      // return data; //  For unit tests.
    } catch (err) {
      console.log("Error", err);
    };


  }

  console.log("Req body is :");
  console.log(req.body.instructionsGroupList);
  // console.log(req.body);
  var parsedstepSlides = JSON.parse(req.body.instructionsGroupList);
  console.log("parsedstepSlides is :");
  console.log(parsedstepSlides);
  console.log(parsedstepSlides[0]);
  console.log(parsedstepSlides[1]);
  req.body.instructionsGroupList = parsedstepSlides

  const checkExtension = ()=>{

  }


  // 6 check for instruction content to add each data to s3
  // get path of chunk content
  if (req.files['instructionChunkContent1'] != undefined) {
    const file_path = req.files['instructionChunkContent1'][0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files['instructionChunkContent1'][0].filename;
    contentType = req.files['instructionChunkContent1'][0].mimetype;
    req.body.instructionsGroupList[0].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }
  if (req.files['instructionChunkContent2'] != undefined) {
    const file_path = req.files.instructionChunkContent2[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent2[0].filename;
    contentType = req.files['instructionChunkContent2'][0].mimetype;
    req.body.instructionsGroupList[1].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }
  if (req.files['instructionChunkConten3'] != undefined) {
    const file_path = req.files.instructionChunkContent3[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent3[0].filename;
    contentType = req.files['instructionChunkContent3'][0].mimetype;
    req.body.instructionsGroupList[2].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }
  if (req.files['instructionChunkContent4'] != undefined) {
    const file_path = req.files.instructionChunkContent4[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent4[0].filename;
    contentType = req.files['instructionChunkContent4'][0].mimetype;

    req.body.instructionsGroupList[3].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }
  if (req.files['instructionChunkContent5'] != undefined) {
    const file_path = req.files.instructionChunkContent5[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent5[0].filename;
    contentType = req.files['instructionChunkContent5'][0].mimetype;

    req.body.instructionsGroupList[4].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }
  if (req.files['instructionChunkContent6'] != undefined) {
    const file_path = req.files.instructionChunkContent6[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent6[0].filename;
    contentType = req.files['instructionChunkContent6'][0].mimetype;

    req.body.instructionsGroupList[5].instructionChunk.dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType : contentType
    };
    run(params);
  }

  // res.send(results);
  next();
};

// exports.getFromS3 = (req, res, next) => {
//   console.log("gets in get from s3 function");


//   const client = new S3Client({
//     credientials: {
//       const_id,
//       const_secret,
//       const_region
//     }
//   })

//   // Create an object and upload it to the Amazon S3 bucket.
//   const input = {
//     Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
//     Key: req.params.filename // The name of the object.
//   };


//   const run = async (input) => {

//     console.log("input: ");
//     console.log(input);
//     try {
//       // Create a helper function to convert a ReadableStream to a string.
//       const streamToString = (stream) =>
//         new Promise((resolve, reject) => {
//           const chunks = [];
//           stream.on("data", (chunk) => chunks.push(chunk));
//           stream.on("error", reject);
//           stream.on("end", () =>{
//             resolve(Buffer.concat(chunks).toString("utf8"))
//           });
//           // console.log(chunks);
//         });

//       // const client = new S3Client(config);
//       const command = new GetObjectCommand(input);
//       const data = await client.send(command);

//       // const fileStream = fs.createReadStream(data.Body);
//       // console.log(fileStream);

//       // fs.createReadStream('./myFile').pipe(bucket.openUploadStream('myFile', {
//       //   chunkSizeBytes: 1048576,
//       //   metadata: { field: 'myField', value: 'myValue' }
//       // }));


//       // console.log(data);
//       // Convert the ReadableStream to a string.
//       const bodyContents = await streamToString(data.Body);
//       // console.log("bodyContents returning..");
//       // console.log(bodyContents);
//       return bodyContents;
//       // return data;

//       // data.Body.pipe(res);
//       // res.send({bodyContents});
//       // res.send({data: bodyContents});
//       // next();

//       // // Store all of data chunks returned from the response data stream 
//       //   // into an array then use Array#join() to use the returned contents as a String
//       //   let responseDataChunks = []

//       //   // Handle an error while streaming the response body
//       //   response.Body.once('error', err => reject(err))

//       //   // Attach a 'data' listener to add the chunks of data to our array
//       //   // Each chunk is a Buffer instance
//       //   response.Body.on('data', chunk => responseDataChunks.push(chunk))

//       //   // Once the stream has no more data, join the chunks into a string and return the string
//       //   response.Body.once('end', () => responseDataChunks.join(''))
//       // console.log(responseDataChunks);
//       // // return res.json(response);
//       // res.status(200).send(responseDataChunks);
//       // res.status(200).send(bodyContents);

//     } catch (err) {
//       console.log("Error", err);
//       res.status(400).send(JSON.stringify({ msg: err }))
//     };
//   };

//   run(input);

// }


  // const file_path = req.files.instructionChunkContent1[0].path; // Path to and name of object. For example '../myFiles/index.js'.
  // console.log("File path");
  // console.log(file_path);
  // // create stream of file to read to s3
  // const fileStream = fs.createReadStream(file_path);

  // instructionMediaName = req.files.instructionChunkContent1[0].filename;
  // var contentLength = req.files.instructionChunkContent1[0].size;

  // Set parameters for post request
  // const params = {
  //   Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
  //   Body: fileStream, // The content of the object. For example, 'Hello world!".
  //   Key: instructionMediaName, // The name of the object.
  //   // ContentLength: contentLength,
  //   // Body: req.files // The content of the object. For example, 'Hello world!".
  //   // ContentMD5: md5Hash //To ensure that data is not corrupted traversing the network, use the Content-MD5 header.
  // };

  // console.log("Params: ");
  // console.log(params/K);


  // const s3 = new S3Client({
  //   region,
  //   accessKeyId,
  //   secretAccessKey
  //  })
  // set list of file types allowed into s3
  //   var mimeTypeToExtension = new Map();
  //   mimeTypeToExtension.set("image/jpeg", ".jpg");
  //   mimeTypeToExtension.set("image/png", ".png");
  //   mimeTypeToExtension.set("video/mp4", ".mp4");
  //   mimeTypeToExtension.set("video/mov", ".mov");
  //   var contentExtension = mimeTypeToExtension.get(req.files.instructionChunkContent1[0].mimetype);
  //  console.log("printing wether file mime type is in mime type extension list");
  //   console.log(contentExtension);
  // var instructionMediaName = undefined;
  // if (typeof contentExtension == "string") {
  //   instructionMediaName = req.body.mealContentName + 'InstructionContent' + contentExtension;
  // }
  // function getMD5HashFromFile(file) {
  //   console.log(file);
  //   var hash = crypt.createHash("md5")
  //     // .update(file)
  //     .digest("base64");
  //   return hash;
  // }
  //   // var md5Hash = getMD5HashFromFile(req.body.mealContentName);
  //   var md5Hash = getMD5HashFromFile(req.body.mealContentName);