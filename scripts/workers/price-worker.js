const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../../config/environment')()

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

module.exports = async function priceWorker(job) {
  console.log('priceWorker');
  const { asin, price } = job.data;
  const pricesRef = db.ref().child('prices');
  
  pricesRef.push({
    price, product: asin, timestamp: firebase.database.ServerValue.TIMESTAMP
  });

  job.progress(100);
  return true;
};
