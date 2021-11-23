// Import required AWS SDK clients and commands for Node.js.
import { s3Client } from "./s3Client";
const PutObjectCommand = require ('@aws-sdk/client-s3');


exports.addMealInstructionContent = (req, res) =>{
// Submittting meal images/videos to specific User and Admin access policy buckets,  

// Set parameters for post request 
const params = {
  Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
  Key: req.mealContentName, // The name of the object. For example, 'sample_upload.txt'.
  Body: req.mealContent, // The content of the object. For example, 'Hello world!".
};

const run = async () => {
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
