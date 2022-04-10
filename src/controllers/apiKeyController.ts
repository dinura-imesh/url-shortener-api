import { generateAPIKey } from './../modules/apiKey';
import { Request, Response } from 'express';
import { createAPIKey } from '../services';
import { handleError } from '../utils';

export const createApiKey = async (req: Request, res: Response) => {
  handleError(async () => {
    const { apiKey, key, id, hashed } = await generateAPIKey();
    await createAPIKey(id, hashed, req.body._user.id);
    res.status(200).send({ apiKey: apiKey });
  }, res);
};
