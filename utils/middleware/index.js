const { upload } = require('./multer-s3-middleware');
const { validatePayload } = require('./validator')

module.exports={
    upload,
    validatePayload
}