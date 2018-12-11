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

  dislikedDealsIds: computed(function () {
    return this._fetch('dislikedDealsIds');
  }),

  seenDealsIds: computed(function () {
    return this._fetch('seenDealsIds');
  }),

  addLikedDeal(deal){
    this.likedDealsIds.pushObject(String(deal.id));
    this.seenDealsIds.pushObject(String(deal.id));

    localStorage.setItem(
      'likedDealsIds',
      JSON.stringify(this.likedDealsIds)
    );

    localStorage.setItem(
      'seenDealsIds',
      JSON.stringify(this.seenDealsIds)
    );
  },

  addDislikedDeal({ id }){
    const idAsString = String(id);

    this.dislikedDealsIds.pushObject(idAsString);
    this.seenDealsIds.pushObject(idAsString);

    localStorage.setItem(
      'dislikedDealsIds',
      JSON.stringify(this.dislikedDeals)
    );

    localStorage.setItem(
      'seenDealsIds',
      JSON.stringify(this.seenDealsIds)
    );
  },
});
