const express =  require("express");
const {likePost,createPost,deletePost,getPost, createComment} = require("../controller/postController");
const app =  express();
const router =  express.Router();

router.post('/',createPost);
router.delete('/:id',deletePost);
router.post('/like',likePost);
router.get('/',getPost);
router.post("/:id/comment",createComment);

module.exports = router;