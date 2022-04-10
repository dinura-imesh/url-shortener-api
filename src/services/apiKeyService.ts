import { APIKeyModel } from './../models/apiKeyModel';

export const createAPIKey = async (id: string, keyHash: string, userId: string) => {
  return await APIKeyModel.create({ id: id, keyHash: keyHash, userRef: userId });
};

export const getAPIKey = async (id: string) => {
  return await APIKeyModel.findByPk(id);
};

export const getAPIKeyFromUserId = async (userId: string) => {
  return await APIKeyModel.findOne({ where: { userRef: userId } });
};

export const deleteAPIKey = async (id: string) => {
  return await APIKeyModel.destroy({ where: { id: id } });
};
