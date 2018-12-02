import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  rating: DS.attr('number')
});
