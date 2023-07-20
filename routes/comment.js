const router = require("express").Router();
const CommentController = require("../controllers/commentController");
const { validatePayload } = require("../utils/middleware/validator")
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");



router.post("/create", verifyAuthentication, validatePayload("createCommentSchema"), CommentController.createComment);
router.post("/create-reply", verifyAuthentication, validatePayload("replyCommentSchema"), CommentController.createCommentReply);
router.post("/update/:commentId", validatePayload("updateCommentSchema"), CommentController.updateComment);
router.get("/get-all/:page", verifyAuthentication, CommentController.getComments);
router.delete("/delete/:commentId", verifyAuthentication, CommentController.deleteComment)



module.exports = router;
