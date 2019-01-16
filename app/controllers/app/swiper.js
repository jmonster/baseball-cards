import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

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

  seenDealsIds: alias('dataService.seenDealIds'),

  allDeals: computed(function() {
    return this.model.deals.filter(d => !d.isExpired);
  }),

  mutableDeals: computed('allDeals.[]', function() {
    return shuffle(this.allDeals.toArray());
  }),

  currentDeal: alias('paginatedDeals.firstObject'),

  // what/how is being paginated?
  paginatedDeals: computed('mutableDeals.[]', 'seenDeals.[]', function() {
    const seenDealIds = new Set(this.seenDealsIds);
    // wtf?
    let nextDeal = [this.mutableDeals[0]];
    let tries = 100;

    while(tries) {
      if (!nextDeal || !nextDeal[0]) {
        return [];
      }

      const nextDealId = String(nextDeal[0].id);
      if (seenDealIds.has(nextDealId)) {
        // wtf? explain what you're trying to do in this loop and?
        nextDeal = [this.mutableDeals[(101-tries)]];
      } else {
        return nextDeal;
      }

      tries--;
    }
  }),

  mutableDealsObserver: observer('mutableDeals.[]', function () {
    if (isEmpty(this.mutableDeals)) {
      this.transitionToRoute('app.deals');
    }
  }),

  actions: {
    onLeftTap() {
      this.set('showCardDetails', false);
    },

    onRightTap() {
      this.set('showCardDetails', true);
    },

    removeCard(delta) {
      this.addToDealsList(delta, this.currentDeal);

      // effectively increment the iterator onto the next deal
      this.mutableDeals.shiftObject();

      // reset state
      this.set('showCardDetails', false);
    },

    reset() {
      this.set('allDeals', this.model.deals);
      this.set('showCardDetails', false);
    }
  },

  addToDealsList(delta, deal) {
    const didLikeDeal = delta > 0;

    if (didLikeDeal) {
      this.dataService.addLikedDeal(deal.id);
    } else {
      this.dataService.addDislikedDeal(deal.id);
    }
  },
});
