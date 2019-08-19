import express from 'express';
import { authorAction, addNewAuthor, getAuthorById } from '../controllers/authorController';

const router = express.Router();

router.get('/', authorAction);
router.post('/', addNewAuthor);
router.get('/:authorId', getAuthorById);

export default router;
