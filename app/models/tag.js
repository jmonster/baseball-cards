import DS from 'ember-data';

const inverse = null;

export default DS.Model.extend({
  // async:false => therapist record won't be loaded automatically
  therapists: DS.hasMany('therapist', { inverse, async: false }),

  type: DS.attr('string'),
  value: DS.attr('string')
});
