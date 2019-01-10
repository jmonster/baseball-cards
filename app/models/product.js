import DS from 'ember-data';
import { computed } from '@ember/object';
import ENV from 'dealzilla/config/environment';

const { hasMany } = DS;

const inverse = null;

export default DS.Model.extend({
  deals: hasMany('deal',  { inverse, async: true }),
  // offers: hasMany('offer', { inverse, async: true }), // array of diff merchants, diff sellers on amazon, etc
  // images: hasMany('image', { inverse, async: true }),
  // tags: hasMany('tag', { inverse, async: true }),
  // reviews: hasMany('review'),

  title: DS.attr('string'),
  asin: DS.attr('string'),
  msrp: DS.attr('dollars'),

  // manufacturer: DS.attr('string'), // TODO it's own model?
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
  // originalReleaseDate: DS.attr('date'),
  // link: DS.attr('string'),
  // latestPrice: DS.attr('dollars'),
  // lowestPriceEver: DS.attr('dollars'),
  // lowestPriceDate: DS.attr('string'),
  // description: DS.attr('string'),
  url: computed('asin', function() {
    return `https://www.amazon.com/gp/product/${this.get('asin')}/?tag=${ENV.amazonAffliateTag}`
  }),

  thumbnail: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.THUMBZZZ.jpg`;
  }),

  primaryImage: computed('asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('asin')}.01.LZZZZZZZ.jpg`;
  })
});
