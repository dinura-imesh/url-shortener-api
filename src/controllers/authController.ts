import { generateAuthTokens, verifyHashedText, hashText, decodeToken } from '../modules';
import { Request, Response } from 'express';
import { createUser, getUser } from '../services';
import { handleError } from '../utils';
import { AuthConstants, StatusConstants } from '../constants';
import { JwtPayload } from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  handleError(async () => {
    const existingUser = await getUser(req.body.email);
    if (existingUser) {
      res.status(400).json({ status: AuthConstants.USER_EXISTS });
      return;
    }
    const hashedPassword = await hashText(req.body.password);
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
    const isPasswordCorrect = await verifyHashedText(user.get('password') as string, req.body.password);
    if (!isPasswordCorrect) {
      res.status(403).json({ status: AuthConstants.WRONG_PASSWORD });
      return;
    }
    const { authToken, refreshToken } = generateAuthTokens(user.get('email') as string);
    res.status(200).json({ status: AuthConstants.SIGNED_IN, authToken: authToken, refreshToken: refreshToken });
  }, res);
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  const decodedToken = await decodeToken(token);
  if (!decodedToken) {
    res.status(403).json({ status: AuthConstants.NOT_AUTHORIZED });
    return;
  }
  if ((decodedToken as JwtPayload).exp! < new Date().getTime()) {
    res.status(401).json({ status: AuthConstants.TOKEN_EXPIRED });
    return;
  }
  const { authToken, refreshToken } = generateAuthTokens((decodedToken as JwtPayload).email as string);
  res.status(200).json({ authToken: authToken, refreshToken: refreshToken });
};
