import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  brand: DS.attr(),
  link: DS.attr(),
  description: DS.attr(),
  thumbnail: DS.attr(),
  images: DS.attr()
});
