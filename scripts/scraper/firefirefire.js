const crypto = require('crypto')

exports.shaZam =
function shaZam (input) {
  return crypto
    .createHash('sha1')
    .update(input)
    .digest('hex')
    .slice(0, 16)
}

exports.getProductFromDB =
async function getProductFromDB (productId, db) {
  return new Promise((resolve) => {
    const child = db.ref().child('products/' + productId)
    child.once('value', (snapshot) => resolve(snapshot.val()))
  }).catch((err) => {
    console.error(err)
  })
}

exports.getDealFromDB =
async function getDealFromDB (dealId, db) {
  return new Promise((resolve) => {
    const child = db.ref().child(`deals/${dealId}`)
    child.once('value', (snapshot) => resolve(snapshot.val()))
  }).catch((err) => {
    console.error(err)
  })
}
