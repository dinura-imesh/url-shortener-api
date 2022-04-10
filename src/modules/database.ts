import { Sequelize } from 'sequelize';
import Container from 'typedi';
import { ContainerConstants } from '../constants';

export const connectDB = async () => {
  const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_SERVER,
    logging: false,
    dialect: 'mysql',
  });
  await sequelize.authenticate();
  Container.set(ContainerConstants.Sequelize, sequelize);
};
