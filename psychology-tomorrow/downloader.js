const fs = require('fs');
const async = require('async');
const fetcher = require('./fetcher');
const util = require('./util');

const files = fs.readdirSync('./data').filter((f) => {return /json/.test(f)});

const q = async.queue(function(t, callback) {
  console.log(t.image);

  const outputFileName = util.imageNameForTherapist(t.name);
  console.log(outputFileName);
  const outputFilePath = `./images/${outputFileName}`;

  if (fs.existsSync(outputFilePath)) {
    return callback();
  }

  fetcher.image(t.image, (err, res) => {
    err && console.error(err);

    fs.writeFileSync(outputFilePath, res.body);
    callback();
  });
}, 1);

files.forEach((f) => {
  const therapists = require(`./data/${f}`);

  therapists.forEach((t) => {
    if (!t.image) {
      console.log('image missing for ', t.name);
      return;
    }

    q.push(t, function (err) {
      err && console.error(err);
      console.log(`finished processing ${t.image}`);
    });
  });
});
