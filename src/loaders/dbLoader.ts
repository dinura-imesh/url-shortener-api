import { defineAPIKeyModel, defineAPIKeyUsageModel, defineUrlModel, defineUserModel } from '../models';
import { connectDB } from '../modules';

export const loadDb = async () => {
  await connectDB();
  try {
    await defineUserModel();
    await defineAPIKeyModel();
    await defineUrlModel();
    await defineAPIKeyUsageModel();
  } catch (error) {
    console.error(error);
  }
};
