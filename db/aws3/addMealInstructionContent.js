import { S3Client, PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
// Import required AWS SDK clients and commands for Node.js.
import { } from "@aws-sdk/client-s3";

// Set the AWS Region.
const REGION = process.env.S3_REGION; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
export { s3Client };

exports.addMealInstructionContent = (req, res) =>{
// Submittting meal images/videos to specific User and Admin access policy buckets,  

// Set the parameters
const params = {
  Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
  Key: req.mealContentName, // The name of the object. For example, 'sample_upload.txt'.
  Body: req.mealContent, // The content of the object. For example, 'Hello world!".
};

const run = async () => {
  // Create an Amazon S3 bucket.
  try {
    const data = await s3Client.send(
        new CreateBucketCommand({ Bucket: params.Bucket })
    );
    console.log(data);
    console.log("Successfully created a bucket called ", data.Location);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
    // return results; // For unit tests.
    console.log(results);
    res.send(results);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
};
