import shortid from 'shortid';
import uniqid from 'uniqid';
import { hashText } from './hash';
export const generateAPIKey = async () => {
  const key = `${uniqid()}-${shortid()}`;
  const id = `${uniqid()}-${shortid()}`;
  const hashed = await hashText(key);
  return {
    key: key,
    id: id,
    hashed: hashed,
    apiKey: `${id}.${key}`,
  };
};
