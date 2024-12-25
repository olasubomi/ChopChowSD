// cloudinaryConfig.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
console.log({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Chopchow",
        // format: (req, file) => {
        //     const ext = file.mimetype.split('/')[1];
        //     return ext === 'jpeg' ? 'jpg' : ext;
        // },
        // public_id: (req, file) => `${file.originalname.split('.')[0]}_${Date.now()}`,
    },
});

const uploadToCloudinary = multer({
    storage: cloudinaryStorage,
});

module.exports = {
    cloudinary,
    uploadToCloudinary,
};
