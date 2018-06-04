const fs = require('fs');
const fetcher = require('./fetcher');
const parser = require('./parser');
const therapists = [];

function processIdx(idx) {
  if (idx > 13) { return; }
  console.log('processing page  ', idx);

  let cachedFile, partialTherapists;

  try {
    cachedFile = fs.readFileSync(`./data/${idx}.txt`).toString();
  } catch(e) {
    console.log(`[${idx}] cache miss`);
    // console.error(e);
  }

  if (cachedFile) {
    partialTherapists = parser(cachedFile);
    partialTherapists.forEach((t => { therapists.push(t); }));
    fs.writeFileSync(`./data/${idx}.json`, JSON.stringify(therapists));
    processIdx(idx+1);
  }

  else {
    fetcher.therapist(idx, (err, { text }) => {
      fs.writeFileSync(`./data/${idx}.txt`, text);
      partialTherapists = parser(text);
      partialTherapists.forEach((t => { therapists.push(t); }));
      fs.writeFileSync(`./data/${idx}.json`, JSON.stringify(therapists));

      // cautiously wait
      setTimeout(() => { processIdx(idx+1); }, 12000);
    });
  }
}

processIdx(0);
