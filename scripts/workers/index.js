const amazonFetchQueue = require('./amazon-fetch-queue');
const amazonParseQueue = require('./amazon-parse-queue');

amazonFetchQueue.process('/Users/johnny/Documents/projects/dealzilla/scripts/workers/amazon-fetcher.js');
amazonParseQueue.process('/Users/johnny/Documents/projects/dealzilla/scripts/workers/amazon-parser.js');

amazonFetchQueue.add({ asin: 'B01C3BZIIC' });
// amazonPageFetchQueue.add({ asin: 'B01C3BZIIC' });
// amazonPageFetchQueue.add({ asin: 'B01C3BZIIC' });
// amazonPageFetchQueue.add({ asin: 'B01C3BZIIC' });
// amazonPageFetchQueue.add({ asin: 'B01C3BZIIC' });


// // Repeat payment job once every day at 3:15 (am)
//  paymentsQueue.add(paymentsData, {repeat: {cron: '15 3 * * *'}});

// delay when adding another item
// const myJob = await myqueue.add({ foo: 'bar' }, { delay: 5000 });

// { repeat: { every: 8.64e+7 } } // 24h later

// TODO queue to fetch pages
// TODO separate queue to process/scrape pages
