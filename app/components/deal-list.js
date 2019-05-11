import Component from '@ember/component';
import { computed } from '@ember/object';
import { filter, filterBy, setDiff } from '@ember/object/computed';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';
const THREE_DAYS = 3 * 8.64e+7;

export default Component.extend({
  graph: service(),

  likedDealIds: storageFor('deal-likes'),
  dislikedDealIds: storageFor('deal-dislikes'),

  nonExpiredDeals: filterBy('deals', 'isExpired', false),
  expiredDeals: setDiff('deals', 'nonExpiredDeals'),

  likedDeals: computed('nonExpiredDeals.[]', 'likedDealIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const likedDealIds = this.likedDealIds;
    const likedDealsSet = new Set(likedDealIds.toArray()); // O(1) lookups

    return allDeals.filter((d) => likedDealsSet.has(String(d.get('id'))));
  }),

  dislikedDeals: computed('nonExpiredDeals.[]', 'dislikedDealIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const dislikedDeals = this.dislikedDealIds;
    const dislikedDealsSet = new Set(dislikedDeals.toArray());  // O(1) lookups

    return allDeals.filter((d) => dislikedDealsSet.has(String(d.get('id'))));
  }),

  // exclude 3 day past expired deals
  // TODO just query the DB now that we're not using Firebase
  staleDeals: filter('expiredDeals.[]', function(deal) {
    const now = Date.now();
    const delta = now - deal.expiredAt - THREE_DAYS;
    return delta > 0;
  }),

  // this is overriden when the `deals` argument is provided
  deals: null,

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
