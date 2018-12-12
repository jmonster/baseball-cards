import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: inject(),

  // dynamically change the layout of the main container
  justify: computed('currentRouteName', function() {
    return this.currentRouteName === 'swiper' ? 'justify-end swiper-padding' : 'justify-start';
  }),

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
