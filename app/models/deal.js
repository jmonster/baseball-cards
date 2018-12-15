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
  // wiki: DS.attr('string'), // someday soon
  url: DS.attr('string'),

  primaryImage: computed(function() {
    // return this.product.images.firstObject;
    return { url: '/assets/images/branding/block.png' }
  })
});
