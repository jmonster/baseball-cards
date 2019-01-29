const amazon = require('./amazon-client');
const amazonPageParseQueue = require('./amazon-parse-queue');


const fetchAmazonProduct = async function({ data: { asin } }) {
  console.info(`amazon-fetcher'ing ${asin}`);

  const { body: html } = await amazon.get(asin);
  amazonPageParseQueue.add({ asin, html }, {
    attempts: 1
  });

  return { asin };
};
module.exports = fetchAmazonProduct;
