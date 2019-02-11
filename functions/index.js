require('dotenv').config();

const queue = require('./lib/deal-queue');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createJob = createJob;
exports.onNewDeal = functions.database.ref('deals/{dealId}').onCreate(onNewDeal);

function onNewDeal(snapshot, { params: { dealId: id }}) {
  return createJob(id);
}

function createJob(id) {
  return queue
    .createJob({ id })
    .retries(2)
    .save()
    .then(() => {})
}
