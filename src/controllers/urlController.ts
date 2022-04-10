import { Request, Response } from 'express';
import { randomID } from '../modules';
import { createUrl, findUrl } from '../services';

export const shortenUrl = async (request: Request, response: Response) => {
  const id = randomID();
  try {
    await createUrl(id, request.body.url);
    response.status(200).json({ id: id });
  } catch (error) {
    response.status(500).send();
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
