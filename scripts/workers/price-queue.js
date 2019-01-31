const Queue = require('bull');

const port = 6379;
const host = '127.0.0.1';
const password = '';

const priceQueue = new Queue('price',{
  redis: { port, host, password },
  defaultJobOptions: {
    removeOnComplete: true
  }
});

module.exports = priceQueue;
