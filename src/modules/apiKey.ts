import { v4 as uuidv4 } from 'uuid';

export const generateAPIKey = async () => {
  return uuidv4();
};
