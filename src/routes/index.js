import express from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import productRouter from './product';
import followRouter from './follow';
import promoterRouter from './promoter';
import categoryRouter from './category';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/product', productRouter);
router.use('/follow', followRouter);
router.use('/promoter', promoterRouter);
router.use('/category', categoryRouter);

export default router;
