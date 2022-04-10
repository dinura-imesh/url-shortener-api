import { getUrl } from './../controllers/urlController';
import { authMiddleWare } from './../middlewares';
import express from 'express';
import { shortenUrl } from '../controllers';

const router = express.Router();

router.use(authMiddleWare);

router.get('/', getUrl);

router.post('/', shortenUrl);

export const urlRouter = router;
