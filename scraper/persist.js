const firebase = require('firebase');
const camel = require('./camelcamelcamel');
const { firebase: firebaseConfig } = require('../config/environment')();
const { getProductFromDB, shaZam } = require('./firefirefire');

async function main () {
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const scrapedDeals = await camel();

  Promise.all(scrapedDeals.map(async function (deal) {
    // console.log(deal.title, deal.asin, deal.msrp);

    const uid = shaZam(deal.title);
    let product = await getProductFromDB(uid, db);

    // create new product unless it exists
    if (!product) {
      const p = {
        created_at: firebase.database.ServerValue.TIMESTAMP,
        asin: deal.asin,
        title: deal.title,
        msrp: deal.msrp,
      };

      await db.ref().child('products').child(uid).set(p);
    }

    const dealData = {
      product: uid, // product parent uniqueid
      price: deal.price,
      created_at: firebase.database.ServerValue.TIMESTAMP,
    };

    const newDealKey = db.ref().child('deals').push().key;
    const updates = {
      ['/deals/' + newDealKey]: dealData
    };

    return Promise.all([
      db.ref('products/' + uid).child('deals').push(newDealKey),
      db.ref().update(updates)
    ]);
  }))
  .then(() => {
    db.goOffline();
  })
  .catch((err) => {
    // TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
    // at Function.all (<anonymous>)
    // at main (/Users/johnny/Documents/projects/dealzilla/scraper/persist.js:29:11)
    // at process._tickCallback (internal/process/next_tick.js:68:7)
    console.dir(err);
    db.goOffline();
  });
}

main();
