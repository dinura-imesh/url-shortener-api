import { verifyHashedText } from './../modules/hash';
import { getApiKeyUsageCount } from './../services/apiKeyUsageService';
import { StatusConstants } from './../constants';
import { NextFunction, Request, Response } from 'express';
import { getAPIKey } from '../services';

export const validateApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['apikey'];
  if (!apiKey || (apiKey as string).split('.').length <= 1) {
    res.status(401).json({ status: StatusConstants.INVALID_API_KEY });
    return;
  }
  const [keyId, key] = (req.headers['apikey'] as string).split('.');
  const apiKeyObject = await getAPIKey(keyId);
  if (!apiKeyObject) {
    res.status(401).json({ status: StatusConstants.INVALID_API_KEY });
    return;
  }
  const isValid = await verifyHashedText(apiKeyObject.get('keyHash') as string, key);
  if (!isValid) {
    res.status(401).json({ status: StatusConstants.INVALID_API_KEY });
    return;
  }
  if (!req.body._user?.get('isPremium')) {
    const apiKeyUsage = await getApiKeyUsageCount(keyId);
    if (apiKeyUsage >= Number(process.env.FREE_API_USAGE)) {
      res.status(401).json({ status: StatusConstants.API_KEY_FREE_USAGE_EXCEEDED });
      return;
    }
  }
  next();
};
