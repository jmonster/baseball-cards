const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../config/environment')()
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const DAY = 8.64e+7;
const amazonFetchQueue = require('./queues/amazon-fetch-queue');
const amazonParseQueue = require('./queues/amazon-parse-queue');
const priceQueue = require('./queues/updated-price-queue');

// register workers
amazonFetchQueue.process(1, require('./workers/amazon-fetch-product.js'));
amazonParseQueue.process(1, require('./workers/amazon-parse-product.js'));
priceQueue.process(1, require('./workers/record-new-price.js'));

(async function() {
  const counts = await amazonFetchQueue.checkHealth();
  // print all the job counts
  console.log('job state counts:', counts);
})();
// grab all products out of firebase
// enqueue to check all their prices
// set to repeat daily (I guess, why not)
async function seedQueue() {
  const snapshot = await db.ref().child('products').once('value');
  const products = snapshot.val();
  const ASINs = Object.keys(products);
  // const ASINs = ['B07HHVF2XG'];
  ASINs.forEach(async (asin) => {
    // remove (possible) existing job
    await amazonFetchQueue.removeJob(asin);

    // add new job
    amazonFetchQueue
      .createJob({ asin })
      .timeout(10000)
      .retries(3)
      .save();
  });
}

// seedQueue();
