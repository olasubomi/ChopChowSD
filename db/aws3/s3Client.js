require("dotenv").config();
const  S3Client = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = process.env.S3_REGION; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
exports.s3Client = s3Client;