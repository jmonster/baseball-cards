#! /usr/local/bin/node
require('dotenv').config();
const { REDIS_PORT: port, REDIS_HOST: host, REDIS_PASSWORD: password } = process.env;

const firebase = require('firebase');
const camel = require('./camelcamelcamel');
const { firebase: firebaseConfig } = require('../../config/environment')();
const { getProductFromDB, getDealFromDB } = require('./helpers');
const Queue = require('bee-queue');
const queue = new Queue('amazon-fetch',
  {
    redis: password ? { port, host, password } : { port, host },
    isWorker: false
  }
);
const ONE_DAY = 8.64e+7;

async function main () {
  // setup DB access
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // fetch CCC's deals list (via their RSS feed)
  let scrapedDeals;
  try {
    scrapedDeals = await camel();
  } catch(err) {
    console.error("ERROR: Unable to access camelcamelcamel.");
    console.error(err);
    process.exit(-3);
  }

  // persisted analytics
  let addedDealsCount = 0;
  let addedProductsCount = 0;
  let expiredDealsCount = 0;

  const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;
  const batchUpdates = {};

  // deals have unique cuid's; a cuid is the camelcamelcamel id
  //    in the future a deal may not have a cuid
  //    i.e. if the deal doens't originate from CCC
  // products _currently_ use the asin as their id;
  //    this is fine as we only support amazon at the moment
  await Promise.all(scrapedDeals.map(async function({ asin, cuid, title, price, msrp, avgPrice }) {
    // add this deal to our price monitoring queue
    queue
      .createJob({ asin })
      .timeout(10000)
      .retries(3)
      .save();
    
    // TODO fetch all deals and products in one query
    const productId = asin; // TODO support more than just Amazon
    const createdAt = serverTimestamp;
    const [product, deal] = await Promise.all([
      getProductFromDB(productId, db),
      getDealFromDB(cuid, db)
    ]);

    // skip duplicate deals (ensure unique `cuid` values)
    if (deal) {
      // update the deal to note that we observe it is still being a deal right now
      batchUpdates[`/deals/${cuid}`] = { lastSeenAt: serverTimestamp };
      return;
    }

    // skip duplicate products
    if (!product) {
      addedProductsCount++;
      // create product record to compliment the deal
      const _product = { created_at: createdAt, asin, title, msrp };
      await db.ref().child('products').child(productId).set(_product);
    }

    const _deal = {
      product: productId, // product's parent's uuid
      created_at: createdAt,
      price,
      avgPrice
    }
    
    addedDealsCount++;
    return Promise.all([
      // i think there is simpler syntax for this
      db.ref(`products/${productId}`).child('deals').push(cuid),
      db.ref().update({ [`/deals/${cuid}`]: _deal })
    ]);
  }))
  .then(async () => {
    // grab (all) deals
    const ref = db.ref().child('deals');
    const snapshot = await ref.once('value');
    const deals = snapshot.val();

    // grab cuids from object
    const cuids = Object.keys(deals);
    cuids.forEach((cuid) => {
      const deal = deals[cuid];

      // return if alrady expired
      if (deal.isExpired) { return; }
      
      const now = Date.now();
      const dealDate = deal.lastSeenAt || deal.createdAt;

      if ((now - dealDate) > ONE_DAY) {
        expiredDealsCount++;

        batchUpdates[`/deals/${cuid}`] = { expiredAt: serverTimestamp };
      }
    });

    return db.ref().update(batchUpdates);
  })
  .then(async () => {
    // print persisted analytics
    console.log(`Added ${addedDealsCount} deals`);
    console.log(`Expired ${expiredDealsCount} deals`);
    console.log(`Added ${addedProductsCount} products`);
    queue.close();
    return db.goOffline();
  })
  .catch((err) => {
  // TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
  // at Function.all (<anonymous>)
  // at main (/Users/johnny/Documents/projects/dealzilla/scraper/persist.js:29:11)
  // at process._tickCallback (internal/process/next_tick.js:68:7)
    console.error(err);
    queue.close();
    return db.goOffline();
  });
}

main();
