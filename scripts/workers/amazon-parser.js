const cheerio = require('cheerio')

// TODO error handling
// unexpected exceptions seems to break the queue?

module.exports = async function amazonParser(job) {
  const { asin, html } = job.data;
  console.info(`parsing ${asin}`);

  const $ = cheerio.load(html);
  job.progress(50);

  // review metrics
  const price = $('#priceblock_ourprice').text().match(/\d+\.\d+/)[0];
  const bestOffer = $('#mbc-upd-olp-link').text().match(/\d+\.\d+/)[0];
  const reviewHeader = $('#reviewsMedley');
  const reviewCount = reviewHeader.find('h2[data-hook="total-review-count"]').text().match(/\d+/)[0];
  const weightedScore = reviewHeader.find('i[data-hook="average-star-rating"]').text().match(/\d+\.\d+/)[0];

  // TODO this assumes there are 5 diff scores
  // but when there are 0% of a certain score it is omitted
  // so we need to instead explicitly check which rating we're looking at
  // and store the magnitude under that specific label
  const weights = reviewHeader.find('table tr.a-histogram-row .histogram-review-count').map((i,el) => {
    // 0th index is for 5 stars, 4th index is for 1 star
    return cheerio(el).text().match(/\d+/)[0];
  }).get();

  // inidividual reviews
  const rawReviews = $('div[data-hook="review"]');
  const reviews = rawReviews.map((i, el) => {
    const r = cheerio(el);
    return {
      name: r.find('span.a-profile-name').text(),
      rating: r.find('i[data-hook="review-star-rating"]').text().match(/\d/)[0],
      title: r.find('a[data-hook="review-title"]').text(),
      color: r.find('span[data-hook="format-strip-linkless"]').text().replace(/^Color\:\ /,''),
      body: r.find('div[data-hook="review-collapsed"]').html()
      // TODO submit the body of the review to an API that has a human paraphrase it an echo back the new review
    }
  }).get();
  const images = $('img.cr-customer-image-thumbnail').map((i, el) => {
    return cheerio(el).attr('src')
  }).get();

  job.progress(75);

  // TODO add product description
  const data = {
    price, bestOffer, reviewCount, weightedScore, weights, //reviews, images
  };

  console.info(data)

  return { asin, price };
};
