import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import RSVP from 'rsvp';

export default Controller.extend({
  store: inject(),

  thingsToFilterOn: computed(function() {
    return RSVP.all([

    ])
    .then((arrays) => [].concat(...arrays.map((arr) => arr.toArray())));
  })
});
