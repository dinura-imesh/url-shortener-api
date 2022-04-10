import shortid from 'shortid';

export const randomID = () => {
  return shortid.generate();
};
