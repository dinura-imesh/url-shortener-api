import { UserModel } from './userModel';
import { Container } from 'typedi';
import { DataTypes, Model } from 'sequelize';
import { ContainerConstants } from '../constants';

export class APIKeyModel extends Model {}

export const defineAPIKeyModel = async () => {
  APIKeyModel.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      keyHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRef: {
        type: DataTypes.UUID,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
    },
    { sequelize: Container.get(ContainerConstants.Sequelize), modelName: 'APIKey', timestamps: true },
  );
  await APIKeyModel.sync();
};
