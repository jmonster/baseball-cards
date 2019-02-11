const crypto = require('crypto')

exports.shaZam =
function shaZam (input) {
  return crypto
    .createHash('sha1')
    .update(input)
    .digest('hex')
    .slice(0, 16);
}

exports.getProductFromDB =getProductFromDB;
async function getProductFromDB (productId, db) {
  const snapshot = await db.ref().child(`products/${productId}`).once('value');
  return snapshot.val();
}

exports.getDealFromDB = getDealFromDB;
async function getDealFromDB (dealId, db) {
  const snapshot = await db.ref().child(`deals/${dealId}`).once('value');
  return snapshot.val();
}
