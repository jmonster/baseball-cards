import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { filter, filterBy, setDiff } from '@ember/object/computed';

export default Component.extend({
  dataService: inject(),

  nonExpiredDeals: filterBy('deals', 'expiredAt', null),
  expiredDeals: setDiff('deals', 'nonExpiredDeals'),
  likedDealsIds: alias('dataService.likedDealsIds'),
  dislikedDealsIds: alias('dataService.dislikedDealsIds'),

  likedDeals: computed('nonExpiredDeals.[]', 'likedDealsIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const likedDealsIds = this.likedDealsIds;
    const likedDealsSet = new Set(likedDealsIds);

    return allDeals.filter(d => likedDealsSet.has(String(d.id)));
  }),

  dislikedDeals: computed('nonExpiredDeals.[]', 'dislikedDealsIds.[]', function() {
    const allDeals = this.nonExpiredDeals;
    const dislikedDeals = this.dislikedDealsIds;
    const dislikedDealsSet = new Set(dislikedDeals);

    return allDeals.filter(d => dislikedDealsSet.has(String(d.id)));
  }),

  // exclude 3 day past expired deals
  staleDeals: filter('expiredDeals', function(deal, index, expiredDeals) {
    let now = (new Date()).getTime()
    return expiredDeals.filter(d => !(now - d.expiredAt > 86400000 * 3));
  }),

  deals: computed(function() {
    // this function is overriden when the `deals` argument is provided
    throw new Error(`The 'deal-list' component requires that you provide an array as the 'deals' parameter.`);
  }),

  actions: {
    'unlike-deal': function(id) {
      this.dataService.removeLikedDeal(id);
      // TODO collapse the slider
    },

    'relike-deal': function(id) {
      this.dataService.addLikedDeal(id, false);
      // TODO collapse the slider
    }
  }
});
