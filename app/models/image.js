import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  path: DS.attr('string'),
  alt: DS.attr('string')
});
