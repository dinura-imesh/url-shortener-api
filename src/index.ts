import { shortenUrl } from './controllers/urlController';
import { loadDb } from './loaders/dbLoader';
import 'reflect-metadata';
import env from 'dotenv';
import express from 'express';
import { getUrl } from './controllers';
import { createUser } from './services/userService';
import { createAPIKey, getAPIKey } from './services/apiKeyService';

env.config();

const app = express();

app.use(express.json());

app.get('/:id', getUrl);

app.post('/', shortenUrl);

const startServer = async () => {
  await loadDb();
  app.listen(process.env.PORT || 8000, () => console.log('Server started'));
  // let user = await createUser('Dinura', 'imesh', 'dinura@gmail.com', 'test123', false);
  // console.log(user.toJSON());
  try {
    // console.log(user.get('id'));
    // let key = await createAPIKey('132asd', 'a1a132fase123asd', user.get('id') as string);
    const foundKey = await getAPIKey('132asd');

    // console.log(key.toJSON());
    console.log(foundKey!.toJSON());
  } catch (error) {
    console.error(error);
  }
};

startServer();
