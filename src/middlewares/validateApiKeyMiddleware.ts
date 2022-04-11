import { getUserById } from './../services/userService';
import { verifyHashedText } from './../modules/hash';
import { getApiKeyUsageCount } from './../services/apiKeyUsageService';
import { StatusConstants } from './../constants';
import { NextFunction, Request, Response } from 'express';
import { getAPIKey, getUser } from '../services';

export const validateApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['apikey'] as string;
  if (!apiKey) {
    res.status(401).json({ status: StatusConstants.INVALID_API_KEY });
    return;
  }
  const apiKeyObject = await getAPIKey(apiKey);
  if (!apiKeyObject) {
    res.status(401).json({ status: StatusConstants.INVALID_API_KEY });
    return;
  }
  const user = await getUserById(apiKeyObject.get('userRef') as string);
  if (!user?.get('isPremium')) {
    const apiKeyUsage = await getApiKeyUsageCount(apiKey);
    if (apiKeyUsage >= Number(process.env.FREE_API_USAGE)) {
      res.status(401).json({ status: StatusConstants.API_KEY_FREE_USAGE_EXCEEDED });
      return;
    }
  }
  next();
};
