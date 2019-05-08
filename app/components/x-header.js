import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { storageFor } from 'ember-local-storage';


export default Component.extend({
  classNames: ['z-1'],
  router: inject(),
  likedDealIds: storageFor('deal-likes'),

  linkToRouteName: computed('router.currentRouteName', function() {
    const currentRoute = this.get('router.currentRouteName');

    if (/swiper/.test(currentRoute)) {
      return 'app.deals';
    } else {
      return 'app.swiper';
    }
  }),

  likedDealCount: alias('likedDealIds.length')
});
