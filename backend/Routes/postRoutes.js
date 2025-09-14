const express =  require("express");
const {likePost,createPost,deletePost,getPost, createComment} = require("../controller/postController");
const {auth} = require("../middleware/auth")
const app =  express();
const router =  express.Router();

router.post('/',auth,createPost);
router.delete('/:id',auth,deletePost);
router.post('/like',auth,likePost);
router.get('/',getPost);
router.post("/:id/comment",auth,createComment);

module.exports = router;