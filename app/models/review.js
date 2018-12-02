import DS from 'ember-data';

export default DS.Model.extend({
  product: DS.belongsTo('product'),
  body: DS.attr('string'),
  rating: DS.attr('number')
});
