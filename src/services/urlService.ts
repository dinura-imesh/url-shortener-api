import { UrlModel } from '../models';

export const createUrl = async (id: string, url: string) => {
  await UrlModel.create({ id: id, url: url });
};

export const findUrl = async (id: string) => {
  return await UrlModel.findOne({ where: { id: id } });
};
