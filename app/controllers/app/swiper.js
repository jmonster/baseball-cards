import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias, equal, setDiff, union, filterBy } from '@ember/object/computed';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),
  seenDealIds: union('likedDealIds', 'dislikedDealIds'),
  allDealIds: computed('model.deals.[]', function() {
    return this.model.deals.map(({ id }) => id);
  }),
  unseenDealIds: setDiff('allDealIds', 'seenDealIds'),
  unseenDeals: computed('unseenDealIds.[]', function() {
    const unseenIdSet = new Set(this.unseenDealIds.toArray());
    return this.model.deals.filter((d) => unseenIdSet.has(d.id));
  }),
  expiredDeals: filterBy('model.deals', 'isExpired'),
  browseableDeals: setDiff('unseenDeals', 'expiredDeals'),
  currentDeal: alias('browseableDeals.firstObject'),

  detailIndex: 0,
  showCamelGraph: equal('detailIndex', 1),
  showAdditionalActions: equal('detailIndex', 2),

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

      // reset state
      this.set('detailIndex', 0);
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
