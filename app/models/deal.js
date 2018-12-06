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
  price: DS.attr('dollars'),
  wiki: DS.attr('string'),
  url: DS.attr('string'),

  primaryImage: computed(function() {
    return { path: 'https://images.unsplash.com/photo-1543363950-02704687ebed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=30' }
    // return this.images.firstObject;
  })
});
