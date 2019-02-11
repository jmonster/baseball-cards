const got = require('got');
const parseString = require('xml2js').parseString;
const CAMEL_RSS = 'https://camelcamelcamel.com/popular.xml';

function sanitizePrice (input) {
  // eslint-disable-next-line no-useless-escape
  return parseInt(input.replace(',', '').replace(/[\.\,]/, ''), 10);
}

module.exports = async function() {
  const { body } = await got(CAMEL_RSS);
  console.log('got body');

  const pending = new Promise(function(resolve, reject) {
    parseString(body, (err, { rss: { channel: [{ item }] } }) => {
      if (err) { return reject(err); }
      console.log('got parsed');

      const modifiedItems = item.map((it) => {
        return {
          asin: it.link[0].match(/product\/([a-zA-Z\d]{10})/)[1],
          cuid: it.guid[0]._,
          title: it.title[0],
          price: sanitizePrice(it.description[0].match(/Current Price: \$(.+\.\d{2})/)[1]),
          msrp: sanitizePrice(it.description[0].match(/List Price: \$(.+\.\d{2})/)[1]),
          avgPrice: sanitizePrice(it.description[0].match(/Avg\. Price: \$(.+\.\d{2})/)[1])
        }
      });

      console.log('got modified');
      return resolve(modifiedItems);
    });
  });

  return pending;
}

// usage
// (async () => {
//   const deals = await module.exports();
//   console.log(deals);
//   /*
//   {
//     asin: 'B07K1WWS63',
//     title: 'Apple MacBook Air (13-inch Retina display, 1.6GHz dual-core Intel Core i5, 128GB) - Silver (Latest Model)',
//     link: 'https://www.amazon.com//dp/B07K1WWS63',
//     price: '105900',
//     msrp: '119900',
//     avgPrice: '115779'
//   }
//   */
// })();
