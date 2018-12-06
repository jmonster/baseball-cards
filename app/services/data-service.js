import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  _fetch: function (resource) {
    let fetch = localStorage.getItem(resource)
    let deals = JSON.parse(fetch)
    return deals || []
  },

  likedDeals: computed(function () {
    return this._fetch('likedDeals')
  }),
  dislikedDeals: computed(function () {
    return this._fetch('dislikedDeals')
  }),
  seenDeals: computed(function () {
    return this._fetch('seenDeals')
  }),

  addLikedDeal(deal){
    this.get('likedDeals').push(String(deal.id));
    this.get('seenDeals').push(String(deal.id));
    localStorage.setItem('likedDeals', JSON.stringify(this.get('likedDeals')))
    localStorage.setItem('seenDeals', JSON.stringify(this.get('seenDeals')))
  },

  addDislikedDeal(deal){
    this.get('dislikedDeals').push(String(deal.id));
    this.get('seenDeals').push(String(deal.id));
    localStorage.setItem('dislikedDeals', JSON.stringify(this.get('dislikedDeals')))
    localStorage.setItem('seenDeals', JSON.stringify(this.get('seenDeals')))
  },
});