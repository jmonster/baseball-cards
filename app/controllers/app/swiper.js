import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';
import { alias, equal, setDiff, union } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { storageFor } from 'ember-local-storage';

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
  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),
  seenDealIds: union('likedDealIds', 'dislikedDealIds'),
  allDealIds: computed('allActiveDeals.[]', function() {
    return this.model.deals.map(({ id }) => id);
  }),
  unseenDealIds: setDiff('allDealIds', 'seenDealIds'),

  detailIndex: 0,

  showCamelGraph: equal('detailIndex', 1),
  showAdditionalActions: equal('detailIndex', 2),

  allActiveDeals: computed('unseenDealIds.[]', 'model.deals.[]', function() {
    const unseenSetOfDealIds = new Set(this.unseenDealIds);

    return this.model.deals.filter(d => {
      return (!d.isExpired && unseenSetOfDealIds.has(d.id));
    });
  }),

  mutableDeals: computed('allActiveDeals.[]', function() {
    return shuffle(this.allActiveDeals.toArray());
  }),

  currentDeal: alias('mutableDeals.firstObject'),

  // deal iterator, sort of..
  // this enables us to have the template/view
  // generate a new component each time the currentDeal changes
  paginatedDeals: computed('currentDeal', function() {
    return this.currentDeal ? [this.currentDeal] : [];
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
      // this.set('allActiveDeals', this.model.deals);
      this.set('detailIndex', 0);
    }
  },

  addToDealsList(delta, deal) {
    const didLikeDeal = delta > 0;
    if (didLikeDeal) {
      this.likedDealIds.pushObject(deal.id);
    } else {
      this.dislikedDealIds.pushObject(deal.id);
    }
  },
});
