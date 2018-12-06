import Service from '@ember/service';

export default Service.extend({
  likedDeals: [],

  addLikedDeal(deal){
    const liked = this.get('likedDeals');
    liked.push(deal);
    this.set('likedDeals', liked);
    console.log('deal added')

  },
});