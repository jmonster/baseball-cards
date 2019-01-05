import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['navigation', 'z-1', 'flex', 'flex-none', 'bg-gradient-primary', 'shadow-outer-1'],
  router: inject(),
  linkToRouteName: computed('router.currentRouteName', function() {
    const currentRoute = this.get('router.currentRouteName');

    if (/swiper/.test(currentRoute)) {
      return 'app.deals';
    } else {
      return 'app.swiper';
    }
  })
});
