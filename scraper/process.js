const Promise = require('bluebird');
const fs = require('fs');
const { fetchIndex, fetchDeal, fetchMerchantProductPage } = require('./fetcher');
const { parseLinks, parseDeal } = require('./parser');

const TIMEOUT = 5000; // ms until a request is considered failed
const DELAY = 500;    // ms delay inbetween requests
const RETRY = 3;      // number of times to retry a failed request

function downloadDealIndex() {
  const pageNumber = 0; // hardcode for now

  fetchIndex(pageNumber, (err, { text }) => {
    fs.writeFileSync(`./data/${pageNumber}.html`, text);
  });
}

function extractDealLinksFromPage(pageNumber) {
  const page = fs.readFileSync(`./data/${pageNumber}.html`).toString();
  const links = parseLinks(page);
  fs.writeFileSync(`./data/${pageNumber}.json`, JSON.stringify(links));
  return links;
}

function gatherProductUrls(dealLinks, idx) {
  // start with current being an "empty" already-fulfilled promise
  var current = Promise.fulfilled();

  Promise.all(dealLinks.map((url) => {
      current = current.then(() => {
        return fetchDeal(url);
      }).then(({ text }) => {
        const href = parseDeal(text);
        return fetchMerchantProductPage(href);
      }).then((merchantResponse) => {
        const mUrl = merchantResponse.redirects[merchantResponse.redirects.length - 1];
        return mUrl;
      });
      return current;
  })).then(function(merchantUrls) {
    console.log(`merchantUrls: ${merchantUrls}`);
      // results is an array of names
  })
}

// downloadDealIndex();
const dealUrls = extractDealLinksFromPage(0);
gatherProductUrls(dealUrls);
