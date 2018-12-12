import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import RSVP from 'rsvp';

export default Route.extend({
  dataService: inject(),
  seenDealsIds: alias('dataService.seenDealsIds'),

  beforeModel() {
    const hasSeenDeals = this.seenDealsIds.length || false;

    if (!/Mobi/.test(navigator.userAgent)) {
      this.transitionTo('desktop');
    } else if (hasSeenDeals) {
      this.transitionTo('app.deals');
    } else {
      this.transitionTo('app.swiper');
    }
  },

  model() {
    return RSVP.hash({
      deals: this.store.findAll('deal'),
      tags: this.store.findAll('tag')
    });
  },
});
