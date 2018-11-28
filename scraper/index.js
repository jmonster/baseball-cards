const fs = require('fs');
const fetcher = require('./fetcher');
const parser = require('./parser');
const deals = [];

function processDeal(idx) {
  console.log('processing page  ', idx); // eslint-disable-line no-console

  let cachedFile, parsedDeal;

  try {
    cachedFile = fs.readFileSync(`./data/${idx}.txt`).toString();
  } catch(e) {
    console.log(`[${idx}] cache miss`); // eslint-disable-line no-console
  }

  if (cachedFile) {
    parsedDeal = parser(cachedFile);
    parsedDeal.forEach((t => { deals.push(t); }));
    fs.writeFileSync(`./data/${idx}.json`, JSON.stringify(deals));
    processDeal(idx+1);
  }

  else {
    fetcher.deal(idx, (err, { text }) => {
      fs.writeFileSync(`./data/${idx}.txt`, text);
      parsedDeal = parser(text);
      parsedDeal.forEach((t => { deals.push(t); }));
      fs.writeFileSync(`./data/${idx}.json`, JSON.stringify(deals));

      // cautiously wait
      setTimeout(() => { processDeal(idx+1); }, 12000);
    });
  }
}

processDeal(0);
