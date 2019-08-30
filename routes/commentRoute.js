import express from 'express';
import { commentAction, getCommentById, addNewComment } from '../controllers/commentController';

const router = express.Router();
//
router.get('/', commentAction);
// router.post('/:commentId', addNewComment);
router.post('/posts/:commentId/comments', addNewComment);

router.get('/:commentId', getCommentById);

export default router;
