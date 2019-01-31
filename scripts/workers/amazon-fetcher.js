const amazon = require('./amazon-client');
const amazonPageParseQueue = require('./amazon-parse-queue');
const amazonFetchQueue = require('./amazon-fetch-queue');


const fetchAmazonProduct = async function(job) {
  const { data: { asin } } = job;
  console.info(`amazon-fetcher'ing ${asin}`);
  job.progress(1);

  try {
    const { body: html } = await amazon.get(asin);
    job.progress(99);

    amazonPageParseQueue.add({ asin, html }, {
      attempts: 1
    });

    job.progress(100);
    return true;
  } catch(err) {
    console.log(`status: ${err.statusCode}`);
    throw new Error('Unable to fetch Amazon page.');
  }
};
module.exports = fetchAmazonProduct;
