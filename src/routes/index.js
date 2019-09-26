import express from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import productRouter from './product';
import followRouter from './follow';
import promoterRouter from './promoter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/product', productRouter);
router.use('/follow', followRouter);
router.use('/promoter', promoterRouter);

export default router;
