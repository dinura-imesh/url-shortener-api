import { validateApiKeyMiddleware } from '../middlewares';
import express from 'express';
import { shortenUrl, getUrl } from '../controllers';

const router = express.Router();

router.get('/', getUrl);

router.post('/', validateApiKeyMiddleware, shortenUrl);

export const urlRouter = router;
