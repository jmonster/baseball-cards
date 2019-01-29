const path = require('path');
const amazonFetchQueue = require('./amazon-fetch-queue');
const amazonParseQueue = require('./amazon-parse-queue');

// register workers
amazonFetchQueue.process(1, path.resolve('./amazon-fetcher.js'));
amazonParseQueue.process(5, path.resolve('./amazon-parser.js'));

// (async function() {
//   const jobs = await amazonFetchQueue.getRepeatableJobs()
//   jobs.forEach(async (j) => {
//     amazonFetchQueue.removeRepeatableByKey(j.key);
//   });
// })();


// grab all deals out of firebase
// enqueue to check all their prices
// set to repeat daily (I guess, why not)
const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../../config/environment')()

async function seedQueue() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database()

  let ref = db.ref().child('products');
  ref.on('value', async function (snapshot) {
    // turn snapshot into object
    const products = snapshot.val()
    const ASINs = Object.keys(products);

    ASINs.forEach((asin) => {
      // repeatable jobs don't kick off until they reach the initial repeat interval
      // so we also add a non-repeating job to happen asap
      amazonFetchQueue.add({ asin });

      amazonFetchQueue.add({ asin }, {
        // repeat: {cron: '15 3 * * *'}, // cron schedule
        repeat: { every: 8.64e+7 }, // 24 hours
        jobId: asin // unique; scheduled at most once
      });
    });
  });
}

// seedQueue();
