const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const selectors = {
  row: '.result-row',
  name: 'span[itemprop="name"]',
  title: 'span[itemprop="jobTitle"]',
  licenses: '.result-suffix span[class="nowrap"]',
  description: 'div[itemprop="description"]',
  phone: '.result-phone',
  city: 'span[itemprop="addressLocality"]',
  state: 'span[itemprop="addressRegion"]',
  zip: 'span[itemprop="postalcode"]',
  image: 'img[itemprop="image"]',
  isVerified: '.result-verified' // if present
};

module.exports = function(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const rows = document.querySelectorAll(selectors.row);
  const therapists = [];

  rows.forEach((r) => {
    const T = {};

    Object.keys(selectors).forEach((selectorKey) => {
      const selector = selectors[selectorKey];
      const thing = r.querySelector(selector);

      // apparently there are some null entries
      if (!thing) { return; }

      const textContent = thing.textContent;
      const src = thing.src;

      T[selectorKey] = textContent || src;
      // T[selectorKey] = textContent || (src && src.replace(/\?.*$/, ""));
    });

    therapists.push(T);
  });

  return therapists;
}
