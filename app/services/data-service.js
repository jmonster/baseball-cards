import Service from '@ember/service';

export default Service.extend({
  likedDeals: [],
  dislikedDeals: [],

  addLikedDeal(deal){
    let liked = this.get('likedDeals');
    liked.push(deal);
  },

  addDislikedDeal(deal){
    let disliked = this.get('dislikedDeals');
    disliked.push(deal);
  },
});