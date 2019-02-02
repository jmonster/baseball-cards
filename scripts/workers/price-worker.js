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

    // look up deal for this product and expire it if the price has gone up
    // TODO detch all deals for this product
    // loop through looking for any not expired
    try {
      const dealsRef = db.ref('deals');
      const lastDealRec = await dealsRef.orderByChild('product').equalTo(asin).limitToLast(1).once('value');
      const lastDealVal = lastDealRec && lastDealRec.val();
      const [lastDealId] = (lastDealVal && Object.keys(lastDealVal)) || [];
      const [lastDeal] = (lastDealVal && Object.values(lastDealVal)) || [];

      if (lastDeal) {
        console.log(`lastDeal: ${JSON.stringify(lastDeal, null, 2)}`);
        console.log(`lastDeal.expiredAt: ${lastDeal.expiredAt}`);
        console.log(`lastDeal.price: ${lastDeal.price}`);
        console.log(`price: ${price}`);

        let isExpired = (price === UNAVAILABLE) || (price > lastDeal.price);

        // expire deals with higher prices than the deal
        if (!lastDeal.expiredAt && isExpired) {
          console.log(`expiring ${lastDealId}`);
          const expiredAt = Date.now();
          db.ref(`deals/${lastDealId}`).update({ expiredAt });
        }

        if (lastDeal.price > price) {
          // update deal with now even lower price
          const lastSeenAt = Date.now();
          db.ref(`deals/${lastDealId}`).update({ price, lastSeenAt });
        }
      }

      return priceRef.child(timestamp).set({ price });
    } catch (aaa) {
      console.error(aaa);
    }

  }
  // TODO identify cost benefits of batching these requests
};
