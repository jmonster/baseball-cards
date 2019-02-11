const got = require('got');
const FormData = require('form-data');

const headers = { 'Accept': 'application/json' };
const discourse = got.extend({
  'baseUrl': 'https://messeji.dealzil.la',
  responseType: 'json'
});


exports.postTopic = async function({ title, raw, api_key, api_username }) {
  const body = new FormData();

  body.append('api_key', api_key);
  body.append('api_username', api_username);
  body.append('title', title);
  body.append('raw', raw);

  return discourse.post('/posts', {
    body,
    searchParams: new URLSearchParams([['api_key', api_key]]),
    responseType: 'json'
  });
}

// NOTES: title must be unique and of a minimum length/words
// NOTES: raw must be of a minimum length/words
// exports.postTopic({title, raw, api_key, api_username })
// .catch((err) => {
//   console.error(err);
// });