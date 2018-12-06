import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { observer } from '@ember/object';

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
  dataService: inject(),

  allDeals: computed(function() {
    return this.model.deals;
  }),

  mutableDeals: computed('allDeals.[]', function() {
    return shuffle(this.allDeals.toArray());
  }),

  paginatedDeals: computed('mutableDeals.[]', function() {
    const seenDeals = new Set(this.get('dataService.seenDeals'));
    let nextDeal = [this.mutableDeals[0]]
    let tries = 100
    while(tries) {
      if (!nextDeal || !nextDeal[0]) return []
      if (seenDeals.has(String(nextDeal[0].id))) {
        nextDeal = [this.mutableDeals[(101-tries)]]
      } else {
        return nextDeal
      }
      tries--
    }
  }),

  valueObserver: observer('mutableDeals.[]', function () {
    if (this.mutableDeals.length === 0) this.transitionToRoute('deals-list')
  }),

  actions: {
    onLeftTap() {
      this.set('showCardDetails', false);
    },

    onRightTap() {
      this.set('showCardDetails', true);
    },

    removeCard(delta) {
      this.addToDealsList(delta, this.paginatedDeals[0]);
      this.mutableDeals.shiftObject();
      this.set('showCardDetails', false);
    },

    reset() {
      this.set('allDeals', this.model.deals);
    }
  },

  addToDealsList(delta, deal) {
    if(delta > 0) {
      this.get('dataService').addLikedDeal(deal);
    } else {
      this.get('dataService').addDislikedDeal(deal);
    }
  },
});
