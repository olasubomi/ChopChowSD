const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

var s3 = new aws.S3({
    accessKeyId: process.env.CHOPCHOWAPP_USER_AWS_KEY,
    secretAccessKey: process.env.CHOPCHOWAPP_USER_AWS_SECRET,
});

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: "public-read",
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
