require('dotenv').config();

const { JOHNNY_API_KEY: api_key, JOHNNY_API_UNAME: api_username } = process.env;
const h2p = require('html2plaintext');
const { postTopic } = require('./lib/discourse');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onNewDeal = functions.database.ref('deals/{dealId}').onCreate(onNewDeal);
async function onNewDeal(dealSnapshot/*, context*/) {
  const { price, avgPrice, product } = dealSnapshot.val();
  const ref = admin.database().ref();
  const productSnapshot = await ref.child(`products/${product}`).once('value');
  const { brand, description, title: productTitle/*, reviews, images */} = productSnapshot.val();
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1; //January is 0
  const todate = `${mm}/${dd}`;
  const title = `${productTitle} by ${brand} @ $${price/100} on ${todate}`;
  const raw = h2p(`https://dealzil.la/product/${product}<br><br>Typically priced around $${avgPrice/100}, the ${title} is available for $${price/100}.<br><br>${description}`);

  postTopic({title, raw, api_key, api_username })
    .catch((err) => {
      console.error(err);
    });
}

// open the firebase shell and then trigger the function with the following:
// firebase functions:shell
// onNewDeal({ price: '1999', avgPrice: '6000', product: 'B004Q5C35K' })