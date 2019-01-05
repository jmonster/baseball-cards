import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['navigation', 'z-1', 'flex', 'flex-none', 'bg-gradient-primary', 'shadow-outer-1'],
  router: inject(),
  dataService: inject(),

  linkToRouteName: computed('router.currentRouteName', function() {
    const currentRoute = this.get('router.currentRouteName');

    if (/swiper/.test(currentRoute)) {
      return 'app.deals';
    } else {
      return 'app.swiper';
    }
  }),

  // TODO subtract expired deals from the count
  likedDealCount: alias('dataService.likedDealsIds.length')
});
