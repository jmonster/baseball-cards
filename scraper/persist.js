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
  let expiredDealsCount = 0

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
    if (deal) {
      let ref = db.ref().child(`deals/${cuid}`)
      let u = { lastSeenAt: firebase.database.ServerValue.TIMESTAMP }
      return ref.update(u)
    }

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

  let invalidateDeals = async function () {
    return new Promise(resolve => {
      // grab deals collection
      let ref = db.ref().child('deals')
      // grab snapshot
      ref.on("value", async function (snapshot) {
        // turn snapshot into object
        let deals = snapshot.val()
        // grab cuids from object
        let cuids = Object.keys(deals)
        // for each cuid
        await Promise.all(cuids.map(async (cuid) => {
          // get deal
          let deal = deals[cuid]
          // return if alrady expired
          if (deal.expiredAt) return
          // now utc
          let now = (new Date()).getTime()
          // last seen or created at time
          let dealDate = deal.lastSeenAt || deal.createdAt
          // see if older than
          // one day in ms
          if (now - dealDate > 86400000) {
            expiredDealsCount++
            let d = db.ref().child(`deals/${cuid}`)
            let u = { expiredAt: firebase.database.ServerValue.TIMESTAMP }
            // expire deal
            return d.update(u)
          }
        }))
        resolve()
      })
    })
  }
  await invalidateDeals()


  // print persisted analytics
  console.log(`Added ${addedDealsCount} deals`)
  console.log(`Expired ${expiredDealsCount} deals`)
  console.log(`Added ${addedProductsCount} products`)
}

main()
