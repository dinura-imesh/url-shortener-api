import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
  const user = { ...req.body._user };
  delete user.password;
  res.status(200).json(user);
};
