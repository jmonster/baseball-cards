require('dotenv').config();

const { DISCOURSE_API_KEY: api_key, DISCOURSE_API_UNAME: api_username } = process.env;
const { postTopic } = require('../lib/discourse');
const h2p = require('html2plaintext');
const firebase = require('firebase')
const { firebase: firebaseConfig } = require('../../config/environment')();
// firebase.initializeApp(firebaseConfig);
const db = firebase.database();

module.exports = async function onUpdatedProduct(job) {
  try {
    const { asin: productId } = job.data;
    const productSnapshot = await db.ref(`products/${productId}`).once('value');
    const { brand, description, title: productTitle, messeji/*, reviews, images */} = productSnapshot.val();
    const title = `${productTitle} by ${brand}`;
    const raw = h2p(`https://dealzil.la/product/${productId}<br><br>${description}`);


    if (!messeji) {
      postTopic({ title, raw, api_key, api_username })
      .then(async (response) => {
        const { topic_id, topic_slug } = JSON.parse(response.body);
        await db.ref(`products/${productId}`).update({ messeji: { topic_id, topic_slug }});
      })
      .catch((err) => {
        console.error(err);
      });
    }
  } catch (err) {
    console.error(err);
  }
}
