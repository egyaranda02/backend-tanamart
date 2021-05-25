const { Router } = require('express');
const commentController = require('../controllers/commentController');
const commentMiddleware = require('../middleware/commentMiddleware');
const router = Router();

router.get('/getComment', commentController.getComment);
router.get('/commentDetails/:id_comment', commentController.getCommentDetails)
router.get('/getCommentByThreads/:id_threads', commentController.getCommentByThreads);
router.post('/addComment', commentController.addComment_post);
router.post('/editComment', commentMiddleware.checkUser, commentController.editComment_post);
router.delete('/deleteComment/:id_comment', commentMiddleware.checkUser, commentController.deleteComment_delete);

module.exports = router;