require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const queue = require('./lib/deal-queue');

exports.onNewDeal = functions.database.ref('deals/{dealId}').onCreate(onNewDeal);
function onNewDeal(snapshot, { params: { dealId: id }}) {
  return queue
    .createJob({ id })
    .retries(2)
    .save()
    .then(() => { queue.close(); })
    .catch((err) => {
      console.error(err);
      queue.close();
    });
}

// open the firebase shell and then trigger the function with the following:
// firebase functions:shell
// onNewDeal({ dealId: 12345 })