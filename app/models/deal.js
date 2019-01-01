import DS from 'ember-data';
import { computed } from '@ember/object';

const inverse = null;

export default DS.Model.extend({
  product: DS.belongsTo('product', { inverse, async: true }),
  reviews: DS.hasMany('review', { inverse, async: true }),
  tags: DS.hasMany('tag', { inverse, async: true }),
  // images: DS.hasMany('image', { inverse, async: true }),

  title: DS.attr('string'),
  description: DS.attr('string'),

  // TODO we should offer an array of opportunities here
  // e.g. Costco members can get a lower price than Amazon Prime can get a lower price than someone using a 20% off coupon ...
  price: DS.attr('dollars'),
  savings: computed('price', 'product.msrp', function() {
    const delta = this.get('price') / this.get('product.msrp');
    const inverse = 1 - delta;
    return parseInt(inverse * 100, 10);
  }),
  // wiki: DS.attr('string'), // someday soon
  // url: DS.attr('string'),

  url: computed('product.asin', function() {
    return `https://www.amazon.com/gp/product/${this.get('product.asin')}`
  }),

  thumbnail: computed('product.asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('product.asin')}.01.THUMBZZZ.jpg`;
  }),

  primaryImage: computed('product.asin', function() {
    return `https://images-na.ssl-images-amazon.com/images/P/${this.get('product.asin')}.01.LZZZZZZZ.jpg`;
  })
});
