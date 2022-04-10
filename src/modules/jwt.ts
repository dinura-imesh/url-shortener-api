import jwt from 'jsonwebtoken';

export const generateAuthTokens = (email: string, authTokenValidity: number = 1, refreshTokenValidity: number = 7) => {
  const authToken = jwt.sign(
    { email: email, exp: new Date().getTime() + 86400 * 1000 * authTokenValidity, type: 'auth', iat: new Date().getTime() },
    `${process.env.JWT_SECRET}`,
  );
  const refreshToken = jwt.sign(
    { email: email, exp: new Date().getTime() + 86400 * 1000 * refreshTokenValidity, type: 'refresh', iat: new Date().getTime() },
    `${process.env.JWT_SECRET}`,
  );
  return {
    authToken: authToken,
    refreshToken: refreshToken,
  };
};

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
