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
      res.status(401).json({ status: StatusConstants.INVALID_OPERATION });
      return;
    }
    const { apiKey, key, id, hashed } = await generateAPIKey();
    await createAPIKey(id, hashed, req.body._user.id);
    res.status(200).send({ apiKey: apiKey });
  }, res);
};
