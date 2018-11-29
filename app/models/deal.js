import DS from 'ember-data';
import { computed } from '@ember/object';

const inverse = null;

export default DS.Model.extend({
  // locations: DS.hasMany('location', { inverse, async: true }),
  reviews: DS.hasMany('review', { inverse, async: true }),
  photos: DS.hasMany('image', { inverse, async: true }),
  tags: DS.hasMany('tag', { inverse, async: true }),

  title: DS.attr('string'),

  primaryPhoto: computed(function() {
    return this.photos.firstObject;
  })
});