const cheerio = require('cheerio')

module.exports = async function(job) {
  const asin = job.data.asin;
  const html = job.data.html;
  const $ = cheerio.load(html)
  job.progress(10);

  const price = $('#priceblock_ourprice').text();
  const reviews = $('#reviewsMedley').html();
  job.progress(50);

  // TODO something with this data

  // console.log(`price: ${price}`);
  // console.log(`reviews: ${reviews}`);
  return { asin, price };
};
