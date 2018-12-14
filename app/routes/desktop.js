import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Route.extend({
  browser: inject(),
  isMobile: alias('browser.isMobile'),

  beforeModel() {
    if (this.isMobile) {
      this.transitionTo('app');
    }
  }
});
