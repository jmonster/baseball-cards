const { REDIS_PORT: port, REDIS_HOST: host, REDIS_PASSWORD: password } = process.env;

const Queue = require('bee-queue');
const queue = new Queue('updated-product',{
  redis: password ? { port, host, password } : { port, host },
  storeJobs: false,
  removeOnSuccess: true,
  removeOnFailure: true
});

module.exports = queue;
