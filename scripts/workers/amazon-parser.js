const cheerio = require('cheerio')
const priceQueue = require('./price-queue');

module.exports = async function amazonParser(job) {
  const { asin, html } = job.data;
  let $;

  console.info(`parsing ${asin}`);
  job.progress(1);

  try {
    $ = cheerio.load(html);
  } catch(err) {
    console.error('balls.');
    throw new Error('Unable to cheerio.load(html)');
  }

  job.progress(25);

  // review metrics
  let price, bestOffer, reviewCount, weightedScore;
  const weights = {};

  try {
    const priceStr = $('#priceblock_ourprice').text().replace(/\t|\r|\n|\$/mgi, '');
    const priceStr_m = priceStr && priceStr.match(/\d+\.?\d+/);
    price = priceStr_m && priceStr_m[0];
    price = price || $('#new-button-price').text();
    price = price && price.replace('$','').replace(',','').replace('.','');

    // enqueue this price point to be analyzed/recorded
    priceQueue.add({ asin, price });

    const bestOfferStr = $('#mbc-upd-olp-link').text();
    bestOffer = bestOfferStr && bestOfferStr.match(/\d+\.?\d+/)[0];

    const reviewHeader = $('#reviewsMedley');
    const reviewCountSection = reviewHeader && reviewHeader.find('h2[data-hook="total-review-count"]').text();
    const reviewCountSection_m = reviewCountSection && reviewCountSection.match(/\d+/);
    reviewCount = reviewCountSection_m && reviewCountSection_m[0];

    const weightedScoreSection = reviewHeader && reviewHeader.find('i[data-hook="average-star-rating"]').text();
    const weightedScoreSection_m = weightedScoreSection && weightedScoreSection.match(/\d+\.\d+/);
    weightedScore = weightedScoreSection_m && weightedScoreSection_m[0];

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

  job.progress(50);


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

  job.progress(75);

  let images;
  try {
    images = $('img.cr-customer-image-thumbnail').map((i, el) => {
      return cheerio(el).attr('src')
    }).get();
  } catch(err) {
    console.error('balls4.');
    throw new Error("Unable to parse customer photos");
  }

  job.progress(99);

  // TODO add product description
  const data = {
    asin, price, bestOffer, reviewCount, weightedScore, weights, reviews, images
  };

  // console.info(data)
  console.log(`parsed ${asin}`);
  job.progress(100);
  return true;
};
