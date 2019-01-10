import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: inject(),

  // dynamically change the layout of the main container
  justify: computed('currentRouteName', function () {
    return this.currentRouteName === 'app.swiper' ? 'justify-center' : 'justify-start';
  }),

  thingsToFilterOn: computed(async function () {
    const deals = await this.store.findAll('deal');
    return deals.map((deal) => deal.get('product'));

    // the following is useful to combine multiple sources
    // return RSVP.all([
    //
    // ])
    // .then((arrays) => [].concat(...arrays.map((arr) => arr.toArray())));
  })
});
