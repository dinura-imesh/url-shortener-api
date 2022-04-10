import { generateAuthTokens, verifyPassword, hashPassword } from '../modules';
import { Request, Response } from 'express';
import { createUser, getUser } from '../services';
import { handleError } from '../utils';
import { AuthConstants, StatusConstants } from '../constants';

export const signUp = async (req: Request, res: Response) => {
  handleError(async () => {
    const hashedPassword = await hashPassword(req.body.password);
    const user = await createUser(req.body.firstName, req.body.lastName, req.body.email, hashedPassword, false);
    const { authToken, refreshToken } = generateAuthTokens(user.get('email') as string);
    res.status(200).json({ status: AuthConstants.SIGNED_IN, userId: user.get('id'), authToken: authToken, refreshToken: refreshToken });
  }, res);
};

export const signIn = async (req: Request, res: Response) => {
  handleError(async () => {
    const user = await getUser(req.body.email);
    if (!user) {
      res.status(404).json({ status: StatusConstants.NOT_FOUND });
      return;
    }
    const isPasswordCorrect = await verifyPassword(user.get('password') as string, req.body.password);
    if (!isPasswordCorrect) {
      res.status(403).json({ status: AuthConstants.WRONG_PASSWORD });
      return;
    }
    const { authToken, refreshToken } = generateAuthTokens(user.get('email') as string);
    res.status(200).json({ status: AuthConstants.SIGNED_IN, authToken: authToken, refreshToken: refreshToken });
  }, res);
};
