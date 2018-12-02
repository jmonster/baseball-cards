import DS from 'ember-data';

export default DS.Model.extend({
  deal: DS.belongsTo('deal'),
  originalDate: DS.attr('date'),
  price: DS.attr('dollars'),
  merchant: DS.attr('string'),
  link: DS.attr('string')
});
