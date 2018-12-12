import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  _fetch: function (resourceName) {
    const resourceAsString = localStorage.getItem(resourceName);
    if (!resourceAsString) { return []; }

    try {
      const parsedData = JSON.parse(resourceAsString);
      return parsedData;
    } catch (e) {
      // remove what is apparently bad data and retry
      localStorage.removeItem(resourceName);
      return this._fetch(...arguments);
    }
  },

  // TODO equivalent _put method?

  likedDealsIds: computed(function () {
    return this._fetch('likedDealsIds');
  }),

  dislikedDealsIds: computed('likedDealsIds', 'seenDealsIds', function () {
    const likedDealsIdsSet = new Set(this.likedDealsIds);
    return this.seenDealsIds.filter(id => !likedDealsIdsSet.has(String(id)));
  }),

  seenDealsIds: computed(function () {
    return this._fetch('seenDealsIds');
  }),

  addLikedDeal(deal){
    const idAsString = String(deal.id)
    this.likedDealsIds.pushObject(idAsString);
    localStorage.setItem(
      'likedDealsIds',
      JSON.stringify(this.likedDealsIds)
    );

    this.seenDealsIds.pushObject(idAsString);
    this.saveSeenDeals()
  },

  addDislikedDeal(deal){
    const idAsString = String(deal.id);
    this.seenDealsIds.pushObject(idAsString);
    this.saveSeenDeals()
  },

  saveSeenDeals(){
    localStorage.setItem(
      'seenDealsIds',
      JSON.stringify(this.seenDealsIds)
    );
  }
});
