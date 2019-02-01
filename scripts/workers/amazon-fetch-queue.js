const Queue = require('bee-queue');

const redis = { port: 6379, host: '127.0.0.1' };
const queue = new Queue('amazon-fetch',
  {
    redis,
    storeJobs: false,
    removeOnSuccess: true,
    removeOnFailure: true
  }
);

async function retry(jobId, err) {
  if (+err.message === 404) {
    // abandon products that 404
    console.log('removing job ', jobId);
    return queue.removeJob(jobId);
  }
}

queue.on('job retrying', retry);

module.exports = queue;
