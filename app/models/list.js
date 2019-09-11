import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  image: DS.attr(),

  owner: DS.belongsTo('user'),
  products: DS.hasMany('product')
});
