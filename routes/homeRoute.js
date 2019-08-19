import express from 'express';
import homeAction from '../controllers/homeController';

const router = express.Router();

router.get('/', homeAction);

export default router;