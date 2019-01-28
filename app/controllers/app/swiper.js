import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { equal } from '@ember/object/computed';

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
  detailIndex: 0,

  showCamelGraph: equal('detailIndex', 1),
  showAdditionalActions: equal('detailIndex', 2),

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

  actions: {
    onLeftTap() {
      const count = this.get('detailIndex');
      this.set('detailIndex', count <= 0 ? 0 : count - 1);
    },

    onRightTap() {
      const count = this.get('detailIndex');
      this.set('detailIndex', count >= 2 ? count : count + 1);
    },

    removeCard(delta) {
      this.addToDealsList(delta, this.currentDeal);

      // effectively increment the iterator onto the next deal
      this.mutableDeals.shiftObject();

      // reset state
      this.set('detailIndex', 0);

      if (isEmpty(this.mutableDeals)) {
        this.transitionToRoute('app.deals');
      }
    },

    reset() {
      this.set('allDeals', this.model.deals);
      this.set('detailIndex', 0);
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
