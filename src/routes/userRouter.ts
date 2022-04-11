import { authMiddleWare } from './../middlewares/authMiddleware';
import express from 'express';
import { getUser } from '../controllers';

const router = express.Router();

router.use(authMiddleWare);

router.get('/', getUser);

export const userRouter = router;
