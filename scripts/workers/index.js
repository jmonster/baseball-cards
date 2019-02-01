const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../../config/environment')()
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const DAY = 8.64e+7;
const amazonFetchQueue = require('./amazon-fetch-queue');
const amazonParseQueue = require('./amazon-parse-queue');
const priceQueue = require('./price-queue');

// register workers
amazonFetchQueue.process(require('./amazon-fetcher.js'));
amazonParseQueue.process(require('./amazon-parser.js'));
priceQueue.process(require('./price-worker.js'));

// grab all products out of firebase
// enqueue to check all their prices
// set to repeat daily (I guess, why not)
async function seedQueue() {
  const snapshot = await db.ref().child('products').once('value');
  const products = snapshot.val();
  const ASINs = Object.keys(products);
  ASINs.forEach(async (asin) => {
    amazonFetchQueue
      .createJob({ asin })
      .retries(3)
      .save();
  });
}

seedQueue();
