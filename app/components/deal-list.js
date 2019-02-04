import Component from '@ember/component';
import { computed } from '@ember/object';
import { filter, filterBy, setDiff } from '@ember/object/computed';
import { storageFor } from 'ember-local-storage';

const THREE_DAYS = 3 * 8.64e+7;

export default Component.extend({
  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  nonExpiredDeals: filterBy('deals', 'isExpired', false),
  expiredDeals: setDiff('deals', 'nonExpiredDeals'),

  likedDeals: computed('nonExpiredDeals.[]', 'likedDealIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const likedDealIds = this.likedDealIds;
    const likedDealsSet = new Set(likedDealIds.toArray()); // O(1) lookups

    return allDeals.filter(({id}) => likedDealsSet.has(String(id)));
  }),

  dislikedDeals: computed('nonExpiredDeals.[]', 'dislikedDealIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const dislikedDeals = this.dislikedDealIds;
    const dislikedDealsSet = new Set(dislikedDeals.toArray());  // O(1) lookups

    return allDeals.filter(({id}) => dislikedDealsSet.has(String(id)));
  }),

  // exclude 3 day past expired deals
  staleDeals: filter('expiredDeals.[]', function(deal, index, expiredDeals) {
    const now = Date.now();
    const delta = now - deal.expiredAt - THREE_DAYS;
    return delta > 0;
  }),

  deals: computed(function() {
    // this function is overriden when the `deals` argument is provided
    throw new Error(`The 'deal-list' component requires that you provide an array as the 'deals' parameter.`);
  }),

  actions: {
    'unlike-deal': function(id) {
      // add to disliked collection
      this.dislikedDealIds.pushObject(id);

      // remove from liked collection
      this.likedDealIds.removeObject(id);
    },

    'relike-deal': function(id) {
      // add to liked collection
      this.likedDealIds.pushObject(id);

      // remove from disliked collection
      this.dislikedDealIds.removeObject(id);
    }
  }
});
