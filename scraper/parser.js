const jsdom = require('jsdom');
const { JSDOM } = jsdom;

exports.parseLinks = function(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const rows = document.querySelectorAll('.threadtitleline form+a');
  const deals = [];

  rows.forEach((r) => {
    const href = r.href;
    const title = r.textContent;
    deals.push({ title, href });
  });

  return deals;
}

exports.parseDeal = function(html) {
  // console.log(html)
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const button = document.querySelector('#largeBuyNow');
  // console.log(button);
  return button.href;
}
