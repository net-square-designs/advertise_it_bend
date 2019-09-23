import express from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import productRouter from './product';
import followRouter from './follow';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/product', productRouter);
router.use('/follow', followRouter);

export default router;
