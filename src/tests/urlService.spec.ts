import { randomID } from './../modules/id';
import { describe, it } from 'mocha';
import { createUrl, findUrl } from '../services';
import { assert } from 'chai';

describe('Url service', function () {
  const randomId = randomID();
  it('should shorten url', async function () {
    await createUrl(randomId, 'https://google.lk');
  });
  it('should return shortened url', async function () {
    const url = await findUrl(randomId);
    assert(url != null);
  });
});
