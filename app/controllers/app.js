import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { alias }  from '@ember/object/computed';

export default Controller.extend({
  deals: alias('model'),

  // dynamically change the layout of the main container
  justify: computed('currentRouteName', function () {
    return this.currentRouteName === 'app.swiper' ? 'justify-center' : 'justify-start';
  }),

  thingsToFilterOn: computed(async function () {
    return this.deals.map((deal) => deal.get('product'));

    // the following is useful to combine multiple sources
    // return RSVP.all([
    //
    // ])
    // .then((arrays) => [].concat(...arrays.map((arr) => arr.toArray())));
  })
});
