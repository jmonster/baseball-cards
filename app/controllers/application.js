import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import RSVP from 'rsvp';

export default Controller.extend({
  store: inject(),

  thingsToFilterOn: computed(function() {
    const deals = this.store.findAll('deal');
    return deals;
    
    // the following is useful to combine multiple sources
    // return RSVP.all([
    //
    // ])
    // .then((arrays) => [].concat(...arrays.map((arr) => arr.toArray())));
  })
});
