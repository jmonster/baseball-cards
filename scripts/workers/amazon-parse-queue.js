const Queue = require('bull');

const port = 6379;
const host = '127.0.0.1';
const password = '';

const amazonPageParseQueue = new Queue('amazon-parse',{
  redis: { port, host, password }
});

module.exports = amazonPageParseQueue;
