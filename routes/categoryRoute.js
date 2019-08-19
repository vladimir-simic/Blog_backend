import express from 'express';
import { categoryAction, addNewCategory, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

router.get('/', categoryAction);
router.post('/', addNewCategory);
router.get('/:categoryId', getCategoryById);

export default router;
