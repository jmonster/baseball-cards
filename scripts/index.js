#! /usr/local/bin/node
require('dotenv').config();

const DAY = 8.64e+7;

// Firebase
const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../config/environment')();
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const { queue: AmazonFetchQueue } = require('./queues/amazon-fetch-queue');
const amazonFetchQueue = AmazonFetchQueue(db);

const amazonParseQueue = require('./queues/amazon-parse-queue');
const priceQueue = require('./queues/updated-price-queue');
const updatedProductQueue = require('./queues/updated-product-queue');

const { worker: RecordNewPriceWorker } = require('./workers/record-new-price');
const { worker: UpdatedProductWorker } = require('./workers/updated-product');
const { worker: amazonFetchProduct } = require('./workers/amazon-fetch-product');
const { worker: AmazonParseProduct } = require('./workers/amazon-parse-product');

const amazonParseProduct = AmazonParseProduct(db);
const recordNewPriceWorker = RecordNewPriceWorker(db);
const updatedProductWorker = UpdatedProductWorker(db);

// register workers
amazonFetchQueue.process(1, amazonFetchProduct);
amazonParseQueue.process(1, amazonParseProduct);
priceQueue.process(1, recordNewPriceWorker);
updatedProductQueue.process(1, updatedProductWorker);

async function checkHealth() {
  const counts = await amazonFetchQueue.checkHealth();
  console.log(counts); // print all the job counts
};

// grab all products out of firebase
// enqueue to check all their prices
// set to repeat daily (I guess, why not)
async function seedQueueFromFirebase() {
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

checkHealth();
// seedQueueFromFirebase();
console.log('oh no! look! it\'s dealzilla! RAWWWWWWR!');
