// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("dotenv").config();
// crypt = require("crypto");

const const_region = process.env.S3_REGION;
const const_id = process.env.CHOPCHOWAPP_USER_AWS_KEY;
const const_secret = process.env.CHOPCHOWAPP_USER_AWS_SECRET;

exports.transferToS3 = async (req, res, next) => {
  console.log("Comes in here to transfer to s3");
  var body = "";
  var jsonObj;
  req.on("data", function (chunk) {
    console.log("data recieved");
    body += chunk;
  });
  req.on("end", function () {});

  // Submittting meal images/videos to specific User and Admin access policy buckets,

  const client = new S3Client({
    credientials: {
      const_id,
      const_secret,
      const_region,
    },
  });

  const run = async (params) => {
    params.Bucket = process.env.S3BUCKET;
    // Create an object and upload it to the Amazon S3 bucket.
    try {
       await client.send(new PutObjectCommand(params));
    } catch (err) {
      console.log("Error", err);
    }
  };

  // console.log(req.body);
  var parsedstepSlides = req.body.stepSlides;

  req.body.stepSlides = parsedstepSlides;

  console.log("Checking file types of all instruction contents");

  // 6 check for instruction content to add each data to s3
  // get path of chunk content
  if (req.files["instructionChunkContent1"] != undefined) {
    const file_path = req.files["instructionChunkContent1"][0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files["instructionChunkContent1"][0].filename;
    contentType = req.files["instructionChunkContent1"][0].mimetype;
    req.body.stepSlides[0].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    await run(params);
  }
  if (req.files["instructionChunkContent2"] != undefined) {
    const file_path = req.files.instructionChunkContent2[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent2[0].filename;
    contentType = req.files["instructionChunkContent2"][0].mimetype;
    req.body.stepSlides[1].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    run(params);
  }
  if (req.files["instructionChunkContent3"] != undefined) {
    console.log("Gets in content3 if statement");
    const file_path = req.files.instructionChunkContent3[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent3[0].filename;
    contentType = req.files["instructionChunkContent3"][0].mimetype;
    req.body.stepSlides[2].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    run(params);
  }
  if (req.files["instructionChunkContent4"] != undefined) {
    const file_path = req.files.instructionChunkContent4[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent4[0].filename;
    contentType = req.files["instructionChunkContent4"][0].mimetype;

    req.body.stepSlides[3].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    run(params);
  }
  if (req.files["instructionChunkContent5"] != undefined) {
    const file_path = req.files.instructionChunkContent5[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent5[0].filename;
    contentType = req.files["instructionChunkContent5"][0].mimetype;

    req.body.stepSlides[4].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    run(params);
  }
  if (req.files["instructionChunkContent6"] != undefined) {
    const file_path = req.files.instructionChunkContent6[0].path;
    const fileStream = fs.createReadStream(file_path);
    instructionMediaName = req.files.instructionChunkContent6[0].filename;
    contentType = req.files["instructionChunkContent6"][0].mimetype;

    req.body.stepSlides[5].dataName = instructionMediaName;
    const params = {
      Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Body: fileStream, // The content of the object. For example, 'Hello world!".
      Key: instructionMediaName, // The name of the object.
      ContentType: contentType,
    };
    run(params);
  }

  // res.send(results);
  next();
};
