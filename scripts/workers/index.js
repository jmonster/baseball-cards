const path = require('path');

const amazonFetchQueue = require('./amazon-fetch-queue');
amazonFetchQueue.process(path.resolve('./amazon-fetcher.js'));

const amazonParseQueue = require('./amazon-parse-queue');
amazonParseQueue.process(path.resolve('./amazon-parser.js'));

console.log('fetching first product');
const asin = 'B01C3BZIIC';

amazonFetchQueue.add({ asin }, {
  // repeat: {cron: '15 3 * * *'}, // cron schedule
  // repeat: { every: 8.64e+7 }, // 24 hours
  repeat: {  every: 500 },
  jobId: asin // this must be unique and effectively prevents us from looking up the same product multiple times
  // delay: 5000 // wait 5 seconds
});
