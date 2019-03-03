#! /usr/local/bin/node

require('dotenv').config();

// firebase
const firebase = require('firebase');
const { firebase: firebaseConfig } = require('../../config/environment')();
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// queue
const { queue: AmazonFetchQueue } = require('../queues/amazon-fetch-queue');
const amazonFetchQueue = AmazonFetchQueue(db);

// grab all products out of firebase
// enqueue to check all their prices
// set to repeat daily
async function seedQueueFromFirebase() {
  const snapshot = await db.ref().child('products').once('value');
  const products = snapshot.val();
  const ASINs = Object.keys(products);

  const pendingChanges = ASINs.map(async (asin) => {
    // remove (possible) existing job
    await amazonFetchQueue.removeJob(asin);

    // add new job
    return amazonFetchQueue
      .createJob({ asin })
      .timeout(10000)
      .retries(3)
      .save();
  });

  return Promise.all(pendingChanges);
}

(async () => {
  await seedQueueFromFirebase();
  db.goOffline(); // disconnect from firebase
  amazonFetchQueue.close(); // disconnect from queue/redis
})();
