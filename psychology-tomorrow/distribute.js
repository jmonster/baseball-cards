const fs = require('fs');
const util = require('./util');
const outputFolder = './dist';

// identify the last .json file
const files = fs.readdirSync('./data').filter((f) => {return /json/.test(f)}).sort();
const lastFile = files[files.length-1];
const therapists = require(`./data/${lastFile}`);

therapists.forEach((t) => {
  t.image = `/assets/images/therapists/${util.imageNameForTherapist(t.name)}`;
});
