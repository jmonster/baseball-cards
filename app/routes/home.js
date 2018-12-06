import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  dataService: inject(),

  beforeModel() {
    const liked = this.get('dataService.likedDeals')
    if (liked && liked.length) {
      this.transitionTo('deals-list')
    } else {
      this.transitionTo('swiper')
    }
  }
});
