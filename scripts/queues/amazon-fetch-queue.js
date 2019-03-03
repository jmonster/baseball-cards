const { REDIS_PORT: port, REDIS_HOST: host, REDIS_PASSWORD: password } = process.env;

const Queue = require('bee-queue');
const firebase = require('firebase');
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

function AmazonFetchQueue(db) {
  const queue = new Queue('amazon-fetch',
    {
      redis: password ? { port, host, password } : { port, host },
      storeJobs: true,
      removeOnSuccess: true,
      removeOnFailure: true,
      activateDelayedJobs: true,
      stallInterval: 5000
    }
  );

  async function onRetry(jobId, err) {
    console.log(`Job ${jobId} failed but retrying`);

    if (+err.message === 404) {
      // abandon products that 404
      queue.removeJob(jobId);

      // remove any deals related to this product
      const asin = jobId;
      const dealsRef = db.ref('deals');
      const lastDealRec = await dealsRef.orderByChild('product').equalTo(asin).limitToLast(1).once('value');
      const lastDealVal = lastDealRec && lastDealRec.val();
      const [lastDealId] = (lastDealVal && Object.keys(lastDealVal)) || [];
      const [lastDeal] = (lastDealVal && Object.values(lastDealVal)) || [];

      if (!lastDeal) { return; }

      // expire the deal that referenced this (unavailable) product
      if (!lastDeal.expiredAt) {
        const expiredAt = serverTimestamp;
        db.ref(`deals/${lastDealId}`).update({ expiredAt });
      }
    }
  }

  async function onSuccess(jobId, { asin }) {
    console.log(`Job ${jobId} succeeded for product ${asin}.`);

    // (idempotent) remove existing job, if any
    await queue.removeJob(asin);

    queue
      .createJob({ asin })
      .setId(asin) // ensure uniqueness / singularity
      .timeout(10000)
      .retries(3)
      .delayUntil(Date.now() + 8.64e+7) // 24h from now
      .save();
  }

  queue.on('job retrying', onRetry);
  queue.on('job succeeded', onSuccess);
  queue.on('failed', (err) => {
    if (err.status !== 'retrying') {
      // report to rollbar
    }
  });

  return queue;
}

exports.queue = AmazonFetchQueue;
