import { Container } from 'typedi';
import { DataTypes, Model } from 'sequelize';
import { ContainerConstants } from '../constants';

export class UserModel extends Model {}

export const defineUserModel = async () => {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { sequelize: Container.get(ContainerConstants.Sequelize), modelName: 'User', timestamps: true },
  );
  await UserModel.sync();
};
