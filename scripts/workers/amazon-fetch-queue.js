const Queue = require('bull');

const port = 6379;
const host = '127.0.0.1';
const password = '';

const amazonFetchQueue = new Queue('amazon-fetch',
  {
    redis: { port, host, password },
    limiter: { max: 1, duration: 1000 }, // 1 request per second (amazon's limit)
    lifo: true // newer items are processed sooner
  }
);

module.exports = amazonFetchQueue;
