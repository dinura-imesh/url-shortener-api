import 'reflect-metadata';
import env from 'dotenv';
env.config();

import cors from 'cors';
import { redirectToUrl } from './controllers/urlController';
import { loadDb } from './loaders/dbLoader';
import express from 'express';
import { apiKeyRouter, authRouter, urlRouter, userRouter } from './routes';
import { startDeleteAPIKeyUsageCron } from './cron';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
app.use(express.json());

app.use('/a/auth', authRouter);
app.use('/a/url', urlRouter);
app.use('/a/api', apiKeyRouter);
app.use('/a/user', userRouter);

app.get('/a/:id', redirectToUrl);

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

const startServer = async () => {
  await loadDb();
  startDeleteAPIKeyUsageCron();
  app.listen(process.env.PORT || 8000, () => console.log('Server started'));
};

startServer();
