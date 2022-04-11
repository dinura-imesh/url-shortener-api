import { StatusConstants } from './../constants/statusConstants';
import { generateAPIKey } from './../modules/apiKey';
import { Request, Response } from 'express';
import { createAPIKey, deleteAPIKey, getAPIKeyFromUserId } from '../services';
import { handleError } from '../utils';

export const createApiKey = async (req: Request, res: Response) => {
  handleError(async () => {
    const existingApiKey = await getAPIKeyFromUserId(req.body._user.id);
    if (req.body._user.isPremium && existingApiKey != null) {
      deleteAPIKey(existingApiKey?.get('id') as string);
    } else if (existingApiKey != null) {
      res.status(400).json({ status: StatusConstants.INVALID_OPERATION });
      return;
    }
    const apiKey = await generateAPIKey();
    await createAPIKey(apiKey, req.body._user.id);
    res.status(200).send({ apiKey: apiKey });
  }, res);
};

export const getApiKey = async (req: Request, res: Response) => {
  handleError(async () => {
    const apiKey = await getAPIKeyFromUserId(req.body._user.id);
    if (apiKey != null) {
      res.status(200).json({ apiKey: `${apiKey.get('key')}` });
    }
  }, res);
};
