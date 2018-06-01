import DS from 'ember-data';

export default DS.Model.extend({
  therapist: DS.belongsTo('therapist'),

  body: DS.attr('string'),
  rating: DS.attr('number')
});
