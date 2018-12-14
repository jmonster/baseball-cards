import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import RSVP from 'rsvp';

export default Route.extend({
  dataService: inject(),
  browser: inject(),

  seenDealsIds: alias('dataService.seenDealsIds'),
  isDesktop: alias('browser.isDesktop'),

  beforeModel() {
    const hasSeenDeals = this.seenDealsIds.length || false;

    if (this.isDesktop) {
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
