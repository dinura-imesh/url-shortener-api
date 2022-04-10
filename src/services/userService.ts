import { UserModel } from './../models/userModel';
export const createUser = async (firstName: string, lastName: string, email: string, passwordHash: string, isPremium: boolean) => {
  return await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: passwordHash,
    isPremium: isPremium,
  });
};

export const getUser = async (email: string) => {
  return await UserModel.findOne({ where: { email: email } });
};

export const getUserById = async (id: string) => {
  return await UserModel.findByPk(id);
};

export const updateUser = async (email: string, update: any) => {};
