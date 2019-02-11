const { REDIS_PORT: port, REDIS_HOST: host, REDIS_PASSWORD: password } = process.env;

const Queue = require('bee-queue');

const amazonParseQueue = new Queue('amazon-parse',{
  redis: password ? { port, host, password } : { port, host },
  storeJobs: false,
  removeOnSuccess: true,
  removeOnFailure: true
});

const updatedProductQ = new Queue('updated-product',{
  redis: password ? { port, host, password } : { port, host },
  isWorker: false
});

async function onSuccess(jobId, { asin }) {
  console.log(`Parsing job ${jobId} succeeded for product ${asin}.`);

  updatedProductQ
    .createJob({ asin })
    .timeout(30000)
    .retries(5)
    .save();
}

amazonParseQueue.on('job succeeded', onSuccess);

module.exports = amazonParseQueue;
