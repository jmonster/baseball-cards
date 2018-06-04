const request = require('superagent');

const BASE_URL = 'https://www.psychologytoday.com/us/therapists';
const ZIP_CODE = 94110;
const LIMIT = 20;
const LIMIT_PARAM = 'rec_next';
const HEADERS = {
  // actual values taken from Google Chrome
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'max-age=0',
  'cookie': 'optimizelyEndUserId=oeu1527840488603r0.9130608240887419; optimizelyBuckets=%7B%7D; _vwo_uuid_v2=D93712A1636C70DD2DF7DB868D0F6D00C|92b0ee6d152747d8c459d4b9f9fffa04; optimizelySegments=%7B%226239056744%22%3A%22gc%22%2C%226258086963%22%3A%22false%22%2C%226272502645%22%3A%22direct%22%2C%226246036792%22%3A%22none%22%7D; _uetsid=_uetecc3d50d',
  'if-modified-since': 'Fri, 01 Jun 2018 22:59:10 GMT',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

module.exports.therapist = function(idx, callback) {
  const url = `${BASE_URL}/${ZIP_CODE}`;
  const param = LIMIT*idx;

  request
    .get(url)
    .query({ [LIMIT_PARAM]: param })
    .query({ 'sid': '1527894427.4639_5272' })
    .set(HEADERS)
    .end(callback);
};

module.exports.image = function(url, callback) {
  request
    .get(url)
    .end(callback);
}
