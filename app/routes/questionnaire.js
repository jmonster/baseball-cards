import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  store: inject(),

  queryParams: {
    questionIdx: {
      replace: true
    }
  },

  model() {
    return this.store.findAll('question');
  },

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('questionIdx', 0);
      controller.set('isDone', false);
    }
    }
});
