const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const selectors = {
  // row: '.result-row',
  // name: 'span[itemprop="name"]',
  // title: 'span[itemprop="jobTitle"]'
};

module.exports = function(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const rows = document.querySelectorAll(selectors.row);
  const deals = [];

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
    });

    deals.push(T);
  });

  return deals;
}
