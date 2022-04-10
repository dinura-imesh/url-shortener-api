import { Container } from 'typedi';
import { DataTypes, Model } from 'sequelize';
import { ContainerConstants } from '../constants';
import { UserModel } from './userModel';

export class UrlModel extends Model {}

export const defineUrlModel = async () => {
  UrlModel.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      url: {
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
    { sequelize: Container.get(ContainerConstants.Sequelize), modelName: 'Url', timestamps: true },
  );
  await UrlModel.sync();
};
