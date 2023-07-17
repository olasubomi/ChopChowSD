const router = require("express").Router();
const CommentController = require("../controllers/commentController");

//Comment routes

router.post("/create", CommentController.createComment);
router.post("/create-reply", CommentController.createCommentReply);
router.post("/update/:commentId", CommentController.updateComment);
router.get("/get-all/:page", CommentController.getComments);
router.get("/get/:commentId", CommentController.getComment);
router.delete("/delete/:commentId", CommentController.deleteComment)



module.exports = router;
