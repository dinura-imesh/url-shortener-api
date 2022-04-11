import { StatusConstants } from './../constants/statusConstants';
import { handleError } from './../utils/handleError';
import { Request, Response } from 'express';
import { randomID } from '../modules';
import { addApiKeyUsage, createUrl, findUrl } from '../services';

export const shortenUrl = async (req: Request, res: Response) => {
  handleError(async () => {
    const id = randomID();
    await createUrl(id, req.body.url);
    if (!req.body._user?.isPremium) {
      await addApiKeyUsage(req.headers['apikey'] as string);
    }
    res.status(200).json({ id: id, url: `${req.protocol}://${req.get('host')}/${id}` });
  }, res);
};

export const redirectToUrl = async (request: Request, response: Response) => {
  handleError(async () => {
    const url = await findUrl(request.params.id);
    if (url) {
      response.status(200).redirect(url.get('url') as string);
    } else {
      response.status(404).send('NOT_FOUND');
    }
  }, response);
};

export const getUrl = async (request: Request, response: Response) => {
  handleError(async () => {
    if (!request.query.id) {
      response.status(404).json({ status: StatusConstants.INVALID_ID });
      return;
    }
    const url = await findUrl(request.query.id as string);
    if (url) {
      response.status(200).json({ url: url.get('url'), createdAt: url.get('createdAt') });
    } else {
      response.status(404).json({ status: StatusConstants.INVALID_ID });
    }
  }, response);
};
