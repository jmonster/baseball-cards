import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

export default Route.extend({
  dataService: inject(),
  likedDealsIds: alias('dataService.likedDeals'),

  beforeModel() {
    const likedDealsIds = this.likedDealsIds;

    if (isPresent(likedDealsIds)) {
      this.transitionTo('deals');
    } else {
      this.transitionTo('swiper');
    }
  }
});
