import bcrypt from 'bcrypt';

export const hashText = (password: string) => {
  return new Promise<string>((resolve, reject) => {
    return bcrypt.hash(password, 10, function (err, hash) {
      resolve(hash);
    });
  });
};

export const verifyHashedText = (hash: string, text: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(text, hash, function (err, result) {
      resolve(result === true);
    });
  });
};
