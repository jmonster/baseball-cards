const path = require('path');
const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../../config/environment')()

const DAY = 8.64e+7;
const amazonFetchQueue = require('./amazon-fetch-queue');
const amazonParseQueue = require('./amazon-parse-queue');
const priceQueue = require('./price-queue');

// register workers
amazonFetchQueue.process(1, path.resolve('./amazon-fetcher.js'));
amazonParseQueue.process(5, path.resolve('./amazon-parser.js'));
priceQueue.process(1, path.resolve('./price-worker.js'));

amazonFetchQueue.on('error', function(error) {
  // An error occured.
  console.error(error);
})

amazonFetchQueue.on('waiting', function(jobId){
  // A Job is waiting to be processed as soon as a worker is idling.
  console.log('waiting on ', jobId);
});

amazonFetchQueue.on('active', function(job, jobPromise){
  // A job has started. You can use `jobPromise.cancel()`` to abort it.
  console.log('active ', job.id);
})

amazonFetchQueue.on('stalled', function(job){
  // A job has been marked as stalled. This is useful for debugging job
  // workers that crash or pause the event loop.
  console.log('stalled ', job.id);
})

amazonFetchQueue.on('progress', function(job, progress){
  // A job's progress was updated!

})

amazonFetchQueue.on('completed', function(job, result){
  // A job successfully completed with a `result`.
  console.log(job.id, ' completed');
})

amazonFetchQueue.on('failed', function(job, err){

  // amazonFetchQueue.removeRepeatable({ jobId: asin, every: 5000 });
  // amazonFetchQueue.removeRepeatable({ jobId: asin, every: 8.64e+7 });

  console.log('removing???');
  job.remove();

  console.log(job.id, ' failed');
});

amazonFetchQueue.on('paused', function(){
  // The queue has been paused.
  console.log(job.id, ' paused');
})

amazonFetchQueue.on('resumed', function(job){
  // The queue has been resumed.
  console.log(job.id, ' resumed');
})

amazonFetchQueue.on('cleaned', function(jobs, type) {
  // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
  // jobs, and `type` is the type of jobs cleaned.
  console.log('cleaned');
});

amazonFetchQueue.on('drained', function() {
  // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
  console.log('drained');
});

amazonFetchQueue.on('removed', function(job){
  // A job successfully removed.
  console.log(job.id, ' removed');
});

// grab all products out of firebase
// enqueue to check all their prices
// set to repeat daily (I guess, why not)
async function seedQueue() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  let ref = db.ref().child('products');
  ref.on('value', async function (snapshot) {
    // turn snapshot into object
    const products = snapshot.val();
    // const ASINs = Object.keys(products);
    const ASINs = ['B07FCZL1LR']
    ASINs.forEach(async (asin) => {
      amazonFetchQueue.add({ asin }, { attempts: 2 });
      // amazonFetchQueue.add({ asin }, { repeat: { jobId: asin, every: DAY }});
      // amazonFetchQueue.add({ asin }, { repeat: { jobId: asin, every: 5000 }});
    });
  });
}

seedQueue();
