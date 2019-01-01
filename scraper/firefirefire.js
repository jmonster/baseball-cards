const crypto = require('crypto');

exports.shaZam =
function shaZam(input) {
  return crypto
    .createHash('sha1')
    .update(input)
    .digest('hex')
    .slice(0,16);
}

exports.getProductFromDB =
async function getProductFromDB(uid, db) {
  return new Promise((resolve, reject) => {
    const child = db.ref().child('products/' + uid);
    child.once('value', (snapshot) => resolve(snapshot.val()));
  }).catch((err) => {
    console.error(err);
  });
}
