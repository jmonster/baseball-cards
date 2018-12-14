import Service from '@ember/service';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

export default Service.extend({
  isMobile: computed(function() {
    return /Mobi/.test(navigator.userAgent);
  }),
  isDesktop: not('isMobile')
});
