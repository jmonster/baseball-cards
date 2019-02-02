const Queue = require('bee-queue');
const firebase = require('firebase');

const db = firebase.database();
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
    queue.removeJob(jobId);

    // remove any deals related to this product
    const asin = jobId;
    const dealsRef = db.ref('deals');
    const lastDealRec = await dealsRef.orderByChild('product').equalTo(asin).limitToLast(1).once('value');
    const lastDealVal = lastDealRec && lastDealRec.val();
    const [lastDealId] = (lastDealVal && Object.keys(lastDealVal)) || [];
    const [lastDeal] = (lastDealVal && Object.values(lastDealVal)) || [];

    if (!lastDeal.expiredAt) {
      console.log(`expiring ${lastDealId}`);
      const expiredAt = Date.now();
      db.ref(`deals/${lastDealId}`).update({ expiredAt });
    }
  }
}

queue.on('job retrying', retry);

module.exports = queue;
