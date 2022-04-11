import express from 'express';
import { refreshToken, signIn, signUp } from '../controllers';

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/refresh', refreshToken);

export const authRouter = router;
