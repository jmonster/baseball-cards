const assert = require('assert');
const nock = require('nock');
const amazonClient = require('../../lib/amazon-client');

describe('amazon-client', function() {
  const baseUrl = 'https://www.amazon.com/gp/product';

  beforeEach(function() {
    nock(baseUrl)
      .get('/example')
      .reply(204);
  });

  it('verifies Amazon gotOptions are being utilized', async function() {
    const { request: { gotOptions } } = await amazonClient.get('/example');
    const { headers: { accept: acceptHeader }} = gotOptions;

    assert.equal(gotOptions.href, `${baseUrl}/example`);
    assert.equal(gotOptions.protocol, 'https:');
    assert.equal(gotOptions.hostname, 'www.amazon.com');
    assert.equal(acceptHeader, 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
  });
});
