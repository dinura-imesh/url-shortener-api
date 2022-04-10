import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return new Promise<string>((resolve, reject) => {
    return bcrypt.hash(password, 10, function (err, hash) {
      resolve(hash);
    });
  });
};

export const verifyPassword = (hash: string, password: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      resolve(result === true);
    });
  });
};
