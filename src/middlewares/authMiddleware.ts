import { AuthConstants } from './../constants/authConstants';
import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../modules';
import { JwtPayload } from 'jsonwebtoken';
import { getUser } from '../services';

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['authorization'] || req.headers['authorization'].split(' ').length <= 1) {
    res.status(403).json({ status: AuthConstants.NOT_AUTHORIZED });
    return;
  }
  const token = req.headers['authorization'].split(' ')[1];
  const decodedToken = await decodeToken(token);
  if (!decodedToken) {
    res.status(403).json({ status: AuthConstants.NOT_AUTHORIZED });
    return;
  }
  if ((decodedToken as JwtPayload).exp! < new Date().getTime()) {
    res.status(401).json({ status: AuthConstants.TOKEN_EXPIRED });
    return;
  }
  const user = await getUser((decodedToken as JwtPayload).email);
  if (!user) {
    res.status(404).json({ status: AuthConstants.USER_NOT_FOUND });
    return;
  }
  req.body._user = user.toJSON();
  next();
};
