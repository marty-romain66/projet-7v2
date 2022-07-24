const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const likeController = require('../controllers/like.controller');

const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');
const admin = require('../middlewares/admin.middleware');

// Routes pour les posts
router.post('/', auth, multer, postController.createPost);
router.get('/' ,auth ,postController.getAllPosts);
router.get('/:id', auth,  postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth,  postController.deletePost);
router.delete('/admin/:id', auth, admin, postController.deletePostByAdmin);
router.get('/af' , postController.getPost);

// Routes pour les commentaires
router.post('/:postId/comments',  commentController.createComment);
router.get('/:postId/comments',  commentController.getAllComments);
router.get('/:postId/comments/:id', auth, commentController.getOneComment);
router.put('/:postId/comments/:id', auth, admin, commentController.modifyComment);
router.delete('/:postId/comments/:id',  commentController.deleteComment);
router.delete('/admin/:postId/comments/:id',  commentController.deleteCommentByAdmin);


// Routes pour les likes
router.post('/:postId/likes',  likeController.createLike);

router.delete('/:postId/likes/:id',  likeController.deleteLike);

module.exports = router;
