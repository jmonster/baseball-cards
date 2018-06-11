import DS from 'ember-data';

export default DS.Model.extend({
  identifier: DS.attr(),
  enabled: DS.attr("boolean", { defaultValue: true }),
  enables: DS.attr(),
  type: DS.attr(),
  value: DS.attr(),
  subvalue: DS.attr(),
  choices: DS.attr(),
  multipleChoice: DS.attr()
});
