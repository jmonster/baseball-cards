import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  dataService: inject(),

  likedDealsIds: alias('dataService.likedDealsIds'),
  dislikedDealsIds: alias('dataService.dislikedDealsIds'),

  likedDeals: computed('deals.[]', 'likedDealsIds.[]', function() {
    const allDeals = this.deals;
    const likedDealsIds = this.likedDealsIds;
    const likedDealsSet = new Set(likedDealsIds);

    return allDeals.filter(d => likedDealsSet.has(String(d.id)));
  }),

  dislikedDeals: computed('deals.[]', 'dislikedDealsIds.[]', function() {
    const allDeals = this.deals;
    const dislikedDeals = this.dislikedDealsIds;
    const dislikedDealsSet = new Set(dislikedDeals);

    return allDeals.filter(d => dislikedDealsSet.has(String(d.id)));
  }),

  deals: computed(function() {
    // this function is overriden when the `deals` argument is provided
    throw new Error(`The 'deals-list' component requires that you provide an array as the 'deals' parameter.`);
  })
});
