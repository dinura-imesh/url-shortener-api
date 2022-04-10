import { Request, Response } from 'express';
import { createUser } from '../services';

export const signUp = (req: Request, res: Response) => {
  createUser(req.body.firstName, req.body.lastName, req.body.email, '', false);
};
