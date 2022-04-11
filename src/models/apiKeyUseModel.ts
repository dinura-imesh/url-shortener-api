import { APIKeyModel } from './apiKeyModel';
import { Container } from 'typedi';
import { DataTypes, Model } from 'sequelize';
import { ContainerConstants } from '../constants';

export class APIKeyUsageModel extends Model {}

export const defineAPIKeyUsageModel = async () => {
  APIKeyUsageModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      keyRef: {
        type: DataTypes.STRING,
        references: {
          model: APIKeyModel,
          key: 'key',
        },
      },
    },
    { sequelize: Container.get(ContainerConstants.Sequelize), modelName: 'APIKeyUsage', timestamps: true },
  );
  await APIKeyUsageModel.sync();
};
