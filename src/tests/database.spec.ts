import { defineUrlModel } from './../models/urlModel';
import { describe, it } from 'mocha';
import { connectDB } from '../modules';

describe('Database', function () {
  this.timeout(5000);
  it('should connect to the database', async function () {
    await connectDB();
  });
  it('should init UrlModel', async function () {
    await defineUrlModel();
  });
});
