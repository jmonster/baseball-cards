const got = require('got');

const discourse = got.extend({
  'baseUrl': 'https://messeji.dealzil.la',
  responseType: 'json'
});

exports.postTopic = async function({ title, raw, api_key, api_username }) {
  return discourse.post('/posts', {
    body: new URLSearchParams({ api_key, api_username, title, raw }).toString(),
    searchParams: new URLSearchParams([['api_key', api_key]])
  });
};

// NOTES: title must be unique and of a minimum length/words
// NOTES: raw must be of a minimum length/words
// exports.postTopic({title, raw, api_key, api_username })
// .catch((err) => {
//   console.error(err);
// });
