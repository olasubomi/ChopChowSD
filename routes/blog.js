const router = require("express").Router();
const { upload } = require("../utils/middleware");
const verifyAuthentication = require("../utils/authentication/2.verifyTokenAuthenticator.js");
const BlogController = require("../controllers/blogService")
const { uploadToCloudinary } = require('../utils/middleware/multer-s3-middleware.js');


router.post(
  "/create",
  verifyAuthentication,
  uploadToCloudinary.single("featured_image"),
  BlogController.createBlog
);


router.post(
  "/update/:id",
  verifyAuthentication,
  uploadToCloudinary.single("featured_image"),
  BlogController.editBlog
);

router.get("/get-all-blogs", BlogController.getAllBlog);
router.get("/search", verifyAuthentication, BlogController.searchBlog);
router.get("/getBlog/:id", BlogController.getOneBlog);
router.delete(
  "/deleteblog/:id",
  verifyAuthentication,
  BlogController.deleteBlog
);

module.exports = router;
