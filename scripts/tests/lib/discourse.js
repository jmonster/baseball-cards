const assert = require('assert');
const nock = require('nock');
const { postTopic } = require('../../lib/discourse');

const [title, raw, api_key, api_username] = ['wubalubadubdub', 'datbody', 'qwerty', 'morty'];
const bodyAsString = new URLSearchParams({ api_key, api_username, title, raw }).toString();

describe('discourse', function() {
  const baseUrl = 'https://messeji.dealzil.la';

  beforeEach(async function() {
    nock(baseUrl)
      .post('/posts', bodyAsString)
      .reply(200, `{"key": "value"}`, { 'Content-Type': 'application/json' });

    response = await postTopic({ title, raw, api_key, api_username });
  });

  it('verifies Discourse gotOptions are being utilized', async function() {
    const { request: { gotOptions } } = response;

    assert.equal(gotOptions.href, `${baseUrl}/posts`);
    assert.equal(gotOptions.protocol, 'https:');
  });

  it('verifies the content-type header is set to json', async function() {
    const { headers } = response;

    assert.equal(headers['content-type'], 'application/json');
  });
});
