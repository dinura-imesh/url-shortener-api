import cron from 'node-cron';
import { deleteApiKeyUsageRecords } from '../services';

export const startDeleteAPIKeyUsageCron = async () => {
  cron.schedule('0 0 0 * * *', () => {
    deleteApiKeyUsageRecords();
  });
};
