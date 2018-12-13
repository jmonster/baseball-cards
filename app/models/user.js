import DS from 'ember-data';
import { computed } from '@ember/object';

// !! IMPORTANT !!
// https://github.com/firebase/emberfire/blob/master/docs/guide/relationships.md#relationships
//
// Unless have a reason and understand the implications
// we suggest using inverse: null in your relationships
// and saving both sides manually
// due to the nature of the Real-time Database.

// const inverse = null;

export default DS.Model.extend({
  name: DS.attr('string'),
  firstName: computed('name', function() {
    return this.name.split(' ')[0];
  }),
  email: DS.attr('string'),
  isAnonymous: DS.attr('boolean', { defaultValue: true })
});
