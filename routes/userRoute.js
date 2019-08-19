import express from 'express';
import { userAction, getUserById, addNewUser } from '../controllers/userController';

const router = express.Router();

router.get('/', userAction);
router.get('/:userId', getUserById);
router.post('/:userId', addNewUser);

export default router;