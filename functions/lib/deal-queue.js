const { REDIS_PORT: port, REDIS_HOST: host, REDIS_PASSWORD: password } = process.env;

const Queue = require('bee-queue');
const queue = new Queue('new-deal',{
  redis: password ? { port, host, password } : { port, host },
  isWorker: false
});

module.exports = queue;
