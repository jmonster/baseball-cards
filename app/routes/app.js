import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import RSVP from 'rsvp';

export default Route.extend({
  dataService: inject(),
  likedDealsIds: alias('dataService.likedDeals'),

  beforeModel() {
    const likedDealsIds = this.likedDealsIds;

    if (!/Mobi/.test(navigator.userAgent)) {
      this.transitionTo('desktop');
    } else if (isPresent(likedDealsIds)) {
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
