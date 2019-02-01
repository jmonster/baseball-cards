const firebase = require('firebase')
const db = firebase.database();

const UNAVAILABLE = -1;

module.exports = async function priceWorker(job) {
  console.log('price-worker start');
  const { asin, price: incomingPrice } = job.data;
  const price = incomingPrice || UNAVAILABLE;

  // { <ASIN>: { <TIMESTAMP>: [{ price: '999'}] }
  const timestamp = Date.now();
  const priceRef = db.ref(`prices/${asin}`);

  try {
    const snapshot = await priceRef.limitToLast(1).once('value');
    const val = (snapshot && snapshot.val()) || {};
    const keys = Object.keys(val);
    const values = Object.values(val);

    const [lastKnownKey] = keys;
    const [{ price: lastKnownPrice }] = values.length > 0 ? values : [{}];

    // when the price isn't blank
    // and it hasn't changed
    // remove the old record
    if (lastKnownPrice && (lastKnownPrice === price)) {
      priceRef.child(lastKnownKey).remove();
    }
  } catch(err) {
    console.error(err);
  } finally {
    // record latest price point
    console.log('price-worker submitting new price point');
    return priceRef.child(timestamp).set({ price });
  }
  // TODO identify cost benefits of batching these requests
};
