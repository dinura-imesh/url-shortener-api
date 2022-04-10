import { APIKeyModel } from './../models/apiKeyModel';

export const createAPIKey = async (id: string, keyHash: string, userId: string) => {
  return await APIKeyModel.create({ id: id, keyHash: keyHash, userRef: userId });
};

export const getAPIKey = async (id: string) => {
  return await APIKeyModel.findByPk(id);
};
