import { APIKeyUsageModel } from './../models/apiKeyUseModel';

export const getApiKeyUsageCount = async (apiKey: string) => {
  return await APIKeyUsageModel.count({ where: { keyRef: apiKey } });
};

export const addApiKeyUsage = async (apiKey: string) => {
  return await APIKeyUsageModel.create({ keyRef: apiKey });
};
