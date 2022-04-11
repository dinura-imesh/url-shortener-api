import { APIKeyModel } from './../models/apiKeyModel';

export const createAPIKey = async (key: string, userId: string) => {
  return await APIKeyModel.create({ key: key, userRef: userId });
};

export const getAPIKey = async (key: string) => {
  return await APIKeyModel.findByPk(key);
};

export const getAPIKeyFromUserId = async (userId: string) => {
  return await APIKeyModel.findOne({ where: { userRef: userId } });
};

export const deleteAPIKey = async (key: string) => {
  return await APIKeyModel.destroy({ where: { key: key } });
};
