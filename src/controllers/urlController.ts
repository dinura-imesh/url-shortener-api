import { Request, Response } from 'express';
import { randomID } from '../modules';
import { addApiKeyUsage, createUrl, findUrl, getApiKeyUsageCount, getUser } from '../services';

export const shortenUrl = async (req: Request, res: Response) => {
  const id = randomID();
  try {
    if (!req.body._user?.get('isPremium')) {
      await addApiKeyUsage((req.headers['apikey'] as string).split('.')[0]);
    }
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).send();
  }
};

export const redirectToUrl = async (request: Request, response: Response) => {
  try {
    const url = await findUrl(request.params.id);
    if (url) {
      response.status(200).redirect(url.get('url') as string);
    } else {
      response.status(404).send('NOT_FOUND');
    }
  } catch (error) {
    response.status(500).send();
  }
};

export const getUrl = async (request: Request, response: Response) => {
  try {
    const url = await findUrl(request.query.id as string);
    if (url) {
      response.status(200).json({ url: url.get('url'), createdAt: url.get('createdAt') });
    } else {
      response.status(404).send('NOT_FOUND');
    }
  } catch (error) {
    response.status(500).send();
  }
};
