import DS from 'ember-data';

const inverse = null;

export default DS.Model.extend({
  locations: DS.hasMany('location', { inverse, async: true }),
  reviews: DS.hasMany('review', { inverse, async: true }),
  photos: DS.hasMany('image', { inverse, async: true }),
  tags: DS.hasMany('tag', { inverse, async: true }),

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  birthday: DS.attr('string')
});
