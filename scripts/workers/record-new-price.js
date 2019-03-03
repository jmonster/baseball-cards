const UNAVAILABLE = -1;

exports.keysAndValues = function keysAndValues(snapshot) {
  const val = (snapshot && snapshot.val && snapshot.val()) || {};
  const [key] = Object.keys(val);
  const [value] = Object.values(val);

  return { key, value };
};

exports.worker = function worker(db) {
  return async function priceWorker(job) {
    const { asin, price: incomingPrice } = job.data;
    const price = incomingPrice || UNAVAILABLE;
    const timestamp = Date.now();
    const priceRef = db.ref(`prices/${asin}`);

    try {
      const snapshot = await priceRef.limitToLast(1).once('value');
      const { key: lastKnownKey, value } = exports.keysAndValues(snapshot);
      const { price: lastKnownPrice } = value || { price: null };

      // when the price isn't blank and it hasn't changed
      // remove the old record before adding a new one
      if (lastKnownPrice && (lastKnownPrice === price)) {
        priceRef.child(lastKnownKey).remove();
      }
    } catch (err) {
      console.error(err);
    } finally {
      const dealsRef = db.ref('deals');
      const snapshot = await dealsRef.orderByChild('product').equalTo(asin).limitToLast(1).once('value');
      const { key: lastDealId, value: lastDeal } = exports.keysAndValues(snapshot);

      if (lastDeal) {
        let isExpired = (price === UNAVAILABLE) || (price > lastDeal.price);

        // expire deals with higher prices than the deal
        if (!lastDeal.expiredAt && isExpired) {
          console.log(`expiring ${lastDealId}`);
          const expiredAt = Date.now();
          db.ref(`deals/${lastDealId}`).update({ expiredAt });
        }

        if (lastDeal.price > price) {
          // update deal with lower price
          const lastSeenAt = Date.now();
          db.ref(`deals/${lastDealId}`).update({ price, lastSeenAt });
        }
      }

      // record latest price point
      priceRef.child(timestamp).set({ price });
    }
  };
};
