import { Request, Response } from 'express';
import { hashPassword } from '../modules';
import { createUser } from '../services';
import { handleError } from '../utils';

export const signUp = async (req: Request, res: Response) => {
  handleError(async () => {
    const hashedPassword = await hashPassword(req.body.password);
    await createUser(req.body.firstName, req.body.lastName, req.body.email, hashedPassword, false);
  }, res);
};
