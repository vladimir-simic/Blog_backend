import express from 'express';
import { postAction, getPostById, addNewPost } from '../controllers/postController';

const router = express.Router();

router.get('/', postAction);
router.post('/', addNewPost);
router.get('/:postId', getPostById);

export default router;
