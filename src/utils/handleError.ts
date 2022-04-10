import { Response } from 'express';
import { StatusConstants } from '../constants';

export const handleError = (func: Function, res: Response, message?: string) => {
  try {
    func();
  } catch (error) {
    res.status(500).json({ status: StatusConstants.INTERNAL_SERVER_ERROR, message: message ?? '' });
  }
};
