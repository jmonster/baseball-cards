var firebase = require("firebase");
var crypto = require('crypto');

var camel = require('./camel')

var config = {
  apiKey: "AIzaSyB1zuup7KDVsTVyUEqQ4sly6LwSmCJQxu0",
  authDomain: "thedealzillaprojectid.firebaseapp.com",
  databaseURL: "https://thedealzillaprojectid.firebaseio.com/",
  projectId: "thedealzillaprojectid",
  storageBucket: "gs://thedealzillaprojectid.appspot.com",
};
firebase.initializeApp(config);

const db = firebase.database()

var getSha = function (input) {
  return crypto.createHash('sha1').update(input).digest('hex').slice(0,16)
}

var getProduct = async function (uid) {
  return new Promise(resolve => {
    db.ref().child('products/' + uid).once('value', function (snapshot) {
      resolve(snapshot.val())
    })
  });
}

async function main () {
  let scrapedDeals = await camel()

 await Promise.all(scrapedDeals.forEach(async function (deal) {
    console.log(deal.title, deal.asin, deal.msrp)
    let uid = getSha(deal.title)
    let product = await getProduct(uid)

    if (!product) {
      let p = {
        created_at: firebase.database.ServerValue.TIMESTAMP,
        asin: deal.asin,
        title: deal.title,
        msrp: deal.msrp,
      }
      db.ref().child('products').child(uid).set(p)
    }

    product = await getProduct(uid)

    var dealData = {
      product: uid, // product parent uniqueid
      price: deal.price,
      created_at: firebase.database.ServerValue.TIMESTAMP,
    };

    var newDealKey = db.ref().child('deals').push().key;
    var updates = {};
    updates['/deals/' + newDealKey] = dealData;
    db.ref('products/' + uid).child('deals').push(newDealKey)
    db.ref().update(updates);

    console.log(product)
  }))

  db.goOffline()
}

main()

