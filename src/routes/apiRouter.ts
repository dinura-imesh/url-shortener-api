import { authMiddleWare } from '../middlewares';
import express from 'express';
import { createApiKey } from '../controllers';

const router = express.Router();

router.use(authMiddleWare);

router.get('/', createApiKey);

export const apiKeyRouter = router;
