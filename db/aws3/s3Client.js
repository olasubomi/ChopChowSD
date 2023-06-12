require("dotenv").config();
const S3 = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = process.env.S3_REGION; //e.g. "us-east-1"
const const_region = process.env.S3_REGION;
const const_id = process.env.CHOPCHOWAPP_USER_AWS_KEY;
const const_secret = process.env.CHOPCHOWAPP_USER_AWS_SECRET;
// Create an Amazon S3 service client object.
const s3Client = new S3.S3Client({ region: REGION });
exports.s3Client = s3Client;

const s3Instance = new AWS3.S3Client({
  credentials: {
    accessKeyId: const_id,
    secretAccessKey: const_secret,
  },
  region: const_region,
});
