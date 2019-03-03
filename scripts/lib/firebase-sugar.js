exports.getProductFromDB = getProductFromDB;
async function getProductFromDB(productId, db) {
  const snapshot = await db.ref().child(`products/${productId}`).once('value');
  return snapshot.val();
}

exports.getDealFromDB = getDealFromDB;
async function getDealFromDB(dealId, db) {
  const snapshot = await db.ref().child(`deals/${dealId}`).once('value');
  return snapshot.val();
}
