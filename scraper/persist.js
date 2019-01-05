const firebase = require('firebase')
const camel = require('./camelcamelcamel')
const { firebase: firebaseConfig } = require('../config/environment')()
const { getProductFromDB, getDealFromDB } = require('./firefirefire')

async function main () {
  firebase.initializeApp(firebaseConfig)
  const db = firebase.database()
  const scrapedDeals = await camel()

  // persisted analytics
  let addedDealsCount = 0
  let addedProductsCount = 0

  // deals have unique cuid's; a cuid is the camelcamelcamel id
  //    in the future a deal may not have a cuid
  //    i.e. if the deal doens't originate from CCC
  // products _currently_ use the asin as their id;
  //    this is fine as we only support amazon at the moment
  Promise.all(scrapedDeals.map(async function ({ asin, cuid, title, price, msrp, avgPrice }) {
    // TODO fetch all deals and products in one query
    const productId = asin // TODO support more than just Amazon
    const product = await getProductFromDB(productId, db)
    const deal = await getDealFromDB(cuid, db)
    const createdAt = firebase.database.ServerValue.TIMESTAMP

    // skip duplicate deals
    if (deal) { return Promise.resolve() }

    // don't duplicate product records
    if (!product) {
      addedProductsCount++
      // create product record to compliment the deal
      const _product = { created_at: createdAt, asin, title, msrp }
      await db.ref().child('products').child(productId).set(_product)
    }

    const _deal = {
      product: productId, // product's parent's uuid
      created_at: createdAt,
      price,
      avgPrice
    }

    // const dealId = db.ref().child('deals').push().key;

    addedDealsCount++
    return Promise.all([
      db.ref(`products/${productId}`).child('deals').push(cuid),
      db.ref().update({ [`/deals/${cuid}`]: _deal })
    ])
  }))
    .then(async () => {
      // print persisted analytics
      console.log(`Added ${addedDealsCount} deals`)
      console.log(`Added ${addedProductsCount} products`)
      db.goOffline()
    })
    .catch((err) => {
    // TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
    // at Function.all (<anonymous>)
    // at main (/Users/johnny/Documents/projects/dealzilla/scraper/persist.js:29:11)
    // at process._tickCallback (internal/process/next_tick.js:68:7)
      console.dir(err)
      db.goOffline()
    })
}

main()
