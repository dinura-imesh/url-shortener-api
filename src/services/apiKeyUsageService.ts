import { APIKeyUsageModel } from './../models/apiKeyUseModel';

export const getApiKeyUsageCount = async (apiKeyId: string) => {
  return await APIKeyUsageModel.count({ where: { keyRef: apiKeyId } });
};

export const addApiKeyUsage = async (apiKeyId: string) => {
  return await APIKeyUsageModel.create({ keyRef: apiKeyId });
};
