import DS from 'ember-data';

export default DS.Model.extend({
  deal: DS.belongsTo('deal'),

  body: DS.attr('string'),
  rating: DS.attr('number')
});
