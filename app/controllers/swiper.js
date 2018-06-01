import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  allTherapists: computed(function() {
    return this.store.findAll('therapist');
  }),

  mutableTherapists: computed('allTherapists.[]', function() {
    return this.get('allTherapists').toArray();
  }),

  paginatedTherapists: computed('mutableTherapists.[]', function() {
    return this.get('mutableTherapists').slice(0,1);
  }),

  actions: {
    onLeftTap() {
      this.set('showCardDetails', false);
    },

    onRightTap() {
      this.set('showCardDetails', true);
    },

    removeCard(/*component*/) {
      this.get('mutableTherapists').shiftObject();
      this.set('showCardDetails', false);
    },

    reset() {
      this.set('allTherapists', this.store.findAll('therapist'));
    }
  }
});
