import Controller from '@ember/controller';
import { computed } from '@ember/object';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default Controller.extend({
  allTherapists: computed(function() {
    return this.get('model').therapists;
  }),

  mutableTherapists: computed('allTherapists.[]', function() {
    return shuffle(this.get('allTherapists').toArray());
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
      this.set('allTherapists', this.get('model').therapists);
    }
  }
});
