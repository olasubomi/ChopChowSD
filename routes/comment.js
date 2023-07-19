const router = require("express").Router();
const CommentController = require("../controllers/commentController");
const { validatePayload } = require("../utils/middleware/validator")


router.post("/create", validatePayload("createCommentSchema"), CommentController.createComment);
router.post("/create-reply", validatePayload("replyCommentSchema"), CommentController.createCommentReply);
router.post("/update/:commentId", validatePayload("updateCommentSchema"), CommentController.updateComment);
router.get("/get-all/:page", CommentController.getComments);
router.get("/get/:commentId", CommentController.getComment);
router.delete("/delete/:commentId", CommentController.deleteComment)



module.exports = router;
