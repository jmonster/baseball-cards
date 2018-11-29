import DS from 'ember-data';
import { computed } from '@ember/object';

const inverse = null;

export default DS.Model.extend({
  // async:false => deal record won't be loaded automatically
  deal: DS.belongsTo('deal', { inverse, async: false }),

  street1: DS.attr('string'),
  street2: DS.attr('string'),
  zip: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  longitude: DS.attr('string'),
  latitude: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),

  asString: computed('street1', 'city', 'state', function() {
    const street = this.street1 || '';
    const city = this.city1 || '';
    const state = this.state1 || '';

    return [street, city, state].join(' ');
  })
});
