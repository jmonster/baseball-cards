import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  dataService: inject(),

  likedDeals: computed(function(){
    const all = this.get('deals');
    const liked = this.get('dataService.likedDeals')
    const set = new Set(liked);
    return all.filter(d => set.has(String(d.id)));
  }),

  dislikedDeals: computed(function(){
    const all = this.get('deals');
    const disliked = this.get('dataService.dislikedDeals')
    const set = new Set(disliked);
    return all.filter(d => set.has(String(d.id)));;
  }),
});
