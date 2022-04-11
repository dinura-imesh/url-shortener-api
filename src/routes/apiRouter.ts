import { authMiddleWare } from '../middlewares';
import express from 'express';
import { createApiKey, getApiKey } from '../controllers';

const router = express.Router();

router.use(authMiddleWare);

router.get('/', getApiKey);

router.post('/', createApiKey);

export const apiKeyRouter = router;
