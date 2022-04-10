import { defineAPIKeyModel, defineAPIKeyUsageModel, defineUrlModel, defineUserModel } from '../models';
import { connectDB } from '../modules';

export const loadDb = async () => {
  try {
    await connectDB();
    await defineUserModel();
    await defineAPIKeyModel();
    await defineUrlModel();
    await defineAPIKeyUsageModel();
  } catch (error) {
    console.error(error);
  }
};
