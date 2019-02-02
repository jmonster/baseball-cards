const cheerio = require('cheerio');
const firebase = require('firebase');

const db = firebase.database();
const priceQueue = require('./price-queue');
const { shaZam } = require('../scraper/firefirefire')

// TODO refactor all the CSS selectors into a json config file
// TODO write a shared function for find a css property,
//      grabbing it's text and running the result through
//      a filter to strip whitespace, convert numbers, etc
// TODO have a function take multiple css selectors
//      and progressively try them until it finds a result
//      e.g. different selectors for finding the price
module.exports = async function amazonParser(job) {
  const { asin, html } = job.data;
  let $;

  console.info(`parsing ${asin}`);
  job.reportProgress(1);

  try {
    $ = cheerio.load(html);
  } catch(err) {
    console.error('balls.');
    throw new Error('Unable to cheerio.load(html)');
  }

  job.reportProgress(25);

  // review metrics
  let price, bestOffer, reviewCount, weightedScore, description, brand;
  const weights = {};

  // console.log(html);

  try {
    price = price || $('#cerberus-data-metrics').attr('data-asin-price');
    price = price || $('span#newBuyBoxPrice').text();
    price = price || $('#priceblock_ourprice').text();
    price = price || $('#new-button-price').text();
    price = price || $('#newBuyBoxPrice').text();
    price = price || $('.offer-price').text();
    price = price.replace(/\D/mg, '');

    // enqueue this price point to be analyzed+recorded
    await priceQueue.removeJob(asin); // avoid duplicating this work
    priceQueue.createJob({ asin, price }).setId(asin).timeout(5000).save();

    const bestOfferStr = $('#mbc-upd-olp-link').text();
    bestOffer = bestOfferStr && bestOfferStr.match(/\d+\.?\d+/)[0];

    const reviewHeader = $('#reviewsMedley');
    const reviewCountSection = reviewHeader && reviewHeader.find('h2[data-hook="total-review-count"]').text();
    const reviewCountSection_m = reviewCountSection && reviewCountSection.match(/\d+/);
    reviewCount = reviewCountSection_m && reviewCountSection_m[0];

    const weightedScoreSection = reviewHeader && reviewHeader.find('i[data-hook="average-star-rating"]').text();
    const weightedScoreSection_m = weightedScoreSection && weightedScoreSection.match(/\d+\.\d+/);
    weightedScore = weightedScoreSection_m && weightedScoreSection_m[0];

    description = $('#productDescription_feature_div').html().trim();
    brand = $('#bylineInfo').text().replace(/by/,'').trim();

    // TODO this assumes there are 5 diff scores
    // but when there are 0% of a certain score it is omitted
    // so we need to instead explicitly check which rating we're looking at
    // and store the magnitude under that specific label
    reviewHeader.find('table tr.a-histogram-row .histogram-review-count').each((i,el) => {
      // 0th index is for 5 stars, 4th index is for 1 star
      const $$ = cheerio(el);
      const elClass = $$.attr('class');
      const elClass_m = elClass && elClass.match(/(\d)star/);
      const numberOfStars = elClass_m && elClass_m[1];

      const valueStr = $$.text();
      const value_m = $$.text().match(/\d+/);

      if (numberOfStars) {
        weights[numberOfStars] = value_m && value_m[0];
      }
    }).get();
  } catch(err) {
    console.error('balls2.')
    console.error(err);
    throw new Error('Unable to parse review summary');
  }

  job.reportProgress(50);

  // inidividual reviews
  let rawReviews, reviews
  try {
    rawReviews = $('div[data-hook="review"]');
    reviews = rawReviews.map((i, el) => {
      const r = cheerio(el);
      const name = r.find('span.a-profile-name').text();
      const title = r.find('a[data-hook="review-title"]').text();
      const color = r.find('span[data-hook="format-strip-linkless"]').text().replace(/^Color\:\ /,'');
      const body = r.find('div[data-hook="review-collapsed"]').html();
      const rating_m = r.find('i[data-hook="review-star-rating"]').text().match(/\d/);
      const rating = rating_m && rating_m[0];

      return { name, rating, title, color, body }
    }).get();
  } catch(err) {
    console.error('balls3.');
    throw new Error('Unable to parse individual (top) reviews')
  }

  job.reportProgress(75);

  let images;
  try {
    images = $('img.cr-customer-image-thumbnail').map((i, el) => {
      return cheerio(el).attr('src')
    }).get();
  } catch(err) {
    console.error('balls4.');
    throw new Error("Unable to parse customer photos");
  }

  // TODO add product description
  const data = {
    asin, brand, description, lastPrice: price, bestOffer, reviewCount, weightedScore, weights, images
  };

  // fetch the product from firebase
  try {
    const productRef = db.ref(`products/${asin}`);
    const reviewsRef = db.ref(`reviews/${asin}`);

    const reviewSnapshot = await reviewsRef.once('value');
    const persistedReviews = reviewSnapshot.val() || {};
    const persistedReviewIds = Object.keys(persistedReviews);
    const setOfIds = new Set(persistedReviewIds); // O(1) lookups
    const newReviews = reviews.filter((review) => {
      const { name, title } = review;
      const hashId = shaZam(name+title);

      review.hashId = hashId;

      // true when hashId is not in our set
      return !setOfIds.has(hashId);
    });

    // create new review records + capture their keys
    // TODO batch these?
    const newReviewIds = newReviews.map((r) => {
      const hashId = r.hashId;
      delete r.hashId;

      db.ref(`reviews/${asin}`).child(hashId).set(r);
      return hashId;
    });

    // update the product itself
    // productRef.update(data); // update product

    // TODO batch these?
    // add review ids to product
    newReviewIds.forEach((key) => db.ref(`products/${asin}/reviews`).child(key).set(key));
  } catch(err) {
    console.error(err);
    throw err;
  }

  console.log(`parsed ${asin}`);
};
