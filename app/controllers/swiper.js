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
  allDeals: computed(function() {
    return this.model.deals;
  }),

  mutableDeals: computed('allDeals.[]', function() {
    return shuffle(this.allDeals.toArray());
  }),

  paginatedDeals: computed('mutableDeals.[]', function() {
    return this.mutableDeals.slice(0,1);
  }),

  actions: {
    onLeftTap() {
      this.set('showCardDetails', false);
    },

    onRightTap() {
      this.set('showCardDetails', true);
    },

    removeCard(/*component*/) {
      this.mutableDeals.shiftObject();
      this.set('showCardDetails', false);
    },

    reset() {
      this.set('allDeals', this.model.deals);
    }
  }
});
