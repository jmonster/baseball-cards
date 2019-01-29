const path = require('path');

const amazonFetchQueue = require('./amazon-fetch-queue');
amazonFetchQueue.process(path.resolve('./amazon-fetcher.js'));

const amazonParseQueue = require('./amazon-parse-queue');
amazonParseQueue.process(path.resolve('./amazon-parser.js'));

console.log('fetching first product');
amazonFetchQueue.add({
  asin: 'B01C3BZIIC'
}, {
  // repeat: {cron: '15 3 * * *'}, // cron schedule
  // repeat: { every: 8.64e+7 }, // 24 hours
  // delay: 5000 // wait 5 seconds
});
