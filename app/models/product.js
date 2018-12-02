import DS from 'ember-data';
const { hasMany } = DS;

const inverse = null;

export default DS.Model.extend({
  name: DS.attr('string'),
  manufacturer: DS.attr('string'), // TODO it's own model?
  msrp: DS.attr('dollars'),
  // meta: {
  //   format, // bluray, dvd, vinyl, cassette, digital, ...
  //   numberOfDiscs,
  //   formatNotes, // e.g.  12" album, 33 rpm
  //   author,
  //   upc,
  //   ean,
  //   isbn,
  //   asin
  // },
  offers: hasMany('offer', { inverse, async: true }), // array of diff merchants, diff sellers on amazon, etc
  originalReleaseDate: DS.attr('date'),
  link: DS.attr('string'),
  latestPrice: DS.attr('dollars'),
  lowestPriceEver: DS.attr('dollars'),
  lowestPriceDate: DS.attr('string'),
  reviews: hasMany('review'),
  description: DS.attr('string'),
  images: hasMany('image', { inverse, async: true }),
  tags: hasMany('tag', { inverse, async: true })
});
