import DS from 'ember-data';
import { computed } from '@ember/object';

const inverse = null;

export default DS.Model.extend({
  product: DS.belongsTo('product', { inverse, async: true }),
  reviews: DS.hasMany('review', { inverse, async: true }),
  tags: DS.hasMany('tag', { inverse, async: true }),
  images: DS.hasMany('image', { inverse, async: true }),

  title: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('string'),
  wiki: DS.attr('string'),

  primaryImage: computed(function() {
    return this.images.firstObject;
  })
});
