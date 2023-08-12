const router = require("express").Router();
const CommentController = require("../controllers/commentController");
const { validatePayload } = require("../utils/middleware/validator")
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { protect } = require("../utils/middleware/authmiddleware")

router.post("/create", protect, validatePayload("createCommentSchema"), CommentController.createComment);
router.post("/create-reply", protect, validatePayload("replyCommentSchema"), CommentController.createCommentReply);
router.post("/update/:commentId", protect, validatePayload("updateCommentSchema"), CommentController.updateComment);
router.get("/get-all/:page", protect, CommentController.getComments);
router.delete("/delete/:commentId", protect, CommentController.deleteComment)

router.patch('/upvote/:commentId', protect, CommentController.upvoteComment)
router.patch('/downvote/:commentId', protect, CommentController.downvoteComment)



module.exports = router;
