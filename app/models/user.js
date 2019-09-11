import DS from 'ember-data';

export default DS.Model.extend({
  isAnonymous: true, // default

  name: DS.attr(),
  email: DS.attr(),
  image: DS.attr(),
  avatar: DS.attr(),

  lists: DS.hasMany('list')
});
