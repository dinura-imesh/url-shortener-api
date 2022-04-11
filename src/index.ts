import 'reflect-metadata';
import env from 'dotenv';
env.config();

import cors from 'cors';
import { redirectToUrl } from './controllers/urlController';
import { loadDb } from './loaders/dbLoader';
import express from 'express';
import { apiKeyRouter, authRouter, urlRouter, userRouter } from './routes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/url', urlRouter);
app.use('/api', apiKeyRouter);
app.use('/user', userRouter);

app.get('/:id', redirectToUrl);

const startServer = async () => {
  await loadDb();
  app.listen(process.env.PORT || 8000, () => console.log('Server started'));
};

startServer();
