require('dotenv').config();

const { DISCOURSE_API_KEY: api_key, DISCOURSE_API_UNAME: api_username } = process.env;
const { postTopic } = require('../lib/discourse');
const h2p = require('html2plaintext');

const IgnoredErrors = new Set([
  'Title has already been used'
]);

exports.worker = function (db) {
  return async function onUpdatedProduct(job) {
    try {
      const { asin: productId } = job.data;
      const productSnapshot = await db.ref(`products/${productId}`).once('value');
      const {
        brand,
        description,
        title: productTitle,
        messeji
        /*, reviews, images */
      } = productSnapshot.val();
      const truncatedProductTitle = productTitle.substring(0, 192); // Discourse limits titles to 255 chars
      const title = `${truncatedProductTitle} by ${brand}`;
      const raw = h2p(`https://dealzil.la/product/${productId}<br><br>${description}`);

      // when there is no existing topic on the messageboard
      if (!messeji) {
        const response = await postTopic({ title, raw, api_key, api_username });
        const { topic_id, topic_slug } = JSON.parse(response.body);
        await db
          .ref(`products/${productId}`)
          .update({
            messeji: { topic_id, topic_slug }
          });
      }
    } catch (err) {
      const { body: errBody } = err;
      try {
        const { errors } = JSON.parse(errBody);
        const filteredErrors = errors.filter((e) => !IgnoredErrors.has(e));
        if (filteredErrors.length > 0) {
          // report to Rollbar
        }
      } catch (err2) {
        // report to Rollbar
      }
    }
  };
};
