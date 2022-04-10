import { shortenUrl } from './controllers/urlController';
import { loadDb } from './loaders/dbLoader';
import 'reflect-metadata';
import env from 'dotenv';
import express from 'express';
import { getUrl } from './controllers';
import { createUser } from './services/userService';
import { createAPIKey, getAPIKey } from './services/apiKeyService';
import { generateAuthTokens, decodeToken } from './modules';
import { authRouter } from './routes';

env.config();

const app = express();

app.use(express.json());

app.get('/:id', getUrl);

app.post('/', shortenUrl);

app.use('/auth', authRouter);

const startServer = async () => {
  await loadDb();
  app.listen(process.env.PORT || 8000, () => console.log('Server started'));
};

startServer();
