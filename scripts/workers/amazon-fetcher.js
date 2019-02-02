// const { limiter } = require('./amazon-fetch-queue');
const amazon = require('./amazon-client');
const Bottleneck = require('bottleneck');

const amazonFetchQueue = require('./amazon-fetch-queue');
const amazonPageParseQueue = require('./amazon-parse-queue');

const limiter = new Bottleneck({
  // kick off at most 1 request/second
  minTime: 2000,   // 1 second

  // run at most 1 request simultaneously
  maxConcurrent: 1 // 1
});

const fetchAmazonProduct = async function(job) {
  const { data: { asin } } = job;
  console.info(`amazon-fetcher'ing ${asin}`);
  job.reportProgress(1);

  try {
    const { body: html } = await amazon.get(asin, { timeout: 7000 });
    job.reportProgress(99);

    await amazonFetchQueue.removeJob(asin);
    amazonFetchQueue
      .createJob({ asin })
      .setId(asin)
      .timeout(10000)
      .retries(3)
      .delayUntil(Date.now() + 8.64e+7) // 24h from now
      .save();

    // avoid duplicating parsing jobs
    await amazonPageParseQueue.removeJob(asin);
    return amazonPageParseQueue
      .createJob({ asin, html })
      .setId(asin)
      .timeout(3000)
      .retries(0)
      .save();
  } catch(err) {
    console.error(err);
    // hax because we lose the original error in our `job retrying` handler
    err.message = err.statusCode;
    throw err;
  }
};

module.exports = limiter.wrap(fetchAmazonProduct);
