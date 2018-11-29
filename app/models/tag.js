import DS from 'ember-data';

const inverse = null;

export default DS.Model.extend({
  // async:false => deal record won't be loaded automatically
  deals: DS.hasMany('deal', { inverse, async: false }),

  type: DS.attr('string'),
  value: DS.attr('string')
});
