const Queue = require('bee-queue');

const redis = { port: 6379, host: '127.0.0.1' };
const queue = new Queue('amazon-price',
  {
    redis,
    storeJobs: false,
    removeOnSuccess: true,
    removeOnFailure: true
  }
);

module.exports = queue;
